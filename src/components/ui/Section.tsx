type SectionProps = {
    id?: string;
    eyebrow?: string;
    title: string;
    description?: string;
    children?: React.ReactNode;
};

export function Section({
    id,
    eyebrow,
    title,
    description,
    children,
}: SectionProps) {
    return (
        <section id={id} className="py-12 sm:py-16 lg:py-20">
            <div className="container-page">
                <div className="max-w-3xl">
                    {eyebrow && (
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-field-accent">
                            {eyebrow}
                        </p>
                    )}
                    <h2 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-300">
                            {description}
                        </p>
                    )}
                </div>
                {children && <div className="mt-8">{children}</div>}
            </div>
        </section>
    );
}

