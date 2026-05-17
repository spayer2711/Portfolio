import { useRef, useEffect, useState } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const rpos = useRef({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const down = () => setClick(true); const up = () => setClick(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      rpos.current.x = lerp(rpos.current.x, pos.current.x, 0.12);
      rpos.current.y = lerp(rpos.current.y, pos.current.y, 0.12);
      if (dot.current) dot.current.style.transform = `translate(${pos.current.x-4}px,${pos.current.y-4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rpos.current.x-22}px,${rpos.current.y-22}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    const enter = (e) => { if (e.target.closest("[data-h]")) setHov(true); };
    const leave = (e) => { if (e.target.closest("[data-h]")) setHov(false); };
    document.addEventListener("mouseenter", enter, true);
    document.addEventListener("mouseleave", leave, true);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      cancelAnimationFrame(raf);
      document.removeEventListener("mouseenter", enter, true);
      document.removeEventListener("mouseleave", leave, true);
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position:"fixed",top:0,left:0,zIndex:99999,width:8,height:8,borderRadius:"50%",background:click?"#fff":"#00FFB2",pointerEvents:"none",mixBlendMode:"difference",boxShadow:"0 0 10px #00FFB2",transition:"background 0.15s" }} />
      <div ref={ring} style={{ position:"fixed",top:0,left:0,zIndex:99998,width:hov?68:44,height:hov?68:44,borderRadius:"50%",border:`1px solid rgba(0,255,178,${hov?0.85:0.3})`,pointerEvents:"none",boxShadow:hov?"0 0 24px rgba(0,255,178,0.15)":"none",transition:"width 0.4s cubic-bezier(0.34,1.56,0.64,1),height 0.4s cubic-bezier(0.34,1.56,0.64,1),border-color 0.3s,box-shadow 0.3s" }} />
    </>
  );
}
