/* Renders the content defined in js/content.js, and handles the language and theme toggles. */
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;
const store = {
  get: k => { try { return localStorage.getItem(k); } catch(e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch(e) {} }
};

/* ============ Language ============ */
/* English comes from the HTML itself; remember it so we can switch back. */
const EN = {
  "meta.desc": document.querySelector('meta[name="description"]').content,
  "work.placeholder": "Add a thumbnail or video",
  "exp.now": "Now",
  "skills.outOf": "out of 100",
  "ui.toDark": "Switch to dark mode",
  "ui.toLight": "Switch to light mode"
};
const textEls = [...document.querySelectorAll("[data-i18n]")];
const altEls = [...document.querySelectorAll("[data-i18n-alt]")];
const labelEls = [...document.querySelectorAll("[data-i18n-label]")];
textEls.forEach(el => EN[el.dataset.i18n] = el.innerHTML.trim());
altEls.forEach(el => EN[el.dataset.i18nAlt] = el.alt);
labelEls.forEach(el => EN[el.dataset.i18nLabel] = el.getAttribute("aria-label"));

let lang = root.lang === "ar" ? "ar" : "en";
const t = key => (lang === "ar" && AR[key]) || EN[key] || "";
const ar = (en, arText) => (lang === "ar" && arText) || en;

function applyStatic(){
  textEls.forEach(el => el.innerHTML = t(el.dataset.i18n));
  altEls.forEach(el => el.alt = t(el.dataset.i18nAlt));
  labelEls.forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nLabel)));
  document.querySelector('meta[name="description"]').content = t("meta.desc");
}

/* ============ Projects ============ */
function media(p){
  if (p.video) return `<video src="${esc(p.video)}" ${p.image?`poster="${esc(p.image)}"`:""} muted loop playsinline ${reduce?"":"autoplay"} preload="metadata"></video>`;
  if (p.image) return `<img src="${esc(p.image)}" alt="" loading="lazy">`;
  return `<div class="ph"><div><svg viewBox="0 0 84 84" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" aria-hidden="true"><path d="M12 14h60a6 6 0 0 1 6 6v34a6 6 0 0 1-6 6H36L20 72V60h-8a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z"/><path d="M35 28l16 9-16 9z" fill="currentColor"/></svg>${esc(t("work.placeholder"))}</div></div>`;
}

const grid = document.getElementById("grid");
const filters = document.querySelector(".filters");
const cats = ["All", ...new Set(PROJECTS.map(p => p.cat))];
const catName = c => ar(c, CATS_AR[c]);
let activeCat = "All";

function applyFilter(){
  filters.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === activeCat));
  grid.querySelectorAll(".card").forEach(card => card.hidden = !(activeCat === "All" || card.dataset.cat === activeCat));
}

function renderProjects(){
  grid.innerHTML = PROJECTS.map(p => `
    <a class="card${p.wide?" wide":""}" data-cat="${esc(p.cat)}" href="${esc(p.link||"#")}" target="_blank" rel="noopener">
      <div class="media">${media(p)}</div>
      <div class="meta"><h3>${esc(ar(p.title, p.title_ar))}</h3><span class="cat">${esc(catName(p.cat))}</span></div>
    </a>`).join("");
  filters.innerHTML = cats.map(c => `<button type="button" data-cat="${esc(c)}">${esc(catName(c))}</button>`).join("");
  applyFilter();
}

filters.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  activeCat = b.dataset.cat;
  applyFilter();
  if (fancy) grid.querySelectorAll(".card:not([hidden])").forEach((card, i) => {
    card.classList.remove("pop"); void card.offsetWidth;
    card.style.animationDelay = i * .06 + "s";
    card.classList.add("pop", "in");
  });
});

/* ============ Experience & skills ============ */
function renderTimeline(){
  document.getElementById("timeline").innerHTML = JOBS.map(j => `
    <li>
      <span class="yrs">${esc(j.from)} – ${j.to==="Now"?`<span class="now">${esc(t("exp.now"))}</span>`:esc(j.to)}</span>
      <div><h3>${esc(ar(j.name, j.name_ar))}</h3><p class="what">${esc(ar(j.what, j.what_ar))}</p></div>
      ${j.type?`<span class="type">${esc(ar(j.type, AR["exp."+j.type]))}</span>`:"<span></span>"}
    </li>`).join("");
}

const bars = list => list.map(([n,v,nAr]) => {
  const name = ar(n, nAr);
  return `<li><div class="name">${esc(name)}</div><div class="track" role="img" aria-label="${esc(name)}: ${v} ${esc(t("skills.outOf"))}"><div class="fill" style="--v:${v}%"></div></div></li>`;
}).join("");

function renderSkills(){
  document.getElementById("tools").innerHTML = bars(TOOLS);
  document.getElementById("langs").innerHTML = bars(LANGS);
}

/* ============ Motion ============ */
const fancy = !reduce;
const io = fancy && "IntersectionObserver" in window
  ? new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: .12 })
  : null;
let firstRender = true;

/* Hide elements until they scroll into view, staggered by `step` seconds.
   After the first render (e.g. a language switch) new elements just appear. */
function reveal(els, cls = "", step = .08){
  if (!io) return;
  [...els].forEach((el, i) => {
    if (el.classList.contains("rv")) return;
    el.classList.add("rv", ...cls.split(" ").filter(Boolean));
    if (firstRender) { el.style.setProperty("--d", Math.min(i, 6) * step + "s"); io.observe(el); }
    else el.classList.add("in");
  });
}

function revealRendered(){
  reveal(grid.querySelectorAll(".card"));
  reveal(document.querySelectorAll(".timeline li"), "rv-side", .06);
  document.querySelectorAll(".bars").forEach(ul =>
    ul.querySelectorAll(".fill").forEach((f, i) => f.style.transitionDelay = .2 + i * .1 + "s"));
}

if (io) {
  reveal(document.querySelectorAll("section.block h2, .skills-wrap h3"), "rv-pop");
  reveal(document.querySelectorAll(".head .lede, .about .big, .filters, .more"));
  reveal(document.querySelectorAll(".facts li"), "", .06);
  reveal(document.querySelectorAll(".svc"), "", .1);
  reveal(document.querySelectorAll(".bars"), "rv-bars");
  reveal(document.querySelectorAll(".cta"), "rv-pop");
  reveal(document.querySelectorAll(".links a"), "", .1);
}

/* Scroll progress line */
const progress = document.createElement("div");
progress.className = "progress";
document.body.prepend(progress);
const updateProgress = () => {
  const h = root.scrollHeight - innerHeight;
  progress.style.setProperty("--p", h > 0 ? scrollY / h : 0);
};
addEventListener("scroll", updateProgress, { passive: true });
addEventListener("resize", updateProgress);

/* Project cards tilt toward the pointer */
if (fancy && matchMedia("(hover: hover)").matches) {
  grid.addEventListener("pointermove", e => {
    const m = e.target.closest(".card")?.querySelector(".media"); if (!m) return;
    const r = m.getBoundingClientRect();
    m.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 10 + "deg");
    m.style.setProperty("--rx", (.5 - (e.clientY - r.top) / r.height) * 8 + "deg");
  });
  grid.addEventListener("pointerout", e => {
    const card = e.target.closest(".card");
    if (!card || card.contains(e.relatedTarget)) return;
    const m = card.querySelector(".media");
    m.style.removeProperty("--rx"); m.style.removeProperty("--ry");
  });
}

/* Pen cursor with a trailing ring (mouse/trackpad only) */
if (fancy && matchMedia("(pointer: fine)").matches) {
  root.classList.add("has-cursor");
  const ring = document.createElement("div");
  ring.className = "cursor";
  ring.setAttribute("aria-hidden", "true");
  document.body.append(ring);
  let x = 0, y = 0, cx = 0, cy = 0, running = false;
  const follow = () => {
    cx += (x - cx) * .2; cy += (y - cy) * .2;
    ring.style.transform = `translate(${cx}px,${cy}px)`;
    running = Math.abs(x - cx) + Math.abs(y - cy) > .3;
    if (running) requestAnimationFrame(follow);
  };
  addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    x = e.clientX; y = e.clientY;
    if (!ring.classList.contains("on")) { cx = x; cy = y; ring.classList.add("on"); }
    ring.classList.toggle("hover", !!e.target.closest("a, button"));
    if (!running) { running = true; requestAnimationFrame(follow); }
  }, { passive: true });
  root.addEventListener("mouseleave", () => ring.classList.remove("on"));
}

/* Run a page update as a View Transition when the browser supports it. */
function transition(update, circleFrom){
  if (!fancy || !document.startViewTransition) return update();
  if (circleFrom) root.classList.add("vt-circle");
  const vt = document.startViewTransition(update);
  if (circleFrom) {
    const r = circleFrom.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    vt.ready.then(() => root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(.6,0,.2,1)", pseudoElement: "::view-transition-new(root)" }));
    vt.finished.finally(() => root.classList.remove("vt-circle"));
  }
}

/* ============ Toggles ============ */
const langBtn = document.getElementById("lang-btn");
const themeBtn = document.getElementById("theme-btn");
const systemDark = matchMedia("(prefers-color-scheme: dark)");
const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : systemDark.matches;

function updateThemeBtn(){
  const dark = isDark();
  themeBtn.querySelector(".i-moon").toggleAttribute("hidden", dark);
  themeBtn.querySelector(".i-sun").toggleAttribute("hidden", !dark);
  themeBtn.setAttribute("aria-label", t(dark ? "ui.toLight" : "ui.toDark"));
}

function setLang(next){
  lang = next;
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
  /* The button offers the other language, labelled in that language. */
  langBtn.textContent = lang === "ar" ? "English" : "عربي";
  langBtn.lang = lang === "ar" ? "en" : "ar";
  applyStatic();
  renderProjects();
  renderTimeline();
  renderSkills();
  revealRendered();
  updateThemeBtn();
}

langBtn.addEventListener("click", () => {
  const next = lang === "ar" ? "en" : "ar";
  transition(() => setLang(next));
  store.set("lang", next);
});

themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  transition(() => { root.dataset.theme = next; updateThemeBtn(); }, themeBtn);
  store.set("theme", next);
});
/* Follow the system setting until the visitor picks a theme themselves. */
systemDark.addEventListener("change", () => { if (!root.dataset.theme) updateThemeBtn(); });

setLang(lang);
firstRender = false;
updateProgress();
document.getElementById("yr").textContent = new Date().getFullYear();
