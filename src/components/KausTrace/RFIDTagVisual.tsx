'use client';

import { useState, useEffect } from 'react';

interface RFIDTagProps {
    tagId: string;
    productName: string;
    status: 'active' | 'in-transit' | 'delivered';
    location: string;
    blockchainHash: string;
    kausPaid: number;
}

export default function RFIDTagVisual({ tagId, productName, status, location, blockchainHash, kausPaid }: RFIDTagProps) {
    const [isScanned, setIsScanned] = useState(false);
    const [scanAnimation, setScanAnimation] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanAnimation(true);
            setTimeout(() => setScanAnimation(false), 1000);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            {/* 실제 RFID 태그 시각화 */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30">
                {/* RFID 태그 물리적 형태 */}
                <div className="relative mb-4">
                    {/* 태그 본체 */}
                    <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-4 border border-purple-400/30">
                        {/* RFID 칩 시각화 */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">📡</span>
                                </div>
                                <div>
                                    <div className="text-sm font-mono text-purple-400">{tagId}</div>
                                    <div className="text-xs text-gray-400">KAUS TRACE</div>
                                </div>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${
                                status === 'active' ? 'bg-green-400 animate-pulse' :
                                status === 'in-transit' ? 'bg-yellow-400 animate-pulse' :
                                'bg-gray-400'
                            } shadow-lg`}></div>
                        </div>

                        {/* 안테나 패턴 (실제 RFID 태그처럼) */}
                        <div className="relative h-24 bg-gray-900/50 rounded-lg overflow-hidden border border-purple-500/20">
                            {/* 안테나 코일 패턴 */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                                <defs>
                                    <linearGradient id="antennaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                                        <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
                                    </linearGradient>
                                </defs>
                                {/* 안테나 코일 */}
                                <path
                                    d="M 20 50 Q 50 20, 80 50 T 140 50"
                                    fill="none"
                                    stroke="url(#antennaGradient)"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                />
                                <path
                                    d="M 20 50 Q 50 80, 80 50 T 140 50"
                                    fill="none"
                                    stroke="url(#antennaGradient)"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                />
                                {/* 중앙 칩 */}
                                <rect x="85" y="40" width="30" height="20" rx="2" fill="url(#antennaGradient)" />
                            </svg>

                            {/* 스캔 애니메이션 */}
                            {scanAnimation && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"></div>
                            )}
                        </div>

                        {/* 제품 정보 */}
                        <div className="mt-3 pt-3 border-t border-gray-700">
                            <div className="text-sm font-bold text-white mb-1">{productName}</div>
                            <div className="text-xs text-gray-400">위치: {location}</div>
                        </div>
                    </div>
                </div>

                {/* 블록체인 정보 */}
                <div className="bg-black/40 rounded-lg p-3 border border-purple-500/20 mb-3">
                    <div className="text-xs text-gray-400 mb-1">블록체인 해시</div>
                    <div className="text-xs font-mono text-purple-400 break-all">{blockchainHash}</div>
                </div>

                {/* KAUS 코인 결제 정보 */}
                <div className="flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-3 border border-purple-500/30">
                    <div className="text-xs text-gray-400">KAUS 코인</div>
                    <div className="text-lg font-bold text-purple-400">{kausPaid.toLocaleString()} KAUS</div>
                </div>

                {/* 스캔 버튼 */}
                <button
                    onClick={() => setIsScanned(!isScanned)}
                    className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-purple-500/50"
                >
                    {isScanned ? '✅ 스캔 완료' : '📱 스캔하기'}
                </button>
            </div>
        </div>
    );
}

