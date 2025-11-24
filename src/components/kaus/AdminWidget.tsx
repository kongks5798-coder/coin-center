"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Metrics = {
    facilityStatus: string;
    utilization: number;
    todayOrders: number;
    kausCollateralRatio: number;
    updatedAt: string;
};

export function AdminWidget() {
    const [open, setOpen] = useState(false);
    const [metrics, setMetrics] = useState<Metrics | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/metrics");
                const json = await res.json();
                setMetrics(json);
            } catch (e) {
                console.error(e);
            }
        }
        load();
        const id = setInterval(load, 60_000);
        return () => clearInterval(id);
    }, []);

    const utilizationPercent = metrics ? Math.round(metrics.utilization * 100) : null;
    const collateralPercent = metrics ? Math.round(metrics.kausCollateralRatio * 100) : null;

    return (
        <>
            {/* 플로팅 버튼 */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="glass fixed bottom-6 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-[#00FF94] shadow-xl hover:bg-white/10 hover:border-[#00FF94]/50 transition-all duration-300 md:right-6"
            >
                <span className="font-mono text-xs">KAUS</span>
            </motion.button>

            {/* 패널 */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="glass fixed bottom-24 right-4 z-40 w-80 rounded-2xl p-6 text-sm text-white/90 shadow-2xl md:right-6"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00FF94] font-inter">
                                    KAUS ADMIN
                                </p>
                                <p className="mt-1 text-xs text-white/50 font-inter">
                                    실물 허브 &amp; 온체인 상태 스냅샷
                                </p>
                            </div>
                            <button
                                className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/40 hover:border-white/20 hover:text-white/60 transition-all duration-300"
                                onClick={() => setOpen(false)}
                                type="button"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-3 text-xs">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex justify-between items-center"
                            >
                                <span className="text-white/50 font-inter">Facility</span>
                                <span className="font-medium text-white/90 font-mono">
                                    {metrics ? metrics.facilityStatus.toUpperCase() : "LOADING"}
                                </span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                                className="flex justify-between items-center"
                            >
                                <span className="text-white/50 font-inter">Utilization</span>
                                <span className="font-medium text-white/90 font-mono">
                                    {utilizationPercent !== null ? `${utilizationPercent}%` : "–"}
                                </span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-between items-center"
                            >
                                <span className="text-white/50 font-inter">Today Orders</span>
                                <span className="font-medium text-white/90 font-mono">
                                    {metrics ? metrics.todayOrders.toLocaleString() : "–"}
                                </span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 }}
                                className="flex justify-between items-center"
                            >
                                <span className="text-white/50 font-inter">KAUS Collateral</span>
                                <span className="font-medium text-[#00FF94] font-mono">
                                    {collateralPercent !== null ? `${collateralPercent}%` : "–"}
                                </span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-3 text-xs text-white/30 border-t border-white/10"
                            >
                                {metrics && (
                                    <span className="font-mono">
                                        Last sync · {new Date(metrics.updatedAt).toLocaleString()}
                                    </span>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
