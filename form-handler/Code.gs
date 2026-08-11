/**
 * barbalpert.com — website form handler
 * =====================================
 * Receives submissions from the contact and home-valuation forms and emails
 * them to Barb. Runs inside Barb's own Google account: no third-party service,
 * no signup, no cost, and the email is sent from her own Gmail.
 *
 * SETUP: see README.md in this folder for the click-by-click deploy steps.
 *
 * Quotas: a consumer Gmail account can send about 100 emails a day through
 * Apps Script, which is far above what a REALTOR site will generate.
 */

/* ------------------------------------------------------------------ config */

/** Where form submissions are delivered. */
var RECIPIENT = 'barbalpert@gmail.com';

/** Only redirect back to our own site — stops the script being abused as an
 *  open redirect that bounces people to somewhere malicious. */
var ALLOWED_REDIRECT_PREFIX = 'https://www.barbalpert.com/';
var DEFAULT_REDIRECT = 'https://www.barbalpert.com/thank-you.html';

/** Fields shown first, in this order. Anything else follows alphabetically.
 *  Names starting with "_" are control fields and are never emailed. */
var FIELD_ORDER = ['name', 'email', 'phone', 'address', 'topic', 'message'];

var FIELD_LABELS = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  address: 'Property address',
  topic: 'Enquiry type',
  message: 'Message'
};

/* ------------------------------------------------------------------ entry */

function doPost(e) {
  try {
    var params = (e && e.parameter) ? e.parameter : {};

    // Honeypot: a hidden field no human ever fills in. If it has content this
    // is a bot — accept the request silently so it doesn't learn anything, but
    // send nothing.
    if (params._honey) {
      return redirectTo(safeRedirect(params._next));
    }

    // Require at least one real field so an empty POST doesn't email anything.
    if (!hasContent(params)) {
      return redirectTo(safeRedirect(params._next));
    }

    MailApp.sendEmail({
      to: RECIPIENT,
      replyTo: isEmail(params.email) ? params.email : RECIPIENT,
      subject: buildSubject(params._subject),
      body: buildBody(params)
    });

    return redirectTo(safeRedirect(params._next));

  } catch (err) {
    // Never leave a visitor on an error screen. Log it for debugging (View >
    // Executions in the Apps Script editor) and still send them onward.
    console.error('Form handler failed: ' + err);
    try {
      MailApp.sendEmail({
        to: RECIPIENT,
        subject: 'barbalpert.com form error — a submission may have been lost',
        body: 'The website form handler threw an error.\n\n' + err +
              '\n\nRaw submission:\n' + JSON.stringify((e && e.parameter) || {}, null, 2)
      });
    } catch (ignored) {}
    return redirectTo(DEFAULT_REDIRECT);
  }
}

/** Someone hitting the script URL in a browser gets sent to the site. */
function doGet() {
  return redirectTo('https://www.barbalpert.com/contact.html');
}

/* ----------------------------------------------------------------- helpers */

function hasContent(params) {
  for (var key in params) {
    if (key.charAt(0) !== '_' && String(params[key]).trim() !== '') return true;
  }
  return false;
}

function isEmail(value) {
  return !!value && /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(String(value).trim());
}

/** Keep the subject on one line and cap its length; fall back to a default. */
function buildSubject(raw) {
  var subject = String(raw || '').replace(/[\r\n]+/g, ' ').trim();
  if (!subject) subject = 'New website enquiry - barbalpert.com';
  return subject.substring(0, 150);
}

function buildBody(params) {
  var keys = [];
  var i;

  for (i = 0; i < FIELD_ORDER.length; i++) {
    if (params.hasOwnProperty(FIELD_ORDER[i])) keys.push(FIELD_ORDER[i]);
  }
  var rest = [];
  for (var key in params) {
    if (key.charAt(0) === '_') continue;
    if (keys.indexOf(key) === -1) rest.push(key);
  }
  rest.sort();
  keys = keys.concat(rest);

  var lines = [];
  for (i = 0; i < keys.length; i++) {
    var k = keys[i];
    var label = FIELD_LABELS[k] || k.charAt(0).toUpperCase() + k.slice(1);
    var value = String(params[k] == null ? '' : params[k]).trim();
    lines.push(label + ':');
    lines.push(value === '' ? '(not provided)' : value);
    lines.push('');
  }

  lines.push('----------------------------------------');
  lines.push('Sent from the form on ' + (params._form || 'barbalpert.com'));
  lines.push('Received ' + Utilities.formatDate(
    new Date(), Session.getScriptTimeZone(), "EEEE d MMMM yyyy 'at' h:mm a z"));
  if (isEmail(params.email)) {
    lines.push('Reply to this email to answer ' +
      (params.name ? String(params.name).trim() : 'them') + ' directly.');
  }

  return lines.join('\n');
}

/** Reject anything that isn't a page on our own site. */
function safeRedirect(url) {
  var target = String(url || '');
  return target.indexOf(ALLOWED_REDIRECT_PREFIX) === 0 ? target : DEFAULT_REDIRECT;
}

/**
 * Apps Script serves web-app HTML inside an iframe, so a plain meta refresh
 * would only navigate the frame. Break out to the top window, with a meta
 * refresh and a visible link as fallbacks if scripts are blocked.
 */
function redirectTo(url) {
  var safe = String(url).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
                        .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  var json = JSON.stringify(String(url));

  var html =
    '<!DOCTYPE html><html><head><meta charset="utf-8">' +
    '<meta http-equiv="refresh" content="0;url=' + safe + '">' +
    '<title>Thank you</title></head><body ' +
    'style="font:16px -apple-system,Segoe UI,Roboto,sans-serif;padding:2rem;text-align:center">' +
    '<p>Thank you — redirecting…</p>' +
    '<p><a href="' + safe + '" target="_top">Continue to barbalpert.com</a></p>' +
    '<script>try{window.top.location.href=' + json + ';}' +
    'catch(e){window.location.href=' + json + ';}</' + 'script>' +
    '</body></html>';

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
