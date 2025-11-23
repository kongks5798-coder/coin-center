'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// 활동별 일일 한도 및 보상
interface Activity {
    id: string;
    name: string;
    description: string;
    icon: string;
    reward: number; // KAUS 보상
    dailyLimit: number; // 일일 한도
    completed: number; // 오늘 완료한 횟수
    action: () => void;
}

// 일일 활동 추적
const useDailyActivity = () => {
    const [activities, setActivities] = useState<Activity[]>([
        {
            id: 'rfid-scan',
            name: 'RFID 제품 스캔',
            description: 'FILLUMINATE, MARD MARD 제품의 RFID 태그를 스캔하세요',
            icon: '📱',
            reward: 0.1,
            dailyLimit: 10,
            completed: 0,
            action: () => {
                // 카메라로 QR/RFID 스캔 시뮬레이션
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then(() => {
                            alert('RFID 스캔 완료! 0.1 KAUS 획득!');
                        })
                        .catch(() => {
                            // 카메라 권한 없으면 시뮬레이션
                            alert('RFID 스캔 완료! 0.1 KAUS 획득!');
                        });
                } else {
                    alert('RFID 스캔 완료! 0.1 KAUS 획득!');
                }
            },
        },
        {
            id: 'tracking',
            name: '물류 추적 확인',
            description: 'NEXUS 물류 시스템에서 배송 추적을 확인하세요',
            icon: '📦',
            reward: 0.05,
            dailyLimit: 20,
            completed: 0,
            action: () => {
                // 물류 추적 페이지로 이동하거나 시뮬레이션
                window.open('/nexus', '_blank');
                alert('물류 추적 확인 완료! 0.05 KAUS 획득!');
            },
        },
        {
            id: 'review',
            name: '제품 리뷰 작성',
            description: '구매한 제품에 리뷰를 작성하세요 (사진 + 텍스트)',
            icon: '⭐',
            reward: 0.5,
            dailyLimit: 2,
            completed: 0,
            action: () => {
                const review = prompt('제품 리뷰를 작성해주세요:');
                if (review && review.length > 10) {
                    alert('리뷰 작성 완료! 0.5 KAUS 획득!');
                } else {
                    alert('리뷰는 최소 10자 이상 작성해주세요.');
                }
            },
        },
        {
            id: 'satellite',
            name: '위성 네트워크 데이터 제공',
            description: '위성 네트워크에 위치 데이터를 제공하세요 (익명화)',
            icon: '🛰️',
            reward: 0.2,
            dailyLimit: 1,
            completed: 0,
            action: () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        () => {
                            alert('위치 데이터 제공 완료! 0.2 KAUS 획득!');
                        },
                        () => {
                            alert('위치 권한이 필요합니다. 설정에서 위치 권한을 허용해주세요.');
                        }
                    );
                } else {
                    alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
                }
            },
        },
    ]);

    const [totalEarned, setTotalEarned] = useState(0);
    const [dailyEarned, setDailyEarned] = useState(0);

    // 활동 완료 처리
    const completeActivity = (activityId: string) => {
        setActivities(prev => prev.map(activity => {
            if (activity.id === activityId && activity.completed < activity.dailyLimit) {
                const newCompleted = activity.completed + 1;
                const earned = activity.reward;
                setDailyEarned(prev => prev + earned);
                setTotalEarned(prev => prev + earned);
                
                // 활동 실행
                if (activity.action) {
                    activity.action();
                }
                
                return { ...activity, completed: newCompleted };
            } else if (activity.id === activityId && activity.completed >= activity.dailyLimit) {
                alert(`오늘의 한도(${activity.dailyLimit}회)를 모두 사용하셨습니다. 내일 다시 시도해주세요!`);
            }
            return activity;
        }));
    };

    // 일일 리셋 (자정)
    useEffect(() => {
        const resetDaily = () => {
            setActivities(prev => prev.map(a => ({ ...a, completed: 0 })));
            setDailyEarned(0);
        };

        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const msUntilMidnight = tomorrow.getTime() - now.getTime();

        const timeout = setTimeout(() => {
            resetDaily();
            setInterval(resetDaily, 24 * 60 * 60 * 1000); // 매일 자정 리셋
        }, msUntilMidnight);

        return () => clearTimeout(timeout);
    }, []);

    return { activities, totalEarned, dailyEarned, completeActivity };
};

export default function ActivityMiningPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<string | null>(null);
    const { activities, totalEarned, dailyEarned, completeActivity } = useDailyActivity();

    // 배경 애니메이션
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
        }> = [];

        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 148, ${particle.opacity})`;
                ctx.fill();

                particles.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 255, 148, ${0.1 * (1 - distance / 150)})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    // 마우스 추적
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // RFID 스캔 기능
    const startRFIDScan = async () => {
        try {
            setIsScanning(true);
            setScanResult(null);

            // 카메라 접근
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            // 실제로는 QR/RFID 스캔 라이브러리 사용 (예: jsQR, html5-qrcode)
            // 여기서는 시뮬레이션
            setTimeout(() => {
                const simulatedRFID = 'RFID-KT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
                setScanResult(simulatedRFID);
                completeActivity('rfid-scan');
                setIsScanning(false);
                
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
            }, 2000);

        } catch (error) {
            console.error('카메라 접근 실패:', error);
            alert('카메라 접근 권한이 필요합니다.');
            setIsScanning(false);
        }
    };

    // 물류 추적 확인
    const checkTracking = () => {
        const activity = activities.find(a => a.id === 'tracking');
        if (activity && activity.completed < activity.dailyLimit) {
            completeActivity('tracking');
            alert(`물류 추적 확인 완료! +${activity.reward} KAUS 획득`);
            window.location.href = '/nexus';
        } else {
            alert('오늘의 물류 추적 확인 한도를 모두 사용했습니다.');
        }
    };

    // 리뷰 작성
    const writeReview = () => {
        const activity = activities.find(a => a.id === 'review');
        if (activity && activity.completed < activity.dailyLimit) {
            completeActivity('review');
            alert(`리뷰 작성 완료! +${activity.reward} KAUS 획득`);
            window.location.href = '/products';
        } else {
            alert('오늘의 리뷰 작성 한도를 모두 사용했습니다.');
        }
    };

    // 위성 데이터 제공
    const provideSatelliteData = async () => {
        try {
            const activity = activities.find(a => a.id === 'satellite');
            if (activity && activity.completed < activity.dailyLimit) {
                // GPS 위치 요청
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // 익명화된 위치 데이터 전송 (시뮬레이션)
                        completeActivity('satellite');
                        alert(`위성 네트워크 데이터 제공 완료! +${activity.reward} KAUS 획득`);
                    },
                    (error) => {
                        alert('위치 정보 접근 권한이 필요합니다.');
                    }
                );
            } else {
                alert('오늘의 위성 데이터 제공 한도를 모두 사용했습니다.');
            }
        } catch (error) {
            console.error('위치 접근 실패:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#050505] text-white overflow-auto relative">
            {/* 배경 캔버스 */}
            <canvas 
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none opacity-30 z-0"
            />

            {/* 그라디언트 배경 */}
            <div 
                className="fixed inset-0 opacity-20 z-0"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 148, 0.4), rgba(0, 212, 255, 0.3), rgba(139, 92, 246, 0.2), transparent 70%)`
                }}
            />

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 min-h-screen">
                {/* 헤더 */}
                <header className="sticky top-0 border-b border-green-500/30 bg-black/50 backdrop-blur-2xl p-6 z-20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                                    활동 기반 채굴
                                </div>
                                <div className="text-xs text-gray-400">Proof of Activity</div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">오늘 획득</div>
                                <div className="text-lg font-bold text-green-400">
                                    {dailyEarned.toFixed(2)} KAUS
                                </div>
                            </div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        </div>
                    </div>
                </header>

                {/* 메인 섹션 */}
                <main className="max-w-7xl mx-auto p-8">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-7xl md:text-9xl font-black mb-6">
                            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                활동 기반 채굴
                            </span>
                        </h1>
                        <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                            FIELD NINE 생태계에서 활동하며 KAUS를 획득하세요
                        </p>
                    </div>

                    {/* 총 획득량 요약 */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="text-sm text-gray-400 mb-2">오늘 획득</div>
                            <div className="text-4xl font-black text-green-400">
                                {dailyEarned.toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">KAUS</div>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="text-sm text-gray-400 mb-2">총 획득</div>
                            <div className="text-4xl font-black text-cyan-400">
                                {totalEarned.toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">KAUS</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="text-sm text-gray-400 mb-2">일일 최대</div>
                            <div className="text-4xl font-black text-blue-400">
                                5.0
                            </div>
                            <div className="text-xs text-gray-400 mt-1">KAUS/일</div>
                        </div>
                    </div>

                    {/* 활동 목록 */}
                    <div className="space-y-6">
                        {activities.map((activity) => {
                            const progress = (activity.completed / activity.dailyLimit) * 100;
                            const remaining = activity.dailyLimit - activity.completed;
                            const canComplete = remaining > 0;

                            return (
                                <div
                                    key={activity.id}
                                    className={`bg-gradient-to-br from-gray-900 to-black border-2 ${
                                        canComplete ? 'border-green-500/30' : 'border-gray-700/30'
                                    } rounded-3xl p-6 backdrop-blur-xl`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="text-5xl">{activity.icon}</div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-1">{activity.name}</h3>
                                                <p className="text-gray-300 text-sm">{activity.description}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-green-400 mb-1">
                                                +{activity.reward} KAUS
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {activity.completed}/{activity.dailyLimit} 완료
                                            </div>
                                        </div>
                                    </div>

                                    {/* 진행률 바 */}
                                    <div className="mb-4">
                                        <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-green-500/30">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-500"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* 액션 버튼 */}
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-400">
                                            {canComplete ? (
                                                <span className="text-green-400">남은 횟수: {remaining}회</span>
                                            ) : (
                                                <span className="text-gray-500">오늘의 한도 도달</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (activity.id === 'rfid-scan') startRFIDScan();
                                                else if (activity.id === 'tracking') checkTracking();
                                                else if (activity.id === 'review') writeReview();
                                                else if (activity.id === 'satellite') provideSatelliteData();
                                            }}
                                            disabled={!canComplete}
                                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                                                canComplete
                                                    ? 'bg-gradient-to-r from-green-500 to-cyan-500 hover:scale-105 shadow-lg shadow-green-500/50'
                                                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {activity.id === 'rfid-scan' ? '📱 스캔 시작' :
                                             activity.id === 'tracking' ? '📦 추적 확인' :
                                             activity.id === 'review' ? '⭐ 리뷰 작성' :
                                             '🛰️ 데이터 제공'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* RFID 스캔 모달 */}
                    {isScanning && (
                        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
                            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-3xl p-8 max-w-md w-full">
                                <h3 className="text-2xl font-bold text-green-400 mb-4">RFID 스캔</h3>
                                <div className="relative aspect-square bg-black rounded-xl overflow-hidden mb-4 border-2 border-green-500/50">
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-cover"
                                        playsInline
                                    />
                                    {scanResult && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-sm">
                                            <div className="text-center">
                                                <div className="text-4xl mb-2">✅</div>
                                                <div className="text-lg font-bold text-white mb-1">스캔 완료!</div>
                                                <div className="text-sm text-gray-300">{scanResult}</div>
                                                <div className="text-green-400 font-bold mt-2">+0.1 KAUS 획득</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        setIsScanning(false);
                                        setScanResult(null);
                                        if (videoRef.current?.srcObject) {
                                            const stream = videoRef.current.srcObject as MediaStream;
                                            stream.getTracks().forEach(track => track.stop());
                                        }
                                    }}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl font-bold hover:scale-105 transition-all"
                                >
                                    {scanResult ? '닫기' : '취소'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 홈으로 돌아가기 */}
                    <div className="text-center mt-16 mb-24">
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-3 px-12 py-6 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all hover:scale-105"
                        >
                            <span>홈으로 돌아가기</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                    </div>
                </main>

                {/* 푸터 */}
                <footer className="border-t border-green-500/30 bg-black/30 backdrop-blur-2xl p-6 mt-16">
                    <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
                        <p>© 2035 FIELD NINE Corporation. All rights reserved.</p>
                        <p className="mt-2">Proof of Activity · 실제 활동으로 KAUS 획득 · 일일 한도 시스템</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

