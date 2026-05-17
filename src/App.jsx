import { useState } from "react";
import useScrollY from "./hooks/useScrollY.js";
import Loader from "./components/Loader.jsx";
import Atmosphere from "./components/Atmosphere.jsx";
import ParticleField from "./components/ParticleField.jsx";
import Cursor from "./components/Cursor.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Work from "./components/Work.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { scrollY, progress } = useScrollY();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#06060A;color:#fff;cursor:none;overflow-x:hidden;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#06060A;}
        ::-webkit-scrollbar-thumb{background:rgba(0,255,178,0.22);}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-33.33%);}}
        @keyframes glow{0%,100%{box-shadow:0 0 8px #00FFB2;opacity:1;}50%{box-shadow:0 0 20px #00FFB2,0 0 36px rgba(0,255,178,0.4);opacity:0.65;}}
        @keyframes flicker{0%,100%{opacity:1;}91%{opacity:1;}92%{opacity:0.55;}95%{opacity:1;}98%{opacity:0.75;}99%{opacity:1;}}
        @keyframes expandLine{0%{width:0;opacity:0;}50%{width:48px;opacity:1;}100%{width:48px;opacity:0;}}
        @keyframes shineSweep{0%{left:-50px;}100%{left:110%;}}
        @keyframes modalFadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes modalSlideUp{from{opacity:0;transform:translateY(40px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}

        button{outline:none;}
        textarea::placeholder{color:rgba(255,255,255,0.22);}
        @media(max-width:768px){
          body{cursor:auto;}
          .nav-links{display:none!important;}
          .nav-links.open{display:flex!important;flex-direction:column;position:fixed;top:0;left:0;right:0;background:rgba(6,6,10,0.98);height:100vh;justify-content:center;align-items:center;gap:32px;z-index:490;}
          .hero-sidebar{display:none!important;}
        }
      `}</style>

      {!loaded && <Loader onDone={()=>setLoaded(true)}/>}
      <Atmosphere/>
      <ParticleField/>
      <Cursor/>
      <ProgressBar progress={progress}/>
      <Nav scrollY={scrollY}/>

      <main style={{ position:"relative",zIndex:1,paddingTop:78 }}>
        <Hero scrollY={scrollY}/>
        <Marquee/>
        <About/>
        <Skills/>
        <Work/>
        <Contact/>
      </main>

    </>
  );
}
