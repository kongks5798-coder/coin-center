import { Section } from "@/components/ui/Section";

export default function ProtocolPage() {
    return (
        <div className="pb-16 pt-10">
            <Section
                eyebrow="Digital Layer"
                title="KAUS RWA · DePIN 프로토콜"
                description="KAUS는 FIELD NINE의 실물 자산과 공간, 계약 구조를 온체인으로 전환하는 디지털 레이어입니다."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3 text-sm text-slate-300">
                        <p>
                            KAUS는 실물 재고, 계약, 공간 등 물류 인프라에서 발생하는 가치를
                            토큰화하는 RWA·DePIN 프로토콜입니다. 모든 발행·소각·수익
                            분배는 온체인에서 추적 가능합니다.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-200">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Collateral Model (예시 구조)
                        </p>
                        <ul className="mt-3 space-y-1.5">
                            <li>· 실물 재고 및 공간 가치 기반 담보</li>
                            <li>· 초과 담보 비율: 예: 130%+ 목표</li>
                            <li>· 이벤트 기반 발행/소각 트리거 (입출고·검수 등)</li>
                            <li>· 온체인 상 Audit 및 리포트 제공</li>
                        </ul>
                    </div>
                </div>
            </Section>

            <Section
                eyebrow="Flow"
                title="발행·소각 사이클"
                description="실물 이벤트와 온체인 발행·소각 사이를 연결하는 사이클을 정의합니다."
            >
                <div className="grid gap-4 md:grid-cols-4 text-[13px] text-slate-300">
                    <Cycle
                        title="실물 이벤트"
                        desc="입고·출고·검수·보관 상태 변경 등 WMS 이벤트."
                    />
                    <Cycle
                        title="평가 & 리스크"
                        desc="AI가 재고 가치와 리스크를 평가해 담보 가능 범위를 산출."
                    />
                    <Cycle
                        title="KAUS 발행/소각"
                        desc="담보 한도 내에서 KAUS를 발행·소각. 모든 기록은 온체인."
                    />
                    <Cycle
                        title="모니터링"
                        desc="담보 비율, 유통량, 수익 배분 내역을 콘솔과 익스플로러에서 확인."
                    />
                </div>
            </Section>
        </div>
    );
}

function Cycle({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
            <p className="text-xs font-semibold text-slate-100">{title}</p>
            <p className="mt-1 text-[12px] text-slate-300">{desc}</p>
        </div>
    );
}

