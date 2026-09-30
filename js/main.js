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
  "work.video": "Video",
  "work.page": "page",
  "work.pages": "pages",
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

/* ============ Projects: tabs, grid, viewer ============ */
const ICON_PLAY = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>`;
const ICON_PAGES = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M8 3h9l3 3v12H8z"/><path d="M4 7v14h12"/></svg>`;

const grid = document.getElementById("grid");
const tabs = document.querySelector(".tabs");
const cats = [...new Set(PROJECTS.map(p => p.cat))];
const catName = c => ar(c, CATS_AR[c]);
const pagesLabel = n => `${n} ${t(n === 1 ? "work.page" : "work.pages")}`;
let activeCat = cats[0];
const inCat = () => PROJECTS.filter(p => p.cat === activeCat);

function media(p){
  const ratio = p.w && p.h ? ` style="aspect-ratio:${p.w}/${p.h}"` : "";
  let inner;
  if (p.type === "video") inner = `<video ${reduce ? "" : `data-src="${esc(p.loop || p.video)}"`} poster="${esc(p.image)}" muted loop playsinline preload="none" aria-hidden="true"></video><span class="badge">${ICON_PLAY}${esc(t("work.video"))}</span>`;
  else if (p.image) inner = `<img src="${esc(p.image)}" alt="" loading="lazy" decoding="async">${p.type === "pdf" && p.pages > 1 ? `<span class="badge">${ICON_PAGES}${esc(pagesLabel(p.pages))}</span>` : ""}`;
  else inner = `<div class="ph"><div><svg viewBox="0 0 84 84" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" aria-hidden="true"><path d="M12 14h60a6 6 0 0 1 6 6v34a6 6 0 0 1-6 6H36L20 72V60h-8a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z"/><path d="M35 28l16 9-16 9z" fill="currentColor"/></svg>${esc(t("work.placeholder"))}</div></div>`;
  return `<div class="media"${ratio}>${inner}</div>`;
}

/* Card loops only play while on screen. */
const loopIO = "IntersectionObserver" in window && !reduce ? new IntersectionObserver(entries => entries.forEach(e => {
  const v = e.target;
  if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); }
  else v.pause();
}), { rootMargin: "100px" }) : null;

function renderTabs(){
  tabs.innerHTML = cats.map(c => {
    const on = c === activeCat;
    return `<button type="button" role="tab" id="tab-${esc(c.replace(/\W+/g, "-"))}" data-cat="${esc(c)}" aria-selected="${on}" aria-controls="grid" tabindex="${on ? 0 : -1}">${esc(catName(c))}<span class="n">${PROJECTS.filter(p => p.cat === c).length}</span></button>`;
  }).join("");
  grid.setAttribute("aria-labelledby", tabs.querySelector('[aria-selected="true"]').id);
}

function renderProjects(){
  renderTabs();
  const items = inCat();
  const landscape = items.reduce((s, p) => s + (p.w && p.h ? p.w / p.h : 1), 0) / items.length > 1.25;
  grid.classList.toggle("landscape", landscape);
  grid.innerHTML = items.map((p, i) => {
    const meta = p.type === "video" ? "" : p.type === "pdf" && p.pages > 1 ? pagesLabel(p.pages) : "";
    return `<button type="button" class="card" data-i="${i}">
      ${media(p)}
      <span class="meta"><h3>${esc(ar(p.title, p.title_ar))}</h3>${meta ? `<span class="cat">${esc(meta)}</span>` : ""}</span>
    </button>`;
  }).join("");
  if (loopIO) grid.querySelectorAll("video[data-src]").forEach(v => loopIO.observe(v));
}

function selectTab(c, focus){
  if (c === activeCat) return;
  activeCat = c;
  renderProjects();
  if (focus) tabs.querySelector('[aria-selected="true"]').focus();
  if (fancy) grid.querySelectorAll(".card").forEach((card, i) => {
    card.style.animationDelay = Math.min(i, 8) * .05 + "s";
    card.classList.add("pop", "rv", "in");
  });
}

tabs.addEventListener("click", e => {
  const b = e.target.closest("[role=tab]"); if (b) selectTab(b.dataset.cat);
});
tabs.addEventListener("keydown", e => {
  const i = cats.indexOf(activeCat), rtl = root.dir === "rtl";
  const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
  let next = step !== undefined ? (i + step + cats.length) % cats.length : e.key === "Home" ? 0 : e.key === "End" ? cats.length - 1 : -1;
  if (next < 0) return;
  e.preventDefault();
  selectTab(cats[next], true);
});

/* Viewer */
const viewer = document.getElementById("viewer");
const vBody = viewer.querySelector(".viewer-body");
let vIndex = 0;

function showItem(i){
  const items = inCat();
  vIndex = (i + items.length) % items.length;
  const p = items[vIndex];
  viewer.querySelector("#viewer-title").textContent = ar(p.title, p.title_ar);
  viewer.querySelector(".viewer-count").textContent = `${vIndex + 1} / ${items.length}`;
  vBody.classList.remove("tall");
  vBody.scrollTop = 0;
  if (p.type === "video") {
    vBody.innerHTML = `<video src="${esc(p.video)}" poster="${esc(p.image)}" controls playsinline ${reduce ? "" : "autoplay"}></video>`;
  } else if (p.type === "pdf") {
    const pages = Array.from({ length: p.pages }, (_, n) => `${p.image.replace(/\.webp$/, "")}-p${String(n + 1).padStart(2, "0")}.webp`);
    vBody.classList.add("tall");
    vBody.innerHTML = `<div class="pages">${pages.map((src, n) => `<img src="${esc(src)}" alt="${esc(`${ar(p.title, p.title_ar)} — ${n + 1}`)}" loading="${n < 2 ? "eager" : "lazy"}" decoding="async">`).join("")}</div>`;
  } else {
    if (p.w && p.h && p.h / p.w > 1.6) vBody.classList.add("tall");
    vBody.innerHTML = `<img src="${esc(p.full || p.image)}" alt="${esc(ar(p.title, p.title_ar))}">`;
  }
  const nav = items.length > 1;
  viewer.querySelectorAll("[data-act=prev],[data-act=next]").forEach(b => b.hidden = !nav);
}

grid.addEventListener("click", e => {
  const card = e.target.closest(".card"); if (!card) return;
  showItem(+card.dataset.i);
  viewer.showModal();
});
viewer.addEventListener("click", e => {
  if (e.target === viewer) return viewer.close();            // backdrop
  const act = e.target.closest("[data-act]")?.dataset.act;
  if (act === "close") viewer.close();
  if (act === "prev") showItem(vIndex - 1);
  if (act === "next") showItem(vIndex + 1);
});
viewer.addEventListener("keydown", e => {
  if (e.target.closest("video")) return;                     // let the player use its own arrow keys
  const rtl = root.dir === "rtl";
  if (e.key === "ArrowRight") showItem(vIndex + (rtl ? -1 : 1));
  if (e.key === "ArrowLeft") showItem(vIndex + (rtl ? 1 : -1));
});
viewer.addEventListener("close", () => { vBody.innerHTML = ""; });

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
  reveal(document.querySelectorAll(".head .lede, .about .big, .tabs, .more"));
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

/* Hero portrait parallax: the label layers follow the pointer at different depths */
const portrait = document.querySelector(".portrait");
if (fancy && portrait && matchMedia("(hover: hover)").matches) {
  const hero = document.querySelector(".hero");
  hero.addEventListener("pointermove", e => {
    const r = portrait.getBoundingClientRect();
    const mx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 1.2)));
    const my = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 1.2)));
    portrait.style.setProperty("--mx", mx.toFixed(3));
    portrait.style.setProperty("--my", my.toFixed(3));
  });
  hero.addEventListener("pointerleave", () => { portrait.style.removeProperty("--mx"); portrait.style.removeProperty("--my"); });
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
      { duration: 650, easing: "cubic-bezier(.6,0,.2,1)", pseudoElement: "::view-transition-new(root)" })).catch(() => {});
    vt.finished.catch(() => {}).finally(() => root.classList.remove("vt-circle"));
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
