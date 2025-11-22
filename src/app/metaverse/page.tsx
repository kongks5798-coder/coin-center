'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// FIELD NINE 메타버스 - 삼국지 리니지 스타일
// 3D 아이소메트릭 뷰 + 중국풍 건물

interface Player {
  id: string;
  name: string;
  character: string; // 삼국지 캐릭터
  avatar: string;
  x: number;
  y: number;
  z: number; // 높이 (3D)
  department: string;
  role: string;
  direction: 'down' | 'up' | 'left' | 'right';
}

interface Message {
  id: string;
  player: string;
  text: string;
  timestamp: string;
}

// 삼국지 캐릭터 데이터
const CHARACTERS = {
  executive: { name: '유비 현덕', avatar: '👑', color: '#FFD700', weapon: '쌍검' },
  general_manager: { name: '제갈량 공명', avatar: '🎐', color: '#00CED1', weapon: '깃털부채' },
  director: { name: '관우 운장', avatar: '⚔️', color: '#DC143C', weapon: '청룡언월도' },
  manager: { name: '장비 익덕', avatar: '🛡️', color: '#4B0082', weapon: '사모사' },
  team_leader: { name: '조조 맹덕', avatar: '🗡️', color: '#FF4500', weapon: '의천검' },
  lead: { name: '손권 중모', avatar: '🏹', color: '#32CD32', weapon: '활' },
  senior: { name: '여포 봉선', avatar: '🔱', color: '#FF1493', weapon: '방천화극' },
  staff: { name: '조운 자룡', avatar: '🐉', color: '#4169E1', weapon: '용담창' },
  intern: { name: '마초 맹기', avatar: '🐎', color: '#DAA520', weapon: '호두쌍창' },
};

const OFFICE_MAP_3D = {
  width: 1000,
  height: 800,
  buildings: [
    { id: 'palace', name: '대전(大殿)', x: 100, y: 100, width: 250, height: 200, floors: 3, type: 'palace', color: '#FFD700' },
    { id: 'pavilion1', name: '좌정자(左亭)', x: 400, y: 80, width: 180, height: 140, floors: 2, type: 'pavilion', color: '#DC143C' },
    { id: 'pavilion2', name: '우정자(右亭)', x: 400, y: 250, width: 180, height: 140, floors: 2, type: 'pavilion', color: '#4169E1' },
    { id: 'garden', name: '후원(後園)', x: 650, y: 80, width: 300, height: 180, floors: 1, type: 'garden', color: '#32CD32' },
    { id: 'hall', name: '무덕전(武德殿)', x: 100, y: 350, width: 450, height: 300, floors: 2, type: 'hall', color: '#4B0082' },
    { id: 'tower', name: '천문대(天文臺)', x: 650, y: 300, width: 200, height: 250, floors: 5, type: 'tower', color: '#00CED1' },
  ],
  trees: [
    { x: 50, y: 50 }, { x: 950, y: 50 }, { x: 50, y: 750 }, { x: 950, y: 750 },
    { x: 380, y: 420 }, { x: 620, y: 260 }, { x: 300, y: 600 },
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
  const [cameraX, setCameraX] = useState(0);
  const [cameraY, setCameraY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('fieldnine-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);

    const character = CHARACTERS[userData.role as keyof typeof CHARACTERS] || CHARACTERS.staff;

    // 내 플레이어 생성
    const newPlayer: Player = {
      id: userData.email,
      name: userData.name,
      character: character.name,
      avatar: character.avatar,
      x: 225,
      y: 200,
      z: 0,
      department: userData.department,
      role: userData.role,
      direction: 'down'
    };
    setMyPlayer(newPlayer);

    // 데모 플레이어들 (동료들 - 삼국지 캐릭터)
    const demoPlayers: Player[] = [
      { id: 'p1', name: '김필드', character: '제갈량', avatar: '🎐', x: 450, y: 150, z: 0, department: 'FILLUMINATE', role: 'team_leader', direction: 'down' },
      { id: 'p2', name: '이디자인', character: '조운', avatar: '🐉', x: 300, y: 450, z: 0, department: '디자인팀', role: 'senior', direction: 'right' },
      { id: 'p3', name: '박마케팅', character: '여포', avatar: '🔱', x: 700, y: 200, z: 0, department: 'MARD MARD', role: 'staff', direction: 'left' },
      { id: 'p4', name: '최개발', character: '관우', avatar: '⚔️', x: 750, y: 400, z: 0, department: 'Infrastructure', role: 'lead', direction: 'up' },
    ];
    setPlayers([newPlayer, ...demoPlayers]);
  }, [router]);

  // 키보드로 이동 (8방향)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!myPlayer) return;

      const speed = 15;
      let newX = myPlayer.x;
      let newY = myPlayer.y;
      let newDirection = myPlayer.direction;

      switch(e.key) {
        case 'ArrowUp':
        case 'w':
          newY = Math.max(0, myPlayer.y - speed);
          newDirection = 'up';
          break;
        case 'ArrowDown':
        case 's':
          newY = Math.min(OFFICE_MAP_3D.height - 40, myPlayer.y + speed);
          newDirection = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
          newX = Math.max(0, myPlayer.x - speed);
          newDirection = 'left';
          break;
        case 'ArrowRight':
        case 'd':
          newX = Math.min(OFFICE_MAP_3D.width - 40, myPlayer.x + speed);
          newDirection = 'right';
          break;
      }

      const updated = { ...myPlayer, x: newX, y: newY, direction: newDirection };
      setMyPlayer(updated);
      setPlayers(prev => prev.map(p => p.id === myPlayer.id ? updated : p));

      // 카메라 따라가기
      setCameraX(newX - 400);
      setCameraY(newY - 300);

      // 근처 플레이어 감지 (150px 이내)
      const nearby = players.filter(p => {
        if (p.id === myPlayer.id) return false;
        const distance = Math.sqrt(Math.pow(p.x - newX, 2) + Math.pow(p.y - newY, 2));
        return distance < 150;
      });
      setNearbyPlayers(nearby);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [myPlayer, players]);

  // 3D 아이소메트릭 렌더링
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 배경 (밤하늘 같은 느낌)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#0a0a1a');
    bgGradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 카메라 변환
    ctx.save();
    ctx.translate(-cameraX, -cameraY);

    // 나무 그리기 (배경)
    OFFICE_MAP_3D.trees.forEach(tree => {
      drawTree(ctx, tree.x, tree.y);
    });

    // 건물 그리기 (3D 아이소메트릭)
    OFFICE_MAP_3D.buildings.forEach(building => {
      draw3DBuilding(ctx, building);
    });

    // 플레이어들 그리기 (Y 좌표로 정렬 - 원근감)
    const sortedPlayers = [...players].sort((a, b) => a.y - b.y);
    sortedPlayers.forEach(player => {
      draw3DPlayer(ctx, player, player.id === myPlayer?.id);
    });

    ctx.restore();
  }, [players, myPlayer, nearbyPlayers, cameraX, cameraY]);

  const draw3DBuilding = (ctx: CanvasRenderingContext2D, building: any) => {
    const isoX = building.x;
    const isoY = building.y;
    const w = building.width;
    const h = building.height;
    const floors = building.floors;
    const floorHeight = 20;

    // 그림자
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(isoX + 10, isoY + h + 5, w - 10, 15);

    // 건물 층별로 그리기
    for (let i = 0; i < floors; i++) {
      const offsetY = -i * floorHeight;
      
      // 앞면
      const frontGradient = ctx.createLinearGradient(isoX, isoY + offsetY, isoX, isoY + h + offsetY);
      frontGradient.addColorStop(0, building.color);
      frontGradient.addColorStop(1, adjustColor(building.color, -40));
      ctx.fillStyle = frontGradient;
      ctx.fillRect(isoX, isoY + offsetY, w, h);

      // 테두리
      ctx.strokeStyle = adjustColor(building.color, 40);
      ctx.lineWidth = 2;
      ctx.strokeRect(isoX, isoY + offsetY, w, h);

      // 옆면 (3D 효과)
      ctx.fillStyle = adjustColor(building.color, -60);
      ctx.beginPath();
      ctx.moveTo(isoX + w, isoY + offsetY);
      ctx.lineTo(isoX + w + 15, isoY + offsetY - 10);
      ctx.lineTo(isoX + w + 15, isoY + h + offsetY - 10);
      ctx.lineTo(isoX + w, isoY + h + offsetY);
      ctx.closePath();
      ctx.fill();

      // 윗면
      ctx.fillStyle = adjustColor(building.color, 20);
      ctx.beginPath();
      ctx.moveTo(isoX, isoY + offsetY);
      ctx.lineTo(isoX + 15, isoY + offsetY - 10);
      ctx.lineTo(isoX + w + 15, isoY + offsetY - 10);
      ctx.lineTo(isoX + w, isoY + offsetY);
      ctx.closePath();
      ctx.fill();

      // 창문 (최상층만)
      if (i === floors - 1) {
        ctx.fillStyle = 'rgba(255, 255, 200, 0.6)';
        const windowCols = Math.floor(w / 40);
        const windowRows = Math.floor(h / 50);
        for (let r = 0; r < windowRows; r++) {
          for (let c = 0; c < windowCols; c++) {
            ctx.fillRect(isoX + 15 + c * 40, isoY + 20 + r * 50 + offsetY, 25, 30);
          }
        }
      }
    }

    // 건물 이름
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px serif';
    ctx.textAlign = 'center';
    ctx.fillText(building.name, isoX + w / 2, isoY - floors * floorHeight - 10);
    ctx.textAlign = 'left';
  };

  const draw3DPlayer = (ctx: CanvasRenderingContext2D, player: Player, isMe: boolean) => {
    const x = player.x;
    const y = player.y;
    const size = 40;

    // 그림자
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(x, y + size / 2 + 5, size / 3, size / 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // 캐릭터 몸통 (3D 원기둥)
    const bodyGradient = ctx.createRadialGradient(x, y - size / 4, 0, x, y - size / 4, size / 2);
    const charColor = CHARACTERS[player.role as keyof typeof CHARACTERS]?.color || '#4169E1';
    bodyGradient.addColorStop(0, charColor);
    bodyGradient.addColorStop(1, adjustColor(charColor, -40));
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // 테두리
    ctx.strokeStyle = isMe ? '#FFD700' : 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = isMe ? 3 : 2;
    ctx.stroke();

    // 아바타
    ctx.font = `${size * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(player.avatar, x, y - 5);

    // 이름표 (한자 스타일)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x - 50, y - size - 35, 100, 25);
    ctx.strokeStyle = charColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 50, y - size - 35, 100, 25);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px serif';
    ctx.fillText(player.name, x, y - size - 22);
    ctx.font = '10px serif';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(player.character, x, y - size - 10);

    // 근처에 있으면 강조 (빛나는 효과)
    if (nearbyPlayers.find(p => p.id === player.id)) {
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(x, y, size / 2 + 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 내 위치 강조 (금색 빛)
    if (isMe) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      ctx.arc(x, y, size / 2 + 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const drawTree = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // 나무 그림자
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x, y + 25, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 나무 줄기
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - 5, y - 20, 10, 30);

    // 나무 잎 (3층)
    const leafGradient = ctx.createRadialGradient(x, y - 30, 0, x, y - 30, 25);
    leafGradient.addColorStop(0, '#228B22');
    leafGradient.addColorStop(1, '#006400');
    ctx.fillStyle = leafGradient;
    ctx.beginPath();
    ctx.arc(x, y - 30, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y - 45, 15, 0, Math.PI * 2);
    ctx.fill();
  };

  const adjustColor = (color: string, amount: number) => {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const msg: Message = {
      id: `msg-${Date.now()}`,
      player: `${user.name} (${myPlayer?.character})`,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-yellow-500/30">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent" style={{ fontFamily: 'serif' }}>
                FIELD NINE 삼국지
              </Link>
              <div className="text-sm text-white/40">|</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏯</span>
                <span className="text-lg font-semibold" style={{ fontFamily: 'serif' }}>가상 궁전</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/workspace"
                className="px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg font-medium transition-all"
              >
                ← 워크스페이스로
              </Link>

              <div className="flex items-center gap-3 pl-4 border-l border-yellow-500/30">
                <span className="text-3xl">{myPlayer?.avatar}</span>
                <div>
                  <div className="font-bold" style={{ fontFamily: 'serif' }}>{user.name}</div>
                  <div className="text-sm text-yellow-400" style={{ fontFamily: 'serif' }}>{myPlayer?.character}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* 왼쪽: 게임 화면 */}
          <div className="col-span-2 bg-black/60 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'serif' }}>
                🏯 FIELD NINE 가상 궁전 (삼국지 리니지 스타일)
              </h2>
              <p className="text-sm text-white/60">
                방향키 또는 WASD로 이동 • 3D 아이소메트릭 뷰 • 동료 근처에 가면 대화 가능
              </p>
            </div>

            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full border border-yellow-500/30 rounded-lg bg-gradient-to-b from-[#0a0a1a] to-[#1a1a2e]"
            />

            {/* 컨트롤 */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
                <div className="text-xs text-white/60">좌표</div>
                <div className="text-sm font-bold" style={{ fontFamily: 'monospace' }}>
                  {myPlayer ? `(${Math.round(myPlayer.x)}, ${Math.round(myPlayer.y)})` : '-'}
                </div>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                <div className="text-xs text-white/60">근처 무사</div>
                <div className="text-sm font-bold text-green-400">{nearbyPlayers.length}명</div>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
                <div className="text-xs text-white/60">전체 인원</div>
                <div className="text-sm font-bold text-purple-400">{players.length}명</div>
              </div>
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-center">
                <div className="text-xs text-white/60">상태</div>
                <div className="text-sm font-bold text-cyan-400">입궁(在宮)</div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 채팅 & 정보 */}
          <div className="space-y-6">
            {/* 근처 플레이어 */}
            <div className="bg-black/60 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'serif' }}>⚔️ 근처 무사</h3>
              {nearbyPlayers.length === 0 ? (
                <p className="text-sm text-white/40">근처에 동료가 없습니다</p>
              ) : (
                <div className="space-y-3">
                  {nearbyPlayers.map(player => {
                    const char = CHARACTERS[player.role as keyof typeof CHARACTERS];
                    return (
                      <div key={player.id} className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{player.avatar}</span>
                          <div className="flex-1">
                            <div className="font-bold" style={{ fontFamily: 'serif' }}>{player.name}</div>
                            <div className="text-sm text-yellow-400" style={{ fontFamily: 'serif' }}>{player.character}</div>
                            <div className="text-xs text-white/60">{char?.weapon}</div>
                          </div>
                        </div>
                        <button className="w-full px-3 py-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 rounded text-xs transition-all">
                          대화하기
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 채팅 */}
            <div className="bg-black/60 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'serif' }}>💬 전장 전령</h3>
              
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {messages.map(msg => (
                  <div key={msg.id} className="p-3 bg-gradient-to-r from-yellow-500/5 to-red-500/5 border border-yellow-500/20 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold" style={{ fontFamily: 'serif' }}>{msg.player}</span>
                      <span className="text-xs text-white/40">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-white/80">{msg.text}</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <p className="text-sm text-white/40 text-center py-4">아직 전령이 없습니다</p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="전령 보내기..."
                  className="flex-1 px-4 py-2 bg-black/40 border border-yellow-500/30 rounded-lg focus:outline-none focus:border-yellow-500/60 text-white"
                  style={{ fontFamily: 'serif' }}
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
                  style={{ fontFamily: 'serif' }}
                >
                  전송
                </button>
              </div>
            </div>

            {/* 건물 정보 */}
            <div className="bg-black/60 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'serif' }}>🏯 궁전 지도</h3>
              <div className="space-y-2">
                {OFFICE_MAP_3D.buildings.map(building => (
                  <div key={building.id} className="p-2 bg-gradient-to-r from-yellow-500/5 to-red-500/5 border border-yellow-500/20 rounded flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold" style={{ fontFamily: 'serif' }}>{building.name}</span>
                      <span className="text-xs text-white/60 ml-2">{building.floors}층</span>
                    </div>
                    <span className="text-xs text-yellow-400">
                      {players.filter(p => {
                        return p.x >= building.x && p.x <= building.x + building.width &&
                               p.y >= building.y && p.y <= building.y + building.height;
                      }).length}명
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="mt-8 p-6 bg-gradient-to-br from-yellow-500/20 to-red-500/20 border border-yellow-500/40 rounded-2xl">
          <div className="grid grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🎮</div>
              <div className="text-sm font-bold" style={{ fontFamily: 'serif' }}>방향키 / WASD</div>
              <div className="text-xs text-white/60">무사 이동</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🏯</div>
              <div className="text-sm font-bold" style={{ fontFamily: 'serif' }}>3D 아이소메트릭</div>
              <div className="text-xs text-white/60">리니지 스타일</div>
            </div>
            <div>
              <div className="text-3xl mb-2">⚔️</div>
              <div className="text-sm font-bold" style={{ fontFamily: 'serif' }}>삼국지 캐릭터</div>
              <div className="text-xs text-white/60">9명의 영웅</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🌳</div>
              <div className="text-sm font-bold" style={{ fontFamily: 'serif' }}>중국풍 궁전</div>
              <div className="text-xs text-white/60">6개 건물 + 정원</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
