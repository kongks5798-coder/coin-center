export function Footer() {
    return (
        <footer className="border-t border-slate-900 bg-black/60">
            <div className="container-page flex flex-col gap-2 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} FIELD NINE &amp; KAUS. All rights reserved.</p>
                <p className="text-[11px]">
                    Physical AI Computing Infrastructure · Real-World Assets · DePIN
                </p>
            </div>
        </footer>
    );
}

