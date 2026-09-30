# Anas Al-Sharkawy — Portfolio Site

Static one-page portfolio for Anas Al-Sharkawy, Senior Graphic Designer & 2D Animator (Cairo).
Plain HTML/CSS/JS. No framework, no build step, no dependencies. Open `index.html` to preview.

## Structure
- `index.html` — page markup: nav, hero, about, services, work, experience, skills, contact, footer.
- `css/style.css` — all styles. Color tokens are on `:root` at the top (light theme) and
  redefined for dark theme under `prefers-color-scheme: dark` and `:root[data-theme="dark"]`.
- `js/content.js` — ALL editable data: `PROJECTS`, `JOBS`, `TOOLS`, `LANGS`.
- `js/main.js` — renders content.js into the page (project grid + filters, timeline, skill bars).
- `assets/anas-desk.webp` — Anas's illustrated self-portrait (from his CV). Transparent background.
- `work/` — put project thumbnails (.jpg/.webp) and short looping videos (.mp4) here.

## Content rules
- Content changes go in `js/content.js`, not in main.js or the HTML.
- Project entries: `{ title, cat, wide?, video, image, link }`. Paths are relative, e.g. `"work/brand.mp4"`.
  `video` autoplays muted and looped (not when the visitor prefers reduced motion); `image` becomes its poster.
  Filter buttons are generated automatically from the `cat` values.
- Never invent clients, numbers, testimonials, or achievements. Only use facts Anas provides.
  Placeholder text currently reads "Add one line on your role" — replace it only with real info.
- Testimonials, client logos, and a blog were intentionally left out until real content exists.

## Design rules
- Identity comes from Anas's CV: yellow highlight `#F8DE3F`, speech-bubble grey `#D8E1E2`, ink `#1D2329`.
- Font: Archivo (Google Fonts), condensed width (`"wdth" 62`) + heavy weight for headings, normal width for body.
- The speech bubble is the recurring motif (logo, hero, contact). Keep it.
- Only one intro animation (the hero bubble pop). Don't add scroll-reveal or hover effects on every element.
- Avoid ALL-CAPS labels, numbered section eyebrows, and generic card grids.
- Keep it responsive down to ~360px, keep visible keyboard focus, respect `prefers-reduced-motion`.

## Contact details (already in index.html)
- Email: Anasskillbuild@gmail.com
- WhatsApp/phone: +20 109 675 4569 (wa.me/201096754569)
- Behance: https://www.behance.net/AnasSkills
- Location: Mohandessin, Cairo, Egypt

## Deploy
Static hosting, no build: Netlify (drag the folder onto app.netlify.com/drop, or connect the Git repo),
GitHub Pages, or Vercel. `netlify.toml` publishes the repo root.

## Good next tasks
- Add real projects to `PROJECTS` and media to `work/` (compress videos: under ~3 MB, 720p, no audio).
- Fill in `JOBS[].what` lines with Anas's real responsibilities.
- Add Open Graph tags + a share image, and a favicon.
- Optional: per-project case study pages (`work/<slug>.html`) reusing css/style.css.
