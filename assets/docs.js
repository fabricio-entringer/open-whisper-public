// The documentation's running order and its search (#23).
//
// A block the reader has reached the end of keeps its amber LED in the rundown. That memory lives in
// this browser only (localStorage) and is never sent anywhere; without it the page works the same.
// The search reads a small index written at build time beside the page, from the same site.

const READ_KEY = "open-whisper.docs.read";

function readSet() {
  try {
    return new Set(JSON.parse(localStorage.getItem(READ_KEY) || "[]"));
  } catch {
    return new Set();
  }
}
function markRead(slug) {
  const read = readSet();
  if (read.has(slug)) return;
  read.add(slug);
  try {
    localStorage.setItem(READ_KEY, JSON.stringify([...read]));
  } catch {
    // Private window or blocked storage: the LED simply stays as it was.
  }
  paintRead(read);
}
function paintRead(read = readSet()) {
  for (const el of document.querySelectorAll("[data-slug].cue, [data-slug].sheet__row"))
    el.classList.toggle("is-read", read.has(el.dataset.slug));
}
paintRead();

// Reaching a block's foot is reading it.
const block = document.querySelector("article.block[data-slug]");
const foot = document.querySelector(".block__foot");
if (block && foot && "IntersectionObserver" in window) {
  new IntersectionObserver((entries, observer) => {
    if (entries.some((e) => e.isIntersecting)) {
      markRead(block.dataset.slug);
      observer.disconnect();
    }
  }).observe(foot);
}

// On a narrow screen the rundown folds above the page, except on the docs' front page.
const fold = document.querySelector(".rundown__fold");
const narrow = matchMedia("(max-width: 1020px)");
function settleFold() {
  if (!fold) return;
  if (!narrow.matches) fold.open = true;
  else if (block) fold.open = false;
}
settleFold();
narrow.addEventListener("change", settleFold);
fold?.querySelector("summary")?.addEventListener("click", (e) => {
  if (!narrow.matches) e.preventDefault(); // wide: the rundown is always open
});

// ---- search --------------------------------------------------------------------------------
const form = document.querySelector(".search");
const input = document.getElementById("search");
const panel = document.getElementById("results");
const list = panel?.querySelector(".results__list");
const count = document.getElementById("results-count");
const strings = JSON.parse(document.getElementById("docs-data")?.textContent || "{}");
let index = null;

const fold_ = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

async function load() {
  if (index) return index;
  const res = await fetch(form.dataset.index);
  index = (await res.json()).map((e) => ({ ...e, hay: fold_(`${e.page} ${e.section} ${e.text}`), head: fold_(`${e.page} ${e.section}`) }));
  return index;
}

// The words around the first match, with every term marked.
function snippet(text, terms) {
  const folded = fold_(text);
  const at = Math.max(0, ...terms.map((t) => folded.indexOf(t)).filter((n) => n >= 0).slice(0, 1));
  const start = Math.max(0, at - 60);
  let part = (start ? "…" : "") + text.slice(start, start + 170) + (start + 170 < text.length ? "…" : "");
  let html = escapeHtml(part);
  for (const t of terms) {
    const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    // Marks only where the folded text matches; accents in the original are kept.
    html = html.replace(/[^<>]+(?=<|$)/g, (chunk) => {
      const f = fold_(chunk);
      let out = "", i = 0, m;
      re.lastIndex = 0;
      while ((m = re.exec(f))) {
        out += chunk.slice(i, m.index) + `<mark>${chunk.slice(m.index, m.index + m[0].length)}</mark>`;
        i = m.index + m[0].length;
      }
      return out + chunk.slice(i);
    });
  }
  return html;
}

async function search(q) {
  const terms = fold_(q).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) {
    panel.hidden = true;
    return;
  }
  const entries = await load();
  const hits = entries
    .filter((e) => terms.every((t) => e.hay.includes(t)))
    .map((e) => ({ e, score: terms.reduce((s, t) => s + (e.head.includes(t) ? 3 : 1), 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  list.innerHTML = hits
    .map(
      ({ e }) =>
        `<li><a href="${e.url}"><span class="results__where">${escapeHtml(e.block)} · ${escapeHtml(e.page)}</span><span class="results__title">${escapeHtml(e.section || e.page)}</span><span class="results__snip">${snippet(e.text, terms)}</span></a></li>`,
    )
    .join("");
  count.textContent = hits.length
    ? hits.length === 1
      ? strings.result
      : strings.results.replace("{n}", hits.length)
    : strings.noResults.replace("{q}", q);
  panel.hidden = false;
}

if (form && input) {
  let timer = 0;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => search(input.value.trim()), 80);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const first = list.querySelector("a");
    if (first) location.href = first.href;
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      list.querySelector("a")?.focus();
    } else if (e.key === "Escape") {
      input.value = "";
      panel.hidden = true;
    }
  });
  list.addEventListener("keydown", (e) => {
    const links = [...list.querySelectorAll("a")];
    const i = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[Math.min(i + 1, links.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      (i <= 0 ? input : links[i - 1]).focus();
    } else if (e.key === "Escape") {
      input.focus();
      panel.hidden = true;
    }
  });
  document.addEventListener("click", (e) => {
    if (!form.contains(e.target)) panel.hidden = true;
  });
  // "/" anywhere outside a field comes back to the search, as in most help systems.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable) return;
    e.preventDefault();
    input.focus();
  });
  // A search arriving in the address (?q=…) runs at once.
  const q = new URLSearchParams(location.search).get("q");
  if (q) {
    input.value = q;
    search(q);
  }
}
