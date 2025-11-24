import { Section } from "@/components/ui/Section";

export default function LivePage() {
    return (
        <div className="pb-16 pt-10">
            <Section
                eyebrow="Live"
                title="FIELD NINE & KAUS Live Dashboard"
                description="아래 값은 예시이며, 실제 WMS·온체인 데이터로 연결됩니다."
            >
                <div className="grid gap-4 md:grid-cols-4">
                    <Card label="Facility Status" value="ONLINE" />
                    <Card label="Utilization" value="83%" />
                    <Card label="오늘 처리량" value="3,214 orders" />
                    <Card label="KAUS 담보 비율" value="132%" />
                </div>
            </Section>

            <Section
                eyebrow="Ops"
                title="Operations Overview (예시)"
                description="시간대별 처리량, 인바운드/아웃바운드 비율 등을 그래프로 시각화할 수 있습니다."
            >
                <div className="h-48 rounded-xl border border-dashed border-slate-800 bg-slate-950/80 text-center text-xs text-slate-500">
                    <div className="mt-20">
                        여기에 시간대별 처리량 차트 컴포넌트를 추가하면 됩니다.
                    </div>
                </div>
            </Section>
        </div>
    );
}

function Card({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-xs">
            <p className="text-[11px] text-slate-400">{label}</p>
            <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
        </div>
    );
}

