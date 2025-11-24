import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-black via-[#020617] to-black">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}

