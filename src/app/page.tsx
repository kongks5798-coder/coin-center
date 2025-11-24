'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';
import { Scene } from '@/components/Scene/Scene';
import { GrainOverlay } from '@/components/GrainOverlay';

export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-screen overflow-y-auto bg-[#050505]">
            {/* WebGL Background */}
            <div className="fixed inset-0 z-0">
                <Scene />
            </div>

            {/* Grain Overlay */}
            <GrainOverlay />

            {/* Hero Typography Overlay */}
            <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-inter text-8xl md:text-[12rem] font-light tracking-tight text-white/80 uppercase"
                >
                    FIELD NINE
                </motion.h1>
            </div>

            {/* Scrollable Content */}
            <main className="relative z-20 pt-[100vh]">
                {/* Section 2: Data Grid */}
                <section className="relative min-h-screen flex items-center justify-center px-4 py-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
                        <DataCard label="Facility" value="5,000" unit="평" index={0} />
                        <DataCard label="Latency" value="0.1" unit="ms" index={1} />
                        <DataCard label="Nodes" value="5,021" unit="Active" index={2} />
                        <DataCard label="AUM" value="₩54" unit="조" index={3} />
                    </div>
                </section>

                {/* Section 3: The Story */}
                <section className="relative min-h-screen flex items-center justify-center px-4 py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto space-y-12"
                    >
                        <h2 className="font-inter text-6xl md:text-8xl font-light text-white/90 mb-8 tracking-tight leading-tight">
                            From Atom
                            <br />
                            to Bit
                        </h2>
                        <div className="space-y-8 text-lg text-white/60 leading-relaxed font-light">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                FIELD NINE는 5,000평 자동화 물류 허브와 KAUS 프로토콜을 결합해
                                실물 자산을 DePIN·RWA로 전환하는 Physical AI Computing Infrastructure입니다.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                물류 센터의 모든 움직임은 이벤트 스트림으로 기록되고, AI에 의해 평가된 뒤
                                KAUS 자산 구조로 전환됩니다.
                            </motion.p>
                        </div>
                    </motion.div>
                </section>

                {/* Spacer for scroll effect */}
                <div className="h-[50vh]" />
            </main>
        </div>
    );
}

function DataCard({ label, value, unit, index }: { label: string; value: string; unit: string; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-8 text-center hover:bg-white/10 hover:border-[#00FF94]/50 transition-all duration-300"
        >
            <div className="font-mono text-5xl md:text-7xl font-medium text-white/90 mb-3">
                {value}
            </div>
            <div className="text-sm text-white/50 uppercase tracking-wider mb-2 font-inter">
                {label}
            </div>
            <div className="text-xs text-white/30 font-inter">
                {unit}
            </div>
        </motion.div>
    );
}
