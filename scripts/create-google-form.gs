/**
 * MirajSpaces — builds the consultation Google Form.
 *
 * Ten questions is a tedious form to assemble by hand, so this creates
 * it in one go and points its responses at the enquiries spreadsheet.
 * Unlike the web-app approach, nothing here gets published, so a
 * Workspace policy that blocks public web apps does not apply.
 *
 *   1. Open the sheet -> Extensions -> Apps Script
 *   2. New script file, paste this in, Save
 *   3. Choose createEnquiryForm in the function dropdown, press Run
 *   4. Authorise when asked, then open View -> Logs (or the Execution
 *      log) and copy the two URLs it prints
 *   5. Put the "Live form" URL into booking.viewUrl in src/data/site.js
 *      and the "Embed" URL into booking.embedUrl
 *
 * Running it twice makes a second form. To change the questions, edit
 * the form in the Forms UI rather than re-running this.
 */

var SHEET_ID = '1ELByOma55j3O8nz1iNRtdHxGIWVopJb_WuhFJ4G2jA4';

var STORE_TYPES = [
  'Clothing store',
  'Salon / barbershop',
  'Café / bakery',
  'Small retail',
  'Other'
];

var SERVICES = [
  'New store interior design',
  'Renovation & expansion',
  'Space planning & layout',
  'Furniture, lighting & materials',
  'Branding & visual merchandising',
  'Execution & contractor coordination',
  'Not sure — need advice'
];

var BUDGETS = [
  'Under ₹3 lakh',
  '₹3 – 6 lakh',
  '₹6 – 12 lakh',
  '₹12 lakh +',
  'Not sure yet'
];

function createEnquiryForm() {
  var form = FormApp.create('Miraj Spaces — Book a consultation');

  form.setTitle('Book a consultation');
  form.setDescription(
    'Tell us about your shop and we will come back within one working day.\n' +
    'The first conversation is free and there is no obligation after it.'
  );

  // A shop owner filling this in is not signed into anything.
  try {
    form.setRequireLogin(false);
  } catch (e) {
    // Consumer accounts have no such setting; nothing to do.
  }
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Thank you — we have your details. We reply within one working day. ' +
    'If it is urgent, call +91 80506 90693.'
  );

  form.addTextItem().setTitle('Your name').setRequired(true);

  form.addTextItem()
    .setTitle('Phone')
    .setHelpText('A number we can reach you on, ideally with WhatsApp.')
    .setRequired(true);

  form.addTextItem().setTitle('Email');

  form.addMultipleChoiceItem()
    .setTitle('Store type')
    .setChoiceValues(STORE_TYPES)
    .setRequired(true);

  form.addTextItem()
    .setTitle('Store location')
    .setHelpText('Area and city — for example Indiranagar, Bengaluru.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Approximate size (sq ft)')
    .setHelpText('A rough number is fine.');

  form.addMultipleChoiceItem()
    .setTitle('Service needed')
    .setChoiceValues(SERVICES)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Estimated budget')
    .setHelpText('So we design to a number that works for you.')
    .setChoiceValues(BUDGETS)
    .setRequired(true);

  form.addDateItem().setTitle('Preferred meeting date');

  form.addParagraphTextItem()
    .setTitle('Project details')
    .setHelpText('What is not working today? Are you renovating, expanding or starting new?');

  // Responses land in the existing enquiries spreadsheet.
  form.setDestination(FormApp.DestinationType.SPREADSHEET, SHEET_ID);

  var live = form.getPublishedUrl();
  var report = [
    '',
    '=====================================================',
    ' Form created. Copy these into src/data/site.js',
    '=====================================================',
    '',
    ' booking.viewUrl:',
    '   ' + live,
    '',
    ' booking.embedUrl:',
    '   ' + live + '?embedded=true',
    '',
    ' Edit the questions:',
    '   ' + form.getEditUrl(),
    '',
    ' Responses appear in a new tab of the enquiries sheet.',
    '====================================================='
  ].join('\n');

  Logger.log(report);
  return report;
}
