'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment,
  Sky,
  Stars,
  Sparkles,
  Float,
  MeshDistortMaterial,
  Html,
  useGLTF
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

// 🎮 Ready Player Me 메타버스
// 실제 얼굴로 아바타 생성 가능!

interface Player {
  id: string;
  name: string;
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
  avatarUrl: string;
  color: string;
}

interface Monster {
  id: string;
  name: string;
  position: [number, number, number];
  rotation: number;
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
  color: string;
}

interface Particle {
  id: string;
  position: [number, number, number];
  velocity: [number, number, number];
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

// Ready Player Me 아바타 컴포넌트
function RPMAvatar({ player, isMe }: { player: Player; isMe: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // 걷기 애니메이션
    if (player.isMoving && modelRef.current) {
      modelRef.current.position.y = Math.sin(time * 8) * 0.05;
      modelRef.current.rotation.z = Math.sin(time * 6) * 0.02;
    } else if (modelRef.current) {
      modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, 0, 0.1);
      modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, 0, 0.1);
    }

    // 공격 애니메이션
    if (player.isAttacking && modelRef.current) {
      const attackPhase = Math.sin(time * 25);
      modelRef.current.scale.x = 1 + attackPhase * 0.1;
      modelRef.current.rotation.x = attackPhase * 0.2;
    } else if (modelRef.current) {
      modelRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2);
      modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, 0, 0.2);
    }

    // 회전
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      player.rotation,
      0.15
    );
  });

  return (
    <group ref={groupRef} position={player.position}>
      {/* 그림자 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[0.6, 32]} />
        <meshStandardMaterial
          color="#000000"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      <group ref={modelRef}>
        {/* 임시 캐릭터 (Ready Player Me 아바타 로드 전) */}
        <mesh position={[0, 1, 0]} castShadow>
          <capsuleGeometry args={[0.3, 1.2, 16, 32]} />
          <MeshDistortMaterial
            color={player.color}
            emissive={player.color}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            distort={0.1}
            speed={2}
          />
        </mesh>

        {/* 머리 */}
        <mesh position={[0, 2, 0]} castShadow>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color={player.color}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Ready Player Me 로고 */}
        <mesh position={[0, 2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.4, 32]} />
          <meshBasicMaterial
            color="#00D4FF"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 본인 강조 */}
      {isMe && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <ringGeometry args={[0.7, 0.9, 64]} />
            <meshBasicMaterial
              color="#00D4FF"
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
          <Sparkles
            count={60}
            scale={[2, 3, 2]}
            size={2.5}
            speed={0.4}
            color="#00D4FF"
          />
        </>
      )}

      {/* HP 바 */}
      <Html position={[0, 3, 0]} center>
        <div className="w-48 bg-black/80 rounded-full p-1 border-2 border-cyan-500/60">
          <div
            className="h-2 bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all"
            style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
          />
        </div>
      </Html>

      {/* 이름표 */}
      <Html position={[0, 3.5, 0]} center>
        <div className="text-cyan-400 font-black text-lg drop-shadow-2xl whitespace-nowrap px-4 py-1 bg-black/80 rounded-full border-2 border-cyan-500">
          {player.name}
        </div>
      </Html>
    </group>
  );
}

// 파티클
function ParticleEffect({ particles }: { particles: Particle[] }) {
  return (
    <>
      {particles.map(particle => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={particle.life / particle.maxLife}
          />
        </mesh>
      ))}
    </>
  );
}

// 몬스터
function CyberMonster({ monster }: { monster: Monster }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current || !monster.isAlive) return;
    
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = Math.sin(time * 2 + monster.position[0]) * 0.3 + 1.5;
    meshRef.current.rotation.y += 0.02;
    
    const breathe = Math.sin(time * 3) * 0.05 + 1;
    meshRef.current.scale.set(breathe, breathe, breathe);
  });

  if (!monster.isAlive) return null;

  const colors: Record<string, string> = {
    orc: '#FF0080',
    wolf: '#00FF80',
    elf: '#8000FF',
    dragon: '#FF0000'
  };

  const color = colors[monster.type] || '#00D4FF';

  return (
    <group position={monster.position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.5} />
      </mesh>

      <group ref={meshRef}>
        <mesh castShadow>
          <icosahedronGeometry args={[0.7, 0]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={5}
          />
        </mesh>

        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1, 0.1, 16, 100]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={1}
            roughness={0}
          />
        </mesh>

        <Sparkles count={40} scale={[2, 2, 2]} size={4} speed={0.4} color={color} />
      </group>

      <Html position={[0, 3, 0]} center>
        <div className="w-44 bg-black/80 rounded-full p-1 border-2 border-green-500/60">
          <div
            className="h-2 bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all"
            style={{ width: `${(monster.hp / monster.maxHp) * 100}%` }}
          />
        </div>
      </Html>

      <Html position={[0, 3.5, 0]} center>
        <div className="text-red-400 font-black text-base drop-shadow-lg whitespace-nowrap">
          {monster.name} Lv.{monster.level}
        </div>
      </Html>
    </group>
  );
}

// 사이버 지형
function CyberTerrain() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120, 50, 50]} />
        <meshStandardMaterial
          color="#0a0a1a"
          roughness={0.8}
          metalness={0.3}
        />
      </mesh>

      <gridHelper args={[120, 60, '#00D4FF', '#001a33']} position={[0, 0.02, 0]} />

      {/* 사이버 빌딩들 */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-15, 5, -15]} castShadow>
          <boxGeometry args={[8, 10, 8]} />
          <MeshDistortMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
            distort={0.1}
            speed={1}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[15, 6, -15]} castShadow>
          <cylinderGeometry args={[3, 3, 12, 6]} />
          <MeshDistortMaterial
            color="#FF0080"
            emissive="#FF0080"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            distort={0.15}
            speed={1.5}
          />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
        <mesh position={[15, 5, 15]} castShadow>
          <octahedronGeometry args={[5, 0]} />
          <MeshDistortMaterial
            color="#8000FF"
            emissive="#8000FF"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
            distort={0.2}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[-15, 7, 15]} castShadow>
          <torusGeometry args={[5, 2, 16, 100]} />
          <MeshDistortMaterial
            color="#00FF80"
            emissive="#00FF80"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            distort={0.25}
            speed={2.5}
          />
        </mesh>
      </Float>

      {/* 사이버 서클 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[15, 20, 64]} />
        <meshBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0.6} azimuth={0.25} />

      <ambientLight intensity={0.3} color="#00D4FF" />
      <directionalLight
        position={[20, 30, 20]}
        intensity={1.5}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <pointLight position={[0, 15, 0]} intensity={1.5} color="#00D4FF" />
      <pointLight position={[-20, 10, -20]} intensity={1} color="#FF0080" />
      <pointLight position={[20, 10, 20]} intensity={1} color="#00FF80" />

      <Environment preset="night" />
    </>
  );
}

// 카메라
function CinematicCamera({ target }: { target: [number, number, number] }) {
  const { camera } = useThree();

  useFrame(() => {
    const idealPosition = new THREE.Vector3(target[0] + 12, target[1] + 18, target[2] + 12);
    camera.position.lerp(idealPosition, 0.03);
    camera.position.y += Math.sin(Date.now() * 0.001) * 0.02;
    camera.lookAt(target[0], target[1] + 1, target[2]);
  });

  return null;
}

// 메인
export default function ReadyPlayerMeMetaverse() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [myPlayer, setMyPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickDirection, setJoystickDirection] = useState({ x: 0, y: 0 });
  const [levelUpEffect, setLevelUpEffect] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [combo, setCombo] = useState(0);
  const [comboTimer, setComboTimer] = useState<NodeJS.Timeout | null>(null);
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const [avatarUrlInput, setAvatarUrlInput] = useState('');

  const joystickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('fieldnine-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);

    const newPlayer: Player = {
      id: userData.email,
      name: userData.name,
      position: [0, 0, 0],
      rotation: 0,
      level: 50,
      hp: 2000,
      maxHp: 2000,
      mp: 1000,
      maxMp: 1000,
      exp: 8500,
      maxExp: 15000,
      department: userData.department,
      role: userData.role,
      isMoving: false,
      isAttacking: false,
      avatarUrl: '',
      color: '#00D4FF'
    };
    setMyPlayer(newPlayer);

    const otherPlayers: Player[] = [
      { ...newPlayer, id: 'p1', name: '김필드', position: [5, 0, 5], color: '#FF0080', level: 48 },
      { ...newPlayer, id: 'p2', name: '이디자인', position: [-5, 0, 5], color: '#00FF80', level: 47 },
      { ...newPlayer, id: 'p3', name: '박마케팅', position: [5, 0, -5], color: '#8000FF', level: 45 },
    ];
    setPlayers([newPlayer, ...otherPlayers]);

    const spawnedMonsters: Monster[] = [
      { id: 'm1', name: '사이버 드론', position: [10, 0, 10], rotation: 0, hp: 1500, maxHp: 1500, level: 45, type: 'orc', isAlive: true },
      { id: 'm2', name: 'AI 해커', position: [-10, 0, 10], rotation: 0, hp: 1200, maxHp: 1200, level: 40, type: 'wolf', isAlive: true },
      { id: 'm3', name: '디지털 워리어', position: [10, 0, -10], rotation: 0, hp: 3000, maxHp: 3000, level: 60, type: 'elf', isAlive: true },
      { id: 'm4', name: '메가 바이러스', position: [-10, 0, -10], rotation: 0, hp: 8000, maxHp: 8000, level: 75, type: 'dragon', isAlive: true },
    ];
    setMonsters(spawnedMonsters);

    setSkills([
      { id: 's1', name: '사이버 스트라이크', icon: '⚡', cooldown: 5, currentCooldown: 0, manaCost: 80, color: '#00D4FF' },
      { id: 's2', name: '디지털 힐링', icon: '💚', cooldown: 10, currentCooldown: 0, manaCost: 120, color: '#00FF80' },
      { id: 's3', name: '해킹 버스트', icon: '💻', cooldown: 15, currentCooldown: 0, manaCost: 150, color: '#FF0080' },
      { id: 's4', name: '텔레포트', icon: '🌀', cooldown: 20, currentCooldown: 0, manaCost: 200, color: '#8000FF' },
    ]);

    addNotification('🎮 Ready Player Me 메타버스 입장!');
    addNotification('💡 "아바타 생성" 버튼으로 본인 아바타 만들기');
  }, [router]);

  useEffect(() => {
    if (!joystickActive || !myPlayer) return;

    const interval = setInterval(() => {
      const speed = 0.3;
      const newX = myPlayer.position[0] + joystickDirection.x * speed;
      const newZ = myPlayer.position[2] + joystickDirection.y * speed;

      const clampedX = Math.max(-45, Math.min(45, newX));
      const clampedZ = Math.max(-45, Math.min(45, newZ));

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

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          position: [
            p.position[0] + p.velocity[0],
            p.position[1] + p.velocity[1],
            p.position[2] + p.velocity[2]
          ] as [number, number, number],
          life: p.life - 1
        }))
        .filter(p => p.life > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

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

    const deltaX = (clientX - centerX) / 60;
    const deltaY = (clientY - centerY) / 60;

    const clampedX = Math.max(-1, Math.min(1, deltaX));
    const clampedY = Math.max(-1, Math.min(1, deltaY));

    setJoystickDirection({ x: clampedX, y: clampedY });
  };

  const attack = () => {
    if (!myPlayer || !selectedMonster || !selectedMonster.isAlive) return;

    setMyPlayer({ ...myPlayer, isAttacking: true });

    if (comboTimer) clearTimeout(comboTimer);
    setCombo(prev => prev + 1);
    const timer = setTimeout(() => setCombo(0), 2000);
    setComboTimer(timer);

    const damage = Math.floor(Math.random() * 300) + 200 + combo * 30;

    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const particle: Particle = {
        id: `p-${Date.now()}-${i}`,
        position: [selectedMonster.position[0], selectedMonster.position[1] + 1, selectedMonster.position[2]],
        velocity: [Math.cos(angle) * 0.25, Math.random() * 0.4, Math.sin(angle) * 0.25],
        life: 40,
        maxLife: 40,
        color: '#00D4FF',
        size: 0.25
      };
      setParticles(prev => [...prev, particle]);
    }

    setMonsters(prev => prev.map(m =>
      m.id === selectedMonster.id
        ? { ...m, hp: Math.max(0, m.hp - damage), isAlive: m.hp - damage > 0 }
        : m
    ));

    if (selectedMonster.hp - damage <= 0) {
      const expGain = selectedMonster.level * 80;
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
        setTimeout(() => setLevelUpEffect(false), 3000);
        
        for (let i = 0; i < 150; i++) {
          const particle: Particle = {
            id: `lv-${Date.now()}-${i}`,
            position: [myPlayer.position[0], myPlayer.position[1] + 2, myPlayer.position[2]],
            velocity: [(Math.random() - 0.5) * 0.4, Math.random() * 0.6, (Math.random() - 0.5) * 0.4],
            life: 80,
            maxLife: 80,
            color: '#00D4FF',
            size: 0.35
          };
          setParticles(prev => [...prev, particle]);
        }
      }

      addNotification(`⚔️ ${selectedMonster.name} 격파! (+${expGain} EXP) ${combo > 1 ? `${combo} COMBO!` : ''}`);
      setSelectedMonster(null);
    } else {
      addNotification(`💥 ${damage} 데미지! ${combo > 1 ? `${combo} COMBO!` : ''}`);
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

    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80;
      const radius = 2 + Math.random() * 3;
      const particle: Particle = {
        id: `sk-${Date.now()}-${i}`,
        position: [
          myPlayer.position[0] + Math.cos(angle) * radius,
          myPlayer.position[1] + 1 + Math.random() * 3,
          myPlayer.position[2] + Math.sin(angle) * radius
        ],
        velocity: [Math.cos(angle) * 0.2, Math.random() * 0.3, Math.sin(angle) * 0.2],
        life: 60,
        maxLife: 60,
        color: skill.color,
        size: 0.3
      };
      setParticles(prev => [...prev, particle]);
    }

    addNotification(`✨ ${skill.name} 발동!`);

    setTimeout(() => {
      setMyPlayer(prev => prev ? { ...prev, isAttacking: false } : null);
    }, 500);
  };

  const addNotification = (text: string) => {
    setNotifications(prev => [...prev.slice(-4), text]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 4000);
  };

  const openAvatarCreator = () => {
    window.open('https://readyplayer.me/avatar', '_blank', 'width=800,height=600');
    addNotification('🎨 Ready Player Me에서 아바타 생성 중...');
    addNotification('💡 완성 후 URL을 복사해서 "아바타 적용" 버튼 클릭');
  };

  const applyAvatar = () => {
    if (!avatarUrlInput.trim()) {
      addNotification('❌ 아바타 URL을 입력해주세요');
      return;
    }

    if (!avatarUrlInput.includes('readyplayer.me')) {
      addNotification('❌ Ready Player Me URL이 아닙니다');
      return;
    }

    if (myPlayer) {
      setMyPlayer({ ...myPlayer, avatarUrl: avatarUrlInput });
      addNotification('✅ 아바타 적용 완료!');
      setShowAvatarCreator(false);
      setAvatarUrlInput('');
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* 아바타 생성 모달 */}
      {showAvatarCreator && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-black to-cyan-900/50 border-4 border-cyan-500 rounded-3xl p-8 max-w-2xl">
            <h2 className="text-4xl font-black text-cyan-400 mb-6">🎨 Ready Player Me 아바타 생성</h2>
            
            <div className="space-y-6">
              <div className="bg-cyan-500/10 border-2 border-cyan-500/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">📸 1단계: 아바타 생성</h3>
                <button
                  onClick={openAvatarCreator}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-black text-white text-xl hover:scale-105 transition-all shadow-2xl"
                >
                  Ready Player Me 열기 →
                </button>
                <p className="text-cyan-300 text-sm mt-3">
                  • 실제 얼굴 사진으로 AI 아바타 생성<br />
                  • 또는 커스터마이징으로 직접 제작
                </p>
              </div>

              <div className="bg-cyan-500/10 border-2 border-cyan-500/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">🔗 2단계: URL 적용</h3>
                <input
                  type="text"
                  value={avatarUrlInput}
                  onChange={(e) => setAvatarUrlInput(e.target.value)}
                  placeholder="아바타 URL을 붙여넣기 (예: https://models.readyplayer.me/...)"
                  className="w-full px-6 py-4 bg-black/50 border-2 border-cyan-500/50 rounded-xl text-white font-mono text-sm focus:border-cyan-500 focus:outline-none"
                />
                <button
                  onClick={applyAvatar}
                  className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-black text-white text-xl hover:scale-105 transition-all shadow-2xl"
                >
                  ✓ 아바타 적용하기
                </button>
              </div>

              <button
                onClick={() => setShowAvatarCreator(false)}
                className="w-full px-8 py-3 bg-gray-700 rounded-xl font-bold text-white hover:bg-gray-600 transition-all"
              >
                나중에 하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3D 씬 */}
      <div className="absolute inset-0">
        <Canvas shadows gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[12, 18, 12]} fov={65} />
            <CinematicCamera target={myPlayer?.position || [0, 0, 0]} />
            
            <CyberTerrain />
            
            {players.map(player => (
              <RPMAvatar key={player.id} player={player} isMe={player.id === myPlayer?.id} />
            ))}

            {monsters.map(monster => (
              <CyberMonster key={monster.id} monster={monster} />
            ))}

            <ParticleEffect particles={particles} />

            <EffectComposer>
              <Bloom intensity={2.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
              <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.002, 0.002]} />
              <Vignette offset={0.3} darkness={0.7} />
              <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} />
            </EffectComposer>

            <fog attach="fog" args={['#000510', 50, 120]} />
          </Suspense>
        </Canvas>
      </div>

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          {myPlayer && (
            <div className="bg-gradient-to-br from-black/95 to-cyan-900/95 backdrop-blur-2xl border-4 border-cyan-500/80 rounded-3xl p-6 pointer-events-auto shadow-2xl shadow-cyan-500/50">
              <div className="flex items-center gap-5 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-3xl border-4 border-cyan-400">
                  👤
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-black text-white drop-shadow-lg">{myPlayer.name}</span>
                    <span className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-base font-black shadow-lg">
                      Lv.{myPlayer.level}
                    </span>
                  </div>
                  <div className="text-sm text-cyan-400 font-bold">Ready Player Me</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-red-400">HP</span>
                    <span className="text-white/90">{myPlayer.hp}/{myPlayer.maxHp}</span>
                  </div>
                  <div className="h-4 bg-black/80 rounded-full overflow-hidden border-2 border-red-500/60">
                    <div className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all" style={{ width: `${(myPlayer.hp / myPlayer.maxHp) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-blue-400">MP</span>
                    <span className="text-white/90">{myPlayer.mp}/{myPlayer.maxMp}</span>
                  </div>
                  <div className="h-4 bg-black/80 rounded-full overflow-hidden border-2 border-blue-500/60">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all" style={{ width: `${(myPlayer.mp / myPlayer.maxMp) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-cyan-400">EXP</span>
                    <span className="text-white/90">{Math.floor((myPlayer.exp / myPlayer.maxExp) * 100)}%</span>
                  </div>
                  <div className="h-3 bg-black/80 rounded-full overflow-hidden border-2 border-cyan-500/60">
                    <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all" style={{ width: `${(myPlayer.exp / myPlayer.maxExp) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-black/95 to-cyan-900/95 backdrop-blur-2xl border-4 border-cyan-500/80 rounded-3xl p-6 pointer-events-auto shadow-2xl">
            <div className="text-base font-black mb-3 text-cyan-400">🗺️ 미니맵</div>
            <div className="relative w-56 h-56 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-2xl border-2 border-cyan-500/60 overflow-hidden">
              {myPlayer && (
                <div className="absolute w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg" style={{
                  left: `${((myPlayer.position[0] + 45) / 90) * 100}%`,
                  top: `${((myPlayer.position[2] + 45) / 90) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }} />
              )}
              {monsters.filter(m => m.isAlive).map(monster => (
                <div key={monster.id} className="absolute w-3 h-3 bg-red-500 rounded-full shadow-lg" style={{
                  left: `${((monster.position[0] + 45) / 90) * 100}%`,
                  top: `${((monster.position[2] + 45) / 90) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 알림 */}
      <div className="absolute top-6 right-6 space-y-3 pointer-events-none z-50">
        {notifications.map((notif, i) => (
          <div key={i} className="bg-gradient-to-r from-black/95 to-cyan-900/95 backdrop-blur-2xl border-3 border-cyan-500/80 rounded-2xl px-8 py-4 text-cyan-400 font-black shadow-2xl animate-pulse text-lg">
            {notif}
          </div>
        ))}
      </div>

      {/* 콤보 */}
      {combo > 1 && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          <div className="text-9xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
            {combo} COMBO!
          </div>
        </div>
      )}

      {/* 레벨업 */}
      {levelUpEffect && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 animate-pulse">
          <div className="text-center">
            <div className="text-[12rem] font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl mb-8">
              ✨ LEVEL UP! ✨
            </div>
            <div className="text-6xl font-bold text-white drop-shadow-2xl">
              Lv.{myPlayer!.level - 1} → Lv.{myPlayer!.level}
            </div>
          </div>
        </div>
      )}

      {/* 하단 UI */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div className="relative">
            <div
              ref={joystickRef}
              className="w-48 h-48 bg-gradient-to-br from-black/80 to-cyan-900/80 backdrop-blur-2xl border-4 border-cyan-500/60 rounded-full relative cursor-pointer shadow-2xl"
              onMouseDown={handleJoystickStart}
              onMouseMove={handleJoystickMove}
              onMouseUp={handleJoystickEnd}
              onMouseLeave={handleJoystickEnd}
              onTouchStart={handleJoystickStart}
              onTouchMove={handleJoystickMove}
              onTouchEnd={handleJoystickEnd}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl opacity-40">🎮</div>
              </div>
              {joystickActive && (
                <div
                  className="absolute w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full shadow-2xl transition-transform border-4 border-white/60"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${joystickDirection.x * 40}px), calc(-50% + ${joystickDirection.y * 40}px))`
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => useSkill(skill)}
                disabled={skill.currentCooldown > 0 || (myPlayer?.mp || 0) < skill.manaCost}
                className={`relative w-24 h-24 rounded-3xl border-4 text-5xl transition-all shadow-2xl ${
                  skill.currentCooldown > 0 || (myPlayer?.mp || 0) < skill.manaCost
                    ? 'bg-gray-700/60 border-gray-600/60 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-br from-cyan-600 to-blue-600 border-cyan-400/80 hover:scale-110 active:scale-95 shadow-cyan-500/60'
                }`}
              >
                {skill.icon}
                {skill.currentCooldown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-2xl">
                    <span className="text-3xl font-black text-white">{skill.currentCooldown}</span>
                  </div>
                )}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xs font-black bg-black/90 px-3 py-1 rounded-full whitespace-nowrap border-2 border-cyan-500/60">
                  {skill.manaCost}MP
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={attack}
              disabled={!selectedMonster || !selectedMonster.isAlive}
              className={`w-36 h-36 rounded-full border-6 text-7xl transition-all shadow-2xl ${
                selectedMonster && selectedMonster.isAlive
                  ? 'bg-gradient-to-br from-red-600 to-orange-600 border-red-400/80 hover:scale-110 active:scale-95 animate-pulse shadow-red-500/80'
                  : 'bg-gray-700/60 border-gray-600/60 cursor-not-allowed opacity-50'
              }`}
            >
              ⚔️
            </button>
            <div className="text-center text-sm font-black text-white/80">
              {selectedMonster && selectedMonster.isAlive ? '공격' : '타겟 없음'}
            </div>
          </div>
        </div>
      </div>

      {/* 타겟 */}
      {selectedMonster && selectedMonster.isAlive && (
        <div className="absolute bottom-60 left-6 bg-gradient-to-br from-black/95 to-cyan-900/95 backdrop-blur-2xl border-4 border-red-500/80 rounded-3xl p-6 shadow-2xl">
          <div className="text-red-400 font-black mb-3 text-lg">🎯 타겟</div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">
              {selectedMonster.type === 'orc' ? '🤖' : selectedMonster.type === 'wolf' ? '💻' : selectedMonster.type === 'elf' ? '⚡' : '🔥'}
            </span>
            <div>
              <div className="font-black text-white text-lg">{selectedMonster.name}</div>
              <div className="text-sm text-cyan-400 font-bold">Lv.{selectedMonster.level}</div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-green-400">HP</span>
              <span className="text-white/90">{selectedMonster.hp}/{selectedMonster.maxHp}</span>
            </div>
            <div className="h-4 bg-black/80 rounded-full overflow-hidden border-2 border-green-500/60">
              <div className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all" style={{ width: `${(selectedMonster.hp / selectedMonster.maxHp) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* 상단 메뉴 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-40">
        <button
          onClick={() => setShowAvatarCreator(true)}
          className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 backdrop-blur-2xl border-3 border-cyan-500/80 rounded-2xl font-black text-white text-lg hover:scale-105 transition-all shadow-2xl shadow-cyan-500/50 animate-pulse"
        >
          🎨 아바타 생성
        </button>
        <Link href="/workspace" className="px-8 py-4 bg-gradient-to-r from-black/90 to-cyan-900/90 backdrop-blur-2xl border-3 border-cyan-500/60 rounded-2xl font-black text-white text-lg hover:border-cyan-500 transition-all shadow-2xl">
          ← 나가기
        </Link>
      </div>

      {/* 몬스터 선택 */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-gradient-to-br from-black/95 to-cyan-900/95 backdrop-blur-2xl border-4 border-cyan-500/60 rounded-3xl p-6 shadow-2xl">
        <div className="text-base font-black mb-4 text-cyan-400">👾 적군</div>
        <div className="space-y-3">
          {monsters.filter(m => m.isAlive).map(monster => (
            <button
              key={monster.id}
              onClick={() => setSelectedMonster(monster)}
              className={`w-full px-5 py-3 rounded-2xl text-sm font-black transition-all border-2 ${
                selectedMonster?.id === monster.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 border-white/20'
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
