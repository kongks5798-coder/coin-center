'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // 이미 설치되어 있는지 확인
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
            return;
        }

        // 설치 프롬프트 이벤트 리스너
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // 설치 완료 이벤트
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
            setShowPrompt(false);
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('앱 설치 승인됨');
        } else {
            console.log('앱 설치 거부됨');
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        // 24시간 후 다시 표시 (localStorage 사용)
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    };

    // 24시간 내에 닫았으면 표시하지 않음
    useEffect(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed) {
            const dismissedTime = parseInt(dismissed);
            const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60);
            if (hoursSinceDismissed < 24) {
                setShowPrompt(false);
            }
        }
    }, []);

    if (isInstalled || !showPrompt || !deferredPrompt) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
            <div className="bg-gradient-to-br from-green-500/90 via-cyan-500/90 to-blue-500/90 backdrop-blur-xl border-2 border-green-400/50 rounded-2xl p-6 shadow-2xl shadow-green-500/50">
                <div className="flex items-start gap-4">
                    <div className="text-4xl">📱</div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">KAUS 앱 설치</h3>
                        <p className="text-sm text-white/90 mb-4">
                            앱을 설치하면 홈 화면에서 바로 접근하고 오프라인에서도 채굴할 수 있습니다!
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleInstall}
                                className="flex-1 px-4 py-2 bg-white text-green-600 rounded-xl font-bold text-sm hover:scale-105 transition-all"
                            >
                                설치하기
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="px-4 py-2 bg-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/30 transition-all"
                            >
                                나중에
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="text-white/80 hover:text-white text-xl"
                    >
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
}

