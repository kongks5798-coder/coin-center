'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Send } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function KAUSAIChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showInitialState, setShowInitialState] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Breathing glow animation values
    const scale = useSpring(1, { stiffness: 50, damping: 15 });
    const opacity = useMotionValue(0.3);

    useEffect(() => {
        // Breathing animation loop
        const interval = setInterval(() => {
            scale.set(1.15);
            opacity.set(0.5);
            setTimeout(() => {
                scale.set(1);
                opacity.set(0.3);
            }, 2000);
        }, 4000);

        return () => clearInterval(interval);
    }, [scale, opacity]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        if (showInitialState) {
            setShowInitialState(false);
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // TODO: 실제 AI API 연결
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateResponse(userMessage.content),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1000);
    };

    const generateResponse = (userInput: string): string => {
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('안녕') || lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return 'System Ready.';
        }
        
        if (lowerInput.includes('nexus') || lowerInput.includes('넥서스')) {
            return 'NEXUS OS Status:\n\nOperational across 250 countries.\n1.25M autonomous drones active.\nSafety rate: 99.999%\nAI prediction accuracy: 94.7%\n\nPowered by quantum computing and neural AI. Real-time conversion of physical assets to digital twins. Fully integrated with 5,000-pyeong logistics hub.\n\nAll processes automated: inventory tracking to delivery optimization.';
        }
        
        if (lowerInput.includes('kaus') && (lowerInput.includes('coin') || lowerInput.includes('코인'))) {
            return 'KAUS Coin Market Data:\n\nPrice: $1.00 USD (1:1 USD pegged)\n24h Change: +2.4%\nVolume: 124B KAUS\nActive Users: 50M+\nNetwork: 250 countries\nTotal AUM: ₩54T\nGas Fee: 12 Gwei\n\nTechnical:\nQuantum blockchain infrastructure. Real-time RFID tracking. 10B+ verified transactions. Zero security incidents. 99.99% uptime. Average transaction speed: 0.001s.\n\nCore Value: Instant liquidity of physical inventory. Fully integrated with FIELD NINE logistics hub. Inventory becomes blockchain assets.';
        }
        
        if (lowerInput.includes('기능') || lowerInput.includes('능력') || lowerInput.includes('뭐') || lowerInput.includes('what') || lowerInput.includes('할수')) {
            return 'KAUS AI Capabilities:\n\n• Code generation and review\n• Natural language processing\n• Real-time data analysis (NEXUS OS integrated)\n• Multi-language support (50+ languages)\n• Technical document analysis\n• Logistics optimization predictions\n• Blockchain transaction verification\n\nSpecialized in FIELD NINE logistics ecosystem. Real-time access to all systems: NEXUS OS, KAUS Coin, satellite networks.';
        }
        
        if (lowerInput.includes('가격') || lowerInput.includes('price') || lowerInput.includes('시세')) {
            return 'KAUS Coin: $1.00 USD\n24h: +2.4%\nVolume: 124B KAUS\nMarket Cap: ₩54T\nGas: 12 Gwei\nActive Nodes: 5,000\n\nPegged 1:1 with USD. Backed by FIELD NINE logistics assets. 5,000-pyeong hub + global inventory as collateral. Auto-adjustment maintains $1.00.\n\nQuantum blockchain security. Zero incidents. 250-country network enables instant trading.\n\nUptrend continues. Usage expanding with global network growth.';
        }
        
        if (lowerInput.includes('투자') || lowerInput.includes('invest') || lowerInput.includes('구매') || lowerInput.includes('사고')) {
            return 'KAUS Coin Investment:\n\nStability: USD 1:1 peg. Logistics assets as collateral minimize downside risk. Quantum blockchain makes hacking virtually impossible. Zero security incidents.\n\nGrowth: Expanding to 250 countries. 50M+ active users. Monthly volume growth 15%+. Direct integration with FIELD NINE logistics network.\n\nLiquidity: Instant inventory asset liquidation. Real-time trading across 250 countries. Average speed: 0.001s. DeFi protocol integration enables additional yield.\n\nTransparency: All transactions on-chain. Real-time AUM public (₩54T). Regular audits and reports. Full traceability.\n\nAcquisition:\n• Official exchanges\n• FIELD NINE product purchases (auto-credit)\n• Logistics service rewards\n• DeFi staking yields\n\nAs FIELD NINE logistics network expands, KAUS Coin usage and value increase. Monthly volume growth 15%+. Continued growth expected.';
        }
        
        if (lowerInput.includes('최종 링크') || lowerInput.includes('final link')) {
            return 'FIELD NINE: https://www.fieldnine.io';
        }
        
        return `Processing: "${userInput}"\n\nConnected to all FIELD NINE systems in real-time. Providing responses based on latest data.\n\nFor detailed information, ask about:\n• NEXUS OS logistics data\n• KAUS Coin market information\n• Blockchain transactions\n• Technical specifications`;
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] relative overflow-hidden nexus-grid-bg">
            {/* Aurora Background Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(0, 255, 148, 0.15) 0%, rgba(0, 194, 255, 0.1) 30%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            {/* Scanline overlay */}
            <div className="nexus-scanline" />

            {/* Main Container */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
                {/* Breathing Glow Core - Center */}
                {showInitialState && (
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
                        style={{
                            scale,
                            opacity,
                        }}
                    >
                        <div
                            className="w-full h-full rounded-full blur-3xl"
                            style={{
                                background: 'radial-gradient(circle, rgba(0, 255, 148, 0.4) 0%, rgba(0, 194, 255, 0.3) 50%, transparent 70%)',
                            }}
                        />
                    </motion.div>
                )}

                {/* Initial System Status */}
                {showInitialState && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-center space-y-4 mb-32"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="font-['JetBrains_Mono',monospace] text-[#00FF94] text-sm tracking-widest"
                        >
                            NEXUS OS v2.0 Operational.
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                            className="font-['JetBrains_Mono',monospace] text-[#888888] text-xs tracking-widest"
                        >
                            Accessing Field Nine Logistics Data...
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 2 }}
                            className="font-['JetBrains_Mono',monospace] text-[#00C2FF] text-sm tracking-widest"
                        >
                            System Ready.
                        </motion.div>
                    </motion.div>
                )}

                {/* Messages Area - Minimalist */}
                {!showInitialState && (
                    <div className="flex-1 w-full max-w-4xl mx-auto mb-32 overflow-y-auto space-y-8 px-4">
                        <AnimatePresence>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] ${
                                            message.role === 'user'
                                                ? 'text-[#00C2FF] font-["JetBrains_Mono",monospace] text-sm'
                                                : 'text-[#E0E0E0] font-["Inter",sans-serif] font-light text-base leading-relaxed'
                                        }`}
                                    >
                                        <div
                                            className="whitespace-pre-wrap"
                                            dangerouslySetInnerHTML={{
                                                __html: message.content
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00FF94]">$1</strong>')
                                                    .replace(/https?:\/\/[^\s]+/g, '<a href="$&" target="_blank" rel="noopener noreferrer" class="text-[#00C2FF] hover:text-[#00FF94] underline transition-colors">$&</a>')
                                                    .replace(/fieldnine\.io/gi, '<a href="https://www.fieldnine.io" target="_blank" rel="noopener noreferrer" class="text-[#00C2FF] hover:text-[#00FF94] underline transition-colors font-medium">fieldnine.io</a>')
                                                    .replace(/www\.fieldnine\.io/gi, '<a href="https://www.fieldnine.io" target="_blank" rel="noopener noreferrer" class="text-[#00C2FF] hover:text-[#00FF94] underline transition-colors font-medium">www.fieldnine.io</a>')
                                                    .replace(/\n/g, '<br />')
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="text-[#888888] font-['JetBrains_Mono',monospace] text-sm">
                                    <span className="inline-block w-2 h-2 bg-[#00FF94] rounded-full animate-pulse mr-2" />
                                    Processing...
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}

                {/* Floating Command Bar - MacOS Spotlight Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: showInitialState ? 2.5 : 0 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-20"
                >
                    <div className="relative">
                        <motion.div
                            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-4 focus-within:border-[#00FF94]/50 focus-within:bg-white/8 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-4">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter Command..."
                                    className="flex-1 bg-transparent text-[#E0E0E0] placeholder-[#888888] font-['Inter',sans-serif] text-base focus:outline-none font-light"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="p-2 rounded-full bg-[#00FF94]/20 hover:bg-[#00FF94]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send className="w-4 h-4 text-[#00FF94]" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Final Link - Subtle */}
                        <div className="text-center mt-4">
                            <a
                                href="https://www.fieldnine.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs text-[#888888] hover:text-[#00FF94] font-['JetBrains_Mono',monospace] transition-colors"
                            >
                                <span>fieldnine.io</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
