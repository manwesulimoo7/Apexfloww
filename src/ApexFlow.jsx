/* ============================================================
   APEXFLOW — root
   Persistent store + placement gate + catalog routing.
   Session combo/flow lives here; XP/streak/SRS persist via useStore.
============================================================ */
import { useState, useRef, useEffect } from "react";
import { Styles } from "./styles.jsx";
import { useStore, loadExternalContent, CONTENT_URL, SUPPORT_URL } from "./lib.js";
import { LangContext, t } from "./i18n.js";
import {
  TopHUD, Catalog, Placement, VocabReview, WordListRoom, GrammarHub,
  ListeningRoom, WritingStudio, LexicalArena, ReadingMatrix,
  SyntaxForge, PressureCooker, ArticleRoom, ClozeRoom, RestateRoom, OddoutRoom,
  DialogueRoom, ParacompRoom, TranslateRoom, ToeflIntegratedRoom, MockRoom,
  ParaphraseRoom, ErrorHuntRoom, FocusBar, SupportContext, SupportModal, ToastContext,
} from "./modules.jsx";

export default function ApexFlow() {
  const store = useStore();
  const { state } = store;
  const lang = (state.settings && state.settings.lang) || "tr";

  const [supportOpen, setSupportOpen] = useState(false);
  const openSupport = SUPPORT_URL ? () => setSupportOpen(true) : null;

  const [view, setView] = useState("catalog");
  const [ctx, setCtx] = useState({});

  // session-only flow state (resets per module / per session)
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lastGain, setLastGain] = useState(0);
  const [flash, setFlash] = useState(null); // 'ok' | 'no'
  const gainTimer = useRef(null);
  const flow = combo >= 3;

  // external content (content.json) — load at startup / on URL change / on manual refresh
  const [contentMsg, setContentMsg] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    const url = state.settings.contentUrl || CONTENT_URL;
    if (!url) { setContentMsg(""); return; }
    let alive = true;
    setContentMsg({ k: "app.contentLoading" });
    loadExternalContent(url).then((r) => {
      if (!alive) return;
      if (r.error && r.error !== "no-url") setContentMsg({ k: "app.contentFail", vars: { e: r.error } });
      else setContentMsg(r.total > 0 ? { k: "app.contentLoaded", vars: { n: r.total } } : { k: "app.contentUpToDate" });
    });
    return () => { alive = false; };
  }, [state.settings.contentUrl, reloadKey]);
  const reloadContent = () => setReloadKey((k) => k + 1);

  // focus mode (ephemeral timed session)
  const [focus, setFocus] = useState(null);          // { startedAt, endsAt, durationMin }
  const [distractions, setDistractions] = useState(0);
  const [nowTs, setNowTs] = useState(Date.now());
  useEffect(() => {
    if (!focus) return;
    const iv = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(iv);
  }, [focus]);
  useEffect(() => {
    if (!focus || typeof document === "undefined") return;
    const onHide = () => { if (document.hidden) setDistractions((d) => d + 1); };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [focus]);
  // ---- browser History API: back button navigates screens instead of leaving the site ----
  useEffect(() => {
    if (typeof window === "undefined") return;
    // seed a base entry for the catalog so the back button has somewhere to land
    if (!window.history.state || !window.history.state.view) {
      window.history.replaceState({ view: "catalog", ctx: {} }, "");
    }
    const onPop = (e) => {
      const st = e.state && e.state.view ? e.state : { view: "catalog", ctx: {} };
      applyNav(st.view, st.ctx || {});
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startFocus(min) { setDistractions(0); setNowTs(Date.now()); setFocus({ startedAt: Date.now(), endsAt: Date.now() + min * 60000, durationMin: min }); }
  function endFocus() {
    if (focus) {
      const elapsedMin = Math.floor((Date.now() - focus.startedAt) / 60000);
      const credited = Math.min(focus.durationMin, Math.max(0, elapsedMin));
      if (credited > 0) store.addFocusMinutes(credited);
    }
    setFocus(null); setDistractions(0);
  }
  const remainingMs = focus ? focus.endsAt - nowTs : 0;

  // module-facing award(points, isCorrect): keeps the original 2-arg contract,
  // tracks combo locally, and persists XP/streak through the store.
  function award(points, isCorrect) {
    if (isCorrect) {
      const gain = points * (combo >= 3 ? 2 : 1);
      const nc = combo + 1;
      setCombo(nc);
      setMaxCombo((m) => Math.max(m, nc));
      setLastGain(gain);
      setFlash("ok");
      store.award(points, true, combo);
      store.touchStreak();
    } else {
      setCombo(0);
      setLastGain(0);
      setFlash("no");
      store.award(points, false, 0);
    }
    store.addProgress(1);   // every attempt counts toward the daily goal + weekly log
    if (gainTimer.current) clearTimeout(gainTimer.current);
    gainTimer.current = setTimeout(() => { setLastGain(0); setFlash(null); }, 900);
  }

  // gentle, auto-dismissing celebration toasts (achievements, goal, freeze)
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);
  function pushToast(text) {
    const id = ++toastId.current;
    setToasts((ts) => [...ts, { id, text }]);
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 4200);
  }
  function dismissToast(id) { setToasts((ts) => ts.filter((x) => x.id !== id)); }

  // shared screen switch — keeps the original session resets in one place so
  // go(), home() and popstate (browser back) all behave identically.
  function applyNav(key, c) {
    setCtx(c || {});
    setView(key);
    setCombo(0); setLastGain(0); setFlash(null);
  }
  function go(key, c = {}) {
    applyNav(key, c);
    if (typeof window !== "undefined") window.history.pushState({ view: key, ctx: c }, "");
  }
  function home() {
    if (view === "catalog") { applyNav("catalog", {}); return; }
    // a module screen was reached via go() => one history entry to pop;
    // popstate restores the previous (catalog) screen without exiting the site.
    if (typeof window !== "undefined" && window.history.state && window.history.state.view && window.history.state.view !== "catalog") {
      window.history.back();
    } else {
      applyNav("catalog", {});
      if (typeof window !== "undefined") window.history.pushState({ view: "catalog", ctx: {} }, "");
    }
  }
  function resetSession() { setCombo(0); setMaxCombo(0); setLastGain(0); setFlash(null); }

  // ---- placement gate: no level yet => take the test first ----
  if (state.level === null) {
    return (
      <LangContext.Provider value={lang}>
        <div className={"af-root " + (state.settings.theme === "light" ? "is-light " : "")}>
          <Styles />
          <div className="af-bg" />
          <div className="af-scan" />
          <div className="af-stage">
            <Placement onDone={(lv) => { store.setLevel(lv); store.touchStreak(); setView("catalog"); }}
              onLang={(l) => store.setSetting("lang", l)} />
          </div>
          <div className="af-foot">{t(lang, "app.footPlace")}</div>
        </div>
      </LangContext.Provider>
    );
  }

  const themeCls = state.settings.theme === "light" ? "is-light " : "";
  const level = ctx.level || state.level;
  const isMock = view === "mock";

  return (
    <LangContext.Provider value={lang}>
    <ToastContext.Provider value={pushToast}>
    <SupportContext.Provider value={openSupport}>
    <div className={"af-root " + themeCls + (flow ? "af-flow " : "") + (flash ? "af-flash-" + flash : "") + (isMock ? "af-mockmode " : "")}>
      <Styles />
      <div className="af-bg" />
      <div className="af-scan" />

      {toasts.length ? (
        <div className="af-toasts">
          {toasts.map((tt) => (
            <button key={tt.id} className="af-toast" onClick={() => dismissToast(tt.id)}>{tt.text}</button>
          ))}
        </div>
      ) : null}

      {!isMock ? <TopHUD xp={state.xp} combo={combo} maxCombo={maxCombo} flow={flow} lastGain={lastGain} onReset={resetSession} /> : null}
      {!isMock && focus ? <FocusBar remainingMs={remainingMs} distractions={distractions} durationMin={focus.durationMin} onEnd={endFocus} /> : null}

      <div className="af-stage">
        {view === "catalog" && <Catalog store={store} go={go} content={{ msg: contentMsg, reload: reloadContent }} onFocus={startFocus} />}
        {view === "vocab" && <VocabReview store={store} onBack={home} />}
        {view === "wordlist" && <WordListRoom store={store} onBack={home} />}
        {view === "grammar" && <GrammarHub level={level} store={store} award={award} onBack={home} />}
        {view === "listening" && <ListeningRoom level={level} store={store} award={award} onBack={home} />}
        {view === "articles" && <ArticleRoom level={level} store={store} award={award} onBack={home} exam={ctx.exam} field={ctx.field} />}
        {view === "cloze" && <ClozeRoom level={level} store={store} award={award} onBack={home} exam={ctx.exam} field={ctx.field} />}
        {view === "restate" && <RestateRoom level={level} store={store} award={award} onBack={home} exam={ctx.exam} field={ctx.field} />}
        {view === "oddout" && <OddoutRoom level={level} store={store} award={award} onBack={home} exam={ctx.exam} field={ctx.field} />}
        {view === "dialogue" && <DialogueRoom level={level} store={store} award={award} onBack={home} exam={ctx.exam} field={ctx.field} />}
        {view === "paracomp" && <ParacompRoom level={level} store={store} award={award} onBack={home} exam={ctx.exam} field={ctx.field} />}
        {view === "translate" && <TranslateRoom level={level} store={store} award={award} onBack={home} exam={ctx.exam} field={ctx.field} />}
        {view === "toeflint" && <ToeflIntegratedRoom level={level} store={store} award={award} onBack={home} />}
        {view === "paraphrase" && <ParaphraseRoom level={level} store={store} award={award} onBack={home} />}
        {view === "errorhunt" && <ErrorHuntRoom level={level} store={store} award={award} onBack={home} />}
        {view === "writing" && <WritingStudio level={level} store={store} award={award} onBack={home} />}
        {view === "reading" && <ReadingMatrix onBack={home} award={award} />}
        {view === "lexical" && <LexicalArena onBack={home} award={award} />}
        {view === "syntax" && <SyntaxForge onBack={home} award={award} />}
        {view === "speaking" && <PressureCooker onBack={home} award={award} />}
        {view === "mock" && <MockRoom level={level} store={store} onBack={home} />}
      </div>

      {!isMock ? (
        <div className="af-foot">{t(lang, "app.foot", { lv: state.level })}</div>
      ) : null}

      {supportOpen ? <SupportModal onClose={() => setSupportOpen(false)} /> : null}
    </div>
    </SupportContext.Provider>
    </ToastContext.Provider>
    </LangContext.Provider>
  );
}
