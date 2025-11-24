'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { fetchInventoryStatus, getMarketAnalysis, fetchSecurityLogs } from '@/app/actions/nexus-core';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function NexusAdmin() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Administrator Online. Awaiting database query.',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const query = userMessage.content.toLowerCase();
            let response = '';

            if (query.includes('inventory') || query.includes('재고') || query.includes('물량') || query.includes('어디')) {
                const inventory = await fetchInventoryStatus();
                const items = inventory.slice(0, 5);
                response = `Database Query: Inventory Status\n\n${items.map(item => 
                    `• ${item.name}: ${item.quantity} units | Zone ${item.zone} | ${item.temperature}°C | Status: ${item.status}`
                ).join('\n')}\n\nTotal Items: ${inventory.length}`;
            } else if (query.includes('market') || query.includes('kaus') || query.includes('가격') || query.includes('시세')) {
                const { market, analysis } = await getMarketAnalysis();
                response = `Database Query: Market Data\n\nKAUS Price: $${market.currentPrice.toFixed(4)} USD (₩${market.priceKRW.toFixed(2)})\n24h Change: ${market.change24h > 0 ? '+' : ''}${market.change24h.toFixed(2)}%\nVolume: ${(market.volume24h / 1e9).toFixed(2)}B KAUS\nMarket Cap: ₩${(market.marketCap / 1e12).toFixed(1)}T\nTrend: ${analysis.trend} (${analysis.confidence}% confidence)`;
            } else if (query.includes('security') || query.includes('log') || query.includes('보안') || query.includes('입고') || query.includes('시간')) {
                const logs = await fetchSecurityLogs(5);
                response = `Database Query: Security Logs\n\n${logs.map(log => 
                    `• ${log.type} - ${log.location}\n  Status: ${log.status}\n  ${log.description}\n  Time: ${new Date(log.timestamp).toLocaleString()}`
                ).join('\n\n')}`;
            } else {
                response = `Processing: "${userMessage.content}"\n\nDatabase query executed. Accessing NEXUS nodes...\n\nAvailable queries:\n• Inventory Status\n• Market Data\n• Security Logs\n• Entry Records`;
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Error: Database connection failed. Retrying...',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Collapsed Button */}
            {!isOpen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg hover:border-white/30 transition-all"
                >
                    <motion.div
                        className="w-2 h-2 rounded-full bg-[#00FF94]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <span className="text-white/90 font-['JetBrains_Mono',monospace] text-sm font-medium">
                        NEXUS ADMIN
                    </span>
                </motion.button>
            )}

            {/* Expanded Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed top-6 right-6 z-50 w-[400px] h-[600px] bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <div>
                                <div className="text-white/90 font-['JetBrains_Mono',monospace] text-xs font-medium mb-1">
                                    ADMINISTRATIVE CONSOLE v2.5
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
                                    <span className="text-white/50 font-['JetBrains_Mono',monospace] text-xs">
                                        System Online
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                            >
                                <X className="w-4 h-4 text-white/70" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`${
                                        message.role === 'user'
                                            ? 'text-right'
                                            : 'text-left'
                                    }`}
                                >
                                    <div
                                        className={`inline-block max-w-[85%] rounded-lg p-3 ${
                                            message.role === 'user'
                                                ? 'bg-[#00FF94]/20 text-white/90 border border-[#00FF94]/30'
                                                : 'bg-white/5 text-white/70 border border-white/10'
                                        }`}
                                    >
                                        <div className="font-['JetBrains_Mono',monospace] text-xs whitespace-pre-wrap leading-relaxed">
                                            {message.content}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="text-left">
                                    <div className="inline-block bg-white/5 border border-white/10 rounded-lg p-3">
                                        <div className="flex items-center gap-2 text-white/50 font-['JetBrains_Mono',monospace] text-xs">
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                            Querying database...
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter database query..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white/90 placeholder-white/30 font-['JetBrains_Mono',monospace] text-xs focus:outline-none focus:border-[#00FF94]/50 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="p-2 bg-[#00FF94]/20 hover:bg-[#00FF94]/30 border border-[#00FF94]/30 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send className="w-4 h-4 text-[#00FF94]" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

