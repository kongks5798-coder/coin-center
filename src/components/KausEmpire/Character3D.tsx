'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, useGLTF, useAnimations } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Glitch, Vignette, Scanline } from '@react-three/postprocessing';
import * as THREE from 'three';

// 2035년 홀로그램 캐릭터 - 양자 렌더링 스타일
function HolographicCharacter() {
    const groupRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    
    // 홀로그램 셰이더 재질
    const hologramMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0xffd700) }, // 황금
                color2: { value: new THREE.Color(0xff6b35) }, // 주황
                color3: { value: new THREE.Color(0x00d4ff) }, // 시안
            },
            vertexShader: `
                varying vec3 vPosition;
                varying vec3 vNormal;
                void main() {
                    vPosition = position;
                    vNormal = normal;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                uniform vec3 color3;
                varying vec3 vPosition;
                varying vec3 vNormal;
                
                void main() {
                    // 홀로그램 스캔라인 효과
                    float scanline = sin(vPosition.y * 50.0 + time * 10.0) * 0.5 + 0.5;
                    scanline = pow(scanline, 10.0);
                    
                    // 홀로그램 프린지 효과
                    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    
                    // 색상 그라디언트
                    vec3 color = mix(color1, color2, fresnel);
                    color = mix(color, color3, scanline * 0.3);
                    
                    // 홀로그램 투명도
                    float alpha = 0.7 + fresnel * 0.3 + scanline * 0.2;
                    
                    // 왜곡 효과
                    float distortion = sin(vPosition.x * 10.0 + time * 5.0) * 0.02;
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
        });
    }, []);

    // 애니메이션
    useFrame((state) => {
        const time = state.clock.elapsedTime;
        
        if (groupRef.current) {
            // 양자 필드 효과 - 부드러운 움직임
            groupRef.current.position.y = Math.sin(time * 0.3) * 0.15;
            groupRef.current.rotation.y = time * 0.2;
            groupRef.current.rotation.x = Math.sin(time * 0.4) * 0.1;
        }
        
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = time;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            {/* 홀로그램 캐릭터 - 복잡한 형태 */}
            {/* 머리 */}
            <mesh position={[0, 2, 0]} castShadow>
                <icosahedronGeometry args={[0.4, 2]} />
                <primitive object={hologramMaterial} ref={materialRef} />
            </mesh>
            
            {/* 왕관 - 홀로그램 */}
            <mesh position={[0, 2.3, 0]} castShadow>
                <coneGeometry args={[0.35, 0.3, 12]} />
                <meshStandardMaterial 
                    color="#ffd700"
                    metalness={1}
                    roughness={0}
                    emissive="#ffd700"
                    emissiveIntensity={1}
                    transparent
                    opacity={0.9}
                />
            </mesh>
            
            {/* 몸통 - 홀로그램 */}
            <mesh position={[0, 1.2, 0]} castShadow>
                <octahedronGeometry args={[0.8, 1]} />
                <primitive object={hologramMaterial} />
            </mesh>
            
            {/* 팔 - 홀로그램 */}
            <mesh position={[-0.6, 1.2, 0]} rotation={[0, 0, 0.3]} castShadow>
                <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
                <primitive object={hologramMaterial} />
            </mesh>
            <mesh position={[0.6, 1.2, 0]} rotation={[0, 0, -0.3]} castShadow>
                <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
                <primitive object={hologramMaterial} />
            </mesh>
            
            {/* 다리 - 홀로그램 */}
            <mesh position={[-0.25, 0.2, 0]} castShadow>
                <capsuleGeometry args={[0.18, 0.9, 8, 16]} />
                <primitive object={hologramMaterial} />
            </mesh>
            <mesh position={[0.25, 0.2, 0]} castShadow>
                <capsuleGeometry args={[0.18, 0.9, 8, 16]} />
                <primitive object={hologramMaterial} />
            </mesh>
            
            {/* 검 - 홀로그램 에너지 */}
            <mesh position={[-0.5, 0.8, 0]} rotation={[0, 0, -0.5]} castShadow>
                <boxGeometry args={[0.08, 0.9, 0.08]} />
                <meshStandardMaterial 
                    color="#00d4ff"
                    metalness={1}
                    roughness={0}
                    emissive="#00d4ff"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            
            {/* 양자 에너지 필드 */}
            <mesh position={[0, 1, 0]}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial 
                    color="#00d4ff"
                    transparent
                    opacity={0.1}
                    wireframe
                />
            </mesh>
            
            {/* 홀로그램 빛 */}
            <pointLight position={[0, 2.5, 2]} intensity={3} color="#ffd700" distance={8} />
            <pointLight position={[-2, 1.5, 2]} intensity={2} color="#ff6b35" distance={6} />
            <pointLight position={[2, 1.5, 2]} intensity={2} color="#00d4ff" distance={6} />
            <pointLight position={[0, 0, 4]} intensity={1.5} color="#ffffff" distance={5} />
        </group>
    );
}

// 양자 파티클 시스템
function QuantumParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 1000;
    
    const positions = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, []);
    
    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });
    
    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#00d4ff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// 메인 3D 캐릭터 컴포넌트 - 2035년 양자 렌더링
export default function Character3D() {
    return (
        <div className="w-full h-full relative">
            <Canvas
                shadows
                gl={{ 
                    antialias: true, 
                    alpha: true,
                    powerPreference: "high-performance",
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2
                }}
                className="bg-transparent"
                dpr={[1, 2]}
            >
                {/* 카메라 */}
                <PerspectiveCamera 
                    makeDefault 
                    position={[0, 1.5, 5]} 
                    fov={50}
                />

                {/* 조명 */}
                <ambientLight intensity={0.4} />
                <directionalLight 
                    position={[5, 10, 5]} 
                    intensity={2} 
                    castShadow
                    shadow-mapSize-width={4096}
                    shadow-mapSize-height={4096}
                    shadow-camera-far={15}
                    shadow-camera-left={-5}
                    shadow-camera-right={5}
                    shadow-camera-top={5}
                    shadow-camera-bottom={-5}
                />
                
                {/* 홀로그램 조명 */}
                <spotLight 
                    position={[0, 5, 3]} 
                    angle={0.5} 
                    penumbra={0.5} 
                    intensity={3} 
                    color="#ffd700"
                    castShadow
                />

                {/* 환경 */}
                <Environment preset="night" />

                {/* 양자 파티클 */}
                <QuantumParticles />

                {/* 홀로그램 캐릭터 */}
                <HolographicCharacter />

                {/* 그림자 */}
                <ContactShadows 
                    position={[0, -1, 0]} 
                    opacity={0.6} 
                    scale={8} 
                    blur={4} 
                    far={6}
                    color="#000000"
                />

                {/* 컨트롤 */}
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={4}
                    maxDistance={8}
                    minPolarAngle={Math.PI / 5}
                    maxPolarAngle={Math.PI / 1.5}
                    autoRotate
                    autoRotateSpeed={1}
                    enableDamping
                    dampingFactor={0.03}
                />

                {/* 포스트 프로세싱 - 2035년 홀로그램 효과 */}
                <EffectComposer>
                    <Bloom 
                        intensity={1.5} 
                        luminanceThreshold={0.5} 
                        luminanceSmoothing={0.9}
                        height={300}
                    />
                    <ChromaticAberration
                        offset={[0.002, 0.002]}
                    />
                    <Glitch
                        delay={[1.5, 3.5]}
                        duration={[0.1, 0.3]}
                        strength={[0.1, 0.2]}
                    />
                    <Scanline
                        density={1.5}
                    />
                    <Vignette
                        eskil={false}
                        offset={0.1}
                        darkness={0.5}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
