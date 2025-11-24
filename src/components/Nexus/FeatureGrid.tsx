'use client';

import { motion } from 'framer-motion';
import { Eye, Zap, Coins, Shield } from 'lucide-react';

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
}

const features: Feature[] = [
    {
        id: 'vision',
        title: 'AI Vision Scanning',
        description: 'Real-time inventory digitization (No-Scan).',
        icon: <Eye className="w-8 h-8" />,
        gradient: 'from-[#00FF94] to-[#00C2FF]',
    },
    {
        id: 'nft',
        title: 'Dynamic NFT',
        description: 'Asset state reflected on blockchain instantly.',
        icon: <Zap className="w-8 h-8" />,
        gradient: 'from-[#00C2FF] to-[#00FF94]',
    },
    {
        id: 'defi',
        title: 'DeFi Liquidity',
        description: 'Transforming inventory into liquid assets.',
        icon: <Coins className="w-8 h-8" />,
        gradient: 'from-[#00FF94] to-[#00C2FF]',
    },
    {
        id: 'security',
        title: 'Invisible Watermark',
        description: 'Anti-theft security & Geofencing.',
        icon: <Shield className="w-8 h-8" />,
        gradient: 'from-[#00C2FF] to-[#00FF94]',
    },
];

export default function FeatureGrid() {
    return (
        <section className="relative py-24 bg-[#050505]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] font-['Inter',sans-serif] mb-4">
                        Core Technology
                    </h2>
                    <p className="text-lg text-[#888888] font-['Inter',sans-serif]">
                        Physical to Digital. NEXUS of Reality.
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="nexus-glass nexus-glow nexus-glitch rounded-lg p-8 cursor-pointer group"
                        >
                            <div className="flex items-start gap-6">
                                <div className={`p-4 rounded-lg bg-gradient-to-br ${feature.gradient} text-[#050505] flex-shrink-0`}>
                                    {feature.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-[#E0E0E0] font-['Inter',sans-serif] mb-3 group-hover:text-[#00FF94] transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[#888888] font-['Inter',sans-serif] leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Hover border effect */}
                            <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-[#00FF94] transition-colors pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Value Propositions */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 grid md:grid-cols-3 gap-6"
                >
                    {[
                        {
                            title: 'VISIBILITY',
                            description: 'Unseen inventory is not an asset. We track every dust particle.',
                        },
                        {
                            title: 'LIQUIDITY',
                            description: 'Wake up your sleeping stock. Inventory-backed DeFi protocols.',
                        },
                        {
                            title: 'SECURITY',
                            description: 'Impossible to breach. Physical & Digital dual-layer defense.',
                        },
                    ].map((prop, index) => (
                        <div
                            key={index}
                            className="nexus-glass rounded-lg p-6 border border-white/10"
                        >
                            <h4 className="text-xl font-bold text-[#00FF94] font-['Inter',sans-serif] mb-3">
                                {prop.title}
                            </h4>
                            <p className="text-[#888888] font-['Inter',sans-serif] leading-relaxed">
                                {prop.description}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

