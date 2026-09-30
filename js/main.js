/* Renders the content defined in js/content.js. */
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function media(p){
  if (p.video) return `<video src="${esc(p.video)}" ${p.image?`poster="${esc(p.image)}"`:""} muted loop playsinline ${reduce?"":"autoplay"} preload="metadata"></video>`;
  if (p.image) return `<img src="${esc(p.image)}" alt="" loading="lazy">`;
  return `<div class="ph"><div><svg viewBox="0 0 84 84" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" aria-hidden="true"><path d="M12 14h60a6 6 0 0 1 6 6v34a6 6 0 0 1-6 6H36L20 72V60h-8a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z"/><path d="M35 28l16 9-16 9z" fill="currentColor"/></svg>Add a thumbnail or video</div></div>`;
}

const grid = document.getElementById("grid");
grid.innerHTML = PROJECTS.map(p => `
  <a class="card${p.wide?" wide":""}" data-cat="${esc(p.cat)}" href="${esc(p.link||"#")}" target="_blank" rel="noopener">
    <div class="media">${media(p)}</div>
    <div class="meta"><h3>${esc(p.title)}</h3><span class="cat">${esc(p.cat)}</span></div>
  </a>`).join("");

const cats = ["All", ...new Set(PROJECTS.map(p => p.cat))];
const filters = document.querySelector(".filters");
filters.innerHTML = cats.map((c,i) => `<button type="button" aria-pressed="${i===0}">${esc(c)}</button>`).join("");
filters.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  filters.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x===b));
  const c = b.textContent;
  grid.querySelectorAll(".card").forEach(card => card.hidden = !(c==="All" || card.dataset.cat===c));
});

document.getElementById("timeline").innerHTML = JOBS.map(j => `
  <li>
    <span class="yrs">${esc(j.from)} – ${j.to==="Now"?'<span class="now">Now</span>':esc(j.to)}</span>
    <div><h3>${esc(j.name)}</h3><p class="what">${esc(j.what)}</p></div>
    ${j.type?`<span class="type">${esc(j.type)}</span>`:"<span></span>"}
  </li>`).join("");

const bars = list => list.map(([n,v]) => `<li><div class="name">${esc(n)}</div><div class="track" role="img" aria-label="${esc(n)}: ${v} out of 100"><div class="fill" style="--v:${v}%"></div></div></li>`).join("");
document.getElementById("tools").innerHTML = bars(TOOLS);
document.getElementById("langs").innerHTML = bars(LANGS);
document.getElementById("yr").textContent = new Date().getFullYear();
