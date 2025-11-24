'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim()) {
            // Handle command execution
            console.log('Command:', input);
            setInput('');
        }
    };

    return (
        <main className="relative h-screen w-full overflow-hidden bg-black">
            {/* BACKGROUND VIDEO LAYER */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
                >
                    <source src="/assets/hero-video.mp4" type="video/mp4" />
                    {/* Fallback gradient if video doesn't load */}
                </video>
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>

            {/* CONTENT LAYER */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="relative z-10 flex h-full flex-col items-center justify-center px-4"
            >
                {/* MASSIVE BRANDING (Center) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="text-center"
                >
                    <h1 className="font-['Inter',sans-serif] text-6xl md:text-9xl font-extrabold tracking-tighter text-white opacity-90">
                        FIELD NINE
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-4 text-xl text-white/70 font-light tracking-wide font-['Inter',sans-serif]"
                    >
                        PHYSICAL AI COMPUTING INFRASTRUCTURE
                    </motion.p>
                </motion.div>

                {/* THE "GEMINI" INPUT (Bottom Center) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-20 w-full max-w-2xl px-4"
                >
                    <div
                        className={`group relative flex items-center w-full border-b transition-all duration-300 ${
                            isFocused
                                ? 'border-white/80'
                                : 'border-white/30'
                        }`}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Command the Infrastructure..."
                            className="w-full bg-transparent p-2 text-xl text-white placeholder-white/50 outline-none text-center font-['JetBrains_Mono',monospace]"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isFocused || input.trim() ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ArrowRight className="ml-4 text-white/50" />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
