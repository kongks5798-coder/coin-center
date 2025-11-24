import { Section } from "@/components/ui/Section";
import { MetricCard } from "@/components/ui/MetricCard";
import { CommandBar } from "@/components/ai/CommandBar";

export default function HomePage() {
    return (
        <div className="relative pb-24">
            <HeroSection />
            <ThreePillarsSection />
            <MetricsSection />
            <HowItWorksSection />
            <CommandBar />
        </div>
    );
}

function HeroSection() {
    return (
        <section className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),_black_75%)]" />
            <div className="container-page relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center">
                {/* 왼쪽 텍스트 */}
                <div className="max-w-xl space-y-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-field-accent">
                        Physical AI Computing Infrastructure
                    </p>
                    <h1 className="text-2xl font-semibold leading-snug sm:text-3xl lg:text-4xl">
                        현실의 창고를,
                        <br />
                        실시간 유동화 가능한 인프라로.
                    </h1>
                    <p className="text-sm leading-relaxed text-slate-300">
                        FIELD NINE는 5,000평 자동화 물류 허브와 KAUS 프로토콜을 결합해
                        실물 자산을 DePIN·RWA로 전환하는{" "}
                        <span className="font-semibold text-field-accent">
                            Physical AI Computing Infrastructure
                        </span>
                        입니다.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                        <span className="rounded-full border border-slate-700 px-2 py-1">
                            DePIN · RWA
                        </span>
                        <span className="rounded-full border border-slate-700 px-2 py-1">
                            AI Vision · Generative UI
                        </span>
                        <span className="rounded-full border border-slate-700 px-2 py-1">
                            Logistics · On-chain
                        </span>
                    </div>
                </div>

                {/* 오른쪽: 3D/비주얼 자리 */}
                <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-0 blur-3xl">
                        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.24),_transparent_60%)]" />
                    </div>
                    <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-black/90 to-slate-900/80 p-4 shadow-2xl shadow-black/80">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>Reality Scan · FIELD NINE Hub</span>
                            <span>KAUS Liquidity</span>
                        </div>
                        <div className="mt-3 h-52 rounded-2xl border border-dashed border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.35),_transparent_60%)] bg-slate-950/90" />
                        <p className="mt-3 text-[11px] text-slate-400">
                            실제 컨테이너·팔레트·로봇의 움직임이 데이터로 스캔되고, KAUS
                            유동성 그래프로 변환됩니다. 이 블록은 R3F/WebGL로 교체하면
                            됩니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ThreePillarsSection() {
    return (
        <Section
            eyebrow="Architecture"
            title="Physical · Digital · Intelligence, 세 개의 레이어"
            description="FIELD NINE는 실물 물류 허브, KAUS 온체인 프로토콜, 그리고 AI 콘솔 세 개의 레이어로 설계된 인프라입니다."
        >
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <p className="text-xs font-semibold text-slate-200">
                        Physical · FIELD NINE Hub
                    </p>
                    <p className="mt-2 text-[13px] text-slate-300">
                        5,000평 규모의 자동화 물류 허브. 로봇, 컨베이어, 비전 시스템이
                        모든 입·출고 이벤트를 캡처합니다.
                    </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <p className="text-xs font-semibold text-slate-200">
                        Digital · KAUS Protocol
                    </p>
                    <p className="mt-2 text-[13px] text-slate-300">
                        실물 재고·공간·계약을 온체인으로 매핑하는 RWA·DePIN 토큰
                        레이어입니다.
                    </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <p className="text-xs font-semibold text-slate-200">
                        Intelligence · AI Console
                    </p>
                    <p className="mt-2 text-[13px] text-slate-300">
                        실시간 데이터와 온체인 상태를 하나의 콘솔에서 질의·분석할 수 있는
                        운영·투자자용 인터페이스입니다.
                    </p>
                </div>
            </div>
        </Section>
    );
}

function MetricsSection() {
    return (
        <Section
            eyebrow="Snapshot"
            title="FIELD NINE & KAUS, 한눈에 보는 스냅샷"
            description="아래 값은 예시이며, 실제 운영 데이터로 교체됩니다."
        >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    label="Facility Size"
                    value="5,000평"
                    helper="자동화 물류 허브 면적"
                />
                <MetricCard
                    label="Automation Coverage"
                    value="80%+"
                    helper="로봇·AI가 커버하는 프로세스 비율"
                />
                <MetricCard
                    label="Tokenizable Assets"
                    value="XX억+"
                    helper="담보로 전환 가능한 실물 자산 규모"
                />
                <MetricCard
                    label="Target Collateral"
                    value="130%+"
                    helper="KAUS 담보 비율 목표"
                />
            </div>
        </Section>
    );
}

function HowItWorksSection() {
    return (
        <Section
            eyebrow="How It Works"
            title="Atom → Bit → Asset, 실물에서 온체인까지"
            description="물류 센터의 모든 움직임은 이벤트 스트림으로 기록되고, AI에 의해 평가된 뒤 KAUS 자산 구조로 전환됩니다."
        >
            <div className="grid gap-4 md:grid-cols-3">
                <Step
                    step="01"
                    title="Atom · 실물 이벤트"
                    desc="입고, 보관, 피킹, 출고가 물리적인 허브 안에서 발생합니다. 모든 과정은 센서·비전으로 캡처됩니다."
                />
                <Step
                    step="02"
                    title="Bit · 데이터 & 평가"
                    desc="캡처된 이벤트는 스트림 데이터로 전환되고, AI 모델이 리스크와 가치를 실시간으로 평가합니다."
                />
                <Step
                    step="03"
                    title="Asset · KAUS 온체인"
                    desc="평가된 자산은 KAUS 형태로 온체인에 발행되며, 담보 구조와 이력은 누구나 검증 가능합니다."
                />
            </div>
        </Section>
    );
}

function Step({
    step,
    title,
    desc,
}: {
    step: string;
    title: string;
    desc: string;
}) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-field-accent">
                {step}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-100">{title}</p>
            <p className="mt-2 text-[13px] text-slate-300">{desc}</p>
        </div>
    );
}
