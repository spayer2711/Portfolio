import { useEffect, useRef } from "react";

export default function useMouse() {
  const pos = useRef({ x: 0.5, y: 0.5, px: 0, py: 0 });
  useEffect(() => {
    const fn = (e) => {
      pos.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight, px: e.clientX, py: e.clientY };
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return pos;
}
