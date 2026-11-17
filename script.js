/* ===== All your personal content lives here. Edit this block, save, redeploy. ===== */
const CONTENT = {
  name: "Biplob Sutradhar",
  role: "WordPress Developer",
  tagline: "I turn slow, underperforming WordPress and WooCommerce sites into fast, secure, high-converting ones.",
  company: "Founder & CEO, Enlab Tech",
  about: "I’m Biplob, a WordPress and WooCommerce developer with 9+ years of experience. I don’t just build websites. I optimize them to load faster, rank higher and turn more visitors into customers. From hacked sites and risky migrations to conversion-focused stores, I fix what’s holding your site back. I also run my own businesses, so I care about results, not just code.",
  strengths: ["Performance", "Conversion", "Security"],
  skills: ["WordPress", "WooCommerce", "Speed optimization", "Technical SEO", "Security & malware cleanup", "Migrations"],
  tools: ["WP", "Woo", "PHP", "MySQL", "JS", "Elementor"],
  stats: [["100%", "Job Success"], ["4.8★", "Upwork rating"], ["73", "Jobs"], ["700+", "Hours"], ["9+", "Years"]],
  /* Replace url with a live link for each project. Empty url shows “Case study coming soon”. */
  work: [
    { title: "WordPress security & hack recovery", tag: "Security", desc: "Malicious files cleaned, core and plugins updated, site secured.", url: "" },
    { title: "WooCommerce database migration", tag: "Migration", desc: "A demo store moved to its live home without losing data.", url: "" },
    { title: "Website recovery after domain expiry", tag: "Recovery", desc: "A site that went down after its domain lapsed, restored.", url: "" },
    { title: "Responsive Elementor / Divi site", tag: "Build", desc: "A clean, mobile-ready WordPress site built to spec.", url: "" },
    { title: "One-page event website", tag: "Landing page", desc: "A fast single-page site for an events brand.", url: "" },
    { title: "Loan calculator", tag: "Custom tool", desc: "An interactive calculator built into WordPress.", url: "" }
  ],
  steps: [["Audit", "Find what slows, breaks or leaks revenue."], ["Fix & build", "Clean code, plugins, security and migrations."], ["Speed & SEO", "Caching, images and technical SEO."], ["Launch & support", "Go live, monitor, hand over."]],
  email: "findbips@gmail.com",
  whatsapp: "8801612984848", whatsappLabel: "+880 1612 984848",
  socials: [["Upwork", "https://www.upwork.com/freelancers/~01d3ac589e4084ad3f"], ["LinkedIn", "https://www.linkedin.com/in/biplobsutradhar/"]],
  upwork: "https://www.upwork.com/freelancers/~01d3ac589e4084ad3f",
  photos: { card: "assets/me-front.webp", normal: "assets/me-side.webp", hero: "assets/me-mask.webp" },
  code: "ID · 2026 · BS-01",
  strapText: "WORDPRESS DEVELOPER • BIPLOB SUTRADHAR • ",
  collabLabel: "let’s collab", collabLink: "#contact"
};

const $ = (s) => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h) e.innerHTML = h; return e; };
const C = CONTENT, root = document.documentElement;
const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* ----- fill the page ----- */
$("#navName").textContent = C.name;
$("#heroName").innerHTML = C.name.split(" ").join("<br>");
$("#heroTag").textContent = C.tagline;
$("#heroCo").textContent = C.company;
$("#upworkBtn").href = C.upwork;
$("#aboutP").textContent = C.about;
C.stats.forEach(([v, l]) => $("#stats").append(el("li", "", `<b>${v}</b><span>${l}</span>`)));
C.tools.forEach((t) => $("#tools").append(el("li", "", t)));
C.strengths.forEach((t) => $("#pills").append(el("li", "", t)));
[...C.skills, ...C.skills].forEach((t) => $("#strip").append(el("span", "", t)));
C.work.forEach((w) => $("#rail").append(el("article", "proj", `<div class="proj__thumb">${w.tag}</div><div class="proj__body"><h3>${w.title}</h3><p>${w.desc}</p>${w.url ? `<a href="${w.url}" target="_blank" rel="noopener">View project</a>` : `<p style="margin-top:10px;opacity:.6">Case study coming soon</p>`}</div>`)));
$("#emailLink").textContent = C.email; $("#emailLink").href = `mailto:${C.email}`;
$("#waLink").textContent = C.whatsappLabel; $("#waLink").href = `https://wa.me/${C.whatsapp}`;
C.socials.forEach(([n, u]) => { const a = el("a", "", n); a.href = u; a.target = "_blank"; a.rel = "noopener"; $("#socials").append(a); });
$("#yr").textContent = new Date().getFullYear();
$("#copy").addEventListener("click", async (e) => {
  try { await navigator.clipboard.writeText(C.email); e.target.textContent = "Copied"; } catch { e.target.textContent = "Press Ctrl+C"; }
  setTimeout(() => (e.target.textContent = "Copy"), 1600);
});
$("#prev").addEventListener("click", () => $("#rail").scrollBy({ left: -$("#rail").clientWidth * 0.6, behavior: "smooth" }));
$("#next").addEventListener("click", () => $("#rail").scrollBy({ left: $("#rail").clientWidth * 0.6, behavior: "smooth" }));

/* ----- nav, progress bar, process timeline (all on one scroll listener) ----- */
const nav = $("#nav"), bar = $("#progress");
let lastY = 0, ticking = false;
function onScroll() {
  const y = scrollY, max = root.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  nav.classList.toggle("hide", y > lastY && y > 160); lastY = y;
  ticking = false;
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

/* ----- effect code merged in by the build step ----- */
function initCard() {

  /* ===== Change your details here ===== */
  const CONFIG = {
    name: CONTENT.name,
    role: CONTENT.role,
    code: CONTENT.code,
    photo: CONTENT.photos.card,                       // your face photo, any size
    strapText: CONTENT.strapText, // repeated along the strap
    anchorX: innerWidth < 860 ? 0.5 : 0.78,                              // where the strap hangs from: 0 = left edge, 1 = right edge
  };

  /* ===== Physics: a rope made of points (Verlet integration) =====
     The strap is 12 points joined by "sticks". Every frame each point keeps its speed, gravity pulls it down,
     then the sticks are fixed back to their length. The card is 4 more points held in a rigid rectangle. */
  const SEGMENTS = 12;    // points in the strap
  const GRAVITY = 0.55;   // higher = heavier, faster drop
  const DAMPING = 0.982;  // lower = stops swinging sooner
  const MAX_SPEED = 16;   // speed limit so a hard throw can't fling the card off screen
  const CLIP_GAP = 16;

  const $ = (s) => document.querySelector(s);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // fill in the card
  $("#cardName").textContent = CONFIG.name;
  $("#cardRole").textContent = CONFIG.role;
  $("#cardCode").textContent = CONFIG.code;
  $("#cardPhoto").src = CONFIG.photo;
  $("#strapText").textContent = CONFIG.strapText.repeat(8);

  const stage = $("#stage"), card = $("#card"), inner = $(".card__inner"), holo = $(".card__holo"), strap = $("#strapPath"), hint = $("#hint");
  let W, H, anchor, segLen, pts = [], cons = [], drag = null, hasDragged = false, settled = 0;

  function build() {
    W = card.offsetWidth; H = card.offsetHeight;
    const sh = stage.clientHeight;
    const restTop = innerWidth < 860 ? sh - H - 50 : Math.max(110, (sh - H) / 2 - 20);      // where the card ends up
    const ropeLen = Math.max(60, restTop - CLIP_GAP + 20);
    anchor = { x: stage.clientWidth * CONFIG.anchorX, y: -20 };
    segLen = ropeLen / SEGMENTS;
    pts = []; cons = [];
    // start high above the screen so it drops in
    const lift = reduceMotion ? 0 : ropeLen + H + 60, sway = reduceMotion ? 0 : 90;
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS, x = anchor.x + sway * t, y = anchor.y + i * segLen - lift * t;
      pts.push({ x, y, px: x, py: y, w: i === 0 ? 0 : 1 }); // w = 0 means pinned (the anchor)
    }
    const clip = pts[SEGMENTS], top = clip.y + CLIP_GAP, cx = clip.x + (reduceMotion ? 0 : 30);
    [[cx - W / 2, top], [cx + W / 2, top], [cx + W / 2, top + H], [cx - W / 2, top + H]]
      .forEach(([x, y]) => pts.push({ x, y, px: x, py: y, w: 0.35 }));
    const [TL, TR, BR, BL] = [SEGMENTS + 1, SEGMENTS + 2, SEGMENTS + 3, SEGMENTS + 4];
    // strap: may go slack but never stretches (the jerk when it goes tight makes the bounce)
    for (let i = 0; i < SEGMENTS; i++) cons.push({ a: i, b: i + 1, len: segLen, stretchOnly: true });
    // clip to the two top corners, then a rigid card
    const d = Math.hypot(W / 2, CLIP_GAP), diag = Math.hypot(W, H);
    cons.push({ a: SEGMENTS, b: TL, len: d }, { a: SEGMENTS, b: TR, len: d },
      { a: TL, b: TR, len: W }, { a: TR, b: BR, len: H }, { a: BR, b: BL, len: W }, { a: BL, b: TL, len: H },
      { a: TL, b: BR, len: diag }, { a: TR, b: BL, len: diag });
    card.classList.add("ready");
  }

  const corners = () => pts.slice(SEGMENTS + 1, SEGMENTS + 5);

  function solve() {
    for (const c of cons) {
      const A = pts[c.a], B = pts[c.b];
      const dx = B.x - A.x, dy = B.y - A.y, dist = Math.hypot(dx, dy) || 0.0001;
      if (c.stretchOnly && dist <= c.len) continue;
      const diff = (dist - c.len) / dist, wsum = A.w + B.w;
      if (!wsum) continue;
      A.x += dx * diff * (A.w / wsum); A.y += dy * diff * (A.w / wsum);
      B.x -= dx * diff * (B.w / wsum); B.y -= dy * diff * (B.w / wsum);
    }
  }

  // a point on the card from (u, v) = (0..1 across, 0..1 down)
  function bilinear(u, v) {
    const [a, b, c, d] = corners();
    return {
      x: (1-u)*(1-v)*a.x + u*(1-v)*b.x + u*v*c.x + (1-u)*v*d.x,
      y: (1-u)*(1-v)*a.y + u*(1-v)*b.y + u*v*c.y + (1-u)*v*d.y,
      w: [(1-u)*(1-v), u*(1-v), u*v, (1-u)*v],
    };
  }

  function step() {
    for (const p of pts) {
      if (!p.w) continue;
      const vx = clamp((p.x - p.px) * DAMPING, -MAX_SPEED, MAX_SPEED);
      const vy = clamp((p.y - p.py) * DAMPING, -MAX_SPEED, MAX_SPEED);
      p.px = p.x; p.py = p.y;
      p.x += vx; p.y += vy + GRAVITY;
    }
    if (drag) { // pull the grabbed spot of the card toward the pointer
      const g = bilinear(drag.u, drag.v), dx = drag.x - g.x, dy = drag.y - g.y;
      corners().forEach((p, i) => { const k = g.w[i] * 1.6; p.x += dx * k; p.y += dy * k; p.px = lerp(p.px, p.x, 0.25); p.py = lerp(p.py, p.y, 0.25); });
    }
    for (let i = 0; i < 14; i++) solve();
  }

  function render() {
    const [TL, TR, , BL] = corners();
    const ax = (TR.x - TL.x) / W, ay = (TR.y - TL.y) / W, bx = (BL.x - TL.x) / H, by = (BL.y - TL.y) / H;
    card.style.transform = `matrix(${ax},${ay},${bx},${by},${TL.x},${TL.y})`;
    // small 3D tilt from how fast the card moves
    const cxv = (TL.x - TL.px + TR.x - TR.px) / 2, cyv = (TL.y - TL.py + BL.y - BL.py) / 2;
    const ry = clamp(cxv * 2.2, -40, 40), rx = clamp(-cyv * 1.2, -25, 25);
    inner.style.transform = `perspective(900px) rotateY(${ry}deg) rotateX(${rx}deg)`;
    holo.style.setProperty("--gx", `${50 + ry * 1.5 + Math.atan2(ay, ax) * 60}%`);
    holo.style.setProperty("--gy", `${50 + rx * 1.5}%`);
    // strap: a smooth curve through the rope points
    let d = `M ${pts[0].x} ${pts[0].y - 40} L ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < SEGMENTS; i++) d += ` Q ${pts[i].x} ${pts[i].y} ${(pts[i].x + pts[i+1].x) / 2} ${(pts[i].y + pts[i+1].y) / 2}`;
    d += ` L ${pts[SEGMENTS].x} ${pts[SEGMENTS].y + 6}`;
    strap.setAttribute("d", d);
    if (!hasDragged) {
      const [, , BR, BL2] = corners();
      hint.style.left = `${(BR.x + BL2.x) / 2}px`; hint.style.top = `${Math.max(BR.y, BL2.y) + 22}px`;
      settled = Math.abs(cxv) + Math.abs(cyv) < 0.6 ? settled + 1 : 0;
      hint.classList.toggle("show", settled > 30);
    }
  }

  const loop = () => { step(); render(); requestAnimationFrame(loop); };

  // drag with mouse or finger
  const local = (e) => { const r = stage.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  card.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    const p = local(e), [TL, TR, , BL] = corners();
    const ux = TR.x - TL.x, uy = TR.y - TL.y, vx = BL.x - TL.x, vy = BL.y - TL.y, rx = p.x - TL.x, ry = p.y - TL.y;
    drag = { u: clamp((rx * ux + ry * uy) / (W * W), 0, 1), v: clamp((rx * vx + ry * vy) / (H * H), 0, 1), ...p };
    card.classList.add("dragging"); card.setPointerCapture(e.pointerId);
    if (!hasDragged) { hasDragged = true; hint.classList.remove("show"); }
  });
  card.addEventListener("pointermove", (e) => { if (drag) Object.assign(drag, local(e)); });
  const release = () => { drag = null; card.classList.remove("dragging"); pts.forEach((p) => { p.px = lerp(p.px, p.x, 0.6); p.py = lerp(p.py, p.y, 0.6); }); };
  card.addEventListener("pointerup", release);
  card.addEventListener("pointercancel", release);

  // keep the strap attached when the window size changes
  addEventListener("resize", () => {
    if (!anchor) return;
    const nx = stage.clientWidth * CONFIG.anchorX, dx = nx - anchor.x;
    pts.forEach((p) => { p.x += dx; p.px += dx; }); anchor.x = nx; pts[0].x = pts[0].px = nx;
  });

  build(); render(); requestAnimationFrame(loop);
  
}

(() => {

  /* ===== Change your photos here =====
     Both photos must be the same size, with the person in the same place.
     Make the hero version with an AI image editor (Gemini, ChatGPT) using your normal photo, e.g.:
     "Edit this photo. Keep everything exactly the same: same person, same pose, same framing, same crop,
      same background, same lighting. Only change the person into Batman: full mask and suit. Photorealistic." */
  const CONFIG = {
    normal: CONTENT.photos.normal,
    hero: CONTENT.photos.hero,
    size: 0.2,        // lens radius on hover, as a share of the photo width
    pressSize: 0.32,  // lens radius while the mouse is held down
    smooth: 0.18,     // how fast the lens follows (1 = instantly)
  };

  const $ = (s) => document.querySelector(s);
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  $("#normal").src = CONFIG.normal;
  $("#hero").src = CONFIG.hero;

  const wrap = $("#reveal"), frame = $("#frame"), layer = $("#heroLayer"), ring = $("#ring");
  // target (tx, ty, tr) and current (x, y, r): the current values ease toward the target every frame
  let tx = 0.5, ty = 0.5, x = 0.5, y = 0.5, r = 0, tr = 0, raf = null;

  const tick = () => {
    const k = reduceMotion ? 1 : CONFIG.smooth;
    x = lerp(x, tx, k); y = lerp(y, ty, k); r = lerp(r, tr, reduceMotion ? 1 : 0.12);
    const w = frame.clientWidth, h = frame.clientHeight;
    layer.style.setProperty("--mx", `${x * w}px`);
    layer.style.setProperty("--my", `${y * h}px`);
    layer.style.setProperty("--r", `${r}px`);
    ring.style.left = `${x * w}px`; ring.style.top = `${y * h}px`;
    ring.style.width = ring.style.height = `${r * 2}px`;
    // keep animating only while something is still moving
    raf = Math.abs(r - tr) > 0.3 || Math.abs(x - tx) > 0.001 || Math.abs(y - ty) > 0.001 ? requestAnimationFrame(tick) : null;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const setPos = (e) => { const b = frame.getBoundingClientRect(); tx = (e.clientX - b.left) / b.width; ty = (e.clientY - b.top) / b.height; };

  frame.addEventListener("pointerenter", (e) => { setPos(e); if (r < 1) { x = tx; y = ty; } tr = frame.clientWidth * CONFIG.size; wrap.classList.add("active"); kick(); });
  frame.addEventListener("pointermove", (e) => { setPos(e); if (tr < frame.clientWidth * CONFIG.size) tr = frame.clientWidth * CONFIG.size; kick(); });
  frame.addEventListener("pointerleave", () => { tr = 0; wrap.classList.remove("active"); kick(); });
  frame.addEventListener("pointerdown", (e) => { setPos(e); if (r < 1) { x = tx; y = ty; } tr = frame.clientWidth * CONFIG.pressSize; wrap.classList.add("active"); frame.setPointerCapture(e.pointerId); kick(); });
  frame.addEventListener("pointerup", (e) => { tr = e.pointerType === "mouse" ? frame.clientWidth * CONFIG.size : 0; if (tr === 0) wrap.classList.remove("active"); kick(); });
  frame.addEventListener("pointercancel", () => { tr = 0; wrap.classList.remove("active"); kick(); });
  
})();

(() => {

  /* ===== Change here ===== */
  const CONFIG = {
    label: CONTENT.collabLabel,                 // text on the pill
    link: CONTENT.collabLink,   // where a click goes (WhatsApp, email, #contact, a form...)
    // On a real site, turn this on: slow graphics chips then get the light CSS pill instead, so the page never lags.
    // It's off in this demo so you always see the 3D on a computer.
    speedTest: true,
  };

  const $ = (s) => document.querySelector(s);
  const frame = $("#venomFrame"), hit = $("#venomHit"), status = $("#status");
  hit.textContent = CONFIG.label;
  hit.href = CONFIG.link;
  if (/^https?:/.test(CONFIG.link)) { hit.target = "_blank"; hit.rel = "noopener"; }
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let geo = null, ready = false, rect = null;

  // Time a few real goo frames. Smooth needs ~16 ms per frame for everything; the goo gets 10 ms at most.
  function gpuFastEnough() {
    try {
      const w = frame.contentWindow, v = w.VenomButton, cv = w.document.getElementById("stage");
      const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
      const sync = () => { probe.drawImage(cv, 0, 0, 1, 1); probe.getImageData(0, 0, 1, 1); }; // waits for the GPU
      v._debug.paused = true; sync();
      const t = [];
      for (let i = 0; i < 5; i++) { const s = performance.now(); v._debug.advance(1 / 240); sync(); t.push(performance.now() - s); }
      v._debug.paused = false;
      t.sort((a, b) => a - b);
      status.textContent = `goo frame: ${t[2].toFixed(1)} ms`;
      return t[2] < 10;
    } catch { return false; }
  }

  // put the invisible link exactly over the 3D pill
  const measure = () => { rect = frame.getBoundingClientRect(); };
  const place = () => {
    if (!geo || !ready) return;
    measure();
    Object.assign(hit.style, { left: `${rect.left + geo.cx - geo.hw}px`, top: `${rect.top + geo.cy - geo.hh}px`, width: `${geo.hw * 2}px`, height: `${geo.hh * 2}px` });
  };
  // forward the mouse to the frame (it can't see the mouse itself)
  const send = (t, e) => {
    if (!ready || !rect) return;
    frame.contentWindow.postMessage({ venom: "ptr", t, x: e ? e.clientX - rect.left : 0, y: e ? e.clientY - rect.top : 0, pt: e ? e.pointerType : "mouse" }, "*");
  };
  addEventListener("pointermove", (e) => send("move", e), { passive: true });
  addEventListener("pointerdown", (e) => send("down", e), { passive: true });
  addEventListener("pointerup", (e) => send("up", e), { passive: true });
  document.documentElement.addEventListener("pointerleave", () => send("leave"));
  addEventListener("blur", () => send("leave"));
  addEventListener("resize", () => { measure(); send("layout"); place(); });

  // messages from the frame: "ready", "layout" (where the pill is), "engaged" (goo is holding the cursor)
  addEventListener("message", (m) => {
    if (m.source !== frame.contentWindow || !m.data) return;
    const d = m.data;
    if (d.venom === "layout") { geo = d; place(); }
    if (d.venom === "ready") setTimeout(() => {
      if (CONFIG.speedTest && !gpuFastEnough()) { frame.remove(); status.textContent += " · too slow, using the simple pill"; return; }
      ready = true; measure(); document.documentElement.classList.add("goo-ready"); place();
    }, 400);
    if (d.venom === "engaged") document.documentElement.classList.toggle("venom-engaged", !!d.on);
  });

  // load the heavy 3D last, only on computers, once the page is idle
  if (finePointer && !reduceMotion) {
    const go = () => { frame.src = `collab/venom.html?label=${encodeURIComponent(CONFIG.label)}`; };
    setTimeout(() => ("requestIdleCallback" in window ? requestIdleCallback(go, { timeout: 3000 }) : go()), 800);
  } else {
    frame.remove();
    status.textContent = "Phone or reduced motion: showing the simple pill.";
  }
  
})();


/* ----- interactive example case: fix a hacked, slow WooCommerce store ----- */
(() => {
  const nav = $("#caseNav"), view = $("#caseView"), hNum = $("#hNum"), hBar = $("#hBar");
  const SCAN = [["wp core verify-checksums", "14 core files modified", "bad"], ["scan wp-content/uploads", "3 backdoor files found", "bad"], ["wp plugin list --update=available", "7 plugins out of date", "warn"], ["pagespeed --mobile", "score 31 · loads in 6.8 s", "bad"]];
  const FIX = ["Remove backdoors and injected code", "Restore clean WordPress core files", "Update plugins and theme", "Reset passwords and security keys", "Add firewall and 2FA, lock file editing"];
  const SPEED = [["Page caching", 1.7], ["Compress and resize images", 1.4], ["Lazy-load and defer scripts", 1.3], ["Clean database and unused plugins", 1.0]];
  const GO = ["SSL certificate is valid", "Test order completes at checkout", "Contact and order emails deliver", "Daily backups are scheduled", "Uptime monitoring is on"];
  const S = { step: 0, scanned: false, fix: new Set(), speed: new Set(), live: false, timers: [] };
  const health = () => 31 + 7 * S.fix.size + 7 * S.speed.size + (S.live ? 6 : 0);
  const saved = () => [...S.speed].reduce((a, i) => a + SPEED[i][1], 0);
  const later = (fn, ms) => S.timers.push(setTimeout(fn, ms));
  const check = (on, text, extra = "", i = "") => `<button class="chk ${on ? "on" : ""}" data-i="${i}" type="button"><i>✓</i><span>${text}</span>${extra}</button>`;

  const views = [
    () => {
      view.innerHTML = `<p class="case__lead">The owner says: “The site is slow, orders have dropped, and some visitors land on a spam page.” Before touching anything, find out what is really wrong.</p><div class="term" id="term"></div><button class="cbtn" id="rescan" type="button">Run the scan again</button>`;
      const term = $("#term"), add = (r) => term.append(el("p", "", `<span>$ ${r[0]}</span><b class="${r[2]}">${r[1]}</b>`));
      const verdict = () => term.append(el("p", "verdict", "Verdict: the site is infected and slow. Fix security first, then speed."));
      if (S.scanned) { SCAN.forEach(add); verdict(); }
      else { SCAN.forEach((r, i) => later(() => add(r), 500 + i * 650)); later(() => { verdict(); S.scanned = true; }, 500 + SCAN.length * 650); }
      $("#rescan").onclick = () => { S.scanned = false; render(); };
    },
    () => {
      const n = S.fix.size;
      view.innerHTML = `<p class="case__lead">Security comes first. Tick each fix as it is cleared.</p>${FIX.map((t, i) => check(S.fix.has(i), t, "", i)).join("")}<button class="cbtn fill" id="fixAll" type="button">Fix everything</button>${n === FIX.length ? `<p class="note">The site is clean. Now make it fast.</p>` : ""}`;
      view.querySelectorAll(".chk").forEach((b) => (b.onclick = () => { const i = +b.dataset.i; S.fix.has(i) ? S.fix.delete(i) : S.fix.add(i); render(); }));
      $("#fixAll").onclick = () => { FIX.forEach((_, i) => S.fix.add(i)); render(); };
    },
    () => {
      const t = (6.8 - saved()).toFixed(1), score = 31 + Math.round((63 * saved()) / 5.4);
      view.innerHTML = `<p class="case__lead">Now the speed. Switch on each fix and watch the numbers move.</p><div class="read"><div><b>${t} s</b><span>Load time</span></div><div><b>${score}</b><span>Mobile score</span></div></div>${SPEED.map(([x, g], i) => check(S.speed.has(i), x, `<em>−${g} s</em>`, i)).join("")}${S.speed.size === SPEED.length ? `<p class="note">Loads in ${t} seconds. Faster pages keep more shoppers at checkout.</p>` : ""}`;
      view.querySelectorAll(".chk").forEach((b) => (b.onclick = () => { const i = +b.dataset.i; S.speed.has(i) ? S.speed.delete(i) : S.speed.add(i); render(); }));
    },
    () => {
      view.innerHTML = `<p class="case__lead">Before it goes live, test what a customer would do and set up protection so it stays fixed.</p><div id="go">${GO.map((t, i) => check(S.live, t, "", i)).join("")}</div><button class="cbtn fill" id="runGo" type="button">${S.live ? "Run the checks again" : "Run go-live checks"}</button><div id="goNote">${S.live ? `<p class="note">Live. Handed over with monitoring and a short report.</p>` : ""}</div>`;
      $("#runGo").onclick = () => {
        S.live = false; setHealth(); view.querySelectorAll(".chk").forEach((b) => b.classList.remove("on")); $("#goNote").innerHTML = "";
        GO.forEach((_, i) => later(() => view.querySelectorAll(".chk")[i].classList.add("on"), 400 + i * 450));
        later(() => { S.live = true; setHealth(); $("#goNote").innerHTML = `<p class="note">Live. Handed over with monitoring and a short report.</p>`; }, 400 + GO.length * 450);
      };
    }
  ];
  function setHealth() { const h = health(); hNum.textContent = h; hBar.style.width = h + "%"; hBar.closest(".health").dataset.t = h < 50 ? "bad" : h < 90 ? "warn" : "good"; }
  function render() {
    S.timers.forEach(clearTimeout); S.timers = []; setHealth();
    nav.innerHTML = "";
    C.steps.forEach(([b, d], i) => { const li = el("li"), bt = el("button", i === S.step ? "on" : "", `<span>0${i + 1}</span><b>${b}</b><em>${d}</em>`); bt.type = "button"; bt.onclick = () => { S.step = i; render(); }; li.append(bt); nav.append(li); });
    views[S.step]();
  }
  render();
})();

/* ----- cursor follower ring: dot (exact), ring (lerp .2), halo (lerp .12) ----- */
(() => {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const dot = $("#cDot"), ring = $("#cRing"), halo = $("#cHalo");
  let mx = -100, my = -100, rx = -100, ry = -100, hx = -100, hy = -100, raf = 0;
  const move = (e) => {
    mx = e.clientX; my = e.clientY; root.classList.add("ring-on");
    const t = e.target.closest ? e.target : document.body;
    root.classList.toggle("ring-hover", !!t.closest("a,button,video,.card,.proj"));
    root.classList.toggle("ring-off", !!t.closest("#frame"));
    if (!raf) raf = requestAnimationFrame(loop);
  };
  const loop = () => {
    rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2; hx += (mx - hx) * 0.12; hy += (my - hy) * 0.12;
    dot.style.transform = `translate3d(${mx}px,${my}px,0)`; ring.style.transform = `translate3d(${rx}px,${ry}px,0)`; halo.style.transform = `translate3d(${hx}px,${hy}px,0)`;
    raf = Math.abs(mx - hx) + Math.abs(my - hy) > 0.3 ? requestAnimationFrame(loop) : 0;
  };
  addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerleave", () => root.classList.remove("ring-on"));
})();

/* ----- loader (timecode counter, under 1 s), then the card drops ----- */
(() => {
  const tc = $("#tc"), start = performance.now(), total = 800;
  const pad = (n) => String(n).padStart(2, "0");
  const tick = (now) => {
    const f = Math.min(1, (now - start) / total), frames = Math.floor(f * 24 * 24);
    tc.textContent = `00:00:${pad(Math.floor(frames / 24))}:${pad(frames % 24)}`;
    if (f < 1) requestAnimationFrame(tick);
    else { $("#loader").classList.add("done"); initCard(); }
  };
  requestAnimationFrame(tick);
})();
