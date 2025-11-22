'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 🎮 리니지M 모바일 게임 앱 퀄리티
// Full 3D Graphics + Mobile UI

interface Player {
  id: string;
  name: string;
  character: string;
  class: string;
  avatar: string;
  position: [number, number, number];
  rotation: number;
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  exp: number;
  maxExp: number;
  department: string;
  role: string;
  isMoving: boolean;
  isAttacking: boolean;
  weapon: string;
  color: string;
}

interface Monster {
  id: string;
  name: string;
  position: [number, number, number];
  hp: number;
  maxHp: number;
  level: number;
  type: string;
  isAlive: boolean;
}

interface Skill {
  id: string;
  name: string;
  icon: string;
  cooldown: number;
  currentCooldown: number;
  manaCost: number;
}

const CLASSES = {
  executive: { name: '천제', class: '군주', avatar: '👑', color: '#FFD700', weapon: '용의 검', skill: '천벌' },
  general_manager: { name: '군사', class: '현자', avatar: '🎐', color: '#00CED1', weapon: '지혜의 부채', skill: '화계' },
  director: { name: '무장', class: '검사', avatar: '⚔️', color: '#DC143C', weapon: '청룡도', skill: '일기당천' },
  manager: { name: '투사', class: '전사', avatar: '🛡️', color: '#4B0082', weapon: '사모사', skill: '천지붕괴' },
  team_leader: { name: '패자', class: '암살자', avatar: '🗡️', color: '#FF4500', weapon: '의천검', skill: '암흑참' },
  lead: { name: '궁사', class: '궁수', avatar: '🏹', color: '#32CD32', weapon: '신궁', skill: '폭풍의 화살' },
  senior: { name: '광전사', class: '버서커', avatar: '🔱', color: '#FF1493', weapon: '방천화극', skill: '광폭화' },
  staff: { name: '용사', class: '기사', avatar: '🐉', color: '#4169E1', weapon: '용담창', skill: '용의 분노' },
  intern: { name: '견습생', class: '수습', avatar: '🐎', color: '#DAA520', weapon: '연습검', skill: '돌진' },
};

// 3D 캐릭터 컴포넌트
function Character({ player, isMe }: { player: Player; isMe: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // 이동 애니메이션
    if (player.isMoving) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.1 + 1;
    } else {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 1, 0.1);
    }

    // 공격 애니메이션
    if (player.isAttacking) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 20) * 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2);
    }

    // 회전 (부드럽게)
    if (meshRef.current.rotation.y !== player.rotation) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        player.rotation,
        0.15
      );
    }
  });

  return (
    <group position={player.position}>
      {/* 그림자 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color="#000000" opacity={0.3} transparent />
      </mesh>

      {/* 캐릭터 몸통 */}
      <mesh
        ref={meshRef}
        position={[0, 1, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[0.4, 0.4, 1.5, 16]} />
        <meshStandardMaterial
          color={player.color}
          emissive={player.color}
          emissiveIntensity={isMe ? 0.3 : 0.1}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* 머리 */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color={player.color}
          emissive={player.color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* 본인 강조 링 */}
      {isMe && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.7, 0.9, 32]} />
          <meshBasicMaterial color="#FFD700" opacity={0.6} transparent />
        </mesh>
      )}

      {/* 호버 효과 */}
      {hovered && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 2.5, 0]}>
          <ringGeometry args={[0.5, 0.6, 32]} />
          <meshBasicMaterial color="#00FFFF" opacity={0.8} transparent />
        </mesh>
      )}

      {/* HP 바 (3D 스프라이트) */}
      <sprite position={[0, 3, 0]} scale={[2, 0.3, 1]}>
        <spriteMaterial color="#000000" opacity={0.7} transparent />
      </sprite>
      <sprite position={[0, 3, 0]} scale={[(player.hp / player.maxHp) * 2, 0.2, 1]}>
        <spriteMaterial color="#DC143C" />
      </sprite>
    </group>
  );
}

// 3D 몬스터 컴포넌트
function Monster3D({ monster }: { monster: Monster }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !monster.isAlive) return;
    
    // 떠다니는 애니메이션
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 1.5;
    meshRef.current.rotation.y += 0.01;
  });

  if (!monster.isAlive) return null;

  const colors: Record<string, string> = {
    orc: '#8B4513',
    wolf: '#696969',
    elf: '#800080',
    dragon: '#8B0000'
  };

  return (
    <group position={monster.position}>
      {/* 그림자 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial color="#000000" opacity={0.4} transparent />
      </mesh>

      {/* 몬스터 몸통 */}
      <mesh ref={meshRef} position={[0, 1.5, 0]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color={colors[monster.type] || '#666666'}
          emissive={colors[monster.type] || '#666666'}
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* HP 바 */}
      <sprite position={[0, 3, 0]} scale={[2, 0.3, 1]}>
        <spriteMaterial color="#000000" opacity={0.7} transparent />
      </sprite>
      <sprite position={[0, 3, 0]} scale={[(monster.hp / monster.maxHp) * 2, 0.2, 1]}>
        <spriteMaterial color="#00FF00" />
      </sprite>
    </group>
  );
}

// 3D 지형
function Terrain() {
  return (
    <>
      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#1a4d2e"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* 그리드 */}
      <gridHelper args={[100, 50, '#00FF00', '#003300']} position={[0, 0.01, 0]} />

      {/* 조명 */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#FFD700" />

      {/* 건물들 (간단한 큐브) */}
      <mesh position={[-15, 2.5, -15]} castShadow>
        <boxGeometry args={[8, 5, 8]} />
        <meshStandardMaterial color="#4169E1" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[15, 3, -15]} castShadow>
        <boxGeometry args={[6, 6, 6]} />
        <meshStandardMaterial color="#DC143C" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[15, 2, 15]} castShadow>
        <boxGeometry args={[7, 4, 7]} />
        <meshStandardMaterial color="#32CD32" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[-15, 4, 15]} castShadow>
        <boxGeometry args={[10, 8, 10]} />
        <meshStandardMaterial color="#8B0000" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* 나무들 */}
      {[-20, -10, 0, 10, 20].map((x, i) =>
        [-20, -10, 0, 10, 20].map((z, j) => (
          <group key={`${i}-${j}`} position={[x + Math.random() * 3, 0, z + Math.random() * 3]}>
            <mesh position={[0, 1, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0, 2.5, 0]} castShadow>
              <sphereGeometry args={[1, 8, 8]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>
          </group>
        ))
      )}
    </>
  );
}

// 카메라 컨트롤러
function CameraController({ target }: { target: [number, number, number] }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.lerp(
      new THREE.Vector3(target[0] + 8, target[1] + 12, target[2] + 8),
      0.05
    );
    camera.lookAt(target[0], target[1], target[2]);
  });

  return null;
}

export default function LineageMMetaverse() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [myPlayer, setMyPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickDirection, setJoystickDirection] = useState({ x: 0, y: 0 });
  const [showSkillMenu, setShowSkillMenu] = useState(false);
  const [levelUpEffect, setLevelUpEffect] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  const joystickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('fieldnine-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);

    const classData = CLASSES[userData.role as keyof typeof CLASSES] || CLASSES.staff;

    // 내 캐릭터
    const newPlayer: Player = {
      id: userData.email,
      name: userData.name,
      character: classData.name,
      class: classData.class,
      avatar: classData.avatar,
      position: [0, 0, 0],
      rotation: 0,
      level: 25,
      hp: 1000,
      maxHp: 1000,
      mp: 500,
      maxMp: 500,
      exp: 4580,
      maxExp: 10000,
      department: userData.department,
      role: userData.role,
      isMoving: false,
      isAttacking: false,
      weapon: classData.weapon,
      color: classData.color
    };
    setMyPlayer(newPlayer);

    // 다른 플레이어들
    const otherPlayers: Player[] = [
      { ...newPlayer, id: 'p1', name: '김필드', position: [5, 0, 5], color: '#00CED1' },
      { ...newPlayer, id: 'p2', name: '이디자인', position: [-5, 0, 5], color: '#4169E1' },
      { ...newPlayer, id: 'p3', name: '박마케팅', position: [5, 0, -5], color: '#FF1493' },
    ];
    setPlayers([newPlayer, ...otherPlayers]);

    // 몬스터 스폰
    const spawnedMonsters: Monster[] = [
      { id: 'm1', name: '오크 전사', position: [10, 0, 10], hp: 800, maxHp: 800, level: 25, type: 'orc', isAlive: true },
      { id: 'm2', name: '늑대', position: [-10, 0, 10], hp: 500, maxHp: 500, level: 20, type: 'wolf', isAlive: true },
      { id: 'm3', name: '다크 엘프', position: [10, 0, -10], hp: 700, maxHp: 700, level: 28, type: 'elf', isAlive: true },
      { id: 'm4', name: '레드 드래곤', position: [-10, 0, -10], hp: 5000, maxHp: 5000, level: 55, type: 'dragon', isAlive: true },
    ];
    setMonsters(spawnedMonsters);

    // 스킬 초기화
    setSkills([
      { id: 's1', name: classData.skill, icon: '⚡', cooldown: 5, currentCooldown: 0, manaCost: 50 },
      { id: 's2', name: '치유', icon: '💚', cooldown: 10, currentCooldown: 0, manaCost: 80 },
      { id: 's3', name: '버프', icon: '✨', cooldown: 15, currentCooldown: 0, manaCost: 100 },
      { id: 's4', name: '순간이동', icon: '🌀', cooldown: 20, currentCooldown: 0, manaCost: 150 },
    ]);

    addNotification('🎮 리니지M 메타버스에 입장했습니다!');
  }, [router]);

  // 조이스틱 이동
  useEffect(() => {
    if (!joystickActive || !myPlayer) return;

    const interval = setInterval(() => {
      const speed = 0.2;
      const newX = myPlayer.position[0] + joystickDirection.x * speed;
      const newZ = myPlayer.position[2] + joystickDirection.y * speed;

      // 맵 경계
      const clampedX = Math.max(-40, Math.min(40, newX));
      const clampedZ = Math.max(-40, Math.min(40, newZ));

      const rotation = Math.atan2(joystickDirection.x, joystickDirection.y);

      const updated: Player = {
        ...myPlayer,
        position: [clampedX, 0, clampedZ],
        rotation,
        isMoving: true
      };

      setMyPlayer(updated);
      setPlayers(prev => prev.map(p => p.id === myPlayer.id ? updated : p));
    }, 50);

    return () => clearInterval(interval);
  }, [joystickActive, joystickDirection, myPlayer]);

  // 스킬 쿨다운
  useEffect(() => {
    const interval = setInterval(() => {
      setSkills(prev => prev.map(skill => ({
        ...skill,
        currentCooldown: Math.max(0, skill.currentCooldown - 1)
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleJoystickStart = (e: React.TouchEvent | React.MouseEvent) => {
    setJoystickActive(true);
    updateJoystickDirection(e);
  };

  const handleJoystickMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!joystickActive) return;
    updateJoystickDirection(e);
  };

  const handleJoystickEnd = () => {
    setJoystickActive(false);
    setJoystickDirection({ x: 0, y: 0 });
    if (myPlayer) {
      setMyPlayer({ ...myPlayer, isMoving: false });
    }
  };

  const updateJoystickDirection = (e: React.TouchEvent | React.MouseEvent) => {
    if (!joystickRef.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const deltaX = (clientX - centerX) / 50;
    const deltaY = (clientY - centerY) / 50;

    const clampedX = Math.max(-1, Math.min(1, deltaX));
    const clampedY = Math.max(-1, Math.min(1, deltaY));

    setJoystickDirection({ x: clampedX, y: clampedY });
  };

  const attack = () => {
    if (!myPlayer || !selectedMonster || !selectedMonster.isAlive) return;

    setMyPlayer({ ...myPlayer, isAttacking: true });

    const damage = Math.floor(Math.random() * 200) + 100;
    setMonsters(prev => prev.map(m =>
      m.id === selectedMonster.id
        ? { ...m, hp: Math.max(0, m.hp - damage), isAlive: m.hp - damage > 0 }
        : m
    ));

    if (selectedMonster.hp - damage <= 0) {
      const expGain = selectedMonster.level * 50;
      const newExp = myPlayer.exp + expGain;
      const levelUp = newExp >= myPlayer.maxExp;

      setMyPlayer(prev => prev ? {
        ...prev,
        exp: levelUp ? newExp - myPlayer.maxExp : newExp,
        level: levelUp ? prev.level + 1 : prev.level,
        isAttacking: false
      } : null);

      if (levelUp) {
        setLevelUpEffect(true);
        addNotification(`✨ LEVEL UP! ${myPlayer.level} → ${myPlayer.level + 1}`);
        setTimeout(() => setLevelUpEffect(false), 2000);
      }

      addNotification(`⚔️ ${selectedMonster.name} 처치! (+${expGain} EXP)`);
      setSelectedMonster(null);
    }

    setTimeout(() => {
      setMyPlayer(prev => prev ? { ...prev, isAttacking: false } : null);
    }, 300);
  };

  const useSkill = (skill: Skill) => {
    if (!myPlayer || skill.currentCooldown > 0 || myPlayer.mp < skill.manaCost) return;

    setSkills(prev => prev.map(s =>
      s.id === skill.id ? { ...s, currentCooldown: s.cooldown } : s
    ));

    setMyPlayer({ ...myPlayer, mp: myPlayer.mp - skill.manaCost, isAttacking: true });

    addNotification(`✨ ${skill.name} 사용!`);

    setTimeout(() => {
      setMyPlayer(prev => prev ? { ...prev, isAttacking: false } : null);
    }, 500);
  };

  const addNotification = (text: string) => {
    setNotifications(prev => [...prev.slice(-4), text]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* 3D 게임 화면 */}
      <div className="absolute inset-0">
        <Canvas shadows gl={{ antialias: true, alpha: false }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[8, 12, 8]} fov={60} />
            <CameraController target={myPlayer?.position || [0, 0, 0]} />
            
            <Terrain />
            
            {players.map(player => (
              <Character key={player.id} player={player} isMe={player.id === myPlayer?.id} />
            ))}

            {monsters.map(monster => (
              <Monster3D key={monster.id} monster={monster} />
            ))}

            <fog attach="fog" args={['#0a0a1a', 40, 100]} />
          </Suspense>
        </Canvas>
      </div>

      {/* 상단 HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          {/* 플레이어 정보 */}
          {myPlayer && (
            <div className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/50 rounded-2xl p-4 pointer-events-auto shadow-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-5xl">{myPlayer.avatar}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-white">{myPlayer.name}</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-sm font-bold">
                      Lv.{myPlayer.level}
                    </span>
                  </div>
                  <div className="text-sm text-yellow-400 font-semibold">{myPlayer.class}</div>
                </div>
              </div>

              {/* HP 바 */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-400 font-bold">HP</span>
                    <span className="text-white/80">{myPlayer.hp}/{myPlayer.maxHp}</span>
                  </div>
                  <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-red-500/50">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 transition-all duration-300"
                      style={{ width: `${(myPlayer.hp / myPlayer.maxHp) * 100}%` }}
                    />
                  </div>
                </div>

                {/* MP 바 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-400 font-bold">MP</span>
                    <span className="text-white/80">{myPlayer.mp}/{myPlayer.maxMp}</span>
                  </div>
                  <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-blue-500/50">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 transition-all duration-300"
                      style={{ width: `${(myPlayer.mp / myPlayer.maxMp) * 100}%` }}
                    />
                  </div>
                </div>

                {/* EXP 바 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-yellow-400 font-bold">EXP</span>
                    <span className="text-white/80">{Math.floor((myPlayer.exp / myPlayer.maxExp) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-yellow-500/50">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 transition-all duration-300"
                      style={{ width: `${(myPlayer.exp / myPlayer.maxExp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 미니맵 */}
          <div className="bg-black/80 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl p-4 pointer-events-auto shadow-2xl">
            <div className="text-sm font-bold mb-2 text-cyan-400">🗺️ 미니맵</div>
            <div className="relative w-48 h-48 bg-gradient-to-br from-green-900/40 to-blue-900/40 rounded-xl border border-cyan-500/30 overflow-hidden">
              {/* 플레이어 위치 */}
              {myPlayer && (
                <div
                  className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-500"
                  style={{
                    left: `${((myPlayer.position[0] + 40) / 80) * 100}%`,
                    top: `${((myPlayer.position[2] + 40) / 80) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              )}
              {/* 몬스터 위치 */}
              {monsters.filter(m => m.isAlive).map(monster => (
                <div
                  key={monster.id}
                  className="absolute w-2 h-2 bg-red-500 rounded-full"
                  style={{
                    left: `${((monster.position[0] + 40) / 80) * 100}%`,
                    top: `${((monster.position[2] + 40) / 80) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 알림 (우측 상단) */}
      <div className="absolute top-4 right-4 space-y-2 pointer-events-none">
        {notifications.map((notif, i) => (
          <div
            key={i}
            className="bg-black/90 backdrop-blur-xl border-2 border-yellow-500/50 rounded-xl px-6 py-3 text-yellow-400 font-bold shadow-2xl animate-pulse"
          >
            {notif}
          </div>
        ))}
      </div>

      {/* 레벨업 이펙트 */}
      {levelUpEffect && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-9xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
            ✨ LEVEL UP! ✨
          </div>
        </div>
      )}

      {/* 하단 UI */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          {/* 조이스틱 (왼쪽) */}
          <div className="relative">
            <div
              ref={joystickRef}
              className="w-40 h-40 bg-black/60 backdrop-blur-xl border-4 border-white/20 rounded-full relative cursor-pointer shadow-2xl"
              onMouseDown={handleJoystickStart}
              onMouseMove={handleJoystickMove}
              onMouseUp={handleJoystickEnd}
              onMouseLeave={handleJoystickEnd}
              onTouchStart={handleJoystickStart}
              onTouchMove={handleJoystickMove}
              onTouchEnd={handleJoystickEnd}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl opacity-30">🎮</div>
              </div>
              {joystickActive && (
                <div
                  className="absolute w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full shadow-lg transition-transform"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${joystickDirection.x * 30}px), calc(-50% + ${joystickDirection.y * 30}px))`
                  }}
                />
              )}
            </div>
          </div>

          {/* 스킬 퀵슬롯 (중앙) */}
          <div className="flex gap-3 mb-4">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => useSkill(skill)}
                disabled={skill.currentCooldown > 0 || (myPlayer?.mp || 0) < skill.manaCost}
                className={`relative w-20 h-20 rounded-2xl border-4 text-4xl transition-all shadow-2xl ${
                  skill.currentCooldown > 0 || (myPlayer?.mp || 0) < skill.manaCost
                    ? 'bg-gray-600/40 border-gray-500/50 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-br from-purple-600 to-pink-600 border-purple-400/50 hover:scale-110 active:scale-95'
                }`}
              >
                {skill.icon}
                {skill.currentCooldown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-xl">
                    <span className="text-2xl font-bold text-white">{skill.currentCooldown}</span>
                  </div>
                )}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-black/80 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {skill.manaCost}MP
                </div>
              </button>
            ))}
          </div>

          {/* 공격 버튼 (오른쪽) */}
          <div className="flex flex-col gap-3">
            <button
              onClick={attack}
              disabled={!selectedMonster || !selectedMonster.isAlive}
              className={`w-28 h-28 rounded-full border-4 text-5xl transition-all shadow-2xl ${
                selectedMonster && selectedMonster.isAlive
                  ? 'bg-gradient-to-br from-red-600 to-orange-600 border-red-400/50 hover:scale-110 active:scale-95 animate-pulse'
                  : 'bg-gray-600/40 border-gray-500/50 cursor-not-allowed opacity-50'
              }`}
            >
              ⚔️
            </button>
            <div className="text-center text-xs font-bold text-white/60">
              {selectedMonster && selectedMonster.isAlive ? '공격' : '타겟 없음'}
            </div>
          </div>
        </div>
      </div>

      {/* 타겟 정보 (좌측 하단) */}
      {selectedMonster && selectedMonster.isAlive && (
        <div className="absolute bottom-52 left-4 bg-black/90 backdrop-blur-xl border-2 border-red-500/50 rounded-2xl p-4 shadow-2xl">
          <div className="text-red-400 font-bold mb-2">🎯 타겟</div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">
              {selectedMonster.type === 'orc' ? '👹' : 
               selectedMonster.type === 'wolf' ? '🐺' :
               selectedMonster.type === 'elf' ? '🧝' : '🐉'}
            </span>
            <div>
              <div className="font-bold text-white">{selectedMonster.name}</div>
              <div className="text-xs text-yellow-400">Lv.{selectedMonster.level}</div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-green-400">HP</span>
              <span className="text-white/80">{selectedMonster.hp}/{selectedMonster.maxHp}</span>
            </div>
            <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-green-500/50">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all"
                style={{ width: `${(selectedMonster.hp / selectedMonster.maxHp) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 상단 메뉴 (우측) */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Link
          href="/workspace"
          className="px-6 py-3 bg-black/80 backdrop-blur-xl border-2 border-white/20 rounded-xl font-bold text-white hover:border-white/40 transition-all shadow-2xl"
        >
          ← 나가기
        </Link>
      </div>

      {/* 몬스터 선택 (디버그용) */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/80 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-4 shadow-2xl">
        <div className="text-sm font-bold mb-3 text-white">👾 몬스터 목록</div>
        <div className="space-y-2">
          {monsters.filter(m => m.isAlive).map(monster => (
            <button
              key={monster.id}
              onClick={() => setSelectedMonster(monster)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedMonster?.id === monster.id
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {monster.name} Lv.{monster.level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
