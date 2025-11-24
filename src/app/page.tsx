'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { fetchInventoryStatus, getMarketAnalysis, fetchSecurityLogs } from '@/app/actions/nexus-core';

// Generative UI Components
function HolographicGrid({ data }: { data: any[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl mx-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.slice(0, 6).map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 backdrop-blur-sm"
                    >
                        <div className="text-[#00FF94] font-['JetBrains_Mono',monospace] text-xs mb-2">
                            {item.id}
                        </div>
                        <div className="text-white/90 font-['Inter',sans-serif] font-light text-sm mb-1">
                            {item.name}
                        </div>
                        <div className="text-white/50 font-['JetBrains_Mono',monospace] text-xs">
                            {item.quantity} units | {item.zone} | {item.temperature}°C
                        </div>
                        <div className={`mt-2 text-xs font-['JetBrains_Mono',monospace] ${
                            item.status === 'Good' ? 'text-[#00FF94]' : 
                            item.status === 'Warning' ? 'text-yellow-500' : 'text-[#FF2E2E]'
                        }`}>
                            {item.status}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function AssetTickerChart({ market, analysis }: { market: any; analysis: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-8 backdrop-blur-sm">
                <div className="mb-6">
                    <div className="text-white/50 font-['JetBrains_Mono',monospace] text-xs mb-2">
                        KAUS ASSET VALUE
                    </div>
                    <div className="text-[#00FF94] font-['JetBrains_Mono',monospace] text-4xl mb-1">
                        ${market.currentPrice.toFixed(4)} USD
                    </div>
                    <div className={`font-['JetBrains_Mono',monospace] text-sm ${
                        market.change24h > 0 ? 'text-[#00FF94]' : 'text-[#FF2E2E]'
                    }`}>
                        {market.change24h > 0 ? '+' : ''}{market.change24h.toFixed(2)}% (24h)
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <div className="text-white/50 font-['JetBrains_Mono',monospace] text-xs mb-1">Volume</div>
                        <div className="text-white/90 font-['JetBrains_Mono',monospace] text-sm">
                            {(market.volume24h / 1e9).toFixed(2)}B
                        </div>
                    </div>
                    <div>
                        <div className="text-white/50 font-['JetBrains_Mono',monospace] text-xs mb-1">Market Cap</div>
                        <div className="text-white/90 font-['JetBrains_Mono',monospace] text-sm">
                            ₩{(market.marketCap / 1e12).toFixed(1)}T
                        </div>
                    </div>
                    <div>
                        <div className="text-white/50 font-['JetBrains_Mono',monospace] text-xs mb-1">Trend</div>
                        <div className={`font-['JetBrains_Mono',monospace] text-sm ${
                            analysis.trend === 'Bullish' ? 'text-[#00FF94]' : 
                            analysis.trend === 'Bearish' ? 'text-[#FF2E2E]' : 'text-white/70'
                        }`}>
                            {analysis.trend}
                        </div>
                    </div>
                    <div>
                        <div className="text-white/50 font-['JetBrains_Mono',monospace] text-xs mb-1">Confidence</div>
                        <div className="text-white/90 font-['JetBrains_Mono',monospace] text-sm">
                            {analysis.confidence}%
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function RadarScan({ logs }: { logs: any[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-8 backdrop-blur-sm">
                <div className="text-white/50 font-['JetBrains_Mono',monospace] text-xs mb-6">
                    SECURITY SCAN RESULTS
                </div>
                <div className="space-y-3">
                    {logs.slice(0, 5).map((log, index) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-3 bg-white/5 rounded border border-white/5"
                        >
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                                log.status === 'Clear' ? 'bg-[#00FF94]' : 
                                log.status === 'Alert' ? 'bg-[#FF2E2E]' : 'bg-yellow-500'
                            }`} />
                            <div className="flex-1">
                                <div className="text-white/90 font-['Inter',sans-serif] font-light text-sm mb-1">
                                    {log.type} - {log.location}
                                </div>
                                <div className="text-white/50 font-['JetBrains_Mono',monospace] text-xs">
                                    {log.description}
                                </div>
                                <div className="text-white/30 font-['JetBrains_Mono',monospace] text-xs mt-1">
                                    {new Date(log.timestamp).toLocaleString()}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function HomePage() {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<{
        type: 'inventory' | 'market' | 'security' | 'text';
        data?: any;
        text?: string;
    } | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const query = input.trim().toLowerCase();
        setIsLoading(true);
        setResponse(null);

        try {
            if (query.includes('inventory') || query.includes('stock') || query.includes('재고')) {
                const inventory = await fetchInventoryStatus();
                setResponse({ type: 'inventory', data: inventory });
            } else if (query.includes('value') || query.includes('price') || query.includes('market') || query.includes('kaus') || query.includes('가격') || query.includes('시세')) {
                const { market, analysis } = await getMarketAnalysis();
                setResponse({ type: 'market', data: { market, analysis } });
            } else if (query.includes('security') || query.includes('scan') || query.includes('보안')) {
                const logs = await fetchSecurityLogs(5);
                setResponse({ type: 'security', data: logs });
            } else {
                setResponse({
                    type: 'text',
                    text: `Processing: "${input}"\n\nAccessing NEXUS nodes...\n\nPhysical AI Computing. The Operating System for Reality.\n\nTry: "Inventory Status", "KAUS Value", or "Security Scan"`,
                });
            }
        } catch (error) {
            setResponse({
                type: 'text',
                text: 'Error: System connection failed. Retrying...',
            });
        } finally {
            setIsLoading(false);
            setInput('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-[#030303] relative overflow-hidden">
            {/* Slow Pulse Animation - Center */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(0, 255, 148, 0.03) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Main Content */}
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10">
                <AnimatePresence mode="wait">
                    {!response && !isLoading ? (
                        // Initial State: Only Input Bar
                        <motion.div
                            key="input-only"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="w-full max-w-2xl"
                        >
                            <div
                                className={`relative h-16 bg-white/5 backdrop-blur-2xl border rounded-2xl transition-all duration-300 ${
                                    isFocused
                                        ? 'border-[#00FF94]/50 shadow-[0_0_50px_-10px_rgba(0,255,148,0.2)]'
                                        : 'border-white/10'
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
                                    placeholder="Enter command..."
                                    className="w-full h-full px-6 pr-16 bg-transparent text-white placeholder-white/30 font-['Inter',sans-serif] font-light text-base focus:outline-none"
                                />
                                <motion.button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Send
                                        className={`w-5 h-5 transition-colors ${
                                            input.trim() ? 'text-[#00FF94]' : 'text-white/30'
                                        }`}
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        // Response State: Input at bottom, Response in center
                        <motion.div
                            key="response-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full max-w-6xl mx-auto flex flex-col h-[calc(100vh-120px)]"
                        >
                            {/* Response Area */}
                            <div className="flex-1 flex items-center justify-center mb-8">
                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-white/50 font-['JetBrains_Mono',monospace] text-sm"
                                        >
                                            Rendering data...
                                        </motion.div>
                                    ) : response?.type === 'inventory' ? (
                                        <HolographicGrid key="inventory" data={response.data} />
                                    ) : response?.type === 'market' ? (
                                        <AssetTickerChart key="market" market={response.data.market} analysis={response.data.analysis} />
                                    ) : response?.type === 'security' ? (
                                        <RadarScan key="security" logs={response.data} />
                                    ) : response?.text ? (
                                        <motion.div
                                            key="text"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="w-full max-w-3xl text-white/70 font-['Inter',sans-serif] font-light text-base leading-relaxed whitespace-pre-wrap"
                                        >
                                            {response.text}
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </div>

                            {/* Input Bar at Bottom */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full max-w-2xl mx-auto"
                            >
                                <div
                                    className={`relative h-16 bg-white/5 backdrop-blur-2xl border rounded-2xl transition-all duration-300 ${
                                        isFocused
                                            ? 'border-[#00FF94]/50 shadow-[0_0_50px_-10px_rgba(0,255,148,0.2)]'
                                            : 'border-white/10'
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
                                        placeholder="Enter command..."
                                        className="w-full h-full px-6 pr-16 bg-transparent text-white placeholder-white/30 font-['Inter',sans-serif] font-light text-base focus:outline-none"
                                    />
                                    <motion.button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Send
                                            className={`w-5 h-5 transition-colors ${
                                                input.trim() ? 'text-[#00FF94]' : 'text-white/30'
                                            }`}
                                        />
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Tagline - Bottom Right (Subtle) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="fixed bottom-8 right-8 text-white/20 font-['Inter',sans-serif] font-light text-xs tracking-wider"
            >
                Physical AI Computing. The Operating System for Reality.
            </motion.div>
        </div>
    );
}
