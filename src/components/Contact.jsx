import { useState } from "react";
import useInView from "../hooks/useInView.js";
import useMediaQuery from "../hooks/useMediaQuery.js";
import SplitText from "./SplitText.jsx";

export default function Contact() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { ref, inView } = useInView();
  const [copied, setCopied] = useState(false);
  const email = "spayer2711@gmail.com";
  const copy = () => { navigator.clipboard.writeText(email); setCopied(true); setTimeout(()=>setCopied(false),2200); };
  const secPad = isMobile ? "80px 20px 60px" : "130px 52px 80px";

  return (
    <section id="contact" ref={ref} style={{ padding:secPad,background:"rgba(255,255,255,0.013)",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:900,margin:"0 auto",textAlign:"center" }}>
        <p style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#00FFB2",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:20,opacity:inView?1:0,transition:"opacity 0.6s ease" }}>04 — Contact</p>
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          {[["LET'S BUILD",0.1,"#fff"],["SOMETHING",0.35,"transparent"],["GREAT.",0.62,"#fff"]].map(([t,d,c],i)=>(
            <div key={i} style={{ overflow:"hidden",display:"block" }}>
              <SplitText text={t} inView={inView} delay={d} style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(36px,11vw,132px)",color:c,WebkitTextStroke:c==="transparent"?"1.5px rgba(0,255,178,0.65)":undefined,lineHeight:0.88,letterSpacing:"0.02em" }}/>
            </div>
          ))}
        </div>
        <div style={{ opacity:inView?1:0,transform:inView?"none":"translateY(24px)",transition:"all 0.8s ease 0.85s",marginBottom: isMobile ? 44 : 64,display:"flex",justifyContent:"center" }}>
          <button data-h="true" onClick={copy} style={{
            display:"inline-flex",alignItems:"center",gap: isMobile ? 10 : 18,
            padding: isMobile ? "14px 20px" : "20px 44px",
            border:`1px solid ${copied?"rgba(0,255,178,0.4)":"rgba(255,255,255,0.1)"}`,
            background:copied?"rgba(0,255,178,0.06)":"transparent",
            cursor: isMobile ? "pointer" : "none",fontFamily:"'Space Mono',monospace",
            fontSize: isMobile ? 12 : 15,color:copied?"#00FFB2":"#fff",letterSpacing:"0.06em",
            transition:"all 0.4s",maxWidth:"100%",
          }}
            onMouseEnter={e=>{if(!copied){e.currentTarget.style.borderColor="#00FFB2";e.currentTarget.style.boxShadow="0 0 48px rgba(0,255,178,0.1)";}}}
            onMouseLeave={e=>{if(!copied){e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.boxShadow="none";}}}
          >
            <span style={{ fontSize: isMobile ? 12 : 15, wordBreak:"break-all" }}>{email}</span>
            <span style={{ fontFamily:"'Space Mono',monospace",fontSize: isMobile ? 8 : 10,opacity:0.5,background:"rgba(255,255,255,0.06)",padding:"4px 8px",whiteSpace:"nowrap" }}>{copied?"✓ Copied!":"Copy"}</span>
          </button>
        </div>
        <div style={{ display:"flex",justifyContent:"center",gap: isMobile ? 32 : 48,opacity:inView?1:0,transition:"opacity 0.8s ease 1.1s" }}>
          <button data-h="true" onClick={()=>window.open("https://www.linkedin.com/in/shubham-payer-22b1451bb?utm_source=share_via&utm_content=profile&utm_medium=member_ios","_blank")} style={{ background:"none",border:"none",cursor: isMobile ? "pointer" : "none",fontFamily:"'Space Mono',monospace",fontSize: isMobile ? 10 : 11,letterSpacing:"0.1em",color:"rgba(255,255,255,0.28)",textTransform:"uppercase",transition:"color 0.25s" }}
            onMouseEnter={e=>e.currentTarget.style.color="#00FFB2"}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.28)"}
          >LinkedIn</button>
        </div>
      </div>
      <div style={{ maxWidth:1200,margin: isMobile ? "48px auto 0" : "80px auto 0",paddingTop:32,borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",flexDirection: isMobile ? "column" : "row",gap: isMobile ? 16 : 0,justifyContent:"space-between",alignItems:"center",position:"relative" }}>
        <span style={{ fontFamily:"'Space Mono',monospace",fontSize:14,color:"#00FFB2",textShadow:"0 0 18px rgba(0,255,178,0.4)" }}>{"<SP />"}</span>
        <span style={{ fontFamily:"'Space Mono',monospace",fontSize: isMobile ? 9 : 10,color:"rgba(255,255,255,0.16)",letterSpacing:"0.08em" }}>© 2026 — Built with React</span>
      </div>
    </section>
  );
}
