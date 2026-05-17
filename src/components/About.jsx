import useInView from "../hooks/useInView.js";
import useMediaQuery from "../hooks/useMediaQuery.js";
import { getYearsExp } from "../utils/experience.js";
import SplitText from "./SplitText.jsx";
import TiltCard from "./TiltCard.jsx";

export default function About() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { ref, inView } = useInView();
  const stats = [
    { value:getYearsExp(), label:"Years experience", color:"#00FFB2" },
    { value:"20+", label:"Enterprise projects", color:"#00D4FF" },
    { value:"4", label:"Junior devs mentored", color:"#FFE500" },
    { value:"2×", label:"Performer nominee", color:"#FF6B35" },
  ];
  const secPad = isMobile ? "80px 20px" : "130px 52px";
  const gap = isMobile ? 48 : 80;
  return (
    <section id="about" ref={ref} style={{ padding:secPad,maxWidth:1200,margin:"0 auto" }}>
      <div style={{ display:"grid",gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",gap,alignItems:"center" }}>
        <div>
          <p style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#00FFB2",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:18,opacity:inView?1:0,transition:"opacity 0.6s ease" }}>01 — About</p>
          <h2 style={{ margin:"0 0 30px",lineHeight:0.9 }}>
            <div style={{ overflow:"hidden",display:"block" }}><SplitText text="Code as" inView={inView} delay={0.1} style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(46px,6.5vw,84px)",color:"#fff",letterSpacing:"0.02em" }}/></div>
            <div style={{ overflow:"hidden",display:"block" }}><SplitText text="Craft." inView={inView} delay={0.3} style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(46px,6.5vw,84px)",WebkitTextStroke:"1.5px rgba(0,255,178,0.6)",color:"transparent",letterSpacing:"0.02em" }}/></div>
          </h2>
          {[`Frontend developer with ${getYearsExp()} years of experience specializing in React.js, real-time interfaces, and responsive UI development. Proven track record delivering enterprise-grade web apps and chatbot platforms.`,
            "Worked with clients including PNB, Mumbai Port Trust, Mauritius Government, NISG, and ABSA Bank. Passionate about performance, clean code, and pixel-perfect UIs."].map((p,i)=>(
            <p key={i} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:isMobile?15:16,lineHeight:1.85,color:"rgba(255,255,255,0.48)",marginBottom:16,opacity:inView?1:0,transform:inView?"none":"translateX(-24px)",transition:`all 0.85s ease ${0.42+i*0.15}s` }}>{p}</p>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:3 }}>
          {stats.map((s,i)=>(
            <TiltCard key={s.label} accent={s.color} style={{ opacity:inView?1:0,transform:inView?"none":"translateY(36px) scale(0.96)",transition:`all 0.85s cubic-bezier(0.16,1,0.3,1) ${0.15+i*0.1}s` }}>
              <div style={{ padding: isMobile ? "24px 16px" : "40px 28px",border:"1px solid rgba(255,255,255,0.06)",background:"rgba(255,255,255,0.018)" }}>
                <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize: isMobile ? 48 : 66,color:s.color,lineHeight:1,textShadow:`0 0 44px ${s.color}55` }}>{s.value}</div>
                <div style={{ fontFamily:"'Space Mono',monospace",fontSize: isMobile ? 8 : 10,color:"rgba(255,255,255,0.28)",letterSpacing:"0.1em",textTransform:"uppercase",marginTop:8 }}>{s.label}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
