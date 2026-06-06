import React from "react";

export function Styles() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap');

.af-root{
  --bg:#0b1118; --bg2:#0f1620; --panel:#121c27; --panel2:#18242f; --panel3:#1e2b38;
  --line:#243343; --line2:#314357; --line3:#3d5168;
  --txt:#e9eff6; --txt2:#a4b7cc; --txt3:#708698;
  --em:#10b981; --em-b:#34d399; --em-d:#0c7a5b; --em-bg:rgba(16,185,129,.10);
  --crim:#f43f5e; --crim-d:#9f1239; --crim-bg:rgba(244,63,94,.10);
  --sky:#38bdf8; --amber:#f59e0b; --gold:#fbbf24;
  --mono:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
  --serif:'Newsreader',Georgia,'Times New Roman',serif;

  position:relative; min-height:100vh; width:100%;
  background:var(--bg); color:var(--txt);
  font-family:var(--mono); font-size:14px; line-height:1.5;
  overflow-x:hidden; transition:box-shadow .35s ease;
}
.af-root *{box-sizing:border-box;}
.af-root ::selection{background:rgba(16,185,129,.3); color:#fff;}

.af-bg{
  position:fixed; inset:0; z-index:0; pointer-events:none;
  background:
    radial-gradient(900px 500px at 78% -8%, rgba(16,185,129,.13), transparent 60%),
    radial-gradient(800px 480px at 10% 8%, rgba(56,189,248,.07), transparent 60%),
    linear-gradient(180deg,#0b1118,#080d14 70%);
}
.af-bg::after{
  content:""; position:absolute; inset:0; opacity:.5;
  background-image:
    linear-gradient(rgba(60,90,120,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(60,90,120,.05) 1px, transparent 1px);
  background-size:46px 46px;
  -webkit-mask-image:radial-gradient(circle at 50% 0%, #000, transparent 80%);
          mask-image:radial-gradient(circle at 50% 0%, #000, transparent 80%);
  animation:afDrift 40s linear infinite;
}
@keyframes afDrift{to{background-position:46px 46px,46px 46px;}}
.af-scan{
  position:fixed; inset:0; z-index:1; pointer-events:none; opacity:.35;
  background:repeating-linear-gradient(180deg, rgba(255,255,255,.025) 0 1px, transparent 1px 3px);
  mix-blend-mode:overlay;
}
.af-flow{box-shadow:inset 0 0 140px rgba(16,185,129,.16), inset 0 0 0 2px rgba(16,185,129,.18);}
.af-flow .af-scan{background:repeating-linear-gradient(180deg, rgba(52,211,153,.05) 0 1px, transparent 1px 3px);}
.af-flash-ok{animation:afFlashOk .55s ease;}
.af-flash-no{animation:afFlashNo .5s ease;}
@keyframes afFlashOk{0%{box-shadow:inset 0 0 0 0 rgba(16,185,129,0);}25%{box-shadow:inset 0 0 120px rgba(16,185,129,.28);}100%{box-shadow:inset 0 0 0 0 rgba(16,185,129,0);}}
@keyframes afFlashNo{0%,100%{box-shadow:inset 0 0 0 0 rgba(244,63,94,0);}30%{box-shadow:inset 0 0 110px rgba(244,63,94,.22);}}

/* ---------- HUD ---------- */
.af-hud{position:sticky; top:0; z-index:30; background:rgba(8,12,18,.82); backdrop-filter:blur(12px);
  border-bottom:1px solid var(--line2); padding:10px 18px 8px;}
.af-hud-row{display:flex; align-items:center; gap:14px; flex-wrap:wrap;}
.af-brand{display:flex; align-items:center; gap:8px; min-width:0;}
.af-logo{width:26px; height:26px; display:grid; place-items:center; color:var(--em);
  border:1px solid var(--em-d); border-radius:7px; background:var(--em-bg); box-shadow:0 0 14px rgba(16,185,129,.25);}
.af-brand-name{font-weight:800; letter-spacing:1px; font-size:15px;}
.af-em{color:var(--em-b);} .af-em-text{color:var(--em-b);}
.af-brand-sub{color:var(--txt3); font-size:10.5px; letter-spacing:.5px;}
.af-rank{display:flex; align-items:center; gap:10px; margin-left:auto; padding:5px 12px;
  border:1px solid var(--line2); border-radius:9px; background:var(--panel);}
.af-rank-block{text-align:center; min-width:42px;}
.af-rank-label{font-size:9px; letter-spacing:1px; color:var(--txt3);}
.af-rank-val{font-size:16px; font-weight:800;}
.af-rank-sep{width:1px; height:22px; background:var(--line2);}
.af-combo{display:flex; align-items:center; gap:6px; padding:6px 11px; border-radius:9px;
  border:1px solid var(--line2); background:var(--panel); color:var(--txt2); position:relative;}
.af-combo-num{font-size:17px; font-weight:800; color:var(--txt);}
.af-combo-lbl{font-size:9px; letter-spacing:1px; color:var(--txt3);}
.af-combo-flow{border-color:var(--em-d); color:var(--em-b); background:var(--em-bg);
  box-shadow:0 0 18px rgba(16,185,129,.3); animation:afPulse 1.1s ease-in-out infinite;}
.af-combo-flow .af-combo-num,.af-combo-flow .af-combo-lbl{color:var(--em-b);}
@keyframes afPulse{0%,100%{box-shadow:0 0 12px rgba(16,185,129,.25);}50%{box-shadow:0 0 24px rgba(16,185,129,.5);}}
.af-gain{position:absolute; top:-14px; right:6px; font-size:11px; font-weight:800; color:var(--em-b);
  animation:afFloat .9s ease forwards;}
@keyframes afFloat{0%{opacity:0; transform:translateY(6px);}30%{opacity:1;}100%{opacity:0; transform:translateY(-14px);}}
.af-reset{width:30px; height:30px; display:grid; place-items:center; border-radius:8px; cursor:pointer;
  border:1px solid var(--line2); background:var(--panel); color:var(--txt2);}
.af-reset:hover{color:var(--crim); border-color:var(--crim-d);}

.af-prog-wrap{margin-top:8px;}
.af-prog-track{height:7px; border-radius:6px; background:#0a121b; border:1px solid var(--line);
  overflow:hidden;}
.af-prog-fill{height:100%; border-radius:6px; background:linear-gradient(90deg,#0e7a5b,#34d399);
  transition:width .5s cubic-bezier(.2,.8,.2,1); box-shadow:0 0 10px rgba(16,185,129,.4);}
.af-prog-flow{background:linear-gradient(90deg,#10b981,#6ee7b7); box-shadow:0 0 16px rgba(52,211,153,.6);}
.af-prog-meta{display:flex; justify-content:space-between; margin-top:4px; font-size:10px; color:var(--txt3);}
.af-prog-mid{color:var(--txt2);}

/* ---------- stage ---------- */
.af-stage{position:relative; z-index:5; max-width:1080px; margin:0 auto; padding:22px 18px 40px;}
.af-foot{position:relative; z-index:5; text-align:center; color:var(--txt3); font-size:10.5px;
  padding:0 18px 26px; letter-spacing:.3px;}

/* ---------- home ---------- */
.af-home-head{margin-bottom:20px;}
.af-boot{font-size:11.5px; color:var(--em-b); letter-spacing:1px; display:flex; align-items:center; gap:7px;}
.af-prompt-sym{color:var(--em);}
.af-caret{display:inline-block; width:8px; height:14px; background:var(--em-b); margin-left:2px;
  animation:afBlink 1s steps(1) infinite;}
@keyframes afBlink{50%{opacity:0;}}
.af-h1{font-family:var(--serif); font-weight:600; font-size:30px; line-height:1.18; margin:12px 0 8px;
  letter-spacing:-.3px;}
.af-lede{color:var(--txt2); max-width:680px; font-size:13px;}

.af-stat-strip{display:flex; gap:10px; flex-wrap:wrap; margin:18px 0 22px;}
.af-stat-chip{display:flex; align-items:center; gap:7px; padding:8px 13px; border-radius:9px;
  border:1px solid var(--line2); background:var(--panel);}
.af-stat-ic{color:var(--em-b);}
.af-stat-val{font-weight:800; font-size:15px;}
.af-stat-lbl{font-size:10px; color:var(--txt3); letter-spacing:.5px;}

.af-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:14px;}
.af-card{text-align:left; padding:18px; border-radius:14px; cursor:pointer;
  border:1px solid var(--line2); background:linear-gradient(160deg,var(--panel2),var(--panel));
  transition:transform .18s ease, border-color .18s ease, box-shadow .18s ease;}
.af-card:hover{transform:translateY(-3px); border-color:var(--em-d);
  box-shadow:0 10px 34px rgba(0,0,0,.4), 0 0 0 1px rgba(16,185,129,.25);}
.af-card-top{display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;}
.af-card-icon{width:42px; height:42px; display:grid; place-items:center; border-radius:11px;
  color:var(--em-b); background:var(--em-bg); border:1px solid var(--em-d);}
.af-card-tag{font-size:9.5px; letter-spacing:1px; color:var(--txt3); border:1px solid var(--line2);
  padding:3px 8px; border-radius:20px;}
.af-card-name{font-family:var(--serif); font-size:19px; font-weight:600; margin-bottom:6px;}
.af-card-desc{color:var(--txt2); font-size:12px; line-height:1.55; min-height:50px;}
.af-card-go{margin-top:12px; display:flex; align-items:center; gap:6px; font-size:11px; font-weight:700;
  letter-spacing:1px; color:var(--em-b);}

/* ---------- module shell ---------- */
.af-mod{animation:afIn .3s ease;}
@keyframes afIn{from{opacity:0; transform:translateY(8px);}to{opacity:1; transform:none;}}
.af-modbar{display:flex; align-items:center; gap:12px; margin-bottom:18px; padding-bottom:14px;
  border-bottom:1px solid var(--line);}
.af-back{display:flex; align-items:center; gap:4px; padding:6px 11px; border-radius:8px; cursor:pointer;
  border:1px solid var(--line2); background:var(--panel); color:var(--txt2); font-size:11px; letter-spacing:.5px;}
.af-back:hover{color:var(--txt); border-color:var(--line3);}
.af-modbar-title{display:flex; flex-direction:column; min-width:0;}
.af-modbar-name{font-weight:800; letter-spacing:1px; font-size:13px;}
.af-modbar-sub{color:var(--txt3); font-size:11px; font-family:var(--serif); font-style:italic;}
.af-modbar-right{margin-left:auto;}

.af-clock{display:flex; align-items:center; gap:6px; padding:6px 12px; border-radius:8px;
  border:1px solid var(--line2); background:var(--panel); font-weight:700; font-size:13px;}
.af-clock-warn{color:var(--crim); border-color:var(--crim-d); animation:afPulseR .8s infinite;}
@keyframes afPulseR{0%,100%{box-shadow:0 0 6px rgba(244,63,94,.2);}50%{box-shadow:0 0 18px rgba(244,63,94,.5);}}

/* ---------- lexical arena ---------- */
.af-arena{max-width:560px; margin:0 auto;}
.af-arena-q{text-align:center; padding:26px 18px; border-radius:14px; margin-bottom:18px;
  border:1px solid var(--line2); background:linear-gradient(160deg,var(--panel2),var(--panel));}
.af-arena-prompt{font-size:10px; letter-spacing:2px; color:var(--txt3); margin-bottom:10px;}
.af-arena-word{font-family:var(--serif); font-size:40px; font-weight:600; letter-spacing:-.5px;}
.af-arena-opts{display:grid; grid-template-columns:1fr 1fr; gap:11px;}
.af-opt{display:flex; align-items:center; justify-content:space-between; gap:8px; padding:15px 16px;
  border-radius:11px; cursor:pointer; font-size:15px; font-weight:500; text-align:left;
  border:1px solid var(--line2); background:var(--panel); color:var(--txt);
  transition:all .14s ease;}
.af-opt:hover:not(:disabled){border-color:var(--line3); transform:translateY(-2px); background:var(--panel2);}
.af-opt:disabled{cursor:default;}
.af-opt-correct{border-color:var(--em); background:var(--em-bg); color:var(--em-b);
  box-shadow:0 0 18px rgba(16,185,129,.3); animation:afPop .35s ease;}
.af-opt-wrong{border-color:var(--crim); background:var(--crim-bg); color:var(--crim);
  animation:afShake .4s ease;}
.af-opt-dim{opacity:.4;}
@keyframes afPop{0%{transform:scale(1);}40%{transform:scale(1.04);}100%{transform:scale(1);}}
@keyframes afShake{0%,100%{transform:translateX(0);}20%{transform:translateX(-6px);}40%{transform:translateX(6px);}60%{transform:translateX(-4px);}80%{transform:translateX(4px);}}

.af-verdict{margin-top:16px; border-radius:12px; padding:15px 16px; border:1px solid var(--line2);
  background:var(--panel); animation:afIn .25s ease;}
.af-v-ok{border-color:var(--em-d); background:linear-gradient(160deg,rgba(16,185,129,.07),var(--panel));}
.af-v-no{border-color:var(--crim-d); background:linear-gradient(160deg,rgba(244,63,94,.06),var(--panel));}
.af-verdict-head{display:flex; align-items:center; gap:7px; font-weight:800; letter-spacing:.5px;
  font-size:12px; margin-bottom:9px;}
.af-v-ok .af-verdict-head{color:var(--em-b);} .af-v-no .af-verdict-head{color:var(--crim);}
.af-verdict-body{color:var(--txt2); font-size:12.5px; line-height:1.6;}
.af-next{margin-top:13px; display:inline-flex; align-items:center; gap:7px; padding:9px 16px; cursor:pointer;
  border-radius:9px; font-weight:700; letter-spacing:.6px; font-size:11.5px;
  border:1px solid var(--em-d); background:var(--em-bg); color:var(--em-b); transition:all .15s ease;}
.af-next:hover{background:rgba(16,185,129,.18); box-shadow:0 0 16px rgba(16,185,129,.3);}
.af-next.ghost{border-color:var(--line2); background:var(--panel); color:var(--txt2);}
.af-next.ghost:hover{color:var(--txt); box-shadow:none; border-color:var(--line3);}

/* ---------- reading ---------- */
.af-xray{display:flex; align-items:center; gap:6px; padding:6px 12px; border-radius:8px; cursor:pointer;
  border:1px solid var(--line2); background:var(--panel); color:var(--txt2); font-size:11px; letter-spacing:.6px;}
.af-xray-on{color:var(--sky); border-color:#1e5170; background:rgba(56,189,248,.1);
  box-shadow:0 0 14px rgba(56,189,248,.22);}
.af-passwitch{display:flex; align-items:center; gap:9px; margin-bottom:16px; flex-wrap:wrap;}
.af-pswbtn{padding:7px 14px; border-radius:8px; cursor:pointer; font-size:11.5px; font-weight:600;
  letter-spacing:.5px; border:1px solid var(--line2); background:var(--panel); color:var(--txt2);}
.af-pswbtn-on{color:var(--txt); border-color:var(--em-d); background:var(--em-bg);}
.af-xray-legend{display:flex; gap:8px; margin-left:auto; font-size:10px; align-items:center;}
.af-leg{padding:3px 8px; border-radius:6px;}
.af-leg.em{background:var(--em-bg); color:var(--em-b); border:1px solid var(--em-d);}
.af-leg.sky{background:rgba(56,189,248,.1); color:var(--sky); border:1px solid #1e5170;}

.af-read-grid{display:grid; grid-template-columns:1.05fr 1fr; gap:18px; align-items:start;}
.af-passage{position:sticky; top:118px; border:1px solid var(--line2); border-radius:13px; padding:20px 20px 14px;
  background:linear-gradient(180deg,var(--panel2),var(--panel)); max-height:calc(100vh - 150px); overflow:auto;}
.af-passage-title{font-family:var(--serif); font-size:18px; font-weight:600; margin-bottom:12px;
  padding-bottom:10px; border-bottom:1px solid var(--line);}
.af-para{font-family:var(--serif); font-size:14.5px; line-height:1.72; color:#cdd9e7; margin:0 0 13px;}
.af-para-tag{display:inline-grid; place-items:center; width:20px; height:20px; margin-right:8px;
  font-family:var(--mono); font-size:10px; font-weight:800; color:var(--txt3);
  border:1px solid var(--line2); border-radius:5px; vertical-align:middle;}
.af-mk-em{background:rgba(16,185,129,.18); color:#a7f3d0; border-radius:3px; padding:0 2px;
  box-shadow:inset 0 -2px 0 rgba(16,185,129,.5);}
.af-mk-sky{background:rgba(56,189,248,.16); color:#bae6fd; border-radius:3px; padding:0 2px;
  box-shadow:inset 0 -2px 0 rgba(56,189,248,.5);}

.af-questions{display:flex; flex-direction:column; gap:16px;}
.af-qblock{border:1px solid var(--line2); border-radius:13px; padding:15px 15px 16px; background:var(--panel);}
.af-qhead{display:flex; align-items:center; gap:7px; font-size:11px; font-weight:800; letter-spacing:1px;
  color:var(--em-b); margin-bottom:13px; padding-bottom:9px; border-bottom:1px solid var(--line);}
.af-tf{padding:11px 0; border-bottom:1px dashed var(--line);}
.af-tf:last-child{border-bottom:none; padding-bottom:0;}
.af-tf-stmt{display:flex; gap:9px; font-size:13px; line-height:1.55; margin-bottom:9px; color:var(--txt);}
.af-tf-n{flex-shrink:0; width:19px; height:19px; display:grid; place-items:center; border-radius:5px;
  font-size:10px; font-weight:800; color:var(--txt3); border:1px solid var(--line2);}
.af-tf-opts{display:flex; gap:7px; flex-wrap:wrap;}
.af-tfbtn{padding:7px 12px; border-radius:8px; cursor:pointer; font-size:11px; font-weight:700;
  letter-spacing:.5px; border:1px solid var(--line2); background:var(--panel2); color:var(--txt2);
  transition:all .13s ease;}
.af-tfbtn:hover:not(:disabled){color:var(--txt); border-color:var(--line3); transform:translateY(-1px);}
.af-tfbtn:disabled{cursor:default;}
.af-tfbtn-correct{border-color:var(--em); background:var(--em-bg); color:var(--em-b);
  box-shadow:0 0 12px rgba(16,185,129,.25);}
.af-tfbtn-wrong{border-color:var(--crim); background:var(--crim-bg); color:var(--crim);}
.af-tfbtn-dim{opacity:.35;}
.af-mini{display:flex; gap:7px; align-items:flex-start; margin-top:10px; font-size:11.5px; line-height:1.55;
  padding:9px 11px; border-radius:8px;}
.af-mini svg{flex-shrink:0; margin-top:2px;}
.af-mini-ok{background:var(--em-bg); color:#a7f3d0; border:1px solid var(--em-d);}
.af-mini-no{background:var(--crim-bg); color:#fecdd3; border:1px solid var(--crim-d);}

.af-headlist{display:flex; flex-direction:column; gap:4px; margin-bottom:12px; padding:10px;
  border-radius:8px; background:var(--panel2); border:1px solid var(--line);}
.af-headopt{font-size:11px; color:var(--txt2);} .af-headopt b{color:var(--em-b); margin-right:6px;}
.af-headrow{padding:9px 0; border-bottom:1px dashed var(--line);}
.af-headrow:last-child{border-bottom:none;}
.af-headpara{font-size:12px; font-weight:700; color:var(--txt); margin-right:10px;}
.af-select{margin-top:6px; width:100%; padding:9px 11px; border-radius:8px; font-family:var(--mono);
  font-size:12px; cursor:pointer; border:1px solid var(--line2); background:var(--panel2); color:var(--txt);}
.af-select:focus{outline:none; border-color:var(--sky);}
.af-select-ok{border-color:var(--em); color:var(--em-b);}
.af-select-no{border-color:var(--crim); color:var(--crim);}

.af-insert-sent{font-family:var(--serif); font-style:italic; font-size:14px; color:var(--gold);
  padding:11px 13px; border-radius:9px; margin-bottom:12px;
  border:1px solid #5a4715; background:rgba(245,158,11,.08);}
.af-insert-slots{display:flex; flex-direction:column; gap:8px;}
.af-slot{display:flex; align-items:center; gap:9px; text-align:left; padding:10px 12px; border-radius:9px;
  cursor:pointer; font-size:12px; border:1px solid var(--line2); background:var(--panel2); color:var(--txt2);
  transition:all .13s ease;}
.af-slot:hover:not(:disabled){color:var(--txt); border-color:var(--line3); transform:translateX(3px);}
.af-slot:disabled{cursor:default;}
.af-slot-n{width:20px; height:20px; flex-shrink:0; display:grid; place-items:center; border-radius:5px;
  font-size:10px; font-weight:800; border:1px solid var(--line2); color:var(--txt3);}
.af-slot-ok{border-color:var(--em); background:var(--em-bg); color:var(--em-b);}
.af-slot-no{border-color:var(--crim); background:var(--crim-bg); color:var(--crim);}
.af-slot-dim{opacity:.4;}

/* ---------- syntax forge ---------- */
.af-forge-count{font-size:12px; color:var(--txt2); font-weight:700;}
.af-forge{max-width:760px; margin:0 auto;}
.af-forge-instr{color:var(--txt2); font-size:12.5px; line-height:1.6; margin-bottom:16px;
  padding:12px 14px; border-radius:10px; border:1px solid var(--line); background:var(--panel);}
.af-forge-instr b{color:var(--em-b);}
.af-build{min-height:74px; display:flex; flex-wrap:wrap; gap:8px; align-items:center; padding:14px;
  border-radius:12px; border:1.5px dashed var(--line3); background:#0a121b; margin-bottom:14px;
  transition:border-color .25s ease;}
.af-build-solved{border-style:solid; border-color:var(--em); box-shadow:inset 0 0 30px rgba(16,185,129,.12);}
.af-build-empty{color:var(--txt3); font-size:12px; font-style:italic; font-family:var(--serif);}
.af-pool{display:flex; flex-wrap:wrap; gap:8px; min-height:44px; padding:6px 0 4px;}
.af-chip{font-family:var(--serif); font-size:14px; padding:9px 13px; border-radius:9px; cursor:pointer;
  border:1px solid var(--line2); background:var(--panel2); color:var(--txt); transition:all .13s ease;}
.af-chip-pool:hover{border-color:var(--em-d); transform:translateY(-2px); background:var(--panel3);
  box-shadow:0 4px 14px rgba(0,0,0,.3);}
.af-chip-placed{border-color:var(--line3); background:var(--panel);}
.af-chip-placed:hover:not(:disabled){border-color:var(--crim-d);}
.af-chip-ok{border-color:var(--em); background:var(--em-bg); color:var(--em-b);}
.af-chip-no{border-color:var(--crim); background:var(--crim-bg); color:var(--crim);}
.af-forge-hint{margin-top:8px; font-size:11px; color:var(--txt3);}
.af-forge-actions{display:flex; gap:9px; margin-top:13px; flex-wrap:wrap;}

/* ---------- speaking ---------- */
.af-speak{max-width:620px; margin:0 auto; display:flex; flex-direction:column; align-items:center;}
.af-speak-prompt{width:100%; padding:18px 20px; border-radius:13px; margin-bottom:20px;
  border:1px solid var(--line2); background:linear-gradient(160deg,var(--panel2),var(--panel));}
.af-speak-tag{font-size:10px; letter-spacing:1.5px; color:var(--em-b); margin-bottom:9px;}
.af-speak-q{font-family:var(--serif); font-size:18px; line-height:1.5;}
.af-speak-timer{margin:6px 0 18px;}
.af-ring{--ring:0%; width:168px; height:168px; border-radius:50%; display:grid; place-items:center;
  background:conic-gradient(var(--rc,#314557) var(--ring), #0e1722 0);
  transition:background .9s linear; position:relative;}
.af-ring::before{content:""; position:absolute; inset:9px; border-radius:50%; background:var(--bg2);
  border:1px solid var(--line2);}
.af-ring.prep{--rc:var(--amber); box-shadow:0 0 30px rgba(245,158,11,.25);}
.af-ring.talk{--rc:var(--em); box-shadow:0 0 34px rgba(16,185,129,.3);}
.af-ring.danger{--rc:var(--crim); box-shadow:0 0 34px rgba(244,63,94,.4); animation:afPulseR .8s infinite;}
.af-ring.idle{--rc:var(--line3);}
.af-ring-inner{position:relative; z-index:1; text-align:center; color:var(--txt2);}
.af-ring-num{font-size:48px; font-weight:800; color:var(--txt); line-height:1;}
.af-ring-lbl{font-size:10px; letter-spacing:2px; color:var(--txt3); margin-top:4px;}

.af-kit{width:100%; padding:14px 16px; border-radius:12px; margin-bottom:16px;
  border:1px solid #5a4715; background:rgba(245,158,11,.07);}
.af-kit-head{display:flex; align-items:center; gap:7px; font-size:11px; font-weight:800; letter-spacing:1px;
  color:var(--gold); margin-bottom:11px;}
.af-kit-items{display:flex; flex-wrap:wrap; gap:8px;}
.af-kit-chip{font-family:var(--serif); font-style:italic; font-size:14px; padding:7px 13px; border-radius:8px;
  border:1px solid #6b5417; background:rgba(245,158,11,.1); color:var(--gold);}

.af-speak-controls{width:100%; display:flex; flex-direction:column; align-items:center; gap:13px;}
.af-start-big{display:inline-flex; align-items:center; gap:9px; padding:13px 22px; cursor:pointer;
  border-radius:11px; font-weight:800; letter-spacing:.6px; font-size:12.5px;
  border:1px solid var(--em-d); background:var(--em-bg); color:var(--em-b); transition:all .15s ease;}
.af-start-big:hover{background:rgba(16,185,129,.18); box-shadow:0 0 22px rgba(16,185,129,.35); transform:translateY(-2px);}
.af-speak-tip{display:flex; gap:8px; align-items:flex-start; color:var(--txt2); font-size:12px; line-height:1.6;
  padding:11px 14px; border-radius:10px; border:1px solid var(--line); background:var(--panel); max-width:540px;}
.af-speak-tip svg{flex-shrink:0; margin-top:2px; color:var(--gold);}

.af-review{width:100%; display:flex; flex-direction:column; align-items:center; gap:13px;}
.af-review-head{font-size:13px; color:var(--txt); font-weight:600;}
.af-review-items{display:flex; flex-direction:column; gap:9px; width:100%; max-width:460px;}
.af-rev-chip{display:flex; align-items:center; gap:9px; padding:11px 14px; border-radius:10px; cursor:pointer;
  font-family:var(--serif); font-size:14px; text-align:left; border:1px solid var(--line2);
  background:var(--panel); color:var(--txt2); transition:all .14s ease;}
.af-rev-chip:hover:not(:disabled){border-color:var(--line3);}
.af-rev-chip.on{border-color:var(--em); background:var(--em-bg); color:var(--em-b);}
.af-rev-chip svg{flex-shrink:0;}

/* ---------- responsive ---------- */
@media (max-width:860px){
  .af-grid{grid-template-columns:1fr;}
  .af-read-grid{grid-template-columns:1fr;}
  .af-passage{position:static; max-height:none;}
  .af-h1{font-size:24px;}
  .af-arena-word{font-size:32px;}
  .af-rank{order:3; margin-left:0;}
  .af-brand{order:1;} .af-combo{order:2; margin-left:auto;} .af-reset{order:4;}
}
@media (max-width:520px){
  .af-stage{padding:16px 12px 30px;}
  .af-arena-opts{grid-template-columns:1fr;}
  .af-ring{width:148px; height:148px;}
  .af-ring-num{font-size:40px;}
  .af-brand-sub{display:none;}
}


/* ============================================================
   v2 :: catalog · placement · MCQ · SRS · grammar · listening · writing
============================================================ */
.af-catalog{max-width:1000px;}
.af-cat-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px;}
.af-cat-badge{display:flex;align-items:center;gap:8px;background:var(--panel2);border:1px solid var(--line2);border-radius:12px;padding:8px 12px;}
.af-cat-badge-id{font-family:var(--mono);font-weight:700;color:var(--em);font-size:18px;letter-spacing:.04em;}
.af-cat-badge-label{color:var(--txt2);font-size:13px;}
.af-cat-retake{margin-left:6px;display:inline-flex;align-items:center;gap:4px;background:transparent;border:1px solid var(--line2);color:var(--txt3);border-radius:8px;padding:3px 7px;font-size:11px;cursor:pointer;font-family:var(--mono);}
.af-cat-retake:hover{color:var(--em);border-color:var(--em-d);}
.af-cat-stats{display:flex;gap:14px;flex-wrap:wrap;}
.af-cat-stat{display:inline-flex;align-items:center;gap:5px;color:var(--txt2);font-size:13px;font-family:var(--mono);}
.af-cat-stat svg{color:var(--em);}
.af-srs-cta{width:100%;display:flex;justify-content:space-between;align-items:center;gap:12px;background:linear-gradient(135deg,var(--em-bg),transparent);border:1px solid var(--em-d);border-radius:14px;padding:14px 16px;cursor:pointer;color:var(--txt);margin-bottom:16px;transition:.15s;}
.af-srs-cta:hover{border-color:var(--em);transform:translateY(-1px);}
.af-srs-cta-l{display:flex;align-items:center;gap:12px;}
.af-srs-cta-l>svg{color:var(--em);}
.af-srs-cta-title{font-weight:600;font-size:15px;}
.af-srs-cta-sub{color:var(--txt2);font-size:12.5px;margin-top:2px;}
.af-tabs{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;}
.af-tab{display:inline-flex;align-items:center;gap:7px;background:var(--panel);border:1px solid var(--line2);color:var(--txt2);border-radius:10px;padding:9px 14px;cursor:pointer;font-size:13.5px;font-family:var(--mono);}
.af-tab.is-on{background:var(--em-bg);border-color:var(--em);color:var(--em-b);}
.af-lvchips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;}
.af-lvchip{display:flex;flex-direction:column;align-items:center;gap:1px;background:var(--panel);border:1px solid var(--line2);border-radius:10px;padding:8px 12px;min-width:64px;cursor:pointer;position:relative;}
.af-lvchip-id{font-family:var(--mono);font-weight:700;color:var(--txt);font-size:15px;}
.af-lvchip-label{color:var(--txt3);font-size:10.5px;}
.af-lvchip.is-active{border-color:var(--em);background:var(--em-bg);}
.af-lvchip.is-active .af-lvchip-id{color:var(--em);}
.af-lvchip.is-you::after{content:"sen";position:absolute;top:-7px;right:-6px;background:var(--em);color:#04130d;font-family:var(--mono);font-size:9px;padding:1px 5px;border-radius:6px;font-weight:700;}
.af-lvblurb{color:var(--txt2);font-size:13px;margin:2px 0 14px;font-style:italic;}
.af-exam-list{display:flex;flex-direction:column;gap:12px;}
.af-exam-card{background:var(--panel);border:1px solid var(--line2);border-radius:14px;overflow:hidden;}
.af-exam-card.is-locked{opacity:.72;}
.af-exam-top{width:100%;text-align:left;background:transparent;border:0;color:var(--txt);padding:14px 16px;cursor:pointer;display:block;}
.af-exam-card.is-locked .af-exam-top{cursor:default;}
.af-exam-id{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.af-exam-name{font-weight:600;font-size:16px;}
.af-exam-score{font-family:var(--mono);font-size:11px;color:var(--em-b);background:var(--em-bg);border:1px solid var(--em-d);padding:2px 7px;border-radius:6px;}
.af-exam-soon{display:inline-flex;align-items:center;gap:4px;font-family:var(--mono);font-size:11px;color:var(--amber);background:rgba(245,158,11,.1);border:1px solid #7c4d09;padding:2px 7px;border-radius:6px;}
.af-exam-skills{color:var(--txt3);font-size:12px;font-family:var(--mono);margin-top:6px;}
.af-exam-blurb{color:var(--txt2);font-size:13px;margin-top:8px;line-height:1.5;}
.af-exam-expand{display:inline-flex;align-items:center;gap:5px;color:var(--em);font-size:12.5px;margin-top:10px;font-family:var(--mono);}
.af-exam-expand .af-rot{transform:rotate(90deg);}
.af-exam-mods{padding:0 16px 16px;}
.af-settings{margin-top:22px;padding-top:16px;border-top:1px solid var(--line);}
.af-toggle{display:inline-flex;align-items:center;gap:9px;color:var(--txt2);font-size:13px;cursor:pointer;}
.af-toggle input{width:16px;height:16px;accent-color:var(--em);}
.af-toggle span{display:inline-flex;align-items:center;gap:6px;}
.af-done-badge{color:var(--em);margin-left:6px;vertical-align:middle;}
.af-mcq{max-width:680px;margin:0 auto;}
.af-q-prog{font-family:var(--mono);font-size:11.5px;color:var(--txt3);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;}
.af-q-text{font-size:19px;color:var(--txt);font-weight:500;line-height:1.5;margin-bottom:16px;font-family:var(--serif);}
.af-mcq-opts{display:flex;flex-direction:column;gap:9px;}
.af-mcq-opt{display:flex;align-items:center;gap:11px;text-align:left;background:var(--panel);border:1px solid var(--line2);color:var(--txt);border-radius:11px;padding:12px 14px;cursor:pointer;font-size:15px;transition:.12s;}
.af-mcq-opt:hover:not(:disabled){border-color:var(--line3);background:var(--panel2);}
.af-mcq-key{font-family:var(--mono);font-size:12px;color:var(--txt3);border:1px solid var(--line2);border-radius:6px;width:22px;height:22px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.af-mcq-opt.is-correct{border-color:var(--em);background:var(--em-bg);color:var(--em-b);}
.af-mcq-opt.is-correct .af-mcq-key{border-color:var(--em);color:var(--em);}
.af-mcq-opt.is-wrong{border-color:var(--crim);background:var(--crim-bg);color:#fda4b4;}
.af-mcq-opt.is-dim{opacity:.45;}
.af-mcq-ic{margin-left:auto;}
.af-q-exp{margin-top:13px;background:var(--panel2);border:1px solid var(--line2);border-left:3px solid var(--em);border-radius:8px;padding:10px 13px;color:var(--txt2);font-size:13.5px;line-height:1.55;display:flex;gap:8px;align-items:flex-start;}
.af-q-exp svg{color:var(--gold);flex-shrink:0;margin-top:2px;}
.af-q-next{display:inline-flex;align-items:center;gap:8px;margin-top:16px;background:var(--em);color:#04130d;border:0;border-radius:10px;padding:11px 18px;font-weight:600;font-size:14px;cursor:pointer;font-family:inherit;transition:.12s;}
.af-q-next:hover:not(:disabled){background:var(--em-b);}
.af-q-next:disabled{background:var(--panel3);color:var(--txt3);cursor:not-allowed;}
.af-place{max-width:680px;margin:0 auto;}
.af-place-head{margin-bottom:18px;}
.af-place-prog{margin-bottom:20px;}
.af-result{max-width:520px;margin:6px auto;text-align:center;background:var(--panel);border:1px solid var(--line2);border-radius:16px;padding:30px 26px;}
.af-result-cap{font-family:var(--mono);font-size:11px;letter-spacing:.18em;color:var(--txt3);text-transform:uppercase;}
.af-result-lv{font-family:var(--mono);font-size:54px;font-weight:700;color:var(--em);line-height:1.1;margin:6px 0;}
.af-result-label{font-size:18px;color:var(--txt);font-weight:600;}
.af-result-blurb{color:var(--txt2);font-size:14px;line-height:1.6;margin:12px 0;}
.af-result-score{font-family:var(--mono);color:var(--em-b);font-size:14px;margin:6px 0;}
.af-result-note{color:var(--txt3);font-size:12.5px;line-height:1.6;margin-top:14px;}
.af-result-go{margin-top:18px;}
.af-result-trophy{color:var(--gold);margin:6px auto 4px;display:block;}
.af-modbar-count{font-family:var(--mono);font-size:12px;color:var(--txt3);}
.af-srs{max-width:520px;margin:10px auto;background:var(--panel);border:1px solid var(--line2);border-radius:16px;padding:30px 26px;text-align:center;min-height:230px;display:flex;flex-direction:column;justify-content:center;}
.af-srs-lv{font-family:var(--mono);font-size:11px;color:var(--txt3);letter-spacing:.1em;text-transform:uppercase;}
.af-srs-word{font-family:var(--serif);font-size:40px;color:var(--txt);font-weight:600;margin:10px 0;}
.af-srs-reveal{display:inline-flex;align-items:center;gap:7px;margin:8px auto 0;background:var(--panel2);border:1px solid var(--line2);color:var(--txt2);border-radius:10px;padding:9px 16px;cursor:pointer;font-size:13.5px;}
.af-srs-reveal:hover{border-color:var(--em-d);color:var(--em-b);}
.af-srs-back{margin:6px 0 4px;}
.af-srs-tr{font-size:20px;color:var(--em-b);font-weight:500;}
.af-srs-ex{color:var(--txt2);font-style:italic;font-family:var(--serif);font-size:15px;margin-top:8px;}
.af-srs-grades{display:flex;gap:8px;justify-content:center;margin-top:20px;flex-wrap:wrap;}
.af-srs-grade{border:1px solid var(--line2);background:var(--panel2);color:var(--txt);border-radius:10px;padding:10px 16px;cursor:pointer;font-size:13.5px;font-weight:500;transition:.12s;}
.af-srs-grade.is-again{border-color:var(--crim-d);}
.af-srs-grade.is-again:hover{background:var(--crim-bg);border-color:var(--crim);color:#fda4b4;}
.af-srs-grade.is-good:hover{background:var(--em-bg);border-color:var(--em);color:var(--em-b);}
.af-srs-grade.is-easy{border-color:var(--em-d);color:var(--em-b);}
.af-srs-grade.is-easy:hover{background:var(--em-bg);border-color:var(--em);}
.af-lesson{max-width:680px;margin:0 auto;}
.af-lesson-exp{background:var(--panel);border:1px solid var(--line2);border-left:3px solid var(--em);border-radius:10px;padding:18px 20px;color:var(--txt);font-size:15.5px;line-height:1.75;font-family:var(--serif);}
.af-play{max-width:680px;margin:0 auto 8px;background:var(--panel);border:1px solid var(--line2);border-radius:14px;padding:18px;}
.af-play-row{display:flex;align-items:center;gap:14px;}
.af-play-btn{width:54px;height:54px;border-radius:50%;background:var(--em);color:#04130d;border:0;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:.12s;}
.af-play-btn:hover{background:var(--em-b);transform:scale(1.04);}
.af-play-title{display:flex;align-items:center;gap:7px;color:var(--txt);font-weight:600;font-size:15px;}
.af-play-sub{color:var(--txt3);font-size:12px;margin-top:3px;}
.af-transcript-toggle{display:inline-flex;align-items:center;gap:6px;margin-top:14px;background:transparent;border:1px solid var(--line2);color:var(--txt2);border-radius:8px;padding:6px 11px;cursor:pointer;font-size:12px;font-family:var(--mono);}
.af-transcript-toggle:hover{border-color:var(--line3);color:var(--txt);}
.af-transcript{margin-top:12px;background:var(--bg2);border:1px solid var(--line);border-radius:10px;padding:14px 16px;color:var(--txt2);font-size:14.5px;line-height:1.7;font-family:var(--serif);}
.af-listen-go{display:flex;margin:14px auto 0;}
.af-empty{max-width:680px;margin:0 auto 14px;display:flex;align-items:center;gap:8px;background:rgba(245,158,11,.08);border:1px solid #7c4d09;border-radius:10px;padding:11px 14px;color:var(--amber);font-size:13px;}
.af-empty svg{flex-shrink:0;}
.af-write{max-width:720px;margin:0 auto;}
.af-write-cap{font-family:var(--mono);font-size:10px;letter-spacing:.14em;color:var(--em);background:var(--em-bg);border:1px solid var(--em-d);border-radius:5px;padding:2px 6px;margin-right:8px;text-transform:uppercase;}
.af-write-prompt{background:var(--panel);border:1px solid var(--line2);border-radius:11px;padding:16px;color:var(--txt);font-size:16px;line-height:1.6;font-family:var(--serif);}
.af-write-tips{margin-top:12px;display:flex;gap:8px;align-items:flex-start;color:var(--txt2);font-size:13.5px;line-height:1.6;}
.af-write-tips svg{color:var(--gold);flex-shrink:0;margin-top:2px;}
.af-write-struct{margin-top:12px;color:var(--txt2);font-size:13.5px;line-height:1.7;background:var(--panel2);border:1px solid var(--line2);border-radius:10px;padding:12px 14px;}
.af-write-area{width:100%;margin-top:14px;min-height:240px;background:var(--bg2);border:1px solid var(--line2);border-radius:11px;padding:14px 16px;color:var(--txt);font-size:15px;line-height:1.7;font-family:var(--serif);resize:vertical;box-sizing:border-box;}
.af-write-area:focus{outline:none;border-color:var(--em-d);}
.af-write-meta{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:12px;flex-wrap:wrap;}
.af-write-meta span{font-family:var(--mono);font-size:13px;color:var(--txt3);}
.af-write-meta span.is-ok{color:var(--em);}
.af-write-done{display:inline-flex;align-items:center;gap:6px;color:var(--em);font-family:var(--mono);font-size:13px;}
.af-write-note{margin-top:16px;color:var(--txt3);font-size:12px;line-height:1.6;border-top:1px solid var(--line);padding-top:12px;}
@media (max-width:520px){
  .af-q-text{font-size:17px;}
  .af-srs-word{font-size:32px;}
  .af-result-lv{font-size:44px;}
  .af-lvchip{min-width:0;flex:1;}
}


/* ===== writing scorer + api key ===== */
.af-score-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;}
.af-score-btn{display:inline-flex;align-items:center;gap:7px;background:var(--panel2);border:1px solid var(--line2);color:var(--txt);border-radius:10px;padding:9px 14px;cursor:pointer;font-size:13.5px;transition:.12s;}
.af-score-btn:hover:not(:disabled){border-color:var(--line3);}
.af-score-btn:disabled{opacity:.5;cursor:not-allowed;}
.af-score-btn.is-ai{border-color:var(--em-d);color:var(--em-b);background:var(--em-bg);}
.af-score-btn.is-ai:hover:not(:disabled){border-color:var(--em);}
.af-analysis{margin-top:14px;background:var(--panel);border:1px solid var(--line2);border-radius:12px;padding:16px;}
.af-analysis-head{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;}
.af-band{font-family:var(--mono);font-size:26px;font-weight:700;color:var(--em);}
.af-band-cap{color:var(--txt3);font-size:11.5px;font-family:var(--mono);}
.af-analysis-grid{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0;}
.af-analysis-grid span{font-family:var(--mono);font-size:12px;color:var(--txt2);background:var(--panel2);border:1px solid var(--line2);border-radius:7px;padding:4px 9px;}
.af-analysis-notes{margin:6px 0 0;padding-left:18px;color:var(--txt2);font-size:13.5px;line-height:1.65;}
.af-analysis-notes li{margin-bottom:6px;}
.af-ai-out{margin-top:14px;background:var(--bg2);border:1px solid var(--em-d);border-left:3px solid var(--em);border-radius:10px;padding:16px 18px;color:var(--txt);font-size:14px;line-height:1.7;white-space:pre-wrap;font-family:var(--serif);}
.af-ai-err{margin-top:14px;background:var(--crim-bg);border:1px solid var(--crim-d);border-radius:10px;padding:12px 14px;color:#fda4b4;font-size:13px;display:flex;flex-wrap:wrap;align-items:center;gap:8px;}
.af-ai-err-hint{flex-basis:100%;color:var(--txt3);font-size:12px;margin-top:4px;}
.af-keyrow{margin-top:16px;}
.af-keylabel{display:flex;align-items:center;gap:6px;color:var(--txt2);font-size:12.5px;margin-bottom:7px;}
.af-keylabel svg{color:var(--em);}
.af-keyinput{width:100%;max-width:420px;background:var(--bg2);border:1px solid var(--line2);border-radius:9px;padding:9px 12px;color:var(--txt);font-family:var(--mono);font-size:13px;box-sizing:border-box;}
.af-keyinput:focus{outline:none;border-color:var(--em-d);}
.af-keynote{color:var(--txt3);font-size:11.5px;line-height:1.55;margin-top:6px;max-width:560px;}


/* ===== feedback batch: selected state, type tag, dialogue, theme ===== */
.af-mcq-opt.is-sel{border-color:var(--em-b);background:var(--em-bg);}
.af-mcq-opt.is-sel .af-mcq-key{border-color:var(--em-b);color:var(--em-b);}
.af-q-tag{display:inline-block;font-family:var(--mono);font-size:10.5px;letter-spacing:.07em;text-transform:uppercase;color:var(--em-b);background:var(--em-bg);border:1px solid var(--em-d);border-radius:6px;padding:2px 8px;margin-bottom:10px;}
.af-dialogue{margin-top:12px;display:flex;flex-direction:column;gap:8px;}
.af-dline{max-width:84%;padding:9px 13px;border-radius:13px;font-size:14.5px;line-height:1.5;font-family:var(--serif);}
.af-dline-a{align-self:flex-start;background:var(--panel2);border:1px solid var(--line2);border-bottom-left-radius:4px;color:var(--txt);}
.af-dline-b{align-self:flex-end;background:var(--em-bg);border:1px solid var(--em-d);border-bottom-right-radius:4px;color:var(--txt);}
.af-theme-quick{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;border:1px solid var(--line2);background:var(--panel2);color:var(--txt2);cursor:pointer;transition:.12s;}
.af-theme-quick:hover{color:var(--em);border-color:var(--em-d);}
.af-theme{margin-top:14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
.af-theme-cap{display:inline-flex;align-items:center;gap:6px;color:var(--txt2);font-size:13px;}
.af-theme-cap svg{color:var(--em);}
.af-seg{display:inline-flex;border:1px solid var(--line2);border-radius:9px;overflow:hidden;}
.af-seg-btn{display:inline-flex;align-items:center;gap:5px;background:var(--panel);border:0;color:var(--txt2);padding:7px 13px;cursor:pointer;font-size:12.5px;font-family:var(--mono);}
.af-seg-btn.is-on{background:var(--em-bg);color:var(--em-b);}
.af-seg-btn+.af-seg-btn{border-left:1px solid var(--line2);}

/* ===== LIGHT THEME ===== */
.af-root.is-light{
  --bg:#f4f7fb; --bg2:#eef2f8; --panel:#ffffff; --panel2:#f4f7fb; --panel3:#e8eef6;
  --line:#e2e9f1; --line2:#cfdae6; --line3:#b6c5d6;
  --txt:#11202f; --txt2:#48596c; --txt3:#73849a;
  --em:#0ea674; --em-b:#0a7d57; --em-d:#0ea674; --em-bg:rgba(14,166,116,.12);
  --crim:#e11d48; --crim-d:#e11d48; --crim-bg:rgba(225,29,72,.10);
  --sky:#0284c7; --amber:#b45309; --gold:#b45309;
}
.af-root.is-light .af-bg{
  background:
    radial-gradient(900px 500px at 78% -8%, rgba(14,166,116,.10), transparent 60%),
    radial-gradient(800px 480px at 10% 8%, rgba(2,132,199,.06), transparent 60%),
    linear-gradient(180deg,#f8fafc,#eef2f8 70%);
}
.af-root.is-light .af-bg::after{background-image:linear-gradient(rgba(80,110,140,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(80,110,140,.06) 1px,transparent 1px);}
.af-root.is-light .af-scan{opacity:.12;background:repeating-linear-gradient(180deg, rgba(0,0,0,.02) 0 1px, transparent 1px 3px);}
.af-root.is-light ::selection{background:rgba(14,166,116,.25);color:#06281c;}
.af-root.is-light .af-mcq-opt.is-wrong{color:#be123c;}
.af-root.is-light .af-srs-grade.is-again:hover{color:#be123c;}
.af-root.is-light .af-ai-err{color:#be123c;}
.af-root.is-light .af-empty,.af-root.is-light .af-exam-soon{border-color:#d9a441;}


/* ===== module icon colour-coding ===== */
.af-card-icon.af-ic-vocab{color:#f59e0b;background:rgba(245,158,11,.12);}
.af-card-icon.af-ic-grammar{color:#38bdf8;background:rgba(56,189,248,.12);}
.af-card-icon.af-ic-listening{color:#a78bfa;background:rgba(167,139,250,.12);}
.af-card-icon.af-ic-reading{color:#34d399;background:rgba(16,185,129,.12);}
.af-card-icon.af-ic-lexical{color:#fb7185;background:rgba(244,63,94,.12);}
.af-card-icon.af-ic-syntax{color:#fbbf24;background:rgba(251,191,36,.12);}
.af-card-icon.af-ic-speaking{color:#22d3ee;background:rgba(34,211,238,.12);}
.af-card-icon.af-ic-writing{color:#818cf8;background:rgba(129,140,248,.12);}

/* ===== daily tasks panel ===== */
.af-daily{background:var(--panel);border:1px solid var(--line2);border-radius:14px;padding:14px 16px;margin-bottom:16px;}
.af-daily-head{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;color:var(--txt);font-family:var(--mono);text-transform:uppercase;letter-spacing:.05em;}
.af-daily-head svg{color:var(--em);}
.af-daily-prog{margin-left:auto;font-family:var(--mono);font-size:12px;color:var(--em-b);background:var(--em-bg);border:1px solid var(--em-d);border-radius:6px;padding:1px 8px;}
.af-daily-list{display:flex;flex-direction:column;gap:9px;margin-top:12px;}
.af-task{display:flex;align-items:center;gap:10px;}
.af-task-ic{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:7px;border:1px solid var(--line2);color:var(--txt3);background:var(--panel2);flex-shrink:0;}
.af-task.is-done .af-task-ic{color:var(--em);border-color:var(--em-d);background:var(--em-bg);}
.af-task-label{font-size:13.5px;color:var(--txt);min-width:118px;}
.af-task.is-done .af-task-label{color:var(--txt2);}
.af-task-count{font-family:var(--mono);font-size:11.5px;color:var(--txt3);width:44px;text-align:right;}
.af-task-bar{flex:1;height:6px;border-radius:4px;background:var(--panel3);overflow:hidden;}
.af-task-bar>i{display:block;height:100%;background:var(--em);border-radius:4px;transition:width .4s ease;}
.af-task.is-done .af-task-bar>i{background:var(--em-b);}
.af-daily-done{margin-top:12px;text-align:center;color:var(--em-b);font-size:13px;background:var(--em-bg);border:1px solid var(--em-d);border-radius:9px;padding:8px;}

/* ===== per-level progress bar in chips ===== */
.af-lvchip-bar{display:block;width:100%;height:3px;border-radius:3px;background:var(--line2);overflow:hidden;margin-top:5px;}
.af-lvchip-bar>i{display:block;height:100%;background:var(--em);border-radius:3px;transition:width .4s ease;}
.af-lvchip.is-active .af-lvchip-bar{background:rgba(16,185,129,.22);}

/* ===== listening note pad ===== */
.af-notes{width:100%;max-width:680px;margin:12px auto 0;display:block;min-height:90px;background:var(--bg2);border:1px solid var(--line2);border-radius:11px;padding:11px 14px;color:var(--txt);font-size:14px;line-height:1.6;font-family:var(--mono);resize:vertical;box-sizing:border-box;}
.af-notes:focus{outline:none;border-color:var(--em-d);}


/* ===== achievements / badges ===== */
.af-badges{margin-top:22px;border-top:1px solid var(--line);padding-top:16px;}
.af-badges-head{display:flex;align-items:center;gap:8px;width:100%;background:transparent;border:0;color:var(--txt);cursor:pointer;font-family:var(--mono);font-size:12.5px;text-transform:uppercase;letter-spacing:.05em;font-weight:600;}
.af-badges-head>svg:first-child{color:var(--gold);}
.af-badges-title{color:var(--em-b);background:var(--em-bg);border:1px solid var(--em-d);border-radius:6px;padding:1px 8px;font-size:11px;text-transform:none;letter-spacing:0;}
.af-badges-count{margin-left:auto;color:var(--txt3);font-size:12px;}
.af-badges-head .af-rot{transform:rotate(90deg);}
.af-badges-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-top:14px;}
.af-badges-cats{margin-top:6px;}
.af-badge-cat{margin-top:16px;}
.af-badge-cat:first-child{margin-top:8px;}
.af-badge-cat-head{display:flex;align-items:center;gap:10px;border-bottom:1px dashed var(--line2);padding-bottom:6px;}
.af-badge-cat-name{font-family:var(--mono);font-size:11.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--em-b);font-weight:700;}
.af-badge-cat-count{margin-left:auto;font-family:var(--mono);font-size:11px;color:var(--txt3);}
.af-badge-cat .af-badges-grid{margin-top:10px;}
.af-badge{background:var(--panel);border:1px solid var(--line2);border-radius:11px;padding:12px;text-align:center;opacity:.5;}
.af-badge.is-got{opacity:1;border-color:var(--em-d);}
.af-badge-ic{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:10px;background:var(--panel2);border:1px solid var(--line2);color:var(--txt3);margin-bottom:8px;}
.af-badge.is-got .af-badge-ic{color:var(--gold);background:rgba(251,191,36,.12);border-color:#7c5a09;}
.af-badge-name{display:block;font-size:13px;font-weight:600;color:var(--txt);}
.af-badge-desc{display:block;font-size:11px;color:var(--txt3);margin-top:3px;line-height:1.4;}
@media (max-width:520px){ .af-badges-grid{grid-template-columns:repeat(2,1fr);} }


/* ===== articles (simple reading) ===== */
.af-card-icon.af-ic-articles{color:#2dd4bf;background:rgba(45,212,191,.12);}
.af-article{max-width:680px;margin:0 auto;}
.af-article-p{color:var(--txt);font-size:16px;line-height:1.8;font-family:var(--serif);margin:0 0 15px;}

/* ===== cloze (gap-fill) ===== */
.af-card-icon.af-ic-cloze{color:#c084fc;background:rgba(192,132,252,.12);}
.af-cloze{max-width:680px;margin:0 auto;}
.af-cloze-hint{color:var(--txt2);font-size:12.5px;font-family:var(--mono);margin:0 0 12px;}
.af-cloze-ref{max-width:680px;margin:0 auto;}
.af-cloze-p{color:var(--txt);font-size:16px;line-height:1.9;font-family:var(--serif);margin:0 0 14px;}
.af-mcq .af-cloze-ref{margin-top:18px;padding-top:14px;border-top:1px solid var(--line2);}
.af-mcq .af-cloze-p{font-size:14.5px;line-height:1.8;color:var(--txt2);}

/* ===== restate (closest-in-meaning sentence) ===== */
.af-card-icon.af-ic-restate{color:#f472b6;background:rgba(244,114,182,.12);}
.af-restate-hint{display:flex;align-items:center;gap:6px;margin-top:16px;color:var(--txt2);font-size:12.5px;font-family:var(--mono);}

/* ===== oddout (irrelevant sentence) ===== */
.af-card-icon.af-ic-oddout{color:#fbbf24;background:rgba(251,191,36,.12);}
.af-oddout{display:flex;flex-direction:column;gap:9px;}
.af-oddout-s{color:var(--txt);font-size:15px;line-height:1.7;font-family:var(--serif);margin:0;display:flex;gap:9px;align-items:baseline;}
.af-oddout-n{flex:none;min-width:28px;font-family:var(--mono);font-size:12px;font-weight:700;color:var(--em-b);}

/* ===== dialogue (dialogue completion) ===== */
.af-card-icon.af-ic-dialogue{color:#38bdf8;background:rgba(56,189,248,.12);}
.af-dialogue{display:flex;flex-direction:column;gap:10px;}
.af-dlg-line{color:var(--txt);font-size:15px;line-height:1.6;font-family:var(--serif);margin:0;display:flex;gap:9px;align-items:baseline;}
.af-dlg-sp{flex:none;min-width:20px;font-family:var(--mono);font-size:12px;font-weight:700;color:var(--em-b);}
.af-dlg-line.is-blank .af-dlg-t{color:var(--em-b);font-weight:700;letter-spacing:1px;}

/* ===== paracomp (paragraph completion) ===== */
.af-card-icon.af-ic-paracomp{color:#34d399;background:rgba(16,185,129,.12);}
.af-paracomp-p{color:var(--txt);font-size:16px;line-height:1.85;font-family:var(--serif);margin:0;}
.af-paracomp-gap{color:var(--em-b);font-weight:700;font-family:var(--mono);letter-spacing:1px;}

/* ===== translate (translation) ===== */
.af-card-icon.af-ic-translate{color:#c084fc;background:rgba(192,132,252,.12);}
.af-translate{display:flex;flex-direction:column;gap:8px;}
.af-tr-dir{font-family:var(--mono);font-size:11.5px;color:var(--txt2);text-transform:uppercase;letter-spacing:.5px;}
.af-tr-source{color:var(--txt);font-size:16px;line-height:1.7;font-family:var(--serif);}

/* ===== TOEFL integrated (multi-stage) ===== */
.af-card-icon.af-ic-toeflint{color:#f97316;background:rgba(249,115,22,.12);}
.af-ti{max-width:720px;margin:0 auto;}
.af-ti-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;flex-wrap:wrap;}
.af-ti-step{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:12px;color:var(--em-b);text-transform:uppercase;letter-spacing:.5px;}
.af-ti-clock{display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:13px;color:var(--txt);background:var(--panel2);border:1px solid var(--line2);border-radius:8px;padding:4px 10px;}
.af-ti-clock.is-up{color:#fbbf24;border-color:rgba(251,191,36,.4);}
.af-ti-note{display:flex;align-items:center;gap:7px;color:var(--txt2);font-size:13px;line-height:1.5;margin:0 0 12px;font-family:var(--mono);}
.af-ti-lecture{margin-top:12px;padding-top:12px;border-top:1px solid var(--line2);}
.af-ti-readback{background:var(--panel2);border:1px solid var(--line2);border-radius:10px;padding:12px 14px;margin:6px 0 12px;max-height:230px;overflow:auto;}
.af-ti-readback-cap{display:flex;align-items:center;gap:6px;font-family:var(--mono);font-size:11px;color:var(--txt2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;}
.af-ti-readback-p{color:var(--txt2);font-size:14px;line-height:1.7;font-family:var(--serif);margin:0 0 10px;}
.af-ti-speak{display:flex;flex-direction:column;gap:12px;align-items:flex-start;padding:8px 0;}
.af-ti-bigclock{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:22px;font-weight:700;color:var(--txt);}
.af-ti-bigclock.is-live{color:#f97316;}
.af-ti-aimode{font-family:var(--mono);font-size:11.5px;color:var(--txt2);}
.af-ti-feedback{white-space:pre-wrap;text-align:left;margin-top:14px;}

/* ===== placement: skip / level-pick ===== */
.af-place-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap;}
.af-place-actions .af-q-next{flex:1;}
.af-place-skip{background:var(--panel2);border:1px solid var(--line2);color:var(--txt2);border-radius:10px;padding:11px 16px;font-size:13px;cursor:pointer;font-family:var(--mono);white-space:nowrap;}
.af-place-skip:hover{border-color:var(--em-d);color:var(--em-b);}
.af-place-skiptest{margin-top:14px;display:inline-flex;align-items:center;gap:6px;background:none;border:1px solid var(--line2);color:var(--txt2);border-radius:10px;padding:8px 14px;font-size:12.5px;cursor:pointer;font-family:var(--mono);}
.af-place-skiptest:hover{border-color:var(--em-b);color:var(--em-b);}
.af-levelpick{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin:8px 0 18px;}
.af-levelpick-btn{display:flex;flex-direction:column;gap:4px;align-items:flex-start;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px;cursor:pointer;transition:border-color .15s,transform .1s;}
.af-levelpick-btn:hover{border-color:var(--em-b);transform:translateY(-1px);}
.af-levelpick-id{font-family:var(--mono);font-size:22px;font-weight:800;color:var(--em-b);}
.af-levelpick-label{font-size:13px;color:var(--txt2);}
.af-place-back{display:inline-flex;align-items:center;gap:5px;background:none;border:none;color:var(--txt2);font-size:12.5px;cursor:pointer;font-family:var(--mono);}
.af-place-back:hover{color:var(--em-b);}

/* ===== word list (dictionary view) ===== */
.af-card-icon.af-ic-wordlist{color:#fbbf24;background:rgba(251,191,36,.12);}
.af-wl-levels{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;}
.af-wl-lvbtn{display:flex;flex-direction:column;align-items:center;gap:2px;background:var(--panel2);border:1px solid var(--line2);color:var(--txt2);border-radius:9px;padding:7px 12px;cursor:pointer;font-family:var(--mono);min-width:64px;}
.af-wl-lvbtn:hover{border-color:var(--em-d);}
.af-wl-lvbtn.is-on{background:var(--em-d);border-color:var(--em-b);color:#fff;}
.af-wl-lvbtn-id{font-size:14px;font-weight:700;}
.af-wl-lvbtn-n{font-size:10.5px;opacity:.85;}
.af-wl-search{width:100%;background:var(--panel2);border:1px solid var(--line2);color:var(--txt);border-radius:9px;padding:10px 12px;font-size:13px;font-family:var(--mono);margin-bottom:12px;}
.af-wl-search:focus{outline:none;border-color:var(--em-b);}
.af-wl-count{font-family:var(--mono);font-size:11.5px;color:var(--txt2);margin-bottom:10px;}
.af-wl-list{display:flex;flex-direction:column;gap:0;}
.af-wl-row{display:flex;flex-direction:column;gap:3px;padding:11px 2px;border-bottom:1px solid var(--line);}
.af-wl-top{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;}
.af-wl-w{font-size:16px;font-weight:700;color:var(--txt);}
.af-wl-pos{font-family:var(--mono);font-size:11px;color:var(--txt3);font-style:italic;}
.af-wl-tr{font-size:14px;color:var(--em-b);}
.af-wl-ex{font-size:12.5px;color:var(--txt2);font-family:var(--serif);font-style:italic;}
.af-wl-more{margin:14px auto 0;display:block;background:var(--panel2);border:1px solid var(--line2);color:var(--txt2);border-radius:10px;padding:9px 18px;font-size:12.5px;cursor:pointer;font-family:var(--mono);}
.af-wl-more:hover{border-color:var(--em-b);color:var(--em-b);}

/* ===== YÖKDİL field selector ===== */
.af-fieldsel{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0 12px;}
.af-fieldsel-cap{display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:11.5px;color:var(--txt2);text-transform:uppercase;letter-spacing:.5px;}
.af-fieldsel-btn{background:var(--panel2);border:1px solid var(--line2);color:var(--txt2);border-radius:8px;padding:5px 12px;font-size:12.5px;cursor:pointer;font-family:var(--mono);}
.af-fieldsel-btn:hover{border-color:var(--em-d);color:var(--em-b);}
.af-fieldsel-btn.is-on{background:var(--em-d);border-color:var(--em-b);color:#fff;}

/* ===== Gelişim Raporu ===== */
.af-report{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:14px 0;}
.af-report-head{display:flex;align-items:center;gap:8px;font-weight:700;color:var(--txt);font-size:14px;margin-bottom:10px;}
.af-report-focus{font-family:var(--mono);font-size:12.5px;color:var(--txt2);margin-bottom:10px;}
.af-report-list{display:flex;flex-direction:column;gap:8px;}
.af-report-row{display:grid;grid-template-columns:1fr auto;align-items:center;gap:6px 10px;}
.af-report-type{font-size:13px;color:var(--txt);}
.af-report-acc{font-family:var(--mono);font-size:12px;color:var(--txt2);}
.af-report-row .af-task-bar{grid-column:1 / -1;}

/* ===== Mock exam (full-screen) ===== */
.af-card-icon.af-ic-mock{color:#f43f5e;background:rgba(244,63,94,.12);}
.af-root.af-mockmode .af-stage{max-width:none;padding:0;margin:0;}
.af-mock{max-width:760px;margin:0 auto;padding:18px;min-height:100vh;}
.af-mock-setup{display:flex;align-items:center;justify-content:center;}
.af-mock-card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:26px;max-width:560px;width:100%;}
.af-mock-cap{display:inline-flex;align-items:center;gap:7px;font-family:var(--mono);font-size:12px;color:var(--em-b);text-transform:uppercase;letter-spacing:.5px;}
.af-mock-title{font-size:22px;margin:10px 0 8px;color:var(--txt);}
.af-mock-lede{color:var(--txt2);font-size:14px;line-height:1.6;margin:0 0 18px;}
.af-mock-pick-cap{font-family:var(--mono);font-size:11.5px;color:var(--txt2);text-transform:uppercase;letter-spacing:.5px;}
.af-mock-pickrow{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;}
.af-mock-pickbtn{flex:1;min-width:130px;background:var(--em-d);border:1px solid var(--em-b);color:#fff;border-radius:10px;padding:12px 14px;font-size:14px;font-weight:700;cursor:pointer;}
.af-mock-pickbtn:hover{filter:brightness(1.08);}
.af-mock-exit{margin-top:16px;background:none;border:none;color:var(--txt2);font-size:12.5px;cursor:pointer;text-decoration:underline;}
.af-mock-run{padding-top:8px;}
.af-mock-topbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;background:var(--bg);padding:12px 4px;border-bottom:1px solid var(--line);}
.af-mock-prog{font-family:var(--mono);font-size:13px;color:var(--txt);font-weight:700;}
.af-mock-bar{flex:1;height:6px;background:var(--panel2);border-radius:6px;overflow:hidden;}
.af-mock-bar i{display:block;height:100%;background:var(--em-b);transition:width .3s;}
.af-mock-clock{display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:13px;color:var(--txt);}
.af-mock-clock.is-low{color:#f43f5e;}
.af-mock-quit{background:none;border:none;color:var(--txt2);cursor:pointer;padding:2px;display:inline-flex;}
.af-mock-quit:hover{color:#f43f5e;}
.af-mock-stage{padding:18px 4px;}
.af-mock-type{font-family:var(--mono);font-size:11px;color:var(--em-b);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;}
.af-mock-next{margin-top:16px;}
.af-mock-passage{color:var(--txt);font-size:15.5px;line-height:1.8;font-family:var(--serif);margin:0 0 10px;}
.af-mock-ask{font-weight:700;color:var(--txt);font-size:15px;margin:0;}
.af-mock-breakdown,.af-mock-review{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:14px 0;}
.af-mock-bd-cap{font-weight:700;color:var(--txt);font-size:14px;margin-bottom:10px;}
.af-mock-bd-row{display:grid;grid-template-columns:1fr auto;align-items:center;gap:6px 10px;margin-bottom:8px;}
.af-mock-bd-type{font-size:13px;color:var(--txt);}
.af-mock-bd-score{font-family:var(--mono);font-size:12px;color:var(--txt2);}
.af-mock-bd-row .af-task-bar{grid-column:1 / -1;}
.af-mock-rev{border-top:1px solid var(--line2);padding:10px 0;}
.af-mock-rev.is-no{background:rgba(244,63,94,.04);}
.af-mock-rev-head{display:flex;align-items:center;gap:8px;margin-bottom:5px;}
.af-mock-rev-n{font-family:var(--mono);font-size:11px;color:var(--txt2);min-width:20px;}
.af-mock-rev-type{font-family:var(--mono);font-size:11px;color:var(--em-b);text-transform:uppercase;letter-spacing:.5px;}
.af-mock-rev-ic.is-ok{color:#34d399;margin-left:auto;}
.af-mock-rev-ic.is-no{color:#f43f5e;margin-left:auto;}
.af-mock-rev-ans{font-size:13.5px;color:var(--txt);margin-bottom:3px;}
.af-mock-rev-yours{font-size:12.5px;color:var(--txt2);margin-bottom:3px;}
.af-content-foot{display:flex;align-items:center;gap:10px;margin-top:8px;flex-wrap:wrap;}
.af-content-reload{display:inline-flex;align-items:center;gap:5px;background:var(--panel2);border:1px solid var(--line2);color:var(--txt2);border-radius:8px;padding:5px 10px;font-size:11.5px;cursor:pointer;font-family:var(--mono);}
.af-content-reload:hover{border-color:var(--em-d);color:var(--em-b);}
.af-content-msg{font-family:var(--mono);font-size:11.5px;color:var(--em-b);}


/* ===== focus mode ===== */
.af-focus-launch{display:flex;align-items:center;gap:8px;flex-wrap:wrap;background:var(--panel);border:1px solid var(--line2);border-radius:12px;padding:11px 14px;margin-bottom:16px;}
.af-focus-launch-cap{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:12.5px;color:var(--txt);font-weight:600;}
.af-focus-launch-cap svg{color:var(--sky);}
.af-focus-btn{background:var(--panel2);border:1px solid var(--line2);color:var(--txt2);border-radius:8px;padding:6px 12px;font-size:12.5px;cursor:pointer;font-family:var(--mono);transition:.12s;}
.af-focus-btn:hover{border-color:var(--sky);color:var(--sky);}
.af-focus-launch-note{color:var(--txt3);font-size:11px;margin-left:auto;}
.af-focusbar{position:relative;z-index:6;max-width:1080px;margin:0 auto 0;display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:linear-gradient(135deg,rgba(56,189,248,.12),transparent);border:1px solid var(--sky);border-radius:12px;padding:10px 16px;}
.af-focusbar.is-done{border-color:var(--em);background:linear-gradient(135deg,var(--em-bg),transparent);}
.af-focus-ic{display:inline-flex;color:var(--sky);}
.af-focusbar.is-done .af-focus-ic{color:var(--em);}
.af-focus-time{font-family:var(--mono);font-size:18px;font-weight:700;color:var(--txt);letter-spacing:.04em;display:inline-flex;align-items:center;gap:6px;}
.af-focus-time em{font-style:normal;font-size:11px;color:var(--txt3);letter-spacing:.08em;text-transform:uppercase;}
.af-focus-dist{font-family:var(--mono);font-size:12px;color:var(--txt3);}
.af-focus-dist.is-warn{color:var(--amber);}
.af-focus-end{margin-left:auto;background:transparent;border:1px solid var(--line2);color:var(--txt2);border-radius:8px;padding:5px 12px;font-size:12px;cursor:pointer;font-family:var(--mono);}
.af-focus-end:hover{border-color:var(--crim);color:#fda4b4;}
.af-root.is-light .af-focus-end:hover{color:#be123c;}

`}</style>
  );
}
