'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
    return (
        <main className="relative h-screen w-full overflow-hidden bg-black">
            {/* BACKGROUND VIDEO LAYER */}
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
                {/* Heavy dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>

            {/* CONTENT LAYER */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="relative z-10 flex h-full flex-col items-center justify-center px-4"
            >
                {/* MASSIVE HEADLINE */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <h1 className="font-['Inter',sans-serif] text-7xl md:text-[12rem] font-extrabold tracking-tighter text-white opacity-95 mb-4">
                        PROCESSING
                    </h1>
                    <h1 className="font-['Inter',sans-serif] text-7xl md:text-[12rem] font-extrabold tracking-tighter text-white opacity-95">
                        REALITY.
                    </h1>
                </motion.div>

                {/* SUB-HEADLINE */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-2xl md:text-3xl text-white/70 font-light tracking-wide font-['Inter',sans-serif] mb-20"
                >
                    Field Nine: The Physical AI Computing Infrastructure
                </motion.p>
            </motion.div>

            {/* STATS TICKER (Bottom) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-0 right-0 z-10"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-center gap-8 text-white/60 font-['JetBrains_Mono',monospace] text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-white/40">AUM:</span>
                            <span className="text-[#00FF94]">₩54T</span>
                        </div>
                        <div className="w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-2">
                            <span className="text-white/40">NODES:</span>
                            <span className="text-[#00FF94]">5,021</span>
                        </div>
                        <div className="w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-2">
                            <span className="text-white/40">KAUS:</span>
                            <span className="text-[#00FF94]">$1.00</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
