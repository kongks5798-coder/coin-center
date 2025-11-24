'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { useScroll } from 'framer-motion';
import { Scene } from '@/components/Scene/Scene';
import { KineticText } from '@/components/KineticText';
import { GrainOverlay } from '@/components/GrainOverlay';

export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

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

        // Update scroll progress
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrollProgress(latest);
        });

        return () => {
            lenis.destroy();
            unsubscribe();
        };
    }, [scrollYProgress]);

    return (
        <div ref={containerRef} className="relative h-screen overflow-y-auto bg-black">
            {/* WebGL Background */}
            <div className="fixed inset-0 z-0">
                <Scene scrollProgress={scrollProgress} />
            </div>

            {/* Grain Overlay */}
            <GrainOverlay />

            {/* Scrollable Content */}
            <main className="relative z-10">
                {/* Section 1: Hero - Kinetic Text */}
                <section className="relative flex min-h-screen items-center justify-center px-4">
                    <div className="max-w-[95vw]">
                        <KineticText className="font-['Inter',sans-serif] text-[15vw] font-extrabold leading-[0.9] tracking-tighter text-white">
                            FIELD
                        </KineticText>
                        <KineticText className="font-['Inter',sans-serif] text-[15vw] font-extrabold leading-[0.9] tracking-tighter text-white">
                            NINE
                        </KineticText>
                        <p className="mt-8 text-xl text-white/60 font-light tracking-wide">
                            Physical AI Computing Infrastructure
                        </p>
                    </div>
                </section>

                {/* Section 2: Data Grid */}
                <section className="relative min-h-screen flex items-center justify-center px-4 py-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        <DataCard label="Facility" value="5,000" unit="평" />
                        <DataCard label="Latency" value="0.1" unit="ms" />
                        <DataCard label="Nodes" value="5,021" unit="Active" />
                        <DataCard label="AUM" value="₩54" unit="조" />
                    </div>
                </section>

                {/* Section 3: The Story */}
                <section className="relative min-h-screen flex items-center justify-center px-4 py-32">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <h2 className="font-['Inter',sans-serif] text-6xl md:text-8xl font-bold text-white mb-8">
                            From Atom
                            <br />
                            to Bit
                        </h2>
                        <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                            <p>
                                FIELD NINE는 5,000평 자동화 물류 허브와 KAUS 프로토콜을 결합해
                                실물 자산을 DePIN·RWA로 전환하는 Physical AI Computing Infrastructure입니다.
                            </p>
                            <p>
                                물류 센터의 모든 움직임은 이벤트 스트림으로 기록되고, AI에 의해 평가된 뒤
                                KAUS 자산 구조로 전환됩니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Spacer for scroll effect */}
                <div className="h-[200vh]" />
            </main>
        </div>
    );
}

function DataCard({ label, value, unit }: { label: string; value: string; unit: string }) {
    return (
        <div className="text-center">
            <div className="text-5xl md:text-7xl font-bold text-white mb-2 font-['Inter',sans-serif]">
                {value}
            </div>
            <div className="text-sm text-white/60 uppercase tracking-wider mb-1">
                {label}
            </div>
            <div className="text-xs text-white/40">
                {unit}
            </div>
        </div>
    );
}
