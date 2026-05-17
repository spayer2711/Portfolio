export default function ProgressBar({ progress }) {
  return (
    <div style={{ position:"fixed",top:0,left:0,right:0,height:2,zIndex:1000,background:"rgba(255,255,255,0.05)" }}>
      <div style={{ height:"100%",width:`${progress*100}%`,background:"linear-gradient(90deg,#D4A853,#2B6CB0,#4C51BF)",boxShadow:"0 0 14px #D4A853,0 0 28px rgba(212,168,83,0.3)",transition:"width 0.07s linear" }} />
    </div>
  );
}
