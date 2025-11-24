import { Section } from "@/components/ui/Section";

export default function FacilityPage() {
    return (
        <div className="pb-16 pt-10">
            <Section
                eyebrow="Physical Layer"
                title="FIELD NINE 자동화 물류 허브"
                description="5,000평 규모의 자동화 물류 허브는 KAUS RWA 구조의 가장 아래 레이어를 구성합니다."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3 text-sm text-slate-300">
                        <p>
                            FIELD NINE는 도심 접근성이 좋은 입지에 설계된 자동화 물류 허브로,
                            입·출고부터 피킹, 보관, 패킹까지의 프로세스를 로봇과 AI로
                            제어합니다.
                        </p>
                        <p>
                            센서·카메라·게이트는 모든 움직임을 이벤트로 기록하고, 이
                            데이터는 KAUS 프로토콜에서 담보 자산을 검증하는 베이스 레이어가
                            됩니다.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-200">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Key Specs
                        </p>
                        <div className="mt-3 space-y-1.5">
                            <Spec label="총 면적" value="5,000평" />
                            <Spec label="층고 / 랙 높이" value="예: 10m / 7단 랙 (예시)" />
                            <Spec label="일일 처리 캐파" value="예: 00,000 주문/일 (예시)" />
                            <Spec label="자동화 커버리지" value="예: 80%+ 프로세스 자동화" />
                            <Spec label="AGV/로봇" value="예: XX대 (예시)" />
                        </div>
                    </div>
                </div>
            </Section>

            <Section
                eyebrow="Flow"
                title="Inbound → Storage → Picking → Outbound"
                description="입고부터 출고까지의 전체 프로세스에 AI와 로봇이 어디에 개입하는지 한 눈에 보여줍니다."
            >
                <div className="grid gap-4 md:grid-cols-4 text-[13px] text-slate-300">
                    <Stage title="Inbound" desc="도착, 검수, 라벨링, 적재 위치 할당." />
                    <Stage title="Storage" desc="랙/존 기반 보관, 재고 로테이션 최적화." />
                    <Stage title="Picking" desc="AI 피킹 전략, 경로 최적화, 오류 감지." />
                    <Stage title="Outbound" desc="패킹, 라벨링, 도어 할당, 출고 확정." />
                </div>
            </Section>
        </div>
    );
}

function Spec({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between text-[12px]">
            <span className="text-slate-400">{label}</span>
            <span className="text-slate-100">{value}</span>
        </div>
    );
}

function Stage({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
            <p className="text-xs font-semibold text-slate-100">{title}</p>
            <p className="mt-1 text-[12px] text-slate-300">{desc}</p>
        </div>
    );
}

