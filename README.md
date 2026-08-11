# barbalpert.com

Static website for **Barb Alpert, REALTOR®, Associate Broker** and **Cliff Rupert,
REALTOR®** — both with **Kissinger Bigatel & Brower REALTORS®** in State College, PA.

Plain HTML + one stylesheet + one small deferred JS file. No framework, no build step,
no dependencies. Hosts anywhere; `CNAME` points at `www.barbalpert.com`.

## 👉 Read `LAUNCH-CHECKLIST.md` first

It lists every placeholder and unverified detail that must be filled in before going
live, plus the decisions made along the way.

## Structure

```
index.html              Home — real estate agent State College PA
about.html              About Barb — Centre County native realtor
team.html               Alpert & Rupert mother-son team
buyers.html             Homes for sale in State College PA
sellers.html            Sell my house State College PA
home-value.html         Free home valuation (form)
farms-equestrian.html   ⭐ Horse farms for sale in Centre County PA
reviews.html            Client reviews
contact.html            Contact (form, office info, map placeholder)
communities/            Hub + State College, Boalsburg, Bellefonte,
                        Pine Grove Mills, Centre Hall
blog/                   Hub + 3 posts
assets/css/styles.css   The entire stylesheet
assets/js/main.js       Mobile nav toggle + copyright year
images/                 See images/README.md for required filenames
sitemap.xml, robots.txt
```

## Editing rules

**The header, footer, NAP block and CTA band are byte-for-byte identical on all 19
pages. If you change one, change all of them.** Two reasons:

1. **Local SEO** — an inconsistent name/address/phone across pages weakens local ranking.
2. **Advertising compliance** — Pennsylvania law (49 Pa. Code § 35.305) requires the
   employing broker's business name and phone on an associate broker's advertising,
   with names at minimum equal in size. KBB's stricter internal policy requires the
   brokerage to be *more* prominent than the agent. The CSS enforces this: `.wordmark`
   (Kissinger Bigatel & Brower) is sized larger than `.agent-line` (Barb's name)
   everywhere it appears, on every breakpoint. Comments in `assets/css/styles.css` and
   in each page's header mark the load-bearing parts.

Never present Barb as her own brokerage. Always "Barb Alpert, REALTOR® | Kissinger
Bigatel & Brower."

## Adding a page

Copy the closest existing page, replace `<main>`, and update: `<title>`,
`<meta name="description">`, `<link rel="canonical">`, the four OG/Twitter tags, the
single `<h1>`, any `BreadcrumbList` schema, and `sitemap.xml`. Leave the header and
footer untouched.
