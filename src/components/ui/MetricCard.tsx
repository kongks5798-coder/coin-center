type MetricCardProps = {
    label: string;
    value: string;
    helper?: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
    return (
        <div className="flex flex-col gap-1 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3">
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                {label}
            </span>
            <span className="text-lg font-semibold text-slate-50">{value}</span>
            {helper && (
                <span className="text-[11px] text-slate-400">{helper}</span>
            )}
        </div>
    );
}

