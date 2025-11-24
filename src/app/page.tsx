'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';
import { MousePointer2, Database, Shield, Zap, ScanLine, Hexagon, Coins, Lock } from 'lucide-react';

// 3D Smart Logistics Node Component
function SmartLogisticsNode({ scrollProgress }: { scrollProgress: number }) {
    const meshRef = useRef<Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
            meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    const scanIntensity = Math.min(scrollProgress * 2, 1);

    return (
        <group ref={meshRef}>
            <mesh>
                <boxGeometry args={[2, 1.5, 1]} />
                <meshStandardMaterial
                    color="#00FF94"
                    wireframe
                    emissive="#00FF94"
                    emissiveIntensity={scanIntensity * 0.3}
                />
            </mesh>
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
        <div className="relative w-full h-[600px] bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.5} />
                <pointLight position={[-5, -5, -5]} color="#00FF94" intensity={0.3} />
                <SmartLogisticsNode scrollProgress={scrollProgress} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
            
            {/* Floating HUD Labels (JARVIS Style) */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-20 left-10 bg-black/60 backdrop-blur-xl border border-[#00FF94]/30 rounded-lg p-3"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
                        <div className="font-['JetBrains_Mono',monospace] text-xs text-white/90">
                            Temp: 18°C
                        </div>
                    </div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-40 right-10 bg-black/60 backdrop-blur-xl border border-[#00FF94]/30 rounded-lg p-3"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
                        <div className="font-['JetBrains_Mono',monospace] text-xs text-white/90">
                            Hash: #9A2F...
                        </div>
                    </div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-[#00FF94]/30 rounded-lg p-3"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
                        <div className="font-['JetBrains_Mono',monospace] text-xs text-white/90">
                            Nodes: 5,021 Active
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Scroll Indicator Component
function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <MousePointer2 className="w-6 h-6 text-white/40" strokeWidth={1.5} />
            </motion.div>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
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
                    <h1 className="font-['Inter',sans-serif] text-7xl md:text-[10rem] font-extrabold tracking-tighter text-white">
                        REALITY.
                    </h1>
                </motion.div>

                {/* Scroll Indicator */}
                <ScrollIndicator />
            </section>

            {/* Section 2: The Definition (Identity) - Split Layout */}
            <section className="min-h-screen flex items-center justify-center px-4 py-32">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden"
                        style={{
                            maskImage: 'radial-gradient(ellipse 80% 80% at center, black 60%, transparent 100%)',
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-white/10 font-['JetBrains_Mono',monospace] text-sm">
                                [Dark Server Room / Vault Image]
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Icon + Label Pairs */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="text-white/40 font-['JetBrains_Mono',monospace] text-xs mb-8 tracking-wider">
                            NEXUS: THE DATABASE GUARD CENTER
                        </div>
                        
                        {[
                            {
                                icon: Database,
                                title: 'Data Guard',
                                description: 'Physical assets encrypted as data.',
                            },
                            {
                                icon: Shield,
                                title: 'Zero Trust',
                                description: 'Bio-metric access control.',
                            },
                            {
                                icon: Zap,
                                title: 'Hyper Speed',
                                description: 'Automated processing nodes.',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className="w-12 h-12 rounded-lg bg-[#00FF94]/10 border border-[#00FF94]/30 flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-6 h-6 text-[#00FF94]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-['Inter',sans-serif] text-2xl font-bold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-white/60 font-['Inter',sans-serif] font-light">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
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
                        <h2 className="font-['Inter',sans-serif] text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                            AI Vision & Blockchain Layer
                        </h2>
                    </div>
                    <Infrastructure3D scrollProgress={section3Scroll.get()} />
                </motion.div>
            </section>

            {/* Section 4: Workflow (Bento Grid) */}
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
                            OPERATIONAL WORKFLOW
                        </div>
                        <h2 className="font-['Inter',sans-serif] text-5xl md:text-6xl font-bold tracking-tight text-white">
                            The System in Action
                        </h2>
                    </motion.div>

                    {/* Bento Grid (3x2) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: ScanLine,
                                title: 'No-Scan Auto Entry',
                                description: 'AI vision automatically identifies and digitizes incoming assets.',
                                bgPattern: 'waveform',
                            },
                            {
                                icon: Hexagon,
                                title: 'Real-time NFT Minting',
                                description: 'Physical assets instantly converted to blockchain tokens.',
                                bgPattern: 'code',
                            },
                            {
                                icon: Coins,
                                title: 'Inventory-backed DeFi',
                                description: 'Liquidity pools enable instant asset trading.',
                                bgPattern: 'waveform',
                            },
                            {
                                icon: Lock,
                                title: 'Invisible Watermarking',
                                description: 'Anti-theft security with geofencing technology.',
                                bgPattern: 'code',
                            },
                        ].map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-8 hover:border-[#00FF94]/30 transition-all overflow-hidden group"
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                                    {card.bgPattern === 'waveform' ? (
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)',
                                        }} />
                                    ) : (
                                        <div className="absolute inset-0 font-['JetBrains_Mono',monospace] text-xs text-white/20 p-4">
                                            {'<>'}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon in Glowing Circle */}
                                    <div className="w-16 h-16 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/30 flex items-center justify-center mb-6 group-hover:bg-[#00FF94]/20 transition-colors">
                                        <card.icon className="w-8 h-8 text-[#00FF94]" strokeWidth={1.5} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-['Inter',sans-serif] text-2xl font-bold text-white mb-3">
                                        {card.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-white/60 font-['Inter',sans-serif] font-light text-sm leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
