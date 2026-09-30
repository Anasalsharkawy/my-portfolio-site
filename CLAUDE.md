# Anas Al-Sharkawy — Portfolio Site

Static one-page portfolio for Anas Al-Sharkawy, Senior Graphic Designer & 2D Animator (Cairo).
Plain HTML/CSS/JS. No framework, no build step, no dependencies. Open `index.html` to preview.

## Structure
- `index.html` — page markup: nav, hero, about, services, work, experience, skills, contact, footer.
- `css/style.css` — all styles. Color tokens are on `:root` at the top (light theme) and
  redefined for dark theme under `prefers-color-scheme: dark` and `:root[data-theme="dark"]`.
- `js/content.js` — ALL editable data: `PROJECTS`, `CATS_AR`, `JOBS`, `TOOLS`, `LANGS`, and `AR` (Arabic page text).
- `js/main.js` — renders content.js into the page (project tabs + masonry grid + viewer dialog, timeline, skill bars),
  and runs the language (English/Arabic) and light/dark toggles in the nav.
- `assets/anas-portrait.webp` — Anas's low-poly portrait, background removed (hero "label" with tilted plates).
- `assets/favicon-32.png`, `icon-192.png`, `apple-touch-icon.png` — site icons cropped from the same portrait (red background).
- `work/<category>/` — compressed project media (webp images, mp4 videos + `-loop.mp4` previews, PDF pages as `-pNN.webp`).

## Content rules
- Content changes go in `js/content.js`, not in main.js or the HTML.
- Project entries: `{ title, title_ar, cat, type, image, w, h, ... }` — see the comment above `PROJECTS` in content.js.
  `type` is "video" (`video` full with sound + `loop` muted card preview), "image" (`full`) or "pdf" (`pages`).
  Tabs are generated from `cat` in order of first appearance; translate new tab names in `CATS_AR`.
  Clicking a card opens the viewer (dialog) with prev/next inside the current tab.
- Media prep (keep the repo small, GitHub's file limit is 100 MB): full videos 720p H.264 crf 28 + AAC 96k + faststart;
  loops 6 s, 640px, no audio; images webp (card ≤720px, full ≤1800px); PDFs rendered to webp pages ~1500px wide.
- Never invent clients, numbers, testimonials, or achievements. Only use facts Anas provides.
  Placeholder text currently reads "Add one line on your role" — replace it only with real info.
- Testimonials, client logos, and a blog were intentionally left out until real content exists.

## Languages (English + Arabic)
- English is the text in `index.html`. Every translatable element has `data-i18n="key"`
  (plus `data-i18n-alt` / `data-i18n-label` for alt text and aria-labels). Its Arabic is `AR[key]` in content.js.
- When you add or change page text, update both: the English in index.html and the matching `AR` entry.
- Projects use `title_ar`, categories use `CATS_AR`, jobs use `what_ar` (optional `name_ar`), `LANGS` entries are `[name, value, arabicName]`.
- Arabic switches the page to `dir="rtl"` and the Cairo font. Use logical CSS properties
  (`margin-inline-start`, `inset-inline-start`, `padding-inline`…) instead of left/right so both directions work.
- The chosen language and theme are saved in localStorage and applied by the inline script in `<head>`.

## Design rules
- Identity comes from Anas's CV: yellow highlight `#F8DE3F`, speech-bubble grey `#D8E1E2`, ink `#1D2329`.
- Font: Archivo (Google Fonts), condensed width (`"wdth" 62`) + heavy weight for headings, normal width for body.
- The speech bubble is the recurring motif (logo, hero, contact). Keep it.
- Motion (all in the "Motion" sections of style.css and main.js, all off under `prefers-reduced-motion`):
  hero rise + marker-drawn highlight + bubble pop + portrait label (plates pop in and rock, portrait floats, pointer parallax), scroll reveals (`.rv`, `.rv-pop` speech-bubble pop,
  `.rv-side`, `.rv-bars` skill bars), card tilt on hover, pen cursor with trailing ring (mouse only),
  scroll progress line, and View Transitions for theme (circle from the button) and language (crossfade).
  New sections: reuse the `reveal()` helper in main.js instead of writing new animation code.
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
- Fill in `JOBS[].what` lines with Anas's real responsibilities.
- Add Open Graph tags + a share image.
- Optional: per-project case study pages (`work/<slug>.html`) reusing css/style.css.
