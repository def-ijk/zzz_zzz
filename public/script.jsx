// document.body.style.margin   = 0
// document.body.style.overflow = `hidden`

// const cnv = document.getElementById (`cnv_element`)
// cnv.width = innerWidth
// cnv.height = innerHeight

// const ctx = cnv.getContext (`2d`)

// const draw_frame = ms => {
//    const t = ms / 1000
//    console.log (`page loaded ${ t.toFixed (2)}s ago`)

//    ctx.fillStyle = `turquoise`
//    ctx.fillRect (0, 0, innerWidth, innerHeight)

//    requestAnimationFrame (draw_frame)
// }

// requestAnimationFrame (draw_frame)

// onresize = () => {
//    cnv.width = innerWidth
//    cnv.height = innerHeight   
// }

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function NetArt() {
  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
      <Canvas className="absolute top-0 left-0 z-0">
        <GlitchBox />
      </Canvas>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6 space-y-10">
        <Quote text="Noise is the parasite that interrupts the message and reveals the system." />
        <Quote text="Thinking is not the reduction of noise to signal but rather the negotiation between them." />
        <Quote text="Information is born not from clarity, but from turbulence." />
      </div>
    </div>
  );
}

function Quote({ text }) {
  return (
    <p className="text-2xl md:text-4xl font-mono tracking-wide max-w-3xl glitch-text">
      {text}
    </p>
  );
}

function GlitchBox() {
  const mesh = useRef();
  const materialRef = useRef();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    mesh.current.rotation.x += 0.002;
    mesh.current.rotation.y += 0.003;

    // Introduce glitching
    if (materialRef.current) {
      materialRef.current.wireframe = Math.random() > 0.95;
      materialRef.current.opacity = 0.6 + Math.sin(time.current * 5) * 0.2;
    }
  });

  return (
    <mesh ref={mesh} scale={1.5}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#00ffff"
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.7}
      />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
    </mesh>
  );
}

// Tailwind styles for glitch effect
// Add this to your CSS
/*
.glitch-text {
  position: relative;
}
.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  width: 100%;
  overflow: hidden;
  color: #f0f;
  z-index: -1;
}
.glitch-text::before {
  top: -2px;
  left: 2px;
  animation: glitch 2s infinite linear alternate-reverse;
}
.glitch-text::after {
  top: 2px;
  left: -2px;
  color: #0ff;
  animation: glitch 2s infinite linear alternate;
}
@keyframes glitch {
  0% { clip: rect(0, 9999px, 0, 0); }
  5% { clip: rect(10px, 9999px, 30px, 0); }
  10% { clip: rect(20px, 9999px, 50px, 0); }
  15% { clip: rect(0, 9999px, 20px, 0); }
  100% { clip: rect(0, 9999px, 0, 0); }
}
*/
