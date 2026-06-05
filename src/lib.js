/* ============================================================
   APEXFLOW :: LIB  (engine — state, persistence, SRS, speech)
============================================================ */
import { useState, useEffect, useRef, useCallback } from "react";
import { BANDS, VOCAB, LISTENING, ARTICLES, CLOZE, RESTATE, ODDOUT, DIALOGUE, PARACOMP, TRANSLATE, TOEFL_INTEGRATED, GRAMMAR, WRITING } from "./catalog.js";

/* ---------- band / score concordance ---------- */
export function tierFor(xp) {
  let cur = BANDS[0], next = null;
  for (let i = 0; i < BANDS.length; i++) {
    if (xp >= BANDS[i].xp) { cur = BANDS[i]; next = BANDS[i + 1] || null; }
  }
  const floor = cur.xp;
  const ceil = next ? next.xp : cur.xp + 200;
  const pct = next ? Math.min(100, ((xp - floor) / (ceil - floor)) * 100) : 100;
  return { cur, next, pct };
}

/* ============================================================
   PERSISTENCE  (single localStorage blob, schema-versioned)
============================================================ */
const KEY = "apexflow_state_v2";

function defaultState() {
  return {
    level: null,            // null => placement not done yet
    xp: 0,
    correct: 0,
    total: 0,
    bestCombo: 0,
    streak: { count: 0, last: null },   // last = "YYYY-MM-DD"
    srs: {},                // cardId -> { reps, interval, ease, due }
    done: {},               // "grammar:g_tobe" -> true, etc.
    daily: { date: null, vocab: 0, xp: 0, grammar: 0, listening: 0, writing: 0 },
    settings: { sound: true, rate: 0.95, apiKey: "", theme: "dark", contentUrl: "" },
  };
}

function loadState() {
  if (typeof localStorage === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed,
      streak: { ...defaultState().streak, ...(parsed.streak || {}) },
      settings: { ...defaultState().settings, ...(parsed.settings || {}) },
      daily: { ...defaultState().daily, ...(parsed.daily || {}) },
      srs: parsed.srs || {}, done: parsed.done || {} };
  } catch { return defaultState(); }
}

function persist(state) {
  if (typeof localStorage === "undefined") return;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* quota / private mode */ }
}

const todayStr = () => new Date().toISOString().slice(0, 10);
function dayDiff(a, b) {
  if (!a || !b) return Infinity;
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}
// reset the per-day task counters when the calendar day changes
function rollDaily(s) {
  const t = todayStr();
  if (s.daily && s.daily.date === t) return s;
  return { ...s, daily: { date: t, vocab: 0, xp: 0, grammar: 0, listening: 0, writing: 0 } };
}

/* ============================================================
   SRS  (simplified SM-2)   grade: "again" | "good" | "easy"
============================================================ */
const MIN_EASE = 1.3;
export function newCard() { return { reps: 0, interval: 0, ease: 2.5, due: Date.now() }; }

export function schedule(card, grade) {
  const c = { ...(card || newCard()) };
  const now = Date.now();
  if (grade === "again") {
    c.reps = 0; c.interval = 0; c.ease = Math.max(MIN_EASE, c.ease - 0.2);
    c.due = now + 60 * 1000;                 // ~1 min, comes back this session
    return c;
  }
  if (grade === "easy") c.ease = c.ease + 0.15;
  c.reps += 1;
  if (c.reps === 1) c.interval = grade === "easy" ? 2 : 1;
  else if (c.reps === 2) c.interval = grade === "easy" ? 5 : 3;
  else c.interval = Math.round(c.interval * c.ease * (grade === "easy" ? 1.3 : 1));
  c.due = now + c.interval * 86400000;
  return c;
}

// returns {due:[ids], fresh:[ids], all:[ids]} for a given deck (array of {id})
export function reviewQueue(srs, deck, maxNew = 12) {
  const now = Date.now();
  const due = [], fresh = [];
  for (const item of deck) {
    const card = srs[item.id];
    if (!card) fresh.push(item.id);
    else if (card.due <= now) due.push(item.id);
  }
  return { due, fresh: fresh.slice(0, maxNew), all: [...due, ...fresh.slice(0, maxNew)] };
}

/* ============================================================
   SPEECH  (browser Text-to-Speech — no audio files needed)
============================================================ */
export function speechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
export function speak(text, { lang = "en-US", rate = 0.95, onend } = {}) {
  if (!speechSupported()) { onend && onend(); return; }
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = rate; u.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find((x) => x.lang === lang) || voices.find((x) => x.lang.startsWith(lang.slice(0, 2)));
    if (v) u.voice = v;
    if (onend) u.onend = onend;
    window.speechSynthesis.speak(u);
  } catch { onend && onend(); }
}
export function stopSpeak() { if (speechSupported()) window.speechSynthesis.cancel(); }

/* ============================================================
   useStore — the persistent app store hook
============================================================ */
export function useStore() {
  const [state, setState] = useState(loadState);
  const stateRef = useRef(state);
  stateRef.current = state;

  // persist on every change
  useEffect(() => { persist(state); }, [state]);

  const update = useCallback((fn) => {
    setState((s) => {
      const next = fn(s);
      return next === s ? s : next;
    });
  }, []);

  // daily streak: call whenever the user is active
  const touchStreak = useCallback(() => {
    update((s) => {
      const t = todayStr();
      if (s.streak.last === t) return s;
      const d = dayDiff(s.streak.last, t);
      const count = d === 1 ? s.streak.count + 1 : 1;
      return { ...s, streak: { count, last: t } };
    });
  }, [update]);

  // award(points, isCorrect, combo) — combo passed from session
  const award = useCallback((points, isCorrect, combo = 0) => {
    update((s) => {
      const r = rollDaily(s);
      const total = r.total + 1;
      if (!isCorrect) return { ...r, total };
      const mult = combo >= 3 ? 2 : 1;
      const gain = points * mult;
      const nc = combo + 1;
      return {
        ...r,
        total,
        correct: r.correct + 1,
        xp: r.xp + gain,
        bestCombo: Math.max(r.bestCombo, nc),
        daily: { ...r.daily, xp: r.daily.xp + gain },
      };
    });
  }, [update]);

  // increment a per-day task counter (resets automatically each day)
  const bumpDaily = useCallback((key, n = 1) => update((s) => {
    const r = rollDaily(s);
    return { ...r, daily: { ...r.daily, [key]: (r.daily[key] || 0) + n } };
  }), [update]);

  const setLevel = useCallback((lv) => update((s) => ({ ...s, level: lv })), [update]);

  const gradeCard = useCallback((cardId, grade) => {
    update((s) => {
      const card = schedule(s.srs[cardId], grade);
      return { ...s, srs: { ...s.srs, [cardId]: card } };
    });
  }, [update]);

  const markDone = useCallback((key) => update((s) => ({ ...s, done: { ...s.done, [key]: true } })), [update]);

  const setSetting = useCallback((k, v) =>
    update((s) => ({ ...s, settings: { ...s.settings, [k]: v } })), [update]);

  const resetProgress = useCallback(() => setState(defaultState()), []);

  return { state, touchStreak, award, bumpDaily, setLevel, gradeCard, markDone, setSetting, resetProgress };
}

/* ============================================================
   WRITING FEEDBACK
   1) analyzeWriting — fully offline heuristic (works for everyone)
   2) scoreWithAI — optional, uses the user's OWN Anthropic key
============================================================ */
const LINKERS = [
  "however", "moreover", "therefore", "for example", "for instance", "in addition",
  "on the other hand", "on the one hand", "firstly", "secondly", "finally",
  "in conclusion", "although", "whereas", "furthermore", "nevertheless", "despite",
  "while", "because", "such as", "overall", "in contrast", "as a result", "admittedly",
];
const STOP = new Set(
  "the a an and or but of to in on at for with is are was were be been being this that these those it its as by from have has had will would can could should about into than then so very more most much many".split(" ")
);

export function analyzeWriting(text, item) {
  const clean = (text || "").trim();
  const words = clean ? clean.split(/\s+/) : [];
  const wc = words.length;
  const sentences = clean ? clean.split(/[.!?]+/).map((x) => x.trim()).filter(Boolean) : [];
  const sc = sentences.length;
  const paras = clean ? clean.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean) : [];
  const pc = paras.length || (clean ? 1 : 0);
  const avgLen = sc ? Math.round((wc / sc) * 10) / 10 : 0;
  const longSentences = sentences.filter((s) => s.split(/\s+/).length > 40).length;
  const lower = " " + clean.toLowerCase().replace(/\s+/g, " ") + " ";
  const linkersUsed = LINKERS.filter((l) => lower.includes(" " + l + " ") || lower.includes(" " + l + ","));
  const freq = {};
  for (const w of words) {
    const k = w.toLowerCase().replace(/[^a-zçğıiöşü]/gi, "");
    if (k.length > 4 && !STOP.has(k)) freq[k] = (freq[k] || 0) + 1;
  }
  const repeats = Object.entries(freq).filter(([, n]) => n >= 4)
    .sort((a, b) => b[1] - a[1]).slice(0, 5).map(([w, n]) => ({ w, n }));
  const minW = (item && item.minWords) || 0;

  let score = 5;
  if (minW && wc >= minW) score += 1;
  if (minW && wc < minW * 0.7) score -= 1;
  if (pc >= 3) score += 0.5;
  if (pc <= 1 && wc > 80) score -= 0.5;
  if (linkersUsed.length >= 4) score += 1; else if (linkersUsed.length <= 1) score -= 0.5;
  if (avgLen >= 12 && avgLen <= 24) score += 0.5;
  if (longSentences >= 2) score -= 0.5;
  if (repeats.length >= 2) score -= 0.5;
  score = Math.max(4, Math.min(8, score));
  const band = score.toFixed(1);

  const notes = [];
  if (minW && wc < minW) notes.push(`Hedef ${minW} kelime; şu an ${wc}. Yaklaşık ${minW - wc} kelime daha ekle — eksik uzunluk sınavda puan kırar.`);
  if (pc <= 1 && wc > 80) notes.push("Metin tek paragraf görünüyor. Fikirleri ayrı paragraflara böl (giriş / gövde / sonuç).");
  if (linkersUsed.length <= 2) notes.push("Bağlaç çeşitliliği düşük. however, moreover, on the other hand, for example gibi geçişler ekle.");
  if (longSentences >= 2) notes.push("Çok uzun cümleler var (40+ kelime). Bazılarını böl; aşırı uzunluk netliği düşürür.");
  if (repeats.length) notes.push("Sık tekrarlanan kelimeler: " + repeats.map((r) => r.w).join(", ") + ". Eşanlamlılarla çeşitlendir.");
  if (avgLen && avgLen < 8) notes.push("Cümleler çok kısa/basit. Bazılarını bağlaçlarla birleştirip yapı çeşitliliği göster.");
  if (!notes.length) notes.push("Temel ölçütler iyi görünüyor. Artık içerik derinliğine ve örnek kalitesine odaklan.");
  return { wc, sc, pc, avgLen, longSentences, linkersUsed, repeats, band, notes, minW };
}

export const AI_MODEL = "claude-sonnet-4-6";
export async function scoreWithAI({ text, item, apiKey, model = AI_MODEL }) {
  const isToefl = item && item.exam && item.exam.includes("TOEFL");
  const exam = isToefl ? "TOEFL iBT" : (item && item.exam && item.exam.includes("IELTS") ? "IELTS Academic" : "akademik İngilizce (IELTS/TOEFL)");
  const scale = isToefl ? "0-30 (TOEFL Writing ölçeği)" : "0-9 (IELTS band)";
  const sys =
    "Sen deneyimli bir " + exam + " yazma değerlendiricisisin. Öğrencinin görevi nasıl karşıladığını değerlendir. " +
    "Açıklamaları TÜRKÇE yaz; düzeltme örneklerinde İngilizce yanlış→doğru biçimini kullan. Kısa ve somut ol. " +
    "Tam olarak şu başlıklarla yanıtla:\n" +
    "1) Tahmini puan [" + scale + "] (tek satır gerekçe)\n" +
    "2) Görev Karşılama\n3) Tutarlılık & Bağdaşıklık\n4) Sözcük Dağarcığı\n" +
    "5) Dilbilgisi & Doğruluk\n6) Düzeltilecek 3 somut hata (yanlış → doğru)\n7) Sonraki sefer için 2 öneri";
  const user =
    "GÖREV TÜRÜ: " + (item ? item.type : "") + "\nSORU: " + (item ? item.prompt : "") +
    "\n\nÖĞRENCİ CEVABI:\n" + text;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: sys,
      messages: [{ role: "user", content: user }],
    }),
  });
  if (!res.ok) {
    let detail = "";
    try { const j = await res.json(); detail = (j.error && j.error.message) || ""; } catch (e) {}
    throw new Error("API " + res.status + (detail ? " · " + detail : ""));
  }
  const data = await res.json();
  return (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
}

/* ============================================================
   EXTERNAL CONTENT  (Option 2)
   Fetch a content.json at startup and merge it into the catalog.
   Edit the file (e.g. on GitHub) -> everyone updates, no redeploy.
============================================================ */
// Default content source. Put your OWN raw content.json URL here (e.g.
// https://raw.githubusercontent.com/<user>/<repo>/main/content.json) and the
// app will load it for every visitor. Leaving it "" disables remote content.
// (Can also be overridden per-device in Ayarlar > İçerik kaynağı.)
export const CONTENT_URL = "https://raw.githubusercontent.com/manwesulimoo7/Apexlanguage/refs/heads/main/content.json";

const _isStr = (x) => typeof x === "string" && x.length > 0;
const _validItems = (items) =>
  Array.isArray(items) && items.length > 0 &&
  items.every((q) => _isStr(q.q) && Array.isArray(q.opts) && q.opts.length >= 2 &&
    Number.isInteger(q.ans) && q.ans >= 0 && q.ans < q.opts.length);
const _validVocab = (v) => _isStr(v.id) && _isStr(v.lv) && _isStr(v.w) && _isStr(v.tr);
const _validListening = (l) => _isStr(l.id) && _isStr(l.lv) && _isStr(l.title) && _isStr(l.script) && _validItems(l.items);
const _validArticle = (a) => _isStr(a.id) && _isStr(a.lv) && _isStr(a.title) && _isStr(a.body) && _validItems(a.items);
const _validBlanks = (blanks) =>
  Array.isArray(blanks) && blanks.length > 0 &&
  blanks.every((b) => Array.isArray(b.opts) && b.opts.length >= 2 &&
    Number.isInteger(b.ans) && b.ans >= 0 && b.ans < b.opts.length);
const _validCloze = (c) => _isStr(c.id) && _isStr(c.lv) && _isStr(c.title) && _isStr(c.text) && _validBlanks(c.blanks);
const _validRestate = (r) => _isStr(r.id) && _isStr(r.lv) && _isStr(r.stem) &&
  Array.isArray(r.opts) && r.opts.length >= 2 &&
  Number.isInteger(r.ans) && r.ans >= 0 && r.ans < r.opts.length;
const _validOddout = (o) => _isStr(o.id) && _isStr(o.lv) &&
  Array.isArray(o.sentences) && o.sentences.length >= 2 && o.sentences.every(_isStr) &&
  Number.isInteger(o.ans) && o.ans >= 0 && o.ans < o.sentences.length;
const _validOpts4 = (opts, ans) => Array.isArray(opts) && opts.length >= 2 && opts.every(_isStr) &&
  Number.isInteger(ans) && ans >= 0 && ans < opts.length;
const _validDialogue = (d) => _isStr(d.id) && _isStr(d.lv) &&
  Array.isArray(d.lines) && d.lines.length >= 2 && d.lines.every((ln) => _isStr(ln.sp) && _isStr(ln.t)) &&
  Number.isInteger(d.blankIndex) && d.blankIndex >= 0 && d.blankIndex < d.lines.length &&
  _validOpts4(d.opts, d.ans);
const _validParacomp = (p) => _isStr(p.id) && _isStr(p.lv) && _isStr(p.text) && p.text.includes("----") &&
  _validOpts4(p.opts, p.ans);
const _validTranslate = (t) => _isStr(t.id) && _isStr(t.lv) && _isStr(t.source) &&
  (t.dir === "en2tr" || t.dir === "tr2en") && _validOpts4(t.opts, t.ans);
const _validToeflInt = (t) => _isStr(t.id) && _isStr(t.lv) &&
  (t.type === "writing" || t.type === "speaking") &&
  t.reading && _isStr(t.reading.title) && _isStr(t.reading.body) &&
  t.lecture && _isStr(t.lecture.body) && _isStr(t.prompt) &&
  Array.isArray(t.keyPoints) && t.keyPoints.length >= 1 && t.keyPoints.every(_isStr);
const _validGrammar = (g) => _isStr(g.id) && _isStr(g.lv) && _isStr(g.title) && _isStr(g.exp) && _validItems(g.items);
const _validWriting = (w) => _isStr(w.id) && _isStr(w.lv) && _isStr(w.type) && _isStr(w.prompt) && Number.isInteger(w.minWords);

function mergeById(target, incoming, validate) {
  if (!Array.isArray(incoming)) return 0;
  const have = new Set(target.map((x) => x.id));
  let n = 0;
  for (const item of incoming) {
    if (item && validate(item) && !have.has(item.id)) { target.push(item); have.add(item.id); n++; }
  }
  return n;
}

// fetch + merge; mutates the catalog arrays in place (modules read them live)
export async function loadExternalContent(url) {
  const report = { vocab: 0, listening: 0, articles: 0, cloze: 0, restate: 0, oddout: 0, dialogue: 0, paracomp: 0, translate: 0, toeflint: 0, grammar: 0, writing: 0, total: 0, error: null };
  if (!url) { report.error = "no-url"; return report; }
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    report.vocab = mergeById(VOCAB, data.vocab, _validVocab);
    report.listening = mergeById(LISTENING, data.listening, _validListening);
    report.articles = mergeById(ARTICLES, data.articles, _validArticle);
    report.cloze = mergeById(CLOZE, data.cloze, _validCloze);
    report.restate = mergeById(RESTATE, data.restate, _validRestate);
    report.oddout = mergeById(ODDOUT, data.oddout, _validOddout);
    report.dialogue = mergeById(DIALOGUE, data.dialogue, _validDialogue);
    report.paracomp = mergeById(PARACOMP, data.paracomp, _validParacomp);
    report.translate = mergeById(TRANSLATE, data.translate, _validTranslate);
    report.toeflint = mergeById(TOEFL_INTEGRATED, data.toeflIntegrated, _validToeflInt);
    report.grammar = mergeById(GRAMMAR, data.grammar, _validGrammar);
    report.writing = mergeById(WRITING, data.writing, _validWriting);
    report.total = report.vocab + report.listening + report.articles + report.cloze + report.restate + report.oddout + report.dialogue + report.paracomp + report.translate + report.toeflint + report.grammar + report.writing;
  } catch (e) { report.error = (e && e.message) || "yükleme hatası"; }
  return report;
}
