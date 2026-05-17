export default function Nav({ scrollY }) {
  const scrolled = scrollY > 80;
  const go = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:500,
      height:scrolled?60:78, padding:"0 52px",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      background:scrolled?"rgba(6,6,10,0.88)":"transparent",
      backdropFilter:scrolled?"blur(20px)":"none",
      borderBottom:scrolled?"1px solid rgba(255,255,255,0.05)":"none",
      transition:"all 0.5s ease",
    }}>
      <div style={{ fontFamily:"'Space Mono',monospace",fontSize:16,color:"#00FFB2",fontWeight:700,letterSpacing:"0.05em",textShadow:"0 0 20px rgba(0,255,178,0.5)" }}>{"<SP />"}</div>
      <div style={{ display:"flex",gap:40 }}>
        {["About","Skills","Work","Contact"].map(n => (
          <button key={n} data-h="true" onClick={()=>go(n)} style={{
            background:"none",border:"none",cursor:"none",
            fontFamily:"'Space Mono',monospace",fontSize:11,
            letterSpacing:"0.14em",textTransform:"uppercase",
            color:"rgba(255,255,255,0.4)",transition:"color 0.25s",
          }}
            onMouseEnter={e=>e.currentTarget.style.color="#00FFB2"}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}
          >{n}</button>
        ))}
      </div>
    </nav>
  );
}
