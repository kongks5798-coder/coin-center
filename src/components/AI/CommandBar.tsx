"use client";

import { useState } from "react";

export function CommandBar() {
    const [input, setInput] = useState("FIELD NINE와 KAUS를 30초 안에 설명해줘");
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState<string | null>(null);

    const presetPrompts = [
        "오늘 FIELD NINE 상황을 요약해줘",
        "KAUS 담보 구조를 투자자 기준으로 설명해줘",
        "실물 물류와 온체인 데이터를 어떻게 연결하는지 설명해줘",
    ];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        setAnswer(null);
        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input }),
            });
            const json = await res.json();
            setAnswer(json.answer ?? "응답을 불러오지 못했습니다.");
        } catch (err) {
            console.error(err);
            setAnswer("오류가 발생했습니다. 나중에 다시 시도해 주세요.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center pb-6">
            <div className="w-full max-w-3xl px-4">
                <div className="rounded-2xl border border-slate-800 bg-black/80 p-3 shadow-2xl shadow-black/80 backdrop-blur">
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-2 text-sm"
                    >
                        <span className="hidden rounded-full border border-field-accent-soft px-2 py-1 text-[11px] text-field-accent sm:inline">
                            NEXUS · AI
                        </span>
                        <input
                            className="flex-1 bg-transparent text-xs text-slate-100 outline-none placeholder:text-slate-500"
                            placeholder="FIELD NINE와 KAUS에 뭐든 물어보세요…"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-full bg-field-accent px-3 py-1 text-[11px] font-semibold text-slate-900 disabled:opacity-60"
                        >
                            {loading ? "생각 중…" : "질문"}
                        </button>
                    </form>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {presetPrompts.map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setInput(p)}
                                className="rounded-full border border-slate-700 px-2.5 py-1 text-[11px] text-slate-300 hover:border-field-accent-soft hover:text-field-accent"
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    {answer && (
                        <div className="mt-3 max-h-48 overflow-y-auto rounded-lg bg-slate-900/70 p-3 text-[11px] leading-relaxed text-slate-200">
                            {answer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

