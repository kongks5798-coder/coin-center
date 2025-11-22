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
  Trail,
  Billboard,
  Html
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

// 🎮 삼국지 유비 캐릭터 - 리니지M 모바일 게임 퀄리티

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

// 삼국지 유비 캐릭터 (코드로 생성)
function LiuBeiCharacter({ player, isMe }: { player: Player; isMe: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const swordLeftRef = useRef<THREE.Mesh>(null);
  const swordRightRef = useRef<THREE.Mesh>(null);
  const capeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !bodyRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // 걷기 애니메이션
    if (player.isMoving) {
      bodyRef.current.position.y = Math.sin(time * 8) * 0.1;
      bodyRef.current.rotation.z = Math.sin(time * 6) * 0.03;
      
      // 망토 흔들림
      if (capeRef.current) {
        capeRef.current.rotation.x = Math.sin(time * 4) * 0.2 - 0.3;
      }
    } else {
      bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, 0, 0.1);
      bodyRef.current.rotation.z = THREE.MathUtils.lerp(bodyRef.current.rotation.z, 0, 0.1);
      
      if (capeRef.current) {
        capeRef.current.rotation.x = THREE.MathUtils.lerp(capeRef.current.rotation.x, -0.1, 0.05);
      }
    }

    // 공격 애니메이션 (쌍검 휘두르기)
    if (player.isAttacking) {
      const attackPhase = Math.sin(time * 25);
      if (swordLeftRef.current) {
        swordLeftRef.current.rotation.z = attackPhase * 1.5;
      }
      if (swordRightRef.current) {
        swordRightRef.current.rotation.z = -attackPhase * 1.5;
      }
    } else {
      if (swordLeftRef.current) {
        swordLeftRef.current.rotation.z = THREE.MathUtils.lerp(swordLeftRef.current.rotation.z, 0.5, 0.2);
      }
      if (swordRightRef.current) {
        swordRightRef.current.rotation.z = THREE.MathUtils.lerp(swordRightRef.current.rotation.z, -0.5, 0.2);
      }
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
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial
          color="#000000"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      <group ref={bodyRef}>
        {/* 망토 (비단 - 붉은색) */}
        <mesh ref={capeRef} position={[0, 2, -0.3]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 2, 0.05]} />
          <MeshDistortMaterial
            color="#DC143C"
            emissive="#8B0000"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
            distort={0.2}
            speed={2}
          />
        </mesh>

        {/* 몸통 (황금 갑옷) */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.55, 1.8, 8]} />
          <MeshDistortMaterial
            color="#FFD700"
            emissive="#DAA520"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
            distort={0.05}
            speed={1}
          />
        </mesh>

        {/* 어깨 갑옷 (좌) */}
        <mesh position={[-0.6, 2.2, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#B8860B"
            metalness={0.9}
            roughness={0.2}
            emissive="#DAA520"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* 어깨 갑옷 (우) */}
        <mesh position={[0.6, 2.2, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#B8860B"
            metalness={0.9}
            roughness={0.2}
            emissive="#DAA520"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* 머리 (유비) */}
        <mesh position={[0, 2.8, 0]} castShadow>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#FFE4C4"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        {/* 왕관 (금관) */}
        <mesh position={[0, 3.3, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.4, 0.3, 8]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={1}
            roughness={0}
            emissive="#FFD700"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* 왕관 장식 */}
        <mesh position={[0, 3.5, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#FF0000"
            metalness={0.8}
            roughness={0.2}
            emissive="#FF0000"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* 왼팔 */}
        <mesh position={[-0.65, 1.5, 0]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.15, 0.13, 1.3, 16]} />
          <meshStandardMaterial
            color="#8B4513"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* 오른팔 */}
        <mesh position={[0.65, 1.5, 0]} rotation={[0, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.15, 0.13, 1.3, 16]} />
          <meshStandardMaterial
            color="#8B4513"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* 쌍검 (좌) - 유비의 상징 */}
        <group ref={swordLeftRef} position={[-0.9, 1.5, 0]} rotation={[0, 0, 0.5]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.8, 8]} />
            <meshStandardMaterial
              color="#C0C0C0"
              metalness={1}
              roughness={0.1}
              emissive="#FFFFFF"
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[0, 1, 0]} castShadow>
            <coneGeometry args={[0.12, 0.4, 8]} />
            <meshStandardMaterial
              color="#FFD700"
              metalness={1}
              roughness={0}
              emissive="#FFD700"
              emissiveIntensity={0.7}
            />
          </mesh>
          {/* 검 손잡이 */}
          <mesh position={[0, -0.95, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
            <meshStandardMaterial
              color="#8B4513"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
        </group>

        {/* 쌍검 (우) */}
        <group ref={swordRightRef} position={[0.9, 1.5, 0]} rotation={[0, 0, -0.5]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.8, 8]} />
            <meshStandardMaterial
              color="#C0C0C0"
              metalness={1}
              roughness={0.1}
              emissive="#FFFFFF"
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[0, 1, 0]} castShadow>
            <coneGeometry args={[0.12, 0.4, 8]} />
            <meshStandardMaterial
              color="#FFD700"
              metalness={1}
              roughness={0}
              emissive="#FFD700"
              emissiveIntensity={0.7}
            />
          </mesh>
          <mesh position={[0, -0.95, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
            <meshStandardMaterial
              color="#8B4513"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
        </group>

        {/* 다리 (좌) */}
        <mesh position={[-0.25, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.13, 1, 16]} />
          <meshStandardMaterial
            color="#8B4513"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        {/* 다리 (우) */}
        <mesh position={[0.25, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.13, 1, 16]} />
          <meshStandardMaterial
            color="#8B4513"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        {/* 신발 (좌) */}
        <mesh position={[-0.25, 0.05, 0.1]} castShadow>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial
            color="#000000"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* 신발 (우) */}
        <mesh position={[0.25, 0.05, 0.1]} castShadow>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial
            color="#000000"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      </group>

      {/* 본인 강조 (황금 링) */}
      {isMe && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <ringGeometry args={[0.9, 1.1, 64]} />
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
          <Sparkles
            count={80}
            scale={[2.5, 4, 2.5]}
            size={3}
            speed={0.4}
            color="#FFD700"
          />
        </>
      )}

      {/* HP 바 */}
      <Billboard position={[0, 4, 0]}>
        <mesh>
          <planeGeometry args={[2.2, 0.35]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.8} />
        </mesh>
        <mesh position={[-(1.1 - (player.hp / player.maxHp) * 1.1), 0, 0.01]}>
          <planeGeometry args={[(player.hp / player.maxHp) * 2.2, 0.25]} />
          <meshBasicMaterial color="#DC143C" />
        </mesh>
      </Billboard>

      {/* 이름표 (유비) */}
      <Billboard position={[0, 4.5, 0]}>
        <Html center>
          <div className="text-yellow-400 font-black text-xl drop-shadow-2xl whitespace-nowrap px-4 py-1 bg-black/60 rounded-full border-2 border-yellow-500">
            劉備 {player.name}
          </div>
        </Html>
      </Billboard>
    </group>
  );
}

// 파티클 시스템
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

// 삼국지 몬스터
function ThreeKingdomsMonster({ monster }: { monster: Monster }) {
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
    orc: '#8B4513',
    wolf: '#696969',
    elf: '#800080',
    dragon: '#8B0000'
  };

  const color = colors[monster.type] || '#666666';

  return (
    <group position={monster.position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.5} />
      </mesh>

      <group ref={meshRef}>
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

        <Sparkles count={30} scale={[2, 2, 2]} size={3} speed={0.3} color={color} />
      </group>

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

      <Billboard position={[0, 3.5, 0]}>
        <Html center>
          <div className="text-red-400 font-black text-base drop-shadow-lg whitespace-nowrap">
            {monster.name}
          </div>
        </Html>
      </Billboard>
    </group>
  );
}

// 삼국지 지형
function ThreeKingdomsTerrain() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120, 50, 50]} />
        <meshStandardMaterial
          color="#1a4d2e"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      <gridHelper args={[120, 60, '#FFD700', '#8B4513']} position={[0, 0.02, 0]} />

      {/* 궁전들 */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-15, 4, -15]} castShadow>
          <boxGeometry args={[8, 8, 8]} />
          <MeshDistortMaterial
            color="#DC143C"
            emissive="#8B0000"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            distort={0.1}
            speed={1}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[15, 5, -15]} castShadow>
          <cylinderGeometry args={[3, 3, 10, 6]} />
          <MeshDistortMaterial
            color="#FFD700"
            emissive="#DAA520"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
            distort={0.15}
            speed={1.5}
          />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
        <mesh position={[15, 4, 15]} castShadow>
          <octahedronGeometry args={[4, 0]} />
          <MeshDistortMaterial
            color="#8B4513"
            emissive="#654321"
            emissiveIntensity={0.25}
            metalness={0.6}
            roughness={0.4}
            distort={0.2}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[-15, 6, 15]} castShadow>
          <torusGeometry args={[4, 2, 16, 100]} />
          <MeshDistortMaterial
            color="#4B0082"
            emissive="#483D8B"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
            distort={0.25}
            speed={2.5}
          />
        </mesh>
      </Float>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[12, 18, 64]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0.6} azimuth={0.25} />

      <ambientLight intensity={0.4} />
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
      <pointLight position={[0, 15, 0]} intensity={1.2} color="#FFD700" />
      <pointLight position={[-20, 10, -20]} intensity={0.8} color="#DC143C" />
      <pointLight position={[20, 10, 20]} intensity={0.8} color="#8B4513" />

      <Environment preset="sunset" />
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
export default function ThreeKingdomsMetaverse() {
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

    const newPlayer: Player = {
      id: userData.email,
      name: userData.name,
      character: '劉備',
      class: '촉한 황제',
      avatar: '👑',
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
      weapon: '쌍검',
      color: '#FFD700'
    };
    setMyPlayer(newPlayer);

    const otherPlayers: Player[] = [
      { ...newPlayer, id: 'p1', name: '관우', character: '雲長', position: [5, 0, 5], color: '#DC143C', level: 48 },
      { ...newPlayer, id: 'p2', name: '장비', character: '翼德', position: [-5, 0, 5], color: '#000000', level: 47 },
      { ...newPlayer, id: 'p3', name: '조자룡', character: '子龍', position: [5, 0, -5], color: '#FFFFFF', level: 45 },
    ];
    setPlayers([newPlayer, ...otherPlayers]);

    const spawnedMonsters: Monster[] = [
      { id: 'm1', name: '조조군', position: [10, 0, 10], rotation: 0, hp: 1500, maxHp: 1500, level: 45, type: 'orc', isAlive: true },
      { id: 'm2', name: '동탁군', position: [-10, 0, 10], rotation: 0, hp: 1200, maxHp: 1200, level: 40, type: 'wolf', isAlive: true },
      { id: 'm3', name: '여포', position: [10, 0, -10], rotation: 0, hp: 3000, maxHp: 3000, level: 60, type: 'elf', isAlive: true },
      { id: 'm4', name: '적토마', position: [-10, 0, -10], rotation: 0, hp: 8000, maxHp: 8000, level: 75, type: 'dragon', isAlive: true },
    ];
    setMonsters(spawnedMonsters);

    setSkills([
      { id: 's1', name: '인의지검', icon: '⚔️', cooldown: 5, currentCooldown: 0, manaCost: 80, color: '#FFD700' },
      { id: 's2', name: '도원결의', icon: '🤝', cooldown: 10, currentCooldown: 0, manaCost: 120, color: '#DC143C' },
      { id: 's3', name: '황제의 위엄', icon: '👑', cooldown: 15, currentCooldown: 0, manaCost: 150, color: '#FFD700' },
      { id: 's4', name: '촉한부흥', icon: '🔥', cooldown: 20, currentCooldown: 0, manaCost: 200, color: '#FF4500' },
    ]);

    addNotification('🎮 삼국지 메타버스 입장! 劉備 유비로 플레이');
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
        color: '#FFD700',
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
        addNotification(`✨ 레벨업! ${myPlayer.level} → ${myPlayer.level + 1}`);
        setTimeout(() => setLevelUpEffect(false), 3000);
        
        for (let i = 0; i < 150; i++) {
          const particle: Particle = {
            id: `lv-${Date.now()}-${i}`,
            position: [myPlayer.position[0], myPlayer.position[1] + 2, myPlayer.position[2]],
            velocity: [(Math.random() - 0.5) * 0.4, Math.random() * 0.6, (Math.random() - 0.5) * 0.4],
            life: 80,
            maxLife: 80,
            color: '#FFD700',
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

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Canvas shadows gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[12, 18, 12]} fov={65} />
            <CinematicCamera target={myPlayer?.position || [0, 0, 0]} />
            
            <ThreeKingdomsTerrain />
            
            {players.map(player => (
              <LiuBeiCharacter key={player.id} player={player} isMe={player.id === myPlayer?.id} />
            ))}

            {monsters.map(monster => (
              <ThreeKingdomsMonster key={monster.id} monster={monster} />
            ))}

            <ParticleEffect particles={particles} />

            <EffectComposer>
              <Bloom intensity={2} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
              <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.002, 0.002]} />
              <Vignette offset={0.3} darkness={0.6} />
              <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} />
            </EffectComposer>

            <fog attach="fog" args={['#1a0a00', 50, 120]} />
          </Suspense>
        </Canvas>
      </div>

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          {myPlayer && (
            <div className="bg-gradient-to-br from-black/95 to-red-900/95 backdrop-blur-2xl border-4 border-yellow-500/80 rounded-3xl p-6 pointer-events-auto shadow-2xl shadow-yellow-500/50">
              <div className="flex items-center gap-5 mb-4">
                <div className="text-6xl drop-shadow-2xl">{myPlayer.avatar}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-black text-yellow-400 drop-shadow-lg">劉備</span>
                    <span className="text-2xl font-black text-white drop-shadow-lg">{myPlayer.name}</span>
                    <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full text-base font-black shadow-lg">
                      Lv.{myPlayer.level}
                    </span>
                  </div>
                  <div className="text-base text-yellow-300 font-bold drop-shadow-lg">{myPlayer.class}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-red-400 drop-shadow-lg">HP</span>
                    <span className="text-white/90">{myPlayer.hp}/{myPlayer.maxHp}</span>
                  </div>
                  <div className="h-4 bg-black/80 rounded-full overflow-hidden border-2 border-red-500/60 shadow-lg">
                    <div className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all" style={{ width: `${(myPlayer.hp / myPlayer.maxHp) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-blue-400 drop-shadow-lg">MP</span>
                    <span className="text-white/90">{myPlayer.mp}/{myPlayer.maxMp}</span>
                  </div>
                  <div className="h-4 bg-black/80 rounded-full overflow-hidden border-2 border-blue-500/60 shadow-lg">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all" style={{ width: `${(myPlayer.mp / myPlayer.maxMp) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-yellow-400 drop-shadow-lg">EXP</span>
                    <span className="text-white/90">{Math.floor((myPlayer.exp / myPlayer.maxExp) * 100)}%</span>
                  </div>
                  <div className="h-3 bg-black/80 rounded-full overflow-hidden border-2 border-yellow-500/60 shadow-lg">
                    <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all" style={{ width: `${(myPlayer.exp / myPlayer.maxExp) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-black/95 to-yellow-900/95 backdrop-blur-2xl border-4 border-yellow-500/80 rounded-3xl p-6 pointer-events-auto shadow-2xl">
            <div className="text-base font-black mb-3 text-yellow-400">🗺️ 천하</div>
            <div className="relative w-56 h-56 bg-gradient-to-br from-red-900/50 to-yellow-900/50 rounded-2xl border-2 border-yellow-500/60 overflow-hidden">
              {myPlayer && (
                <div className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg" style={{
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
          <div key={i} className="bg-gradient-to-r from-black/95 to-yellow-900/95 backdrop-blur-2xl border-3 border-yellow-500/80 rounded-2xl px-8 py-4 text-yellow-400 font-black shadow-2xl animate-pulse text-lg">
            {notif}
          </div>
        ))}
      </div>

      {/* 콤보 */}
      {combo > 1 && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          <div className="text-9xl font-black bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
            {combo} 連擊!
          </div>
        </div>
      )}

      {/* 레벨업 */}
      {levelUpEffect && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 animate-pulse">
          <div className="text-center">
            <div className="text-[12rem] font-black bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl mb-8">
              ✨ 레벨업! ✨
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
              className="w-48 h-48 bg-gradient-to-br from-black/80 to-yellow-900/80 backdrop-blur-2xl border-4 border-yellow-500/60 rounded-full relative cursor-pointer shadow-2xl"
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
                  className="absolute w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full shadow-2xl transition-transform border-4 border-white/60"
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
                    : 'bg-gradient-to-br from-yellow-600 to-red-600 border-yellow-400/80 hover:scale-110 active:scale-95 shadow-yellow-500/60'
                }`}
              >
                {skill.icon}
                {skill.currentCooldown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-2xl">
                    <span className="text-3xl font-black text-white">{skill.currentCooldown}</span>
                  </div>
                )}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xs font-black bg-black/90 px-3 py-1 rounded-full whitespace-nowrap border-2 border-yellow-500/60">
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
        <div className="absolute bottom-60 left-6 bg-gradient-to-br from-black/95 to-red-900/95 backdrop-blur-2xl border-4 border-red-500/80 rounded-3xl p-6 shadow-2xl">
          <div className="text-red-400 font-black mb-3 text-lg">🎯 타겟</div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">
              {selectedMonster.type === 'orc' ? '👹' : selectedMonster.type === 'wolf' ? '🐺' : selectedMonster.type === 'elf' ? '🧝' : '🐉'}
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
            <div className="h-4 bg-black/80 rounded-full overflow-hidden border-2 border-green-500/60 shadow-lg">
              <div className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all" style={{ width: `${(selectedMonster.hp / selectedMonster.maxHp) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* 메뉴 */}
      <div className="absolute top-6 right-6 flex gap-3">
        <Link href="/workspace" className="px-8 py-4 bg-gradient-to-r from-black/90 to-yellow-900/90 backdrop-blur-2xl border-3 border-yellow-500/60 rounded-2xl font-black text-white text-lg hover:border-yellow-500 transition-all shadow-2xl">
          ← 나가기
        </Link>
      </div>

      {/* 몬스터 선택 */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-gradient-to-br from-black/95 to-red-900/95 backdrop-blur-2xl border-4 border-yellow-500/60 rounded-3xl p-6 shadow-2xl">
        <div className="text-base font-black mb-4 text-yellow-400">👾 적군</div>
        <div className="space-y-3">
          {monsters.filter(m => m.isAlive).map(monster => (
            <button
              key={monster.id}
              onClick={() => setSelectedMonster(monster)}
              className={`w-full px-5 py-3 rounded-2xl text-sm font-black transition-all border-2 ${
                selectedMonster?.id === monster.id
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white border-red-400 shadow-lg'
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
