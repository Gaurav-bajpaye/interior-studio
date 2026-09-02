/**
 * MirajSpaces — consultation enquiry endpoint.
 *
 * Receives a POST from the booking form on the website and appends one
 * row to the enquiries sheet. Deploy this from the spreadsheet itself:
 *
 *   1. Open the sheet -> Extensions -> Apps Script
 *   2. Replace everything in Code.gs with this file, and Save
 *   3. Deploy -> New deployment -> type "Web app"
 *        Execute as:      Me
 *        Who has access:  Anyone            <- required, the site is public
 *   4. Authorise when prompted, then copy the /exec URL and paste it into
 *      booking.sheetEndpoint in src/data/site.js
 *
 * Re-deploy (Deploy -> Manage deployments -> edit -> New version) after
 * any change here, or the live site keeps hitting the old version.
 *
 * WORKSPACE ACCOUNTS: "Who has access" lives inside the deployment
 * dialog, not in the script file's Drive sharing. Setting the file to
 * "Anyone with the link" in Drive does nothing for the web app. In the
 * dropdown, "Anyone with Google Account" is also not enough — a shop
 * owner filling the form is not signed in at all. It has to be plain
 * "Anyone". If that option is missing, a Workspace admin has blocked
 * publishing outside the domain.
 *
 * "Anyone" means the URL accepts writes from anywhere, which is what
 * makes a backend-free form possible. The honeypot below turns away
 * naive bots; if the sheet ever starts collecting junk, add a shared
 * token: send it as a hidden field and reject posts that lack it.
 */

var SHEET_ID = '1ELByOma55j3O8nz1iNRtdHxGIWVopJb_WuhFJ4G2jA4';
var SHEET_NAME = 'Enquiries';

var COLUMNS = [
  ['Received',        function (p) { return new Date(); }],
  ['Name',            'name'],
  ['Phone',           'phone'],
  ['Email',           'email'],
  ['Store type',      'storeType'],
  ['Location',        'location'],
  ['Size (sq ft)',    'size'],
  ['Service needed',  'service'],
  ['Budget',          'budget'],
  ['Preferred date',  'date'],
  ['Details',         'details'],
  ['Status',          function () { return 'New'; }]
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Two people submitting at once must not land on the same row.
    lock.waitLock(20000);

    var p = (e && e.parameter) || {};

    // Honeypot: a real person never fills a field they cannot see.
    if (p.company) return reply({ ok: true });

    if (!p.name || !p.phone) {
      return reply({ ok: false, error: 'Name and phone are required.' });
    }

    var sheet = getSheet();
    var row = COLUMNS.map(function (col) {
      var key = col[1];
      return typeof key === 'function' ? key(p) : (p[key] || '');
    });
    sheet.appendRow(row);

    return reply({ ok: true, row: sheet.getLastRow() });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Lets you confirm the deployment is live by opening the URL in a tab. */
function doGet() {
  return reply({ ok: true, service: 'MirajSpaces enquiries', sheet: getSheet().getName() });
}

function getSheet() {
  var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    var headers = COLUMNS.map(function (col) { return col[0]; });
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#16273F')
      .setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 150);   // Received
    sheet.setColumnWidth(11, 420);  // Details
  }
  return sheet;
}

function reply(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
