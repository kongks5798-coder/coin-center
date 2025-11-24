'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Minimize2, Maximize2, Bot, User } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function KAUSAIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: '안녕하세요. 저는 KAUS AI입니다. Cursor AI와 Google Gemini 최신 버전을 상위호환하는 AI 어시스턴트입니다. 무엇을 도와드릴까요?',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

        // TODO: 실제 AI API 연결
        // 현재는 시뮬레이션 응답
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
        // 간단한 응답 생성 (실제로는 API 호출)
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('안녕') || lowerInput.includes('hello')) {
            return '안녕하세요! KAUS AI입니다. FIELD NINE의 디지털 물류 시스템, NEXUS OS, KAUS Coin, 또는 기타 기술에 대해 질문해주세요.';
        }
        
        if (lowerInput.includes('nexus') || lowerInput.includes('넥서스')) {
            return 'NEXUS OS는 FIELD NINE의 AI 기반 물류 자동화 시스템입니다. 250개국 글로벌 네트워크로 전 세계를 연결하는 차세대 물류 플랫폼입니다. 1.25M대 드론과 99.999% 안전률을 자랑합니다.';
        }
        
        if (lowerInput.includes('kaus') && lowerInput.includes('coin')) {
            return 'KAUS Coin은 USD 페깅 스테이블코인으로, RFID 추적과 블록체인 기술을 결합한 미래 금융 시스템입니다. 현재 124B 거래량, 50M 사용자, 250개국 네트워크를 보유하고 있습니다.';
        }
        
        if (lowerInput.includes('기능') || lowerInput.includes('능력')) {
            return 'KAUS AI는 다음과 같은 기능을 제공합니다:\n\n• 코드 생성 및 리뷰\n• 자연어 질의응답\n• 문서 분석 및 요약\n• 실시간 데이터 분석\n• 다국어 지원\n• 컨텍스트 이해\n• 창의적 문제 해결\n\nCursor AI와 Google Gemini 최신 버전을 상위호환하는 성능을 제공합니다.';
        }
        
        return `"${userInput}"에 대한 답변을 준비 중입니다. KAUS AI는 FIELD NINE의 모든 시스템과 통합되어 있어 실시간 데이터 분석, 코드 생성, 문서 요약 등 다양한 작업을 수행할 수 있습니다. 더 구체적인 질문을 해주시면 더 정확한 답변을 드릴 수 있습니다.`;
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) {
        return (
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#00FF94] to-[#00C2FF] flex items-center justify-center nexus-glow-green shadow-lg"
            >
                <Bot className="w-8 h-8 text-[#050505]" />
            </motion.button>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    height: isMinimized ? 'auto' : '600px',
                }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className={`fixed bottom-6 right-6 z-50 w-96 ${isMinimized ? 'h-auto' : 'h-[600px]'} flex flex-col nexus-glass rounded-lg border border-white/10 overflow-hidden shadow-2xl`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#111111]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF94] to-[#00C2FF] flex items-center justify-center">
                            <Bot className="w-5 h-5 text-[#050505]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-[#E0E0E0] font-['Inter',sans-serif]">
                                KAUS AI
                            </h3>
                            <p className="text-xs text-[#888888] font-['JetBrains_Mono',monospace]">
                                Cursor AI + Gemini 상위호환
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="p-1.5 rounded hover:bg-white/5 transition-colors"
                        >
                            {isMinimized ? (
                                <Maximize2 className="w-4 h-4 text-[#888888]" />
                            ) : (
                                <Minimize2 className="w-4 h-4 text-[#888888]" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded hover:bg-white/5 transition-colors"
                        >
                            <X className="w-4 h-4 text-[#888888]" />
                        </button>
                    </div>
                </div>

                {!isMinimized && (
                    <>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]">
                            <AnimatePresence>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF94] to-[#00C2FF] flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-4 h-4 text-[#050505]" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[80%] rounded-lg p-3 ${
                                                message.role === 'user'
                                                    ? 'bg-[#00FF94]/20 text-[#E0E0E0] border border-[#00FF94]/30'
                                                    : 'bg-[#111111] text-[#E0E0E0] border border-white/10'
                                            }`}
                                        >
                                            <p className="text-sm font-['Inter',sans-serif] whitespace-pre-wrap leading-relaxed">
                                                {message.content}
                                            </p>
                                            <p className="text-xs text-[#888888] mt-2 font-['JetBrains_Mono',monospace]">
                                                {message.timestamp.toLocaleTimeString('ko-KR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                        {message.role === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-[#00C2FF]/20 flex items-center justify-center flex-shrink-0 border border-[#00C2FF]/30">
                                                <User className="w-4 h-4 text-[#00C2FF]" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF94] to-[#00C2FF] flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-[#050505]" />
                                    </div>
                                    <div className="bg-[#111111] border border-white/10 rounded-lg p-3">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-[#111111]">
                            <div className="flex gap-2">
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
                                    className="flex-1 min-h-[60px] max-h-[120px] px-4 py-3 bg-[#050505] border border-white/10 rounded-lg text-[#E0E0E0] placeholder-[#888888] font-['Inter',sans-serif] text-sm resize-none focus:outline-none focus:border-[#00FF94]/50 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="px-4 py-3 bg-gradient-to-br from-[#00FF94] to-[#00C2FF] text-[#050505] rounded-lg font-bold font-['Inter',sans-serif] hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity nexus-glow-green"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-xs text-[#888888] mt-2 font-['JetBrains_Mono',monospace]">
                                KAUS AI v1.0 | Cursor AI + Gemini 상위호환
                            </p>
                        </div>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

