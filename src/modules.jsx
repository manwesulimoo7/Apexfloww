import { useState, useEffect, useMemo, useRef } from "react";
import {
  Zap, Flame, Brain, BookOpen, Hammer, Mic, Timer, Target, Eye, EyeOff,
  Check, X, RotateCcw, Award, Layers, ArrowRight, Play, AlertTriangle,
  Scan, Gauge, TrendingUp, Lightbulb, Home as HomeIcon, ChevronLeft,
  Crosshair, Sparkles, Volume2, RefreshCw, GraduationCap, PenLine,
  ListChecks, Languages, BookMarked, Headphones, Repeat, Star, Lock,
  ChevronRight, RotateCw, Trophy, Pause, Sun, Moon, FileText, Replace,
} from "lucide-react";
import { tierFor, speak, stopSpeak, speechSupported, reviewQueue, analyzeWriting, scoreWithAI } from "./lib.js";
import {
  LEXICAL, PASSAGES, SYNTAX, SPEAKING,
  LEVELS, LV_ORDER, lvIndex, levelMeta,
  PLACEMENT, placementLevel, VOCAB, vocabForLevel, GRAMMAR, LISTENING, WRITING, ARTICLES, CLOZE, RESTATE,
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

/* ============================================================
   TOP HUD
============================================================ */
export function TopHUD({ xp, combo, maxCombo, flow, lastGain, onReset }) {
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
            {maxCombo > 0 ? `   ·   en yüksek seri: ${maxCombo}` : ""}
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
  const deck = useMemo(() => shuffle(LEXICAL), []);
  const [i, setI] = useState(0);
  const item = deck[i % deck.length];
  const options = useMemo(() => shuffle([item.a, ...item.d]), [i]);
  const [picked, setPicked] = useState(null);
  const [t, setT] = useState(12);
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    if (picked) return;
    if (t <= 0) { setPicked("__timeout__"); award(0, false); return; }
    const id = setTimeout(() => setT((x) => x - 1), 1000);
    return () => clearTimeout(id);
  }, [t, picked]);

  function choose(opt) {
    if (picked) return;
    setPicked(opt);
    if (opt === item.a) {
      const b = t >= 9 ? 5 : t >= 5 ? 3 : 1;
      setBonus(b);
      award(10 + b, true);
    } else {
      setBonus(0);
      award(0, false);
    }
  }
  function next() {
    setPicked(null); setBonus(0); setT(12); setI((x) => x + 1);
  }

  const answered = !!picked;
  const right = picked === item.a;
  return (
    <div className="af-mod">
      <ModuleBar title="LEXICAL ARENA" sub="rapid-fire · eşanlam" onBack={onBack}
        right={
          <div className={"af-clock " + (t <= 4 && !answered ? "af-clock-warn" : "")}>
            <Timer size={14} /> {answered ? "—" : t + "s"}
          </div>
        } />

      <div className="af-arena">
        <div className="af-arena-q">
          <div className="af-arena-prompt">EŞANLAMINI SEÇ</div>
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
              {right ? <><Check size={15} /> DOĞRU {bonus ? `· +${bonus} hız bonusu` : ""}</>
                     : <><X size={15} /> {picked === "__timeout__" ? "SÜRE DOLDU" : "YANLIŞ"} · seri sıfırlandı</>}
            </div>
            <div className="af-verdict-body">{item.tr}</div>
            <button className="af-next" onClick={next}>SONRAKİ <ArrowRight size={15} /></button>
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
            <span className="af-leg em">metindeki anahtar</span>
            <span className="af-leg sky">sorudaki paraphrase</span>
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
                  <span className="af-headpara">Paragraf {it.para}</span>
                  <select className={"af-select " + (st ? (st.correct ? "af-select-ok" : "af-select-no") : "")}
                    value={st ? st.val : ""} disabled={st && st.locked}
                    onChange={(e) => answerHead(it.para, e.target.value)}>
                    <option value="" disabled>başlık seç…</option>
                    {P.headingOptions.map((h) => (
                      <option key={h.k} value={h.k}>{h.k} — {h.t}</option>
                    ))}
                  </select>
                  {st && (
                    <div className={"af-mini " + (st.correct ? "af-mini-ok" : "af-mini-no")}>
                      {st.correct ? <Check size={13} /> : <X size={13} />}{" "}
                      {st.correct ? it.tr : "Tekrar dene — doğru başlığı bulana dek kilitlenmez."}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SENTENCE INSERTION */}
          <div className="af-qblock">
            <div className="af-qhead"><ArrowRight size={14} /> Sentence Insertion · Paragraf {P.insertion.anchorPara}</div>
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
        <div className="af-forge-instr">
          Parçaları doğru sırada birleştirip mantıksal, gramatik bir <b>Band {item.band}</b> cümlesi kur.
          Yerleştirmek için parçaya tıkla; çıkarmak için yukarıdaki parçaya tıkla.
        </div>

        {/* build line */}
        <div className={"af-build " + (solved ? "af-build-solved" : "")}>
          {placed.length === 0 && <span className="af-build-empty">cümleni buraya inşa et…</span>}
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
              {revealed ? <><Lightbulb size={15} /> CEVAP GÖSTERİLDİ (XP yok)</> : <><Check size={15} /> KUSURSUZ · +25 XP</>}
            </div>
            <div className="af-verdict-body">{item.tr}</div>
            <div className="af-forge-actions">
              <button className="af-next ghost" onClick={reset}><RotateCcw size={14} /> tekrar</button>
              <button className="af-next" onClick={() => { onNext(); }}>SONRAKİ <ArrowRight size={15} /></button>
            </div>
          </div>
        ) : full ? (
          <div className="af-verdict af-v-no">
            <div className="af-verdict-head"><AlertTriangle size={15} /> SIRA HATALI · yeşil parçalar yerinde</div>
            <div className="af-verdict-body">
              {item.tr}
              <div className="af-forge-hint">Kırmızı parçalara (yukarıda) tıklayıp havuza geri al, yeniden dene.</div>
            </div>
            <div className="af-forge-actions">
              <button className="af-next ghost" onClick={reset}><RotateCcw size={14} /> sıfırla</button>
              <button className="af-next ghost" onClick={reveal}><Lightbulb size={14} /> cevabı göster</button>
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
  const [idx, setIdx] = useState(0);
  const item = SPEAKING[idx % SPEAKING.length];
  const [phase, setPhase] = useState("idle"); // idle | prep | talk | review
  const [t, setT] = useState(0);
  const [used, setUsed] = useState([false, false, false]);
  const [scored, setScored] = useState(false);
  const PREP = 15, TALK = 120;

  useEffect(() => {
    if (phase !== "prep" && phase !== "talk") return;
    if (t <= 0) {
      if (phase === "prep") { setPhase("talk"); setT(TALK); }
      else { setPhase("review"); }
      return;
    }
    const id = setTimeout(() => setT((x) => x - 1), 1000);
    return () => clearTimeout(id);
  }, [t, phase]);

  function start() { setPhase("prep"); setT(PREP); setUsed([false, false, false]); setScored(false); }
  function skip() {
    if (phase === "prep") { setPhase("talk"); setT(TALK); }
    else if (phase === "talk") { setPhase("review"); }
  }
  function confirmReview() {
    if (scored) return;
    const hit = used.filter(Boolean).length;
    award(hit * 10 + 20, hit > 0); // completion + per-phrase; combo up if any phrase used
    setScored(true);
  }
  function nextPrompt() {
    setIdx((x) => x + 1); setPhase("idle"); setT(0); setUsed([false, false, false]); setScored(false);
  }

  const totalForPhase = phase === "prep" ? PREP : TALK;
  const ring = phase === "prep" || phase === "talk"
    ? Math.max(0, Math.min(100, (t / totalForPhase) * 100)) : 0;
  const danger = phase === "talk" && t <= 15;

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
                  <div className="af-ring-num">{t}</div>
                  <div className="af-ring-lbl">{phase === "prep" ? "HAZIRLIK" : "KONUŞ"}</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* survival kit */}
        {(phase === "prep" || phase === "talk") && (
          <div className="af-kit">
            <div className="af-kit-head"><Sparkles size={14} /> SURVIVAL KIT — konuşmana bunları yedir</div>
            <div className="af-kit-items">
              {item.kit.map((k, i) => <span key={i} className="af-kit-chip">{k}</span>)}
            </div>
          </div>
        )}

        {/* controls / review */}
        {phase === "idle" && (
          <div className="af-speak-controls">
            <button className="af-start-big" onClick={start}><Play size={18} /> BAŞLAT · 15s hazırlık → 120s konuşma</button>
            <div className="af-speak-tip"><Lightbulb size={13} /> {item.tr}</div>
          </div>
        )}
        {(phase === "prep" || phase === "talk") && (
          <div className="af-speak-controls">
            <button className="af-next ghost" onClick={skip}>{phase === "prep" ? "hazırlığı atla →" : "konuşmayı bitir →"}</button>
          </div>
        )}
        {phase === "review" && (
          <div className="af-review">
            <div className="af-review-head">Öz-değerlendirme — hangilerini gerçekten kullandın?</div>
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
              <button className="af-start-big" onClick={confirmReview}><Award size={16} /> PUANLA</button>
            ) : (
              <div className="af-verdict af-v-ok" style={{ marginTop: 14 }}>
                <div className="af-verdict-head">
                  <Check size={15} /> +{used.filter(Boolean).length * 10 + 20} XP · {used.filter(Boolean).length}/3 kalıp
                </div>
                <div className="af-verdict-body">{item.tr}</div>
                <button className="af-next" onClick={nextPrompt}>SONRAKİ PROMPT <ArrowRight size={15} /></button>
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
      <div className="af-q-prog">soru {i + 1} / {items.length}</div>
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
      {checked && it.tr ? <div className="af-q-exp"><Lightbulb size={13} /> {it.tr}</div> : null}
      {!checked ? (
        <button className="af-q-next" disabled={sel === null} onClick={check}>
          Kontrol et <Check size={15} />
        </button>
      ) : (
        <button className="af-q-next" onClick={next}>
          {i + 1 < items.length ? <>Devam <ArrowRight size={15} /></> : <>Bitir <Check size={15} /></>}
        </button>
      )}
      {footer}
    </div>
  );
}

/* ============================================================
   PLACEMENT TEST
============================================================ */
export function Placement({ onDone }) {
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
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
  if (finished) {
    const lv = placementLevel(correct, pItems.length);
    const meta = levelMeta(lv);
    return (
      <div className="af-substage af-place">
        <div className="af-result">
          <div className="af-result-cap">SEVİYE TESPİTİ</div>
          <div className="af-result-lv">{lv}</div>
          <div className="af-result-label">{meta.label}</div>
          <p className="af-result-blurb">{meta.blurb}</p>
          <div className="af-result-score">{correct} / {pItems.length} doğru</div>
          <p className="af-result-note">
            Bu senin <b>başlangıç noktan</b> — sabit değil. Pratik ettikçe XP ve band yükselir, istediğinde testi tekrar çözebilirsin.
          </p>
          <button className="af-q-next af-result-go" onClick={() => onDone(lv)}>
            Kataloğa geç <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="af-substage af-place">
      <div className="af-place-head">
        <div className="af-boot"><span className="af-prompt-sym">›</span> seviye tespiti<span className="af-caret" /></div>
        <h1 className="af-h1">Seni doğru yerden başlatalım.</h1>
        <p className="af-lede">Kısa sorular, kolaydan zora ve değişen tiplerde. Bir şık seç, istersen değiştir, sonra “Kontrol et”e bas — doğru ve yanlış cevabı gösteririm. Seviyeni testin sonunda söylerim.</p>
      </div>
      <div className="af-prog-track af-place-prog">
        <div className="af-prog-fill" style={{ width: ((i) / pItems.length) * 100 + "%" }} />
      </div>
      <div className="af-mcq">
        <div className="af-q-prog">soru {i + 1} / {pItems.length}</div>
        <div className="af-q-tag">{it.tag || "boşluk doldurma"}</div>
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
          <button className="af-q-next" disabled={sel === null} onClick={check}>Kontrol et <Check size={15} /></button>
        ) : (
          <button className="af-q-next" onClick={next}>
            {i + 1 < pItems.length ? <>Devam <ArrowRight size={15} /></> : <>Sonucu gör <Check size={15} /></>}
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
  vocab: <Repeat size={20} />, grammar: <GraduationCap size={20} />,
  listening: <Headphones size={20} />, articles: <BookMarked size={20} />, reading: <BookOpen size={20} />,
  lexical: <Crosshair size={20} />, syntax: <Hammer size={20} />,
  speaking: <Mic size={20} />, writing: <PenLine size={20} />, cloze: <FileText size={20} />,
  restate: <Replace size={20} />,
};
function ModuleCard({ k, ctx, go, done }) {
  const info = MODULE_INFO[k];
  if (!info) return null;
  return (
    <button className="af-card" onClick={() => go(k, ctx)}>
      <div className="af-card-top">
        <span className={"af-card-icon af-ic-" + k}>{MODULE_ICON[k]}</span>
        <span className="af-card-tag">{info.minLv}+</span>
      </div>
      <div className="af-card-name">{info.name}{done ? <Check size={14} className="af-done-badge" /> : null}</div>
      <div className="af-card-desc">{info.sub}</div>
      <div className="af-card-go">BAŞLAT <ArrowRight size={15} /></div>
    </button>
  );
}

const titleFor = (xp) =>
  xp < 100 ? "Çırak" : xp < 500 ? "Öğrenci" : xp < 1500 ? "Araştırmacı"
  : xp < 4000 ? "Akademisyen" : xp < 10000 ? "Üstat" : "Efsane";
const doneCount = (s, pre) => Object.keys(s.done || {}).filter((k) => k.startsWith(pre)).length;
const srsStarted = (s) => Object.values(s.srs || {}).filter((c) => c && c.reps >= 1).length;
const srsMature = (s) => Object.values(s.srs || {}).filter((c) => c && c.interval >= 21).length;
const acc = (s) => (s.total > 0 ? s.correct / s.total : 0);

const BADGES = [
  // — Başlangıç —
  { id: "start",     cat: "Başlangıç", name: "İlk Adım",         desc: "Seviye testini tamamla",     ic: <Sparkles size={18} />,      test: (s) => s.level !== null },
  { id: "firstq",    cat: "Başlangıç", name: "Buz Kırıldı",      desc: "İlk soruyu yanıtla",         ic: <Play size={18} />,          test: (s) => s.total >= 1 },
  { id: "firstvoc",  cat: "Başlangıç", name: "Merhaba Kelime",   desc: "İlk kelimeyi çalış",         ic: <Repeat size={18} />,        test: (s) => srsStarted(s) >= 1 },

  // — XP / İlerleme —
  { id: "xp100",     cat: "XP / İlerleme", name: "Isınma Turu",  desc: "100 XP topla",               ic: <Zap size={18} />,           test: (s) => s.xp >= 100 },
  { id: "xp500",     cat: "XP / İlerleme", name: "Çalışkan",     desc: "500 XP topla",               ic: <TrendingUp size={18} />,    test: (s) => s.xp >= 500 },
  { id: "xp1500",    cat: "XP / İlerleme", name: "XP Canavarı",  desc: "1.500 XP topla",             ic: <Trophy size={18} />,        test: (s) => s.xp >= 1500 },
  { id: "xp4000",    cat: "XP / İlerleme", name: "Akademisyen",  desc: "4.000 XP topla",             ic: <GraduationCap size={18} />, test: (s) => s.xp >= 4000 },
  { id: "xp10000",   cat: "XP / İlerleme", name: "Efsane",       desc: "10.000 XP topla",            ic: <Gauge size={18} />,         test: (s) => s.xp >= 10000 },

  // — Seri —
  { id: "streak3",   cat: "Seri", name: "Seri Başlangıcı",       desc: "3 günlük seri",              ic: <Flame size={18} />,         test: (s) => s.streak.count >= 3 },
  { id: "streak7",   cat: "Seri", name: "Haftalık İstikrar",     desc: "7 günlük seri",              ic: <Flame size={18} />,         test: (s) => s.streak.count >= 7 },
  { id: "streak14",  cat: "Seri", name: "İki Hafta Dimdik",      desc: "14 günlük seri",             ic: <Flame size={18} />,         test: (s) => s.streak.count >= 14 },
  { id: "streak30",  cat: "Seri", name: "Aylık Disiplin",        desc: "30 günlük seri",             ic: <Flame size={18} />,         test: (s) => s.streak.count >= 30 },
  { id: "streak100", cat: "Seri", name: "Yüz Gün",               desc: "100 günlük seri",            ic: <Trophy size={18} />,        test: (s) => s.streak.count >= 100 },

  // — Kombo / Akış —
  { id: "combo8",    cat: "Kombo / Akış", name: "Akış Ustası",   desc: "8'lik kombo yakala",         ic: <Star size={18} />,          test: (s) => s.bestCombo >= 8 },
  { id: "combo15",   cat: "Kombo / Akış", name: "Kombo Kralı",   desc: "15'lik kombo yakala",        ic: <Star size={18} />,          test: (s) => s.bestCombo >= 15 },
  { id: "combo25",   cat: "Kombo / Akış", name: "Durdurulamaz",  desc: "25'lik kombo yakala",        ic: <Zap size={18} />,           test: (s) => s.bestCombo >= 25 },
  { id: "combo40",   cat: "Kombo / Akış", name: "Kusursuz Akış", desc: "40'lık kombo yakala",        ic: <Crosshair size={18} />,     test: (s) => s.bestCombo >= 40 },

  // — Doğruluk —
  { id: "acc80",     cat: "Doğruluk", name: "Keskin Nişancı",    desc: "%80 doğruluk (30+ soru)",    ic: <Target size={18} />,        test: (s) => s.total >= 30 && acc(s) >= 0.8 },
  { id: "acc90",     cat: "Doğruluk", name: "Cerrah Hassasiyeti",desc: "%90 doğruluk (50+ soru)",    ic: <Crosshair size={18} />,     test: (s) => s.total >= 50 && acc(s) >= 0.9 },
  { id: "acc95",     cat: "Doğruluk", name: "Hatasız Kâtip",     desc: "%95 doğruluk (100+ soru)",   ic: <Gauge size={18} />,         test: (s) => s.total >= 100 && acc(s) >= 0.95 },

  // — Kelime —
  { id: "voc20",     cat: "Kelime", name: "Kelime Avcısı",       desc: "20 kelime çalış",            ic: <Repeat size={18} />,        test: (s) => srsStarted(s) >= 20 },
  { id: "voc50",     cat: "Kelime", name: "Kelime Toplayıcısı",  desc: "50 kelime çalış",            ic: <Repeat size={18} />,        test: (s) => srsStarted(s) >= 50 },
  { id: "voc100",    cat: "Kelime", name: "Sözlük Kurdu",        desc: "100 kelime çalış",           ic: <BookMarked size={18} />,    test: (s) => srsStarted(s) >= 100 },
  { id: "voc250",    cat: "Kelime", name: "Kelime Hazinesi",     desc: "250 kelime çalış",           ic: <Layers size={18} />,        test: (s) => srsStarted(s) >= 250 },
  { id: "voc500",    cat: "Kelime", name: "Yürüyen Sözlük",      desc: "500 kelime çalış",           ic: <Brain size={18} />,         test: (s) => srsStarted(s) >= 500 },
  { id: "mat20",     cat: "Kelime", name: "Kalıcı Bellek",       desc: "20 kelimeyi uzun vadeye al", ic: <Brain size={18} />,         test: (s) => srsMature(s) >= 20 },
  { id: "mat50",     cat: "Kelime", name: "Hafıza Sarayı",       desc: "50 kelimeyi kalıcı ezberle", ic: <Trophy size={18} />,        test: (s) => srsMature(s) >= 50 },

  // — Beceriler —
  { id: "gram1",     cat: "Beceriler", name: "Gramer Çaylağı",   desc: "İlk gramer dersini bitir",   ic: <GraduationCap size={18} />, test: (s) => doneCount(s, "grammar:") >= 1 },
  { id: "gram5",     cat: "Beceriler", name: "Gramer Mezunu",    desc: "5 gramer dersi bitir",       ic: <GraduationCap size={18} />, test: (s) => doneCount(s, "grammar:") >= 5 },
  { id: "gram10",    cat: "Beceriler", name: "Gramer Profesörü", desc: "10 gramer dersi bitir",      ic: <Brain size={18} />,         test: (s) => doneCount(s, "grammar:") >= 10 },
  { id: "lis1",      cat: "Beceriler", name: "İlk Dinleti",      desc: "İlk dinlemeyi tamamla",      ic: <Headphones size={18} />,    test: (s) => doneCount(s, "listening:") >= 1 },
  { id: "lis3",      cat: "Beceriler", name: "Kulak Kabartan",   desc: "3 dinleme tamamla",          ic: <Headphones size={18} />,    test: (s) => doneCount(s, "listening:") >= 3 },
  { id: "lis10",     cat: "Beceriler", name: "Keskin Kulak",     desc: "10 dinleme tamamla",         ic: <Volume2 size={18} />,       test: (s) => doneCount(s, "listening:") >= 10 },
  { id: "wri1",      cat: "Beceriler", name: "Kalem Erbabı",     desc: "İlk yazma görevini bitir",   ic: <PenLine size={18} />,       test: (s) => doneCount(s, "writing:") >= 1 },
  { id: "wri3",      cat: "Beceriler", name: "Üretken Yazar",    desc: "3 yazma görevi bitir",       ic: <PenLine size={18} />,       test: (s) => doneCount(s, "writing:") >= 3 },
  { id: "art3",      cat: "Beceriler", name: "Sayfa Çeviren",    desc: "3 okuma parçası bitir",      ic: <BookOpen size={18} />,      test: (s) => doneCount(s, "article:") >= 3 },
  { id: "art10",     cat: "Beceriler", name: "Kitap Kurdu",      desc: "10 okuma parçası bitir",     ic: <BookOpen size={18} />,      test: (s) => doneCount(s, "article:") >= 10 },
  { id: "allskill",  cat: "Beceriler", name: "Çok Yönlü",        desc: "Her beceriden en az 1",      ic: <Award size={18} />,         test: (s) => doneCount(s, "grammar:") >= 1 && doneCount(s, "listening:") >= 1 && doneCount(s, "writing:") >= 1 && doneCount(s, "article:") >= 1 },

  // — Hacim —
  { id: "q100",      cat: "Hacim", name: "Yüz Soru",             desc: "100 soru yanıtla",           ic: <ListChecks size={18} />,    test: (s) => s.total >= 100 },
  { id: "q500",      cat: "Hacim", name: "Maratoncu",            desc: "500 soru yanıtla",           ic: <Gauge size={18} />,         test: (s) => s.total >= 500 },
  { id: "cor200",    cat: "Hacim", name: "İki Yüz İsabet",       desc: "200 doğru yanıt ver",        ic: <Check size={18} />,         test: (s) => s.correct >= 200 },
  { id: "cor1000",   cat: "Hacim", name: "Bin İsabet",           desc: "1.000 doğru yanıt ver",      ic: <Trophy size={18} />,        test: (s) => s.correct >= 1000 },
  { id: "day100",    cat: "Hacim", name: "Günün Hakkını Ver",    desc: "Bir günde 100 XP topla",     ic: <Flame size={18} />,         test: (s) => (s.daily && s.daily.xp >= 100) },
];

function Badges({ state }) {
  const [open, setOpen] = useState(true);
  const earned = BADGES.filter((b) => b.test(state)).length;
  return (
    <div className="af-badges">
      <button className="af-badges-head" onClick={() => setOpen((v) => !v)}>
        <Award size={15} /> Başarımlar
        <span className="af-badges-title">{titleFor(state.xp)}</span>
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
                    <span className="af-badge-cat-name">{cat}</span>
                    <span className="af-badge-cat-count">{got}/{list.length}</span>
                  </div>
                  <div className="af-badges-grid">
                    {list.map((b) => {
                      const g = b.test(state);
                      return (
                        <div key={b.id} className={"af-badge " + (g ? "is-got" : "")}>
                          <span className="af-badge-ic">{g ? b.ic : <Lock size={16} />}</span>
                          <span className="af-badge-name">{b.name}</span>
                          <span className="af-badge-desc">{b.desc}</span>
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
  const { state, setLevel, setSetting } = store;
  const userLv = state.level || "A1";
  const theme = state.settings.theme || "dark";
  const [tab, setTab] = useState("learn");
  const [learnLv, setLearnLv] = useState(userLv);
  const [openExam, setOpenExam] = useState(null);

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
          <span className="af-cat-badge-label">{levelMeta(userLv).label}</span>
          <button className="af-cat-retake" onClick={() => setLevel(null)} title="Seviye testini tekrar çöz">
            <RotateCw size={12} /> seviye
          </button>
        </div>
        <div className="af-cat-stats">
          <span className="af-cat-stat"><Flame size={13} /> {state.streak.count} gün</span>
          <span className="af-cat-stat"><TrendingUp size={13} /> {state.xp} XP</span>
          <span className="af-cat-stat"><Repeat size={13} /> {dueCount} tekrar</span>
          <button className="af-theme-quick" title="Tema değiştir"
            onClick={() => setSetting("theme", theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </div>

      <button className="af-srs-cta" onClick={() => go("vocab", {})}>
        <div className="af-srs-cta-l">
          <Repeat size={18} />
          <div>
            <div className="af-srs-cta-title">Günün kelime tekrarı</div>
            <div className="af-srs-cta-sub">
              {dueCount > 0 ? `${dueCount} kelime tekrara hazır` : freshCount > 0 ? `${freshCount} yeni kelime seni bekliyor` : "bugünlük tamam — yine de çalışabilirsin"}
            </div>
          </div>
        </div>
        <ArrowRight size={18} />
      </button>

      {(() => {
        const today = new Date().toISOString().slice(0, 10);
        const dd = state.daily && state.daily.date === today ? state.daily : { vocab: 0, xp: 0, grammar: 0, listening: 0 };
        const tasks = [
          { k: "vocab", ic: <Repeat size={14} />, label: "Kelime tekrar et", have: dd.vocab || 0, goal: 15 },
          { k: "xp", ic: <TrendingUp size={14} />, label: "XP topla", have: dd.xp || 0, goal: 120 },
          { k: "grammar", ic: <GraduationCap size={14} />, label: "Bir gramer dersi", have: dd.grammar || 0, goal: 1 },
          { k: "listening", ic: <Headphones size={14} />, label: "Bir dinleme", have: dd.listening || 0, goal: 1 },
        ];
        const doneN = tasks.filter((t) => t.have >= t.goal).length;
        return (
          <div className="af-daily">
            <div className="af-daily-head"><Crosshair size={14} /> Günün Görevleri <span className="af-daily-prog">{doneN}/{tasks.length}</span></div>
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
            {doneN === tasks.length ? <div className="af-daily-done">🎉 Günlük diyet tamam — serin güvende.</div> : null}
          </div>
        );
      })()}

      {onFocus ? (
        <div className="af-focus-launch">
          <span className="af-focus-launch-cap"><Target size={14} /> Odak Modu</span>
          <button className="af-focus-btn" onClick={() => onFocus(25)}>25 dk</button>
          <button className="af-focus-btn" onClick={() => onFocus(60)}>60 dk</button>
          <button className="af-focus-btn" onClick={() => onFocus(120)}>120 dk maraton</button>
          <span className="af-focus-launch-note">başlat — geri sayım + sekme uyarısı</span>
        </div>
      ) : null}

      <div className="af-tabs">
        <button className={"af-tab " + (tab === "learn" ? "is-on" : "")} onClick={() => setTab("learn")}>
          <GraduationCap size={15} /> Öğren — seviyene göre
        </button>
        <button className={"af-tab " + (tab === "exam" ? "is-on" : "")} onClick={() => setTab("exam")}>
          <Trophy size={15} /> Sınav modu
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
                <span className="af-lvchip-label">{l.label}</span>
                <span className="af-lvchip-bar"><i style={{ width: levelPct(l.id, state) + "%" }} /></span>
              </button>
            ))}
          </div>
          <p className="af-lvblurb">{levelMeta(learnLv).blurb}</p>
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
                    <span className="af-exam-name">{ex.name}</span>
                    {locked ? <span className="af-exam-soon"><Lock size={11} /> yakında</span>
                      : <span className="af-exam-score">{ex.scoring}</span>}
                  </div>
                  <div className="af-exam-skills">{ex.skills.join(" · ")}</div>
                  <div className="af-exam-blurb">{ex.blurb}</div>
                  {!locked ? <div className="af-exam-expand">{open ? "modülleri gizle" : "modülleri aç"} <ChevronRight size={13} className={open ? "af-rot" : ""} /></div> : null}
                </button>
                {open && !locked ? (
                  <div className="af-exam-mods af-grid">
                    {ex.modules.map((k) => (
                      <ModuleCard key={k} k={k} ctx={{ level: userLv, exam: ex.id }} go={go} />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      <Badges state={state} />

      <div className="af-settings">
        <label className="af-toggle">
          <input type="checkbox" checked={state.settings.sound}
            onChange={(e) => setSetting("sound", e.target.checked)} />
          <span><Volume2 size={13} /> Dinleme sesi (tarayıcı TTS)</span>
        </label>
        <div className="af-theme">
          <span className="af-theme-cap"><Sun size={13} /> Tema</span>
          <div className="af-seg">
            <button className={"af-seg-btn " + (theme === "dark" ? "is-on" : "")} onClick={() => setSetting("theme", "dark")}><Moon size={12} /> Koyu</button>
            <button className={"af-seg-btn " + (theme === "light" ? "is-on" : "")} onClick={() => setSetting("theme", "light")}><Sun size={12} /> Açık</button>
          </div>
        </div>
        <div className="af-keyrow">
          <label className="af-keylabel"><Sparkles size={13} /> AI yazma puanlaması — Anthropic API anahtarı (isteğe bağlı)</label>
          <input className="af-keyinput" type="password" autoComplete="off" spellCheck={false}
            value={state.settings.apiKey} placeholder="sk-ant-…"
            onChange={(e) => setSetting("apiKey", e.target.value.trim())} />
          <div className="af-keynote">
            Yalnızca bu tarayıcıda saklanır, sunucuya gönderilmez. Yazma Stüdyosu’nda “AI ile değerlendir” açılır. Ücret kendi hesabından işler; boş bırakırsan otomatik analiz yine çalışır.
          </div>
        </div>
        <div className="af-keyrow">
          <label className="af-keylabel"><RefreshCw size={13} /> İçerik kaynağı — content.json URL (isteğe bağlı)</label>
          <input className="af-keyinput" type="text" autoComplete="off" spellCheck={false}
            value={state.settings.contentUrl} placeholder="https://raw.githubusercontent.com/…/content.json"
            onChange={(e) => setSetting("contentUrl", e.target.value.trim())} />
          <div className="af-content-foot">
            {content.reload ? <button className="af-content-reload" onClick={content.reload}><RotateCw size={12} /> yenile</button> : null}
            {content.msg ? <span className="af-content-msg">{content.msg}</span> : null}
          </div>
          <div className="af-keynote">Buradaki makale / dinleme / kelime içeriği açılışta yüklenir. Dosyayı (örn. GitHub’da) güncellediğinde herkeste değişir; index’i yeniden yüklemen gerekmez.</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   VOCAB REVIEW  (SRS flashcards)
============================================================ */
export function VocabReview({ store, onBack }) {
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
        <ModuleBar title="Kelime Hazinesi" sub="aralıklı tekrar" onBack={onBack} />
        <div className="af-substage">
          <div className="af-result">
            <div className="af-result-cap">TEKRAR BİTTİ</div>
            <Trophy size={40} className="af-result-trophy" />
            <p className="af-result-blurb">{queue.length} kelime çalıştın. Zoru ‘bilmiyorum’ dediğin kelimeler yarın yeniden karşına gelecek.</p>
            <button className="af-q-next af-result-go" onClick={onBack}>Kataloğa dön <ArrowRight size={16} /></button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <ModuleBar title="Kelime Hazinesi" sub="aralıklı tekrar (SRS)" onBack={onBack}
        right={<span className="af-modbar-count">{pos + 1}/{queue.length}</span>} />
      <div className="af-substage">
        <div className="af-srs">
          <div className="af-srs-lv">{card.lv} · {card.pos}</div>
          <div className="af-srs-word">{card.w}</div>
          {!show ? (
            <button className="af-srs-reveal" onClick={() => setShow(true)}><Eye size={15} /> Anlamı göster</button>
          ) : (
            <div className="af-srs-back">
              <div className="af-srs-tr">{card.tr}</div>
              <div className="af-srs-ex">“{card.ex}”</div>
            </div>
          )}
          {show ? (
            <div className="af-srs-grades">
              <button className="af-srs-grade is-again" onClick={() => grade("again")}>Bilmiyorum</button>
              <button className="af-srs-grade is-good" onClick={() => grade("good")}>Hatırladım</button>
              <button className="af-srs-grade is-easy" onClick={() => grade("easy")}>Kolay</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   GRAMMAR
============================================================ */
export function GrammarHub({ level, store, award, onBack }) {
  const [open, setOpen] = useState(null);
  const lessons = useMemo(() => {
    const f = GRAMMAR.filter((l) => !level || lvIndex(l.lv) <= lvIndex(level));
    return f.length ? f : GRAMMAR;
  }, [level]);
  if (open) return <GrammarLesson lesson={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title="Gramer Atölyesi" sub={level ? level + " ve altı" : "tüm seviyeler"} onBack={onBack} />
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
                <div className="af-card-desc">{l.items.length} alıştırma</div>
                <div className="af-card-go">AÇ <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function GrammarLesson({ lesson, store, award, onBack }) {
  const [stage, setStage] = useState("read"); // read -> practice -> done
  const [score, setScore] = useState(0);
  return (
    <>
      <ModuleBar title={lesson.title} sub={"Gramer · " + lesson.lv} onBack={onBack} />
      <div className="af-substage">
        {stage === "read" ? (
          <div className="af-lesson">
            <div className="af-lesson-exp">{lesson.exp}</div>
            <button className="af-q-next" onClick={() => setStage("practice")}>Alıştırmalara geç <ArrowRight size={15} /></button>
          </div>
        ) : stage === "practice" ? (
          <MCQRunner items={lesson.items} award={award} points={15}
            onFinish={(ok) => { setScore(ok); store.markDone("grammar:" + lesson.id); store.touchStreak(); store.bumpDaily("grammar"); setStage("done"); }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">DERS TAMAM</div>
            <div className="af-result-lv">{score}/{lesson.items.length}</div>
            <p className="af-result-blurb">{lesson.title} işaretlendi. İstediğinde tekrar çözebilirsin.</p>
            <button className="af-q-next af-result-go" onClick={onBack}>Diğer dersler <ArrowRight size={16} /></button>
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
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    const f = LISTENING.filter((l) => !level || lvIndex(l.lv) <= lvIndex(level));
    return f.length ? f : LISTENING;
  }, [level]);
  if (open) return <ListeningItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title="Dinleme Odası" sub="sesli metin + sorular" onBack={onBack} />
      <div className="af-substage">
        {!speechSupported() ? <div className="af-empty"><AlertTriangle size={14} /> Tarayıcın sesli okumayı desteklemiyor; transkripti okuyarak yine de çözebilirsin.</div> : null}
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
                <div className="af-card-desc">{l.items.length} soru · {l.accent === "en-GB" ? "İngiliz" : "Amerikan"} aksanı</div>
                <div className="af-card-go">DİNLE <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function ListeningItem({ item, store, award, onBack }) {
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
      <ModuleBar title={item.title} sub={"Dinleme · " + item.lv} onBack={onBack} />
      <div className="af-substage">
        {phase !== "done" ? (
          <div className="af-play">
            <div className="af-play-row">
              <button className="af-play-btn" onClick={playing ? () => { stopSpeak(); setPlaying(false); } : play}>
                {playing ? <Pause size={22} /> : <Play size={22} />}
              </button>
              <div className="af-play-info">
                <div className="af-play-title"><Volume2 size={14} /> {playing ? "oynatılıyor…" : "dinle"}</div>
                <div className="af-play-sub">istediğin kadar tekrar dinleyebilirsin</div>
              </div>
            </div>
            <button className="af-transcript-toggle" onClick={() => setShowT((v) => !v)}>
              {showT ? <><EyeOff size={13} /> transkripti gizle</> : <><Eye size={13} /> transkripti göster</>}
            </button>
            {showT ? renderScript(item.script) : null}
          </div>
        ) : null}

        {phase !== "done" ? (
          <textarea className="af-notes" value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder="Not defteri — dinlerken anahtar kelimeleri yaz (kaydedilmez, TOEFL'da olduğu gibi notla çöz)" />
        ) : null}

        {phase === "listen" ? (
          <button className="af-q-next af-listen-go" onClick={() => setPhase("quiz")}>Sorulara geç <ArrowRight size={15} /></button>
        ) : phase === "quiz" ? (
          <MCQRunner items={item.items} award={award} points={18}
            onFinish={(ok) => { setScore(ok); store.markDone("listening:" + item.id); store.touchStreak(); store.bumpDaily("listening"); setPhase("done"); }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">DİNLEME TAMAM</div>
            <div className="af-result-lv">{score}/{item.items.length}</div>
            <p className="af-result-blurb">Anlamadığın yer olduysa transkripti açıp tekrar dinle — kulak aşinalığı tekrarla gelir.</p>
            <button className="af-q-next af-result-go" onClick={onBack}>Diğer kayıtlar <ArrowRight size={16} /></button>
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
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    const f = WRITING.filter((w) => !level || lvIndex(w.lv) <= lvIndex(level) + 1);
    return f.length ? f : WRITING;
  }, [level]);
  if (open) return <WritingItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title="Yazma Stüdyosu" sub="görev + rubrik" onBack={onBack} />
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
                <div className="af-card-name">{w.type}{done ? <Check size={14} className="af-done-badge" /> : null}</div>
                <div className="af-card-desc">{w.exam.join(", ")} · min {w.minWords} kelime</div>
                <div className="af-card-go">YAZ <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function WritingItem({ item, store, award, onBack }) {
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
  function runAnalysis() { setAnalysis(analyzeWriting(text, item)); }
  async function runAI() {
    if (!apiKey || aiLoading || words < 5) return;
    setAiErr(null); setAiOut(null); setAiLoading(true);
    try {
      const out = await scoreWithAI({ text, item, apiKey });
      setAiOut(out);
    } catch (e) {
      setAiErr(e.message || "İstek başarısız oldu.");
    } finally { setAiLoading(false); }
  }

  return (
    <>
      <ModuleBar title={item.type} sub={"Yazma · " + item.lv} onBack={onBack} />
      <div className="af-substage af-write">
        <div className="af-write-prompt"><span className="af-write-cap">GÖREV</span> {item.prompt}</div>
        <div className="af-write-tips"><Lightbulb size={13} /> {item.tips}</div>
        <div className="af-write-struct"><span className="af-write-cap">İSKELET</span> {item.structure}</div>
        <textarea className="af-write-area" value={text} onChange={(e) => setText(e.target.value)}
          placeholder="Cevabını buraya yaz…" />
        <div className="af-write-meta">
          <span className={enough ? "is-ok" : ""}>{words} / {item.minWords} kelime</span>
          {!submitted ? (
            <button className="af-q-next" disabled={!enough} onClick={submit}>
              {enough ? <>Tamamladım <Check size={15} /></> : "biraz daha yaz…"}
            </button>
          ) : <span className="af-write-done"><Check size={15} /> tamamlandı · +40 XP</span>}
        </div>

        <div className="af-score-row">
          <button className="af-score-btn" disabled={words < 5} onClick={runAnalysis}>
            <Gauge size={15} /> Otomatik analiz
          </button>
          {apiKey ? (
            <button className="af-score-btn is-ai" disabled={words < 5 || aiLoading} onClick={runAI}>
              <Sparkles size={15} /> {aiLoading ? "değerlendiriliyor…" : "AI ile değerlendir"}
            </button>
          ) : null}
        </div>

        {analysis ? (
          <div className="af-analysis">
            <div className="af-analysis-head">
              <span className="af-band">~{analysis.band}</span>
              <span className="af-band-cap">tahmini band · otomatik ön analiz (resmî değil)</span>
            </div>
            <div className="af-analysis-grid">
              <span>{analysis.wc} kelime</span>
              <span>{analysis.sc} cümle</span>
              <span>{analysis.pc} paragraf</span>
              <span>ort. {analysis.avgLen} kel./cümle</span>
              <span>{analysis.linkersUsed.length} bağlaç</span>
            </div>
            <ul className="af-analysis-notes">
              {analysis.notes.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
        ) : null}

        {aiErr ? (
          <div className="af-ai-err"><AlertTriangle size={14} /> {aiErr}
            <div className="af-ai-err-hint">Anahtar geçersiz veya tarayıcı erişimi engellenmiş olabilir. Anahtarını ayarlardan kontrol et; otomatik analiz her zaman çalışır.</div>
          </div>
        ) : null}
        {aiOut ? <div className="af-ai-out">{aiOut}</div> : null}

        {!apiKey ? (
          <div className="af-write-note">
            Otomatik analiz uzunluk, paragraf, bağlaç ve tekrar gibi ölçütleri kontrol eder — kurulum gerektirmez.
            Gerçek AI puanlaması istersen: katalogdaki ayarlardan kendi Anthropic API anahtarını ekle (anahtar yalnızca senin tarayıcında saklanır, ücret kendi hesabından işler).
          </div>
        ) : null}
      </div>
    </>
  );
}


/* ============================================================
   ARTICLES  (simple reading: passage + MCQs)
============================================================ */
export function ArticleRoom({ level, store, award, onBack }) {
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    const f = ARTICLES.filter((a) => !level || lvIndex(a.lv) <= lvIndex(level));
    return f.length ? f : ARTICLES;
  }, [level]);
  if (open) return <ArticleItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title="Okuma Parçaları" sub="makale + sorular" onBack={onBack} />
      <div className="af-substage">
        {ARTICLES.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> Henüz makale yok — içerik kaynağından (content.json) eklenebilir.</div>
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
                <div className="af-card-desc">{a.items.length} soru</div>
                <div className="af-card-go">OKU <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function ArticleItem({ item, store, award, onBack }) {
  const [phase, setPhase] = useState("read"); // read -> quiz -> done
  const [score, setScore] = useState(0);
  const paras = item.body.split(/\n\s*\n/);
  return (
    <>
      <ModuleBar title={item.title} sub={"Okuma · " + item.lv} onBack={onBack} />
      <div className="af-substage">
        {phase === "read" ? (
          <div className="af-article">
            {paras.map((para, idx) => <p key={idx} className="af-article-p">{para}</p>)}
            <button className="af-q-next" onClick={() => setPhase("quiz")}>Sorulara geç <ArrowRight size={15} /></button>
          </div>
        ) : phase === "quiz" ? (
          <MCQRunner items={item.items} award={award} points={16}
            onFinish={(ok) => { setScore(ok); store.markDone("article:" + item.id); store.touchStreak(); setPhase("done"); }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">OKUMA TAMAM</div>
            <div className="af-result-lv">{score}/{item.items.length}</div>
            <p className="af-result-blurb">Yanlışların varsa metne dönüp ilgili yeri tekrar okuyabilirsin.</p>
            <button className="af-q-next af-result-go" onClick={onBack}>Diğer parçalar <ArrowRight size={16} /></button>
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
export function ClozeRoom({ level, store, award, onBack }) {
  const [open, setOpen] = useState(null);
  const items = useMemo(() => {
    const f = CLOZE.filter((c) => !level || lvIndex(c.lv) <= lvIndex(level));
    return f.length ? f : CLOZE;
  }, [level]);
  if (open) return <ClozeItem item={open} store={store} award={award} onBack={() => setOpen(null)} />;
  return (
    <>
      <ModuleBar title="Boşluk Doldurma" sub="YDS/YÖKDİL cloze" onBack={onBack} />
      <div className="af-substage">
        {CLOZE.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> Henüz cloze parçası yok — içerik kaynağından (content.json) eklenebilir.</div>
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
                <div className="af-card-desc">{c.blanks.length} boşluk</div>
                <div className="af-card-go">BAŞLA <ArrowRight size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
function ClozeItem({ item, store, award, onBack }) {
  const [phase, setPhase] = useState("read"); // read -> quiz -> done
  const [score, setScore] = useState(0);
  const paras = item.text.split(/\n\s*\n/);
  const quizItems = useMemo(
    () => item.blanks.map((b) => ({
      q: "(" + b.n + ") numaralı boşluğa hangi seçenek gelmeli?",
      opts: b.opts, ans: b.ans, tr: b.tr,
    })),
    [item]
  );
  const passage = (
    <div className="af-cloze-ref">
      {paras.map((para, idx) => <p key={idx} className="af-cloze-p">{para}</p>)}
    </div>
  );
  return (
    <>
      <ModuleBar title={item.title} sub={"Cloze · " + item.lv} onBack={onBack} />
      <div className="af-substage">
        {phase === "read" ? (
          <div className="af-cloze">
            <p className="af-cloze-hint">Paragrafı oku; numaralı boşlukları (1)(2)… sonra sırayla dolduracaksın.</p>
            {passage}
            <button className="af-q-next" onClick={() => setPhase("quiz")}>Boşluklara geç <ArrowRight size={15} /></button>
          </div>
        ) : phase === "quiz" ? (
          <MCQRunner items={quizItems} award={award} points={16}
            footer={passage}
            onFinish={(ok) => { setScore(ok); store.markDone("cloze:" + item.id); store.touchStreak(); setPhase("done"); }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">CLOZE TAMAM</div>
            <div className="af-result-lv">{score}/{item.blanks.length}</div>
            <p className="af-result-blurb">Yanlışların varsa paragrafa dönüp boşluğun çevresindeki ipuçlarını tekrar oku.</p>
            <button className="af-q-next af-result-go" onClick={onBack}>Diğer parçalar <ArrowRight size={16} /></button>
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
export function RestateRoom({ level, store, award, onBack }) {
  const items = useMemo(() => {
    const f = RESTATE.filter((r) => !level || lvIndex(r.lv) <= lvIndex(level));
    return f.length ? f : RESTATE;
  }, [level]);
  const quizItems = useMemo(
    () => items.map((r) => ({ q: r.stem, opts: r.opts, ans: r.ans, tr: r.tr })),
    [items]
  );
  const [phase, setPhase] = useState("quiz"); // quiz -> done
  const [score, setScore] = useState(0);
  return (
    <>
      <ModuleBar title="Anlamca En Yakın Cümle" sub="YDS · restatement" onBack={onBack} />
      <div className="af-substage">
        {RESTATE.length === 0 ? (
          <div className="af-empty"><AlertTriangle size={14} /> Henüz cümle yok — içerik kaynağından (content.json) eklenebilir.</div>
        ) : phase === "quiz" ? (
          <MCQRunner items={quizItems} award={award} points={16}
            footer={<div className="af-restate-hint"><Replace size={13} /> Cümleye anlamca en yakın seçeneği işaretle.</div>}
            onFinish={(ok) => {
              setScore(ok);
              items.forEach((r) => store.markDone("restate:" + r.id));
              store.touchStreak();
              setPhase("done");
            }} />
        ) : (
          <div className="af-result">
            <div className="af-result-cap">RESTATEMENT TAMAM</div>
            <div className="af-result-lv">{score}/{items.length}</div>
            <p className="af-result-blurb">Yanlışlarında köprü yapıyı (zıtlık, neden-sonuç, koşul, edilgen) tekrar gözden geçir.</p>
            <button className="af-q-next af-result-go" onClick={onBack}>Kataloğa dön <ArrowRight size={16} /></button>
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
  const done = remainingMs <= 0;
  const m = Math.max(0, Math.floor(remainingMs / 60000));
  const sec = Math.max(0, Math.floor((remainingMs % 60000) / 1000));
  return (
    <div className={"af-focusbar " + (done ? "is-done" : "")}>
      <span className="af-focus-ic"><Target size={16} /></span>
      {done ? (
        <span className="af-focus-time">{durationMin} dk tamam — aferin! <Trophy size={14} /></span>
      ) : (
        <span className="af-focus-time">{String(m).padStart(2, "0")}:{String(sec).padStart(2, "0")} <em>odak</em></span>
      )}
      <span className={"af-focus-dist " + (distractions > 0 ? "is-warn" : "")} title="sekme / pencere değiştirme sayısı">
        dikkat dağınıklığı: {distractions}
      </span>
      <button className="af-focus-end" onClick={onEnd}>{done ? "kapat" : "bitir"}</button>
    </div>
  );
}
