import { useState } from "react";
import useInView from "../hooks/useInView.js";
import useMediaQuery from "../hooks/useMediaQuery.js";
import SplitText from "./SplitText.jsx";

const SKILLS = [
  { name:"React.js / Hooks / Context API", level:95, color:"#00FFB2" },
  { name:"JavaScript (ES6+)", level:92, color:"#00D4FF" },
  { name:"HTML5 / CSS3 / SCSS / Tailwind", level:93, color:"#FFE500" },
  { name:"Node.js / Express.js", level:58, color:"#FF6B35" },
  { name:"Socket.io / Real-time", level:85, color:"#C77DFF" },
  { name:"Bootstrap / Material UI", level:88, color:"#FF4D8D" },
  { name:"Git / Webpack / Vite", level:86, color:"#00FFB2" },
  { name:"REST APIs / MongoDB", level:80, color:"#00D4FF" },
];

const TAGS = ["HTML5","CSS3","JavaScript","ES6+","React.js","React Hooks","Context API","Node.js","Express.js","REST APIs","MongoDB","Socket.io","SCSS","Tailwind CSS","Bootstrap","Material UI","Git","GitHub","Webpack","Vite","Chrome DevTools","Agile","Scrum"];

export default function Skills() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(null);
  const secPad = isMobile ? "80px 20px" : "130px 52px";
  return (
    <section id="skills" ref={ref} style={{ padding:secPad,background:"rgba(255,255,255,0.013)",borderTop:"1px solid rgba(255,255,255,0.05)",borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ marginBottom: isMobile ? 44 : 72 }}>
          <p style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#00FFB2",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:18,opacity:inView?1:0,transition:"opacity 0.6s ease" }}>02 — Skills</p>
          <h2 style={{ margin:0 }}>
            <div style={{ overflow:"hidden",display:"block" }}><SplitText text="Expertise &" inView={inView} delay={0.1} style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(46px,7vw,90px)",color:"#fff",letterSpacing:"0.02em",lineHeight:0.9 }}/></div>
            <div style={{ overflow:"hidden",display:"block" }}><SplitText text="Tooling." inView={inView} delay={0.32} style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(46px,7vw,90px)",WebkitTextStroke:"1.5px rgba(0,212,255,0.6)",color:"transparent",letterSpacing:"0.02em",lineHeight:0.9 }}/></div>
          </h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",gap: isMobile ? "16px 0" : "20px 72px",marginBottom: isMobile ? 44 : 72 }}>
          {SKILLS.map((sk,i)=>(
            <div key={sk.name} data-h="true"
              onMouseEnter={()=>setHovered(sk.name)} onMouseLeave={()=>setHovered(null)}
              style={{ opacity:inView?1:0,transform:inView?"none":"translateX(-28px)",transition:`all 0.85s cubic-bezier(0.16,1,0.3,1) ${i*0.07}s`,cursor: isMobile ? "auto" : "none" }}
            >
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:9 }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize: isMobile ? 13 : 14,color:hovered===sk.name?sk.color:"rgba(255,255,255,0.62)",transition:"color 0.25s" }}>{sk.name}</span>
                <span style={{ fontFamily:"'Space Mono',monospace",fontSize:11,color:sk.color,opacity:0.6 }}>{sk.level}%</span>
              </div>
              <div style={{ height:2,background:"rgba(255,255,255,0.06)",position:"relative",overflow:"hidden" }}>
                <div style={{
                  position:"absolute",top:0,left:0,bottom:0,
                  width:inView?`${sk.level}%`:"0%",
                  background:`linear-gradient(90deg,${sk.color},${sk.color}55)`,
                  boxShadow:hovered===sk.name?`0 0 18px ${sk.color}`:"none",
                  transition:`width 1.4s cubic-bezier(0.16,1,0.3,1) ${0.2+i*0.07}s, box-shadow 0.3s`,
                }}/>
                {inView && <div style={{
                  position:"absolute",top:0,bottom:0,width:50,
                  background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)",
                  animation:`shineSweep 1.5s ease ${0.4+i*0.07}s forwards`,
                  left:"-50px",
                }}/>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",flexWrap:"wrap",gap: isMobile ? 8 : 10,opacity:inView?1:0,transition:"opacity 1.2s ease 1.1s",justifyContent: isMobile ? "center" : "flex-start" }}>
          {TAGS.map((tag,i)=>(
            <span key={tag} data-h="true" style={{
              padding: isMobile ? "5px 10px" : "7px 14px",
              border:"1px solid rgba(255,255,255,0.08)",
              fontFamily:"'Space Mono',monospace",fontSize: isMobile ? 9 : 10,letterSpacing:"0.07em",
              color:"rgba(255,255,255,0.35)",cursor: isMobile ? "auto" : "none",
              opacity:inView?1:0,transform:inView?"none":"translateY(10px)",
              transition:`all 0.55s ease ${0.9+i*0.025}s`,
            }}
              onMouseEnter={e=>{e.target.style.borderColor="#00FFB2";e.target.style.color="#00FFB2";e.target.style.boxShadow="0 0 18px rgba(0,255,178,0.14)";e.target.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.target.style.borderColor="rgba(255,255,255,0.08)";e.target.style.color="rgba(255,255,255,0.35)";e.target.style.boxShadow="none";e.target.style.transform="none";}}
            >{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
