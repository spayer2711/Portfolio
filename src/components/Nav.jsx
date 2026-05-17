import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery.js";

export default function Nav({ scrollY }) {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = scrollY > 80;
  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
  };
  const links = ["About","Skills","Work","Contact"];
  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:500,
      height:scrolled?60:78, padding: isMobile ? "0 20px" : "0 52px",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      background:scrolled?"rgba(6,6,10,0.88)":"transparent",
      backdropFilter:scrolled?"blur(20px)":"none",
      borderBottom:scrolled?"1px solid rgba(255,255,255,0.05)":"none",
      transition:"all 0.5s ease",
    }}>
      <div style={{ fontFamily:"'Space Mono',monospace",fontSize:isMobile?14:16,color:"#00FFB2",fontWeight:700,letterSpacing:"0.05em",textShadow:"0 0 20px rgba(0,255,178,0.5)" }}>{"<SP />"}</div>
      {isMobile ? (
        <>
          <button onClick={()=>setMenuOpen(o=>!o)} style={{ background:"none",border:"none",cursor:"pointer",position:"relative",zIndex:510,display:"flex",flexDirection:"column",gap:5,padding:4 }}>
            <span style={{ display:"block",width:22,height:1.5,background:menuOpen?"transparent":"#fff",transition:"0.3s",transform:menuOpen?"rotate(45deg) translate(4px,4px)":"none" }}/>
            <span style={{ display:"block",width:22,height:1.5,background:menuOpen?"transparent":"#fff",transition:"0.3s",opacity:menuOpen?0:1 }}/>
            <span style={{ display:"block",width:22,height:1.5,background:menuOpen?"transparent":"#fff",transition:"0.3s",transform:menuOpen?"rotate(-45deg) translate(4px,-4px)":"none" }}/>
          </button>
          {menuOpen && (
            <div style={{ position:"fixed",inset:0,background:"rgba(6,6,10,0.98)",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:32,zIndex:505 }}>
              {links.map(n => (
                <button key={n} onClick={()=>go(n)} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:28,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",transition:"color 0.25s" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#00FFB2"}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}
                >{n}</button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div style={{ display:"flex",gap:40 }}>
          {links.map(n => (
            <button key={n} data-h="true" onClick={()=>go(n)} style={{
              background:"none",border:"none",cursor:"none",
              fontFamily:"'Space Mono',monospace",fontSize:11,
              letterSpacing:"0.14em",textTransform:"uppercase",
              color:"rgba(255,255,255,0.4)",transition:"color 0.25s",
            }}
              onMouseEnter={e=>e.currentTarget.style.color="#00FFB2"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}
            >{n}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
