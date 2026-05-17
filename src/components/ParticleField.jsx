import { useRef, useEffect } from "react";

export default function ParticleField() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], raf;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse, { passive: true });

    class P {
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * W; this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.25; this.vy = (Math.random() - 0.5) * 0.25;
        this.r = Math.random() * 1.4 + 0.2;
        this.a = Math.random() * 0.45 + 0.08;
        this.col = Math.random() > 0.85 ? "#00FFB2" : Math.random() > 0.7 ? "#00D4FF" : "rgba(255,255,255,0.8)";
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0) this.x = W; if (this.x > W) this.x = 0;
        if (this.y < 0) this.y = H; if (this.y > H) this.y = 0;
        const dx = this.x - mouseRef.current.x, dy = this.y - mouseRef.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) { const f = (130 - d) / 130; this.x += dx / d * f * 2.8; this.y += dy / d * f * 2.8; }
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.col; ctx.globalAlpha = this.a; ctx.fill(); ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < 130; i++) particles.push(new P());

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 95) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,255,178,${(1 - d / 95) * 0.11})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
        particles[i].update(); particles[i].draw();
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.65 }} />;
}
