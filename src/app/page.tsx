'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Wireframe } from '@react-three/drei';
import { Mesh } from 'three';

// 3D Smart Logistics Node Component
function SmartLogisticsNode({ scrollProgress }: { scrollProgress: number }) {
    const meshRef = useRef<Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
            meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    // Scanning effect based on scroll
    const scanIntensity = Math.min(scrollProgress * 2, 1);

    return (
        <group ref={meshRef}>
            {/* Main Container Structure */}
            <mesh>
                <boxGeometry args={[2, 1.5, 1]} />
                <meshStandardMaterial
                    color="#00FF94"
                    wireframe
                    emissive="#00FF94"
                    emissiveIntensity={scanIntensity * 0.3}
                />
            </mesh>
            {/* Scanning Light */}
            <mesh position={[0, -0.75 + scanIntensity * 1.5, 0]}>
                <boxGeometry args={[2.1, 0.1, 1.1]} />
                <meshStandardMaterial
                    color="#00FF94"
                    emissive="#00FF94"
                    emissiveIntensity={0.8}
                />
            </mesh>
        </group>
    );
}

function Infrastructure3D({ scrollProgress }: { scrollProgress: number }) {
    return (
        <div className="w-full h-[600px] bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.5} />
                <pointLight position={[-5, -5, -5]} color="#00FF94" intensity={0.3} />
                <SmartLogisticsNode scrollProgress={scrollProgress} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}

export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const section3Scroll = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

    return (
        <div ref={containerRef} className="bg-[#050505] text-white">
            {/* Section 1: The Hero (Impact) */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
                    >
                        <source src="/assets/hero-video.mp4" type="video/mp4" />
                    </video>
                    {/* Heavy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="font-['Inter',sans-serif] text-7xl md:text-[10rem] font-extrabold tracking-tighter text-white mb-6">
                        PROCESSING
                    </h1>
                    <h1 className="font-['Inter',sans-serif] text-7xl md:text-[10rem] font-extrabold tracking-tighter text-white mb-8">
                        REALITY.
                    </h1>
                    <p className="text-2xl md:text-3xl text-white/70 font-light tracking-wide font-['Inter',sans-serif]">
                        Physical AI Computing Infrastructure
                    </p>
                </motion.div>
            </section>

            {/* Section 2: The Definition (Identity) */}
            <section className="min-h-screen flex items-center justify-center px-4 py-32">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-white/40 font-['JetBrains_Mono',monospace] text-xs mb-4 tracking-wider">
                            NEXUS: THE DATABASE GUARD CENTER
                        </div>
                        <h2 className="font-['Inter',sans-serif] text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                            We do not just store.
                        </h2>
                        <h2 className="font-['Inter',sans-serif] text-5xl md:text-6xl font-bold tracking-tight text-white mb-8">
                            We secure physical assets as immutable data blocks.
                        </h2>
                        <p className="text-lg text-white/60 font-['Inter',sans-serif] font-light leading-relaxed">
                            Every physical asset in our infrastructure is digitized, verified, and secured on the blockchain. 
                            Real-time tracking, AI vision scanning, and quantum-secured data blocks ensure complete transparency and immutability.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden"
                    >
                        {/* Placeholder for high-quality image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-white/20 font-['JetBrains_Mono',monospace] text-sm">
                                [Server Rack / Safe Image]
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section 3: The Infrastructure (3D Interactive) */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-32">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1 }}
                    className="w-full max-w-6xl"
                >
                    <div className="text-center mb-16">
                        <div className="text-white/40 font-['JetBrains_Mono',monospace] text-xs mb-4 tracking-wider">
                            INFRASTRUCTURE VISUALIZATION
                        </div>
                        <h2 className="font-['Inter',sans-serif] text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                            AI Vision & Blockchain Layer
                        </h2>
                        <p className="text-lg text-white/60 font-['Inter',sans-serif] font-light max-w-2xl mx-auto">
                            Real-time 3D visualization of our Smart Logistics Nodes. As assets move through the system, 
                            they are scanned, digitized, and secured on-chain.
                        </p>
                    </div>
                    <Infrastructure3D scrollProgress={section3Scroll.get()} />
                </motion.div>
            </section>

            {/* Section 4: References & Operations (The Proof) */}
            <section className="min-h-screen flex items-center justify-center px-4 py-32">
                <div className="max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 1 }}
                        className="text-center mb-16"
                    >
                        <div className="text-white/40 font-['JetBrains_Mono',monospace] text-xs mb-4 tracking-wider">
                            OPERATIONAL LOGIC
                        </div>
                        <h2 className="font-['Inter',sans-serif] text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                            The System in Action
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Automated Inbound Scanning',
                                subtitle: 'No-Scan Technology',
                                description: 'AI vision automatically identifies and digitizes incoming assets without manual scanning.',
                            },
                            {
                                title: 'Asset Tokenization',
                                subtitle: 'NFT Minting',
                                description: 'Physical assets are instantly converted to blockchain tokens with complete traceability.',
                            },
                            {
                                title: 'DeFi Liquidity Pool',
                                subtitle: 'Liquidity Generation',
                                description: 'Inventory-backed liquidity pools enable instant asset trading and financing.',
                            },
                        ].map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-8 hover:border-[#00FF94]/30 transition-all"
                            >
                                <div className="text-[#00FF94] font-['JetBrains_Mono',monospace] text-xs mb-3 tracking-wider">
                                    {card.subtitle}
                                </div>
                                <h3 className="font-['Inter',sans-serif] text-2xl font-bold text-white mb-4">
                                    {card.title}
                                </h3>
                                <p className="text-white/60 font-['Inter',sans-serif] font-light leading-relaxed text-sm">
                                    {card.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
