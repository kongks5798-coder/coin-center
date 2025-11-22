'use client';

import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
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
  Trail,
  Billboard,
  Text3D,
  Center
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

// 🎮 AAA 게임 퀄리티 - 리니지M 모바일
// Full 3D + Particles + Post-Processing

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

// 파티클 이펙트 컴포넌트
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

// 고급 3D 캐릭터
function AdvancedCharacter({ player, isMe }: { player: Player; isMe: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // 걷기 애니메이션 (상하 움직임 + 좌우 흔들림)
    if (player.isMoving) {
      meshRef.current.position.y = Math.sin(time * 10) * 0.15 + 1;
      meshRef.current.rotation.z = Math.sin(time * 8) * 0.05;
    } else {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 1, 0.1);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.1);
    }

    // 공격 애니메이션 (펀치 모션)
    if (player.isAttacking) {
      const attackPhase = Math.sin(time * 30);
      meshRef.current.scale.x = 1 + attackPhase * 0.15;
      meshRef.current.rotation.x = attackPhase * 0.3;
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.2);
    }

    // 회전 (부드럽게)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      player.rotation,
      0.15
    );

    // 본인 강조 (떠오르는 효과)
    if (isMe && trailRef.current) {
      trailRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group position={player.position}>
      {/* 그림자 (다이나믹) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[0.7, 32]} />
        <meshStandardMaterial
          color="#000000"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      <group ref={meshRef}>
        {/* 캐릭터 몸통 (고급 머티리얼) */}
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.5, 1.6, 32]} />
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

        {/* 머리 (반짝이는 효과) */}
        <mesh position={[0, 2.1, 0]} castShadow>
          <sphereGeometry args={[0.4, 32, 32]} />
          <MeshDistortMaterial
            color={player.color}
            emissive={player.color}
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.3}
            distort={0.15}
            speed={3}
          />
        </mesh>

        {/* 왼쪽 팔 */}
        <mesh position={[-0.6, 0.8, 0]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.15, 0.12, 1.2, 16]} />
          <meshStandardMaterial
            color={player.color}
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* 오른쪽 팔 */}
        <mesh position={[0.6, 0.8, 0]} rotation={[0, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.15, 0.12, 1.2, 16]} />
          <meshStandardMaterial
            color={player.color}
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* 무기 (검/창) */}
        <mesh position={[0.8, 1.2, 0]} rotation={[0, 0, 0.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial
            color="#C0C0C0"
            metalness={1}
            roughness={0.1}
            emissive="#FFFFFF"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0.8, 2, 0]} rotation={[0, 0, 0.5]} castShadow>
          <coneGeometry args={[0.15, 0.4, 8]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={1}
            roughness={0}
            emissive="#FFD700"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* 본인 강조 링 (회전하는 빛나는 링) */}
      {isMe && (
        <>
          <mesh ref={trailRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <ringGeometry args={[0.8, 1, 64]} />
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
          <Sparkles
            count={50}
            scale={[2, 3, 2]}
            size={2}
            speed={0.5}
            color="#FFD700"
          />
        </>
      )}

      {/* HP 바 (3D Billboard) */}
      <Billboard position={[0, 3.2, 0]}>
        <mesh>
          <planeGeometry args={[2, 0.3]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.7} />
        </mesh>
        <mesh position={[-(1 - player.hp / player.maxHp), 0, 0.01]}>
          <planeGeometry args={[(player.hp / player.maxHp) * 2, 0.2]} />
          <meshBasicMaterial color="#DC143C" />
        </mesh>
      </Billboard>

      {/* 이름표 */}
      <Billboard position={[0, 3.6, 0]}>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.15}
          height={0.02}
          curveSegments={12}
        >
          {player.name}
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
        </Text3D>
      </Billboard>
    </group>
  );
}

// AAA급 몬스터
function AAA_Monster({ monster }: { monster: Monster }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current || !monster.isAlive) return;
    
    const time = state.clock.elapsedTime;
    
    // 떠다니는 애니메이션 (상하 + 회전)
    meshRef.current.position.y = Math.sin(time * 2 + monster.position[0]) * 0.3 + 1.5;
    meshRef.current.rotation.y += 0.02;
    
    // 숨쉬는 효과
    const breathe = Math.sin(time * 3) * 0.05 + 1;
    meshRef.current.scale.set(breathe, breathe, breathe);
  });

  if (!monster.isAlive) return null;

  const colors: Record<string, string> = {
    orc: '#8B4513',
    wolf: '#696969',
    elf: '#800080',
    dragon: '#8B0000'
  };

  const color = colors[monster.type] || '#666666';

  return (
    <group position={monster.position}>
      {/* 그림자 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.5} />
      </mesh>

      <group ref={meshRef}>
        {/* 몬스터 코어 */}
        <mesh castShadow>
          <dodecahedronGeometry args={[0.7, 0]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            distort={0.3}
            speed={4}
          />
        </mesh>

        {/* 외부 링 (회전) */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1, 0.1, 16, 100]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            metalness={1}
            roughness={0}
          />
        </mesh>

        {/* 파티클 효과 */}
        <Sparkles
          count={30}
          scale={[2, 2, 2]}
          size={3}
          speed={0.3}
          color={color}
        />
      </group>

      {/* HP 바 */}
      <Billboard position={[0, 3, 0]}>
        <mesh>
          <planeGeometry args={[2, 0.3]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.8} />
        </mesh>
        <mesh position={[-(1 - monster.hp / monster.maxHp), 0, 0.01]}>
          <planeGeometry args={[(monster.hp / monster.maxHp) * 2, 0.2]} />
          <meshBasicMaterial color="#00FF00" />
        </mesh>
      </Billboard>

      {/* 몬스터 이름 */}
      <Billboard position={[0, 3.5, 0]}>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.12}
          height={0.02}
        >
          {monster.name}
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.7} />
        </Text3D>
      </Billboard>
    </group>
  );
}

// AAA급 지형
function AAA_Terrain() {
  return (
    <>
      {/* 바닥 (고급 머티리얼) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120, 50, 50]} />
        <meshStandardMaterial
          color="#1a4d2e"
          roughness={0.9}
          metalness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* 그리드 (네온) */}
      <gridHelper
        args={[120, 60, '#00FF00', '#003300']}
        position={[0, 0.02, 0]}
      />

      {/* 건물들 (고급 3D) */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-15, 3, -15]} castShadow>
          <boxGeometry args={[8, 6, 8]} />
          <MeshDistortMaterial
            color="#4169E1"
            emissive="#4169E1"
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
            distort={0.1}
            speed={1}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[15, 4, -15]} castShadow>
          <cylinderGeometry args={[3, 3, 8, 6]} />
          <MeshDistortMaterial
            color="#DC143C"
            emissive="#DC143C"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
            distort={0.15}
            speed={1.5}
          />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
        <mesh position={[15, 3, 15]} castShadow>
          <octahedronGeometry args={[4, 0]} />
          <MeshDistortMaterial
            color="#32CD32"
            emissive="#32CD32"
            emissiveIntensity={0.25}
            metalness={0.6}
            roughness={0.4}
            distort={0.2}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[-15, 5, 15]} castShadow>
          <torusGeometry args={[4, 2, 16, 100]} />
          <MeshDistortMaterial
            color="#8B0000"
            emissive="#8B0000"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
            distort={0.25}
            speed={2.5}
          />
        </mesh>
      </Float>

      {/* 마법진 (바닥 이펙트) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[10, 15, 64]} />
        <meshBasicMaterial
          color="#00FFFF"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 별빛 효과 */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* 하늘 */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0.6}
        azimuth={0.25}
      />

      {/* 조명 (AAA급) */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[20, 30, 20]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <pointLight position={[0, 15, 0]} intensity={1} color="#FFD700" />
      <pointLight position={[-20, 10, -20]} intensity={0.8} color="#FF0000" />
      <pointLight position={[20, 10, 20]} intensity={0.8} color="#00FF00" />

      {/* 환경맵 */}
      <Environment preset="night" />
    </>
  );
}

// 카메라 컨트롤러 (시네마틱)
function CinematicCamera({ target }: { target: [number, number, number] }) {
  const { camera } = useThree();

  useFrame(() => {
    // 부드러운 카메라 추적 (lerp)
    const idealPosition = new THREE.Vector3(
      target[0] + 10,
      target[1] + 15,
      target[2] + 10
    );
    camera.position.lerp(idealPosition, 0.03);
    
    // 카메라 흔들림 (약간)
    camera.position.y += Math.sin(Date.now() * 0.001) * 0.02;
    
    camera.lookAt(target[0], target[1] + 1, target[2]);
  });

  return null;
}

// 메인 컴포넌트
export default function AAA_Metaverse() {
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

    const otherPlayers: Player[] = [
      { ...newPlayer, id: 'p1', name: '김필드', position: [5, 0, 5], color: '#00CED1', level: 38 },
      { ...newPlayer, id: 'p2', name: '이디자인', position: [-5, 0, 5], color: '#4169E1', level: 42 },
      { ...newPlayer, id: 'p3', name: '박마케팅', position: [5, 0, -5], color: '#FF1493', level: 35 },
    ];
    setPlayers([newPlayer, ...otherPlayers]);

    const spawnedMonsters: Monster[] = [
      { id: 'm1', name: '오크 전사', position: [10, 0, 10], rotation: 0, hp: 800, maxHp: 800, level: 25, type: 'orc', isAlive: true },
      { id: 'm2', name: '늑대', position: [-10, 0, 10], rotation: 0, hp: 500, maxHp: 500, level: 20, type: 'wolf', isAlive: true },
      { id: 'm3', name: '다크 엘프', position: [10, 0, -10], rotation: 0, hp: 700, maxHp: 700, level: 28, type: 'elf', isAlive: true },
      { id: 'm4', name: '레드 드래곤', position: [-10, 0, -10], rotation: 0, hp: 5000, maxHp: 5000, level: 55, type: 'dragon', isAlive: true },
    ];
    setMonsters(spawnedMonsters);

    setSkills([
      { id: 's1', name: '천벌', icon: '⚡', cooldown: 5, currentCooldown: 0, manaCost: 50, color: '#FFD700' },
      { id: 's2', name: '치유', icon: '💚', cooldown: 10, currentCooldown: 0, manaCost: 80, color: '#00FF00' },
      { id: 's3', name: '버프', icon: '✨', cooldown: 15, currentCooldown: 0, manaCost: 100, color: '#FF00FF' },
      { id: 's4', name: '순간이동', icon: '🌀', cooldown: 20, currentCooldown: 0, manaCost: 150, color: '#00FFFF' },
    ]);

    addNotification('🎮 AAA 메타버스에 입장했습니다!');
  }, [router]);

  // 조이스틱 이동
  useEffect(() => {
    if (!joystickActive || !myPlayer) return;

    const interval = setInterval(() => {
      const speed = 0.25;
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

  // 파티클 업데이트
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

    const deltaX = (clientX - centerX) / 60;
    const deltaY = (clientY - centerY) / 60;

    const clampedX = Math.max(-1, Math.min(1, deltaX));
    const clampedY = Math.max(-1, Math.min(1, deltaY));

    setJoystickDirection({ x: clampedX, y: clampedY });
  };

  const attack = () => {
    if (!myPlayer || !selectedMonster || !selectedMonster.isAlive) return;

    setMyPlayer({ ...myPlayer, isAttacking: true });

    // 콤보 증가
    if (comboTimer) clearTimeout(comboTimer);
    setCombo(prev => prev + 1);
    const timer = setTimeout(() => setCombo(0), 2000);
    setComboTimer(timer);

    const damage = Math.floor(Math.random() * 200) + 100 + combo * 20;

    // 파티클 생성 (공격 이펙트)
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const particle: Particle = {
        id: `p-${Date.now()}-${i}`,
        position: [selectedMonster.position[0], selectedMonster.position[1] + 1, selectedMonster.position[2]],
        velocity: [
          Math.cos(angle) * 0.2,
          Math.random() * 0.3,
          Math.sin(angle) * 0.2
        ],
        life: 30,
        maxLife: 30,
        color: '#FFD700',
        size: 0.2
      };
      setParticles(prev => [...prev, particle]);
    }

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
        setTimeout(() => setLevelUpEffect(false), 3000);
        
        // 레벨업 파티클
        for (let i = 0; i < 100; i++) {
          const particle: Particle = {
            id: `lv-${Date.now()}-${i}`,
            position: [myPlayer.position[0], myPlayer.position[1] + 2, myPlayer.position[2]],
            velocity: [
              (Math.random() - 0.5) * 0.3,
              Math.random() * 0.5,
              (Math.random() - 0.5) * 0.3
            ],
            life: 60,
            maxLife: 60,
            color: '#FFD700',
            size: 0.3
          };
          setParticles(prev => [...prev, particle]);
        }
      }

      addNotification(`⚔️ ${selectedMonster.name} 처치! (+${expGain} EXP) ${combo > 1 ? `${combo} COMBO!` : ''}`);
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

    // 스킬 파티클
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const radius = 2 + Math.random() * 2;
      const particle: Particle = {
        id: `sk-${Date.now()}-${i}`,
        position: [
          myPlayer.position[0] + Math.cos(angle) * radius,
          myPlayer.position[1] + 1 + Math.random() * 2,
          myPlayer.position[2] + Math.sin(angle) * radius
        ],
        velocity: [
          Math.cos(angle) * 0.15,
          Math.random() * 0.2,
          Math.sin(angle) * 0.15
        ],
        life: 40,
        maxLife: 40,
        color: skill.color,
        size: 0.25
      };
      setParticles(prev => [...prev, particle]);
    }

    addNotification(`✨ ${skill.name} 사용!`);

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

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* AAA 3D 게임 화면 */}
      <div className="absolute inset-0">
        <Canvas shadows gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[10, 15, 10]} fov={65} />
            <CinematicCamera target={myPlayer?.position || [0, 0, 0]} />
            
            <AAA_Terrain />
            
            {players.map(player => (
              <AdvancedCharacter key={player.id} player={player} isMe={player.id === myPlayer?.id} />
            ))}

            {monsters.map(monster => (
              <AAA_Monster key={monster.id} monster={monster} />
            ))}

            <ParticleEffect particles={particles} />

            {/* 포스트 프로세싱 (AAA 이펙트) */}
            <EffectComposer>
              <Bloom
                intensity={1.5}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                height={300}
              />
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.001, 0.001]}
              />
              <Vignette
                offset={0.3}
                darkness={0.5}
              />
            </EffectComposer>

            <fog attach="fog" args={['#0a0a1a', 50, 120]} />
          </Suspense>
        </Canvas>
      </div>

      {/* 상단 HUD (개선) */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          {/* 플레이어 정보 */}
          {myPlayer && (
            <div className="bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-2xl border-4 border-yellow-500/60 rounded-3xl p-6 pointer-events-auto shadow-2xl shadow-yellow-500/30">
              <div className="flex items-center gap-5 mb-4">
                <div className="text-6xl drop-shadow-2xl">{myPlayer.avatar}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-black text-white drop-shadow-lg">{myPlayer.name}</span>
                    <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-full text-base font-black shadow-lg shadow-yellow-500/50">
                      Lv.{myPlayer.level}
                    </span>
                  </div>
                  <div className="text-base text-yellow-400 font-bold drop-shadow-lg">{myPlayer.class}</div>
                </div>
              </div>

              {/* HP 바 */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-red-400 drop-shadow-lg">HP</span>
                    <span className="text-white/90">{myPlayer.hp}/{myPlayer.maxHp}</span>
                  </div>
                  <div className="h-4 bg-black/80 rounded-full overflow-hidden border-2 border-red-500/60 shadow-lg shadow-red-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 transition-all duration-300 shadow-inner"
                      style={{ width: `${(myPlayer.hp / myPlayer.maxHp) * 100}%` }}
                    />
                  </div>
                </div>

                {/* MP 바 */}
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-blue-400 drop-shadow-lg">MP</span>
                    <span className="text-white/90">{myPlayer.mp}/{myPlayer.maxMp}</span>
                  </div>
                  <div className="h-4 bg-black/80 rounded-full overflow-hidden border-2 border-blue-500/60 shadow-lg shadow-blue-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 transition-all duration-300 shadow-inner"
                      style={{ width: `${(myPlayer.mp / myPlayer.maxMp) * 100}%` }}
                    />
                  </div>
                </div>

                {/* EXP 바 */}
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-yellow-400 drop-shadow-lg">EXP</span>
                    <span className="text-white/90">{Math.floor((myPlayer.exp / myPlayer.maxExp) * 100)}%</span>
                  </div>
                  <div className="h-3 bg-black/80 rounded-full overflow-hidden border-2 border-yellow-500/60 shadow-lg shadow-yellow-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 transition-all duration-300 shadow-inner"
                      style={{ width: `${(myPlayer.exp / myPlayer.maxExp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 미니맵 */}
          <div className="bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-2xl border-4 border-cyan-500/60 rounded-3xl p-6 pointer-events-auto shadow-2xl shadow-cyan-500/30">
            <div className="text-base font-black mb-3 text-cyan-400 drop-shadow-lg">🗺️ 미니맵</div>
            <div className="relative w-56 h-56 bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-2xl border-2 border-cyan-500/40 overflow-hidden shadow-inner">
              {myPlayer && (
                <div
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-500/80"
                  style={{
                    left: `${((myPlayer.position[0] + 45) / 90) * 100}%`,
                    top: `${((myPlayer.position[2] + 45) / 90) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              )}
              {monsters.filter(m => m.isAlive).map(monster => (
                <div
                  key={monster.id}
                  className="absolute w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/60"
                  style={{
                    left: `${((monster.position[0] + 45) / 90) * 100}%`,
                    top: `${((monster.position[2] + 45) / 90) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 알림 */}
      <div className="absolute top-6 right-6 space-y-3 pointer-events-none z-50">
        {notifications.map((notif, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-black/95 to-gray-900/95 backdrop-blur-2xl border-3 border-yellow-500/60 rounded-2xl px-8 py-4 text-yellow-400 font-black shadow-2xl shadow-yellow-500/40 animate-pulse text-lg"
          >
            {notif}
          </div>
        ))}
      </div>

      {/* 콤보 */}
      {combo > 1 && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          <div className="text-9xl font-black bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
            {combo} COMBO!
          </div>
        </div>
      )}

      {/* 레벨업 이펙트 */}
      {levelUpEffect && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 animate-pulse">
          <div className="text-center">
            <div className="text-[12rem] font-black bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl mb-8">
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
          {/* 조이스틱 */}
          <div className="relative">
            <div
              ref={joystickRef}
              className="w-48 h-48 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-2xl border-4 border-white/30 rounded-full relative cursor-pointer shadow-2xl"
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
                  className="absolute w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full shadow-2xl shadow-cyan-500/60 transition-transform border-4 border-white/40"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${joystickDirection.x * 40}px), calc(-50% + ${joystickDirection.y * 40}px))`
                  }}
                />
              )}
            </div>
          </div>

          {/* 스킬 퀵슬롯 */}
          <div className="flex gap-4 mb-6">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => useSkill(skill)}
                disabled={skill.currentCooldown > 0 || (myPlayer?.mp || 0) < skill.manaCost}
                className={`relative w-24 h-24 rounded-3xl border-4 text-5xl transition-all shadow-2xl ${
                  skill.currentCooldown > 0 || (myPlayer?.mp || 0) < skill.manaCost
                    ? 'bg-gray-700/60 border-gray-600/60 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-br from-purple-600 to-pink-600 border-purple-400/60 hover:scale-110 active:scale-95 shadow-purple-500/40'
                }`}
              >
                {skill.icon}
                {skill.currentCooldown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-2xl">
                    <span className="text-3xl font-black text-white">{skill.currentCooldown}</span>
                  </div>
                )}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xs font-black bg-black/90 px-3 py-1 rounded-full whitespace-nowrap border-2 border-white/30">
                  {skill.manaCost}MP
                </div>
              </button>
            ))}
          </div>

          {/* 공격 버튼 */}
          <div className="flex flex-col gap-4">
            <button
              onClick={attack}
              disabled={!selectedMonster || !selectedMonster.isAlive}
              className={`w-36 h-36 rounded-full border-6 text-7xl transition-all shadow-2xl ${
                selectedMonster && selectedMonster.isAlive
                  ? 'bg-gradient-to-br from-red-600 to-orange-600 border-red-400/60 hover:scale-110 active:scale-95 animate-pulse shadow-red-500/60'
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

      {/* 타겟 정보 */}
      {selectedMonster && selectedMonster.isAlive && (
        <div className="absolute bottom-60 left-6 bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-2xl border-4 border-red-500/60 rounded-3xl p-6 shadow-2xl shadow-red-500/40">
          <div className="text-red-400 font-black mb-3 text-lg">🎯 타겟</div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">
              {selectedMonster.type === 'orc' ? '👹' : 
               selectedMonster.type === 'wolf' ? '🐺' :
               selectedMonster.type === 'elf' ? '🧝' : '🐉'}
            </span>
            <div>
              <div className="font-black text-white text-lg">{selectedMonster.name}</div>
              <div className="text-sm text-yellow-400 font-bold">Lv.{selectedMonster.level}</div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-green-400">HP</span>
              <span className="text-white/90">{selectedMonster.hp}/{selectedMonster.maxHp}</span>
            </div>
            <div className="h-4 bg-black/80 rounded-full overflow-hidden border-2 border-green-500/60 shadow-lg shadow-green-500/30">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all shadow-inner"
                style={{ width: `${(selectedMonster.hp / selectedMonster.maxHp) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 상단 메뉴 */}
      <div className="absolute top-6 right-6 flex gap-3">
        <Link
          href="/workspace"
          className="px-8 py-4 bg-gradient-to-r from-black/90 to-gray-900/90 backdrop-blur-2xl border-3 border-white/30 rounded-2xl font-black text-white text-lg hover:border-white/50 transition-all shadow-2xl"
        >
          ← 나가기
        </Link>
      </div>

      {/* 몬스터 선택 */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-2xl border-4 border-white/30 rounded-3xl p-6 shadow-2xl">
        <div className="text-base font-black mb-4 text-white">👾 몬스터 목록</div>
        <div className="space-y-3">
          {monsters.filter(m => m.isAlive).map(monster => (
            <button
              key={monster.id}
              onClick={() => setSelectedMonster(monster)}
              className={`w-full px-5 py-3 rounded-2xl text-sm font-black transition-all border-2 ${
                selectedMonster?.id === monster.id
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white border-red-400 shadow-lg shadow-red-500/50'
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
