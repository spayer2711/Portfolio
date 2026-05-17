import { useState, useEffect } from "react";

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 16 + 5;
      if (v >= 100) {
        v = 100; clearInterval(id);
        setTimeout(() => { setLeaving(true); setTimeout(onDone, 900); }, 500);
      }
      setPct(Math.floor(v));
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000,
      background: "#06060A",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
      transform: leaving ? "translateY(-100%)" : "none",
      transition: "transform 0.9s cubic-bezier(0.76,0,0.24,1)",
    }}>
      <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 72, color: "#fff", letterSpacing: "0.06em", animation: "flicker 2.5s ease infinite" }}>
          SP<span style={{ color: "#D4A853" }}>.</span>
      </div>
      <div style={{ width: 220, height: 1, background: "rgba(255,255,255,0.07)" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#D4A853,#2B6CB0)", boxShadow: "0 0 12px #D4A853", transition: "width 0.08s" }} />
      </div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.28)", letterSpacing: "0.22em" }}>
        {String(pct).padStart(3, "0")} %
      </div>
      {[[20,20,"tl"],[20,null,null],[null,20,"bl"],[null,null,"br"]].map(([t,l,p],i) => (
        <div key={i} style={{
          position:"absolute",width:44,height:44,
          top:t?t+"px":"auto",bottom:t?null:20+"px",left:l?l+"px":"auto",right:l?null:20+"px",
          borderTop:["tl","tr"].includes(p)?"1px solid rgba(212,168,83,0.3)":undefined,
          borderBottom:["bl","br"].includes(p)?"1px solid rgba(212,168,83,0.3)":undefined,
          borderLeft:["tl","bl"].includes(p)?"1px solid rgba(212,168,83,0.3)":undefined,
          borderRight:["tr","br"].includes(p)?"1px solid rgba(212,168,83,0.3)":undefined,
        }}/>
      ))}
    </div>
  );
}
