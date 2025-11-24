'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ParticleContainer } from './ParticleContainer';
import * as THREE from 'three';

function CameraController({ scrollProgress }: { scrollProgress: number }) {
    const { camera } = useThree();
    
    useFrame(() => {
        // Camera flies through particles as user scrolls
        const z = -5 + scrollProgress * 15; // Fly forward through container
        const y = scrollProgress * 2; // Slight upward movement
        
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, z, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.05);
        camera.lookAt(0, 0, 0);
    });
    
    return null;
}

function SceneContent({ mouse, scrollProgress }: { mouse: { x: number; y: number }; scrollProgress: number }) {
    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#00FF94" />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00C2FF" />
            
            <ParticleContainer mouse={mouse} />
            
            <CameraController scrollProgress={scrollProgress} />
            
            <EffectComposer>
                <Bloom intensity={1.5} luminanceThreshold={0.9} />
            </EffectComposer>
        </>
    );
}

export function Scene({ scrollProgress }: { scrollProgress: number }) {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouse({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
            className="fixed inset-0 z-0"
        >
            <Suspense fallback={null}>
                <SceneContent mouse={mouse} scrollProgress={scrollProgress} />
            </Suspense>
        </Canvas>
    );
}

