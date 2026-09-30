# Anas Al-Sharkawy — Portfolio

One-page portfolio site. No build step.

**Preview:** open `index.html` in a browser, or run `npx serve .` (or `python3 -m http.server`) in this folder.

**Edit content:** everything you'll normally change is in `js/content.js` (projects, jobs, skills).
Put project images/videos in `work/` and reference them like `"work/my-project.mp4"`.
Arabic text is in the `AR` block at the bottom of `js/content.js` (plus `title_ar` / `what_ar` fields).

**With Claude Code:** run `claude` in this folder. It reads `CLAUDE.md` for the project rules.
Example: *"Add a project called 'Nahdet Misr science series', category E-learning, video work/science.mp4, make it wide."*

**Deploy free:** drag this folder onto https://app.netlify.com/drop, or push to GitHub and connect it to Netlify / GitHub Pages.
