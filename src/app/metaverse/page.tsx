'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// FIELD NINE 메타버스 - 가상 오피스
// Gather.town + Spatial.io 스타일

interface Player {
  id: string;
  name: string;
  avatar: string;
  x: number;
  y: number;
  department: string;
  role: string;
}

interface Message {
  id: string;
  player: string;
  text: string;
  timestamp: string;
}

const OFFICE_MAP = {
  width: 800,
  height: 600,
  rooms: [
    { id: 'lobby', name: '로비', x: 50, y: 50, width: 200, height: 150, color: 'from-purple-500/20 to-cyan-500/20' },
    { id: 'meeting1', name: '회의실 A', x: 300, y: 50, width: 150, height: 100, color: 'from-blue-500/20 to-indigo-500/20' },
    { id: 'meeting2', name: '회의실 B', x: 300, y: 180, width: 150, height: 100, color: 'from-blue-500/20 to-indigo-500/20' },
    { id: 'lounge', name: '휴게실', x: 500, y: 50, width: 250, height: 120, color: 'from-green-500/20 to-emerald-500/20' },
    { id: 'workspace', name: '작업 공간', x: 50, y: 230, width: 400, height: 320, color: 'from-fuchsia-500/20 to-pink-500/20' },
    { id: 'executive', name: '임원실', x: 500, y: 200, width: 250, height: 150, color: 'from-yellow-500/20 to-orange-500/20' },
  ],
  doors: [
    { from: 'lobby', to: 'meeting1', x: 200, y: 100 },
    { from: 'lobby', to: 'workspace', x: 150, y: 200 },
  ]
};

export default function MetaversePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [myPlayer, setMyPlayer] = useState<Player | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [nearbyPlayers, setNearbyPlayers] = useState<Player[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('fieldnine-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);

    // 내 플레이어 생성
    const newPlayer: Player = {
      id: userData.email,
      name: userData.name,
      avatar: userData.avatar,
      x: 150,
      y: 150,
      department: userData.department,
      role: userData.role
    };
    setMyPlayer(newPlayer);

    // 데모 플레이어들 (동료들)
    const demoPlayers: Player[] = [
      { id: 'player1', name: '김필드', avatar: '👨‍💼', x: 300, y: 200, department: 'FILLUMINATE', role: 'team_leader' },
      { id: 'player2', name: '이디자인', avatar: '🎨', x: 250, y: 350, department: '디자인팀', role: 'senior' },
      { id: 'player3', name: '박마케팅', avatar: '📊', x: 600, y: 100, department: 'MARD MARD', role: 'staff' },
      { id: 'player4', name: '최개발', avatar: '💻', x: 550, y: 280, department: 'Infrastructure', role: 'lead' },
    ];
    setPlayers([newPlayer, ...demoPlayers]);
  }, [router]);

  // 키보드로 이동
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!myPlayer) return;

      const speed = 10;
      let newX = myPlayer.x;
      let newY = myPlayer.y;

      switch(e.key) {
        case 'ArrowUp':
        case 'w':
          newY = Math.max(0, myPlayer.y - speed);
          break;
        case 'ArrowDown':
        case 's':
          newY = Math.min(OFFICE_MAP.height - 30, myPlayer.y + speed);
          break;
        case 'ArrowLeft':
        case 'a':
          newX = Math.max(0, myPlayer.x - speed);
          break;
        case 'ArrowRight':
        case 'd':
          newX = Math.min(OFFICE_MAP.width - 30, myPlayer.x + speed);
          break;
      }

      const updated = { ...myPlayer, x: newX, y: newY };
      setMyPlayer(updated);
      setPlayers(prev => prev.map(p => p.id === myPlayer.id ? updated : p));

      // 근처 플레이어 감지 (100px 이내)
      const nearby = players.filter(p => {
        if (p.id === myPlayer.id) return false;
        const distance = Math.sqrt(Math.pow(p.x - newX, 2) + Math.pow(p.y - newY, 2));
        return distance < 100;
      });
      setNearbyPlayers(nearby);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [myPlayer, players]);

  // 캔버스 렌더링
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 배경
    ctx.fillStyle = '#02010a';
    ctx.fillRect(0, 0, OFFICE_MAP.width, OFFICE_MAP.height);

    // 방 그리기
    OFFICE_MAP.rooms.forEach(room => {
      // 방 배경
      const gradient = ctx.createLinearGradient(room.x, room.y, room.x + room.width, room.y + room.height);
      gradient.addColorStop(0, 'rgba(168, 85, 247, 0.1)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(room.x, room.y, room.width, room.height);

      // 방 테두리
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(room.x, room.y, room.width, room.height);

      // 방 이름
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.fillText(room.name, room.x + 10, room.y + 20);
    });

    // 플레이어들 그리기
    players.forEach(player => {
      // 플레이어 원
      const isMe = player.id === myPlayer?.id;
      ctx.fillStyle = isMe ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.arc(player.x, player.y, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = isMe ? '#a855f7' : '#ffffff40';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 아바타
      ctx.font = '20px Arial';
      ctx.fillText(player.avatar, player.x - 10, player.y + 7);

      // 이름 표시
      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(player.name, player.x, player.y - 20);
      ctx.textAlign = 'left';

      // 근처에 있으면 강조
      if (nearbyPlayers.find(p => p.id === player.id)) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(player.x, player.y, 50, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // 내 위치 강조
    if (myPlayer) {
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(myPlayer.x, myPlayer.y, 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [players, myPlayer, nearbyPlayers]);

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const msg: Message = {
      id: `msg-${Date.now()}`,
      player: user.name,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#02010a] text-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                FIELD NINE
              </Link>
              <div className="text-sm text-white/40">|</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                <span className="text-lg font-semibold">메타버스</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/workspace"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium transition-all"
              >
                ← 워크스페이스로
              </Link>

              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <span className="text-2xl">{user.avatar}</span>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-white/40">{user.department}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* 왼쪽: 게임 화면 */}
          <div className="col-span-2 bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">🏢 FIELD NINE 가상 오피스</h2>
              <p className="text-sm text-white/60">
                방향키 또는 WASD로 이동하세요 • 동료 근처에 가면 대화할 수 있습니다
              </p>
            </div>

            <canvas
              ref={canvasRef}
              width={OFFICE_MAP.width}
              height={OFFICE_MAP.height}
              className="w-full border border-white/20 rounded-lg bg-black"
            />

            {/* 컨트롤 */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              <div className="p-3 bg-white/5 rounded-lg text-center">
                <div className="text-xs text-white/60">위치</div>
                <div className="text-sm font-bold">
                  {myPlayer ? `(${Math.round(myPlayer.x)}, ${Math.round(myPlayer.y)})` : '-'}
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg text-center">
                <div className="text-xs text-white/60">근처 동료</div>
                <div className="text-sm font-bold text-green-400">{nearbyPlayers.length}명</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg text-center">
                <div className="text-xs text-white/60">전체 인원</div>
                <div className="text-sm font-bold text-purple-400">{players.length}명</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg text-center">
                <div className="text-xs text-white/60">상태</div>
                <div className="text-sm font-bold text-cyan-400">온라인</div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 채팅 & 정보 */}
          <div className="space-y-6">
            {/* 근처 플레이어 */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4">👥 근처 동료</h3>
              {nearbyPlayers.length === 0 ? (
                <p className="text-sm text-white/40">근처에 동료가 없습니다</p>
              ) : (
                <div className="space-y-3">
                  {nearbyPlayers.map(player => (
                    <div key={player.id} className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <span className="text-2xl">{player.avatar}</span>
                      <div className="flex-1">
                        <div className="font-medium">{player.name}</div>
                        <div className="text-xs text-white/60">{player.department}</div>
                      </div>
                      <button className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded text-xs transition-all">
                        대화하기
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 채팅 */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4">💬 전체 채팅</h3>
              
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {messages.map(msg => (
                  <div key={msg.id} className="p-2 bg-white/5 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{msg.player}</span>
                      <span className="text-xs text-white/40">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-white/80">{msg.text}</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <p className="text-sm text-white/40 text-center py-4">아직 메시지가 없습니다</p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="메시지 입력..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500/50"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  전송
                </button>
              </div>
            </div>

            {/* 맵 정보 */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4">🗺️ 오피스 맵</h3>
              <div className="space-y-2">
                {OFFICE_MAP.rooms.map(room => (
                  <div key={room.id} className="p-2 bg-white/5 rounded flex items-center justify-between">
                    <span className="text-sm">{room.name}</span>
                    <span className="text-xs text-white/40">
                      {players.filter(p => {
                        return p.x >= room.x && p.x <= room.x + room.width &&
                               p.y >= room.y && p.y <= room.y + room.height;
                      }).length}명
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="mt-8 p-6 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-2xl">
          <div className="grid grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">⌨️</div>
              <div className="text-sm font-medium">방향키 / WASD</div>
              <div className="text-xs text-white/60">캐릭터 이동</div>
            </div>
            <div>
              <div className="text-2xl mb-2">💬</div>
              <div className="text-sm font-medium">채팅</div>
              <div className="text-xs text-white/60">실시간 대화</div>
            </div>
            <div>
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-medium">근접 감지</div>
              <div className="text-xs text-white/60">100px 이내 자동 감지</div>
            </div>
            <div>
              <div className="text-2xl mb-2">🏢</div>
              <div className="text-sm font-medium">6개 공간</div>
              <div className="text-xs text-white/60">로비, 회의실, 작업 공간 등</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
