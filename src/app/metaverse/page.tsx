// src/app/metaverse/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import { AntiGravityEngine } from '@/components/Metaverse/AntiGravityEngine';

export default function MetaversePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<AntiGravityEngine | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. 엔진 시동
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    engineRef.current = new AntiGravityEngine(canvas);
    engineRef.current.start();

    // 2. 리사이즈 대응
    const handleResize = () => {
      engineRef.current?.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      engineRef.current?.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    // 클릭 시 파티클 폭발
    for(let i=0; i<20; i++) {
        engineRef.current?.spawn(e.clientX, e.clientY);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#02010a] overflow-hidden">
      <div className="absolute top-10 left-10 text-white z-10 pointer-events-none select-none">
        <h1 className="text-6xl font-bold tracking-tighter mb-2">NEXUS <span className="text-cyan-400">ENGINE</span></h1>
        <p className="text-gray-400">Click anywhere to test physics</p>
      </div>
      
      <canvas 
        ref={canvasRef} 
        onClick={handleClick}
        className="block touch-none cursor-crosshair"
      />
    </div>
  );
}
