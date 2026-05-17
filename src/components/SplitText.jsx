export default function SplitText({ text, inView, delay=0, style:s={}, each={} }) {
  return (
    <span style={{ display:"inline-block", ...s }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{
          display:"inline-block",
          transform: inView ? "translateY(0) rotate(0deg)" : "translateY(115%) rotate(6deg)",
          opacity: inView ? 1 : 0,
          transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay+i*0.028}s, opacity 0.5s ease ${delay+i*0.028}s`,
          ...each,
        }}>{ch === " " ? "\u00A0" : ch}</span>
      ))}
    </span>
  );
}
