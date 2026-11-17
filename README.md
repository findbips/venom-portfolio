# Biplob Sutradhar — portfolio

Static site: no build step. Files: index.html, style.css, script.js, assets/, collab/.

## Edit your content
Open script.js. Everything personal is in the CONTENT object at the top:
text, stats, project cards, links, photos. Save and redeploy.
- Project cards: set `url` on each item in `work` (empty shows "Case study coming soon").
- Photos live in assets/ (me-front.webp = ID card, me-side.webp + me-mask.webp = mask reveal).

## Put it online (free)
Vercel: in this folder run `npx vercel login`, then `npx vercel deploy --prod`
(Windows: use `npx.cmd` if PowerShell blocks npx).
Or drag the folder onto app.netlify.com/drop.
The 3D button needs the site served over http(s), so test after deploying (or run `python -m http.server`).

## Credits
Goo button: Venom Button by exteestudio (MIT), see collab/LICENSE. Original design: Jaman Mahi.
