"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="fixed inset-x-0 bottom-0 z-30 flex justify-center pb-6"
        >
            <div className="w-full max-w-3xl px-4">
                <div className="glass rounded-2xl p-4 shadow-2xl">
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-3 text-sm"
                    >
                        <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#00FF94] font-mono sm:inline">
                            NEXUS · AI
                        </span>
                        <input
                            className="flex-1 bg-transparent text-sm text-white/90 outline-none placeholder:text-white/40 font-inter"
                            placeholder="FIELD NINE와 KAUS에 뭐든 물어보세요…"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full bg-[#00FF94] px-4 py-1.5 text-xs font-semibold text-black disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:bg-[#00FF94]/80 font-inter"
                        >
                            {loading ? "생각 중…" : "질문"}
                        </motion.button>
                    </form>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {presetPrompts.map((p, index) => (
                            <motion.button
                                key={p}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                                type="button"
                                onClick={() => setInput(p)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 hover:border-[#00FF94]/50 hover:text-[#00FF94] hover:bg-white/10 transition-all duration-300 font-inter"
                            >
                                {p}
                            </motion.button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {answer && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 max-h-48 overflow-y-auto rounded-xl bg-white/5 p-4 text-xs leading-relaxed text-white/80 font-inter"
                            >
                                {answer}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
