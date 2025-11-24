'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 50000;

export function ParticleContainer({ mouse }: { mouse: { x: number; y: number } }) {
    const pointsRef = useRef<THREE.Points>(null);
    const particles = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        
        // Create a container-like shape
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            
            // Container dimensions (roughly 2.4m x 2.6m x 12m)
            const width = 2.4;
            const height = 2.6;
            const depth = 12;
            
            // Random position within container bounds
            positions[i3] = (Math.random() - 0.5) * width;
            positions[i3 + 1] = (Math.random() - 0.5) * height;
            positions[i3 + 2] = (Math.random() - 0.5) * depth;
        }
        
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        
        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        
        // Mouse repulsion effect
        const mouseInfluence = 0.3;
        
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            const x = positions[i3];
            const y = positions[i3 + 1];
            const z = positions[i3 + 2];
            
            // Calculate distance from mouse
            const mouseX = mouse.x * 5;
            const mouseY = mouse.y * 5;
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Repulsion force
            if (dist < 2) {
                const force = (2 - dist) / 2;
                positions[i3] += (dx / dist) * force * mouseInfluence * delta * 2;
                positions[i3 + 1] += (dy / dist) * force * mouseInfluence * delta * 2;
            }
            
            // Gentle floating animation
            positions[i3 + 1] += Math.sin(time + i * 0.001) * 0.0001;
        }
        
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00FF94"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

