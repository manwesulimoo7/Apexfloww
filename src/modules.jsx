import { useState, useEffect, useMemo, useRef } from "react";
import {
  Zap, Flame, Brain, BookOpen, Hammer, Mic, Timer, Target, Eye, EyeOff,
  Check, X, RotateCcw, Award, Layers, ArrowRight, Play, AlertTriangle,
  Scan, Gauge, TrendingUp, Lightbulb, Home as HomeIcon, ChevronLeft,
  Crosshair, Sparkles, Volume2, RefreshCw, GraduationCap, PenLine,
  ListChecks, Languages, BookMarked, Headphones, Repeat, Star, Lock,
  ChevronRight, RotateCw, Trophy, Pause, Sun, Moon, FileText, Replace, Filter,
  MessageSquare, AlignLeft, Languages as LanguagesIcon, ClipboardList, BarChart3,
} from "lucide-react";
import { tierFor, speak, stopSpeak, speechSupported, reviewQueue, analyzeWriting, scoreWithAI } from "./lib.js";
import { useLang, t, pick, exTr, tagLabel, qtypeLabel, badgeCatLabel, fieldLabel, rankFor } from "./i18n.js";
import {
  LEXICAL, PASSAGES, SYNTAX, SPEAKING,
  LEVELS, LV_ORDER, lvIndex, levelMeta,
  PLACEMENT, placementLevel, VOCAB, vocabForLevel, GRAMMAR, LISTENING, WRITING, ARTICLES, CLOZE, RESTATE, ODDOUT,
  DIALOGUE, PARACOMP, TRANSLATE, TOEFL_INTEGRATED, PARAPHRASE, ERRORHUNT,
  EXAMS, MODULE_INFO,
} from "./catalog.js";

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function Highlight({ text, phrases, cls }) {
  if (!phrases || !phrases.length) return <>{text}</>;
  const sorted = [...phrases].sort((a, b) => b.length - a.length);
  const set = new Set(sorted.map((s) => s.toLowerCase()));
  const re = new RegExp("(" + sorted.map(escapeRe).join("|") + ")", "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        set.has(p.toLowerCase())
          ? <mark key={i} className={cls}>{p}</mark>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// YÖKDİL field filter: only active when entered via YOKDIL with a chosen field.
// Items without a field default to "genel". Falls back to the full list if empty.
function byField(arr, exam, field) {
  if (exam !== "YOKDIL" || !field) return arr;
  const f = arr.filter((x) => (x.field || "genel") === field);
  return f.length ? f : arr;
}

/* ============================================================
   TOP HUD
============================================================ */
export function TopHUD({ xp, combo, maxCombo, flow, lastGain, onReset }) {
  const lang = useLang();
  const { cur, next, pct } = tierFor(xp);
  return (
    <div className="af-hud">
      <div className="af-hud-row">
        <div className="af-brand">
          <span className="af-logo"><Activity size={16} /></span>
          <span className="af-brand-name">APEX<span className="af-em">FLOW</span></span>
          <span className="af-brand-sub">// IELTS · TOEFL TERMINAL</span>
        </div>

        <div className="af-rank">
          <div className="af-rank-block">
            <div className="af-rank-label">BAND</div>
            <div className="af-rank-val af-em-text">{cur.band}</div>
          </div>
          <div className="af-rank-sep" />
          <div className="af-rank-block">
            <div className="af-rank-label">≈ TOEFL</div>
            <div className="af-rank-val">{cur.toefl}</div>
          </div>
          <div className="af-rank-sep" />
          <div className="af-rank-block">
            <div className="af-rank-label">XP</div>
            <div className="af-rank-val">{xp}</div>
          </div>
        </div>

        <div className={"af-combo " + (flow ? "af-combo-flow" : "")}>
          {flow ? <Flame size={15} /> : <Zap size={15} />}
          <span className="af-combo-num">{combo}</span>
          <span className="af-combo-lbl">{flow ? "FLOW ×2" : "COMBO"}</span>
          {lastGain ? <span className="af-gain">+{lastGain}</span> : null}
        </div>

        <button className="af-reset" onClick={onReset} title="Reset session">
          <RotateCcw size={14} />
        </button>
      </div>

      <div className="af-prog-wrap">
        <div className="af-prog-track">
          <div className={"af-prog-fill " + (flow ? "af-prog-flow" : "")} style={{ width: pct + "%" }} />
        </div>
        <div className="af-prog-meta">
          <span>{cur.band}</span>
          <span className="af-prog-mid">
            {next ? `${Math.max(0, next.xp - xp)} XP → Band ${next.band}` : "MAX RANK · Band 9.0"}
            {maxCombo > 0 ? `   ·   ${t(lang, "hud.bestCombo", { n: maxCombo })}` : ""}
          </span>
          <span>{next ? next.band : "9.0"}</span>
        </div>
      </div>
    </div>
  );
}
/* tiny inline Activity icon wrapper so import stays clean */
function Activity({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

/* ============================================================
   HOME
============================================================ */
function _LegacyHome({ go, stats }) {
  const cards = [
    { k: "lexical", icon: <Crosshair size={22} />, name: "Lexical Arena", tag: "RAPID-FIRE",
      desc: "Süreli eşanlam & kolokasyon atışı. C1/C2 akademik kelime hazinesi, anında geri bildirim." },
    { k: "reading", icon: <BookOpen size={22} />, name: "Deductive Reading Matrix", tag: "T/F/NG · HEADINGS",
      desc: "Yoğun pasajlar, resmî soru tipleri, X-Ray modu ve her çeldirici için Türkçe taktik analiz." },
    { k: "syntax", icon: <Hammer size={22} />, name: "Syntax Forge", tag: "WRITING TASK 2",
      desc: "Cümle parçalarını birleştirerek Band 8.5 yapılar kur. Devrik, ödün, katılım cümlecikleri." },
    { k: "speaking", icon: <Mic size={22} />, name: "120-Second Pressure Cooker", tag: "SPEAKING",
      desc: "15 sn hazırlık + 120 sn konuşma. 'Survival Kit' deyimlerini cümlene yedirme görevi." },
  ];
  return (
    <div className="af-home">
      <div className="af-home-head">
        <div className="af-boot">
          <span className="af-prompt-sym">›</span> sistem hazır
          <span className="af-caret" />
        </div>
        <h1 className="af-h1">Modülü seç. Seriyi koru. <span className="af-em-text">Flow State</span>'e gir.</h1>
        <p className="af-lede">
          İçerik tamamen C1/C2 İngilizce; taktik geri bildirim Türkçe. Üst üste 3 doğru → akış kilidi açılır,
          XP iki katına çıkar. Bir yanlış seriyi sıfırlar.
        </p>
      </div>

      <div className="af-stat-strip">
        <StatChip icon={<Target size={14} />} label="doğruluk"
          val={stats.total ? Math.round((stats.correct / stats.total) * 100) + "%" : "—"} />
        <StatChip icon={<Check size={14} />} label="doğru" val={stats.correct} />
        <StatChip icon={<Flame size={14} />} label="en yüksek seri" val={stats.maxCombo} />
        <StatChip icon={<TrendingUp size={14} />} label="toplam XP" val={stats.xp} />
      </div>

      <div className="af-grid">
        {cards.map((c) => (
          <button key={c.k} className="af-card" onClick={() => go(c.k)}>
            <div className="af-card-top">
              <span className="af-card-icon">{c.icon}</span>
              <span className="af-card-tag">{c.tag}</span>
            </div>
            <div className="af-card-name">{c.name}</div>
            <div className="af-card-desc">{c.desc}</div>
            <div className="af-card-go">BAŞLAT <ArrowRight size={15} /></div>
          </button>
        ))}
      </div>
    </div>
  );
}
function StatChip({ icon, label, val }) {
  return (
    <div className="af-stat-chip">
      <span className="af-stat-ic">{icon}</span>
      <span className="af-stat-val">{val}</span>
      <span className="af-stat-lbl">{label}</span>
    </div>
  );
}

/* ============================================================
   sub-header (back bar) used by every module
============================================================ */
function ModuleBar({ title, sub, onBack, right }) {
  return (
    <div className="af-modbar">
      <button className="af-back" onClick={onBack}><ChevronLeft size={16} /> terminal</button>
      <div className="af-modbar-title">
        <span className="af-modbar-name">{title}</span>
        {sub ? <span className="af-modbar-sub">{sub}</span> : null}
      </div>
      <div className="af-modbar-right">{right}</div>
    </div>
  );
}

/* ============================================================
   MODULE A :: LEXICAL ARENA
============================================================ */
export function LexicalArena({ onBack, award }) {
  const lang = useLang();
  const deck = useMemo(() => shuffle(LEXICAL), []);
  const [i, setI] = useState(0);
  const item = deck[i % deck.length];
  const options = useMemo(() => shuffle([item.a, ...item.d]), [i]);
  const [picked, setPicked] = useState(null);
  const [tl, setTl] = useState(12);
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    if (picked) return;
    if (tl <= 0) { setPicked("__timeout__"); award(0, false); return; }
    const id = setTimeout(() => setTl((x) => x - 1), 1000);
    return () => clearTimeout(id);
  }, [tl, picked]);

  function choose(opt) {
    if (picked) return;
    setPicked(opt);
    if (opt === item.a) {
      const b = tl >= 9 ? 5 : tl >= 5 ? 3 : 1;
      setBonus(b);
      award(10 + b, true);
    } else {
      setBonus(0);
      award(0, false);
    }
  }
  function next() {
    setPicked(null); setBonus(0); setTl(12); setI((x) => x + 1);
  }

  const answered = !!picked;
  const right = picked === item.a;
  return (
    <div className="af-mod">
      <ModuleBar title="LEXICAL ARENA" sub={t(lang, "lex.sub")} onBack={onBack}
        right={
          <div className={"af-clock " + (tl <= 4 && !answered ? "af-clock-warn" : "")}>
            <Timer size={14} /> {answered ? "—" : tl + "s"}
          </div>
        } />

      <div className="af-arena">
        <div className="af-arena-q">
          <div className="af-arena-prompt">{t(lang, "lex.prompt")}</div>
          <div className="af-arena-word">{item.w}</div>
        </div>

        <div className="af-arena-opts">
          {options.map((o) => {
            const isAns = o === item.a;
            const isPicked = o === picked;
            let cls = "af-opt";
            if (answered) {
              if (isAns) cls += " af-opt-correct";
              else if (isPicked) cls += " af-opt-wrong";
              else cls += " af-opt-dim";
            }
            return (
              <button key={o} className={cls} onClick={() => choose(o)} disabled={answered}>
                <span>{o}</span>
                {answered && isAns ? <Check size={16} /> : null}
                {answered && isPicked && !isAns ? <X size={16} /> : null}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={"af-verdict " + (right ? "af-v-ok" : "af-v-no")}>
            <div className="af-verdict-head">
              {right ? <><Check size={15} /> {t(lang, "lex.correct")} {bonus ? t(lang, "lex.speedBonus", { n: bonus }) : ""}</>
                     : <><X size={15} /> {picked === "__timeout__" ? t(lang, "lex.timeout") : t(lang, "lex.wrong")} {t(lang, "lex.comboReset")}</>}
            </div>
            <div className="af-verdict-body">{item.tr}</div>
            <button className="af-next" onClick={next}>{t(lang, "common.NEXT")} <ArrowRight size={15} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   MODULE B :: DEDUCTIVE READING MATRIX
============================================================ */
export function ReadingMatrix({ onBack, award }) {
  const lang = useLang();
  const [pIdx, setPIdx] = useState(0);
  const [xray, setXray] = useState(false);
  const P = PASSAGES[pIdx];

  // answers keyed per passage
  const [tfng, setTfng] = useState({});         // {`${pIdx}-${qi}`: choice}
  const [heads, setHeads] = useState({});       // {`${pIdx}-${para}`: key}
  const [ins, setIns] = useState({});           // {`${pIdx}`: slotIdx}

  const passagePhrases = xray ? P.xrayPassage : [];

  function answerTF(qi, choice) {
    const key = `${pIdx}-${qi}`;
    if (tfng[key]) return;
    const correct = choice === P.tfng[qi].ans;
    setTfng((s) => ({ ...s, [key]: choice }));
    award(correct ? 20 : 0, correct);
  }
  function answerHead(para, val) {
    const key = `${pIdx}-${para}`;
    if (heads[key] && heads[key].locked) return;
    const item = P.headingItems.find((h) => h.para === para);
    const correct = val === item.ans;
    setHeads((s) => ({ ...s, [key]: { val, correct, locked: correct } }));
    if (correct) award(18, true); else award(0, false);
  }
  function answerIns(slot) {
    const key = `${pIdx}`;
    if (ins[key] !== undefined) return;
    const correct = slot === P.insertion.ans;
    setIns((s) => ({ ...s, [key]: slot }));
    award(correct ? 22 : 0, correct);
  }

  return (
    <div className="af-mod">
      <ModuleBar title="DEDUCTIVE READING MATRIX" sub={P.title} onBack={onBack}
        right={
          <button className={"af-xray " + (xray ? "af-xray-on" : "")} onClick={() => setXray((x) => !x)}>
            {xray ? <Eye size={14} /> : <EyeOff size={14} />} X-Ray
          </button>
        } />

      <div className="af-passwitch">
        {PASSAGES.map((p, idx) => (
          <button key={p.id} className={"af-pswbtn " + (idx === pIdx ? "af-pswbtn-on" : "")}
            onClick={() => setPIdx(idx)}>Passage {idx + 1}</button>
        ))}
        {xray && (
          <div className="af-xray-legend">
            <span className="af-leg em">{t(lang, "rm.legendKey")}</span>
            <span className="af-leg sky">{t(lang, "rm.legendPara")}</span>
          </div>
        )}
      </div>

      <div className="af-read-grid">
        {/* PASSAGE */}
        <div className="af-passage">
          <div className="af-passage-title">{P.title}</div>
          {P.paras.map((par) => (
            <p key={par.id} className="af-para">
              <span className="af-para-tag">{par.id}</span>
              <Highlight text={par.text} phrases={passagePhrases} cls="af-mk-em" />
            </p>
          ))}
        </div>

        {/* QUESTIONS */}
        <div className="af-questions">
          {/* T / F / NG */}
          <div className="af-qblock">
            <div className="af-qhead"><Target size={14} /> True / False / Not Given</div>
            {P.tfng.map((q, qi) => {
              const key = `${pIdx}-${qi}`;
              const chosen = tfng[key];
              const done = !!chosen;
              const right = chosen === q.ans;
              return (
                <div key={qi} className="af-tf">
                  <div className="af-tf-stmt">
                    <span className="af-tf-n">{qi + 1}</span>
                    <span><Highlight text={q.stmt} phrases={xray ? q.xray : []} cls="af-mk-sky" /></span>
                  </div>
                  <div className="af-tf-opts">
                    {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => {
                      let cls = "af-tfbtn";
                      if (done) {
                        if (opt === q.ans) cls += " af-tfbtn-correct";
                        else if (opt === chosen) cls += " af-tfbtn-wrong";
                        else cls += " af-tfbtn-dim";
                      }
                      return (
                        <button key={opt} className={cls} disabled={done}
                          onClick={() => answerTF(qi, opt)}>{opt}</button>
                      );
                    })}
                  </div>
                  {done && (
                    <div className={"af-mini " + (right ? "af-mini-ok" : "af-mini-no")}>
                      {right ? <Check size={13} /> : <X size={13} />} {q.tr}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* HEADINGS */}
          <div className="af-qblock">
            <div className="af-qhead"><Layers size={14} /> Heading Matching</div>
            <div className="af-headlist">
              {P.headingOptions.map((h) => (
                <span key={h.k} className="af-headopt"><b>{h.k}</b> {h.t}</span>
              ))}
            </div>
            {P.headingItems.map((it) => {
              const key = `${pIdx}-${it.para}`;
              const st = heads[key];
              return (
                <div key={it.para} className="af-headrow">
                  <span className="af-headpara">{t(lang, "rm.paragraph", { p: it.para })}</span>
                  <select className={"af-select " + (st ? (st.correct ? "af-select-ok" : "af-select-no") : "")}
                    value={st ? st.val : ""} disabled={st && st.locked}
                    onChange={(e) => answerHead(it.para, e.target.value)}>
                    <option value="" disabled>{t(lang, "rm.pickHeading")}</option>
                    {P.headingOptions.map((h) => (
                      <option key={h.k} value={h.k}>{h.k} — {h.t}</option>
                    ))}
                  </select>
                  {st && (
                    <div className={"af-mini " + (st.correct ? "af-mini-ok" : "af-mini-no")}>
                      {st.correct ? <Check size={13} /> : <X size={13} />}{" "}
                      {st.correct ? it.tr : t(lang, "rm.tryAgain")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SENTENCE INSERTION */}
          <div className="af-qblock">
            <div className="af-qhead"><ArrowRight size={14} /> Sentence Insertion · {t(lang, "rm.paragraph", { p: P.insertion.anchorPara })}</div>
            <div className="af-insert-sent">“{P.insertion.sentence}”</div>
            <div className="af-insert-slots">
              {P.insertion.slots.map((s, idx) => {
                const chosen = ins[`${pIdx}`];
                const done = chosen !== undefined;
                let cls = "af-slot";
                if (done) {
                  if (idx === P.insertion.ans) cls += " af-slot-ok";
                  else if (idx === chosen) cls += " af-slot-no";
                  else cls += " af-slot-dim";
                }
                return (
                  <button key={idx} className={cls} disabled={done} onClick={() => answerIns(idx)}>
                    <span className="af-slot-n">{idx + 1}</span> {s}
                  </button>
                );
              })}
            </div>
            {ins[`${pIdx}`] !== undefined && (
              <div className={"af-mini " + (ins[`${pIdx}`] === P.insertion.ans ? "af-mini-ok" : "af-mini-no")}>
                {ins[`${pIdx}`] === P.insertion.ans ? <Check size={13} /> : <X size={13} />} {P.insertion.tr}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MODULE C :: SYNTAX FORGE
============================================================ */
export function SyntaxForge({ onBack, award }) {
  const [idx, setIdx] = useState(0);
  const item = SYNTAX[idx % SYNTAX.length];
  return <ForgeItem key={item.id} item={item} award={award} onBack={onBack}
    onNext={() => setIdx((x) => x + 1)} index={idx} total={SYNTAX.length} />;
}
function ForgeItem({ item, award, onBack, onNext, index, total }) {
  const lang = useLang();
  const order = useMemo(() => {
    // shuffle indices, ensure not already sorted
    let s = shuffle(item.frags.map((_, i) => i));
    if (s.every((v, i) => v === i)) s = s.reverse();
    return s;
  }, [item.id]);

  const [pool, setPool] = useState(order);           // original indices remaining
  const [placed, setPlaced] = useState([]);          // original indices in chosen order
  const [solved, setSolved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const n = item.frags.length;
  const full = placed.length === n;
  const allCorrect = full && placed.every((v, i) => v === i);

  useEffect(() => {
    if (full && allCorrect && !solved && !revealed) {
      setSolved(true);
      award(25, true);
    } else if (full && !allCorrect && !solved) {
      award(0, false);
    }
  }, [full, allCorrect]);

  function place(orig) {
    if (solved || revealed) return;
    setPool((p) => p.filter((x) => x !== orig));
    setPlaced((p) => [...p, orig]);
  }
  function remove(orig) {
    if (solved || revealed) return;
    setPlaced((p) => p.filter((x) => x !== orig));
    setPool((p) => [...p, orig].sort((a, b) => order.indexOf(a) - order.indexOf(b)));
  }
  function reset() {
    setPool(order); setPlaced([]); setSolved(false); setRevealed(false);
  }
  function reveal() {
    setPlaced(item.frags.map((_, i) => i)); setPool([]); setRevealed(true);
  }

  return (
    <div className="af-mod">
      <ModuleBar title="SYNTAX FORGE" sub={`Band ${item.band} · ${item.label}`} onBack={onBack}
        right={<span className="af-forge-count">{index % total + 1}/{total}</span>} />

      <div className="af-forge">
        <div className="af-forge-instr">{t(lang, "sf.instr", { band: item.band })}</div>

        {/* build line */}
        <div className={"af-build " + (solved ? "af-build-solved" : "")}>
          {placed.length === 0 && <span className="af-build-empty">{t(lang, "sf.buildHere")}</span>}
          {placed.map((orig, i) => {
            let cls = "af-chip af-chip-placed";
            if (solved || revealed) cls += " af-chip-ok";
            else if (full) cls += (orig === i ? " af-chip-ok" : " af-chip-no");
            return (
              <button key={orig} className={cls} onClick={() => remove(orig)} disabled={solved || revealed}>
                {item.frags[orig]}
              </button>
            );
          })}
        </div>

        {/* pool */}
        <div className="af-pool">
          {pool.length === 0 && !full && <span className="af-build-empty">—</span>}
          {pool.map((orig) => (
            <button key={orig} className="af-chip af-chip-pool" onClick={() => place(orig)}>
              {item.frags[orig]}
            </button>
          ))}
        </div>

        {/* feedback */}
        {(solved || revealed) ? (
          <div className="af-verdict af-v-ok">
            <div className="af-verdict-head">
              {revealed ? <><Lightbulb size={15} /> {t(lang, "sf.revealed")}</> : <><Check size={15} /> {t(lang, "sf.perfect")}</>}
            </div>
            <div className="af-verdict-body">{item.tr}</div>
            <div className="af-forge-actions">
              <button className="af-next ghost" onClick={reset}><RotateCcw size={14} /> {t(lang, "sf.retry")}</button>
              <button className="af-next" onClick={() => { onNext(); }}>{t(lang, "common.NEXT")} <ArrowRight size={15} /></button>
            </div>
          </div>
        ) : full ? (
          <div className="af-verdict af-v-no">
            <div className="af-verdict-head"><AlertTriangle size={15} /> {t(lang, "sf.wrongOrder")}</div>
            <div className="af-verdict-body">
              {item.tr}
              <div className="af-forge-hint">{t(lang, "sf.hint")}</div>
            </div>
            <div className="af-forge-actions">
              <button className="af-next ghost" onClick={reset}><RotateCcw size={14} /> {t(lang, "sf.reset")}</button>
              <button className="af-next ghost" onClick={reveal}><Lightbulb size={14} /> {t(lang, "sf.showAnswer")}</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ============================================================
   MODULE D :: 120-SECOND PRESSURE COOKER
============================================================ */
export function PressureCooker({ onBack, award }) {
  const lang = useLang();
  const [idx, setIdx] = useState(0);
  const item = SPEAKING[idx % SPEAKING.length];
  const [phase, setPhase] = useState("idle"); // idle | prep | talk | review
  const [tp, setTp] = useState(0);
  const [used, setUsed] = useState([false, false, false]);
  const [scored, setScored] = useState(false);
  const PREP = 15, TALK = 120;

  useEffect(() => {
    if (phase !== "prep" && phase !== "talk") return;
    if (tp <= 0) {
      if (phase === "prep") { setPhase("talk"); setTp(TALK); }
      else { setPhase("review"); }
      return;
    }
    const id = setTimeout(() => setTp((x) => x - 1), 1000);
    return () => clearTimeout(id);
  }, [tp, phase]);

  function start() { setPhase("prep"); setTp(PREP); setUsed([false, false, false]); setScored(false); }
  function skip() {
    if (phase === "prep") { setPhase("talk"); setTp(TALK); }
    else if (phase === "talk") { setPhase("review"); }
  }
  function confirmReview() {
    if (scored) return;
    const hit = used.filter(Boolean).length;
    award(hit * 10 + 20, hit > 0); // completion + per-phrase; combo up if any phrase used
    setScored(true);
  }
  function nextPrompt() {
    setIdx((x) => x + 1); setPhase("idle"); setTp(0); setUsed([false, false, false]); setScored(false);
  }

  const totalForPhase = phase === "prep" ? PREP : TALK;
  const ring = phase === "prep" || phase === "talk"
    ? Math.max(0, Math.min(100, (tp / totalForPhase) * 100)) : 0;
  const danger = phase === "talk" && tp <= 15;

  return (
    <div className="af-mod">
      <ModuleBar title="120-SECOND PRESSURE COOKER" sub={item.type} onBack={onBack}
        right={<span className="af-forge-count">{idx % SPEAKING.length + 1}/{SPEAKING.length}</span>} />

      <div className="af-speak">
        <div className="af-speak-prompt">
          <div className="af-speak-tag">{item.type}</div>
          <div className="af-speak-q">{item.prompt}</div>
        </div>

        {/* timer */}
        <div className="af-speak-timer">
          <div className={"af-ring " + (phase === "prep" ? "prep" : phase === "talk" ? (danger ? "danger" : "talk") : "idle")}
            style={{ "--ring": ring + "%" }}>
            <div className="af-ring-inner">
              {phase === "idle" && <Mic size={26} />}
              {phase === "review" && <Check size={26} />}
              {(phase === "prep" || phase === "talk") && (
                <>
                  <div className="af-ring-num">{tp}</div>
                  <div className="af-ring-lbl">{phase === "prep" ? t(lang, "pc.prep") : t(lang, "pc.talk")}</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* survival kit */}
        {(phase === "prep" || phase === "talk") && (
          <div className="af-kit">
            <div className="af-kit-head"><Sparkles size={14} /> {t(lang, "pc.kit")}</div>
            <div className="af-kit-items">
              {item.kit.map((k, i) => <span key={i} className="af-kit-chip">{k}</span>)}
            </div>
          </div>
        )}

        {/* controls / review */}
        {phase === "idle" && (
          <div className="af-speak-controls">
            <button className="af-start-big" onClick={start}><Play size={18} /> {t(lang, "pc.start")}</button>
            <div className="af-speak-tip"><Lightbulb size={13} /> {item.tr}</div>
          </div>
        )}
        {(phase === "prep" || phase === "talk") && (
          <div className="af-speak-controls">
            <button className="af-next ghost" onClick={skip}>{phase === "prep" ? t(lang, "pc.skipPrep") : t(lang, "pc.endTalk")}</button>
          </div>
        )}
        {phase === "review" && (
          <div className="af-review">
            <div className="af-review-head">{t(lang, "pc.selfReview")}</div>
            <div className="af-review-items">
              {item.kit.map((k, i) => (
                <button key={i} className={"af-rev-chip " + (used[i] ? "on" : "")}
                  disabled={scored}
                  onClick={() => setUsed((u) => u.map((v, j) => (j === i ? !v : v)))}>
                  {used[i] ? <Check size={14} /> : <X size={14} />} {k}
                </button>
              ))}
            </div>
            {!scored ? (
              <button className="af-start-big" onClick={confirmReview}><Award size={16} /> {t(lang, "pc.score")}</button>
            ) : (
              <div className="af-verdict af-v-ok" style={{ marginTop: 14 }}>
                <div className="af-verdict-head">
                  <Check size={15} /> +{used.filter(Boolean).length * 10 + 20} XP · {used.filter(Boolean).length}/3 {t(lang, "pc.phrases")}
                </div>
                <div className="af-verdict-body">{item.tr}</div>
                <button className="af-next" onClick={nextPrompt}>{t(lang, "pc.nextPrompt")} <ArrowRight size={15} /></button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   ROOT
============================================================ */

/* ============================================================
   shared : MCQ runner (used by grammar + listening)
============================================================ */
function MCQRunner({ items, award, points = 15, onFinish, footer }) {
  const lang = useLang();
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);       // current pick — changeable until checked
  const [checked, setChecked] = useState(false);
  const [ok, setOk] = useState(0);
  const it = items[i];
  function pick(idx) { if (!checked) setSel(idx); }
  function check() {
    if (sel === null || checked) return;
    setChecked(true);
    const correct = sel === it.ans;
    if (correct) setOk((o) => o + 1);
    award(points, correct);
  }
  function next() {
    if (i + 1 < items.length) { setI(i + 1); setSel(null); setChecked(false); }
    else onFinish(ok);
  }
  return (
    <div className="af-mcq">
      <div className="af-q-prog">{t(lang, "common.question", { i: i + 1, n: items.length })}</div>
      <div className="af-q-text">{it.q}</div>
      <div className="af-mcq-opts">
        {it.opts.map((o, idx) => {
          let cls = "af-mcq-opt";
          if (checked) {
            if (idx === it.ans) cls += " is-correct";
            else if (idx === sel) cls += " is-wrong";
            else cls += " is-dim";
          } else if (idx === sel) cls += " is-sel";
          return (
            <button key={idx} className={cls} onClick={() => pick(idx)} disabled={checked}>
              <span className="af-mcq-key">{String.fromCharCode(65 + idx)}</span>
              <span>{o}</span>
              {checked && idx === it.ans ? <Check size={15} className="af-mcq-ic" /> : null}
              {checked && idx === sel && idx !== it.ans ? <X size={15} className="af-mcq-ic" /> : null}
            </button>
          );
        })}
      </div>
      {checked && exTr(lang, it) ? <div className="af-q-exp"><Lightbulb size={13} /> {exTr(lang, it)}</div> : null}
      {!checked ? (
        <button className="af-q-next" disabled={sel === null} onClick={check}>
          {t(lang, "common.check")} <Check size={15} />
        </button>
      ) : (
        <button className="af-q-next" onClick={next}>
          {i + 1 < items.length ? <>{t(lang, "common.continue")} <ArrowRight size={15} /></> : <>{t(lang, "common.finish")} <Check size={15} /></>}
        </button>
      )}
      {footer}
    </div>
  );
}

/* ============================================================
   PLACEMENT TEST
============================================================ */
export function Placement({ onDone, onLang }) {
  const lang = useLang();
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [picking, setPicking] = useState(false);
  const pItems = useMemo(() => [...PLACEMENT].sort((a, b) => lvIndex(a.lv) - lvIndex(b.lv)), []);
  const it = pItems[i];
  function pick(idx) { if (!checked) setSel(idx); }       // changeable until you confirm
  function check() {
    if (sel === null || checked) return;
    setChecked(true);
    if (sel === it.ans) setCorrect((c) => c + 1);
  }
  function next() {
    setSel(null); setChecked(false);
    if (i + 1 < pItems.length) setI(i + 1);
    else setFinished(true);
  }
  // skip without answering: not counted as correct (so it lowers the placement ratio)
  function skip() {
    setSel(null); setChecked(false);
    if (i + 1 < pItems.length) setI(i + 1);
    else setFinished(true);
  }

  // "Seviyemi biliyorum" — skip the whole test and choose a level directly
  if (picking) {
    return (
      <div className="af-substage af-place">
        <div className="af-place-head">
          <div className="af-boot"><span className="af-prompt-sym">›</span> {t(lang, "pl.pickBoot")}<span className="af-caret" /></div>
          <h1 className="af-h1">{t(lang, "pl.pickTitle")}</h1>
          <p className="af-lede">{t(lang, "pl.pickLede")}</p>
        </div>
        <div className="af-levelpick">
          {LV_ORDER.map((lv) => {
            const meta = levelMeta(lv);
            return (
              <button key={lv} className="af-levelpick-btn" onClick={() => onDone(lv)}>
                <span className="af-levelpick-id">{lv}</span>
                <span className="af-levelpick-label">{pick(lang, meta.label, meta.label_en)}</span>
              </button>
            );
          })}
        </div>
        <button className="af-place-back" onClick={() => setPicking(false)}><ChevronLeft size={14} /> {t(lang, "pl.backToTest")}</button>
      </div>
    );
  }
  if (finished) {
    const lv = placementLevel(correct, pItems.length);
    const meta = levelMeta(lv);
    return (
      <div className="af-substage af-place">
        <div className="af-result">
          <div className="af-result-cap">{t(lang, "pl.resultCap")}</div>
          <div className="af-result-lv">{lv}</div>
          <div className="af-result-label">{pick(lang, meta.label, meta.label_en)}</div>
          <p className="af-result-blurb">{pick(lang, meta.blurb, meta.blurb_en)}</p>
          <div className="af-result-score">{t(lang, "pl.resultScore", { c: correct, n: pItems.length })}</div>
          <p className="af-result-note">{t(lang, "pl.resultNote")}</p>
          <button className="af-q-next af-result-go" onClick={() => onDone(lv)}>
            {t(lang, "pl.toCatalog")} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="af-substage af-place">
      <div className="af-place-head">
        {onLang ? (
          <div className="af-langsel">
            <button className={"af-langsel-btn " + (lang !== "en" ? "is-on" : "")} onClick={() => onLang("tr")}>TR</button>
            <button className={"af-langsel-btn " + (lang === "en" ? "is-on" : "")} onClick={() => onLang("en")}>EN</button>
          </div>
        ) : null}
        <div className="af-boot"><span className="af-prompt-sym">›</span> {t(lang, "pl.boot")}<span className="af-caret" /></div>
        <h1 className="af-h1">{t(lang, "pl.title")}</h1>
        <p className="af-lede">{t(lang, "pl.lede")}</p>
        <button className="af-place-skiptest" onClick={() => setPicking(true)}>{t(lang, "pl.knowLevel")} <ArrowRight size={14} /></button>
      </div>
      <div className="af-prog-track af-place-prog">
        <div className="af-prog-fill" style={{ width: ((i) / pItems.length) * 100 + "%" }} />
      </div>
      <div className="af-mcq">
        <div className="af-q-prog">{t(lang, "common.question", { i: i + 1, n: pItems.length })}</div>
        <div className="af-q-tag">{tagLabel(lang, it.tag || "boşluk doldurma")}</div>
        <div className="af-q-text">{it.q}</div>
        <div className="af-mcq-opts">
          {it.opts.map((o, idx) => {
            let cls = "af-mcq-opt";
            if (checked) {
              if (idx === it.ans) cls += " is-correct";
              else if (idx === sel) cls += " is-wrong";
              else cls += " is-dim";
            } else if (idx === sel) cls += " is-sel";
            return (
              <button key={idx} className={cls} onClick={() => pick(idx)} disabled={checked}>
                <span className="af-mcq-key">{String.fromCharCode(65 + idx)}</span><span>{o}</span>
                {checked && idx === it.ans ? <Check size={15} className="af-mcq-ic" /> : null}
                {checked && idx === sel && idx !== it.ans ? <X size={15} className="af-mcq-ic" /> : null}
              </button>
            );
          })}
        </div>
        {!checked ? (
          <div className="af-place-actions">
            <button className="af-q-next" disabled={sel === null} onClick={check}>{t(lang, "common.check")} <Check size={15} /></button>
            <button className="af-place-skip" onClick={skip}>{t(lang, "common.skipBlank")}</button>
          </div>
        ) : (
          <button className="af-q-next" onClick={next}>
            {i + 1 < pItems.length ? <>{t(lang, "common.continue")} <ArrowRight size={15} /></> : <>{t(lang, "common.seeResult")} <Check size={15} /></>}
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   CATALOG  (v2 home — Learn track + Exam track)
============================================================ */
const MODULE_ICON = {
  vocab: <Repeat size={20} />, wordlist: <ListChecks size={20} />, grammar: <GraduationCap size={20} />,
  listening: <Headphones size={20} />, articles: <BookMarked size={20} />, reading: <BookOpen size={20} />,
  lexical: <Crosshair size={20} />, syntax: <Hammer size={20} />,
  speaking: <Mic size={20} />, writing: <PenLine size={20} />, cloze: <FileText size={20} />,
  restate: <Replace size={20} />, oddout: <Filter size={20} />,
  dialogue: <MessageSquare size={20} />, paracomp: <AlignLeft size={20} />, translate: <LanguagesIcon size={20} />,
  toeflint: <Layers size={20} />, mock: <ClipboardList size={20} />,
  paraphrase: <RefreshCw size={20} />, errorhunt: <Scan size={20} />,
};
function ModuleCard({ k, ctx, go, done }) {
  const lang = useLang();
  const info = MODULE_INFO[k];
  if (!info) return null;
  return (
    <button className="af-card" onClick={() => go(k, ctx)}>
      <div className="af-card-top">
        <span className={"af-card-icon af-ic-" + k}>{MODULE_ICON[k]}</span>
        <span className="af-card-tag">{info.minLv}+</span>
      </div>
      <div className="af-card-name">{pick(lang, info.name, info.name_en)}{done ? <Check size={14} className="af-done-badge" /> : null}</div>
      <div className="af-card-desc">{pick(lang, info.sub, info.sub_en)}</div>
      <div className="af-card-go">{t(lang, "common.begin")} <ArrowRight size={15} /></div>
    </button>
  );
}

const doneCount = (s, pre) => Object.keys(s.done || {}).filter((k) => k.startsWith(pre)).length;
const srsStarted = (s) => Object.values(s.srs || {}).filter((c) => c && c.reps >= 1).length;
const srsMature = (s) => Object.values(s.srs || {}).filter((c) => c && c.interval >= 21).length;
const acc = (s) => (s.total > 0 ? s.correct / s.total : 0);

const BADGES = [
  // — Başlangıç —
  { id: "start",     cat: "Başlangıç", name: "İlk Adım", name_en: "First Step",         desc: "Seviye testini tamamla", desc_en: "Complete the placement test",     ic: <Sparkles size={18} />,      test: (s) => s.level !== null },
  { id: "firstq",    cat: "Başlangıç", name: "Buz Kırıldı", name_en: "Ice Broken",      desc: "İlk soruyu yanıtla", desc_en: "Answer your first question",         ic: <Play size={18} />,          test: (s) => s.total >= 1 },
  { id: "firstvoc",  cat: "Başlangıç", name: "Merhaba Kelime", name_en: "Hello Word",   desc: "İlk kelimeyi çalış", desc_en: "Study your first word",         ic: <Repeat size={18} />,        test: (s) => srsStarted(s) >= 1 },

  // — XP / İlerleme —
  { id: "xp100",     cat: "XP / İlerleme", name: "Isınma Turu", name_en: "Warm-up Lap",  desc: "100 XP topla", desc_en: "Collect 100 XP",               ic: <Zap size={18} />,           test: (s) => s.xp >= 100 },
  { id: "xp500",     cat: "XP / İlerleme", name: "Çalışkan", name_en: "Hard Worker",     desc: "500 XP topla", desc_en: "Collect 500 XP",               ic: <TrendingUp size={18} />,    test: (s) => s.xp >= 500 },
  { id: "xp1500",    cat: "XP / İlerleme", name: "XP Canavarı", name_en: "XP Monster",  desc: "1.500 XP topla", desc_en: "Collect 1,500 XP",             ic: <Trophy size={18} />,        test: (s) => s.xp >= 1500 },
  { id: "xp4000",    cat: "XP / İlerleme", name: "Akademisyen", name_en: "Academic",  desc: "4.000 XP topla", desc_en: "Collect 4,000 XP",             ic: <GraduationCap size={18} />, test: (s) => s.xp >= 4000 },
  { id: "xp10000",   cat: "XP / İlerleme", name: "Efsane", name_en: "Legend",       desc: "10.000 XP topla", desc_en: "Collect 10,000 XP",            ic: <Gauge size={18} />,         test: (s) => s.xp >= 10000 },

  // — Seri —
  { id: "streak3",   cat: "Seri", name: "Seri Başlangıcı", name_en: "Streak Starter",       desc: "3 günlük seri", desc_en: "3-day streak",              ic: <Flame size={18} />,         test: (s) => s.streak.count >= 3 },
  { id: "streak7",   cat: "Seri", name: "Haftalık İstikrar", name_en: "Weekly Consistency",     desc: "7 günlük seri", desc_en: "7-day streak",              ic: <Flame size={18} />,         test: (s) => s.streak.count >= 7 },
  { id: "streak14",  cat: "Seri", name: "İki Hafta Dimdik", name_en: "Two Weeks Strong",      desc: "14 günlük seri", desc_en: "14-day streak",             ic: <Flame size={18} />,         test: (s) => s.streak.count >= 14 },
  { id: "streak30",  cat: "Seri", name: "Aylık Disiplin", name_en: "Monthly Discipline",        desc: "30 günlük seri", desc_en: "30-day streak",             ic: <Flame size={18} />,         test: (s) => s.streak.count >= 30 },
  { id: "streak100", cat: "Seri", name: "Yüz Gün", name_en: "Hundred Days",               desc: "100 günlük seri", desc_en: "100-day streak",            ic: <Trophy size={18} />,        test: (s) => s.streak.count >= 100 },

  // — Kombo / Akış —
  { id: "combo8",    cat: "Kombo / Akış", name: "Akış Ustası", name_en: "Flow Master",   desc: "8'lik kombo yakala", desc_en: "Hit an 8 combo",         ic: <Star size={18} />,          test: (s) => s.bestCombo >= 8 },
  { id: "combo15",   cat: "Kombo / Akış", name: "Kombo Kralı", name_en: "Combo King",   desc: "15'lik kombo yakala", desc_en: "Hit a 15 combo",        ic: <Star size={18} />,          test: (s) => s.bestCombo >= 15 },
  { id: "combo25",   cat: "Kombo / Akış", name: "Durdurulamaz", name_en: "Unstoppable",  desc: "25'lik kombo yakala", desc_en: "Hit a 25 combo",        ic: <Zap size={18} />,           test: (s) => s.bestCombo >= 25 },
  { id: "combo40",   cat: "Kombo / Akış", name: "Kusursuz Akış", name_en: "Flawless Flow", desc: "40'lık kombo yakala", desc_en: "Hit a 40 combo",        ic: <Crosshair size={18} />,     test: (s) => s.bestCombo >= 40 },

  // — Doğruluk —
  { id: "acc80",     cat: "Doğruluk", name: "Keskin Nişancı", name_en: "Sharpshooter",    desc: "%80 doğruluk (30+ soru)", desc_en: "80% accuracy (30+ questions)",    ic: <Target size={18} />,        test: (s) => s.total >= 30 && acc(s) >= 0.8 },
  { id: "acc90",     cat: "Doğruluk", name: "Cerrah Hassasiyeti", name_en: "Surgical Precision",desc: "%90 doğruluk (50+ soru)", desc_en: "90% accuracy (50+ questions)",    ic: <Crosshair size={18} />,     test: (s) => s.total >= 50 && acc(s) >= 0.9 },
  { id: "acc95",     cat: "Doğruluk", name: "Hatasız Kâtip", name_en: "Flawless Scribe",     desc: "%95 doğruluk (100+ soru)", desc_en: "95% accuracy (100+ questions)",   ic: <Gauge size={18} />,         test: (s) => s.total >= 100 && acc(s) >= 0.95 },

  // — Kelime —
  { id: "voc20",     cat: "Kelime", name: "Kelime Avcısı", name_en: "Word Hunter",       desc: "20 kelime çalış", desc_en: "Study 20 words",            ic: <Repeat size={18} />,        test: (s) => srsStarted(s) >= 20 },
  { id: "voc50",     cat: "Kelime", name: "Kelime Toplayıcısı", name_en: "Word Collector",  desc: "50 kelime çalış", desc_en: "Study 50 words",            ic: <Repeat size={18} />,        test: (s) => srsStarted(s) >= 50 },
  { id: "voc100",    cat: "Kelime", name: "Sözlük Kurdu", name_en: "Dictionary Worm",        desc: "100 kelime çalış", desc_en: "Study 100 words",           ic: <BookMarked size={18} />,    test: (s) => srsStarted(s) >= 100 },
  { id: "voc250",    cat: "Kelime", name: "Kelime Hazinesi", name_en: "Treasure of Words",     desc: "250 kelime çalış", desc_en: "Study 250 words",           ic: <Layers size={18} />,        test: (s) => srsStarted(s) >= 250 },
  { id: "voc500",    cat: "Kelime", name: "Yürüyen Sözlük", name_en: "Walking Dictionary",      desc: "500 kelime çalış", desc_en: "Study 500 words",           ic: <Brain size={18} />,         test: (s) => srsStarted(s) >= 500 },
  { id: "mat20",     cat: "Kelime", name: "Kalıcı Bellek", name_en: "Long-Term Memory",       desc: "20 kelimeyi uzun vadeye al", desc_en: "Take 20 words long-term", ic: <Brain size={18} />,         test: (s) => srsMature(s) >= 20 },
  { id: "mat50",     cat: "Kelime", name: "Hafıza Sarayı", name_en: "Memory Palace",       desc: "50 kelimeyi kalıcı ezberle", desc_en: "Memorise 50 words for good", ic: <Trophy size={18} />,        test: (s) => srsMature(s) >= 50 },

  // — Beceriler —
  { id: "gram1",     cat: "Beceriler", name: "Gramer Çaylağı", name_en: "Grammar Rookie",   desc: "İlk gramer dersini bitir", desc_en: "Finish your first grammar lesson",   ic: <GraduationCap size={18} />, test: (s) => doneCount(s, "grammar:") >= 1 },
  { id: "gram5",     cat: "Beceriler", name: "Gramer Mezunu", name_en: "Grammar Graduate",    desc: "5 gramer dersi bitir", desc_en: "Finish 5 grammar lessons",       ic: <GraduationCap size={18} />, test: (s) => doneCount(s, "grammar:") >= 5 },
  { id: "gram10",    cat: "Beceriler", name: "Gramer Profesörü", name_en: "Grammar Professor", desc: "10 gramer dersi bitir", desc_en: "Finish 10 grammar lessons",      ic: <Brain size={18} />,         test: (s) => doneCount(s, "grammar:") >= 10 },
  { id: "lis1",      cat: "Beceriler", name: "İlk Dinleti", name_en: "First Listen",      desc: "İlk dinlemeyi tamamla", desc_en: "Complete your first listening",      ic: <Headphones size={18} />,    test: (s) => doneCount(s, "listening:") >= 1 },
  { id: "lis3",      cat: "Beceriler", name: "Kulak Kabartan", name_en: "Keen Listener",   desc: "3 dinleme tamamla", desc_en: "Complete 3 listenings",          ic: <Headphones size={18} />,    test: (s) => doneCount(s, "listening:") >= 3 },
  { id: "lis10",     cat: "Beceriler", name: "Keskin Kulak", name_en: "Sharp Ear",     desc: "10 dinleme tamamla", desc_en: "Complete 10 listenings",         ic: <Volume2 size={18} />,       test: (s) => doneCount(s, "listening:") >= 10 },
  { id: "wri1",      cat: "Beceriler", name: "Kalem Erbabı", name_en: "Penman",     desc: "İlk yazma görevini bitir", desc_en: "Finish your first writing task",   ic: <PenLine size={18} />,       test: (s) => doneCount(s, "writing:") >= 1 },
  { id: "wri3",      cat: "Beceriler", name: "Üretken Yazar", name_en: "Prolific Writer",    desc: "3 yazma görevi bitir", desc_en: "Finish 3 writing tasks",       ic: <PenLine size={18} />,       test: (s) => doneCount(s, "writing:") >= 3 },
  { id: "art3",      cat: "Beceriler", name: "Sayfa Çeviren", name_en: "Page Turner",    desc: "3 okuma parçası bitir", desc_en: "Finish 3 reading passages",      ic: <BookOpen size={18} />,      test: (s) => doneCount(s, "article:") >= 3 },
  { id: "art10",     cat: "Beceriler", name: "Kitap Kurdu", name_en: "Bookworm",      desc: "10 okuma parçası bitir", desc_en: "Finish 10 reading passages",     ic: <BookOpen size={18} />,      test: (s) => doneCount(s, "article:") >= 10 },
  { id: "allskill",  cat: "Beceriler", name: "Çok Yönlü", name_en: "All-Rounder",        desc: "Her beceriden en az 1", desc_en: "At least 1 in every skill",      ic: <Award size={18} />,         test: (s) => doneCount(s, "grammar:") >= 1 && doneCount(s, "listening:") >= 1 && doneCount(s, "writing:") >= 1 && doneCount(s, "article:") >= 1 },

  // — Hacim —
  { id: "q100",      cat: "Hacim", name: "Yüz Soru", name_en: "Hundred Questions",             desc: "100 soru yanıtla", desc_en: "Answer 100 questions",           ic: <ListChecks size={18} />,    test: (s) => s.total >= 100 },
  { id: "q500",      cat: "Hacim", name: "Maratoncu", name_en: "Marathoner",            desc: "500 soru yanıtla", desc_en: "Answer 500 questions",           ic: <Gauge size={18} />,         test: (s) => s.total >= 500 },
  { id: "cor200",    cat: "Hacim", name: "İki Yüz İsabet", name_en: "Two Hundred Hits",       desc: "200 doğru yanıt ver", desc_en: "Give 200 correct answers",        ic: <Check size={18} />,         test: (s) => s.correct >= 200 },
  { id: "cor1000",   cat: "Hacim", name: "Bin İsabet", name_en: "Thousand Hits",           desc: "1.000 doğru yanıt ver", desc_en: "Give 1,000 correct answers",      ic: <Trophy size={18} />,        test: (s) => s.correct >= 1000 },
  { id: "day100",    cat: "Hacim", name: "Günün Hakkını Ver", name_en: "Seize the Day",    desc: "Bir günde 100 XP topla", desc_en: "Collect 100 XP in one day",     ic: <Flame size={18} />,         test: (s) => (s.daily && s.daily.xp >= 100) },

  // — Odak —
  { id: "focus60",   cat: "Hacim", name: "Derin Çalışma", name_en: "Deep Work",        desc: "Toplam 60 dk odak", desc_en: "60 min total focus",          ic: <Timer size={18} />,         test: (s) => (s.focusMinutes || 0) >= 60 },
  { id: "focus300",  cat: "Hacim", name: "Maraton Zihin", name_en: "Marathon Mind",        desc: "Toplam 300 dk odak", desc_en: "300 min total focus",         ic: <Flame size={18} />,         test: (s) => (s.focusMinutes || 0) >= 300 },
  { id: "focus1000", cat: "Hacim", name: "Çelik İrade", name_en: "Iron Will",          desc: "Toplam 1.000 dk odak", desc_en: "1,000 min total focus",       ic: <Trophy size={18} />,        test: (s) => (s.focusMinutes || 0) >= 1000 },
];

// Gelişim Raporu — per-question-type accuracy (state.stats) + focus minutes (defensive)
function ProgressReport({ state }) {
  const lang = useLang();
  const stats = state.stats || {};
  const rows = Object.entries(stats).filter(([, v]) => v && v.t > 0).sort((a, b) => b[1].t - a[1].t);
  const focusMin = state.focusMinutes || 0;
  if (!rows.length && !focusMin) return null;
  return (
    <div className="af-report">
      <div className="af-report-head"><BarChart3 size={15} /> {t(lang, "rep.title")}</div>
      {focusMin ? <div className="af-report-focus"><Timer size={13} /> {t(lang, "rep.focus")} <b>{focusMin} {lang === "en" ? "min" : "dk"}</b></div> : null}
      {rows.length ? (
        <div className="af-report-list">
          {rows.map(([type, v]) => {
            const pct = Math.round((v.c / v.t) * 100);
            return (
              <div key={type} className="af-report-row">
                <span className="af-report-type">{qtypeLabel(lang, type)}</span>
                <span className="af-report-acc">{v.c}/{v.t} · %{pct}</span>
                <span className="af-task-bar"><i style={{ width: pct + "%" }} /></span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function Badges({ state }) {
  const lang = useLang();
  const [open, setOpen] = useState(true);
  const earned = BADGES.filter((b) => b.test(state)).length;
  return (
    <div className="af-badges">
      <button className="af-badges-head" onClick={() => setOpen((v) => !v)}>
        <Award size={15} /> {t(lang, "bd.title")}
        <span className="af-badges-title">{rankFor(state.xp, lang)}</span>
        <span className="af-badges-count">{earned}/{BADGES.length}</span>
        <ChevronRight size={14} className={open ? "af-rot" : ""} />
      </button>
      {open ? (
        <div className="af-badges-cats">
          {(() => {
            const cats = [];
            for (const b of BADGES) if (!cats.includes(b.cat)) cats.push(b.cat);
            return cats.map((cat) => {
              const list = BADGES.filter((b) => b.cat === cat);
              const got = list.filter((b) => b.test(state)).length;
              return (
                <div key={cat} className="af-badge-cat">
                  <div className="af-badge-cat-head">
                    <span className="af-badge-cat-name">{badgeCatLabel(lang, cat)}</span>
                    <span className="af-badge-cat-count">{got}/{list.length}</span>
                  </div>
                  <div className="af-badges-grid">
                    {list.map((b) => {
                      const g = b.test(state);
                      return (
                        <div key={b.id} className={"af-badge " + (g ? "is-got" : "")}>
                          <span className="af-badge-ic">{g ? b.ic : <Lock size={16} />}</span>
                          <span className="af-badge-name">{pick(lang, b.name, b.name_en)}</span>
                          <span className="af-badge-desc">{pick(lang, b.desc, b.desc_en)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      ) : null}
    </div>
  );
}

function levelPct(level, state) {
  const g = GRAMMAR.filter((x) => x.lv === level);
  const li = LISTENING.filter((x) => x.lv === level);
  const w = WRITING.filter((x) => x.lv === level);
  const v = VOCAB.filter((x) => x.lv === level);
  const total = g.length + li.length + w.length + v.length;
  if (!total) return 0;
  let done = 0;
  for (const x of g) if (state.done["grammar:" + x.id]) done++;
  for (const x of li) if (state.done["listening:" + x.id]) done++;
  for (const x of w) if (state.done["writing:" + x.id]) done++;
  for (const x of v) { const c = state.srs[x.id]; if (c && c.reps >= 1) done++; }
  return Math.round((done / total) * 100);
}

export function Catalog({ store, go, content = {}, onFocus }) {
  const lang = useLang();
  const { state, setLevel, setSetting } = store;
  const userLv = state.level || "A1";
  const theme = state.settings.theme || "dark";
  const [tab, setTab] = useState("learn");
  const [learnLv, setLearnLv] = useState(userLv);
  const [openExam, setOpenExam] = useState(null);
  const [examField, setExamField] = useState("genel"); // YÖKDİL alan seçimi

  const dueInfo = useMemo(() => reviewQueue(state.srs, vocabForLevel(userLv), 14), [state.srs, userLv]);
  const dueCount = dueInfo.due.length;
  const freshCount = dueInfo.fresh.length;

  const learnModules = useMemo(
    () => Object.keys(MODULE_INFO).filter((k) => lvIndex(MODULE_INFO[k].minLv) <= lvIndex(learnLv)),
    [learnLv]
  );

  return (
    <div className="af-home af-catalog">
      <div className="af-cat-head">
        <div className="af-cat-badge">
          <span className="af-cat-badge-id">{userLv}</span>
          <span className="af-cat-badge-label">{pick(lang, levelMeta(userLv).label, levelMeta(userLv).label_en)}</span>
          <button className="af-cat-retake" onClick={() => setLevel(null)} title={t(lang, "cat.retakeTitle")}>
            <RotateCw size={12} /> {t(lang, "cat.retake")}
          </button>
        </div>
        <div className="af-cat-stats">
          <span className="af-cat-stat"><Flame size={13} /> {t(lang, "cat.days", { n: state.streak.count })}</span>
          <span className="af-cat-stat"><TrendingUp size={13} /> {state.xp} XP</span>
          <span className="af-cat-stat"><Repeat size={13} /> {t(lang, "cat.reviews", { n: dueCount })}</span>
          <button className="af-theme-quick" title={t(lang, "cat.themeTitle")}
            onClick={() => setSetting("theme", theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </div>

      <button className="af-srs-cta" onClick={() => go("vocab", {})}>
        <div className="af-srs-cta-l">
          <Repeat size={18} />
          <div>
            <div className="af-srs-cta-title">{t(lang, "cat.srsTitle")}</div>
            <div className="af-srs-cta-sub">
              {dueCount > 0 ? t(lang, "cat.srsDue", { n: dueCount }) : freshCount > 0 ? t(lang, "cat.srsFresh", { n: freshCount }) : t(lang, "cat.srsDone")}
            </div>
          </div>
        </div>
        <ArrowRight size={18} />
      </button>

      {(() => {
        const today = new Date().toISOString().slice(0, 10);
        const dd = state.daily && state.daily.date === today ? state.daily : { vocab: 0, xp: 0, grammar: 0, listening: 0 };
        const tasks = [
          { k: "vocab", ic: <Repeat size={14} />, label: t(lang, "cat.taskVocab"), have: dd.vocab || 0, goal: 15 },
          { k: "xp", ic: <TrendingUp size={14} />, label: t(lang, "cat.taskXp"), have: dd.xp || 0, goal: 120 },
          { k: "grammar", ic: <GraduationCap size={14} />, label: t(lang, "cat.taskGrammar"), have: dd.grammar || 0, goal: 1 },
          { k: "listening", ic: <Headphones size={14} />, label: t(lang, "cat.taskListening"), have: dd.listening || 0, goal: 1 },
        ];
        const doneN = tasks.filter((t) => t.have >= t.goal).length;
        return (
          <div className="af-daily">
            <div className="af-daily-head"><Crosshair size={14} /> {t(lang, "cat.dailyHead")} <span className="af-daily-prog">{doneN}/{tasks.length}</span></div>
            <div className="af-daily-list">
              {tasks.map((t) => {
                const ok = t.have >= t.goal;
                const pct = Math.min(100, Math.round((t.have / t.goal) * 100));
                return (
                  <div key={t.k} className={"af-task " + (ok ? "is-done" : "")}>
                    <span className="af-task-ic">{ok ? <Check size={14} /> : t.ic}</span>
                    <span className="af-task-label">{t.label}</span>
                    <span className="af-task-count">{Math.min(t.have, t.goal)}/{t.goal}</span>
                    <span className="af-task-bar"><i style={{ width: pct + "%" }} /></span>
                  </div>
                );
              })}
            </div>
            {doneN === tasks.length ? <div className="af-daily-done">{t(lang, "cat.dailyDone")}</div> : null}
          </div>
        );
      })()}

      {onFocus ? (
        <div className="af-focus-launch">
          <span className="af-focus-launch-cap"><Target size={14} /> {t(lang, "cat.focusCap")}</span>
          <button className="af-focus-btn" onClick={() => onFocus(25)}>{t(lang, "common.minute", { n: 25 })}</button>
          <button className="af-focus-btn" onClick={() => onFocus(60)}>{t(lang, "common.minute", { n: 60 })}</button>
          <button className="af-focus-btn" onClick={() => onFocus(120)}>{t(lang, "cat.focusMarathon")}</button>
          <span className="af-focus-launch-note">{t(lang, "cat.focusNote")}</span>
        </div>
      ) : null}

      <div className="af-tabs">
        <button className={"af-tab " + (tab === "learn" ? "is-on" : "")} onClick={() => setTab("learn")}>
          <GraduationCap size={15} /> {t(lang, "cat.tabLearn")}
        </button>
        <button className={"af-tab " + (tab === "exam" ? "is-on" : "")} onClick={() => setTab("exam")}>
          <Trophy size={15} /> {t(lang, "cat.tabExam")}
        </button>
      </div>

      {tab === "learn" ? (
        <>
          <div className="af-lvchips">
            {LEVELS.map((l) => (
              <button key={l.id}
                className={"af-lvchip " + (l.id === learnLv ? "is-active " : "") + (l.id === userLv ? "is-you" : "")}
                onClick={() => setLearnLv(l.id)}>
                <span className="af-lvchip-id">{l.id}</span>
                <span className="af-lvchip-label">{pick(lang, l.label, l.label_en)}</span>
                <span className="af-lvchip-bar"><i style={{ width: levelPct(l.id, state) + "%" }} /></span>
              </button>
            ))}
          </div>
          <p className="af-lvblurb">{pick(lang, levelMeta(learnLv).blurb, levelMeta(learnLv).blurb_en)}</p>
          <div className="af-grid">
            {learnModules.map((k) => (
              <ModuleCard key={k} k={k} ctx={{ level: learnLv }} go={go}
                done={k === "grammar" ? false : undefined} />
            ))}
          </div>
        </>
      ) : (
        <div className="af-exam-list">
          {EXAMS.map((ex) => {
            const open = openExam === ex.id;
            const locked = ex.status !== "active";
            return (
              <div key={ex.id} className={"af-exam-card " + (locked ? "is-locked" : "")}>
                <button className="af-exam-top" onClick={() => !locked && setOpenExam(open ? null : ex.id)}>
                  <div className="af-exam-id">
                    <span className="af-exam-name">{pick(lang, ex.name, ex.name_en)}</span>
                    {locked ? <span className="af-exam-soon"><Lock size={11} /> {t(lang, "cat.soon")}</span>
                      : <span className="af-exam-score">{pick(lang, ex.scoring, ex.scoring_en)}</span>}
                  </div>
                  <div className="af-exam-skills">{pick(lang, ex.skills, ex.skills_en).join(" · ")}</div>
                  <div className="af-exam-blurb">{pick(lang, ex.blurb, ex.blurb_en)}</div>
                  {!locked ? <div className="af-exam-expand">{open ? t(lang, "cat.modsHide") : t(lang, "cat.modsShow")} <ChevronRight size={13} className={open ? "af-rot" : ""} /></div> : null}
                </button>
                {open && !locked ? (
                  <>
                    {ex.fieldFilter ? (
                      <div className="af-fieldsel">
                        <span className="af-fieldsel-cap"><Filter size={13} /> {t(lang, "cat.field")}</span>
                        {["genel", "fen", "saglik", "sosyal"].map((id) => (
                          <button key={id} className={"af-fieldsel-btn " + (examField === id ? "is-on" : "")}
                            onClick={() => setExamField(id)}>{fieldLabel(lang, id)}</button>
                        ))}
                      </div>
                    ) : null}
                    <div className="af-exam-mods af-grid">
                      {ex.modules.map((k) => (
                        <ModuleCard key={k} k={k} go={go}
                          ctx={{ level: userLv, exam: ex.id, field: ex.fieldFilter ? examField : undefined }} />
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      <ProgressReport state={state} />
      <Badges state={state} />

      <div className="af-settings">
        <label className="af-toggle">
          <input type="checkbox" checked={state.settings.sound}
            onChange={(e) => setSetting("sound", e.target.checked)} />
          <span><Volume2 size={13} /> {t(lang, "cat.soundLabel")}</span>
        </label>
        <div className="af-theme">
          <span className="af-theme-cap"><Sun size={13} /> {t(lang, "cat.theme")}</span>
          <div className="af-seg">
            <button className={"af-seg-btn " + (theme === "dark" ? "is-on" : "")} onClick={() => setSetting("theme", "dark")}><Moon size={12} /> {t(lang, "cat.dark")}</button>
            <button className={"af-seg-btn " + (theme === "light" ? "is-on" : "")} onClick={() => setSetting("theme", "light")}><Sun size={12} /> {t(lang, "cat.light")}</button>
          </div>
        </div>
        <div className="af-theme">
          <span className="af-theme-cap"><LanguagesIcon size={13} /> {t(lang, "cat.lang")}</span>
          <div className="af-seg">
            <button className={"af-seg-btn " + (lang !== "en" ? "is-on" : "")} onClick={() => setSetting("lang", "tr")}>Türkçe</button>
            <button className={"af-seg-btn " + (lang === "en" ? "is-on" : "")} onClick={() => setSetting("lang", "en")}>English</button>
          </div>
        </div>
        <div className="af-keyrow">
          <label className="af-keylabel"><Sparkles size={13} /> {t(lang, "cat.aiKeyLabel")}</label>
          <input className="af-keyinput" type="password" autoComplete="off" spellCheck={false}
            value={state.settings.apiKey} placeholder="sk-ant-…"
            onChange={(e) => setSetting("apiKey", e.target.value.trim())} />
          <div className="af-keynote">{t(lang, "cat.aiKeyNote")}</div>
        </div>
        <div className="af-keyrow">
          <label className="af-keylabel"><RefreshCw size={13} /> {t(lang, "cat.contentLabel")}</label>
          <input className="af-keyinput" type="text" autoComplete="off" spellCheck={false}
            value={state.settings.contentUrl} placeholder="https://raw.githubusercontent.com/…/content.json"
            onChange={(e) => setSetting("contentUrl", e.target.value.trim())} />
          <div className="af-content-foot">
            {content.reload ? <button className="af-content-reload" onClick={content.reload}><RotateCw size={12} /> {t(lang, "cat.reload")}</button> : null}
            {content.msg ? <span className="af-content-msg">{typeof content.msg === "string" ? content.msg : t(lang, content.msg.k, content.msg.vars)}</span> : null}
          </div>
          <div className="af-keynote">{t(lang, "cat.contentNote")}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   VOCAB REVIEW  (SRS flashcards)
============================================================ */
export function VocabReview({ store, onBack }) {
  const lang = useLang();
  const { state, gradeCard, touchStreak, bumpDaily } = store;
  const queue = useMemo(() => {
    const deck = [...vocabForLevel(state.level || "A1")].sort((a, b) => lvIndex(a.lv) - lvIndex(b.lv));
    const q = reviewQueue(state.srs, deck, 14);
    return q.all.length ? q.all : deck.slice(0, 14).map((d) => d.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [pos, setPos] = useState(0);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const id = queue[pos];
  const card = VOCAB.find((v) => v.id === id);
  function grade(g) {
    gradeCard(id, g);
    bumpDaily("vocab");
    if (pos + 1 < queue.length) { setPos(pos + 1); setShow(false); }
    else { touchStreak(); setDone(true); }
  }
  if (done || !card) {
    return (
      <>
        <ModuleBar title={pick(lang, MODULE_INFO.vocab.name, MODULE_INFO.vocab.name_en)} sub={pick(lang, MODULE_INFO.vocab.sub, MODULE_INFO.vocab.sub_en)} onBack={onBack} />
        <div className="af-substage">
          <div className="af-result">
            <div className="af-result-cap">{t(lang, "vr.doneCap")}</div>
            <Trophy size={40} className="af-result-trophy" />
            <p className="af-result-blurb">{t(lang, "vr.doneBlurb", { n: queue.length })}</p>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "common.backCatalog")} <ArrowRight size={16} /></button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.vocab.name, MODULE_INFO.vocab.name_en)} sub={pick(lang, MODULE_INFO.vocab.sub, MODULE_INFO.vocab.sub_en)} onBack={onBack}
        right={<span className="af-modbar-count">{pos + 1}/{queue.length}</span>} />
      <div className="af-substage">
        <div className="af-srs">
          <div className="af-srs-lv">{card.lv} · {card.pos}</div>
          <div className="af-srs-word">{card.w}</div>
          {!show ? (
            <button className="af-srs-reveal" onClick={() => setShow(true)}><Eye size={15} /> {t(lang, "vr.reveal")}</button>
          ) : (
            <div className="af-srs-back">
              <div className="af-srs-tr">{card.tr}</div>
              <div className="af-srs-ex">“{card.ex}”</div>
            </div>
          )}
          {show ? (
            <div className="af-srs-grades">
              <button className="af-srs-grade is-again" onClick={() => grade("again")}>{t(lang, "vr.again")}</button>
              <button className="af-srs-grade is-good" onClick={() => grade("good")}>{t(lang, "vr.good")}</button>
              <button className="af-srs-grade is-easy" onClick={() => grade("easy")}>{t(lang, "vr.easy")}</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   WORD LIST  (dictionary-style browse of the full VOCAB pool;
   reads VOCAB live so content.json additions appear too)
============================================================ */
export function WordListRoom({ store, onBack }) {
  const lang = useLang();
  const [lv, setLv] = useState(store.state.level || "A1");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(60);

  const counts = useMemo(() => {
    const c = {};
    for (const id of LV_ORDER) c[id] = 0;
    for (const v of VOCAB) if (c[v.lv] != null) c[v.lv] += 1;
    return c;
  }, []);

  const all = useMemo(
    () => VOCAB.filter((v) => v.lv === lv).sort((a, b) => (a.w || "").localeCompare(b.w || "")),
    [lv]
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((v) =>
      (v.w || "").toLowerCase().includes(q) || (v.tr || "").toLowerCase().includes(q));
  }, [all, query]);

  function selectLv(id) { setLv(id); setLimit(60); setQuery(""); }

  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.wordlist.name, MODULE_INFO.wordlist.name_en)} sub={pick(lang, MODULE_INFO.wordlist.sub, MODULE_INFO.wordlist.sub_en)} onBack={onBack} />
      <div className="af-substage">
        <div className="af-wl-levels">
          {LV_ORDER.map((id) => (
            <button key={id} className={"af-wl-lvbtn " + (id === lv ? "is-on" : "")} onClick={() => selectLv(id)}>
              <span className="af-wl-lvbtn-id">{id}</span>
              <span className="af-wl-lvbtn-n">{counts[id] || 0}</span>
            </button>
          ))}
        </div>
        <input className="af-wl-search" type="text" value={query} spellCheck={false}
          onChange={(e) => { setQuery(e.target.value); setLimit(60); }}
          placeholder={t(lang, "wl.search", { lv })} />

        {filtered.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> {all.length === 0
            ? t(lang, "wl.emptyLevel", { lv })
            : t(lang, "wl.noMatch")}</div>
        ) : (
          <>
            <div className="af-wl-count">{t(lang, "wl.count", { n: filtered.length })}{query ? " " + t(lang, "wl.filtered") : ""}</div>
            <div className="af-wl-list">
              {filtered.slice(0, limit).map((v) => (
                <div key={v.id} className="af-wl-row">
                  <div className="af-wl-top">
                    <span className="af-wl-w">{v.w}</span>
                    {v.pos ? <span className="af-wl-pos">{v.pos}</span> : null}
                    <span className="af-wl-tr">{v.tr}</span>
                  </div>
                  {v.ex ? <div className="af-wl-ex">“{v.ex}”</div> : null}
                </div>
              ))}
            </div>
            {filtered.length > limit ? (
              <button className="af-wl-more" onClick={() => setLimit((n) => n + 60)}>
                {t(lang, "wl.more", { n: filtered.length - limit })}
              </button>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

/* ============================================================
   GRAMMAR
============================================================ */
export function GrammarHub({ level, store, award, onBack }) {
  const lang = useLang();
  const [open, setOpen] = useState(null);
  const lessons = useMemo(() => {
    const f = GRAMMAR.filter((l) => !level || lvIndex(l.lv) <= lvIndex(level));
    return f.length ? f : GRAMMAR;
  }, [level]);
  if (open) return <GrammarLesson lesson={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.grammar.name, MODULE_INFO.grammar.name_en)} sub={level ? t(lang, "gr.subLevel", { lv: level }) : t(lang, "gr.subAll")} onBack={onBack} />
      <div className="af-substage">
        <div className="af-grid">
          {lessons.map((l) => {
            const done = !!store.state.done["grammar:" + l.id];
            return (
              <button key={l.id} className="af-card" onClick={() => setOpen(l)}>
                <div className="af-card-top">
                  <span className="af-card-icon af-ic-grammar"><GraduationCap size={20} /></span>
                  <span className="af-card-tag">{l.lv}</span>
                </div>
                <div className="af-card-name">{l.title}{done ? <Check size={14} className="af-done-badge" /> : null}</div>
                <div className="af-card-desc">{t(lang, "gr.nEx", { n: l.items.length })}</div>
                <div className="af-card-go">{t(lang, "common.open")} <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function GrammarLesson({ lesson, store, award, onBack }) {
  const lang = useLang();
  const [stage, setStage] = useState("read"); // read -> practice -> done
  const [score, setScore] = useState(0);
  return (
    <>
      <ModuleBar title={lesson.title} sub={t(lang, "gr.sub", { lv: lesson.lv })} onBack={onBack} />
      <div className="af-substage">
        {stage === "read" ? (
          <div className="af-lesson">
            <div className="af-lesson-exp">{pick(lang, lesson.exp, lesson.exp_en)}</div>
            <button className="af-q-next" onClick={() => setStage("practice")}>{t(lang, "gr.toPractice")} <ArrowRight size={15} /></button>
          </div>
        ) : stage === "practice" ? (
          <MCQRunner items={lesson.items} award={award} points={15}
            onFinish={(ok) => { setScore(ok); store.markDone("grammar:" + lesson.id); store.touchStreak(); store.bumpDaily("grammar"); setStage("done"); }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">{t(lang, "gr.doneCap")}</div>
            <div className="af-result-lv">{score}/{lesson.items.length}</div>
            <p className="af-result-blurb">{t(lang, "gr.doneBlurb", { t: lesson.title })}</p>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "gr.others")} <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </>
  );
}

/* ============================================================
   LISTENING  (browser TTS)
============================================================ */
function renderScript(script) {
  const parts = script.split(" — ");
  // treat as a dialogue only with real back-and-forth (>=3 turns), so a monologue
  // that merely contains a dash stays a normal transcript
  if (parts.length >= 3) {
    return (
      <div className="af-dialogue">
        {parts.map((t, idx) => (
          <div key={idx} className={"af-dline " + (idx % 2 ? "af-dline-b" : "af-dline-a")}>{t.trim()}</div>
        ))}
      </div>
    );
  }
  return <div className="af-transcript">{script}</div>;
}

export function ListeningRoom({ level, store, award, onBack }) {
  const lang = useLang();
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    const f = LISTENING.filter((l) => !level || lvIndex(l.lv) <= lvIndex(level));
    return f.length ? f : LISTENING;
  }, [level]);
  if (open) return <ListeningItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.listening.name, MODULE_INFO.listening.name_en)} sub={pick(lang, MODULE_INFO.listening.sub, MODULE_INFO.listening.sub_en)} onBack={onBack} />
      <div className="af-substage">
        {!speechSupported() ? <div className="af-empty"><AlertTriangle size={14} /> {t(lang, "li.noTTS")}</div> : null}
        <div className="af-grid">
          {items.map((l) => {
            const done = !!store.state.done["listening:" + l.id];
            return (
              <button key={l.id} className="af-card" onClick={() => setOpen(l)}>
                <div className="af-card-top">
                  <span className="af-card-icon af-ic-listening"><Headphones size={20} /></span>
                  <span className="af-card-tag">{l.lv}</span>
                </div>
                <div className="af-card-name">{l.title}{done ? <Check size={14} className="af-done-badge" /> : null}</div>
                <div className="af-card-desc">{t(lang, "common.nQuestions", { n: l.items.length })} · {l.accent === "en-GB" ? t(lang, "li.accentUK") : t(lang, "li.accentUS")}</div>
                <div className="af-card-go">{t(lang, "common.listen")} <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function ListeningItem({ item, store, award, onBack }) {
  const lang = useLang();
  const [playing, setPlaying] = useState(false);
  const [showT, setShowT] = useState(false);
  const [phase, setPhase] = useState("listen"); // listen -> quiz -> done
  const [score, setScore] = useState(0);
  const [notes, setNotes] = useState("");
  const soundOn = store.state.settings.sound;
  useEffect(() => () => stopSpeak(), []);
  function play() {
    if (!soundOn) { setShowT(true); return; }
    setPlaying(true);
    speak(item.script, { lang: item.accent, rate: store.state.settings.rate, onend: () => setPlaying(false) });
  }
  return (
    <>
      <ModuleBar title={item.title} sub={t(lang, "li.sub", { lv: item.lv })} onBack={onBack} />
      <div className="af-substage">
        {phase !== "done" ? (
          <div className="af-play">
            <div className="af-play-row">
              <button className="af-play-btn" onClick={playing ? () => { stopSpeak(); setPlaying(false); } : play}>
                {playing ? <Pause size={22} /> : <Play size={22} />}
              </button>
              <div className="af-play-info">
                <div className="af-play-title"><Volume2 size={14} /> {playing ? t(lang, "li.playing") : t(lang, "li.play")}</div>
                <div className="af-play-sub">{t(lang, "li.replay")}</div>
              </div>
            </div>
            <button className="af-transcript-toggle" onClick={() => setShowT((v) => !v)}>
              {showT ? <><EyeOff size={13} /> {t(lang, "li.hideT")}</> : <><Eye size={13} /> {t(lang, "li.showT")}</>}
            </button>
            {showT ? renderScript(item.script) : null}
          </div>
        ) : null}

        {phase !== "done" ? (
          <textarea className="af-notes" value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder={t(lang, "li.notes")} />
        ) : null}

        {phase === "listen" ? (
          <button className="af-q-next af-listen-go" onClick={() => setPhase("quiz")}>{t(lang, "common.toQuestions")} <ArrowRight size={15} /></button>
        ) : phase === "quiz" ? (
          <MCQRunner items={item.items} award={award} points={18}
            onFinish={(ok) => { setScore(ok); store.markDone("listening:" + item.id); store.touchStreak(); store.bumpDaily("listening"); setPhase("done"); }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">{t(lang, "li.doneCap")}</div>
            <div className="af-result-lv">{score}/{item.items.length}</div>
            <p className="af-result-blurb">{t(lang, "li.doneBlurb")}</p>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "li.others")} <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </>
  );
}

/* ============================================================
   WRITING  (prompt + rubric + self-check; no AI scoring yet)
============================================================ */
export function WritingStudio({ level, store, award, onBack }) {
  const lang = useLang();
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    const f = WRITING.filter((w) => !level || lvIndex(w.lv) <= lvIndex(level) + 1);
    return f.length ? f : WRITING;
  }, [level]);
  if (open) return <WritingItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.writing.name, MODULE_INFO.writing.name_en)} sub={pick(lang, MODULE_INFO.writing.sub, MODULE_INFO.writing.sub_en)} onBack={onBack} />
      <div className="af-substage">
        <div className="af-grid">
          {items.map((w) => {
            const done = !!store.state.done["writing:" + w.id];
            return (
              <button key={w.id} className="af-card" onClick={() => setOpen(w)}>
                <div className="af-card-top">
                  <span className="af-card-icon af-ic-writing"><PenLine size={20} /></span>
                  <span className="af-card-tag">{w.lv}</span>
                </div>
                <div className="af-card-name">{pick(lang, w.type, w.type_en)}{done ? <Check size={14} className="af-done-badge" /> : null}</div>
                <div className="af-card-desc">{w.exam.join(", ")} · {t(lang, "wr.minWords", { n: w.minWords })}</div>
                <div className="af-card-go">{t(lang, "common.write")} <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function WritingItem({ item, store, award, onBack }) {
  const lang = useLang();
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const enough = words >= item.minWords;
  const [submitted, setSubmitted] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [aiOut, setAiOut] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiErr, setAiErr] = useState(null);
  const apiKey = store.state.settings.apiKey;

  function submit() {
    if (!enough || submitted) return;
    setSubmitted(true);
    store.markDone("writing:" + item.id);
    store.touchStreak();
    store.bumpDaily("writing");
    award(40, true);
  }
  function runAnalysis() { setAnalysis(analyzeWriting(text, item, lang)); }
  async function runAI() {
    if (!apiKey || aiLoading || words < 5) return;
    setAiErr(null); setAiOut(null); setAiLoading(true);
    try {
      const out = await scoreWithAI({ text, item, apiKey, lang });
      setAiOut(out);
    } catch (e) {
      setAiErr(e.message || t(lang, "ti.evalFail"));
    } finally { setAiLoading(false); }
  }

  return (
    <>
      <ModuleBar title={pick(lang, item.type, item.type_en)} sub={t(lang, "wr.sub", { lv: item.lv })} onBack={onBack} />
      <div className="af-substage af-write">
        <div className="af-write-prompt"><span className="af-write-cap">{t(lang, "wr.task")}</span> {item.prompt}</div>
        <div className="af-write-tips"><Lightbulb size={13} /> {item.tips}</div>
        <div className="af-write-struct"><span className="af-write-cap">{t(lang, "wr.skeleton")}</span> {item.structure}</div>
        <textarea className="af-write-area" value={text} onChange={(e) => setText(e.target.value)}
          placeholder={t(lang, "wr.placeholder")} />
        <div className="af-write-meta">
          <span className={enough ? "is-ok" : ""}>{t(lang, "wr.wordCount", { w: words, n: item.minWords })}</span>
          {!submitted ? (
            <button className="af-q-next" disabled={!enough} onClick={submit}>
              {enough ? <>{t(lang, "wr.completed")} <Check size={15} /></> : t(lang, "wr.writeMore")}
            </button>
          ) : <span className="af-write-done"><Check size={15} /> {t(lang, "wr.done")}</span>}
        </div>

        <div className="af-score-row">
          <button className="af-score-btn" disabled={words < 5} onClick={runAnalysis}>
            <Gauge size={15} /> {t(lang, "wr.autoAnalysis")}
          </button>
          {apiKey ? (
            <button className="af-score-btn is-ai" disabled={words < 5 || aiLoading} onClick={runAI}>
              <Sparkles size={15} /> {aiLoading ? t(lang, "common.evaluating") : t(lang, "wr.aiEvaluate")}
            </button>
          ) : null}
        </div>

        {analysis ? (
          <div className="af-analysis">
            <div className="af-analysis-head">
              <span className="af-band">~{analysis.band}</span>
              <span className="af-band-cap">{t(lang, "wr.bandCap")}</span>
            </div>
            <div className="af-analysis-grid">
              <span>{t(lang, "wr.words", { n: analysis.wc })}</span>
              <span>{t(lang, "wr.sentences", { n: analysis.sc })}</span>
              <span>{t(lang, "wr.paras", { n: analysis.pc })}</span>
              <span>{t(lang, "wr.avg", { n: analysis.avgLen })}</span>
              <span>{t(lang, "wr.linkers", { n: analysis.linkersUsed.length })}</span>
            </div>
            <ul className="af-analysis-notes">
              {analysis.notes.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
        ) : null}

        {aiErr ? (
          <div className="af-ai-err"><AlertTriangle size={14} /> {aiErr}
            <div className="af-ai-err-hint">{t(lang, "wr.aiErrHint")}</div>
          </div>
        ) : null}
        {aiOut ? <div className="af-ai-out">{aiOut}</div> : null}

        {!apiKey ? (
          <div className="af-write-note">{t(lang, "wr.note")}</div>
        ) : null}
      </div>
    </>
  );
}


/* ============================================================
   ARTICLES  (simple reading: passage + MCQs)
============================================================ */
export function ArticleRoom({ level, store, award, onBack, exam, field }) {
  const lang = useLang();
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    let f = ARTICLES.filter((a) => !level || lvIndex(a.lv) <= lvIndex(level));
    f = byField(f, exam, field);
    return f.length ? f : ARTICLES;
  }, [level, exam, field]);
  if (open) return <ArticleItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.articles.name, MODULE_INFO.articles.name_en)} sub={pick(lang, MODULE_INFO.articles.sub, MODULE_INFO.articles.sub_en)} onBack={onBack} />
      <div className="af-substage">
        {ARTICLES.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> {t(lang, "ar.empty")}</div>
        ) : null}
        <div className="af-grid">
          {items.map((a) => {
            const done = !!store.state.done["article:" + a.id];
            return (
              <button key={a.id} className="af-card" onClick={() => setOpen(a)}>
                <div className="af-card-top">
                  <span className="af-card-icon af-ic-articles"><BookMarked size={20} /></span>
                  <span className="af-card-tag">{a.lv}</span>
                </div>
                <div className="af-card-name">{a.title}{done ? <Check size={14} className="af-done-badge" /> : null}</div>
                <div className="af-card-desc">{t(lang, "common.nQuestions", { n: a.items.length })}</div>
                <div className="af-card-go">{t(lang, "common.read")} <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function ArticleItem({ item, store, award, onBack }) {
  const lang = useLang();
  const [phase, setPhase] = useState("read"); // read -> quiz -> done
  const [score, setScore] = useState(0);
  const paras = item.body.split(/\n\s*\n/);
  return (
    <>
      <ModuleBar title={item.title} sub={t(lang, "ar.sub", { lv: item.lv })} onBack={onBack} />
      <div className="af-substage">
        {phase === "read" ? (
          <div className="af-article">
            {paras.map((para, idx) => <p key={idx} className="af-article-p">{para}</p>)}
            <button className="af-q-next" onClick={() => setPhase("quiz")}>{t(lang, "common.toQuestions")} <ArrowRight size={15} /></button>
          </div>
        ) : phase === "quiz" ? (
          <MCQRunner items={item.items} award={award} points={16}
            onFinish={(ok) => { setScore(ok); store.markDone("article:" + item.id); store.touchStreak(); setPhase("done"); }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">{t(lang, "ar.doneCap")}</div>
            <div className="af-result-lv">{score}/{item.items.length}</div>
            <p className="af-result-blurb">{t(lang, "ar.doneBlurb")}</p>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "ar.others")} <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </>
  );
}


/* ============================================================
   CLOZE  (gap-fill: academic passage + numbered blanks)
   Same shape as ARTICLES; blanks reuse the shared MCQRunner.
============================================================ */
export function ClozeRoom({ level, store, award, onBack, exam, field }) {
  const lang = useLang();
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    let f = CLOZE.filter((c) => !level || lvIndex(c.lv) <= lvIndex(level));
    f = byField(f, exam, field);
    return f.length ? f : CLOZE;
  }, [level, exam, field]);
  if (open) return <ClozeItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.cloze.name, MODULE_INFO.cloze.name_en)} sub={pick(lang, MODULE_INFO.cloze.sub, MODULE_INFO.cloze.sub_en)} onBack={onBack} />
      <div className="af-substage">
        {CLOZE.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> {t(lang, "cl.empty")}</div>
        ) : null}
        <div className="af-grid">
          {items.map((c) => {
            const done = !!store.state.done["cloze:" + c.id];
            return (
              <button key={c.id} className="af-card" onClick={() => setOpen(c)}>
                <div className="af-card-top">
                  <span className="af-card-icon af-ic-cloze"><FileText size={20} /></span>
                  <span className="af-card-tag">{c.lv}</span>
                </div>
                <div className="af-card-name">{c.title}{done ? <Check size={14} className="af-done-badge" /> : null}</div>
                <div className="af-card-desc">{t(lang, "cl.nBlanks", { n: c.blanks.length })}</div>
                <div className="af-card-go">{t(lang, "common.start")} <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function ClozeItem({ item, store, award, onBack }) {
  const lang = useLang();
  const [phase, setPhase] = useState("read"); // read -> quiz -> done
  const [score, setScore] = useState(0);
  const paras = item.text.split(/\n\s*\n/);
  const quizItems = useMemo(
    () => item.blanks.map((b) => ({
      q: t(lang, "cl.q", { n: b.n }),
      opts: b.opts, ans: b.ans, tr: b.tr, en: b.en,
    })),
    [item, lang]
  );
  const passage = (
    <div className="af-cloze-ref">
      {paras.map((para, idx) => <p key={idx} className="af-cloze-p">{para}</p>)}
    </div>
  );
  return (
    <>
      <ModuleBar title={item.title} sub={t(lang, "cl.sub", { lv: item.lv })} onBack={onBack} />
      <div className="af-substage">
        {phase === "read" ? (
          <div className="af-cloze">
            <p className="af-cloze-hint">{t(lang, "cl.hint")}</p>
            {passage}
            <button className="af-q-next" onClick={() => setPhase("quiz")}>{t(lang, "cl.toBlanks")} <ArrowRight size={15} /></button>
          </div>
        ) : phase === "quiz" ? (
          <MCQRunner items={quizItems} award={award} points={16}
            footer={passage}
            onFinish={(ok) => { setScore(ok); store.markDone("cloze:" + item.id); store.touchStreak(); setPhase("done"); }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">{t(lang, "cl.doneCap")}</div>
            <div className="af-result-lv">{score}/{item.blanks.length}</div>
            <p className="af-result-blurb">{t(lang, "cl.doneBlurb")}</p>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "ar.others")} <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </>
  );
}


/* ============================================================
   RESTATE  (closest-in-meaning sentence — YDS restatement)
   A deck of stem sentences; reuses the shared MCQRunner.
============================================================ */
export function RestateRoom({ level, store, award, onBack, exam, field }) {
  const lang = useLang();
  const items = useMemo(() => {
    let f = RESTATE.filter((r) => !level || lvIndex(r.lv) <= lvIndex(level));
    f = byField(f, exam, field);
    return f.length ? f : RESTATE;
  }, [level, exam, field]);
  const quizItems = useMemo(
    () => items.map((r) => ({ q: r.stem, opts: r.opts, ans: r.ans, tr: r.tr, en: r.en })),
    [items]
  );
  const [phase, setPhase] = useState("quiz"); // quiz -> done
  const [score, setScore] = useState(0);
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.restate.name, MODULE_INFO.restate.name_en)} sub={pick(lang, MODULE_INFO.restate.sub, MODULE_INFO.restate.sub_en)} onBack={onBack} />
      <div className="af-substage">
        {RESTATE.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> {t(lang, "rs.empty")}</div>
        ) : phase === "quiz" ? (
          <MCQRunner items={quizItems} award={award} points={16}
            footer={<div className="af-restate-hint"><Replace size={13} /> {t(lang, "rs.hint")}</div>}
            onFinish={(ok) => {
              setScore(ok);
              items.forEach((r) => store.markDone("restate:" + r.id));
              store.touchStreak();
              setPhase("done");
            }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">{t(lang, "rs.doneCap")}</div>
            <div className="af-result-lv">{score}/{items.length}</div>
            <p className="af-result-blurb">{t(lang, "rs.doneBlurb")}</p>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "common.backCatalog")} <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </>
  );
}


/* ============================================================
   ODDOUT  (irrelevant / flow-breaking sentence — YDS)
   Numbered paragraph (I, II, III…); pick the off-topic sentence.
   Options = sentence numbers; reuses the shared MCQRunner.
============================================================ */
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
export function OddoutRoom({ level, store, award, onBack, exam, field }) {
  const lang = useLang();
  const items = useMemo(() => {
    let f = ODDOUT.filter((o) => !level || lvIndex(o.lv) <= lvIndex(level));
    f = byField(f, exam, field);
    return f.length ? f : ODDOUT;
  }, [level, exam, field]);
  const quizItems = useMemo(
    () => items.map((o) => ({
      q: (
        <div className="af-oddout">
          {o.sentences.map((s, i) => (
            <p key={i} className="af-oddout-s"><span className="af-oddout-n">{ROMAN[i]}</span>{s}</p>
          ))}
        </div>
      ),
      opts: o.sentences.map((_, i) => t(lang, "oo.sentence", { r: ROMAN[i] })),
      ans: o.ans,
      tr: o.tr, en: o.en,
    })),
    [items, lang]
  );
  const [phase, setPhase] = useState("quiz"); // quiz -> done
  const [score, setScore] = useState(0);
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.oddout.name, MODULE_INFO.oddout.name_en)} sub={pick(lang, MODULE_INFO.oddout.sub, MODULE_INFO.oddout.sub_en)} onBack={onBack} />
      <div className="af-substage">
        {ODDOUT.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> {t(lang, "oo.empty")}</div>
        ) : phase === "quiz" ? (
          <MCQRunner items={quizItems} award={award} points={16}
            footer={<div className="af-restate-hint"><Filter size={13} /> {t(lang, "oo.hint")}</div>}
            onFinish={(ok) => {
              setScore(ok);
              items.forEach((o) => store.markDone("oddout:" + o.id));
              store.touchStreak();
              setPhase("done");
            }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">{t(lang, "oo.doneCap")}</div>
            <div className="af-result-lv">{score}/{items.length}</div>
            <p className="af-result-blurb">{t(lang, "oo.doneBlurb")}</p>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "common.backCatalog")} <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </>
  );
}


/* shared : small deck runner for YDS-style single-question modules
   (each item = one MCQ). Mirrors RestateRoom/OddoutRoom exactly. */
function DeckRoom({ title, sub, empty, quizItems, items, prefix, store, award, onBack, hint, doneCap }) {
  const lang = useLang();
  const [phase, setPhase] = useState("quiz"); // quiz -> done
  const [score, setScore] = useState(0);
  return (
    <>
      <ModuleBar title={title} sub={sub} onBack={onBack} />
      <div className="af-substage">
        {items.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> {empty}</div>
        ) : phase === "quiz" ? (
          <MCQRunner items={quizItems} award={award} points={16}
            footer={hint}
            onFinish={(ok) => {
              setScore(ok);
              items.forEach((it) => store.markDone(prefix + ":" + it.id));
              store.touchStreak();
              setPhase("done");
            }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">{doneCap}</div>
            <div className="af-result-lv">{score}/{items.length}</div>
            <p className="af-result-blurb">{t(lang, "deck.doneBlurb")}</p>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "common.backCatalog")} <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </>
  );
}

/* ============================================================
   DIALOGUE  (two-person dialogue completion — YDS)
============================================================ */
export function DialogueRoom({ level, store, award, onBack, exam, field }) {
  const lang = useLang();
  const items = useMemo(() => {
    let f = DIALOGUE.filter((d) => !level || lvIndex(d.lv) <= lvIndex(level));
    f = byField(f, exam, field);
    return f.length ? f : DIALOGUE;
  }, [level, exam, field]);
  const quizItems = useMemo(
    () => items.map((d) => ({
      q: (
        <div className="af-dialogue">
          {d.lines.map((ln, i) => (
            <p key={i} className={"af-dlg-line" + (i === d.blankIndex ? " is-blank" : "")}>
              <span className="af-dlg-sp">{ln.sp}:</span>
              <span className="af-dlg-t">{i === d.blankIndex ? "____" : ln.t}</span>
            </p>
          ))}
        </div>
      ),
      opts: d.opts, ans: d.ans, tr: d.tr, en: d.en,
    })),
    [items]
  );
  return <DeckRoom title={pick(lang, MODULE_INFO.dialogue.name, MODULE_INFO.dialogue.name_en)} sub={pick(lang, MODULE_INFO.dialogue.sub, MODULE_INFO.dialogue.sub_en)}
    empty={t(lang, "dl.empty")}
    quizItems={quizItems} items={items} prefix="dialogue" doneCap={t(lang, "dl.doneCap")}
    store={store} onBack={onBack} award={award}
    hint={<div className="af-restate-hint"><MessageSquare size={13} /> {t(lang, "dl.hint")}</div>} />;
}

/* ============================================================
   PARACOMP  (paragraph completion — YDS)
============================================================ */
export function ParacompRoom({ level, store, award, onBack, exam, field }) {
  const lang = useLang();
  const items = useMemo(() => {
    let f = PARACOMP.filter((p) => !level || lvIndex(p.lv) <= lvIndex(level));
    f = byField(f, exam, field);
    return f.length ? f : PARACOMP;
  }, [level, exam, field]);
  const quizItems = useMemo(
    () => items.map((p) => {
      const parts = p.text.split("----");
      return {
        q: (
          <p className="af-paracomp-p">
            {parts.flatMap((seg, i) =>
              i === 0
                ? [<span key={"s" + i}>{seg}</span>]
                : [<span key={"g" + i} className="af-paracomp-gap"> ____ </span>, <span key={"s" + i}>{seg}</span>]
            )}
          </p>
        ),
        opts: p.opts, ans: p.ans, tr: p.tr, en: p.en,
      };
    }),
    [items]
  );
  return <DeckRoom title={pick(lang, MODULE_INFO.paracomp.name, MODULE_INFO.paracomp.name_en)} sub={pick(lang, MODULE_INFO.paracomp.sub, MODULE_INFO.paracomp.sub_en)}
    empty={t(lang, "pcm.empty")}
    quizItems={quizItems} items={items} prefix="paracomp" doneCap={t(lang, "pcm.doneCap")}
    store={store} onBack={onBack} award={award}
    hint={<div className="af-restate-hint"><AlignLeft size={13} /> {t(lang, "pcm.hint")}</div>} />;
}

/* ============================================================
   TRANSLATE  (best translation — YDS)
============================================================ */
export function TranslateRoom({ level, store, award, onBack, exam, field }) {
  const lang = useLang();
  const items = useMemo(() => {
    let f = TRANSLATE.filter((x) => !level || lvIndex(x.lv) <= lvIndex(level));
    f = byField(f, exam, field);
    return f.length ? f : TRANSLATE;
  }, [level, exam, field]);
  const quizItems = useMemo(
    () => items.map((x) => ({
      q: (
        <div className="af-translate">
          <div className="af-tr-dir">{x.dir === "tr2en" ? t(lang, "tl.tr2en") : t(lang, "tl.en2tr")}</div>
          <div className="af-tr-source">{x.source}</div>
        </div>
      ),
      opts: x.opts, ans: x.ans, tr: x.tr, en: x.en,
    })),
    [items, lang]
  );
  return <DeckRoom title={pick(lang, MODULE_INFO.translate.name, MODULE_INFO.translate.name_en)} sub={pick(lang, MODULE_INFO.translate.sub, MODULE_INFO.translate.sub_en)}
    empty={t(lang, "tl.empty")}
    quizItems={quizItems} items={items} prefix="translate" doneCap={t(lang, "tl.doneCap")}
    store={store} onBack={onBack} award={award}
    hint={<div className="af-restate-hint"><LanguagesIcon size={13} /> {t(lang, "tl.hint")}</div>} />;
}


/* ============================================================
   TOEFL INTEGRATED  (multi-stage simulator)
   read (3:00) -> listen (lecture TTS) -> respond (write/speak)
   -> AI 0-30 score (reuses speak / scoreWithAI / analyzeWriting).
============================================================ */
// soft per-phase countdown: counts down to 0 and stops; never blocks.
function useTimer(totalSec, running) {
  const [left, setLeft] = useState(totalSec);
  useEffect(() => { setLeft(totalSec); }, [totalSec, running]);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft((l) => (l > 0 ? l - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [running]);
  return left;
}
const mmss = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
function extractScore(txt, scale = 30) {
  if (!txt) return null;
  let m = txt.match(new RegExp("(\\d{1,2})\\s*/\\s*" + scale));
  if (m) return Math.min(scale, parseInt(m[1], 10));
  m = txt.match(/puan[^0-9]{0,12}(\d{1,2})/i);
  if (m) return Math.min(scale, parseInt(m[1], 10));
  return null;
}

export function ToeflIntegratedRoom({ level, store, award, onBack }) {
  const lang = useLang();
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    const f = TOEFL_INTEGRATED.filter((x) => !level || lvIndex(x.lv) <= lvIndex(level));
    return f.length ? f : TOEFL_INTEGRATED;
  }, [level]);
  if (open) return <ToeflIntegratedItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.toeflint.name, MODULE_INFO.toeflint.name_en)} sub={pick(lang, MODULE_INFO.toeflint.sub, MODULE_INFO.toeflint.sub_en)} onBack={onBack} />
      <div className="af-substage">
        {TOEFL_INTEGRATED.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> {t(lang, "ti.empty")}</div>
        ) : null}
        <div className="af-grid">
          {items.map((x) => {
            const done = !!store.state.done["toeflint:" + x.id];
            return (
              <button key={x.id} className="af-card" onClick={() => setOpen(x)}>
                <div className="af-card-top">
                  <span className="af-card-icon af-ic-toeflint"><Layers size={20} /></span>
                  <span className="af-card-tag">{x.lv}</span>
                </div>
                <div className="af-card-name">{x.reading.title}{done ? <Check size={14} className="af-done-badge" /> : null}</div>
                <div className="af-card-desc">{x.type === "speaking" ? t(lang, "ti.speaking") : t(lang, "ti.writing")} · {x.topic}</div>
                <div className="af-card-go">{t(lang, "common.start")} <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ToeflIntegratedItem({ item, store, award, onBack }) {
  const lang = useLang();
  const isSpeaking = item.type === "speaking";
  const [phase, setPhase] = useState("read");      // read -> listen -> respond -> done
  const [spk, setSpk] = useState("idle");          // speaking sub-stage: idle -> prep -> speak -> transcript
  const [playing, setPlaying] = useState(false);
  const [showLec, setShowLec] = useState(false);   // fallback reveal of lecture text
  const [notes, setNotes] = useState("");
  const [text, setText] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [err, setErr] = useState(null);
  const [result, setResult] = useState(null);
  const soundOn = store.state.settings.sound;
  const apiKey = store.state.settings.apiKey;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  useEffect(() => () => stopSpeak(), []);

  // soft countdowns per stage
  const readLeft = useTimer(180, phase === "read");
  const writeLeft = useTimer(20 * 60, phase === "respond" && !isSpeaking);
  const prepLeft = useTimer(item.prep || 20, phase === "respond" && isSpeaking && spk === "prep");
  const speakLeft = useTimer(item.respond || 60, phase === "respond" && isSpeaking && spk === "speak");

  // auto-advance on zero (soft): reading rolls into listening; prep -> speak -> transcript
  useEffect(() => { if (phase === "read" && readLeft === 0) { stopSpeak(); setPhase("listen"); } }, [phase, readLeft]);
  useEffect(() => { if (phase === "respond" && isSpeaking && spk === "prep" && prepLeft === 0) setSpk("speak"); }, [phase, isSpeaking, spk, prepLeft]);
  useEffect(() => { if (phase === "respond" && isSpeaking && spk === "speak" && speakLeft === 0) setSpk("transcript"); }, [phase, isSpeaking, spk, speakLeft]);

  function playLecture() {
    if (playing) { stopSpeak(); setPlaying(false); return; }
    if (!speechSupported() || !soundOn) { setShowLec(true); return; }
    setPlaying(true);
    speak(item.lecture.body, { rate: store.state.settings.rate, onend: () => setPlaying(false) });
  }
  function goRespond() { stopSpeak(); setPlaying(false); setPhase("respond"); }

  async function evaluate() {
    if (evaluating) return;
    const answer = text.trim();
    if (answer.split(/\s+/).filter(Boolean).length < 5) { setErr(t(lang, "ti.needMore")); return; }
    setEvaluating(true); setErr(null);
    const aiItem = {
      type: isSpeaking ? "TOEFL Integrated Speaking" : "TOEFL Integrated Writing",
      exam: ["TOEFL"],
      prompt:
        item.prompt +
        "\n\n[READING PASSAGE]\n" + item.reading.body +
        "\n\n[LECTURE TRANSCRIPT]\n" + item.lecture.body +
        "\n\n[Dersin okuma pasajına karşı çıktığı noktalar]\n- " + item.keyPoints.join("\n- ") +
        (lang === "en"
          ? "\n\nEvaluation: does the response cover the lecture's three points; does it correctly relate them to the relevant claims in the reading; how are organisation and language? Write a score in the form 'Puan: X/30' at the VERY START of your reply, then give 2–3 lines of feedback in ENGLISH."
          : "\n\nDeğerlendirme: yanıt dersin üç noktasını kapsıyor mu; bunları okuma pasajındaki ilgili iddialarla doğru biçimde ilişkilendiriyor mu; organizasyon ve dil nasıl? Yanıtının EN BAŞINA 'Puan: X/30' biçiminde bir puan yaz, ardından 2–3 satır Türkçe geri bildirim ver."),
    };
    try {
      let raw, score, offline = false;
      if (apiKey) {
        raw = await scoreWithAI({ text: answer, item: aiItem, apiKey, lang });
        score = extractScore(raw);
      } else {
        offline = true;
        const a = analyzeWriting(answer, { minWords: item.minWords || 150 }, lang);
        score = Math.max(0, Math.min(30, Math.round((parseFloat(a.band) / 8) * 30)));
        raw = t(lang, "ti.offlineFeedback") + "\n• " + a.notes.join("\n• ") +
          "\n\n" + t(lang, "ti.addKey");
      }
      setResult({ score, raw, offline });
      store.markDone("toeflint:" + item.id);
      store.touchStreak();
      award(score && score > 0 ? Math.round(score) : 12, true);
      setPhase("done");
    } catch (e) {
      setErr(e.message || t(lang, "ti.evalFail"));
    } finally { setEvaluating(false); }
  }

  const readingParas = item.reading.body.split(/\n\s*\n/);
  const lectureParas = item.lecture.body.split(/\n\s*\n/);
  const stageSub = phase === "read" ? t(lang, "ti.stage1") : phase === "listen" ? t(lang, "ti.stage2") : phase === "respond" ? t(lang, "ti.stage3") : t(lang, "ti.stageDone");

  return (
    <>
      <ModuleBar title={item.reading.title} sub={"TOEFL Integrated · " + stageSub} onBack={onBack} />
      <div className="af-substage af-ti">

        {phase === "read" ? (
          <>
            <div className="af-ti-bar">
              <span className="af-ti-step"><BookOpen size={14} /> {t(lang, "ti.readStep")}</span>
              <span className={"af-ti-clock" + (readLeft === 0 ? " is-up" : "")}><Timer size={14} /> {mmss(readLeft)}</span>
            </div>
            <div className="af-article">
              {readingParas.map((p, i) => <p key={i} className="af-article-p">{p}</p>)}
            </div>
            <button className="af-q-next" onClick={() => { stopSpeak(); setPhase("listen"); }}>
              {t(lang, "ti.toListening")} <ArrowRight size={15} />
            </button>
          </>
        ) : phase === "listen" ? (
          <>
            <div className="af-ti-bar">
              <span className="af-ti-step"><Headphones size={14} /> {t(lang, "ti.listenStep")}</span>
            </div>
            <div className="af-ti-note"><Lightbulb size={13} /> {t(lang, "ti.hiddenNote")}</div>
            <div className="af-play">
              <div className="af-play-row">
                <button className="af-play-btn" onClick={playLecture}>{playing ? <Pause size={22} /> : <Play size={22} />}</button>
                <div className="af-play-info">
                  <div className="af-play-title"><Volume2 size={14} /> {playing ? t(lang, "li.playing") : t(lang, "ti.play")}</div>
                  <div className="af-play-sub">{t(lang, "li.replay")}</div>
                </div>
              </div>
              {(!soundOn || !speechSupported()) ? (
                <button className="af-transcript-toggle" onClick={() => setShowLec((v) => !v)}>
                  {showLec ? <><EyeOff size={13} /> {t(lang, "ti.lecHide")}</> : <><Eye size={13} /> {t(lang, "ti.lecShow")}</>}
                </button>
              ) : null}
              {showLec ? <div className="af-ti-lecture">{lectureParas.map((p, i) => <p key={i} className="af-article-p">{p}</p>)}</div> : null}
            </div>
            <textarea className="af-notes" value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder={t(lang, "ti.notesPh")} />
            <button className="af-q-next af-listen-go" onClick={goRespond}>{t(lang, "ti.toResponse")} <ArrowRight size={15} /></button>
          </>
        ) : phase === "respond" ? (
          <>
            <div className="af-ti-bar">
              <span className="af-ti-step"><PenLine size={14} /> {t(lang, "ti.respStep")}</span>
              {!isSpeaking ? <span className={"af-ti-clock" + (writeLeft === 0 ? " is-up" : "")}><Timer size={14} /> {mmss(writeLeft)}</span> : null}
            </div>
            <div className="af-write-prompt"><span className="af-write-cap">{t(lang, "wr.task")}</span> {item.prompt}</div>

            {!isSpeaking ? (
              <>
                <div className="af-ti-readback">
                  <div className="af-ti-readback-cap"><BookOpen size={13} /> {t(lang, "ti.readback")}</div>
                  {readingParas.map((p, i) => <p key={i} className="af-ti-readback-p">{p}</p>)}
                </div>
                {writeLeft === 0 ? <div className="af-ti-note"><Timer size={13} /> {t(lang, "ti.timeUp")}</div> : null}
                <textarea className="af-write-area" value={text} onChange={(e) => setText(e.target.value)}
                  placeholder={t(lang, "ti.writePh")} />
                <div className="af-write-meta">
                  <span className={words >= (item.minWords || 150) ? "is-ok" : ""}>{t(lang, "wr.wordCount", { w: words, n: item.minWords || 150 })}</span>
                </div>
              </>
            ) : (
              <>
                {spk === "idle" ? (
                  <div className="af-ti-speak">
                    <p className="af-ti-note"><Mic size={13} /> {t(lang, "ti.speakIntro", { p: item.prep || 20, r: item.respond || 60 })}</p>
                    <button className="af-q-next" onClick={() => setSpk("prep")}>{t(lang, "ti.startPrep")} <ArrowRight size={15} /></button>
                  </div>
                ) : spk === "prep" ? (
                  <div className="af-ti-speak is-prep">
                    <div className="af-ti-bigclock"><Timer size={18} /> {t(lang, "ti.prepLabel", { t: mmss(prepLeft) })}</div>
                    <p className="af-ti-note">{t(lang, "ti.prepNote")}</p>
                    <button className="af-transcript-toggle" onClick={() => setSpk("speak")}>{t(lang, "ti.toSpeakNow")}</button>
                  </div>
                ) : spk === "speak" ? (
                  <div className="af-ti-speak is-live">
                    <div className="af-ti-bigclock is-live"><Mic size={18} /> {t(lang, "ti.speakNow", { t: mmss(speakLeft) })}</div>
                    <p className="af-ti-note">{t(lang, "ti.speakNote")}</p>
                    <button className="af-transcript-toggle" onClick={() => setSpk("transcript")}>{t(lang, "ti.endSpeak")}</button>
                  </div>
                ) : (
                  <>
                    <p className="af-ti-note"><PenLine size={13} /> {t(lang, "ti.transcriptNote")}</p>
                    <textarea className="af-write-area" value={text} onChange={(e) => setText(e.target.value)}
                      placeholder={t(lang, "ti.transcriptPh")} />
                    <div className="af-write-meta"><span className={words >= 40 ? "is-ok" : ""}>{t(lang, "common.words", { n: words })}</span></div>
                  </>
                )}
              </>
            )}

            {(!isSpeaking || spk === "transcript") ? (
              <div className="af-score-row">
                <button className="af-score-btn is-ai" disabled={evaluating || words < 5} onClick={evaluate}>
                  <Sparkles size={15} /> {evaluating ? t(lang, "common.evaluating") : t(lang, "common.evaluate")}
                </button>
                <span className="af-ti-aimode">{apiKey ? t(lang, "common.aiMode") : t(lang, "common.offlineMode")}</span>
              </div>
            ) : null}
            {err ? <div className="af-ai-err"><AlertTriangle size={14} /> {err}</div> : null}
          </>
        ) : (
          <div className="af-result">
            <div className="af-result-cap">{(isSpeaking ? t(lang, "ti.speaking") : t(lang, "ti.writing")).toUpperCase()} · TOEFL INTEGRATED</div>
            <div className="af-result-lv">{result && result.score != null ? result.score + "/30" : "—"}</div>
            {result && result.offline ? <div className="af-band-cap">{t(lang, "ti.offlineCap")}</div> : <div className="af-band-cap">{t(lang, "ti.aiCap")}</div>}
            <div className="af-ai-out af-ti-feedback">{result ? result.raw : ""}</div>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "ti.others")} <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </>
  );
}


/* ============================================================
   MOCK EXAM  (full-screen, timed, mixed MCQ — no live feedback)
   Pulls from the existing MCQ pools; reuses af-mcq rendering.
============================================================ */
const lvOk = (lv, level) => !level || lvIndex(lv) <= lvIndex(level);
function buildMockPool(level, lang) {
  const pool = [];
  CLOZE.filter((c) => lvOk(c.lv, level)).forEach((c) => {
    c.blanks.forEach((b) => pool.push({
      type: "Boşluk Doldurma", opts: b.opts, ans: b.ans, tr: b.tr, en: b.en,
      q: (<div className="af-mock-q"><p className="af-mock-passage">{c.text}</p><p className="af-mock-ask">{t(lang, "cl.q", { n: b.n })}</p></div>),
    }));
  });
  RESTATE.filter((r) => lvOk(r.lv, level)).forEach((r) =>
    pool.push({ type: "Anlamca En Yakın Cümle", q: r.stem, opts: r.opts, ans: r.ans, tr: r.tr, en: r.en }));
  ODDOUT.filter((o) => lvOk(o.lv, level)).forEach((o) =>
    pool.push({
      type: "Akışı Bozan Cümle", opts: o.sentences.map((_, i) => t(lang, "oo.sentence", { r: ROMAN[i] })), ans: o.ans, tr: o.tr, en: o.en,
      q: (<div className="af-oddout">{o.sentences.map((s, i) => <p key={i} className="af-oddout-s"><span className="af-oddout-n">{ROMAN[i]}</span>{s}</p>)}</div>),
    }));
  DIALOGUE.filter((d) => lvOk(d.lv, level)).forEach((d) =>
    pool.push({
      type: "Diyalog Tamamlama", opts: d.opts, ans: d.ans, tr: d.tr, en: d.en,
      q: (<div className="af-dialogue">{d.lines.map((ln, i) => <p key={i} className={"af-dlg-line" + (i === d.blankIndex ? " is-blank" : "")}><span className="af-dlg-sp">{ln.sp}:</span><span className="af-dlg-t">{i === d.blankIndex ? "____" : ln.t}</span></p>)}</div>),
    }));
  PARACOMP.filter((p) => lvOk(p.lv, level)).forEach((p) => {
    const parts = p.text.split("----");
    pool.push({
      type: "Paragraf Tamamlama", opts: p.opts, ans: p.ans, tr: p.tr, en: p.en,
      q: (<p className="af-paracomp-p">{parts.flatMap((seg, i) => i === 0 ? [<span key={"s" + i}>{seg}</span>] : [<span key={"g" + i} className="af-paracomp-gap"> ____ </span>, <span key={"s" + i}>{seg}</span>])}</p>),
    });
  });
  TRANSLATE.filter((x) => lvOk(x.lv, level)).forEach((x) =>
    pool.push({
      type: "Çeviri", opts: x.opts, ans: x.ans, tr: x.tr, en: x.en,
      q: (<div className="af-translate"><div className="af-tr-dir">{x.dir === "tr2en" ? t(lang, "tl.tr2en") : t(lang, "tl.en2tr")}</div><div className="af-tr-source">{x.source}</div></div>),
    }));
  GRAMMAR.filter((g) => lvOk(g.lv, level)).forEach((g) =>
    g.items.forEach((it) => pool.push({ type: "Gramer", q: it.q, opts: it.opts, ans: it.ans, tr: it.tr, en: it.en })));
  return pool;
}

export function MockRoom({ level, store, onBack }) {
  const lang = useLang();
  const [stage, setStage] = useState("setup");   // setup -> run -> done
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [i, setI] = useState(0);
  const [totalSec, setTotalSec] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const startedRef = useRef(0);
  const answersRef = useRef(answers); answersRef.current = answers;
  const finishedRef = useRef(false);
  const sessionId = useRef("m_" + Date.now());
  const left = useTimer(totalSec, stage === "run");

  const poolSize = useMemo(() => buildMockPool(level, lang).length, [level, lang]);
  const options = [10, 20, 30].filter((n) => n <= poolSize);
  if (!options.length && poolSize > 0) options.push(poolSize);

  function tryFullscreen(on) {
    try {
      if (on) { const el = document.documentElement; el.requestFullscreen && el.requestFullscreen(); }
      else if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    } catch (e) { /* not supported — in-app full-screen container is enough */ }
  }

  function start(n) {
    const pool = shuffle(buildMockPool(level, lang)).slice(0, n);
    if (!pool.length) return;
    finishedRef.current = false;
    setQuestions(pool);
    setAnswers(new Array(pool.length).fill(null));
    setI(0);
    setTotalSec(pool.length * 75);
    startedRef.current = Date.now();
    tryFullscreen(true);
    setStage("run");
  }

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const ans = answersRef.current;
    questions.forEach((q, idx) => {
      const isC = ans[idx] === q.ans;
      store.recordStat(q.type, isC);   // count once into Gelişim Raporu
      store.award(8, isC, 0);          // grant XP via persistence layer (no combo flash)
    });
    store.touchStreak();
    store.markDone("mock:" + sessionId.current);
    setElapsed(Math.round((Date.now() - startedRef.current) / 1000));
    tryFullscreen(false);
    setStage("done");
  }
  // soft auto-finish when the clock runs out (wall-clock guard avoids the
  // stale left===0 on the setup->run transition render)
  useEffect(() => {
    if (stage === "run" && totalSec > 0 && left === 0 &&
        Date.now() - startedRef.current >= (totalSec - 1) * 1000) finish();
  }, [stage, left, totalSec]);
  useEffect(() => () => tryFullscreen(false), []);

  function choose(idx) {
    setAnswers((a) => { const n = a.slice(); n[i] = idx; return n; });
  }
  function next() { if (i + 1 < questions.length) setI(i + 1); else finish(); }
  function quit() { tryFullscreen(false); onBack(); }

  if (stage === "setup") {
    return (
      <div className="af-mock af-mock-setup">
        <div className="af-mock-card">
          <div className="af-mock-cap"><ClipboardList size={16} /> {t(lang, "mk.cap")}</div>
          <h2 className="af-mock-title">{t(lang, "mk.title")}</h2>
          <p className="af-mock-lede">{t(lang, "mk.lede", { lv: level })}</p>
          <div className="af-mock-pick">
            <span className="af-mock-pick-cap">{t(lang, "mk.pickCap")}</span>
            <div className="af-mock-pickrow">
              {options.length ? options.map((n) => (
                <button key={n} className="af-mock-pickbtn" onClick={() => start(n)}>
                  {t(lang, "mk.pickBtn", { n, m: Math.round(n * 75 / 60) })}
                </button>
              )) : <span className="af-empty"><AlertTriangle size={14} /> {t(lang, "mk.noPool")}</span>}
            </div>
          </div>
          <button className="af-mock-exit" onClick={onBack}>{t(lang, "common.cancel")}</button>
        </div>
      </div>
    );
  }

  if (stage === "run") {
    const q = questions[i];
    const sel = answers[i];
    const last = i + 1 >= questions.length;
    return (
      <div className="af-mock af-mock-run">
        <div className="af-mock-topbar">
          <span className="af-mock-prog">{i + 1} / {questions.length}</span>
          <span className="af-mock-bar"><i style={{ width: ((i) / questions.length) * 100 + "%" }} /></span>
          <span className={"af-mock-clock" + (left <= 30 ? " is-low" : "")}><Timer size={14} /> {mmss(left)}</span>
          <button className="af-mock-quit" onClick={quit} title="çıkış"><X size={16} /></button>
        </div>
        <div className="af-mock-stage">
          <div className="af-mock-type">{qtypeLabel(lang, q.type)}</div>
          <div className="af-q-text">{q.q}</div>
          <div className="af-mcq-opts">
            {q.opts.map((o, idx) => (
              <button key={idx} className={"af-mcq-opt" + (idx === sel ? " is-sel" : "")} onClick={() => choose(idx)}>
                <span className="af-mcq-key">{String.fromCharCode(65 + idx)}</span><span>{o}</span>
              </button>
            ))}
          </div>
          <button className="af-q-next af-mock-next" disabled={sel == null} onClick={next}>
            {last ? <>{t(lang, "common.finish")} <Check size={15} /></> : <>{t(lang, "common.next")} <ArrowRight size={15} /></>}
          </button>
          {left === 0 ? <div className="af-ti-note"><Timer size={13} /> {t(lang, "mk.timeUp")}</div> : null}
        </div>
      </div>
    );
  }

  // done
  const correct = questions.reduce((acc, q, idx) => acc + (answers[idx] === q.ans ? 1 : 0), 0);
  const pct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
  const breakdown = {};
  questions.forEach((q, idx) => {
    const b = breakdown[q.type] || { c: 0, t: 0 };
    b.t += 1; if (answers[idx] === q.ans) b.c += 1;
    breakdown[q.type] = b;
  });
  return (
    <div className="af-mock af-mock-done">
      <div className="af-result">
        <div className="af-result-cap">{t(lang, "mk.doneCap")}</div>
        <div className="af-result-lv">{correct}/{questions.length}</div>
        <div className="af-band-cap">{t(lang, "mk.summary", { p: pct, e: mmss(elapsed), t: mmss(totalSec) })}</div>
      </div>
      <div className="af-mock-breakdown">
        <div className="af-mock-bd-cap">{t(lang, "mk.byType")}</div>
        {Object.entries(breakdown).map(([ty, b]) => (
          <div key={ty} className="af-mock-bd-row">
            <span className="af-mock-bd-type">{qtypeLabel(lang, ty)}</span>
            <span className="af-mock-bd-score">{b.c}/{b.t}</span>
            <span className="af-task-bar"><i style={{ width: (b.t ? (b.c / b.t) * 100 : 0) + "%" }} /></span>
          </div>
        ))}
      </div>
      <div className="af-mock-review">
        <div className="af-mock-bd-cap">{t(lang, "mk.review")}</div>
        {questions.map((q, idx) => {
          const ok = answers[idx] === q.ans;
          return (
            <div key={idx} className={"af-mock-rev " + (ok ? "is-ok" : "is-no")}>
              <div className="af-mock-rev-head">
                <span className="af-mock-rev-n">{idx + 1}</span>
                <span className="af-mock-rev-type">{qtypeLabel(lang, q.type)}</span>
                {ok ? <Check size={14} className="af-mock-rev-ic is-ok" /> : <X size={14} className="af-mock-rev-ic is-no" />}
              </div>
              <div className="af-mock-rev-ans"><b>{t(lang, "mk.correctLabel")}</b> {q.opts[q.ans]}</div>
              {!ok && answers[idx] != null ? <div className="af-mock-rev-yours">{t(lang, "mk.yours", { a: q.opts[answers[idx]] })}</div> : null}
              {answers[idx] == null ? <div className="af-mock-rev-yours">{t(lang, "mk.blank")}</div> : null}
              {exTr(lang, q) ? <div className="af-q-exp"><Lightbulb size={13} /> {exTr(lang, q)}</div> : null}
            </div>
          );
        })}
      </div>
      <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "common.backCatalog")} <ArrowRight size={16} /></button>
    </div>
  );
}

/* ============================================================
   PARAPHRASE  (rewrite with a required structural transform)
   AI-scored (scoreWithAI) / offline (analyzeWriting). 0–10.
============================================================ */
export function ParaphraseRoom({ level, store, award, onBack }) {
  const lang = useLang();
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    const f = PARAPHRASE.filter((p) => !level || lvIndex(p.lv) <= lvIndex(level));
    return f.length ? f : PARAPHRASE;
  }, [level]);
  if (open) return <ParaphraseItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.paraphrase.name, MODULE_INFO.paraphrase.name_en)} sub={pick(lang, MODULE_INFO.paraphrase.sub, MODULE_INFO.paraphrase.sub_en)} onBack={onBack} />
      <div className="af-substage">
        {PARAPHRASE.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> {t(lang, "pr.empty")}</div>
        ) : null}
        <div className="af-grid">
          {items.map((p) => {
            const done = !!store.state.done["paraphrase:" + p.id];
            return (
              <button key={p.id} className="af-card" onClick={() => setOpen(p)}>
                <div className="af-card-top">
                  <span className="af-card-icon af-ic-paraphrase"><RefreshCw size={20} /></span>
                  <span className="af-card-tag">{p.lv}</span>
                </div>
                <div className="af-card-name">{pick(lang, p.instruction, p.instruction_en)}{done ? <Check size={14} className="af-done-badge" /> : null}</div>
                <div className="af-card-desc">{p.source.slice(0, 56)}{p.source.length > 56 ? "…" : ""}</div>
                <div className="af-card-go">{t(lang, "common.write")} <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function ParaphraseItem({ item, store, award, onBack }) {
  const lang = useLang();
  const [text, setText] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [err, setErr] = useState(null);
  const [result, setResult] = useState(null);
  const apiKey = store.state.settings.apiKey;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  async function evaluate() {
    if (evaluating) return;
    const answer = text.trim();
    if (answer.split(/\s+/).filter(Boolean).length < 3) { setErr(t(lang, "pr.needMore")); return; }
    setEvaluating(true); setErr(null);
    const aiItem = {
      type: "Paraphrase", exam: ["TOEFL"],
      prompt:
        "SOURCE SENTENCE:\n" + item.source +
        "\n\nREQUIRED TRANSFORMATION:\n" + pick(lang, item.instruction, item.instruction_en) +
        (lang === "en"
          ? "\n\nEvaluate the student's rewrite on three criteria: (a) does it preserve the meaning, (b) did it perform the required structural transformation, (c) is it grammatically correct. Write 'Puan: X/10' at the VERY START, then 2–3 lines of feedback in ENGLISH, and on the last line suggest a correct rewrite after 'Sample: '."
          : "\n\nÖğrencinin yeniden yazımını şu üç ölçüte göre değerlendir: (a) anlamı koruyor mu, (b) istenen yapısal dönüşümü doğru yaptı mı, (c) dilbilgisel olarak doğru mu. Yanıtının EN BAŞINA 'Puan: X/10' yaz, ardından 2–3 satır Türkçe geri bildirim ver ve son satırda 'Örnek: ' ile doğru bir yeniden yazım öner."),
    };
    try {
      let raw, score, offline = false;
      if (apiKey) {
        raw = await scoreWithAI({ text: answer, item: aiItem, apiKey, lang });
        score = extractScore(raw, 10);
      } else {
        offline = true;
        const a = analyzeWriting(answer, { minWords: 0 }, lang);
        score = Math.max(0, Math.min(10, Math.round((parseFloat(a.band) / 8) * 10)));
        raw = t(lang, "ti.offlineFeedback") + "\n• " + a.notes.join("\n• ") +
          "\n\n" + t(lang, "ti.addKey");
      }
      setResult({ score, raw, offline });
      store.markDone("paraphrase:" + item.id);
      store.touchStreak();
      award(score && score > 0 ? Math.round(score) : 5, true);
    } catch (e) {
      setErr(e.message || t(lang, "ti.evalFail"));
    } finally { setEvaluating(false); }
  }

  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.paraphrase.name, MODULE_INFO.paraphrase.name_en)} sub={t(lang, "pr.sub", { lv: item.lv })} onBack={onBack} />
      <div className="af-substage af-write">
        <div className="af-write-prompt"><span className="af-write-cap">{t(lang, "pr.source")}</span> {item.source}</div>
        <div className="af-write-struct"><span className="af-write-cap">{t(lang, "pr.instruction")}</span> {pick(lang, item.instruction, item.instruction_en)}</div>
        {!result ? (
          <>
            <textarea className="af-write-area" value={text} onChange={(e) => setText(e.target.value)}
              placeholder={t(lang, "pr.ph")} />
            <div className="af-write-meta"><span>{t(lang, "common.words", { n: words })}</span></div>
            <div className="af-score-row">
              <button className="af-score-btn is-ai" disabled={evaluating || words < 3} onClick={evaluate}>
                <Sparkles size={15} /> {evaluating ? t(lang, "common.evaluating") : t(lang, "common.evaluate")}
              </button>
              <span className="af-ti-aimode">{apiKey ? t(lang, "common.aiMode") : t(lang, "common.offlineMode")}</span>
            </div>
            {err ? <div className="af-ai-err"><AlertTriangle size={14} /> {err}</div> : null}
          </>
        ) : (
          <div className="af-result">
            <div className="af-result-cap">{t(lang, "pr.doneCap")}</div>
            <div className="af-result-lv">{result.score != null ? result.score + "/10" : "—"}</div>
            <div className="af-band-cap">{result.offline ? t(lang, "ti.offlineCap") : t(lang, "ti.aiCap")}</div>
            <div className="af-ai-out af-ti-feedback">{result.raw}</div>
            <div className="af-pp-sample"><span className="af-write-cap">{t(lang, "pr.sample")}</span> {item.sample}</div>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "pr.others")} <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </>
  );
}

/* ============================================================
   ERROR HUNT  (click-to-find hidden grammar errors)
============================================================ */
function buildEH(item) {
  const words = item.text.split(/\s+/);
  const norm = (s) => (s || "").toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9']+$/gi, "");
  const errorOf = {};                         // wordIndex -> errorIndex
  const used = new Array(words.length).fill(false);
  (item.errors || []).forEach((err, ei) => {
    const fw = err.find.split(/\s+/).map(norm);
    for (let i = 0; i + fw.length <= words.length; i++) {
      if (used[i]) continue;
      let ok = true;
      for (let k = 0; k < fw.length; k++) {
        if (used[i + k] || norm(words[i + k]) !== fw[k]) { ok = false; break; }
      }
      if (ok) { for (let k = 0; k < fw.length; k++) { errorOf[i + k] = ei; used[i + k] = true; } break; }
    }
  });
  return { words, errorOf };
}
export function ErrorHuntRoom({ level, store, award, onBack }) {
  const lang = useLang();
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    const f = ERRORHUNT.filter((e) => !level || lvIndex(e.lv) <= lvIndex(level));
    return f.length ? f : ERRORHUNT;
  }, [level]);
  if (open) return <ErrorHuntItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.errorhunt.name, MODULE_INFO.errorhunt.name_en)} sub={pick(lang, MODULE_INFO.errorhunt.sub, MODULE_INFO.errorhunt.sub_en)} onBack={onBack} />
      <div className="af-substage">
        {ERRORHUNT.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> {t(lang, "eh.empty")}</div>
        ) : null}
        <div className="af-grid">
          {items.map((e) => {
            const done = !!store.state.done["errorhunt:" + e.id];
            return (
              <button key={e.id} className="af-card" onClick={() => setOpen(e)}>
                <div className="af-card-top">
                  <span className="af-card-icon af-ic-errorhunt"><Scan size={20} /></span>
                  <span className="af-card-tag">{e.lv}</span>
                </div>
                <div className="af-card-name">{e.text.slice(0, 48)}…{done ? <Check size={14} className="af-done-badge" /> : null}</div>
                <div className="af-card-desc">{t(lang, "eh.nHidden", { n: e.errors.length })}</div>
                <div className="af-card-go">{t(lang, "common.find")} <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function ErrorHuntItem({ item, store, award, onBack }) {
  const lang = useLang();
  const { words, errorOf } = useMemo(() => buildEH(item), [item]);
  const [selected, setSelected] = useState([]);   // word indices clicked
  const [checked, setChecked] = useState(false);
  const left = useTimer(90, !checked);

  const found = new Set();
  selected.forEach((idx) => { if (errorOf[idx] != null) found.add(errorOf[idx]); });
  const score = found.size;

  useEffect(() => { if (!checked && left === 0) setChecked(true); }, [checked, left]);
  useEffect(() => {
    if (!checked) return;
    store.markDone("errorhunt:" + item.id);
    store.touchStreak();
    award(score > 0 ? score * 6 : 4, score > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  function toggle(idx) {
    if (checked) return;
    setSelected((s) => s.includes(idx) ? s.filter((x) => x !== idx) : [...s, idx]);
  }
  function check() { if (!checked) setChecked(true); }

  return (
    <>
      <ModuleBar title={pick(lang, MODULE_INFO.errorhunt.name, MODULE_INFO.errorhunt.name_en)} sub={t(lang, "eh.sub", { lv: item.lv })} onBack={onBack}
        right={!checked ? <span className="af-modbar-count">{mmss(left)}</span> : null} />
      <div className="af-substage">
        <div className="af-eh-note"><Scan size={13} /> {t(lang, "eh.note", { n: item.errors.length })}</div>
        <p className="af-eh-text">
          {words.map((w, idx) => {
            let cls = "af-eh-w";
            const isErr = errorOf[idx] != null;
            if (checked) {
              if (isErr && selected.includes(idx)) cls += " is-found";
              else if (isErr) cls += " is-missed";
              else if (selected.includes(idx)) cls += " is-wrong";
            } else if (selected.includes(idx)) cls += " is-sel";
            return <span key={idx} className={cls} onClick={() => toggle(idx)}>{w}</span>;
          })}
        </p>

        {!checked ? (
          <button className="af-q-next" onClick={check}>{t(lang, "common.check")} <Check size={15} /></button>
        ) : (
          <div className="af-eh-result">
            <div className="af-result-cap">{t(lang, "eh.foundCap", { s: score, n: item.errors.length })}</div>
            <div className="af-eh-explain">
              {item.errors.map((e, ei) => (
                <div key={ei} className={"af-eh-exrow " + (found.has(ei) ? "is-ok" : "is-no")}>
                  {found.has(ei) ? <Check size={14} className="af-eh-exic is-ok" /> : <X size={14} className="af-eh-exic is-no" />}
                  <span><b>{e.find}</b> → <b className="af-eh-fix">{e.fix}</b> · {exTr(lang, e)}</span>
                </div>
              ))}
            </div>
            <button className="af-q-next af-result-go" onClick={onBack}>{t(lang, "eh.others")} <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </>
  );
}

/* ============================================================
   FOCUS MODE  (timed deep-work session; state lives in the root)
============================================================ */
export function FocusBar({ remainingMs, distractions, durationMin, onEnd }) {
  const lang = useLang();
  const done = remainingMs <= 0;
  const m = Math.max(0, Math.floor(remainingMs / 60000));
  const sec = Math.max(0, Math.floor((remainingMs % 60000) / 1000));
  return (
    <div className={"af-focusbar " + (done ? "is-done" : "")}>
      <span className="af-focus-ic"><Target size={16} /></span>
      {done ? (
        <span className="af-focus-time">{t(lang, "fb.done", { n: durationMin })} <Trophy size={14} /></span>
      ) : (
        <span className="af-focus-time">{String(m).padStart(2, "0")}:{String(sec).padStart(2, "0")} <em>{t(lang, "fb.focus")}</em></span>
      )}
      <span className={"af-focus-dist " + (distractions > 0 ? "is-warn" : "")} title={t(lang, "fb.distractTitle")}>
        {t(lang, "fb.distract", { n: distractions })}
      </span>
      <button className="af-focus-end" onClick={onEnd}>{done ? t(lang, "fb.close") : t(lang, "fb.end")}</button>
    </div>
  );
}
