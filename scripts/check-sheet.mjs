/**
 * Checks that the enquiry form's Google Sheet endpoint is live.
 *
 *   npm run check:sheet          reachability only, writes nothing
 *   npm run check:sheet -- --post   also sends one clearly-labelled test
 *                                   row, so you can confirm end to end
 *
 * The plain check is read-only on purpose — it should be safe to run
 * against the live sheet without leaving anything behind.
 */
import { booking } from '../src/data/site.js'

const url = booking.sheetEndpoint?.trim()
const doPost = process.argv.includes('--post')

const ok = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`)
const bad = (m) => console.log(`  \x1b[31m✗\x1b[0m ${m}`)
const info = (m) => console.log(`    \x1b[2m${m}\x1b[0m`)

console.log('\nEnquiry endpoint check\n')

if (!url) {
  bad('booking.sheetEndpoint is empty in src/data/site.js')
  info('')
  info('In the sheet: Extensions -> Apps Script, paste')
  info('scripts/google-sheet-endpoint.gs, then Deploy -> New deployment')
  info('-> Web app (Execute as: Me, Who has access: Anyone).')
  info('Copy the /exec URL into booking.sheetEndpoint and re-run this.')
  console.log('')
  process.exit(1)
}

info(url)
console.log('')

/* Personal accounts get /macros/s/<id>/exec; Workspace accounts get
   /a/macros/<domain>/s/<id>/exec. Both are valid. */
const DEPLOYED = /^https:\/\/script\.google\.com\/(a\/macros\/[^/]+|macros)\/s\/[\w-]+\/exec$/
if (!DEPLOYED.test(url)) {
  bad('That does not look like a deployed Apps Script URL')
  info('Expected https://script.google.com/macros/s/<id>/exec')
  info('A /dev URL only works while you are signed in — use /exec.')
  console.log('')
  process.exit(1)
}
ok('URL looks like a web-app deployment')

/* Google answers a locked-down deployment by redirecting to a sign-in
   page rather than returning an error, so the landing URL is the tell. */
const signInDomain = (res) => {
  const m = /\/a\/([^/]+)\/ServiceLogin/.exec(res.url || '')
  if (m) return m[1]
  return /ServiceLogin|accounts\.google\.com/.test(res.url || '') ? '' : null
}

const read = async (res) => {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { ok: false, raw: text.slice(0, 200) }
  }
}

let failed = false

try {
  const res = await fetch(url, { redirect: 'follow' })
  const domain = signInDomain(res)
  const out = domain === null ? await read(res) : { ok: false }

  if (domain !== null) {
    failed = true
    if (domain) {
      bad(`Locked to the ${domain} domain`)
      info(`Google is sending visitors to a ${domain} sign-in page, so the`)
      info('deployment is set to "Anyone within" your organisation rather')
      info('than "Anyone". Shop owners filling the form are not signed in.')
      info('')
      info('Deploy -> Manage deployments -> pencil icon ->')
      info('  Who has access:  Anyone')
      info('  Version:         New version')
      info('then Deploy, and re-copy the Web app URL.')
      info('')
      info('If "Anyone" is missing from the dropdown, a Workspace admin has')
      info('blocked publishing outside the domain: Admin console -> Apps ->')
      info('Google Workspace -> Drive and Docs -> Sharing settings.')
    } else {
      bad('Google asked for a sign-in')
      info('The deployment is not public. Re-deploy with')
      info('"Who has access: Anyone" — visitors are not signed in.')
    }
  } else if (out.ok) {
    ok(`Endpoint is live — writing to the "${out.sheet ?? 'default'}" tab`)
  } else {
    failed = true
    const html = out.raw?.includes('<')
    const signin = /sign in|accounts\.google|authoriz/i.test(out.raw || '')

    if (res.status === 404) {
      bad('No deployment at that URL (404)')
      info('The script exists but this URL does not point at a live')
      info('deployment. In Apps Script: Deploy -> Manage deployments,')
      info('open the active Web app and copy its /exec URL.')
    } else if (res.status === 401 || res.status === 403 || signin) {
      bad(`Access denied (${res.status})`)
      info('Re-deploy with "Who has access: Anyone".')
    } else if (html) {
      bad(`Got a web page back, not JSON (${res.status})`)
      info('Usually a script error. Open the /exec URL in a private')
      info('window to see what Google is showing.')
    } else {
      bad(`Endpoint answered ${res.status} but not with ok:true`)
      info(out.error || out.raw || 'no detail returned')
    }
  }
} catch (err) {
  failed = true
  bad(`Could not reach the endpoint — ${err.message}`)
}

if (doPost && !failed) {
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ')
  const body = new URLSearchParams({
    name: `TEST ROW — delete me (${stamp})`,
    phone: '+91 00000 00000',
    email: 'test@example.com',
    storeType: 'Clothing store',
    location: 'Test — automated check',
    size: '400',
    service: 'Space planning & layout',
    budget: 'Not sure yet',
    details: 'Written by npm run check:sheet. Safe to delete.',
  })

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: body.toString(),
      redirect: 'follow',
    })
    const out = await read(res)
    if (out.ok) {
      ok(`Test row written${out.row ? ` at row ${out.row}` : ''} — delete it from the sheet`)
    } else {
      failed = true
      bad(`The endpoint refused the row — ${out.error || out.raw || 'no detail'}`)
    }
  } catch (err) {
    failed = true
    bad(`Post failed — ${err.message}`)
  }
} else if (!doPost && !failed) {
  info('')
  info('Run with -- --post to send a real test row.')
}

console.log('')
process.exit(failed ? 1 : 0)
