# Website form handler — setup (about 10 minutes, one time)

Both forms on the site (the contact form and the home-valuation form) send their
contents to **barbalpert@gmail.com**. This folder holds the small script that
does it.

It runs inside **Barb's own Google account**. There is no third-party form
company, no signup, no monthly cost, no branding, and no "activate your form"
wall. The email arrives from Barb's own Gmail.

---

## Step 1 — Create the script

1. Sign in to Google as **barbalpert@gmail.com**. This matters: the script sends
   from whichever account creates it.
2. Go to **https://script.google.com** and click **New project**.
3. Delete the sample `function myFunction() {}` code in the editor.
4. Open [`Code.gs`](Code.gs) from this folder, copy **all** of it, and paste it in.
5. Click the project name at the top left (it says *Untitled project*) and rename
   it to **barbalpert.com form handler**.
6. Click the **save** icon (💾).

## Step 2 — Deploy it as a web app

1. Click **Deploy** (top right) → **New deployment**.
2. Click the gear icon next to *Select type* and choose **Web app**.
3. Fill in:
   - **Description:** `barbalpert.com forms`
   - **Execute as:** **Me (barbalpert@gmail.com)** ← must be this
   - **Who has access:** **Anyone** ← must be this, so visitors can submit
     without a Google account. It does **not** make anything private readable;
     the script only accepts form posts and sends email.
4. Click **Deploy**.
5. Google will ask you to **Authorize access**. Choose the barbalpert@gmail.com
   account. You'll see a warning screen saying *"Google hasn't verified this
   app"* — this is expected for a personal script. Click **Advanced**, then
   **Go to barbalpert.com form handler (unsafe)**, then **Allow**. It is asking
   for permission to send email as Barb, which is exactly the point.
6. Copy the **Web app URL**. It looks like:

   ```
   https://script.google.com/macros/s/AKfycb....../exec
   ```

## Step 3 — Put the URL into the site

Send that URL to your developer, **or** do it yourself — it's a find-and-replace
in two files:

- `contact.html`
- `home-value.html`

In each, find:

```html
action="PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"
```

and replace the placeholder with your Web app URL, keeping the quotes.

## Step 4 — Test it

Once the site is live, fill in each form with real details and submit. You
should land on the site's own thank-you page, and an email should arrive at
barbalpert@gmail.com within a few seconds with the subject line:

- **Home Valuation Request - barbalpert.com**
- **New Website Enquiry - barbalpert.com**

Hit **Reply** on either one and it replies straight to the person who filled in
the form — the script sets their address as the reply-to.

If nothing arrives, check the Gmail spam folder first, then open the Apps Script
editor and look at **Executions** in the left sidebar for errors.

---

## If you ever change the script

Editing `Code.gs` in the editor is **not** enough on its own. You must also
redeploy: **Deploy → Manage deployments → pencil icon → Version: New version →
Deploy**. The URL stays the same.

## What the script does

- Emails every submitted field to barbalpert@gmail.com, nicely labelled
- Sets the visitor's email as the reply-to, so Reply just works
- Silently discards bot submissions caught by the hidden honeypot field
- Redirects the visitor to `thank-you.html` on our own site, and refuses to
  redirect anywhere other than barbalpert.com
- Emails Barb a warning if a submission ever fails, so nothing is lost quietly

## Limits

A consumer Gmail account can send roughly **100 emails per day** via Apps
Script. A REALTOR site will not come close. If it ever did, the fix is a Google
Workspace account (1,500/day) or a dedicated form service.
