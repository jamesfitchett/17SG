/**
 * 17SG mention emails.
 * The team site posts here when someone tags a teammate. This script checks the
 * sender is really signed in to the 17SG site and on the team list, checks every
 * recipient is on the team list too, then emails them from this Google account.
 */
var API_KEY = 'AIzaSyDob5cQXWKoZkOcHKP6VXltYn2T1noB2Mk'; // 17SG Firebase web key (public by design)
var PROJECT = 'inc-ub8';
var ADMINS = ['jamesmfitchett@gmail.com'];
var SITE = 'https://jamesfitchett.github.io/17SG/';

function doPost(e) {
  try {
    var b = JSON.parse(e.postData.contents);
    var sender = verify_(b.idToken);
    var team = teamList_(b.idToken);
    if (team.indexOf(sender) < 0) return out_({ ok: false, error: 'sender not on team' });
    var to = (b.to || []).map(function (x) { return String(x).toLowerCase().trim(); })
      .filter(function (x, i, a) { return x && a.indexOf(x) === i && x !== sender; });
    if (!to.length) return out_({ ok: true, sent: 0 });
    if (to.length > 10) return out_({ ok: false, error: 'too many recipients' });
    var bad = to.filter(function (x) { return team.indexOf(x) < 0; });
    if (bad.length) return out_({ ok: false, error: 'not on team: ' + bad.join(', ') });
    var link = String(b.link || SITE);
    if (link.indexOf(SITE) !== 0) link = SITE;
    var from = clip_(b.fromName || sender, 60), where = clip_(b.where, 120), kind = clip_(b.kind, 30), text = clip_(b.text, 700);
    var subject = from + ' tagged you in 17SG: ' + clip_(where, 70);
    var html = '<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;color:#111">'
      + '<p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#777;margin:0 0 6px">17SG team workspace</p>'
      + '<p style="font-size:16px;margin:0 0 16px"><b>' + esc_(from) + '</b> tagged you on <b>' + esc_(where) + '</b></p>'
      + '<div style="border-left:2px solid #111;padding:4px 0 4px 14px;margin:0 0 20px;font-size:15px;line-height:1.5">'
      + '<span style="font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#777">' + esc_(kind) + '</span><br>' + esc_(text).replace(/\n/g, '<br>') + '</div>'
      + '<a href="' + esc_(link) + '" style="display:inline-block;background:#111;color:#fff;padding:10px 16px;text-decoration:none;font-size:14px">Open it on the site</a>'
      + '<p style="font-size:12px;color:#999;margin-top:24px">Reply to this email to answer ' + esc_(from) + ' directly.</p></div>';
    var plain = from + ' tagged you on "' + where + '" (' + kind + '):\n\n' + text + '\n\nOpen it: ' + link;
    to.forEach(function (r) {
      MailApp.sendEmail({ to: r, subject: subject, body: plain, htmlBody: html, name: '17SG Workspace', replyTo: sender });
    });
    return out_({ ok: true, sent: to.length });
  } catch (err) {
    return out_({ ok: false, error: String(err && err.message || err) });
  }
}

function doGet() { return out_({ ok: true, service: '17SG mention emails' }); }

// Firebase checks the sign-in token and tells us who it belongs to.
function verify_(idToken) {
  if (!idToken) throw new Error('not signed in');
  var r = UrlFetchApp.fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + API_KEY, {
    method: 'post', contentType: 'application/json', payload: JSON.stringify({ idToken: idToken }), muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) throw new Error('sign-in check failed');
  var u = (JSON.parse(r.getContentText()).users || [])[0];
  if (!u || !u.email || u.emailVerified !== true) throw new Error('sign-in check failed');
  return String(u.email).toLowerCase();
}

// Reads the team list with the sender's own sign-in, so the database rules still apply.
function teamList_(idToken) {
  var r = UrlFetchApp.fetch('https://firestore.googleapis.com/v1/projects/' + PROJECT + '/databases/(default)/documents/config/access', {
    headers: { Authorization: 'Bearer ' + idToken }, muteHttpExceptions: true });
  var list = ADMINS.slice();
  if (r.getResponseCode() === 200) {
    var vals = (((JSON.parse(r.getContentText()).fields || {}).emails || {}).arrayValue || {}).values || [];
    vals.forEach(function (v) { if (v.stringValue) list.push(String(v.stringValue).toLowerCase().trim()); });
  }
  return list;
}

function clip_(s, n) { s = String(s == null ? '' : s); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
function esc_(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

// Run this once from the editor to grant the email permission (sends one test email to you).
function authorize() {
  MailApp.sendEmail(Session.getActiveUser().getEmail(), '17SG mention emails are set up', 'This is the test email. Tags on the 17SG site will now email teammates.');
}
