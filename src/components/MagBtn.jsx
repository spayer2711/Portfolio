import { useRef, useState } from "react";

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export default function MagBtn({ children, primary=false, onClick }) {
  const btn = useRef(null);
  const [off, setOff] = useState({ x:0, y:0 });

  const onMove = (e) => {
    const r = btn.current.getBoundingClientRect();
    setOff({ x:(e.clientX-r.left-r.width/2)*0.1, y:(e.clientY-r.top-r.height/2)*0.1 });
  };
  return (
    <button ref={btn} data-h="true" onMouseMove={onMove} onClick={onClick}
      style={{
        position:"relative",overflow:"hidden",
        padding: primary?"16px 36px":"15px 35px",
        background: primary?"#00FFB2":"transparent",
        border: primary?"none":"1px solid rgba(255,255,255,0.18)",
        color: primary?"#06060A":"#fff",
        fontFamily:"'Space Mono',monospace",
        fontSize:12,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",
        cursor: isTouch ? "pointer" : "none",
        transform:`translate(${off.x}px,${off.y}px)`,
        transition:"transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s, border-color 0.3s, color 0.3s",
      }}
      onMouseEnter={e => {
        if(primary) e.currentTarget.style.boxShadow="0 0 50px rgba(0,255,178,0.6),0 0 90px rgba(0,255,178,0.2)";
        else { e.currentTarget.style.borderColor="#00FFB2"; e.currentTarget.style.color="#00FFB2"; }
      }}
      onMouseLeave={e => {
        setOff({ x:0, y:0 });
        e.currentTarget.style.boxShadow="none";
        if(!primary) { e.currentTarget.style.borderColor="rgba(255,255,255,0.18)"; e.currentTarget.style.color="#fff"; }
      }}
    >
      <span style={{position:"relative",zIndex:1}}>{children}</span>
    </button>
  );
}
