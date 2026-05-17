import { useState, useEffect, useRef } from "react";
import { getYearsExp } from "../utils/experience.js";

const SYSTEM_PROMPT = () => `You are SP·AI — the personal AI assistant embedded in Shubham Payer's portfolio website. Shubham Payer is a frontend developer with ${getYearsExp()} years of experience.

KEY FACTS ABOUT SHUBHAM:
- Name: Shubham Payer
- Role: Frontend Developer | React.js Specialist
- Experience: ${getYearsExp()} years specializing in React.js, real-time interfaces, and responsive UI development
- Skills: React.js, React Hooks, Context API, JavaScript (ES6+), HTML5, CSS3, SCSS, Tailwind CSS, Bootstrap, Material UI, Node.js, Express.js, REST APIs, MongoDB, Socket.io
- Enterprise clients: PNB (Punjab National Bank), Mumbai Port Trust, Mauritius Government, NISG, ABSA Bank
- Projects: 20+ enterprise projects shipped, chatbot platforms, CMS solutions
- Notable work: Talkk Conversational AI Platform, ABSA Banking Onboarding, Mortgage Market Platform, AI Agent POC
- Availability: Open to opportunities
- Contact: spayer2711@gmail.com | +91 7208921050 | Mumbai
- Education: MSc IT (Mumbai University), BSc IT (Mumbai University)
- Recognition: Quick Learner Award, 2× nominated Performer of the Quarter/Year, Mentored 4 junior developers
- Philosophy: Clean code, pixel-perfect UIs, performance-first approach

RESPONSE STYLE — THIS IS CRITICAL:
- You MUST format every response using special markdown-like syntax that the UI will render beautifully
- Keep responses concise but punchy (2-5 sentences max per section)
- Use these special tags in your responses:
  [[highlight]]text[[/highlight]] — for glowing neon-green highlighted key terms
  [[tag]]label[[/tag]] — for small tech/skill badge tags
  [[stat]]number::label[[/stat]] — for animated stat callouts
  [[block]]title::content[[/block]] — for a styled info block
  [[link]]label::url[[/link]] — for styled links (use # as url placeholder)
- Always start with a short punchy line, then use the formatting
- Be confident, witty, and technical — like a developer who knows their craft
- Never use bullet points or boring plain text — every response must feel designed
- If asked about hiring/working together, be enthusiastic and direct them to contact`;

const QUICK_PROMPTS = [
  { label: "Who is Shubham?", q: "Tell me about Shubham Payer" },
  { label: "Top skills", q: "What are Shubham's strongest technical skills?" },
  { label: "Best projects", q: "What are Shubham's most impressive projects?" },
  { label: "Hire Shubham?", q: "Is Shubham available for work and how do I hire them?" },
];

function parseResponse(text) {
  const parts = [];
  let remaining = text;
  let key = 0;

  const patterns = [
    { re: /\[\[highlight\]\](.*?)\[\[\/highlight\]\]/gs, render: (m,c) => <span key={key++} style={{color:"#00FFB2",fontWeight:600,textShadow:"0 0 16px rgba(0,255,178,0.5)"}}>{c}</span> },
    { re: /\[\[tag\]\](.*?)\[\[\/tag\]\]/gs, render: (m,c) => <span key={key++} style={{display:"inline-block",padding:"2px 9px",background:"rgba(0,255,178,0.1)",border:"1px solid rgba(0,255,178,0.3)",color:"#00FFB2",fontFamily:"'Space Mono',monospace",fontSize:"0.72em",letterSpacing:"0.06em",margin:"0 3px",verticalAlign:"middle"}}>{c}</span> },
    { re: /\[\[stat\]\](.*?)::(.*?)\[\[\/stat\]\]/gs, render: (m,num,lbl) => <span key={key++} style={{display:"inline-flex",flexDirection:"column",alignItems:"center",padding:"6px 14px",background:"rgba(0,212,255,0.07)",border:"1px solid rgba(0,212,255,0.25)",margin:"4px 6px",verticalAlign:"middle"}}><span style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.6em",color:"#00D4FF",lineHeight:1}}>{num}</span><span style={{fontFamily:"'Space Mono',monospace",fontSize:"0.6em",color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{lbl}</span></span> },
    { re: /\[\[block\]\](.*?)::(.*?)\[\[\/block\]\]/gs, render: (m,title,content) => <div key={key++} style={{margin:"10px 0",padding:"12px 16px",background:"rgba(255,255,255,0.03)",borderLeft:"2px solid #00FFB2",borderRadius:"0 4px 4px 0"}}><div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.7em",color:"#00FFB2",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{title}</div><div style={{fontSize:"0.88em",color:"rgba(255,255,255,0.65)",lineHeight:1.7}}>{content}</div></div> },
    { re: /\[\[link\]\](.*?)::(.*?)\[\[\/link\]\]/gs, render: (m,lbl) => <span key={key++} style={{color:"#00D4FF",cursor:"pointer",borderBottom:"1px solid rgba(0,212,255,0.4)",paddingBottom:"1px"}}>{lbl} ↗</span> },
  ];

  let nodes = [text];
  for (const { re, render } of patterns) {
    const next = [];
    for (const node of nodes) {
      if (typeof node !== "string") { next.push(node); continue; }
      const pieces = [];
      let last = 0;
      let match;
      re.lastIndex = 0;
      while ((match = re.exec(node)) !== null) {
        if (match.index > last) pieces.push(node.slice(last, match.index));
        pieces.push(render(...match));
        last = match.index + match[0].length;
      }
      if (last < node.length) pieces.push(node.slice(last));
      next.push(...(pieces.length ? pieces : [node]));
    }
    nodes = next;
  }
  return nodes;
}

function TypingIndicator() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5, padding:"14px 18px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", width:"fit-content" }}>
      {[0,1,2].map(i => (
        <span key={i} style={{
          width:6, height:6, borderRadius:"50%", background:"#00FFB2",
          display:"block", animation:`dotPulse 1.2s ease-in-out ${i*0.2}s infinite`,
        }}/>
      ))}
    </div>
  );
}

function ChatMessage({ msg, isNew }) {
  const isAI = msg.role === "assistant";
  const parsed = isAI ? parseResponse(msg.content) : null;

  return (
    <div style={{
      display:"flex", flexDirection:"column",
      alignItems: isAI ? "flex-start" : "flex-end",
      gap:6, marginBottom:18,
      animation: isNew ? "msgSlideIn 0.4s cubic-bezier(0.16,1,0.3,1)" : "none",
    }}>
      {isAI && (
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
          <div style={{
            width:22, height:22, borderRadius:"50%",
            background:"linear-gradient(135deg,#00FFB2,#00D4FF)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:9, fontWeight:700, color:"#06060A",
            fontFamily:"'Space Mono',monospace",
          }}>SP</div>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#00FFB2", letterSpacing:"0.1em" }}>SP·AI</span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.2)", letterSpacing:"0.06em" }}>
            {new Date(msg.ts).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}
          </span>
        </div>
      )}
      <div style={{
        maxWidth:"88%",
        padding: isAI ? "14px 18px" : "12px 16px",
        background: isAI ? "rgba(255,255,255,0.03)" : "rgba(0,255,178,0.09)",
        border: isAI ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,255,178,0.28)",
        fontFamily:"'DM Sans',sans-serif",
        fontSize:14, lineHeight:1.75,
        color: isAI ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.9)",
        position:"relative",
        boxShadow: isAI ? "none" : "0 0 20px rgba(0,255,178,0.06)",
      }}>
        {isAI ? parsed : msg.content}
        {isAI && (
          <div style={{
            position:"absolute", top:0, left:0, width:2, height:"100%",
            background:"linear-gradient(to bottom,#00FFB2,#00D4FF)",
            boxShadow:"0 0 8px #00FFB2",
          }}/>
        )}
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role:"assistant", content:`Hello! I'm [[highlight]]SP·AI[[/highlight]] — Shubham's personal assistant.\n\nAsk me anything about Shubham's [[tag]]skills[[/tag]] [[tag]]projects[[/tag]] [[tag]]experience[[/tag]] or [[tag]]availability[[/tag]]. I'll give you the real story. 🚀`, ts: Date.now(), id: 0 }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [newMsgId, setNewMsgId] = useState(null);
  const [btnPulse, setBtnPulse] = useState(true);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const msgId = useRef(1);

  useEffect(() => { setTimeout(() => setMounted(true), 3000); }, []);
  useEffect(() => { if (open) { setTimeout(() => endRef.current?.scrollIntoView({behavior:"smooth"}), 80); } }, [messages, open]);
  useEffect(() => { if (open) { setTimeout(() => inputRef.current?.focus(), 400); setBtnPulse(false); } }, [open]);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");

    const userMsg = { role:"user", content:q, ts:Date.now(), id:msgId.current++ };
    setMessages(prev => [...prev, userMsg]);
    setNewMsgId(userMsg.id);
    setLoading(true);

    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system: SYSTEM_PROMPT(),
          messages: history,
        }),
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Sorry, I couldn't process that.";
      const aiMsg = { role:"assistant", content:reply, ts:Date.now(), id:msgId.current++ };
      setMessages(prev => [...prev, aiMsg]);
      setNewMsgId(aiMsg.id);
    } catch(e) {
      const errMsg = { role:"assistant", content:`[[highlight]]Connection error[[/highlight]] — please try again in a moment.`, ts:Date.now(), id:msgId.current++ };
      setMessages(prev => [...prev, errMsg]);
    }
    setLoading(false);
  };

  const onKey = (e) => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      <div style={{
        position:"fixed", bottom:32, right:32, zIndex:9000,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "none" : "translateY(20px) scale(0.8)",
        transition:"opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {btnPulse && !open && [1,2].map(i=>(
          <div key={i} style={{
            position:"absolute", inset:-4*i,
            borderRadius:"50%",
            border:"1px solid rgba(0,255,178,0.3)",
            animation:`rippleOut 2s ease-out ${i*0.4}s infinite`,
            pointerEvents:"none",
          }}/>
        ))}
        <button
          data-h="true"
          onClick={() => setOpen(o => !o)}
          style={{
            width:58, height:58, borderRadius:"50%",
            background: open
              ? "rgba(255,255,255,0.08)"
              : "linear-gradient(135deg,#00FFB2 0%,#00D4FF 100%)",
            border: open ? "1px solid rgba(255,255,255,0.15)" : "none",
            cursor:"none",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow: open ? "none" : "0 0 32px rgba(0,255,178,0.45), 0 0 64px rgba(0,255,178,0.15)",
            transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            position:"relative",
          }}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="3" y1="3" x2="15" y2="15" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="15" y1="3" x2="3" y2="15" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l4.93-1.37C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="#06060A"/>
              <circle cx="8" cy="12" r="1.2" fill="#06060A"/>
              <circle cx="12" cy="12" r="1.2" fill="#06060A"/>
              <circle cx="16" cy="12" r="1.2" fill="#06060A"/>
            </svg>
          )}
        </button>
      </div>

      <div style={{
        position:"fixed", bottom:104, right:32, zIndex:8999,
        width:400,
        maxHeight: open ? 600 : 0,
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
        transition:"all 0.45s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: open ? "auto" : "none",
        overflow:"hidden",
        background:"rgba(8,8,14,0.96)",
        border:"1px solid rgba(255,255,255,0.09)",
        backdropFilter:"blur(24px)",
        boxShadow:"0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,178,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
        display:"flex", flexDirection:"column",
      }}>
        <div style={{
          padding:"16px 20px",
          borderBottom:"1px solid rgba(255,255,255,0.07)",
          display:"flex", alignItems:"center", gap:12,
          background:"rgba(0,255,178,0.025)",
          flexShrink:0,
        }}>
          <div style={{
            width:36, height:36, borderRadius:"50%",
            background:"linear-gradient(135deg,#00FFB2,#00D4FF)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:11, fontWeight:700, color:"#06060A",
            fontFamily:"'Space Mono',monospace",
            boxShadow:"0 0 16px rgba(0,255,178,0.4)",
            flexShrink:0,
          }}>SP</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#fff", letterSpacing:"0.04em", fontWeight:700 }}>SP·AI</div>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:2 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#00FFB2", display:"block", animation:"glow 2s infinite" }}/>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:"0.12em", textTransform:"uppercase" }}>Shubham's assistant · online</span>
            </div>
          </div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(0,255,178,0.4)", letterSpacing:"0.08em" }}>v2.0</div>
        </div>

        <div style={{ height:1, background:"linear-gradient(90deg,transparent,#00FFB2,transparent)", opacity:0.3 }}/>

        <div style={{
          flex:1, overflowY:"auto", padding:"20px 20px 8px",
          minHeight:0,
          scrollbarWidth:"thin",
          scrollbarColor:"rgba(0,255,178,0.2) transparent",
        }}>
          {messages.map(msg => (
            <ChatMessage key={msg.id} msg={msg} isNew={msg.id === newMsgId} />
          ))}
          {loading && (
            <div style={{ marginBottom:18, animation:"msgSlideIn 0.3s ease" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <div style={{ width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB2,#00D4FF)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"#06060A", fontFamily:"'Space Mono',monospace" }}>SP</div>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#00FFB2" }}>SP·AI</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.2)" }}>thinking...</span>
              </div>
              <TypingIndicator/>
            </div>
          )}
          <div ref={endRef}/>
        </div>

        <div style={{
          padding:"10px 20px 4px",
          display:"flex", gap:7, flexWrap:"wrap",
          borderTop:"1px solid rgba(255,255,255,0.05)",
          flexShrink:0,
        }}>
          {QUICK_PROMPTS.map(p => (
            <button key={p.label} data-h="true"
              onClick={() => send(p.q)}
              disabled={loading}
              style={{
                padding:"5px 11px",
                background:"rgba(255,255,255,0.03)",
                border:"1px solid rgba(255,255,255,0.1)",
                color:"rgba(255,255,255,0.5)",
                fontFamily:"'Space Mono',monospace",
                fontSize:9, letterSpacing:"0.06em",
                cursor:"none",
                transition:"all 0.2s",
                opacity: loading ? 0.4 : 1,
              }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="#00FFB2"; e.currentTarget.style.color="#00FFB2"; e.currentTarget.style.background="rgba(0,255,178,0.05)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
            >{p.label}</button>
          ))}
        </div>

        <div style={{
          padding:"12px 20px 16px",
          flexShrink:0,
        }}>
          <div style={{
            display:"flex", gap:10, alignItems:"flex-end",
            padding:"10px 14px",
            border:"1px solid rgba(255,255,255,0.1)",
            background:"rgba(255,255,255,0.025)",
            transition:"border-color 0.2s",
          }}
            onFocusCapture={e => e.currentTarget.style.borderColor="rgba(0,255,178,0.4)"}
            onBlurCapture={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask about Shubham..."
              rows={1}
              style={{
                flex:1, background:"none", border:"none", outline:"none",
                fontFamily:"'DM Sans',sans-serif",
                fontSize:14, color:"rgba(255,255,255,0.85)",
                lineHeight:1.5, resize:"none",
                cursor:"none",
                caretColor:"#00FFB2",
              }}
            />
            <button
              data-h="true"
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                width:32, height:32, borderRadius:"50%",
                background: input.trim() && !loading ? "linear-gradient(135deg,#00FFB2,#00D4FF)" : "rgba(255,255,255,0.06)",
                border:"none", cursor:"none",
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0,
                transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                transform: input.trim() && !loading ? "scale(1)" : "scale(0.9)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke={input.trim()&&!loading?"#06060A":"rgba(255,255,255,0.25)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div style={{ marginTop:8, textAlign:"center" }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8.5, color:"rgba(255,255,255,0.15)", letterSpacing:"0.08em" }}>Powered by Claude AI · Press Enter to send</span>
          </div>
        </div>
      </div>
    </>
  );
}
