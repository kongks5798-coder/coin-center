'use client';

import KAUSAIChat from '@/components/Nexus/KAUSAIChat';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-[#E0E0E0] relative">
            {/* KAUS AI Chat - Gemini Style Center Layout */}
            <KAUSAIChat />
        </div>
    );
}
