'use client';

import { useState, useEffect } from 'react';

interface Transaction {
    id: string;
    hash: string;
    from: string;
    to: string;
    amount: number;
    timestamp: string;
    status: 'pending' | 'confirmed' | 'failed';
    productId?: string;
    productName?: string;
}

export default function BlockchainTransactionList() {
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: 'tx-001',
            hash: '0x7a3f8b2c9d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
            from: '0x1234...5678',
            to: '0xabcd...efgh',
            amount: 1250,
            timestamp: '2025-11-23 19:15:32',
            status: 'confirmed',
            productId: 'PROD-12345',
            productName: '프리미엄 스니커즈'
        },
        {
            id: 'tx-002',
            hash: '0x9b2e4c6d8f0a1b3c5d7e9f0a2b4c6d8e0f1a3b5c7d9e1f2a4b6c8d0e2f3a5b7',
            from: '0x5678...9012',
            to: '0xefgh...ijkl',
            amount: 5000,
            timestamp: '2025-11-23 19:14:18',
            status: 'confirmed',
            productId: 'PROD-67890',
            productName: '럭셔리 핸드백'
        },
        {
            id: 'tx-003',
            hash: '0x4c8a1d3e5f7a9b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8',
            from: '0x9012...3456',
            to: '0xijkl...mnop',
            amount: 800,
            timestamp: '2025-11-23 19:13:05',
            status: 'confirmed',
            productId: 'PROD-11111',
            productName: '스마트 워치'
        },
        {
            id: 'tx-004',
            hash: '0x6d1f3a5c7e9b0d2f4a6c8e0b2d4f6a8c0e2d4f6a8c0e2d4f6a8c0e2d4f6a8c0',
            from: '0x3456...7890',
            to: '0xmnop...qrst',
            amount: 3200,
            timestamp: '2025-11-23 19:12:47',
            status: 'pending',
            productId: 'PROD-22222',
            productName: '프리미엄 향수'
        },
        {
            id: 'tx-005',
            hash: '0x3e9b5d7f0a2c4e6f8a0c2e4f6a8c0e2f4a6c8e0f2a4c6e8f0a2c4e6f8a0c2e4',
            from: '0x7890...abcd',
            to: '0xqrst...uvwx',
            amount: 1500,
            timestamp: '2025-11-23 19:11:23',
            status: 'confirmed',
            productId: 'PROD-33333',
            productName: '디자이너 의류'
        },
    ]);

    useEffect(() => {
        // 새로운 거래 추가 시뮬레이션
        const interval = setInterval(() => {
            const newTx: Transaction = {
                id: `tx-${Date.now()}`,
                hash: `0x${Math.random().toString(16).substring(2, 66)}`,
                from: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
                to: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
                amount: Math.floor(Math.random() * 5000) + 500,
                timestamp: new Date().toLocaleString('ko-KR'),
                status: Math.random() > 0.8 ? 'pending' : 'confirmed',
            };
            setTransactions(prev => [newTx, ...prev].slice(0, 10));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border-2 border-purple-500/30">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-purple-400">블록체인 거래 내역</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">실시간 동기화</span>
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.map((tx) => (
                    <div
                        key={tx.id}
                        className="bg-black/40 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full ${
                                        tx.status === 'confirmed' ? 'bg-green-400' :
                                        tx.status === 'pending' ? 'bg-yellow-400 animate-pulse' :
                                        'bg-red-400'
                                    }`}></div>
                                    <span className={`text-xs font-bold ${
                                        tx.status === 'confirmed' ? 'text-green-400' :
                                        tx.status === 'pending' ? 'text-yellow-400' :
                                        'text-red-400'
                                    }`}>
                                        {tx.status === 'confirmed' ? '확인됨' :
                                         tx.status === 'pending' ? '대기 중' :
                                         '실패'}
                                    </span>
                                </div>
                                {tx.productName && (
                                    <div className="text-sm font-bold text-white mb-1">{tx.productName}</div>
                                )}
                                <div className="text-xs font-mono text-purple-400 break-all">{tx.hash}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-purple-400">{tx.amount.toLocaleString()} KAUS</div>
                                <div className="text-xs text-gray-400">{tx.timestamp}</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                            <div className="text-xs text-gray-400">
                                <span className="text-purple-400">From:</span> {tx.from}
                            </div>
                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <div className="text-xs text-gray-400">
                                <span className="text-cyan-400">To:</span> {tx.to}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 통계 */}
            <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                        {transactions.filter(tx => tx.status === 'confirmed').length}
                    </div>
                    <div className="text-xs text-gray-400">확인된 거래</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                        {transactions.filter(tx => tx.status === 'pending').length}
                    </div>
                    <div className="text-xs text-gray-400">대기 중</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">
                        {transactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">총 거래량</div>
                </div>
            </div>
        </div>
    );
}

