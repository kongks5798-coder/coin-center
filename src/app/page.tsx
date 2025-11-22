"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // 1. 환경 초기화
    container.style.position = 'relative';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.overflow = 'hidden';
    container.style.backgroundColor = '#050505';
    container.style.cursor = 'pointer';

    // 폰트 로드 (JS 방식)
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // 2. 캔버스 엔진
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    container.appendChild(canvas);

    // 상태 변수
    const CONFIG = {
      particleCount: 140,
      baseColor: 'rgba(212, 175, 55, ', // Champagne Gold
      speed: 0.4
    };

    let state = {
      mouse: { x: null as number | null, y: null as number | null },
      isWarping: false,
      level: 0, // 0: Particles, 1: Void
      animationId: 0
    };

    // 리사이즈
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // 3. UI 레이어 (Intro Logo)
    const uiLayer = document.createElement('div');
    Object.assign(uiLayer.style, {
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#F5F5F5',
      pointerEvents: 'none',
      zIndex: '10',
      fontFamily: '"Playfair Display", serif',
      mixBlendMode: 'overlay',
      transition: 'all 1.2s cubic-bezier(0.19, 1, 0.22, 1)'
    });
    uiLayer.innerHTML = `
      <h1 style="font-size: 5rem; font-weight: 700; letter-spacing: 0.8rem; margin: 0; text-shadow: 0 10px 30px rgba(0,0,0,0.5);">FIELD NINE</h1>
      <p style="font-size: 1.2rem; font-weight: 400; letter-spacing: 0.3rem; margin-top: 20px; opacity: 0.8; font-style: italic;">Beyond Gravity.</p>
    `;
    container.appendChild(uiLayer);

    // 4. 입자 클래스
    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * CONFIG.speed;
        this.vy = (Math.random() - 0.5) * CONFIG.speed;
        this.size = Math.random() * 2 + 0.5;
      }

      update() {
        if (state.isWarping) {
          // [WARP LOGIC]
          const cx = canvas.width / 2;
          const cy = canvas.height / 2;
          let dx = this.x - cx;
          let dy = this.y - cy;

          if (Math.abs(dx) < 1) dx = Math.random() - 0.5;
          if (Math.abs(dy) < 1) dy = Math.random() - 0.5;

          this.vx += dx * 0.005;
          this.vy += dy * 0.005;
          this.x += this.vx * 5;
          this.y += this.vy * 5;
          this.size *= 1.02;
        } else {
          // [FLOAT LOGIC]
          this.x += this.vx;
          this.y += this.vy;

          if (state.mouse.x != null && state.mouse.y != null) {
            let dx = state.mouse.x - this.x;
            let dy = state.mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const force = (200 - dist) / 200;
              this.x -= (dx / dist) * force * 2;
              this.y -= (dy / dist) * force * 2;
            }
          }
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;
          if (this.y < 0) this.y = canvas.height;
          if (this.y > canvas.height) this.y = 0;
        }
      }

      draw() {
        ctx.beginPath();
        if (state.isWarping) {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x - this.vx * 4, this.y - this.vy * 4);
          ctx.strokeStyle = CONFIG.baseColor + '0.6)';
          ctx.lineWidth = this.size / 2;
          ctx.stroke();
        } else {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = CONFIG.baseColor + '0.8)';
          ctx.fill();
        }
      }
    }

    const particles = Array.from({ length: CONFIG.particleCount }, () => new Particle());

    // 5. 애니메이션 루프
    const animate = () => {
      if (state.level === 1) return;

      if (state.isWarping) {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach((p, i) => {
        p.update();
        p.draw();

        if (!state.isWarping) {
          for (let j = i + 1; j < particles.length; j++) {
            let dx = p.x - particles[j].x;
            let dy = p.y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              let opacity = (1 - dist / 120) * 0.15;
              ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      });
      state.animationId = requestAnimationFrame(animate);
    };
    animate();

    // 6. 이벤트 핸들러
    const handleInput = (x: number, y: number) => {
      state.mouse.x = x;
      state.mouse.y = y;
    };

    const mouseMoveHandler = (e: MouseEvent) => handleInput(e.clientX, e.clientY);
    const touchMoveHandler = (e: TouchEvent) => handleInput(e.touches[0].clientX, e.touches[0].clientY);

    const clickHandler = () => {
      if (state.isWarping || state.level === 1) return;

      state.isWarping = true;
      container.style.cursor = 'default';

      uiLayer.style.opacity = '0';
      uiLayer.style.transform = 'translate(-50%, -50%) scale(1.1)';

      setTimeout(initNextLevel, 2000);
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('touchmove', touchMoveHandler);
    window.addEventListener('click', clickHandler);

    // 7. Phase 3: The Monolith
    function initNextLevel() {
      state.level = 1;
      canvas.style.transition = 'opacity 1.5s ease';
      canvas.style.opacity = '0';
      setTimeout(() => { if (canvas.parentElement) canvas.remove(); }, 1500);

      // UNBOUND Text
      const bigText = document.createElement('h1');
      bigText.innerText = "UNBOUND";
      Object.assign(bigText.style, {
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '18vw',
        margin: '0',
        fontFamily: '"Playfair Display", serif',
        fontWeight: '400',
        color: '#Eaeaea',
        mixBlendMode: 'difference',
        whiteSpace: 'nowrap',
        opacity: '0',
        transition: 'opacity 3s ease',
        userSelect: 'none',
        pointerEvents: 'auto'
      });
      container.appendChild(bigText);

      // Footer
      const footer = document.createElement('div');
      footer.innerHTML = "contact@fieldnine.io &nbsp;&nbsp;/&nbsp;&nbsp; © 2025";
      Object.assign(footer.style, {
        position: 'fixed',
        bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'sans-serif',
        fontSize: '0.8rem',
        letterSpacing: '0.2rem',
        color: '#555',
        opacity: '0',
        transition: 'opacity 2s ease 1s'
      });
      container.appendChild(footer);

      setTimeout(() => {
        bigText.style.opacity = '1';
        footer.style.opacity = '1';
      }, 100);

      // Inertia Loop
      let targetX = 0, targetY = 0;
      let currentX = 0, currentY = 0;

      const inertiaLoop = () => {
        if (state.mouse.x !== null && state.mouse.y !== null) {
          const xNorm = (state.mouse.x / window.innerWidth) - 0.5;
          const yNorm = (state.mouse.y / window.innerHeight) - 0.5;
          targetX = xNorm * 60;
          targetY = yNorm * 60;
        }

        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        bigText.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
        state.animationId = requestAnimationFrame(inertiaLoop);
      };
      inertiaLoop();

      bigText.addEventListener('mouseenter', () => {
        bigText.style.letterSpacing = '1vw';
        bigText.style.fontStyle = 'italic';
        bigText.style.transition = 'all 1.5s ease';
      });
      bigText.addEventListener('mouseleave', () => {
        bigText.style.letterSpacing = '0';
        bigText.style.fontStyle = 'normal';
      });
    }

    // Cleanup (메모리 누수 방지)
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
      window.removeEventListener('click', clickHandler);
      cancelAnimationFrame(state.animationId);
      if (document.head.contains(fontLink)) document.head.removeChild(fontLink);
    };
  }, []);

  return <div ref={containerRef} />;
}