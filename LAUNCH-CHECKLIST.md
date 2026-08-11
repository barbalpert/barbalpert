# Pre-Launch Checklist

Everything below is a placeholder or an unverified fact in the site as built.
Search the codebase for `VERIFY` and `PLACEHOLDER` to find each one in context.

## 🔴 Blocking — must be resolved before publishing

| # | Item | Where |
|---|---|---|
| ~~1~~ | ~~**Which KBB office does Barb work out of?**~~ ✅ **RESOLVED** — South Atherton office confirmed: `2300 South Atherton Street, State College, PA 16801`. Applied to the footer of all 19 pages, the `contact.html` body address, and the JSON-LD `PostalAddress` in every page's `<head>`. | — |
| ~~2~~ | ~~**KBB office phone.**~~ ✅ **RESOLVED** — `814-234-4000 ext. 3140` confirmed and kept, after checking against the `814-238-6771` figure printed in the KBB Farm & Equine Seller's Guide PDF. Noted here in case that PDF gets reused: the two sources disagree, and the site intentionally follows the number you confirmed. | — |
| ~~3~~ | ~~**Photos.**~~ ✅ **RESOLVED** — all three photos uploaded, optimized and live; zero broken images site-wide. | — |
| ~~4~~ | ~~**Photo rights.**~~ ✅ **RESOLVED** — rights confirmed. The RBM Photography watermark stays in the image out of respect for the photographer, and a visible caption credit was added on `about.html` and `farms-equestrian.html`. | — |
| ~~5~~ | ~~**Real testimonials.**~~ ✅ **RESOLVED** — six real client reviews from Barb's 1kbb.com testimonials page are live, reproduced verbatim, plus a two-quote teaser on the home page. **Follow-up:** they published without reviewer names (see item 15). | — |
| 6 | **KBB brand-compliance sign-off.** Have the broker of record review the header, hero and footer treatment before launch. | All pages |

## 🟡 Should be done at launch

| # | Item | Where |
|---|---|---|
| 7 | **IDX / MLS search.** Four placeholder blocks await the KBB-approved IDX embed, or link them to Barb's search page on 1kbb.com. No listings were hand-written (they'd go stale and risk MLS compliance). | `index.html`, `buyers.html`, `farms-equestrian.html` |
| 8 | **Form endpoint.** Both forms currently submit via `mailto:`, which works anywhere but depends on the visitor having a mail client. Swap to Formspree / Netlify Forms / KBB's CRM. | `home-value.html`, `contact.html` |
| ~~11~~ | ~~**KBB logo artwork.**~~ ✅ **RESOLVED** — official `images/kbb-logo.png` is live in the top-left of all 19 pages at 56/68/78px tall. The placeholder SVG recreation has been deleted. | — |
| 12 | **Blog post dates.** All three posts are dated `2026-08-11` in their `BlogPosting` schema. Set real publication dates. | `blog/*.html` |
| ~~14~~ | ~~**Compress the photos.**~~ ✅ **RESOLVED** — hero 2.6 MB → 468 KB (3648px → 1500px), competition 848 KB → 252 KB. Total image weight 3.5 MB → 1.0 MB. All `width`/`height` attributes re-verified against the files. | — |
| 15 | **Reviewer names on testimonials.** The six reviews went up unattributed because the source page had no names — each `<cite>` currently reads "Client review via 1kbb.com". If you have permission to use names, swap in first name + last initial + town + year. Named reviews are far more persuasive, and they're what the `Review` schema needs to go live. | `reviews.html`, `index.html` |
| 13 | **Barb's designations.** The PDF lists **ABR · SRES · CRS** after her name. These aren't on the site yet — worth adding to the footer, About and Contact once you confirm they're all current. | site-wide |

## 🟢 After launch

- Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Verify the Google Business Profile and make its NAP **byte-for-byte identical** to the site footer.
- The `AggregateRating` / `Review` schema at the bottom of `reviews.html` is still commented out. The review text is real, but structured data needs an author per review plus a substantiated rating and count. Never publish a rating you can't back up.
- Build out the Tier-2 community pages (Port Matilda, Pleasant Gap, Lemont, Philipsburg, Howard, Spring Mills/Millheim) — stub instructions are commented in `communities/index.html`. Add each to `sitemap.xml` when live.
- Run PageSpeed Insights after the photos are in. Image compression is the single biggest win available.
- Consider adding a privacy policy page if you add any analytics or a third-party form.

---

## Decisions made for you (flag if you disagree)

**"Each office independently owned and operated" was omitted.** That's a franchise
disclosure, and KBB reads as an independent local brokerage rather than a franchise
affiliate. If KBB confirms it applies to them, there's a comment in the footer marking
exactly where to add it back.

**Page titles run long.** You asked for both ~55–60 characters *and* the format
`[Keyword] | Barb Alpert, REALTOR® – Kissinger Bigatel & Brower`. Those conflict — the
suffix alone is 30 characters. Compliance won: every title carries the full brokerage
name, and the keyword-bearing part is kept short so it survives the ~60-character
truncation in search results. If the broker is comfortable with the brokerage name
appearing prominently on-page but not in the title tag, dropping the suffix would let
every title display in full.

**No statistics or superlatives were invented.** The site never claims "#1 agent" or
cites market-share numbers. Claims that *are* made — 30+ years, Centre County native,
Associate Broker, USDF Bronze Medal, Prix St. Georges, KBB founded 1933, 40+ years
riding — all come from the bio copy you supplied. The one superlative, on `sellers.html`,
now reads "**one of** the market-leading brokerages in State College" at your direction —
a defensible non-exclusive claim rather than an unverifiable "the market leader."

**Market conditions are described qualitatively, never numerically.** No days-on-market,
median price or inventory figures — those go stale in weeks and become misleading
advertising. The FAQs deliberately answer "call us for current numbers" instead.

**Commission and buyer-agency language is written to current practice:** commissions
negotiable and never set by law or the MLS, buyer agency compensation disclosed in a
written agreement before touring. Have the broker confirm it matches KBB's current
forms and policy.

**Fair housing:** school districts are discussed as verifiable facts with a
"confirm boundaries with the district" caveat, and the site explicitly declines to
rank neighborhoods by who lives in them.

---

## How the site is built

Plain static HTML, one stylesheet, one small deferred JS file. No framework, no build
step, no dependencies — it will host anywhere (GitHub Pages, Netlify, S3). `CNAME` is
already set to `www.barbalpert.com`.

The header, footer, NAP block and CTA band are byte-for-byte identical across all 19
pages. **If you edit one of them, edit all of them** — consistent NAP is a real local
search ranking factor, and the compliance treatment has to hold on every page.
