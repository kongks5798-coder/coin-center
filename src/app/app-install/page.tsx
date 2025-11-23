'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AppInstallPage() {
    const [isIOS, setIsIOS] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;
        
        // iOS 감지
        if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            setIsIOS(true);
        }
        // Android 감지
        else if (/android/i.test(userAgent)) {
            setIsAndroid(true);
        }
        // 데스크톱 감지
        else {
            setIsDesktop(true);
        }
    }, []);

    return (
        <div className="fixed inset-0 bg-black text-white overflow-auto relative">
            <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-12">
                        <div className="text-9xl mb-6">📱</div>
                        <h1 className="text-6xl md:text-8xl font-black mb-6">
                            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                KAUS 앱 설치
                            </span>
                        </h1>
                        <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
                            모바일과 데스크톱에서 KAUS 앱을 설치하고<br />
                            언제 어디서나 채굴하세요!
                        </p>
                    </div>

                    {/* 설치 가이드 */}
                    <div className="space-y-8 mb-12">
                        {/* iOS */}
                        {isIOS && (
                            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h2 className="text-3xl font-bold text-purple-400 mb-6">📱 iOS (iPhone/iPad) 설치 방법</h2>
                                <div className="space-y-4 text-left max-w-2xl mx-auto">
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-purple-400">1</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">Safari 브라우저 열기</div>
                                            <div className="text-gray-300">Chrome이 아닌 Safari 브라우저를 사용해주세요</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-purple-400">2</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">공유 버튼 클릭</div>
                                            <div className="text-gray-300">화면 하단의 공유 버튼 (□↑)을 누르세요</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-purple-400">3</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">홈 화면에 추가</div>
                                            <div className="text-gray-300">"홈 화면에 추가" 옵션을 선택하세요</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-purple-400">4</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">설치 완료</div>
                                            <div className="text-gray-300">홈 화면에서 KAUS 앱을 실행하세요!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Android */}
                        {isAndroid && (
                            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h2 className="text-3xl font-bold text-green-400 mb-6">🤖 Android 설치 방법</h2>
                                <div className="space-y-4 text-left max-w-2xl mx-auto">
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-green-400">1</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">Chrome 브라우저 열기</div>
                                            <div className="text-gray-300">Chrome 브라우저에서 사이트를 열어주세요</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-green-400">2</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">설치 프롬프트 확인</div>
                                            <div className="text-gray-300">화면에 나타나는 "앱 설치" 팝업을 확인하세요</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-green-400">3</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">설치 버튼 클릭</div>
                                            <div className="text-gray-300">"설치" 버튼을 눌러주세요</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-green-400">4</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">설치 완료</div>
                                            <div className="text-gray-300">홈 화면에서 KAUS 앱을 실행하세요!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Desktop */}
                        {isDesktop && (
                            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h2 className="text-3xl font-bold text-blue-400 mb-6">💻 데스크톱 (Windows/Mac) 설치 방법</h2>
                                <div className="space-y-4 text-left max-w-2xl mx-auto">
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-blue-400">1</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">Chrome/Edge 브라우저 사용</div>
                                            <div className="text-gray-300">Chrome 또는 Edge 브라우저를 사용해주세요</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-blue-400">2</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">주소창 아이콘 확인</div>
                                            <div className="text-gray-300">주소창 오른쪽에 설치 아이콘 (➕)이 나타납니다</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-blue-400">3</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">설치 클릭</div>
                                            <div className="text-gray-300">설치 아이콘을 클릭하고 "설치"를 선택하세요</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl font-black text-blue-400">4</div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">설치 완료</div>
                                            <div className="text-gray-300">바로가기에서 KAUS 앱을 실행하세요!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 앱 기능 소개 */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="text-5xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold text-white mb-2">오프라인 채굴</h3>
                            <p className="text-gray-300 text-sm">인터넷이 없어도 앱에서 채굴할 수 있습니다</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="text-5xl mb-4">🔔</div>
                            <h3 className="text-xl font-bold text-white mb-2">푸시 알림</h3>
                            <p className="text-gray-300 text-sm">채굴 완료, 보상 획득 등 실시간 알림</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="text-5xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold text-white mb-2">빠른 접근</h3>
                            <p className="text-gray-300 text-sm">홈 화면에서 한 번에 접근</p>
                        </div>
                    </div>

                    {/* 링크 */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/activity-mining"
                            className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-green-500/50"
                        >
                            활동 기반 채굴 시작하기
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                        >
                            홈으로 돌아가기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

