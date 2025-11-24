import { Section } from "@/components/ui/Section";

export default function DocsPage() {
    return (
        <div className="pb-16 pt-10">
            <Section
                eyebrow="Docs"
                title="문서 & 데이터 룸"
                description="투자자와 파트너를 위한 핵심 문서를 한 곳에서 제공합니다."
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <DocCard title="Investor One-Pager" status="준비 중" />
                    <DocCard title="KAUS Litepaper" status="준비 중" />
                    <DocCard title="스마트컨트랙트 Audit 리포트" status="준비 중" />
                    <DocCard title="재무/운영 리포트 (데이터 룸)" status="Access 요청 필요" />
                </div>
            </Section>
        </div>
    );
}

function DocCard({ title, status }: { title: string; status: string }) {
    return (
        <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm">
            <p className="font-semibold text-slate-100">{title}</p>
            <p className="mt-2 text-xs text-slate-400">{status}</p>
        </div>
    );
}

