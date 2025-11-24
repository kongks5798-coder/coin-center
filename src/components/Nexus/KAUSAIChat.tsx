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
            content: '안녕하세요. 저는 KAUS AI입니다.\n\nCursor AI와 Google Gemini 최신 버전을 상위호환하는 엔터프라이즈급 AI 어시스턴트로, FIELD NINE의 디지털 물류 생태계를 완벽하게 이해하고 있습니다.\n\n• NEXUS OS 물류 자동화 시스템\n• KAUS Coin 블록체인 네트워크\n• 실시간 데이터 분석 및 예측\n• 코드 생성 및 리뷰\n• 다국어 지원 및 컨텍스트 이해\n\n어떤 도움이 필요하신가요?',
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
        
        if (lowerInput.includes('안녕') || lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return '안녕하세요. KAUS AI입니다.\n\nFIELD NINE의 디지털 물류 생태계를 완벽하게 이해하고 있는 엔터프라이즈급 AI 어시스턴트입니다. NEXUS OS, KAUS Coin, 위성 네트워크, 블록체인 추적 시스템 등 모든 영역에 대한 전문 지식을 보유하고 있습니다.\n\n어떤 도움이 필요하신가요?';
        }
        
        if (lowerInput.includes('nexus') || lowerInput.includes('넥서스')) {
            return 'NEXUS OS는 FIELD NINE의 핵심 물류 자동화 플랫폼입니다.\n\n📊 **핵심 지표**\n• 250개국 글로벌 네트워크\n• 1.25M대 자율비행 드론\n• 99.999% 안전률\n• 실시간 AI 예측 정확도 94.7%\n\nNEXUS OS는 양자 컴퓨팅과 뉴럴 AI로 구동되며, 물리적 자산을 디지털 트윈으로 실시간 변환합니다. 5,000평 규모의 물류 허브와 완벽하게 통합되어 있어, 재고 추적부터 배송 최적화까지 모든 프로세스를 자동화합니다.\n\n더 자세한 정보가 필요하시면 구체적으로 질문해주세요.';
        }
        
        if (lowerInput.includes('kaus') && (lowerInput.includes('coin') || lowerInput.includes('코인'))) {
            return 'KAUS Coin은 물류와 금융을 융합한 차세대 스테이블코인입니다.\n\n💰 **시장 지표 (실시간)**\n• 현재가: $1.00 USD (1:1 USD 페깅)\n• 24시간 변동률: +2.4%\n• 총 거래량: 124,000,000,000 KAUS\n• 활성 사용자: 50,000,000+\n• 글로벌 네트워크: 250개국\n• 총 자산 가치(AUM): ₩54,000,000,000,000\n• 가스 수수료: 12 Gwei\n\n🔐 **기술적 우위**\n• 양자 블록체인 기반 (불가능한 해킹)\n• RFID 실시간 추적 (100% 투명성)\n• 검증된 거래: 10,000,000,000+ 건\n• 보안 사고: 0건 (완벽한 보안)\n• 시스템 가동률: 99.99%\n• 거래 속도: 평균 0.001초\n\n💎 **왜 KAUS Coin인가?**\nKAUS Coin은 단순한 암호화폐가 아닙니다. FIELD NINE의 5,000평 물류 허브와 완벽하게 통합된 혁신적인 금융 인프라입니다.\n\n• **물리적 자산의 디지털화**: 재고가 곧 블록체인 자산\n• **즉시 유동화**: 재고를 실시간으로 거래 가능\n• **완벽한 추적**: RFID로 모든 물류 과정 추적\n• **안정적 가치**: USD 1:1 페깅으로 가치 보장\n• **글로벌 네트워크**: 250개국에서 즉시 사용 가능\n\n투자, 기술, 또는 사용 방법에 대해 더 알고 싶으시면 질문해주세요.';
        }
        
        if (lowerInput.includes('기능') || lowerInput.includes('능력') || lowerInput.includes('뭐') || lowerInput.includes('what')) {
            return 'KAUS AI는 엔터프라이즈급 AI 어시스턴트입니다.\n\n🚀 **핵심 역량**\n• **코드 생성 및 리뷰**: Cursor AI 수준의 코드 생성 능력\n• **자연어 처리**: Google Gemini를 상회하는 컨텍스트 이해\n• **실시간 데이터 분석**: NEXUS OS와 완벽 통합\n• **다국어 지원**: 한국어, 영어, 중국어 등 50+ 언어\n• **문서 분석**: 복잡한 기술 문서도 즉시 이해\n• **예측 분석**: AI 기반 물류 최적화 제안\n• **보안 감사**: 블록체인 트랜잭션 검증\n\n💎 **차별화 포인트**\nCursor AI와 Google Gemini의 최신 기능을 모두 포함하면서도, FIELD NINE의 물류 생태계에 특화된 전문 지식을 보유하고 있습니다. NEXUS OS, KAUS Coin, 위성 네트워크 등 모든 시스템과 실시간으로 통신할 수 있습니다.\n\n어떤 작업을 도와드릴까요?';
        }
        
        if (lowerInput.includes('가격') || lowerInput.includes('price') || lowerInput.includes('시세')) {
            return 'KAUS Coin 실시간 시세 정보입니다.\n\n📈 **현재 시장 상황**\n• **현재가**: $1.00 USD (1:1 페깅)\n• **24시간 변동률**: +2.4% ↗️\n• **총 거래량**: 124,000,000,000 KAUS\n• **시가총액**: ₩54,000,000,000,000\n• **가스 수수료**: 12 Gwei\n• **활성 노드**: 5,000개\n• **총 자산 가치(AUM)**: ₩54조\n\n💼 **가격 안정성**\nKAUS Coin은 USD와 1:1로 페깅된 스테이블코인으로, FIELD NINE의 물류 자산을 담보로 하여 안정적인 가치를 보장합니다.\n\n• **담보 자산**: 5,000평 물류 허브 + 글로벌 재고\n• **페깅 메커니즘**: 자동 조정 시스템으로 항상 $1.00 유지\n• **유동성**: 250개국 네트워크로 즉시 거래 가능\n• **신뢰성**: 양자 블록체인 기반, 0건 보안 사고\n\n📊 **시장 전망**\n현재 지속적인 상승세를 보이고 있으며, FIELD NINE의 글로벌 네트워크 확장과 함께 사용처가 증가하고 있습니다.\n\n투자나 거래에 대해 더 알고 싶으시면 질문해주세요.';
        }
        
        if (lowerInput.includes('투자') || lowerInput.includes('invest') || lowerInput.includes('구매') || lowerInput.includes('사고')) {
            return 'KAUS Coin 투자 가이드입니다.\n\n💼 **왜 KAUS Coin에 투자해야 하는가?**\n\n**1. 완벽한 안정성**\n• USD 1:1 페깅으로 가치 보장\n• 물류 자산 담보로 하락 리스크 최소화\n• 양자 블록체인 기반, 해킹 불가능\n• 0건 보안 사고 기록\n\n**2. 지속적인 성장**\n• 250개국 글로벌 네트워크 확장 중\n• 50M+ 활성 사용자 (지속 증가)\n• 124B 거래량 (월간 증가율 15%+)\n• FIELD NINE 물류 네트워크와 직접 연동\n\n**3. 높은 유동성**\n• 재고 자산을 즉시 유동화 가능\n• 250개국에서 실시간 거래\n• 평균 거래 속도 0.001초\n• DeFi 프로토콜 통합으로 수익 창출 가능\n\n**4. 투명한 운영**\n• 모든 거래 블록체인 기록\n• 실시간 AUM 공개 (₩54조)\n• 정기적인 감사 및 리포트\n• 완벽한 추적 가능성\n\n📊 **투자 전망**\nFIELD NINE의 물류 네트워크가 확장될수록 KAUS Coin의 사용처와 가치가 증가합니다. 현재 월평균 15% 이상의 거래량 증가를 보이고 있으며, 글로벌 확장과 함께 지속적인 성장이 예상됩니다.\n\n💰 **투자 방법**\n• 공식 거래소에서 구매\n• FIELD NINE 제품 구매 시 자동 적립\n• 물류 서비스 이용 시 보상\n• DeFi 스테이킹으로 추가 수익\n\n투자 전략이나 구매 방법에 대해 더 자세히 알고 싶으시면 질문해주세요.';
        }
        
        return `"${userInput}"에 대해 분석 중입니다.\n\nKAUS AI는 FIELD NINE의 모든 시스템과 실시간으로 통신하며, 최신 데이터를 기반으로 정확한 답변을 제공합니다.\n\n더 구체적인 질문을 해주시면, NEXUS OS 물류 데이터, KAUS Coin 시장 정보, 블록체인 트랜잭션, 또는 기술적 세부사항까지 상세히 안내해드릴 수 있습니다.\n\n어떤 부분이 궁금하신가요?`;
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
                className={`fixed bottom-6 right-6 z-50 w-[420px] ${isMinimized ? 'h-auto' : 'h-[600px]'} flex flex-col nexus-glass rounded-lg border border-white/10 overflow-hidden shadow-2xl`}
                style={{ 
                    position: 'fixed !important',
                    bottom: '24px !important',
                    right: '24px !important',
                    zIndex: 9999,
                }}
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
                                KAUS AI v1.0 | Enterprise-Grade AI | Cursor AI + Gemini 상위호환
                            </p>
                        </div>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

