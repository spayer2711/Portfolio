import { useRef, useState } from "react";

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export default function TiltCard({ children, style:s={}, accent="#D4A853" }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx:0, ry:0, gx:50, gy:50, active:false });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width, y = (e.clientY-r.top)/r.height;
    setTilt({ rx:(y-0.5)*-16, ry:(x-0.5)*16, gx:x*100, gy:y*100, active:true });
  };
  const onLeave = () => setTilt({ rx:0, ry:0, gx:50, gy:50, active:false });

  return (
    <div ref={ref} data-h="true" onMouseMove={onMove} onMouseEnter={onMove} onMouseLeave={onLeave} style={{ perspective:900, cursor: isTouch ? "auto" : "none", ...s }}>
      <div style={{
        transform:`rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.active?1.025:1})`,
        transition: tilt.active?"transform 0.1s ease":"transform 0.65s cubic-bezier(0.34,1.56,0.64,1)",
        transformStyle:"preserve-3d",
        position:"relative",
        background:`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%,${accent}09 0%,transparent 55%)`,
      }}>
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:10,
          background:`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%,rgba(255,255,255,${tilt.active?0.065:0}) 0%,transparent 50%)`,
          transition:"background 0.1s",
        }}/>
        {children}
      </div>
    </div>
  );
}
