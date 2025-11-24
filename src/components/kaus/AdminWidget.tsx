"use client";

import { useEffect, useState } from "react";

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
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="fixed bottom-6 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-field-accent-soft bg-black/80 text-[11px] font-semibold text-field-accent shadow-xl shadow-black/70 backdrop-blur hover:border-field-accent md:right-6"
            >
                KAUS
            </button>

            {/* 패널 */}
            {open && (
                <div className="fixed bottom-20 right-4 z-40 w-80 rounded-xl border border-slate-800 bg-black/90 p-4 text-xs text-slate-100 shadow-2xl shadow-black/80 backdrop-blur md:right-6">
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-field-accent">
                                KAUS ADMIN
                            </p>
                            <p className="mt-1 text-[11px] text-slate-400">
                                실물 허브 &amp; 온체인 상태 스냅샷
                            </p>
                        </div>
                        <button
                            className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-400 hover:border-slate-500"
                            onClick={() => setOpen(false)}
                            type="button"
                        >
                            닫기
                        </button>
                    </div>

                    <div className="space-y-2 text-[11px]">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Facility</span>
                            <span className="font-medium text-slate-100">
                                {metrics ? metrics.facilityStatus.toUpperCase() : "LOADING"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Utilization</span>
                            <span className="font-medium">
                                {utilizationPercent !== null ? `${utilizationPercent}%` : "–"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Today Orders</span>
                            <span className="font-medium">
                                {metrics ? metrics.todayOrders.toLocaleString() : "–"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">KAUS Collateral</span>
                            <span className="font-medium text-field-accent">
                                {collateralPercent !== null ? `${collateralPercent}%` : "–"}
                            </span>
                        </div>
                        <div className="pt-2 text-[10px] text-slate-500">
                            {metrics && (
                                <span>
                                    Last sync · {new Date(metrics.updatedAt).toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

