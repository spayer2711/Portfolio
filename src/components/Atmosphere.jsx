export default function Atmosphere() {
  return (
    <>
      <div style={{ position:"fixed",inset:0,zIndex:9990,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,backgroundSize:"160px",opacity:0.38,mixBlendMode:"overlay" }}/>
      <div style={{ position:"fixed",inset:0,zIndex:9989,pointerEvents:"none",background:"radial-gradient(ellipse 80% 80% at 50% 50%,transparent 50%,rgba(0,0,0,0.5) 100%)" }}/>
    </>
  );
}
