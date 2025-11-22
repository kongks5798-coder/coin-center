'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 🏰 삼국지 조조전 스타일 메타버스
// CSS 픽셀 아트로 구현 (용량 최소화!)

interface Character {
  id: string;
  name: string;
  position: { x: number; y: number };
  faction: string;
  stats: {
    power: number;      // 무력
    intelligence: number; // 지력
    politics: number;    // 정치
    leadership: number;  // 통솔
  };
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  exp: number;
  sprite: string;
  color: string;
}

interface Tile {
  x: number;
  y: number;
  type: 'grass' | 'castle' | 'mountain' | 'water' | 'road';
  occupant: string | null;
}

type GameMode = 'move' | 'attack' | 'skill' | 'menu';

export default function ClassicMetaverse() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [myCharacter, setMyCharacter] = useState<Character | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('move');
  const [turnPhase, setTurnPhase] = useState<'player' | 'enemy'>('player');
  const [message, setMessage] = useState<string>('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [moveRange, setMoveRange] = useState<{x: number; y: number}[]>([]);
  const [attackRange, setAttackRange] = useState<{x: number; y: number}[]>([]);

  const mapWidth = 16;
  const mapHeight = 12;

  useEffect(() => {
    const storedUser = localStorage.getItem('fieldnine-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);

    // 타일맵 생성
    const generatedTiles: Tile[] = [];
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        let type: Tile['type'] = 'grass';
        
        // 성 (중앙)
        if ((x === 7 || x === 8) && (y === 5 || y === 6)) type = 'castle';
        // 산 (외곽)
        else if (x === 0 || x === mapWidth - 1 || y === 0 || y === mapHeight - 1) {
          type = Math.random() > 0.6 ? 'mountain' : 'grass';
        }
        // 물
        else if (y === 3 && x > 2 && x < 13) type = 'water';
        // 도로
        else if (x === 7 || x === 8) type = 'road';

        generatedTiles.push({ x, y, type, occupant: null });
      }
    }
    setTiles(generatedTiles);

    // 캐릭터 생성 (FIELD NINE 직원들)
    const newCharacters: Character[] = [
      {
        id: '1',
        name: '공경수', // 조조
        position: { x: 7, y: 10 },
        faction: 'wei',
        stats: { power: 75, intelligence: 95, politics: 98, leadership: 92 },
        level: 50,
        hp: 850,
        maxHp: 850,
        mp: 450,
        maxMp: 450,
        exp: 8500,
        sprite: '👑',
        color: '#4169E1'
      },
      {
        id: '2',
        name: '김필드', // 관우
        position: { x: 6, y: 9 },
        faction: 'wei',
        stats: { power: 98, intelligence: 72, politics: 65, leadership: 88 },
        level: 48,
        hp: 920,
        maxHp: 920,
        mp: 320,
        maxMp: 320,
        exp: 7800,
        sprite: '⚔️',
        color: '#DC143C'
      },
      {
        id: '3',
        name: '이크리에이티브', // 제갈량
        position: { x: 8, y: 9 },
        faction: 'wei',
        stats: { power: 35, intelligence: 100, politics: 88, leadership: 95 },
        level: 47,
        hp: 580,
        maxHp: 580,
        mp: 680,
        maxMp: 680,
        exp: 7200,
        sprite: '🔮',
        color: '#9370DB'
      },
      {
        id: '4',
        name: '박나인', // 여포
        position: { x: 5, y: 10 },
        faction: 'wei',
        stats: { power: 100, intelligence: 28, politics: 15, leadership: 68 },
        level: 52,
        hp: 1050,
        maxHp: 1050,
        mp: 200,
        maxMp: 200,
        exp: 9800,
        sprite: '🗡️',
        color: '#FF4500'
      },
      // 적군
      {
        id: 'e1',
        name: '적장병',
        position: { x: 10, y: 3 },
        faction: 'enemy',
        stats: { power: 65, intelligence: 40, politics: 30, leadership: 50 },
        level: 35,
        hp: 650,
        maxHp: 650,
        mp: 180,
        maxMp: 180,
        exp: 0,
        sprite: '🛡️',
        color: '#8B0000'
      },
      {
        id: 'e2',
        name: '적궁병',
        position: { x: 12, y: 2 },
        faction: 'enemy',
        stats: { power: 55, intelligence: 45, politics: 25, leadership: 40 },
        level: 32,
        hp: 480,
        maxHp: 480,
        mp: 200,
        maxMp: 200,
        exp: 0,
        sprite: '🏹',
        color: '#A52A2A'
      },
      {
        id: 'e3',
        name: '적군사',
        position: { x: 11, y: 4 },
        faction: 'enemy',
        stats: { power: 30, intelligence: 78, politics: 60, leadership: 65 },
        level: 38,
        hp: 420,
        maxHp: 420,
        mp: 450,
        maxMp: 450,
        exp: 0,
        sprite: '📿',
        color: '#800080'
      }
    ];

    setCharacters(newCharacters);
    setMyCharacter(newCharacters.find(c => c.faction === 'wei') || null);
    
    showMessage('삼국지 조조전 스타일 메타버스에 입장하셨습니다!');
    setTimeout(() => {
      showDialogBox('공경수: 여러분, FIELD NINE의 천하통일을 시작합니다!');
    }, 1000);
  }, [router]);

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const showDialogBox = (text: string) => {
    setDialogText(text);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setDialogText('');
  };

  const getTileColor = (type: Tile['type']) => {
    switch (type) {
      case 'grass': return '#2d5016';
      case 'castle': return '#8b7355';
      case 'mountain': return '#5a4a3a';
      case 'water': return '#1e3a8a';
      case 'road': return '#9ca3af';
      default: return '#2d5016';
    }
  };

  const handleTileClick = (tile: Tile) => {
    if (!myCharacter) return;

    if (gameMode === 'move') {
      // 이동 범위 계산 (3칸)
      const range = calculateMoveRange(myCharacter.position, 3);
      if (range.some(r => r.x === tile.x && r.y === tile.y) && !tile.occupant) {
        const updated = { ...myCharacter, position: { x: tile.x, y: tile.y } };
        setMyCharacter(updated);
        setCharacters(prev => prev.map(c => c.id === updated.id ? updated : c));
        showMessage(`${myCharacter.name}이(가) 이동했습니다!`);
        setMoveRange([]);
      } else {
        setMoveRange(range);
      }
    } else if (gameMode === 'attack') {
      const enemy = characters.find(c => c.position.x === tile.x && c.position.y === tile.y && c.faction === 'enemy');
      if (enemy && isInRange(myCharacter.position, enemy.position, 1)) {
        attack(myCharacter, enemy);
      }
    }
  };

  const calculateMoveRange = (pos: {x: number; y: number}, range: number) => {
    const result: {x: number; y: number}[] = [];
    for (let dy = -range; dy <= range; dy++) {
      for (let dx = -range; dx <= range; dx++) {
        if (Math.abs(dx) + Math.abs(dy) <= range) {
          const newX = pos.x + dx;
          const newY = pos.y + dy;
          if (newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight) {
            result.push({ x: newX, y: newY });
          }
        }
      }
    }
    return result;
  };

  const isInRange = (pos1: {x: number; y: number}, pos2: {x: number; y: number}, range: number) => {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) <= range;
  };

  const attack = (attacker: Character, defender: Character) => {
    const damage = Math.floor(attacker.stats.power * 0.8 + Math.random() * 50);
    const newHp = Math.max(0, defender.hp - damage);
    
    setCharacters(prev => prev.map(c => 
      c.id === defender.id ? { ...c, hp: newHp } : c
    ));

    showMessage(`${attacker.name}의 공격! ${defender.name}에게 ${damage} 데미지!`);

    if (newHp <= 0) {
      showMessage(`${defender.name}을(를) 격파했습니다!`);
      setCharacters(prev => prev.filter(c => c.id !== defender.id));
    }
  };

  const selectCharacter = (char: Character) => {
    setSelectedChar(char);
    showDialogBox(`${char.name} (Lv.${char.level})
무력: ${char.stats.power} | 지력: ${char.stats.intelligence}
정치: ${char.stats.politics} | 통솔: ${char.stats.leadership}
HP: ${char.hp}/${char.maxHp} | MP: ${char.mp}/${char.maxMp}`);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* 조조전 스타일 UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-black/95">
        
        {/* 상단 정보창 */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-amber-900/90 to-amber-800/90 border-b-4 border-amber-600 p-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-black text-amber-200" style={{ fontFamily: 'serif' }}>
                삼국지 조조전 × FIELD NINE
              </div>
              <div className="text-sm text-amber-300">
                턴: {turnPhase === 'player' ? '아군' : '적군'}
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/metaverse" className="px-4 py-2 bg-blue-700 border-2 border-blue-500 text-white font-bold hover:bg-blue-600 transition-all">
                🌐 3D 메타버스
              </Link>
              <Link href="/workspace" className="px-4 py-2 bg-amber-700 border-2 border-amber-500 text-white font-bold hover:bg-amber-600 transition-all">
                ← 나가기
              </Link>
            </div>
          </div>
        </div>

        {/* 게임 맵 */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 p-4">
          <div 
            className="grid gap-0.5 bg-black/50 p-2 border-4 border-amber-700"
            style={{ 
              gridTemplateColumns: `repeat(${mapWidth}, 40px)`,
              boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
            }}
          >
            {tiles.map((tile, idx) => {
              const char = characters.find(c => c.position.x === tile.x && c.position.y === tile.y);
              const isInMoveRange = moveRange.some(r => r.x === tile.x && r.y === tile.y);
              
              return (
                <div
                  key={idx}
                  onClick={() => handleTileClick(tile)}
                  className="relative w-10 h-10 cursor-pointer transition-all hover:brightness-125"
                  style={{
                    backgroundColor: getTileColor(tile.type),
                    border: isInMoveRange ? '2px solid yellow' : '1px solid rgba(0,0,0,0.3)',
                    boxShadow: tile.type === 'castle' ? 'inset 0 2px 4px rgba(255,255,255,0.3)' : 'none'
                  }}
                >
                  {/* 캐릭터 스프라이트 */}
                  {char && (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectCharacter(char);
                      }}
                      className="absolute inset-0 flex items-center justify-center text-2xl animate-bounce cursor-pointer"
                      style={{
                        filter: char.faction === 'enemy' ? 'hue-rotate(180deg)' : 'none',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                      }}
                    >
                      {char.sprite}
                    </div>
                  )}

                  {/* HP 바 */}
                  {char && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400"
                        style={{ width: `${(char.hp / char.maxHp) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 조조전 스타일 대화창 */}
        {showDialog && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl">
            <div className="bg-gradient-to-b from-amber-800 to-amber-900 border-4 border-amber-600 p-6 mx-4">
              <div className="text-amber-100 text-lg leading-relaxed whitespace-pre-line" style={{ fontFamily: 'serif' }}>
                {dialogText}
              </div>
              <button
                onClick={closeDialog}
                className="mt-4 px-6 py-2 bg-amber-700 border-2 border-amber-500 text-white font-bold hover:bg-amber-600"
              >
                ▼ 확인
              </button>
            </div>
          </div>
        )}

        {/* 하단 커맨드 메뉴 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/95 to-amber-800/95 border-t-4 border-amber-600 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setGameMode('move')}
                className={`px-6 py-3 font-bold border-2 transition-all ${
                  gameMode === 'move' 
                    ? 'bg-blue-600 border-blue-400 text-white' 
                    : 'bg-amber-700 border-amber-500 text-amber-200 hover:bg-amber-600'
                }`}
              >
                🚶 이동
              </button>
              <button
                onClick={() => setGameMode('attack')}
                className={`px-6 py-3 font-bold border-2 transition-all ${
                  gameMode === 'attack' 
                    ? 'bg-red-600 border-red-400 text-white' 
                    : 'bg-amber-700 border-amber-500 text-amber-200 hover:bg-amber-600'
                }`}
              >
                ⚔️ 공격
              </button>
              <button
                onClick={() => setGameMode('skill')}
                className={`px-6 py-3 font-bold border-2 transition-all ${
                  gameMode === 'skill' 
                    ? 'bg-purple-600 border-purple-400 text-white' 
                    : 'bg-amber-700 border-amber-500 text-amber-200 hover:bg-amber-600'
                }`}
              >
                🔮 계략
              </button>
              <button
                onClick={() => setGameMode('menu')}
                className={`px-6 py-3 font-bold border-2 transition-all ${
                  gameMode === 'menu' 
                    ? 'bg-green-600 border-green-400 text-white' 
                    : 'bg-amber-700 border-amber-500 text-amber-200 hover:bg-amber-600'
                }`}
              >
                📋 메뉴
              </button>
              <button
                onClick={() => {
                  setTurnPhase(turnPhase === 'player' ? 'enemy' : 'player');
                  showMessage(turnPhase === 'player' ? '적군 턴 시작!' : '아군 턴 시작!');
                }}
                className="px-6 py-3 bg-amber-900 border-2 border-amber-700 text-amber-200 font-bold hover:bg-amber-800"
              >
                ⏭️ 턴 종료
              </button>
            </div>

            {/* 캐릭터 정보 */}
            {myCharacter && (
              <div className="bg-black/60 border-2 border-amber-600 px-6 py-3">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{myCharacter.sprite}</div>
                  <div>
                    <div className="text-amber-200 font-bold text-lg">{myCharacter.name} Lv.{myCharacter.level}</div>
                    <div className="flex gap-3 text-sm">
                      <span className="text-red-400">HP: {myCharacter.hp}/{myCharacter.maxHp}</span>
                      <span className="text-blue-400">MP: {myCharacter.mp}/{myCharacter.maxMp}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 메시지 */}
        {message && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 border-4 border-amber-600 px-8 py-4 animate-pulse">
            <div className="text-amber-200 text-2xl font-bold text-center" style={{ fontFamily: 'serif' }}>
              {message}
            </div>
          </div>
        )}

        {/* 미니맵 */}
        <div className="absolute top-24 right-6 bg-black/80 border-2 border-amber-600 p-2">
          <div className="text-amber-400 text-xs font-bold mb-1">미니맵</div>
          <div 
            className="grid gap-px"
            style={{ gridTemplateColumns: `repeat(${mapWidth}, 6px)` }}
          >
            {tiles.map((tile, idx) => {
              const char = characters.find(c => c.position.x === tile.x && c.position.y === tile.y);
              return (
                <div
                  key={idx}
                  className="w-1.5 h-1.5"
                  style={{
                    backgroundColor: char 
                      ? (char.faction === 'wei' ? '#4169E1' : '#DC143C')
                      : getTileColor(tile.type),
                    opacity: 0.8
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* 아군 목록 */}
        <div className="absolute top-64 right-6 bg-black/80 border-2 border-amber-600 p-3 w-64">
          <div className="text-amber-400 font-bold mb-2">아군 부대</div>
          <div className="space-y-2">
            {characters.filter(c => c.faction === 'wei').map(char => (
              <div
                key={char.id}
                onClick={() => selectCharacter(char)}
                className="flex items-center gap-2 p-2 bg-blue-900/30 border border-blue-700/50 cursor-pointer hover:bg-blue-800/50 transition-all"
              >
                <span className="text-xl">{char.sprite}</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-bold">{char.name}</div>
                  <div className="text-xs text-gray-400">Lv.{char.level}</div>
                </div>
                <div className="text-xs">
                  <div className="text-red-400">{char.hp}/{char.maxHp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 적군 목록 */}
        <div className="absolute top-64 left-6 bg-black/80 border-2 border-red-600 p-3 w-64">
          <div className="text-red-400 font-bold mb-2">적군 부대</div>
          <div className="space-y-2">
            {characters.filter(c => c.faction === 'enemy').map(char => (
              <div
                key={char.id}
                onClick={() => selectCharacter(char)}
                className="flex items-center gap-2 p-2 bg-red-900/30 border border-red-700/50 cursor-pointer hover:bg-red-800/50 transition-all"
              >
                <span className="text-xl">{char.sprite}</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-bold">{char.name}</div>
                  <div className="text-xs text-gray-400">Lv.{char.level}</div>
                </div>
                <div className="text-xs">
                  <div className="text-red-400">{char.hp}/{char.maxHp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
