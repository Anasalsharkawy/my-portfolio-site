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
  updateThemeBtn();
}

langBtn.addEventListener("click", () => {
  setLang(lang === "ar" ? "en" : "ar");
  store.set("lang", lang);
});

themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  root.dataset.theme = next;
  store.set("theme", next);
  updateThemeBtn();
});
/* Follow the system setting until the visitor picks a theme themselves. */
systemDark.addEventListener("change", () => { if (!root.dataset.theme) updateThemeBtn(); });

setLang(lang);
document.getElementById("yr").textContent = new Date().getFullYear();
