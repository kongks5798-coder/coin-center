'use client';

import LiveTicker from '@/components/Nexus/LiveTicker';
import HeroSection from '@/components/Nexus/HeroSection';
import FeatureGrid from '@/components/Nexus/FeatureGrid';
import KAUSAIChat from '@/components/Nexus/KAUSAIChat';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-[#E0E0E0] relative">
            {/* Live Ticker */}
            <LiveTicker />
            
            {/* Hero Section */}
            <HeroSection />
            
            {/* Feature Grid */}
            <FeatureGrid />
            
            {/* KAUS AI Chat */}
            <KAUSAIChat />
        </div>
    );
}
