'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// 코인 타입
interface Coin {
    id: string;
    symbol: string;
    name: string;
    icon: string;
    balance: number;
    usdPrice: number;
    change24h: number;
    address?: string; // 지갑 주소
}

// 거래 내역 타입
interface Transaction {
    id: string;
    type: 'deposit' | 'withdraw' | 'trade' | 'swap';
    fromCoin: string;
    toCoin: string;
    amount: number;
    price: number;
    timestamp: string;
    status: 'pending' | 'completed' | 'failed';
    hash?: string;
}

// 실시간 가격 훅
const useCryptoPrices = () => {
    const [prices, setPrices] = useState({
        BTC: 67500,
        ETH: 3450,
        XRP: 0.62,
        KAUS: 1.00, // USD-Pegged Stablecoin
        USDT: 1.00,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => ({
                BTC: prev.BTC + (Math.random() * 200 - 100),
                ETH: prev.ETH + (Math.random() * 50 - 25),
                XRP: prev.XRP + (Math.random() * 0.02 - 0.01),
                KAUS: 1.00, // Stablecoin - always pegged to $1.00 USD
                USDT: 1.00,
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return prices;
};

export default function WalletPage() {
    const prices = useCryptoPrices();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [activeTab, setActiveTab] = useState<'wallet' | 'exchange' | 'transactions' | 'settings'>('wallet');
    const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawAddress, setWithdrawAddress] = useState('');
    const [exchangeFrom, setExchangeFrom] = useState('KAUS');
    const [exchangeTo, setExchangeTo] = useState('BTC');
    const [exchangeAmount, setExchangeAmount] = useState('');

    // 지갑 잔액 (초기값)
    const [wallet, setWallet] = useState<Coin[]>([
        { id: 'BTC', symbol: 'BTC', name: 'Bitcoin', icon: '₿', balance: 0.5, usdPrice: prices.BTC, change24h: 2.5, address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
        { id: 'ETH', symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', balance: 12.5, usdPrice: prices.ETH, change24h: -1.2, address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb6' },
        { id: 'XRP', symbol: 'XRP', name: 'Ripple', icon: '💧', balance: 5000, usdPrice: prices.XRP, change24h: 3.8, address: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH' },
        { id: 'KAUS', symbol: 'KAUS', name: 'KAUS Stablecoin', icon: '💵', balance: 1250000, usdPrice: prices.KAUS, change24h: 0.0, address: '0xKAUS...TRACE' }, // $1.00 USD-Pegged Stablecoin
        { id: 'USDT', symbol: 'USDT', name: 'Tether', icon: '💵', balance: 50000, usdPrice: prices.USDT, change24h: 0.1, address: '0xUSDT...ADDR' },
    ]);

    // 거래 내역
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 'tx-1', type: 'deposit', fromCoin: 'BTC', toCoin: 'BTC', amount: 0.5, price: 33750, timestamp: '2025-11-23 18:00:00', status: 'completed', hash: '0xabc123...' },
        { id: 'tx-2', type: 'trade', fromCoin: 'ETH', toCoin: 'KAUS', amount: 2.5, price: 8625, timestamp: '2025-11-23 17:30:00', status: 'completed', hash: '0xdef456...' },
        { id: 'tx-3', type: 'withdraw', fromCoin: 'XRP', toCoin: 'XRP', amount: 1000, price: 620, timestamp: '2025-11-23 17:00:00', status: 'pending', hash: '0xghi789...' },
    ]);

    // 총 자산 가치 계산
    const totalValue = wallet.reduce((sum, coin) => sum + (coin.balance * coin.usdPrice), 0);

    // 가격 업데이트
    useEffect(() => {
        setWallet(prev => prev.map(coin => ({
            ...coin,
            usdPrice: prices[coin.symbol as keyof typeof prices] || coin.usdPrice
        })));
    }, [prices]);

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

    // 출금 처리 (본인만 가능)
    const handleWithdraw = () => {
        if (!selectedCoin || !withdrawAmount || !withdrawAddress) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        const coin = wallet.find(c => c.id === selectedCoin);
        if (!coin || coin.balance < parseFloat(withdrawAmount)) {
            alert('잔액이 부족합니다.');
            return;
        }

        // 출금 권한 확인 (본인만 가능)
        const isOwner = true; // 실제로는 인증 시스템과 연동
        
        if (!isOwner) {
            alert('출금 권한이 없습니다. 본인만 출금 가능합니다.');
            return;
        }

        // 출금 처리
        const newTransaction: Transaction = {
            id: `tx-${Date.now()}`,
            type: 'withdraw',
            fromCoin: selectedCoin,
            toCoin: selectedCoin,
            amount: parseFloat(withdrawAmount),
            price: coin.usdPrice * parseFloat(withdrawAmount),
            timestamp: new Date().toLocaleString('ko-KR'),
            status: 'pending',
            hash: `0x${Math.random().toString(16).substring(2, 66)}`,
        };

        setTransactions(prev => [newTransaction, ...prev]);
        setWallet(prev => prev.map(c => 
            c.id === selectedCoin 
                ? { ...c, balance: c.balance - parseFloat(withdrawAmount) }
                : c
        ));

        alert('출금 요청이 접수되었습니다.');
        setWithdrawAmount('');
        setWithdrawAddress('');
        setSelectedCoin(null);
    };

    // 거래소 거래 처리
    const handleExchange = () => {
        if (!exchangeAmount) {
            alert('거래량을 입력해주세요.');
            return;
        }

        const fromCoin = wallet.find(c => c.id === exchangeFrom);
        const toCoin = wallet.find(c => c.id === exchangeTo);

        if (!fromCoin || !toCoin) return;
        if (fromCoin.balance < parseFloat(exchangeAmount)) {
            alert('잔액이 부족합니다.');
            return;
        }

        // 환율 계산
        const fromValue = parseFloat(exchangeAmount) * fromCoin.usdPrice;
        const toAmount = fromValue / toCoin.usdPrice;

        const newTransaction: Transaction = {
            id: `tx-${Date.now()}`,
            type: 'trade',
            fromCoin: exchangeFrom,
            toCoin: exchangeTo,
            amount: parseFloat(exchangeAmount),
            price: fromValue,
            timestamp: new Date().toLocaleString('ko-KR'),
            status: 'completed',
            hash: `0x${Math.random().toString(16).substring(2, 66)}`,
        };

        setTransactions(prev => [newTransaction, ...prev]);
        setWallet(prev => prev.map(c => {
            if (c.id === exchangeFrom) {
                return { ...c, balance: c.balance - parseFloat(exchangeAmount) };
            }
            if (c.id === exchangeTo) {
                return { ...c, balance: c.balance + toAmount };
            }
            return c;
        }));

        alert(`거래 완료: ${exchangeAmount} ${exchangeFrom} → ${toAmount.toFixed(6)} ${exchangeTo}`);
        setExchangeAmount('');
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

            {/* 홀로그램 그리드 */}
            <div className="fixed inset-0 opacity-10 z-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
            }} />

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 min-h-screen">
                {/* 헤더 */}
                <header className="sticky top-0 border-b border-purple-500/30 bg-black/50 backdrop-blur-2xl p-6 z-20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                                <span className="text-2xl">💼</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    FIELD NINE 지갑
                                </div>
                                <div className="text-xs text-gray-400">멀티체인 지갑 & 거래소</div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">총 자산 가치</div>
                                <div className="text-lg font-bold text-purple-400">
                                    ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </div>
                            </div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        </div>
                    </div>
                </header>

                {/* 네비게이션 탭 */}
                <div className="sticky top-24 bg-black/60 backdrop-blur-xl z-10 border-b border-purple-500/30">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex justify-center gap-8">
                            {[
                                { id: 'wallet', label: '지갑', icon: '💼' },
                                { id: 'exchange', label: '거래소', icon: '🔄' },
                                { id: 'transactions', label: '거래 내역', icon: '📋' },
                                { id: 'settings', label: '설정', icon: '⚙️' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30'
                                            : 'text-gray-400 hover:text-purple-400 hover:bg-white/5'
                                    }`}
                                >
                                    <span className="text-xl">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 메인 섹션 */}
                <main className="max-w-7xl mx-auto p-8">
                    {/* 지갑 탭 */}
                    {activeTab === 'wallet' && (
                        <div className="space-y-8">
                            {/* 총 자산 요약 */}
                            <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="text-center mb-8">
                                    <div className="text-sm text-gray-400 mb-2">총 자산 가치</div>
                                    <div className="text-6xl font-black text-purple-400 mb-2">
                                        ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-sm text-green-400">+2.5% (24h)</div>
                                </div>

                                {/* 코인 목록 */}
                                <div className="space-y-4">
                                    {wallet.map((coin) => (
                                        <div
                                            key={coin.id}
                                            className="bg-black/40 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer"
                                            onClick={() => setSelectedCoin(coin.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-3xl">
                                                        {coin.icon}
                                                    </div>
                                                    <div>
                                                        <div className="text-xl font-bold text-white">{coin.name}</div>
                                                        <div className="text-sm text-gray-400">{coin.symbol}</div>
                                                        {coin.address && (
                                                            <div className="text-xs font-mono text-purple-400 mt-1">{coin.address}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-white mb-1">
                                                        {coin.balance.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                                    </div>
                                                    <div className="text-sm text-gray-400 mb-1">
                                                        ${(coin.balance * coin.usdPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </div>
                                                    <div className={`text-sm font-bold ${
                                                        coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                                                    }`}>
                                                        {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 출금 모달 */}
                            {selectedCoin && (
                                <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
                                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30 rounded-3xl p-8 max-w-2xl w-full">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-2xl font-bold text-purple-400">출금</h3>
                                            <button
                                                onClick={() => setSelectedCoin(null)}
                                                className="text-gray-400 hover:text-white text-3xl"
                                            >
                                                &times;
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm text-gray-400 mb-2 block">출금 코인</label>
                                                <div className="bg-black/40 rounded-xl p-4 border border-purple-500/20">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">{wallet.find(c => c.id === selectedCoin)?.icon}</span>
                                                        <span className="text-lg font-bold text-white">{selectedCoin}</span>
                                                        <span className="text-sm text-gray-400">
                                                            잔액: {wallet.find(c => c.id === selectedCoin)?.balance.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-400 mb-2 block">출금 주소</label>
                                                <input
                                                    type="text"
                                                    value={withdrawAddress}
                                                    onChange={(e) => setWithdrawAddress(e.target.value)}
                                                    placeholder="받는 주소를 입력하세요"
                                                    className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-400 mb-2 block">출금 금액</label>
                                                <input
                                                    type="number"
                                                    value={withdrawAmount}
                                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                                    placeholder="0.00"
                                                    className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500"
                                                />
                                            </div>

                                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                                                <div className="text-sm text-yellow-400 font-bold mb-1">⚠️ 출금 권한</div>
                                                <div className="text-xs text-gray-300">
                                                    출금은 본인만 가능합니다. 다른 사용자는 출금 권한을 설정할 수 없습니다.
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleWithdraw}
                                                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-purple-500/50"
                                            >
                                                출금 요청
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 거래소 탭 */}
                    {activeTab === 'exchange' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-3xl font-bold text-purple-400 mb-8 text-center">거래소</h3>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* 거래 입력 */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-sm text-gray-400 mb-2 block">보내는 코인</label>
                                            <select
                                                value={exchangeFrom}
                                                onChange={(e) => setExchangeFrom(e.target.value)}
                                                className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500"
                                            >
                                                {wallet.map(coin => (
                                                    <option key={coin.id} value={coin.id}>
                                                        {coin.icon} {coin.name} ({coin.symbol})
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-xs text-gray-400 mt-2">
                                                잔액: {wallet.find(c => c.id === exchangeFrom)?.balance.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-400 mb-2 block">거래량</label>
                                            <input
                                                type="number"
                                                value={exchangeAmount}
                                                onChange={(e) => setExchangeAmount(e.target.value)}
                                                placeholder="0.00"
                                                className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="text-center">
                                            <button
                                                onClick={() => {
                                                    const temp = exchangeFrom;
                                                    setExchangeFrom(exchangeTo);
                                                    setExchangeTo(temp);
                                                }}
                                                className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/50 hover:bg-purple-500/30 transition-all"
                                            >
                                                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-400 mb-2 block">받는 코인</label>
                                            <select
                                                value={exchangeTo}
                                                onChange={(e) => setExchangeTo(e.target.value)}
                                                className="w-full bg-black/40 border border-purple-500/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500"
                                            >
                                                {wallet.map(coin => (
                                                    <option key={coin.id} value={coin.id}>
                                                        {coin.icon} {coin.name} ({coin.symbol})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* 환율 정보 */}
                                        {exchangeAmount && (
                                            <div className="bg-black/40 rounded-xl p-4 border border-purple-500/20">
                                                <div className="text-sm text-gray-400 mb-2">예상 받을 금액</div>
                                                <div className="text-2xl font-bold text-purple-400">
                                                    {((parseFloat(exchangeAmount) * (wallet.find(c => c.id === exchangeFrom)?.usdPrice || 0)) / (wallet.find(c => c.id === exchangeTo)?.usdPrice || 1)).toLocaleString(undefined, { maximumFractionDigits: 6 })} {exchangeTo}
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    환율: 1 {exchangeFrom} = {(wallet.find(c => c.id === exchangeFrom)?.usdPrice || 0) / (wallet.find(c => c.id === exchangeTo)?.usdPrice || 1)} {exchangeTo}
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleExchange}
                                            className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-purple-500/50"
                                        >
                                            거래 실행
                                        </button>
                                    </div>

                                    {/* 실시간 가격 차트 */}
                                    <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
                                        <h4 className="text-lg font-bold text-purple-400 mb-4">실시간 가격</h4>
                                        <div className="space-y-3">
                                            {wallet.map(coin => (
                                                <div key={coin.id} className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">{coin.icon}</span>
                                                        <div>
                                                            <div className="text-sm font-bold text-white">{coin.symbol}</div>
                                                            <div className="text-xs text-gray-400">{coin.name}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-bold text-white">${coin.usdPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                        <div className={`text-xs font-bold ${
                                                            coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                                                        }`}>
                                                            {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 거래 내역 탭 */}
                    {activeTab === 'transactions' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-3xl font-bold text-purple-400 mb-8">거래 내역</h3>

                                <div className="space-y-4">
                                    {transactions.map((tx) => (
                                        <div
                                            key={tx.id}
                                            className="bg-black/40 rounded-xl p-6 border border-purple-500/20"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                        tx.type === 'deposit' ? 'bg-green-500/20' :
                                                        tx.type === 'withdraw' ? 'bg-red-500/20' :
                                                        'bg-blue-500/20'
                                                    }`}>
                                                        {tx.type === 'deposit' ? '📥' :
                                                         tx.type === 'withdraw' ? '📤' :
                                                         '🔄'}
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-bold text-white">
                                                            {tx.type === 'deposit' ? '입금' :
                                                             tx.type === 'withdraw' ? '출금' :
                                                             '거래'}
                                                        </div>
                                                        <div className="text-sm text-gray-400">
                                                            {tx.fromCoin} {tx.type === 'trade' ? `→ ${tx.toCoin}` : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-purple-400 mb-1">
                                                        {tx.amount.toLocaleString(undefined, { maximumFractionDigits: 6 })} {tx.fromCoin}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        ${tx.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </div>
                                                    <div className={`text-xs font-bold mt-1 ${
                                                        tx.status === 'completed' ? 'text-green-400' :
                                                        tx.status === 'pending' ? 'text-yellow-400' :
                                                        'text-red-400'
                                                    }`}>
                                                        {tx.status === 'completed' ? '완료' :
                                                         tx.status === 'pending' ? '대기 중' :
                                                         '실패'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                                <div className="text-xs text-gray-400">{tx.timestamp}</div>
                                                {tx.hash && (
                                                    <div className="text-xs font-mono text-purple-400">{tx.hash}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 설정 탭 */}
                    {activeTab === 'settings' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-3xl font-bold text-purple-400 mb-8">보안 설정</h3>

                                <div className="space-y-6">
                                    <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <div className="text-lg font-bold text-white mb-1">출금 권한</div>
                                                <div className="text-sm text-gray-400">출금은 본인만 가능합니다</div>
                                            </div>
                                            <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                                                <span className="text-2xl">🔒</span>
                                            </div>
                                        </div>
                                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                                            <div className="text-sm text-yellow-400 font-bold mb-1">⚠️ 보안 정책</div>
                                            <div className="text-xs text-gray-300">
                                                출금 권한은 본인만 설정 가능하며, 다른 사용자는 변경할 수 없습니다.
                                                모든 출금 요청은 본인 인증 후 처리됩니다.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <div className="text-lg font-bold text-white mb-1">2단계 인증 (2FA)</div>
                                                <div className="text-sm text-gray-400">추가 보안을 위한 2FA 설정</div>
                                            </div>
                                            <button className="px-6 py-3 bg-purple-500/20 border border-purple-500/50 rounded-xl font-bold text-sm hover:bg-purple-500/30 transition-all">
                                                설정
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <div className="text-lg font-bold text-white mb-1">지갑 주소</div>
                                                <div className="text-sm text-gray-400">각 코인별 지갑 주소</div>
                                            </div>
                                        </div>
                                        <div className="space-y-3 mt-4">
                                            {wallet.map(coin => (
                                                <div key={coin.id} className="flex items-center justify-between p-3 bg-black/60 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">{coin.icon}</span>
                                                        <span className="text-sm font-bold text-white">{coin.symbol}</span>
                                                    </div>
                                                    <div className="text-xs font-mono text-purple-400">{coin.address}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 홈으로 돌아가기 */}
                    <div className="text-center mt-12 mb-24">
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
                        <p className="mt-2">멀티체인 지갑 · BTC, ETH, XRP, KAUS 거래 지원 · 출금 권한: 본인만 가능</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

