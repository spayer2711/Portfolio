import { useState } from "react";
import useInView from "../hooks/useInView.js";
import useMediaQuery from "../hooks/useMediaQuery.js";
import SplitText from "./SplitText.jsx";
import TiltCard from "./TiltCard.jsx";
import ProjectModal from "./ProjectModal.jsx";

const PROJECTS = [
  { id:"01",title:"Talkk – Conversational AI Platform",tech:["React.js","Socket.io","SCSS","Node.js"],desc:"Real-time chatbot platform with CMS, analytics, and bot training. Custom deployments for PNB, Mumbai Port Trust, Mauritius Government, NISG.",accent:"#00FFB2",
    features:["Real-time multi-user chat with Socket.io","Admin CMS for bot training and conversation analytics","Enterprise-grade deployments for PNB, Mumbai Port Trust, Mauritius Government, NISG","Analytics dashboard tracking message volume and user engagement"],
    links:[{label:"View Project",url:"#"}],
  },
  { id:"02",title:"ABSA – Banking Onboarding",tech:["React.js","REST APIs","Form Optimization"],desc:"Migrated entire customer onboarding from legacy Node.js UI to React. Achieved faster performance and reduced DOM complexity.",accent:"#00D4FF",
    features:["Migrated legacy customer onboarding from Node.js UI to React","Optimized form handling reducing DOM complexity by 40%","Streamlined multi-step application workflow","Enterprise banking-grade security and validation"],
    links:[{label:"View Project",url:"#"}],
  },
  { id:"03",title:"Mortgage Market – Loan Platform",tech:["React.js","PHP","Bootstrap"],desc:"Secure loan and mortgage platform with form handling, dashboards, and mobile-responsive UI.",accent:"#FFE500",
    features:["Secure loan application and mortgage processing","Interactive dashboards for application tracking","Fully responsive mobile-first UI","Comprehensive form validation and data handling"],
    links:[{label:"View Project",url:"#"}],
  },
  { id:"04",title:"AI Agent (POC)",tech:["React.js","Socket.io","AI"],desc:"Real-time AI assistant interface with digital-human conversational UI and multi-channel broadcast architecture.",accent:"#C77DFF",
    features:["Real-time AI assistant with digital-human conversational UI","Multi-channel broadcast architecture","Socket.io-powered real-time communication","Interactive chatbot interface with natural language processing"],
    links:[{label:"View Project",url:"#"}],
  },
];

export default function Work() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { ref, inView } = useInView();
  const [active, setActive] = useState(null);
  const [selected, setSelected] = useState(null);
  const secPad = isMobile ? "80px 20px" : "130px 52px";
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  return (
    <section id="work" ref={ref} style={{ padding:secPad }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ marginBottom: isMobile ? 44 : 72 }}>
          <p style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#00FFB2",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:18,opacity:inView?1:0,transition:"opacity 0.6s ease" }}>03 — Work</p>
          <h2 style={{ margin:0 }}>
            <div style={{ overflow:"hidden",display:"block" }}><SplitText text="Selected" inView={inView} delay={0.1} style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(46px,7vw,90px)",color:"#fff",letterSpacing:"0.02em",lineHeight:0.9 }}/></div>
            <div style={{ overflow:"hidden",display:"block" }}><SplitText text="Projects." inView={inView} delay={0.32} style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(46px,7vw,90px)",WebkitTextStroke:"1.5px rgba(255,229,0,0.55)",color:"transparent",letterSpacing:"0.02em",lineHeight:0.9 }}/></div>
          </h2>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:3 }}>
          {PROJECTS.map((p,i)=>(
            <TiltCard key={p.id} accent={p.accent} style={{ opacity:inView?1:0,transform:inView?"none":"translateY(34px)",transition:`all 0.85s cubic-bezier(0.16,1,0.3,1) ${i*0.12}s` }}>
              <div data-h="true"
                onMouseEnter={()=>setActive(p.id)} onMouseLeave={()=>setActive(null)}
                onClick={()=>setSelected(p)}
                style={{
                  display:"grid",gridTemplateColumns: isMobile ? "50px 1fr" : "80px 1fr 56px",gap: isMobile ? 16 : 28,alignItems:"center",
                  padding: isMobile ? "24px 16px" : "36px 36px",
                  border:"1px solid rgba(255,255,255,0.06)",
                  background:active===p.id?"rgba(255,255,255,0.022)":"transparent",
                  cursor: isTouch ? "pointer" : "none",transition:"background 0.3s",
                }}
              >
                <span style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize: isMobile ? 32 : 54,color:active===p.id?p.accent:"rgba(255,255,255,0.07)",lineHeight:1,transition:"color 0.35s,text-shadow 0.35s",textShadow:active===p.id?`0 0 36px ${p.accent}55`:"none" }}>{p.id}</span>
                <div>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                    <h3 style={{ fontFamily:"'DM Sans',sans-serif",fontSize: isMobile ? 18 : 22,fontWeight:600,color:"#fff",margin:"0 0 8px",transform:active===p.id?"translateX(8px)":"none",transition:"transform 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>{p.title}</h3>
                    {!isMobile && <span style={{ fontSize:26,color:active===p.id?p.accent:"rgba(255,255,255,0.1)",transform:active===p.id?"translate(6px,-4px)":"none",transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",display:"block",textAlign:"right",flexShrink:0 }}>↗</span>}
                  </div>
                  <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize: isMobile ? 13 : 14,color:"rgba(255,255,255,0.4)",margin:"0 0 14px",lineHeight:1.65 }}>{p.desc}</p>
                  <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                    {p.tech.map(t=>(
                      <span key={t} style={{ padding:"3px 8px",background:`${p.accent}12`,border:`1px solid ${p.accent}32`,fontFamily:"'Space Mono',monospace",fontSize: isMobile ? 9 : 10,color:p.accent,letterSpacing:"0.06em" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
      {selected && <ProjectModal project={selected} onClose={()=>setSelected(null)}/>}
    </section>
  );
}
