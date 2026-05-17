import { useState, useEffect } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function useScramble(target, trigger, speed = 38) {
  const [text, setText] = useState(target);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const total = target.length * 3;
    setText(target.split("").map(c => c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]).join(""));
    const id = setInterval(() => {
      setText(target.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (frame > i * 3) return ch;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      frame++;
      if (frame > total) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [trigger]);
  return text;
}
