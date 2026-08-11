# Images

All four files are in place and wired into the site. Paths in the HTML are
**relative** (`images/...` from the root, `../images/...` from `communities/` and
`blog/`), so everything works locally and on any host.

| File | Size on disk | Used by |
|---|---|---|
| `kbb-logo.png` (290x179, transparent) | 236 KB | Header logo, top-left of all 19 pages |
| `barb-alpert-cliff-rupert-realtors-state-college-pa.jpg` (1500x1125) | 468 KB | Home hero, Team page, default social-share image |
| `barb-alpert-dressage-salvador-state-college-pa.jpg` (427x640) | 56 KB | About, Farms & Equestrian, horse-farm blog post |
| `barb-alpert-dressage-competition-centre-county-pa.jpg` (1272x1020) | 252 KB | Home "Why Barb", About |

## Optimization — done

These were re-encoded from the originals on 2026-08-11:

- Mother-son photo: **3648px wide, 2.6 MB → 1500px, 468 KB** (82% smaller)
- Competition photo: **848 KB → 252 KB** at unchanged pixel dimensions

Both were re-encoded once from the pristine originals rather than recompressed on
top of an earlier pass, which avoids stacking JPEG generation loss. Total image
weight across the site is now about 1.0 MB, down from 3.5 MB.

Every `<img>` tag's `width`/`height` attributes were checked against the real
files afterward — they all match, which is what prevents layout shift on load.
**If you replace any photo, update those two numbers to the new pixel dimensions.**

Unedited originals are archived outside the repo at:
`scratchpad/original-photos/` (session-local — copy them somewhere permanent if
you want to keep them).

## The logo

`kbb-logo.png` renders 56px tall on mobile, 68px on tablet, 78px on desktop
(roughly 91/110/126px wide). It is capped at 78px so a 2x retina display still
samples within the file's 179px native height — scaling it larger would visibly
soften the mark. If you get higher-resolution KBB artwork, drop it in at this
same path and the cap can be raised.

**Compliance:** the logo must stay larger than Barb's name line beneath it on
every page. See the note at the top of `assets/css/styles.css`.

## Photo credit

Usage rights are confirmed. The RBM Photography watermark on the vertical
dressage photo is **deliberately preserved** out of respect for the photographer
— do not crop or clone it out. A visible "Photo: RBM Photography." credit also
appears in the caption wherever that image is used (`about.html` and
`farms-equestrian.html`).
