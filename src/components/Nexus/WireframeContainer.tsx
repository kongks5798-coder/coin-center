'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Line } from '@react-three/drei';
import * as THREE from 'three';

function ContainerWireframe() {
    const meshRef = useRef<THREE.Group>(null);
    const scanLineRef = useRef<THREE.Mesh>(null);

    // Rotation animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            // Floating animation
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
        }
        // Scanning laser effect
        if (scanLineRef.current) {
            scanLineRef.current.position.y = (Math.sin(state.clock.elapsedTime * 2) * 2) - 1;
        }
    });

    // Container dimensions (standard shipping container: 12m x 2.4m x 2.6m)
    const length = 12;
    const width = 2.4;
    const height = 2.6;

    // Wireframe edges
    const edges = [
        // Bottom face
        [[-length/2, -height/2, -width/2], [length/2, -height/2, -width/2]],
        [[length/2, -height/2, -width/2], [length/2, -height/2, width/2]],
        [[length/2, -height/2, width/2], [-length/2, -height/2, width/2]],
        [[-length/2, -height/2, width/2], [-length/2, -height/2, -width/2]],
        // Top face
        [[-length/2, height/2, -width/2], [length/2, height/2, -width/2]],
        [[length/2, height/2, -width/2], [length/2, height/2, width/2]],
        [[length/2, height/2, width/2], [-length/2, height/2, width/2]],
        [[-length/2, height/2, width/2], [-length/2, height/2, -width/2]],
        // Vertical edges
        [[-length/2, -height/2, -width/2], [-length/2, height/2, -width/2]],
        [[length/2, -height/2, -width/2], [length/2, height/2, -width/2]],
        [[length/2, -height/2, width/2], [length/2, height/2, width/2]],
        [[-length/2, -height/2, width/2], [-length/2, height/2, width/2]],
    ];

    return (
        <group ref={meshRef}>
            {/* Wireframe edges */}
            {edges.map((edge, index) => (
                <Line
                    key={index}
                    points={edge}
                    color="#00FF94"
                    lineWidth={2}
                />
            ))}
            
            {/* Scanning laser effect */}
            <mesh ref={scanLineRef} position={[0, 0, width/2 + 0.1]}>
                <planeGeometry args={[length, 0.1]} />
                <meshBasicMaterial
                    color="#00FF94"
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>
            
            {/* Grid floor */}
            <Grid
                args={[20, 20]}
                cellColor="#00FF94"
                sectionColor="#00FF94"
                cellThickness={0.5}
                sectionThickness={1}
                fadeDistance={15}
                fadeStrength={1}
            />
        </group>
    );
}

export default function WireframeContainer() {
    return (
        <div className="w-full h-[600px] relative">
            <Canvas
                camera={{ position: [15, 8, 15], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00FF94" />
                <pointLight position={[-10, 10, -10]} intensity={0.5} color="#00C2FF" />
                
                <ContainerWireframe />
                
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={10}
                    maxDistance={30}
                />
            </Canvas>
        </div>
    );
}

