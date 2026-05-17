import { useState, useEffect } from "react";
import useMouse from "../hooks/useMouse.js";
import useMediaQuery from "../hooks/useMediaQuery.js";
import useScramble from "../hooks/useScramble.js";
import MagBtn from "./MagBtn.jsx";
import HeroImage from "./HeroImage.jsx";

export default function Hero({ scrollY }) {
  const [mounted, setMounted] = useState(false);
  const mousePos = useMouse();
  const parallax = scrollY * 0.32;
  const isMobile = useMediaQuery("(max-width:768px)");

  const w1 = useScramble("SNEHA", mounted, 42);
  const w2 = useScramble("PAYER", mounted, 42);

  useEffect(() => { setTimeout(() => setMounted(true), 200); }, []);

  const mouse = mousePos.current || { x:0.5, y:0.5 };

  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", padding: isMobile ? "80px 20px 60px" : "0 52px 120px" }}>
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(0,255,178,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,178,0.028) 1px,transparent 1px)",
        backgroundSize:"66px 66px",
        transform:`translateY(${scrollY*0.11}px)`,
        maskImage:"radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%)",
      }}/>

      {!isMobile && [
        {w:500,h:500,top:20,left:30,col:"rgba(0,255,178,0.1)",sp:0.1},
        {w:320,h:320,top:70,left:10,col:"rgba(0,212,255,0.07)",sp:0.07},
        {w:240,h:240,top:35,left:75,col:"rgba(199,125,255,0.06)",sp:0.14},
      ].map((o,i)=>(
        <div key={i} style={{
          position:"absolute", pointerEvents:"none",
          width:o.w, height:o.h, borderRadius:"50%",
          background:`radial-gradient(circle,${o.col} 0%,transparent 68%)`,
          top:`${o.top + mouse.y*o.sp*50}%`,
          left:`${o.left + mouse.x*o.sp*36}%`,
          transform:`translate(-50%,-50%) translateY(${-scrollY*(0.07+i*0.03)}px)`,
          transition:"top 1.2s ease, left 1.2s ease",
          filter:"blur(2px)",
        }}/>
      ))}

      <div style={{
        position:"relative", zIndex:1,
        width:"100%", maxWidth:1200,
        display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
        gap: isMobile ? 40 : 72, alignItems:"center",
        transform:`translateY(${parallax}px)`,
        justifyItems: isMobile ? "center" : "stretch",
      }}>
        <div style={{ textAlign: isMobile ? "center" : "left" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:10,
            padding:"8px 16px",
            border:"1px solid rgba(0,255,178,0.22)",
            background:"rgba(0,255,178,0.04)",
            marginBottom: isMobile ? 28 : 44,
            opacity:mounted?1:0,
            transform:mounted?"none":"translateY(14px)",
            transition:"all 0.9s ease 0.15s",
          }}>
            <span style={{ width:7,height:7,borderRadius:"50%",background:"#00FFB2",animation:"glow 2s infinite",display:"block" }}/>
            <span style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#00FFB2",letterSpacing:"0.14em",textTransform:"uppercase" }}>Open to opportunities</span>
          </div>

          {[w1, w2].map((word, wi) => (
            <div key={wi} style={{ overflow:"hidden" }}>
              <div style={{
                fontFamily:"'Bebas Neue',Impact,sans-serif",
                fontSize:"clamp(52px,15vw,148px)",
                color:"#fff", lineHeight:0.88, letterSpacing:"0.03em",
                opacity:mounted?1:0,
                transform:mounted?"none":"translateY(115%)",
                transition:`all 1s cubic-bezier(0.16,1,0.3,1) ${0.28+wi*0.1}s`,
              }}>{word}</div>
            </div>
          ))}
          <div style={{ overflow:"hidden" }}>
            <div style={{
              fontFamily:"'Bebas Neue',Impact,sans-serif",
              fontSize:"clamp(52px,15vw,148px)",
              WebkitTextStroke:"1.5px rgba(0,255,178,0.6)",
              color:"transparent", lineHeight:0.88, letterSpacing:"0.03em",
              opacity:mounted?1:0,
              transform:mounted?"none":"translateY(115%)",
              transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.48s",
            }}>ACCOUNTS</div>
          </div>

          <div style={{
            marginTop:36, display:"flex", flexDirection:"column", gap:20,
            alignItems: isMobile ? "center" : "flex-start",
            opacity:mounted?1:0, transform:mounted?"none":"translateY(22px)",
            transition:"all 0.9s ease 0.9s",
          }}>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:isMobile?15:16,lineHeight:1.82,color:"rgba(255,255,255,0.48)",maxWidth:400,margin:0 }}>
              Seeking a challenging career in <span style={{ color:"#00FFB2" }}>accounts & finance</span> — detail-oriented, quality-focused, and ready to deliver.
            </p>
            <div style={{ display:"flex", gap:14 }}>
              <MagBtn primary onClick={()=>document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}>View Work →</MagBtn>
            </div>
          </div>
        </div>

        <HeroImage mounted={mounted} scrollY={scrollY} />
      </div>

      {!isMobile && (
        <div style={{
          position:"absolute", bottom:38, left:52,
          display:"flex", alignItems:"center", gap:14,
          opacity:mounted?0.4:0, transition:"opacity 1s ease 1.4s",
        }}>
          <div style={{ width:32, height:1, background:"#00FFB2", animation:"expandLine 2s ease-in-out infinite" }}/>
          <span style={{ fontFamily:"'Space Mono',monospace",fontSize:9,color:"#fff",letterSpacing:"0.18em",textTransform:"uppercase" }}>Scroll to explore</span>
        </div>
      )}

      <div className="hero-sidebar" style={{
        position:"absolute", right: isMobile ? "auto" : -48, top:"50%",
        transform:"translateY(-50%) rotate(90deg)",
        fontFamily:"'Space Mono',monospace", fontSize:9,
        color:"rgba(255,255,255,0.16)", letterSpacing:"0.2em", textTransform:"uppercase",
        opacity:mounted?1:0, transition:"opacity 1s ease 1.8s",
        whiteSpace:"nowrap",
      }}>Tally · Excel · GST · TDS · Oracle</div>
    </section>
  );
}
