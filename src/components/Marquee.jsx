export default function Marquee() {
  const items = ["Tally ERP9","·","MS Excel","·","GST","·","TDS","·","Oracle","·","Bank Reconciliation","·","Ledger Management","·","Logix","·","Debit & Credit Notes","·","Prepaid Expenses","·"];
  return (
    <div style={{ overflow:"hidden",borderTop:"1px solid rgba(255,255,255,0.05)",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"13px 0",background:"rgba(0,255,178,0.022)",position:"relative",zIndex:1 }}>
      <div style={{ display:"flex",animation:"marquee 26s linear infinite",width:"max-content" }}>
        {[...items,...items,...items].map((t,i)=>(
          <span key={i} style={{ fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",color:t==="·"?"#00FFB2":"rgba(255,255,255,0.26)",padding:"0 22px" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
