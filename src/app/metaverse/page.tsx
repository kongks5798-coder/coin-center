'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Metaverse() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [playerPos, setPlayerPos] = useState({ x: 5, y: 5 });
  const [hp, setHp] = useState(100);
  const [mp, setMp] = useState(50);

  useEffect(() => {
    const storedUser = localStorage.getItem('fieldnine-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  const move = (dx: number, dy: number) => {
    setPlayerPos(prev => ({
      x: Math.max(0, Math.min(9, prev.x + dx)),
      y: Math.max(0, Math.min(9, prev.y + dy))
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#02010a] text-white p-6">
      {/* 헤더 */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          🌐 3D 메타버스
        </h1>
        <Link href="/workspace" className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
          ← 나가기
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* 플레이어 정보 */}
        <div className="bg-white/5 border border-cyan-500/50 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">👤</div>
            <div>
              <div className="text-2xl font-bold">{user.name}</div>
              <div className="text-sm text-cyan-400">{user.department}</div>
            </div>
          </div>
          
          {/* HP */}
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-green-400">HP</span>
              <span>{hp}/100</span>
            </div>
            <div className="h-4 bg-black/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all" style={{width: `${hp}%`}} />
            </div>
          </div>

          {/* MP */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-400">MP</span>
              <span>{mp}/50</span>
            </div>
            <div className="h-4 bg-black/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all" style={{width: `${(mp/50)*100}%`}} />
            </div>
          </div>
        </div>

        {/* 맵 */}
        <div className="bg-white/5 border border-cyan-500/50 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">🗺️ 사이버 월드</h2>
          <div className="grid grid-cols-10 gap-2 mb-4">
            {Array.from({length: 100}, (_, i) => {
              const x = i % 10;
              const y = Math.floor(i / 10);
              const isPlayer = x === playerPos.x && y === playerPos.y;
              
              return (
                <div
                  key={i}
                  className={`aspect-square rounded flex items-center justify-center text-2xl transition-all ${
                    isPlayer 
                      ? 'bg-gradient-to-br from-cyan-600 to-blue-600 scale-110 shadow-lg shadow-cyan-500/50' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {isPlayer && '👤'}
                </div>
              );
            })}
          </div>

          {/* 이동 컨트롤 */}
          <div className="flex flex-col items-center gap-2">
            <button onClick={() => move(0, -1)} className="px-8 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-500 font-bold">
              ↑
            </button>
            <div className="flex gap-2">
              <button onClick={() => move(-1, 0)} className="px-8 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-500 font-bold">
                ←
              </button>
              <button onClick={() => move(1, 0)} className="px-8 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-500 font-bold">
                →
              </button>
            </div>
            <button onClick={() => move(0, 1)} className="px-8 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-500 font-bold">
              ↓
            </button>
          </div>
        </div>

        {/* 스킬 */}
        <div className="bg-white/5 border border-cyan-500/50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">⚡ 스킬</h2>
          <div className="grid grid-cols-4 gap-4">
            <button className="aspect-square bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex flex-col items-center justify-center hover:scale-105 transition-transform">
              <span className="text-4xl mb-2">🔥</span>
              <span className="text-sm font-bold">파이어</span>
            </button>
            <button className="aspect-square bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex flex-col items-center justify-center hover:scale-105 transition-transform">
              <span className="text-4xl mb-2">❄️</span>
              <span className="text-sm font-bold">아이스</span>
            </button>
            <button className="aspect-square bg-gradient-to-br from-yellow-600 to-amber-600 rounded-xl flex flex-col items-center justify-center hover:scale-105 transition-transform">
              <span className="text-4xl mb-2">⚡</span>
              <span className="text-sm font-bold">썬더</span>
            </button>
            <button className="aspect-square bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex flex-col items-center justify-center hover:scale-105 transition-transform">
              <span className="text-4xl mb-2">✨</span>
              <span className="text-sm font-bold">힐</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
