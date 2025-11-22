// src/components/Metaverse/AntiGravityEngine.ts

export interface Entity {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  active: boolean;
}

export class AntiGravityEngine {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private particles: Entity[] = [];
  private isRunning: boolean = false;
  private poolSize: number = 500; // 500개 입자 풀링

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d', { alpha: false })!;
    this.width = canvas.width;
    this.height = canvas.height;

    // 객체 풀링 초기화 (메모리 미리 할당)
    for (let i = 0; i < this.poolSize; i++) {
      this.particles.push({
        id: i, x: 0, y: 0, vx: 0, vy: 0, radius: 0, color: '#fff', active: false
      });
    }
  }

  resize(w: number, h: number) {
    this.width = w;
    this.height = h;
    this.ctx.canvas.width = w;
    this.ctx.canvas.height = h;
  }

  spawn(x: number, y: number) {
    const p = this.particles.find(p => !p.active);
    if (p) {
      p.active = true;
      p.x = x;
      p.y = y;
      p.vx = (Math.random() - 0.5) * 10; // 폭발 속도
      p.vy = (Math.random() - 0.5) * 10;
      p.radius = Math.random() * 3 + 2;
      p.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`; // Cyan-Blue 계열
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  private loop = () => {
    if (!this.isRunning) return;
    
    // 1. 배경 지우기 (잔상 효과를 위해 투명도 조절 가능)
    this.ctx.fillStyle = 'rgba(2, 1, 10, 0.3)'; // Dark background with trail
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. 업데이트 및 렌더링
    for (const p of this.particles) {
      if (!p.active) continue;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // 중력 적용 (Gravity exists inside the simulation!)
      p.vx *= 0.99; // 마찰력

      // 바닥 충돌
      if (p.y > this.height) {
        p.y = this.height;
        p.vy *= -0.7; // 탄성
      }
      // 벽 충돌
      if (p.x < 0 || p.x > this.width) p.vx *= -1;

      // 그리기
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();

      // 화면 밖으로 나가거나 멈추면 비활성화 (재사용 대기)
      if (Math.abs(p.vx) < 0.1 && Math.abs(p.vy) < 0.1 && p.y > this.height - 5) {
        p.active = false;
      }
    }

    requestAnimationFrame(this.loop);
  }
}
