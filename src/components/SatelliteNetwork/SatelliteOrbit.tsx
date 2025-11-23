'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface Satellite {
    id: string;
    name: string;
    orbit: 'LEO' | 'MEO' | 'GEO';
    altitude: number;
    inclination: number;
    coverage: number;
    activeRFIDTags: number;
    status: 'active' | 'maintenance' | 'offline';
}

// 위성 궤도 컴포넌트
function SatelliteModel({ satellite, angle }: { satellite: Satellite; angle: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const orbitRadius = satellite.orbit === 'LEO' ? 1.1 : satellite.orbit === 'MEO' ? 1.3 : 1.5;
    
    // 궤도 계산
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(satellite.inclination * Math.PI / 180) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    const color = satellite.status === 'active' ? '#10b981' : 
                  satellite.status === 'maintenance' ? '#f59e0b' : 
                  '#ef4444';

    return (
        <group position={[x, y, z]}>
            {/* 위성 */}
            <mesh ref={meshRef}>
                <boxGeometry args={[0.05, 0.05, 0.1]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                />
            </mesh>
            {/* 신호 범위 */}
            <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.1}
                    wireframe
                />
            </mesh>
            {/* 연결선 (지구 중심으로) */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([
                            x, y, z,
                            0, 0, 0
                        ])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={color} transparent opacity={0.2} />
            </line>
        </group>
    );
}

// 지구본
function Earth() {
    const earthRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
        }
    });

    return (
        <>
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color="#1e3a8a"
                    emissive="#0f172a"
                    emissiveIntensity={0.2}
                />
            </mesh>
            {/* 대륙 윤곽선 */}
            <mesh>
                <sphereGeometry args={[1.01, 32, 32]} />
                <meshBasicMaterial
                    color="#3b82f6"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </mesh>
        </>
    );
}

export default function SatelliteOrbit({ satellites }: { satellites: Satellite[] }) {
    const anglesRef = useRef<{ [key: string]: number }>({});

    // 각 위성의 초기 각도 설정
    useEffect(() => {
        satellites.forEach((sat, index) => {
            anglesRef.current[sat.id] = (index / satellites.length) * Math.PI * 2;
        });
    }, [satellites]);

    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
            
            <Earth />
            
            {satellites.map((satellite) => {
                if (!anglesRef.current[satellite.id]) {
                    anglesRef.current[satellite.id] = 0;
                }
                
                return (
                    <SatelliteOrbitAnimation
                        key={satellite.id}
                        satellite={satellite}
                        initialAngle={anglesRef.current[satellite.id]}
                    />
                );
            })}
            
            <Stars radius={5} depth={50} count={1000} factor={4} fade speed={0.5} />
            
            <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={3}
                maxDistance={8}
                autoRotate={false}
            />
        </Canvas>
    );
}

// 위성 궤도 애니메이션 컴포넌트
function SatelliteOrbitAnimation({ satellite, initialAngle }: { satellite: Satellite; initialAngle: number }) {
    const angleRef = useRef(initialAngle);
    const orbitRadius = satellite.orbit === 'LEO' ? 1.1 : satellite.orbit === 'MEO' ? 1.3 : 1.5;
    const speed = satellite.orbit === 'LEO' ? 0.02 : satellite.orbit === 'MEO' ? 0.01 : 0.005;

    useFrame(() => {
        angleRef.current += speed;
    });

    const x = Math.cos(angleRef.current) * orbitRadius;
    const y = Math.sin(satellite.inclination * Math.PI / 180) * orbitRadius;
    const z = Math.sin(angleRef.current) * orbitRadius;

    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.set(x, y, z);
            meshRef.current.rotation.y += 0.01;
        }
    });

    const color = satellite.status === 'active' ? '#10b981' : 
                  satellite.status === 'maintenance' ? '#f59e0b' : 
                  '#ef4444';

    return (
        <>
            {/* 위성 */}
            <mesh ref={meshRef}>
                <boxGeometry args={[0.05, 0.05, 0.1]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                />
            </mesh>
            {/* 신호 범위 */}
            <mesh position={[x, y, z]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.1}
                    wireframe
                />
            </mesh>
            {/* 연결선 */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([
                            x, y, z,
                            0, 0, 0
                        ])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={color} transparent opacity={0.2} />
            </line>
        </>
    );
}

