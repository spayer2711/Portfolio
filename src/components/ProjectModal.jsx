import { useEffect, useRef } from "react";
import useMediaQuery from "../hooks/useMediaQuery.js";

export default function ProjectModal({ project, onClose }) {
  const isMobile = useMediaQuery("(max-width:768px)");
  const overlay = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onCloseRef.current(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!project) return null;

  return (
    <div ref={overlay} onClick={(e) => { if (e.target === overlay.current) onClose(); }}
      style={{
        position:"fixed",inset:0,zIndex:9999,
        display:"flex",alignItems:"center",justifyContent:"center",
        padding: isMobile ? 16 : 24,
        background:"rgba(6,6,10,0.88)",
        backdropFilter:"blur(14px)",
        animation:"modalFadeIn 0.3s ease",
      }}
    >
      <div style={{
        position:"relative",
        width:"100%",maxWidth:620,
        maxHeight:"85vh",overflowY:"auto",
        background:"#0C0C14",
        border:`1px solid ${project.accent}28`,
        padding: isMobile ? 24 : 40,
        animation:"modalSlideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <button onClick={onClose}
          style={{
            position:"absolute",top:isMobile?12:16,right:isMobile?12:16,
            width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",
            background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
            color:"#fff",fontSize:18,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",
            transition:"all 0.25s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
        >✕</button>

        <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:24 }}>
          <span style={{
            fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:40,
            color:project.accent,lineHeight:1,
            textShadow:`0 0 40px ${project.accent}44`,
          }}>{project.id}</span>
          <div style={{ flex:1,height:1,background:`linear-gradient(90deg,${project.accent}44,transparent)` }}/>
        </div>

        <h2 style={{
          fontFamily:"'DM Sans',sans-serif",fontSize:isMobile?20:26,
          fontWeight:600,color:"#fff",margin:"0 0 12px",lineHeight:1.3,
        }}>{project.title}</h2>

        <p style={{
          fontFamily:"'DM Sans',sans-serif",fontSize:isMobile?14:15,
          color:"rgba(255,255,255,0.55)",lineHeight:1.75,margin:"0 0 24px",
        }}>{project.desc}</p>

        {project.features && project.features.length > 0 && (
          <div style={{ marginBottom:24 }}>
            <p style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:project.accent,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12 }}>Key Features</p>
            <ul style={{ listStyle:"none",padding:0,margin:0 }}>
              {project.features.map((f,i) => (
                <li key={i} style={{
                  display:"flex",gap:10,alignItems:"flex-start",
                  padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",
                  fontFamily:"'DM Sans',sans-serif",fontSize:isMobile?13:14,
                  color:"rgba(255,255,255,0.5)",lineHeight:1.6,
                }}>
                  <span style={{ color:project.accent,fontSize:16,flexShrink:0,marginTop:-1 }}>▸</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginBottom:24 }}>
          <p style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:project.accent,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12 }}>Tech Stack</p>
          <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
            {project.tech.map(t => (
              <span key={t} style={{
                padding:"5px 10px",background:`${project.accent}14`,
                border:`1px solid ${project.accent}30`,
                fontFamily:"'Space Mono',monospace",fontSize:isMobile?10:11,
                color:project.accent,letterSpacing:"0.06em",
              }}>{t}</span>
            ))}
          </div>
        </div>

        {project.links && project.links.length > 0 && (
          <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
            {project.links.map((link,i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                style={{
                  display:"inline-flex",alignItems:"center",gap:8,
                  padding:"10px 20px",
                  background:`${project.accent}12`,
                  border:`1px solid ${project.accent}32`,
                  fontFamily:"'Space Mono',monospace",fontSize:11,
                  color:project.accent,textDecoration:"none",
                  transition:"all 0.3s",letterSpacing:"0.06em",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}22`; e.currentTarget.style.borderColor = project.accent; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${project.accent}12`; e.currentTarget.style.borderColor = `${project.accent}32`; }}
              >{link.label} ↗</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
