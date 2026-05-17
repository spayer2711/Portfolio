import { useState, useEffect, useRef } from "react";
import useMouse from "../hooks/useMouse.js";
import { getYearsExp } from "../utils/experience.js";
import spPhoto from "../assets/sp.jpeg";

const PHOTO_URL = spPhoto;

const MASK_EFFECTS = [
  { id:"circle",   label:"Circle",   mask:"radial-gradient(circle 55% at 50% 50%, black 60%, transparent 100%)" },
  { id:"diamond",  label:"Diamond",  mask:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
  { id:"hex",      label:"Hex",      mask:"polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" },
  { id:"slash",    label:"Slash",    mask:"polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)" },
  { id:"reveal",   label:"Reveal",   mask:"inset(0 0 0 0 round 0px)" },
  { id:"cross",    label:"Cross",    mask:"polygon(35% 0%,65% 0%,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0% 65%,0% 35%,35% 35%)" },
];

export default function HeroImage({ mounted, scrollY }) {
  const [activeEffect, setActiveEffect] = useState("reveal");
  const [hovered, setHovered] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [scanY, setScanY] = useState(0);
  const imgRef = useRef(null);
  const mousePos = useMouse();
  const mouse = mousePos.current || { x:0.5, y:0.5 };

  useEffect(() => {
    setGlitch(true);
    const t = setTimeout(() => setGlitch(false), 600);
    return () => clearTimeout(t);
  }, [activeEffect]);

  useEffect(() => {
    let raf;
    const tick = () => { setScanY(prev => (prev + 0.8) % 110); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const tiltX = hovered ? (mouse.y - 0.5) * -18 : 0;
  const tiltY = hovered ? (mouse.x - 0.5) * 18 : 0;

  const currentEffect = MASK_EFFECTS.find(e => e.id === activeEffect);
  const isPolygon = currentEffect?.mask.startsWith("polygon") || currentEffect?.mask.startsWith("inset");
  const maskProp = isPolygon ? { WebkitClipPath: currentEffect.mask, clipPath: currentEffect.mask }
                             : { WebkitMaskImage: currentEffect.mask, maskImage: currentEffect.mask };

  return (
    <div style={{
      position:"relative", flexShrink:0,
      opacity: mounted ? 1 : 0,
      transform: mounted ? "none" : "translateX(60px) scale(0.92)",
      transition:"opacity 1.1s ease 0.6s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.6s",
    }}>
      <div style={{
        position:"relative", width:380, height:480,
        perspective:900,
      }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            position:"absolute",
            top: (i+1)*8, left:(i+1)*8,
            width:380, height:480,
            background:`rgba(0,255,178,${0.04 - i*0.01})`,
            border:`1px solid rgba(0,255,178,${0.12 - i*0.03})`,
            transition:"transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
            transform: hovered
              ? `translate(${(i+1)*4}px, ${(i+1)*4}px) rotateX(${tiltX*0.4}deg) rotateY(${tiltY*0.4}deg)`
              : "none",
          }}/>
        ))}

        <div
          ref={imgRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position:"relative", width:380, height:480,
            overflow:"hidden",
            border:"1px solid rgba(255,255,255,0.1)",
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${hovered?1.02:1})`,
            transition: hovered
              ? "transform 0.15s ease"
              : "transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
            cursor:"none",
            background:"#0d0d12",
          }}
        >
          <img
            src={PHOTO_URL}
            alt="Shubham Payer"
            style={{
              width:"100%", height:"100%",
              objectFit:"cover", objectPosition:"center top",
              display:"block",
              filter: glitch
                ? "hue-rotate(90deg) saturate(2) brightness(1.3)"
                : hovered ? "saturate(1.1) brightness(1.05)" : "saturate(0.85) brightness(0.9)",
              transition: glitch ? "filter 0.05s" : "filter 0.5s ease",
            }}
          />

          <div style={{
            position:"absolute", inset:0,
            background:`linear-gradient(160deg, rgba(0,255,178,${hovered?0.18:0.08}) 0%, rgba(0,212,255,${hovered?0.1:0.04}) 50%, transparent 100%)`,
            mixBlendMode:"color-dodge",
            transition:"all 0.5s ease",
          }}/>

          <div style={{
            position:"absolute", inset:0,
            ...maskProp,
            background:"transparent",
            transition:"clip-path 0.5s cubic-bezier(0.16,1,0.3,1), -webkit-clip-path 0.5s cubic-bezier(0.16,1,0.3,1)",
            zIndex:2,
            overflow:"hidden",
          }}>
            <img
              src={PHOTO_URL}
              alt=""
              style={{
                width:"100%", height:"100%",
                objectFit:"cover", objectPosition:"center top",
                display:"block",
                filter:"saturate(0) brightness(1.1) contrast(1.15)",
                mixBlendMode:"luminosity",
              }}
            />
            <div style={{
              position:"absolute", inset:0,
              background:"linear-gradient(135deg,rgba(0,255,178,0.35) 0%,rgba(0,212,255,0.2) 100%)",
              mixBlendMode:"color",
            }}/>
          </div>

          {glitch && (
            <>
              <div style={{
                position:"absolute", inset:0, zIndex:5,
                backgroundImage:`url(${PHOTO_URL})`,
                backgroundSize:"cover", backgroundPosition:"center top",
                filter:"hue-rotate(180deg) saturate(3)",
                clipPath:"polygon(0 20%,100% 18%,100% 28%,0 30%)",
                transform:"translateX(-6px)",
                mixBlendMode:"screen", opacity:0.7,
              }}/>
              <div style={{
                position:"absolute", inset:0, zIndex:5,
                backgroundImage:`url(${PHOTO_URL})`,
                backgroundSize:"cover", backgroundPosition:"center top",
                filter:"hue-rotate(-90deg) saturate(3)",
                clipPath:"polygon(0 55%,100% 53%,100% 62%,0 64%)",
                transform:"translateX(8px)",
                mixBlendMode:"screen", opacity:0.6,
              }}/>
            </>
          )}

          <div style={{
            position:"absolute", left:0, right:0,
            top:`${scanY}%`,
            height:"2px",
            background:"linear-gradient(90deg,transparent,rgba(0,255,178,0.6),transparent)",
            zIndex:6, pointerEvents:"none",
            opacity: hovered ? 0.8 : 0.3,
            transition:"opacity 0.4s",
          }}/>

          <div style={{
            position:"absolute", inset:0, zIndex:7, pointerEvents:"none",
            backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",
            opacity: hovered ? 0.4 : 0.7,
            transition:"opacity 0.4s",
          }}/>

          {[["0px","0px","tl"],["0px","auto","tr"],["auto","0px","bl"],["auto","auto","br"]].map(([t,l,p])=>{
            const isT = t==="0px", isL = l==="0px";
            return (
              <div key={p} style={{
                position:"absolute",
                top:t, bottom:t==="auto"?"0px":undefined,
                left:l, right:l==="auto"?"0px":undefined,
                width:20, height:20, zIndex:8,
                borderTop: isT ? "2px solid #00FFB2" : undefined,
                borderBottom: !isT ? "2px solid #00FFB2" : undefined,
                borderLeft: isL ? "2px solid #00FFB2" : undefined,
                borderRight: !isL ? "2px solid #00FFB2" : undefined,
                boxShadow: `${isL?2:-2}px ${isT?2:-2}px 8px rgba(0,255,178,0.4)`,
                opacity: hovered ? 1 : 0.5,
                transition:"opacity 0.3s",
              }}/>
            );
          })}

          <div style={{
            position:"absolute", bottom:0, left:0, right:0, zIndex:9,
            padding:"12px 16px",
            background:"linear-gradient(to top,rgba(6,6,10,0.92),transparent)",
            display:"flex", justifyContent:"space-between", alignItems:"flex-end",
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            opacity: hovered ? 1 : 0,
            transition:"all 0.35s ease",
          }}>
            <div>
              <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:22,color:"#fff",letterSpacing:"0.06em",lineHeight:1 }}>SHUBHAM PAYER</div>
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:9,color:"#00FFB2",letterSpacing:"0.12em",textTransform:"uppercase",marginTop:2 }}>Frontend Developer | React.js Specialist</div>
            </div>
            <div style={{ fontFamily:"'Space Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:"0.08em" }}>2026</div>
          </div>
        </div>

        <div style={{
          position:"absolute", top:-16, right:-20, zIndex:10,
          padding:"8px 14px",
          background:"#00FFB2",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "rotate(3deg)" : "rotate(3deg) scale(0)",
          transition:"all 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s",
          boxShadow:"0 0 24px rgba(0,255,178,0.5)",
        }}>
          <div style={{ fontFamily:"'Space Mono',monospace",fontSize:9,color:"#06060A",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" }}>Available</div>
          <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:18,color:"#06060A",lineHeight:1,letterSpacing:"0.06em" }}>FOR HIRE</div>
        </div>

        <div style={{
          position:"absolute", bottom:20, right:-28, zIndex:10,
          padding:"12px 16px",
          background:"rgba(6,6,10,0.95)",
          border:"1px solid rgba(0,212,255,0.3)",
          boxShadow:"0 0 20px rgba(0,212,255,0.12)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateX(20px)",
          transition:"all 0.7s cubic-bezier(0.16,1,0.3,1) 1.4s",
        }}>
          <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:36,color:"#00D4FF",lineHeight:1,textShadow:"0 0 20px rgba(0,212,255,0.5)" }}>{getYearsExp()}</div>
          <div style={{ fontFamily:"'Space Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.35)",letterSpacing:"0.1em",textTransform:"uppercase" }}>Years exp.</div>
        </div>
      </div>

      <div style={{
        marginTop:20, display:"flex", gap:6, flexWrap:"wrap",
        opacity: mounted ? 1 : 0,
        transition:"opacity 0.8s ease 1.6s",
        justifyContent:"center",
        maxWidth:380,
      }}>
        {MASK_EFFECTS.map(ef => (
          <button
            key={ef.id}
            data-h="true"
            onClick={() => setActiveEffect(ef.id)}
            style={{
              padding:"4px 11px",
              background: activeEffect===ef.id ? "rgba(0,255,178,0.15)" : "rgba(255,255,255,0.03)",
              border: activeEffect===ef.id ? "1px solid rgba(0,255,178,0.5)" : "1px solid rgba(255,255,255,0.08)",
              color: activeEffect===ef.id ? "#00FFB2" : "rgba(255,255,255,0.3)",
              fontFamily:"'Space Mono',monospace",
              fontSize:9, letterSpacing:"0.08em", textTransform:"uppercase",
              cursor:"none",
              transition:"all 0.22s ease",
              boxShadow: activeEffect===ef.id ? "0 0 12px rgba(0,255,178,0.15)" : "none",
            }}
            onMouseEnter={e=>{ if(activeEffect!==ef.id){ e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; }}}
            onMouseLeave={e=>{ if(activeEffect!==ef.id){ e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.color="rgba(255,255,255,0.3)"; }}}
          >{ef.label}</button>
        ))}
        <div style={{
          width:"100%", textAlign:"center", marginTop:4,
          fontFamily:"'Space Mono',monospace",fontSize:8,
          color:"rgba(255,255,255,0.18)",letterSpacing:"0.1em",
        }}>HOVER IMAGE · CLICK EFFECT</div>
      </div>
    </div>
  );
}
