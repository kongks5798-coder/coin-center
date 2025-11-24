import Link from "next/link";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/facility", label: "Facility" },
    { href: "/protocol", label: "Protocol" },
    { href: "/live", label: "Live" },
    { href: "/docs", label: "Docs" },
    { href: "/company", label: "Company" },
    { href: "/console", label: "Console" },
];

export function Header() {
    return (
        <header className="border-b border-slate-800 bg-black/40 backdrop-blur">
            <div className="container-page flex h-14 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-sm bg-field-accent-soft" />
                    <span className="text-sm font-semibold tracking-wide">
                        FIELD NINE · KAUS
                    </span>
                </Link>
                <nav className="hidden gap-6 text-xs font-medium text-slate-300 sm:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-field-accent"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}

