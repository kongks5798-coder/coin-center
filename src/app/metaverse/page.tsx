'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// FIELD NINE 메타버스 - 리니지M 스타일
// Mobile MMORPG Quality 3D World

interface Player {
  id: string;
  name: string;
  character: string;
  class: string;
  avatar: string;
  x: number;
  y: number;
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  exp: number;
  maxExp: number;
  department: string;
  role: string;
  direction: number; // 0-7 (8방향)
  isMoving: boolean;
  isAttacking: boolean;
  weapon: string;
}

interface Monster {
  id: string;
  name: string;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  level: number;
  type: string;
}

interface Item {
  id: string;
  name: string;
  x: number;
  y: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
}

interface Message {
  id: string;
  player: string;
  text: string;
  type: 'normal' | 'party' | 'guild' | 'system';
  timestamp: string;
}

// 리니지M 직업 (삼국지 + MMORPG)
const CLASSES = {
  executive: { name: '천제(天帝)', class: '군주', avatar: '👑', color: '#FFD700', weapon: '용의 검', skill: '천벌' },
  general_manager: { name: '군사', class: '현자', avatar: '🎐', color: '#00CED1', weapon: '지혜의 부채', skill: '화계' },
  director: { name: '무장', class: '검사', avatar: '⚔️', color: '#DC143C', weapon: '청룡도', skill: '일기당천' },
  manager: { name: '투사', class: '전사', avatar: '🛡️', color: '#4B0082', weapon: '사모사', skill: '천지붕괴' },
  team_leader: { name: '패자', class: '암살자', avatar: '🗡️', color: '#FF4500', weapon: '의천검', skill: '암흑참' },
  lead: { name: '궁사', class: '궁수', avatar: '🏹', color: '#32CD32', weapon: '신궁', skill: '폭풍의 화살' },
  senior: { name: '광전사', class: '버서커', avatar: '🔱', color: '#FF1493', weapon: '방천화극', skill: '광폭화' },
  staff: { name: '용사', class: '기사', avatar: '🐉', color: '#4169E1', weapon: '용담창', skill: '용의 분노' },
  intern: { name: '견습생', class: '수습', avatar: '🐎', color: '#DAA520', weapon: '연습검', skill: '돌진' },
};

// 리니지M 스타일 맵 (3D 아이소메트릭)
const LINEAGE_MAP = {
  width: 1200,
  height: 900,
  zones: [
    { id: 'town', name: '아덴성', x: 100, y: 100, width: 350, height: 280, type: 'safe', color: '#4169E1' },
    { id: 'forest', name: '요정의 숲', x: 500, y: 80, width: 280, height: 220, type: 'hunting', color: '#228B22' },
    { id: 'cave', name: '오크 던전', x: 820, y: 100, width: 320, height: 250, type: 'dungeon', color: '#8B4513' },
    { id: 'field', name: '글루딘 평원', x: 100, y: 420, width: 480, height: 380, type: 'field', color: '#9ACD32' },
    { id: 'boss', name: '드래곤 둥지', x: 620, y: 400, width: 520, height: 400, type: 'boss', color: '#8B0000' },
  ],
  spawns: [
    { type: 'orc', zone: 'cave', count: 5 },
    { type: 'wolf', zone: 'forest', count: 4 },
    { type: 'dragon', zone: 'boss', count: 1 },
  ]
};

export default function LineageMetaverse() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [myPlayer, setMyPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatType, setChatType] = useState<'normal' | 'party' | 'guild'>('normal');
  const [selectedTarget, setSelectedTarget] = useState<Monster | null>(null);
  const [cameraX, setCameraX] = useState(0);
  const [cameraY, setCameraY] = useState(0);
  const [showSkills, setShowSkills] = useState(false);
  const [miniMap, setMiniMap] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('fieldnine-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);

    const classData = CLASSES[userData.role as keyof typeof CLASSES] || CLASSES.staff;

    // 내 캐릭터 생성
    const newPlayer: Player = {
      id: userData.email,
      name: userData.name,
      character: classData.name,
      class: classData.class,
      avatar: classData.avatar,
      x: 225,
      y: 200,
      level: Math.min(50, Math.floor(Math.random() * 30) + 10),
      hp: 1000,
      maxHp: 1000,
      mp: 500,
      maxMp: 500,
      exp: 4580,
      maxExp: 10000,
      department: userData.department,
      role: userData.role,
      direction: 4,
      isMoving: false,
      isAttacking: false,
      weapon: classData.weapon,
    };
    setMyPlayer(newPlayer);

    // 동료 플레이어들
    const demoPlayers: Player[] = [
      { ...newPlayer, id: 'p1', name: '김필드', character: '군사', class: '현자', avatar: '🎐', x: 450, y: 150, level: 38, direction: 2 },
      { ...newPlayer, id: 'p2', name: '이디자인', character: '용사', class: '기사', avatar: '🐉', x: 300, y: 450, level: 42, direction: 6 },
      { ...newPlayer, id: 'p3', name: '박마케팅', character: '광전사', class: '버서커', avatar: '🔱', x: 700, y: 200, level: 35, direction: 0 },
      { ...newPlayer, id: 'p4', name: '최개발', character: '무장', class: '검사', avatar: '⚔️', x: 850, y: 500, level: 45, direction: 4 },
    ];
    setPlayers([newPlayer, ...demoPlayers]);

    // 몬스터 스폰
    const spawnedMonsters: Monster[] = [
      { id: 'm1', name: '오크 전사', x: 900, y: 180, hp: 800, maxHp: 800, level: 25, type: 'orc' },
      { id: 'm2', name: '오크 궁수', x: 1000, y: 220, hp: 600, maxHp: 600, level: 23, type: 'orc' },
      { id: 'm3', name: '늑대', x: 600, y: 150, hp: 500, maxHp: 500, level: 20, type: 'wolf' },
      { id: 'm4', name: '다크 엘프', x: 650, y: 200, hp: 700, maxHp: 700, level: 28, type: 'elf' },
      { id: 'm5', name: '레드 드래곤', x: 850, y: 600, hp: 5000, maxHp: 5000, level: 55, type: 'dragon' },
    ];
    setMonsters(spawnedMonsters);

    // 아이템 드롭
    const droppedItems: Item[] = [
      { id: 'i1', name: '마법 검', x: 320, y: 480, rarity: 'rare', icon: '⚔️' },
      { id: 'i2', name: '체력 물약', x: 560, y: 350, rarity: 'common', icon: '🧪' },
      { id: 'i3', name: '전설의 갑옷', x: 920, y: 650, rarity: 'legendary', icon: '🛡️' },
    ];
    setItems(droppedItems);

    // 시스템 메시지
    const systemMsg: Message = {
      id: 'sys1',
      player: 'SYSTEM',
      text: '🎮 리니지M 스타일 가상세계에 오신 것을 환영합니다!',
      type: 'system',
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([systemMsg]);
  }, [router]);

  // 키보드 이동 (8방향)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!myPlayer) return;

      const speed = 12;
      let newX = myPlayer.x;
      let newY = myPlayer.y;
      let direction = myPlayer.direction;

      switch(e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          newY = Math.max(20, myPlayer.y - speed);
          direction = 0;
          break;
        case 'arrowdown':
        case 's':
          newY = Math.min(LINEAGE_MAP.height - 20, myPlayer.y + speed);
          direction = 4;
          break;
        case 'arrowleft':
        case 'a':
          newX = Math.max(20, myPlayer.x - speed);
          direction = 6;
          break;
        case 'arrowright':
        case 'd':
          newX = Math.min(LINEAGE_MAP.width - 20, myPlayer.x + speed);
          direction = 2;
          break;
        case ' ':
          // 스페이스바 - 공격
          if (selectedTarget) {
            attack(selectedTarget);
          }
          return;
        case 'q':
          // 스킬창 토글
          setShowSkills(!showSkills);
          return;
      }

      const updated = { ...myPlayer, x: newX, y: newY, direction, isMoving: true };
      setMyPlayer(updated);
      setPlayers(prev => prev.map(p => p.id === myPlayer.id ? updated : p));

      // 카메라 따라가기 (부드럽게)
      setCameraX(newX - 400);
      setCameraY(newY - 300);

      // 몬스터 자동 타겟팅 (100px 이내)
      const nearestMonster = monsters.find(m => {
        const dist = Math.sqrt(Math.pow(m.x - newX, 2) + Math.pow(m.y - newY, 2));
        return dist < 100 && m.hp > 0;
      });
      if (nearestMonster) {
        setSelectedTarget(nearestMonster);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!myPlayer) return;
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        setMyPlayer(prev => prev ? { ...prev, isMoving: false } : null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [myPlayer, monsters, selectedTarget, showSkills]);

  // 공격 시스템
  const attack = (target: Monster) => {
    if (!myPlayer) return;

    setMyPlayer({ ...myPlayer, isAttacking: true });

    // 데미지 계산
    const damage = Math.floor(Math.random() * 200) + 100;
    setMonsters(prev => prev.map(m => 
      m.id === target.id ? { ...m, hp: Math.max(0, m.hp - damage) } : m
    ));

    // 경험치 획득 (몬스터 처치 시)
    if (target.hp - damage <= 0) {
      const expGain = target.level * 50;
      setMyPlayer(prev => prev ? { 
        ...prev, 
        exp: prev.exp + expGain,
        isAttacking: false 
      } : null);

      // 시스템 메시지
      addMessage('SYSTEM', `⚔️ ${target.name}을(를) 처치했습니다! (+${expGain} EXP)`, 'system');

      // 아이템 드롭 (30% 확률)
      if (Math.random() < 0.3) {
        const rarities: ('common' | 'rare' | 'epic' | 'legendary')[] = ['common', 'rare', 'epic', 'legendary'];
        const rarity = rarities[Math.floor(Math.random() * rarities.length)];
        const newItem: Item = {
          id: `item-${Date.now()}`,
          name: `${rarity} 아이템`,
          x: target.x,
          y: target.y,
          rarity,
          icon: ['💎', '⚔️', '🛡️', '🧪'][Math.floor(Math.random() * 4)]
        };
        setItems(prev => [...prev, newItem]);
      }
    }

    setTimeout(() => {
      setMyPlayer(prev => prev ? { ...prev, isAttacking: false } : null);
    }, 300);
  };

  // 채팅 메시지
  const addMessage = (player: string, text: string, type: 'normal' | 'party' | 'guild' | 'system' = 'normal') => {
    const msg: Message = {
      id: `msg-${Date.now()}`,
      player,
      text,
      type,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev.slice(-50), msg]);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;
    addMessage(user.name, newMessage, chatType);
    setNewMessage('');
  };

  // 리니지M 스타일 렌더링
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // 배경
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#0f0f23');
      bgGradient.addColorStop(0.5, '#1a1a3e');
      bgGradient.addColorStop(1, '#0f0f23');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(-cameraX, -cameraY);

      // 지형 그리기
      LINEAGE_MAP.zones.forEach(zone => {
        drawZone(ctx, zone);
      });

      // 아이템 그리기
      items.forEach(item => {
        drawItem(ctx, item);
      });

      // 몬스터 그리기 (Y 정렬)
      const sortedMonsters = [...monsters].sort((a, b) => a.y - b.y);
      sortedMonsters.forEach(monster => {
        if (monster.hp > 0) {
          drawMonster(ctx, monster, selectedTarget?.id === monster.id);
        }
      });

      // 플레이어 그리기 (Y 정렬)
      const sortedPlayers = [...players].sort((a, b) => a.y - b.y);
      sortedPlayers.forEach(player => {
        drawPlayer(ctx, player, player.id === myPlayer?.id);
      });

      // 스킬 이펙트
      if (myPlayer?.isAttacking && selectedTarget) {
        drawSkillEffect(ctx, myPlayer, selectedTarget);
      }

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [players, monsters, items, myPlayer, selectedTarget, cameraX, cameraY]);

  const drawZone = (ctx: CanvasRenderingContext2D, zone: any) => {
    // 지형 그라데이션
    const gradient = ctx.createRadialGradient(
      zone.x + zone.width / 2, zone.y + zone.height / 2, 0,
      zone.x + zone.width / 2, zone.y + zone.height / 2, zone.width / 2
    );
    gradient.addColorStop(0, zone.color + 'AA');
    gradient.addColorStop(1, zone.color + '33');
    ctx.fillStyle = gradient;
    ctx.fillRect(zone.x, zone.y, zone.width, zone.height);

    // 테두리
    ctx.strokeStyle = zone.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);

    // 지역명
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 8;
    ctx.fillText(zone.name, zone.x + zone.width / 2, zone.y + 30);
    ctx.shadowBlur = 0;
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, player: Player, isMe: boolean) => {
    const x = player.x;
    const y = player.y;
    const size = 45;

    // 그림자
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(x, y + size / 2 + 8, size / 2.5, size / 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // 캐릭터 본체 (3D 원기둥)
    const classData = CLASSES[player.role as keyof typeof CLASSES];
    const gradient = ctx.createRadialGradient(x, y - 5, 0, x, y - 5, size / 2);
    gradient.addColorStop(0, classData?.color || '#4169E1');
    gradient.addColorStop(0.7, adjustColor(classData?.color || '#4169E1', -30));
    gradient.addColorStop(1, adjustColor(classData?.color || '#4169E1', -60));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // 테두리 (본인은 금색, 다른 플레이어는 흰색)
    ctx.strokeStyle = isMe ? '#FFD700' : 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = isMe ? 4 : 2;
    ctx.stroke();

    // 아바타
    ctx.font = `${size * 0.65}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(player.avatar, x, y - 3);

    // 이름 & 레벨
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(x - 60, y - size - 50, 120, 38);
    ctx.strokeStyle = classData?.color || '#4169E1';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 60, y - size - 50, 120, 38);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 13px Arial';
    ctx.fillText(player.name, x, y - size - 36);
    ctx.font = '11px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(`Lv.${player.level} ${player.class}`, x, y - size - 20);

    // HP 바
    const hpBarWidth = 100;
    const hpBarHeight = 8;
    const hpPercent = player.hp / player.maxHp;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x - hpBarWidth / 2, y + size / 2 + 12, hpBarWidth, hpBarHeight);
    
    const hpGradient = ctx.createLinearGradient(x - hpBarWidth / 2, 0, x + hpBarWidth / 2, 0);
    hpGradient.addColorStop(0, '#DC143C');
    hpGradient.addColorStop(1, '#FF6B6B');
    ctx.fillStyle = hpGradient;
    ctx.fillRect(x - hpBarWidth / 2, y + size / 2 + 12, hpBarWidth * hpPercent, hpBarHeight);

    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 1;
    ctx.strokeRect(x - hpBarWidth / 2, y + size / 2 + 12, hpBarWidth, hpBarHeight);

    // 이동 중 효과
    if (player.isMoving) {
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(x, y, size / 2 + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 본인 강조
    if (isMe) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(x, y, size / 2 + 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const drawMonster = (ctx: CanvasRenderingContext2D, monster: Monster, isTargeted: boolean) => {
    const x = monster.x;
    const y = monster.y;
    const size = 50;

    // 몬스터 색상
    const colors: Record<string, string> = {
      orc: '#8B4513',
      wolf: '#696969',
      elf: '#800080',
      dragon: '#8B0000'
    };
    const color = colors[monster.type] || '#666';

    // 그림자
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(x, y + size / 2 + 10, size / 2.2, size / 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // 몬스터 몸체
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size / 2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, adjustColor(color, -50));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = isTargeted ? '#FF0000' : 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = isTargeted ? 4 : 2;
    ctx.stroke();

    // 몬스터 아이콘
    const icons: Record<string, string> = {
      orc: '👹',
      wolf: '🐺',
      elf: '🧝',
      dragon: '🐉'
    };
    ctx.font = `${size * 0.7}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icons[monster.type] || '👾', x, y - 2);

    // 이름 & 레벨
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(x - 50, y - size - 40, 100, 28);
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 50, y - size - 40, 100, 28);

    ctx.fillStyle = '#FF6B6B';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(monster.name, x, y - size - 32);
    ctx.font = '10px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(`Lv.${monster.level}`, x, y - size - 18);

    // HP 바
    const hpPercent = monster.hp / monster.maxHp;
    const barWidth = 90;
    const barHeight = 7;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x - barWidth / 2, y + size / 2 + 14, barWidth, barHeight);
    
    const hpGradient = ctx.createLinearGradient(x - barWidth / 2, 0, x + barWidth / 2, 0);
    hpGradient.addColorStop(0, '#00FF00');
    hpGradient.addColorStop(1, '#32CD32');
    ctx.fillStyle = hpGradient;
    ctx.fillRect(x - barWidth / 2, y + size / 2 + 14, barWidth * hpPercent, barHeight);

    // 타겟팅 효과
    if (isTargeted) {
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      ctx.arc(x, y, size / 2 + 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const drawItem = (ctx: CanvasRenderingContext2D, item: Item) => {
    const x = item.x;
    const y = item.y;

    // 빛나는 효과
    const colors: Record<string, string> = {
      common: '#FFFFFF',
      rare: '#4169E1',
      epic: '#9400D3',
      legendary: '#FFD700'
    };
    const color = colors[item.rarity];

    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.font = '28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(item.icon, x, y);
    ctx.shadowBlur = 0;

    // 이름
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(x - 40, y + 15, 80, 20);
    ctx.fillStyle = color;
    ctx.font = 'bold 10px Arial';
    ctx.fillText(item.name, x, y + 28);
  };

  const drawSkillEffect = (ctx: CanvasRenderingContext2D, player: Player, target: Monster) => {
    // 스킬 이펙트 (빛나는 선)
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 파티클 효과
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5;
      const px = target.x + Math.cos(angle) * 30;
      const py = target.y + Math.sin(angle) * 30;
      ctx.fillStyle = `rgba(255, 215, 0, ${0.8 - i * 0.15})`;
      ctx.beginPath();
      ctx.arc(px, py, 6 - i, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const adjustColor = (color: string, amount: number) => {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 상단 헤더 (리니지M 스타일) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 to-black/70 backdrop-blur-xl border-b border-red-500/30">
        <div className="max-w-[1920px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent" style={{ fontFamily: 'serif' }}>
                ⚔️ FIELD NINE LINEAGE
              </div>
              <div className="h-6 w-px bg-yellow-500/30"></div>
              <Link href="/workspace" className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded text-sm transition-all">
                ← 복귀
              </Link>
            </div>

            {/* 플레이어 정보 */}
            {myPlayer && (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-500/20 to-yellow-500/20 border border-yellow-500/40 rounded-lg">
                  <span className="text-3xl">{myPlayer.avatar}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{myPlayer.name}</span>
                      <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/40 rounded text-xs font-bold">
                        Lv.{myPlayer.level}
                      </span>
                    </div>
                    <div className="text-xs text-yellow-400">{myPlayer.class}</div>
                  </div>
                </div>

                {/* HP/MP 바 */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-400 w-8">HP</span>
                    <div className="w-48 h-4 bg-black/60 border border-red-500/30 rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
                        style={{ width: `${(myPlayer.hp / myPlayer.maxHp) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/60 w-20">{myPlayer.hp}/{myPlayer.maxHp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-400 w-8">MP</span>
                    <div className="w-48 h-4 bg-black/60 border border-blue-500/30 rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
                        style={{ width: `${(myPlayer.mp / myPlayer.maxMp) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/60 w-20">{myPlayer.mp}/{myPlayer.maxMp}</span>
                  </div>
                </div>

                {/* EXP 바 */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-yellow-400">EXP</span>
                    <div className="w-32 h-3 bg-black/60 border border-yellow-500/30 rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                        style={{ width: `${(myPlayer.exp / myPlayer.maxExp) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/60">{Math.floor((myPlayer.exp / myPlayer.maxExp) * 100)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="pt-20 flex h-screen">
        {/* 왼쪽 사이드바 */}
        <div className="w-80 bg-black/80 backdrop-blur-xl border-r border-red-500/30 p-4 space-y-4 overflow-y-auto">
          {/* 미니맵 */}
          <div className="bg-gradient-to-br from-red-500/10 to-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <span>🗺️</span>
              <span>월드 맵</span>
            </h3>
            <div className="relative w-full h-48 bg-black/60 border border-yellow-500/20 rounded overflow-hidden">
              {LINEAGE_MAP.zones.map(zone => (
                <div
                  key={zone.id}
                  className="absolute opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{
                    left: `${(zone.x / LINEAGE_MAP.width) * 100}%`,
                    top: `${(zone.y / LINEAGE_MAP.height) * 100}%`,
                    width: `${(zone.width / LINEAGE_MAP.width) * 100}%`,
                    height: `${(zone.height / LINEAGE_MAP.height) * 100}%`,
                    backgroundColor: zone.color + '66',
                    border: `1px solid ${zone.color}`
                  }}
                >
                  <span className="text-[8px] text-white p-1">{zone.name}</span>
                </div>
              ))}
              {myPlayer && (
                <div
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                  style={{
                    left: `${(myPlayer.x / LINEAGE_MAP.width) * 100}%`,
                    top: `${(myPlayer.y / LINEAGE_MAP.height) * 100}%`
                  }}
                />
              )}
            </div>
          </div>

          {/* 타겟 정보 */}
          {selectedTarget && selectedTarget.hp > 0 && (
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/40 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 text-red-400">🎯 타겟</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold">{selectedTarget.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-red-500/20 border border-red-500/40 rounded">
                    Lv.{selectedTarget.level}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>HP</span>
                    <span>{selectedTarget.hp}/{selectedTarget.maxHp}</span>
                  </div>
                  <div className="w-full h-3 bg-black/60 border border-red-500/30 rounded overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-600 to-green-400"
                      style={{ width: `${(selectedTarget.hp / selectedTarget.maxHp) * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => attack(selectedTarget)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all"
                >
                  ⚔️ 공격 (스페이스바)
                </button>
              </div>
            </div>
          )}

          {/* 스킬 창 */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center justify-between">
              <span>✨ 스킬 (Q)</span>
              <button 
                onClick={() => setShowSkills(!showSkills)}
                className="text-xs px-2 py-1 bg-purple-500/20 rounded"
              >
                {showSkills ? '닫기' : '열기'}
              </button>
            </h3>
            {showSkills && myPlayer && (
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <button
                    key={i}
                    className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/40 rounded-lg hover:border-purple-500/80 transition-all flex flex-col items-center justify-center text-xs"
                  >
                    <span className="text-2xl mb-1">⚡</span>
                    <span>스킬{i}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 인벤토리 */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3">🎒 인벤토리</h3>
            <div className="grid grid-cols-4 gap-2">
              {items.slice(0, 8).map(item => (
                <button
                  key={item.id}
                  className="aspect-square bg-black/60 border border-yellow-500/20 rounded hover:border-yellow-500/60 transition-all flex items-center justify-center text-2xl"
                  title={item.name}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 중앙 게임 화면 */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <canvas
              ref={canvasRef}
              width={1200}
              height={700}
              className="w-full h-full border-l border-r border-red-500/20"
            />

            {/* 컨트롤 가이드 */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4 text-xs space-y-1">
              <div className="font-bold text-yellow-400 mb-2">⌨️ 컨트롤</div>
              <div><span className="text-yellow-400">WASD/방향키</span> - 이동</div>
              <div><span className="text-yellow-400">스페이스바</span> - 공격</div>
              <div><span className="text-yellow-400">Q</span> - 스킬창</div>
              <div><span className="text-yellow-400">마우스 클릭</span> - 타겟</div>
            </div>

            {/* FPS & 상태 */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-xl border border-green-500/30 rounded-xl p-3 text-xs">
              <div className="text-green-400 font-bold">🎮 ONLINE</div>
              <div className="text-white/60">Players: {players.length}</div>
              <div className="text-white/60">Monsters: {monsters.filter(m => m.hp > 0).length}</div>
            </div>
          </div>

          {/* 하단 채팅 */}
          <div className="h-56 bg-black/90 backdrop-blur-xl border-t border-red-500/30 p-4">
            <div className="flex gap-2 mb-2">
              {(['normal', 'party', 'guild'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setChatType(type)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    chatType === type
                      ? 'bg-red-500 text-white'
                      : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  }`}
                >
                  {type === 'normal' ? '💬 전체' : type === 'party' ? '👥 파티' : '🏰 길드'}
                </button>
              ))}
            </div>

            <div className="space-y-1 mb-3 h-32 overflow-y-auto">
              {messages.map(msg => (
                <div key={msg.id} className={`text-xs ${
                  msg.type === 'system' ? 'text-yellow-400 font-bold' :
                  msg.type === 'party' ? 'text-cyan-400' :
                  msg.type === 'guild' ? 'text-purple-400' :
                  'text-white'
                }`}>
                  <span className="text-white/40">[{msg.timestamp}]</span>{' '}
                  {msg.type !== 'system' && <span className="font-bold">[{msg.player}]</span>}{' '}
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={`${chatType === 'normal' ? '전체' : chatType === 'party' ? '파티' : '길드'} 채팅...`}
                className="flex-1 px-4 py-2 bg-black/60 border border-red-500/30 rounded-lg focus:outline-none focus:border-red-500/60 text-white text-sm"
              />
              <button
                onClick={sendMessage}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all"
              >
                전송
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
