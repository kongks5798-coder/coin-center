import { Section } from "@/components/ui/Section";

export default function ConsolePage() {
    return (
        <div className="pb-16 pt-10">
            <Section
                eyebrow="Console"
                title="FIELD NINE · KAUS Console"
                description="실물 자산, KAUS 상태, 리스크와 수익 구조를 하나의 콘솔에서 확인할 수 있습니다."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3 text-sm text-slate-300">
                        <p>
                            콘솔에서는 재고·공간·KAUS 발행 상태를 실시간으로 모니터링하고,
                            기간별 처리량과 담보 비율을 분석할 수 있습니다.
                        </p>
                    </div>
                    <div className="h-40 rounded-xl border border-dashed border-slate-800 bg-slate-950/80 text-center text-xs text-slate-500">
                        <div className="mt-16">
                            여기에는 실제 콘솔 UI 스크린샷 또는 임시 목업을 넣으면 됩니다.
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-200">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Console Access
                    </p>
                    <p className="mt-2 text-[12px] text-slate-300">
                        콘솔 데모를 원하시면 아래 정보를 포함해 contact@fieldnine.io로
                        연락 주세요.
                    </p>
                    <ul className="mt-2 text-[12px] text-slate-300">
                        <li>· 회사명 / 담당자 성함</li>
                        <li>· 담당 역할 (IR, 전략, 물류, 재무 등)</li>
                        <li>· 월간 예상 물동량 또는 물류 규모</li>
                    </ul>
                </div>
            </Section>
        </div>
    );
}

