'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import WireframeContainer from './WireframeContainer';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] nexus-grid-bg">
            {/* Scanline overlay */}
            <div className="nexus-scanline" />
            
            <div className="container mx-auto px-6 py-20 pt-32">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: 3D Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="relative"
                    >
                        <WireframeContainer />
                    </motion.div>

                    {/* Right: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-8xl font-bold text-[#E0E0E0] font-['Inter',sans-serif] leading-tight">
                                NEXUS:
                                <br />
                                <span className="text-[#00FF94]">THE FIELD NINE</span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-[#888888] font-light font-['Inter',sans-serif] leading-relaxed">
                                Defining the beginning of assets at the end of logistics.
                            </p>
                        </div>

                        <div className="space-y-6 pt-4">
                            <Link href="/nexus">
                                <button className="nexus-terminal-btn nexus-glow-green">
                                    [ ACCESS SYSTEM ]
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

