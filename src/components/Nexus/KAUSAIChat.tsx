'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function KAUSAIChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: '안녕하세요. KAUS AI입니다.\n\nFIELD NINE의 디지털 물류 인프라를 실시간으로 모니터링하고 있습니다. NEXUS OS, KAUS Coin, 위성 네트워크, 블록체인 추적 시스템에 대한 모든 질문에 답변할 수 있습니다.\n\n무엇을 도와드릴까요?',
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

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

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
            return '안녕하세요. KAUS AI입니다.\n\nFIELD NINE의 디지털 물류 인프라를 실시간으로 모니터링하고 있습니다. NEXUS OS, KAUS Coin, 위성 네트워크, 블록체인 추적 시스템에 대한 모든 질문에 답변할 수 있습니다.\n\n무엇을 도와드릴까요?';
        }
        
        if (lowerInput.includes('nexus') || lowerInput.includes('넥서스')) {
            return 'NEXUS OS는 FIELD NINE의 물류 자동화 플랫폼입니다.\n\n현재 250개국에서 운영 중이며, 1.25M대의 자율비행 드론이 실시간으로 네트워크를 구성하고 있습니다. 안전률은 99.999%를 기록하고 있으며, AI 예측 정확도는 94.7%입니다.\n\n양자 컴퓨팅과 뉴럴 AI로 구동되는 이 시스템은 물리적 자산을 디지털 트윈으로 실시간 변환합니다. 5,000평 규모의 물류 허브와 완전히 통합되어 있어, 재고 추적부터 배송 최적화까지 모든 프로세스가 자동화됩니다.\n\n구체적으로 어떤 부분이 궁금하신가요?';
        }
        
        if (lowerInput.includes('kaus') && (lowerInput.includes('coin') || lowerInput.includes('코인'))) {
            return 'KAUS Coin은 물류 자산을 디지털로 변환하는 스테이블코인입니다.\n\n현재 시장 상황:\n• 가격: $1.00 USD (USD 1:1 페깅)\n• 24시간 변동: +2.4%\n• 거래량: 124B KAUS\n• 활성 사용자: 50M+\n• 네트워크: 250개국\n• 총 자산 가치: ₩54조\n• 가스 수수료: 12 Gwei\n\n기술적 특징:\n양자 블록체인 기반으로 구축되어 있으며, RFID를 통한 실시간 추적이 가능합니다. 지금까지 100억 건 이상의 거래가 검증되었고, 보안 사고는 단 한 건도 발생하지 않았습니다. 시스템 가동률은 99.99%이며, 평균 거래 속도는 0.001초입니다.\n\nKAUS Coin의 핵심 가치는 물리적 재고를 즉시 유동화할 수 있다는 점입니다. FIELD NINE의 5,000평 물류 허브와 완전히 통합되어 있어, 재고가 곧 블록체인 자산이 됩니다. USD 1:1 페깅으로 가치가 보장되며, 250개국 네트워크를 통해 어디서나 거래할 수 있습니다.\n\n투자나 기술적 세부사항에 대해 더 알고 싶으시면 말씀해주세요.';
        }
        
        if (lowerInput.includes('기능') || lowerInput.includes('능력') || lowerInput.includes('뭐') || lowerInput.includes('what') || lowerInput.includes('할수')) {
            return 'KAUS AI는 FIELD NINE의 모든 시스템과 실시간으로 통신하는 엔터프라이즈급 AI입니다.\n\n주요 기능:\n• 코드 생성 및 리뷰\n• 자연어 처리 및 컨텍스트 이해\n• 실시간 데이터 분석 (NEXUS OS 통합)\n• 다국어 지원 (50+ 언어)\n• 기술 문서 분석\n• 물류 최적화 예측 분석\n• 블록체인 트랜잭션 검증\n\nFIELD NINE의 물류 생태계에 특화되어 있어, NEXUS OS, KAUS Coin, 위성 네트워크 등 모든 시스템의 실시간 데이터에 접근할 수 있습니다.\n\n어떤 작업을 도와드릴까요?';
        }
        
        if (lowerInput.includes('가격') || lowerInput.includes('price') || lowerInput.includes('시세')) {
            return 'KAUS Coin 현재 시세입니다.\n\n가격: $1.00 USD (USD 1:1 페깅)\n24시간 변동: +2.4%\n거래량: 124B KAUS\n시가총액: ₩54조\n가스 수수료: 12 Gwei\n활성 노드: 5,000개\n총 자산 가치: ₩54조\n\nKAUS Coin은 USD와 1:1로 페깅되어 있으며, FIELD NINE의 물류 자산을 담보로 합니다. 5,000평 물류 허브와 글로벌 재고가 담보 자산이며, 자동 조정 시스템으로 항상 $1.00을 유지합니다.\n\n양자 블록체인 기반으로 보안이 보장되며, 지금까지 보안 사고는 발생하지 않았습니다. 250개국 네트워크를 통해 즉시 거래가 가능합니다.\n\n현재 지속적인 상승세를 보이고 있으며, FIELD NINE의 글로벌 네트워크 확장과 함께 사용처가 증가하고 있습니다.\n\n투자나 거래에 대해 더 알고 싶으시면 질문해주세요.';
        }
        
        if (lowerInput.includes('투자') || lowerInput.includes('invest') || lowerInput.includes('구매') || lowerInput.includes('사고')) {
            return 'KAUS Coin 투자에 대해 설명드리겠습니다.\n\n안정성 측면에서, USD 1:1 페깅으로 가치가 보장되며 물류 자산이 담보로 설정되어 있어 하락 리스크가 최소화됩니다. 양자 블록체인 기반으로 해킹이 사실상 불가능하며, 지금까지 보안 사고는 발생하지 않았습니다.\n\n성장성 측면에서는, 250개국으로 확장 중인 글로벌 네트워크와 50M+ 활성 사용자, 그리고 월평균 15% 이상 증가하는 거래량을 보이고 있습니다. FIELD NINE의 물류 네트워크와 직접 연동되어 있어 사용처가 지속적으로 증가하고 있습니다.\n\n유동성 측면에서, 재고 자산을 즉시 유동화할 수 있으며 250개국에서 실시간 거래가 가능합니다. 평균 거래 속도는 0.001초이며, DeFi 프로토콜 통합으로 추가 수익 창출도 가능합니다.\n\n투명성 측면에서, 모든 거래가 블록체인에 기록되며 실시간 AUM이 공개됩니다 (현재 ₩54조). 정기적인 감사와 리포트가 제공되며, 모든 거래는 완벽하게 추적 가능합니다.\n\n투자 방법:\n• 공식 거래소에서 구매\n• FIELD NINE 제품 구매 시 자동 적립\n• 물류 서비스 이용 시 보상\n• DeFi 스테이킹으로 추가 수익\n\nFIELD NINE의 물류 네트워크가 확장될수록 KAUS Coin의 사용처와 가치가 증가합니다. 현재 월평균 15% 이상의 거래량 증가를 보이고 있으며, 지속적인 성장이 예상됩니다.\n\n투자 전략이나 구매 방법에 대해 더 자세히 알고 싶으시면 말씀해주세요.';
        }
        
        return `"${userInput}"에 대해 분석하고 있습니다.\n\nFIELD NINE의 모든 시스템과 실시간으로 통신하며, 최신 데이터를 기반으로 답변을 제공합니다.\n\nNEXUS OS 물류 데이터, KAUS Coin 시장 정보, 블록체인 트랜잭션, 또는 기술적 세부사항에 대해 더 구체적으로 질문해주시면 상세히 안내해드리겠습니다.`;
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 nexus-grid-bg">
            {/* Scanline overlay */}
            <div className="nexus-scanline" />
            
            {/* Main Chat Container - Gemini Style */}
            <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-120px)]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF94] to-[#00C2FF] flex items-center justify-center nexus-glow-green">
                            <Bot className="w-6 h-6 text-[#050505]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-light text-[#E0E0E0] font-['Inter',sans-serif] tracking-tight">
                            KAUS AI
                        </h1>
                    </div>
                    <p className="text-sm text-[#888888] font-['Inter',sans-serif]">
                        FIELD NINE의 엔터프라이즈급 AI 어시스턴트
                    </p>
                </motion.div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto mb-6 space-y-6 px-4">
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF94] to-[#00C2FF] flex items-center justify-center flex-shrink-0 nexus-glow-green">
                                        <Bot className="w-5 h-5 text-[#050505]" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[85%] rounded-2xl p-4 ${
                                        message.role === 'user'
                                            ? 'bg-[#00FF94]/10 text-[#E0E0E0] border border-[#00FF94]/20'
                                            : 'bg-[#111111] text-[#E0E0E0] border border-white/10 nexus-glass'
                                    }`}
                                >
                                    <div 
                                        className="text-base font-['Inter',sans-serif] whitespace-pre-wrap leading-relaxed prose prose-invert max-w-none"
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
                                {message.role === 'user' && (
                                    <div className="w-10 h-10 rounded-full bg-[#00C2FF]/20 flex items-center justify-center flex-shrink-0 border border-[#00C2FF]/30">
                                        <User className="w-5 h-5 text-[#00C2FF]" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF94] to-[#00C2FF] flex items-center justify-center nexus-glow-green">
                                <Bot className="w-5 h-5 text-[#050505]" />
                            </div>
                            <div className="bg-[#111111] border border-white/10 rounded-2xl p-4 nexus-glass">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Gemini Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-3xl mx-auto"
                >
                    <div className="relative">
                        <div className="nexus-glass rounded-2xl border border-white/10 p-4 focus-within:border-[#00FF94]/50 transition-colors">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                                }}
                                onKeyPress={handleKeyPress}
                                placeholder="KAUS AI에게 무엇이든 물어보세요..."
                                className="w-full min-h-[60px] max-h-[200px] px-4 py-3 bg-transparent text-[#E0E0E0] placeholder-[#888888] font-['Inter',sans-serif] text-base resize-none focus:outline-none leading-relaxed"
                                rows={1}
                            />
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#888888]" />
                                    <span className="text-xs text-[#888888] font-['JetBrains_Mono',monospace]">
                                        Enter로 전송, Shift+Enter로 줄바꿈
                                    </span>
                                </div>
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="px-6 py-2.5 bg-gradient-to-br from-[#00FF94] to-[#00C2FF] text-[#050505] rounded-xl font-medium font-['Inter',sans-serif] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity nexus-glow-green flex items-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>전송</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4 space-y-2">
                        <p className="text-xs text-[#888888] font-['JetBrains_Mono',monospace]">
                            KAUS AI v1.0 | FIELD NINE Enterprise AI
                        </p>
                        <a
                            href="https://www.fieldnine.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[#00FF94] hover:text-[#00C2FF] border border-[#00FF94]/30 hover:border-[#00C2FF]/50 rounded-lg transition-all nexus-glow-green"
                        >
                            <span>🌐</span>
                            <span>최종 링크: www.fieldnine.io</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
