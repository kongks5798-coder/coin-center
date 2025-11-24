import { Section } from "@/components/ui/Section";

export default function CompanyPage() {
    return (
        <div className="pb-16 pt-10">
            <Section
                eyebrow="Company"
                title="팀 & 회사"
                description="FIELD NINE & KAUS를 설계·운영하는 팀입니다."
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3 text-sm text-slate-300">
                        <p>
                            우리는 물류 인프라, 핀테크, Web3, AI 엔지니어링 경험을 가진 팀으로
                            구성되어 있습니다. 목표는 단순한 창고 운영이 아니라, 실물 세계를
                            온체인 금융 인프라로 연결하는 것입니다.
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-200">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Contact
                        </p>
                        <p className="mt-2 text-[12px] text-slate-300">
                            IR / Partnership / Media 문의는 아래 이메일로 연락 가능합니다.
                        </p>
                        <p className="mt-2 text-[12px] font-semibold text-field-accent">
                            contact@fieldnine.io
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
}

