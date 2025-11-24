'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TickerItem {
    label: string;
    value: string;
    change?: number;
    color?: 'green' | 'blue' | 'white';
}

const tickerData: TickerItem[] = [
    { label: 'KAUS COIN', value: '$12.45', change: 2.4, color: 'green' },
    { label: 'TOTAL AUM', value: '₩54,000,000,000', color: 'blue' },
    { label: 'ACTIVE NODES', value: '5,000', color: 'white' },
    { label: 'GAS', value: '12 Gwei', color: 'white' },
];

export default function LiveTicker() {
    const [items, setItems] = useState<TickerItem[]>(tickerData);

    useEffect(() => {
        // Duplicate items for seamless loop
        setItems([...tickerData, ...tickerData]);
    }, []);

    const getColorClass = (color?: string) => {
        switch (color) {
            case 'green':
                return 'text-[#00FF94]';
            case 'blue':
                return 'text-[#00C2FF]';
            default:
                return 'text-[#E0E0E0]';
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#050505] border-b border-white/10 overflow-hidden">
            <div className="relative h-10 flex items-center">
                {/* Infinite scroll container */}
                <motion.div
                    className="flex items-center gap-8 whitespace-nowrap"
                    animate={{
                        x: [0, -50 * tickerData.length * 2],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 font-['JetBrains_Mono',monospace] text-sm"
                        >
                            <span className="text-[#888888]">{item.label}:</span>
                            <span className={getColorClass(item.color)}>
                                {item.value}
                            </span>
                            {item.change !== undefined && (
                                <span className="text-[#00FF94]">
                                    ({item.change > 0 ? '+' : ''}{item.change}%)
                                </span>
                            )}
                            <span className="text-[#888888]">|</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

