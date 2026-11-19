// The PREVIEW monitor's demonstration (#24). It plays the app's loop the way the app plays it:
// while the shortcut is held the tally lamp is lit and the HUD says Recording; on release it says
// Transcribing, and then the whole sentence is pasted at the caret at once — Open Whisper pastes
// finished text, it never types word by word. Esc while holding cancels and pastes nothing.
//
// Nothing is heard: the page never asks for the microphone, and the sentences are written in
// advance (#demo-data). The meter is drawn from a made-up voice, not from any sound.
//
// Every way a take can start has a way it is sure to end: the key-up or pointer-up that ends it,
// Esc, leaving the window or the key (a lost key-up cancels, as the app cancels a take it lost),
// and a cancelled touch. A click with no take behind it — a screen reader in browse mode, voice
// control — plays a whole take by itself.
//
// The monitor first plays one take by itself, once, when it comes into view: a still note gave a
// visitor nothing to see (the owner's finding). That take leaves the invitation at the caret, and
// screen readers do not hear it: it is the picture, not something they did.

const data = JSON.parse(document.getElementById("demo-data").textContent);
const hero = document.querySelector(".hero");
const screen = document.getElementById("screen");
const typed = document.getElementById("typed");
const meter = document.getElementById("meter");
const label = document.getElementById("hud-label");
const announce = document.getElementById("announce");
const talkback = document.getElementById("talkback");
const trays = [...document.querySelectorAll("[data-tray]")];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

const BARS = 14;
const SHORTEST_MS = 450;     // a tap is not a dictation: the app would hear nothing either
const TRANSCRIBE_MS = 700;
const AUTO_TAKE_MS = 1800;   // a click's take: as long as a short sentence
for (let i = 0; i < BARS; i++) meter.appendChild(document.createElement("i"));
const bars = [...meter.children];

let state = "idle";
let startedAt = 0;
let next = 0;
let by = null;               // "keys", "button", "pointer" or "auto": only what started a take ends it
let frame = 0;
let timers = [];
let freshTimer = 0;          // the pasted sentence's highlight: not a take's timer, never cancelled by one

function later(ms, fn) {
  timers.push(setTimeout(fn, ms));
}
function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function tray(name) {
  for (const img of trays) img.src = img.src.replace(/tray-[a-z0-9-]+\.png/, `tray-${name}-white.png`);
}

function say(text, region = announce, spoken = "") {
  region.textContent = "";
  // Emptied first, so a repeated message is announced again. `spoken` is heard, not shown.
  requestAnimationFrame(() => {
    region.textContent = text;
    if (spoken) {
      const extra = document.createElement("span");
      extra.className = "sr-only";
      extra.textContent = ` ${spoken}`;
      region.appendChild(extra);
    }
  });
}

function setState(next, hudText) {
  state = next;
  screen.dataset.state = next;
  hero.dataset.onair = String(next === "recording");
  if (hudText) label.textContent = hudText;
}

// A voice, made up: syllables of uneven loudness with short gaps between words. Redrawn every
// 60 ms, about as often as the app's capture thread reports a level.
function drawMeter() {
  if (state !== "recording") return;
  const s = performance.now() / 1000;
  const syllable = ((Math.sin(s * 11.3) + 1) / 2) * ((Math.sin(s * 4.1 + 1) + 1.4) / 2.4);
  const gap = Math.sin(s * 1.7) > 0.82 ? 0.12 : 1;
  const level = Math.min(1, gap * (0.3 + 0.7 * syllable));
  bars.forEach((bar, i) => {
    const weight = 1 - Math.abs(i - (BARS - 1) / 2) / ((BARS - 1) / 2);
    const h = 0.14 + level * 0.86 * (0.35 + 0.65 * weight) * (0.75 + Math.random() * 0.5);
    bar.style.setProperty("--h", Math.min(1, h).toFixed(3));
  });
}

function start(source) {
  // A cancelled take is over the moment it is shown: the next press starts a new one.
  if (state !== "idle" && state !== "cancelled") return;
  clearTimers();
  by = source;
  startedAt = performance.now();
  announce.setAttribute("aria-live", source === "attract" ? "off" : "polite");
  if (source !== "attract") document.getElementById("ghost")?.remove(); // the invitation has been taken up
  setState("recording", data.hud.recording);
  tray("recording");
  say(data.announce.recording);
  bars.forEach((bar) => bar.style.setProperty("--h", "0.14"));
  if (!reduced.matches) {
    drawMeter();
    frame = setInterval(drawMeter, 60);
  } else bars.forEach((bar, i) => bar.style.setProperty("--h", String(0.3 + (i % 3) * 0.18)));
}

function release(source) {
  if (state !== "recording" || source !== by) return;
  clearInterval(frame);
  if (performance.now() - startedAt < SHORTEST_MS) {
    setState("cancelled", data.hud.cancelled);
    tray("idle");
    say(data.announce.short);
    later(1400, () => setState("idle"));
    return;
  }
  setState("processing", data.hud.processing);
  say(data.announce.processing);
  let tick = 0;
  const spin = setInterval(() => tray(`processing-${(tick++ % 3) + 1}`), 220);
  later(TRANSCRIBE_MS, () => {
    clearInterval(spin);
    paste(data.sentences[next++ % data.sentences.length]);
  });
}

function cancel(source) {
  if (state !== "recording" || (source && source !== by)) return;
  clearInterval(frame);
  setState("cancelled", data.hud.cancelled);
  tray("idle");
  say(data.announce.cancelled);
  later(900, () => setState("idle"));
}

function paste(sentence) {
  for (const old of typed.querySelectorAll(".fresh")) old.classList.remove("fresh");
  const span = document.createElement("span");
  span.className = "fresh";
  span.textContent = (typed.textContent ? " " : "") + sentence;
  typed.appendChild(span);
  // Nothing pasted is ever taken away: a full note scrolls, as an editor does.
  const doc = document.getElementById("doc");
  doc.scrollTop = doc.scrollHeight;
  setState("idle");
  tray("idle");
  say(data.announce.pasted, announce, sentence);
  clearTimeout(freshTimer);
  freshTimer = setTimeout(() => span.classList.remove("fresh"), 1600);
}

// A whole take with no hands on the keys: recording, transcribing, pasted.
function autoTake(source = "auto") {
  start(source);
  if (by === source) later(AUTO_TAKE_MS, () => release(source));
}

// The first take plays itself once the monitor is mostly on screen, unless the visitor got there
// first.
const ATTRACT_DELAY_MS = 1200;
new IntersectionObserver((entries, observer) => {
  if (!entries.some((entry) => entry.isIntersecting)) return;
  observer.disconnect();
  setTimeout(() => {
    if (state === "idle" && startedAt === 0 && document.visibilityState === "visible") autoTake("attract");
  }, ATTRACT_DELAY_MS);
}, { threshold: 0.6 }).observe(screen);

// The shortcut itself: ⌘⇧Space on a Mac, Ctrl+Shift+Space elsewhere. Both are taken anywhere,
// so a Linux visitor whose keycaps show ⌘ still gets the demo with Ctrl.
const isChord = (e) => e.code === "Space" && e.shiftKey && (e.metaKey || e.ctrlKey) && !e.altKey;
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && state === "recording") {
    e.preventDefault();
    cancel();
    return;
  }
  if (!isChord(e)) return;
  e.preventDefault();
  if (!e.repeat) start("keys");
});
document.addEventListener("keyup", (e) => {
  if (by === "keys" && ["Space", "ShiftLeft", "ShiftRight", "MetaLeft", "MetaRight", "ControlLeft", "ControlRight"].includes(e.code)) {
    release("keys");
  }
});
// Switching away mid-take loses the key-up: end it the way the app would end a take it lost.
addEventListener("blur", () => cancel());

// The on-screen talkback key: held with a pointer, or with Space or Enter when focused.
talkback.addEventListener("pointerdown", (e) => {
  if (e.button !== 0) return;
  talkback.setPointerCapture(e.pointerId);
  start("pointer");
});
talkback.addEventListener("pointerup", () => release("pointer"));
talkback.addEventListener("pointercancel", () => cancel("pointer"));
talkback.addEventListener("contextmenu", (e) => e.preventDefault());
talkback.addEventListener("keydown", (e) => {
  if ((e.key === " " || e.key === "Enter") && !isChord(e)) {
    e.preventDefault();
    if (!e.repeat) start("button");
  }
});
talkback.addEventListener("keyup", (e) => {
  if (e.key === " " || e.key === "Enter") release("button");
});
// Focus leaving the key mid-take (Tab while holding Space) takes its key-up with it.
talkback.addEventListener("blur", () => cancel("button"));
talkback.addEventListener("click", (e) => {
  e.preventDefault();
  // A press already played its take; a bare click (detail 0, or no take behind it) plays one.
  if (state === "idle" && performance.now() - startedAt > 1500) autoTake();
});

// PROGRAM's timecode: the video's own position, lit while it plays.
const program = document.getElementById("program");
const timecode = document.getElementById("timecode");
if (program && timecode) {
  const pad = (n) => String(Math.floor(n)).padStart(2, "0");
  const show = () => {
    const t = program.currentTime;
    timecode.textContent = `${pad(t / 3600)}:${pad((t / 60) % 60)}:${pad(t % 60)}:${pad((t % 1) * 30)}`;
  };
  program.addEventListener("timeupdate", show);
  program.addEventListener("seeked", show);
  program.addEventListener("play", () => timecode.parentElement.classList.add("is-live"));
  program.addEventListener("pause", () => timecode.parentElement.classList.remove("is-live"));
}

// The monitor wall's appearance: a pair of latching keys, starting at the visitor's own.
const wall = document.getElementById("wall");
const schemeKeys = [...document.querySelectorAll(".latches--scheme [data-scheme]")];
function setScheme(scheme) {
  wall.dataset.scheme = scheme;
  for (const key of schemeKeys) {
    const on = key.dataset.scheme === scheme;
    key.setAttribute("aria-checked", String(on));
    key.tabIndex = on ? 0 : -1; // one Tab stop; the arrows move between the two
  }
}
setScheme(matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
schemeKeys.forEach((key, i) => {
  key.addEventListener("click", () => setScheme(key.dataset.scheme));
  key.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const other = schemeKeys[(i + 1) % schemeKeys.length];
    setScheme(other.dataset.scheme);
    other.focus();
  });
});

// Copy the checksum command.
const copyStatus = document.getElementById("copy-status");
for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).textContent);
      button.classList.add("is-done");
      say(data.copied, copyStatus);
      setTimeout(() => button.classList.remove("is-done"), 1500);
    } catch {
      // The clipboard refused (an insecure context, a denied permission): select the command instead.
      const range = document.createRange();
      range.selectNodeContents(document.getElementById(button.dataset.copy));
      getSelection().removeAllRanges();
      getSelection().addRange(range);
      say(data.copyFailed, copyStatus);
    }
  });
}

// On a phone there is nothing to install: hand the link to the computer instead.
for (const button of document.querySelectorAll("[data-share]")) {
  button.addEventListener("click", async () => {
    const url = button.dataset.share;
    try {
      if (navigator.share) return await navigator.share({ title: button.dataset.shareTitle, url });
      await navigator.clipboard.writeText(url);
      say(data.shared);
    } catch (error) {
      if (error?.name !== "AbortError") location.hash = "download";
    }
  });
}

// After the download starts, the next step is SmartScreen's: bring its instructions into view.
const nextSteps = document.getElementById("next");
for (const link of document.querySelectorAll("[data-next]")) {
  link.addEventListener("click", () => {
    setTimeout(() => {
      nextSteps.classList.add("is-next");
      nextSteps.scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth", block: "center" });
      nextSteps.focus({ preventScroll: true });
    }, 400);
  });
}
