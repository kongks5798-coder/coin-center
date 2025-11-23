'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

// 양자 데이터센터 위치 데이터
interface DataCenter {
    id: string;
    name: string;
    country: string;
    lat: number;
    lng: number;
    qubits: number;
    status: 'active' | 'warning' | 'critical';
    capacity: string;
}

// 드론 배송 추적 데이터
interface Drone {
    id: string;
    from: { lat: number; lng: number; name: string };
    to: { lat: number; lng: number; name: string };
    progress: number; // 0-100
    speed: number;
    status: 'flying' | 'delivered' | 'loading';
}

// 3D 지구본 컴포넌트
function Earth({ dataCenters, drones }: { dataCenters: DataCenter[]; drones: Drone[] }) {
    const earthRef = useRef<THREE.Mesh>(null);
    const markersRef = useRef<THREE.Group>(null);
    const droneLinesRef = useRef<THREE.Group>(null);

    // 지구본 회전
    useFrame((state) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.001;
        }
    });

    // 위도/경도를 3D 좌표로 변환
    const latLngToVector3 = (lat: number, lng: number, radius: number = 1) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        return new THREE.Vector3(x, y, z);
    };

    return (
        <>
            {/* 지구본 */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color="#1e3a8a"
                    emissive="#0f172a"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* 대륙 윤곽선 (간단한 그리드) */}
            <mesh>
                <sphereGeometry args={[1.01, 32, 32]} />
                <meshBasicMaterial
                    color="#3b82f6"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* 양자 데이터센터 마커 */}
            <group ref={markersRef}>
                {dataCenters.map((dc) => {
                    const position = latLngToVector3(dc.lat, dc.lng, 1.02);
                    const color = dc.status === 'active' ? '#10b981' : dc.status === 'warning' ? '#f59e0b' : '#ef4444';
                    
                    return (
                        <group key={dc.id} position={position}>
                            {/* 마커 점 */}
                            <mesh>
                                <sphereGeometry args={[0.02, 16, 16]} />
                                <meshStandardMaterial
                                    color={color}
                                    emissive={color}
                                    emissiveIntensity={0.5}
                                />
                            </mesh>
                            {/* 펄스 효과 */}
                            <mesh>
                                <sphereGeometry args={[0.03, 16, 16]} />
                                <meshBasicMaterial
                                    color={color}
                                    transparent
                                    opacity={0.3}
                                />
                            </mesh>
                            {/* 연결선 (북극으로) */}
                            <line>
                                <bufferGeometry>
                                    <bufferAttribute
                                        attach="attributes-position"
                                        count={2}
                                        array={new Float32Array([
                                            position.x, position.y, position.z,
                                            position.x * 1.5, position.y * 1.5, position.z * 1.5
                                        ])}
                                        itemSize={3}
                                    />
                                </bufferGeometry>
                                <lineBasicMaterial color={color} transparent opacity={0.2} />
                            </line>
                        </group>
                    );
                })}
            </group>

            {/* 드론 배송 경로 */}
            <group ref={droneLinesRef}>
                {drones.map((drone) => {
                    if (drone.status !== 'flying') return null;
                    
                    const fromPos = latLngToVector3(drone.from.lat, drone.from.lng, 1.02);
                    const toPos = latLngToVector3(drone.to.lat, drone.to.lng, 1.02);
                    const currentPos = fromPos.clone().lerp(toPos, drone.progress / 100);

                    return (
                        <group key={drone.id}>
                            {/* 경로선 */}
                            <line>
                                <bufferGeometry>
                                    <bufferAttribute
                                        attach="attributes-position"
                                        count={2}
                                        array={new Float32Array([
                                            fromPos.x, fromPos.y, fromPos.z,
                                            toPos.x, toPos.y, toPos.z
                                        ])}
                                        itemSize={3}
                                    />
                                </bufferGeometry>
                                <lineBasicMaterial color="#fbbf24" transparent opacity={0.3} />
                            </line>
                            {/* 드론 위치 */}
                            <mesh position={currentPos}>
                                <boxGeometry args={[0.015, 0.015, 0.03]} />
                                <meshStandardMaterial
                                    color="#fbbf24"
                                    emissive="#fbbf24"
                                    emissiveIntensity={1}
                                />
                            </mesh>
                        </group>
                    );
                })}
            </group>

            {/* 별 배경 */}
            <Stars radius={5} depth={50} count={1000} factor={4} fade speed={0.5} />
        </>
    );
}

export default function Globe3D({ dataCenters, drones }: { dataCenters: DataCenter[]; drones: Drone[] }) {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 3], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
                
                <Earth dataCenters={dataCenters} drones={drones} />
                
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={2}
                    maxDistance={5}
                    autoRotate={false}
                />
            </Canvas>
        </div>
    );
}

