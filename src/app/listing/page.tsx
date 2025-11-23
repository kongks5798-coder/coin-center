'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ListingPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [selectedExchange, setSelectedExchange] = useState<string>('');
    const [formData, setFormData] = useState({
        exchangeName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        companyName: 'FIELD NINE Corporation',
        website: 'https://www.fieldnine.io',
        projectDescription: '',
        tokenSymbol: 'KAUS',
        tokenName: 'KAUS Coin',
        totalSupply: '1,000,000,000',
        currentPrice: '$3.50',
    });

    // 홀로그램 파티클 효과
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
        }> = [];

        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
                ctx.fill();

                particles.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 150)})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    // 마우스 추적
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const exchanges = [
        { id: 'upbit', name: '업비트 (Upbit)', priority: 'high', country: 'Korea' },
        { id: 'bithumb', name: '빗썸 (Bithumb)', priority: 'high', country: 'Korea' },
        { id: 'coinone', name: '코인원 (Coinone)', priority: 'medium', country: 'Korea' },
        { id: 'binance', name: '바이낸스 (Binance)', priority: 'high', country: 'Global' },
        { id: 'coinbase', name: '코인베이스 (Coinbase)', priority: 'high', country: 'USA' },
        { id: 'kucoin', name: '쿠코인 (KuCoin)', priority: 'medium', country: 'Global' },
        { id: 'gateio', name: '게이트아이오 (Gate.io)', priority: 'medium', country: 'Global' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('상장 신청이 접수되었습니다. 검토 후 연락드리겠습니다.');
        // 실제로는 API 호출
    };

    return (
        <div className="fixed inset-0 bg-black text-white overflow-auto relative">
            {/* 홀로그램 배경 캔버스 */}
            <canvas 
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none opacity-30 z-0"
            />

            {/* 홀로그램 그라디언트 배경 */}
            <div 
                className="fixed inset-0 opacity-20 z-0"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.2), transparent 70%)`
                }}
            />

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 min-h-screen">
                {/* 헤더 */}
                <header className="sticky top-0 border-b border-purple-500/30 bg-black/50 backdrop-blur-2xl p-6 z-20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                                <span className="text-2xl">📈</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    KAUS 코인 상장 신청
                                </div>
                                <div className="text-xs text-gray-400">Exchange Listing Application</div>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* 메인 섹션 */}
                <main className="max-w-7xl mx-auto p-8">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-7xl md:text-9xl font-black mb-6">
                            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                상장 준비 완료
                            </span>
                        </h1>
                        <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                            KAUS 코인은 거래소 상장을 위한 모든 준비가 완료되었습니다.
                        </p>
                    </div>

                    {/* 준비 완료 항목 */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                            <h3 className="text-2xl font-bold text-purple-400 mb-6">✅ 준비 완료 문서</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <span className="text-green-400 text-2xl">✓</span>
                                    <div>
                                        <div className="font-bold text-white">백서 (Whitepaper)</div>
                                        <div className="text-sm text-gray-400">KAUS_COIN_WHITEPAPER.md</div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-400 text-2xl">✓</span>
                                    <div>
                                        <div className="font-bold text-white">기술 문서</div>
                                        <div className="text-sm text-gray-400">KAUS_COIN_TECHNICAL_DOCUMENTATION.md</div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-400 text-2xl">✓</span>
                                    <div>
                                        <div className="font-bold text-white">로드맵</div>
                                        <div className="text-sm text-gray-400">백서에 포함됨</div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-400 text-2xl">✓</span>
                                    <div>
                                        <div className="font-bold text-white">토큰 정보</div>
                                        <div className="text-sm text-gray-400">KAUS - 1B 총 공급량</div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-400 text-2xl">✓</span>
                                    <div>
                                        <div className="font-bold text-white">상장 가이드</div>
                                        <div className="text-sm text-gray-400">KAUS_COIN_LISTING_GUIDE.md</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl">
                            <h3 className="text-2xl font-bold text-blue-400 mb-6">📊 프로젝트 정보</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">토큰 심볼</div>
                                    <div className="text-xl font-bold text-white">KAUS</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">토큰 이름</div>
                                    <div className="text-xl font-bold text-white">KAUS Coin</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">총 공급량</div>
                                    <div className="text-xl font-bold text-white">1,000,000,000 KAUS</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">현재 가격</div>
                                    <div className="text-xl font-bold text-white">$3.50 USD</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">블록체인</div>
                                    <div className="text-xl font-bold text-white">FIELD NINE Quantum Blockchain</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 거래소 선택 */}
                    <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl mb-16">
                        <h3 className="text-3xl font-bold text-purple-400 mb-8 text-center">상장 신청 거래소 선택</h3>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {exchanges.map((exchange) => (
                                <button
                                    key={exchange.id}
                                    onClick={() => {
                                        setSelectedExchange(exchange.id);
                                        setFormData(prev => ({ ...prev, exchangeName: exchange.name }));
                                    }}
                                    className={`p-6 rounded-xl border-2 transition-all ${
                                        selectedExchange === exchange.id
                                            ? 'border-purple-500 bg-purple-500/20'
                                            : 'border-purple-500/30 bg-black/40 hover:border-purple-500/50'
                                    }`}
                                >
                                    <div className="text-lg font-bold text-white mb-2">{exchange.name}</div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-1 rounded ${
                                            exchange.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                            'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {exchange.priority === 'high' ? '우선순위 높음' : '중간'}
                                        </span>
                                        <span className="text-xs text-gray-400">{exchange.country}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 상장 신청 폼 */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                        <h3 className="text-3xl font-bold text-purple-400 mb-8 text-center">상장 신청서</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">거래소 이름</label>
                                    <input
                                        type="text"
                                        value={formData.exchangeName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, exchangeName: e.target.value }))}
                                        required
                                        className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500"
                                        placeholder="업비트"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">회사명</label>
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        readOnly
                                        className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">담당자 이름</label>
                                    <input
                                        type="text"
                                        value={formData.contactName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                                        required
                                        className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">이메일</label>
                                    <input
                                        type="email"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                                        required
                                        className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">프로젝트 설명</label>
                                <textarea
                                    value={formData.projectDescription}
                                    onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                                    required
                                    rows={6}
                                    className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500"
                                    placeholder="KAUS 코인은 RFID, 위성 네트워크, 양자 블록체인을 통합한 글로벌 결제 및 추적 시스템입니다..."
                                />
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                                <div className="text-sm text-yellow-400 font-bold mb-2">📋 제출할 문서</div>
                                <ul className="text-xs text-gray-300 space-y-1">
                                    <li>• 백서 (Whitepaper)</li>
                                    <li>• 기술 문서 (Technical Documentation)</li>
                                    <li>• 로드맵 (Roadmap)</li>
                                    <li>• 팀 소개 (Team Introduction)</li>
                                    <li>• 감사 보고서 (Audit Report) - 준비 중</li>
                                </ul>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-purple-500/50"
                            >
                                상장 신청 제출
                            </button>
                        </form>
                    </div>

                    {/* 문서 다운로드 */}
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-bold text-purple-400 mb-6">문서 다운로드</h3>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="/KAUS_COIN_WHITEPAPER.md"
                                download
                                className="px-6 py-3 bg-purple-500/20 border border-purple-500/50 rounded-xl font-bold hover:bg-purple-500/30 transition-all"
                            >
                                📄 백서 다운로드
                            </a>
                            <a
                                href="/KAUS_COIN_TECHNICAL_DOCUMENTATION.md"
                                download
                                className="px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-xl font-bold hover:bg-blue-500/30 transition-all"
                            >
                                🔧 기술 문서 다운로드
                            </a>
                            <a
                                href="/KAUS_COIN_LISTING_GUIDE.md"
                                download
                                className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-xl font-bold hover:bg-cyan-500/30 transition-all"
                            >
                                📊 상장 가이드 다운로드
                            </a>
                        </div>
                    </div>

                    {/* 홈으로 돌아가기 */}
                    <div className="text-center mt-16 mb-24">
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-3 px-12 py-6 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all hover:scale-105"
                        >
                            <span>홈으로 돌아가기</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                    </div>
                </main>

                {/* 푸터 */}
                <footer className="border-t border-purple-500/30 bg-black/30 backdrop-blur-2xl p-6 mt-16">
                    <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
                        <p>© 2035 FIELD NINE Corporation. All rights reserved.</p>
                        <p className="mt-2">KAUS 코인 상장 준비 완료 · 모든 문서 준비됨</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

