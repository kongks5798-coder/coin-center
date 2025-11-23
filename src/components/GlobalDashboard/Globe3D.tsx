'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Text, useTexture } from '@react-three/drei';
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
    const cloudsRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    const markersRef = useRef<THREE.Group>(null);
    const droneLinesRef = useRef<THREE.Group>(null);

    // 실제 지구 텍스처 로드 (NASA Blue Marble 및 공개 텍스처)
    const [earthTexture, normalMap, specularMap, cloudsTexture, nightTexture] = useTexture([
        'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg', // 지구 표면
        'https://threejs.org/examples/textures/planets/earth_normal_2048.jpg', // 노말맵 (지형)
        'https://threejs.org/examples/textures/planets/earth_specular_2048.jpg', // 스펙큘러맵 (물 반사)
        'https://threejs.org/examples/textures/planets/earth_clouds_1024.png', // 구름
        'https://threejs.org/examples/textures/planets/earth_lights_2048.jpg', // 야간 조명
    ]);

    // 텍스처 설정
    useEffect(() => {
        [earthTexture, normalMap, specularMap, cloudsTexture, nightTexture].forEach(texture => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        });
    }, [earthTexture, normalMap, specularMap, cloudsTexture, nightTexture]);

    // 지구본 회전
    useFrame((state) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.001;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += 0.0005; // 구름은 더 느리게
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
            {/* 지구본 - 실제 텍스처 사용 */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 128, 64]} />
                <meshPhongMaterial
                    map={earthTexture}
                    normalMap={normalMap}
                    specularMap={specularMap}
                    emissiveMap={nightTexture}
                    emissive={new THREE.Color(0x000000)}
                    emissiveIntensity={0.3}
                    shininess={10}
                    transparent={false}
                />
            </mesh>

            {/* 구름 레이어 */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[1.005, 128, 64]} />
                <meshPhongMaterial
                    map={cloudsTexture}
                    transparent={true}
                    opacity={0.4}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* 대기 효과 (Atmosphere) */}
            <mesh ref={atmosphereRef}>
                <sphereGeometry args={[1.02, 64, 64]} />
                <meshBasicMaterial
                    color="#4a90e2"
                    transparent={true}
                    opacity={0.15}
                    side={THREE.BackSide}
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
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                
                {/* 태양광 (주 조명) */}
                <directionalLight
                    position={[5, 3, 5]}
                    intensity={1.5}
                    castShadow={false}
                />
                
                {/* 환경광 */}
                <ambientLight intensity={0.4} />
                
                {/* 보조 조명 (어두운 면 밝히기) */}
                <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4a90e2" />
                
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

