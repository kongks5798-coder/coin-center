'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function NexusCube() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Extremely slow rotation on X and Y axes
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <Float
            speed={0.5}
            rotationIntensity={0.2}
            floatIntensity={0.3}
        >
            <mesh ref={meshRef} rotation={[0, 0, 0]}>
                <boxGeometry args={[2.5, 2.5, 2.5]} />
                <meshStandardMaterial
                    wireframe
                    color="#00FF94"
                    emissive="#00FF94"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
}

function SceneContent() {
    return (
        <>
            {/* Minimal Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow={false}
            />
            
            {/* Hero Object */}
            <NexusCube />
            
            {/* Post-Processing */}
            <EffectComposer>
                <Bloom
                    intensity={1.5}
                    luminanceThreshold={0.2}
                    radius={0.8}
                />
            </EffectComposer>
        </>
    );
}

export function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            className="fixed inset-0 z-0 bg-[#050505]"
        >
            <Suspense fallback={null}>
                <SceneContent />
            </Suspense>
        </Canvas>
    );
}
