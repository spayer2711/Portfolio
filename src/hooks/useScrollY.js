import { useState, useEffect } from "react";

export default function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return { scrollY, progress };
}
