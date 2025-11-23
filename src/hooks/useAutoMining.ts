'use client';

import { useState, useEffect, useRef } from 'react';

interface MiningStats {
    cpuUsage: number;
    networkActivity: number;
    screenTime: number;
    batteryDrain: number;
    totalEarned: number;
    miningRate: number; // KAUS per hour
}

// CPU 사용량 시뮬레이션 (실제로는 Web Workers로 계산 작업 수행)
const useCPUUsage = () => {
    const [cpuUsage, setCpuUsage] = useState(0);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // Web Worker로 CPU 집약적 작업 수행
        if (typeof Worker !== 'undefined') {
            const workerCode = `
                self.onmessage = function(e) {
                    const start = Date.now();
                    // 간단한 계산 작업 (실제로는 더 복잡한 작업 가능)
                    let result = 0;
                    for (let i = 0; i < 1000000; i++) {
                        result += Math.sqrt(i) * Math.sin(i);
                    }
                    const end = Date.now();
                    self.postMessage({ time: end - start, result });
                };
            `;
            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const worker = new Worker(URL.createObjectURL(blob));
            workerRef.current = worker;

            const interval = setInterval(() => {
                worker.postMessage('start');
                worker.onmessage = (e) => {
                    // 작업 시간을 기반으로 CPU 사용량 계산 (0-100%)
                    const usage = Math.min(100, (e.data.time / 10) * 10);
                    setCpuUsage(usage);
                };
            }, 2000); // 2초마다 체크

            return () => {
                clearInterval(interval);
                worker.terminate();
            };
        } else {
            // Worker 미지원 시 시뮬레이션
            const interval = setInterval(() => {
                setCpuUsage(Math.random() * 30 + 10); // 10-40% 시뮬레이션
            }, 2000);
            return () => clearInterval(interval);
        }
    }, []);

    return cpuUsage;
};

// 네트워크 활동 감지
const useNetworkActivity = () => {
    const [networkActivity, setNetworkActivity] = useState(0);
    const [dataTransferred, setDataTransferred] = useState(0);

    useEffect(() => {
        // 네트워크 요청 모니터링
        const originalFetch = window.fetch;
        let totalBytes = 0;

        window.fetch = async (...args) => {
            const response = await originalFetch(...args);
            const clonedResponse = response.clone();
            
            clonedResponse.arrayBuffer().then(buffer => {
                totalBytes += buffer.byteLength;
                setDataTransferred(totalBytes);
                // 데이터 전송량을 기반으로 활동량 계산 (MB 단위)
                setNetworkActivity(totalBytes / (1024 * 1024));
            });

            return response;
        };

        // 주기적으로 네트워크 활동 업데이트
        const interval = setInterval(() => {
            // 실제 네트워크 활동 시뮬레이션
            setNetworkActivity(prev => Math.max(0, prev * 0.95)); // 점진적 감소
        }, 5000);

        return () => {
            window.fetch = originalFetch;
            clearInterval(interval);
        };
    }, []);

    return networkActivity;
};

// 화면 활성 시간 추적
const useScreenTime = () => {
    const [screenTime, setScreenTime] = useState(0);
    const startTime = useRef<number>(Date.now());
    const isActive = useRef<boolean>(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                isActive.current = false;
            } else {
                isActive.current = true;
                startTime.current = Date.now();
            }
        };

        const handleFocus = () => {
            isActive.current = true;
            startTime.current = Date.now();
        };

        const handleBlur = () => {
            isActive.current = false;
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        // 1초마다 화면 활성 시간 업데이트
        const interval = setInterval(() => {
            if (isActive.current && !document.hidden) {
                const elapsed = (Date.now() - startTime.current) / 1000; // 초 단위
                setScreenTime(prev => prev + elapsed);
                startTime.current = Date.now();
            }
        }, 1000);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
            clearInterval(interval);
        };
    }, []);

    return screenTime; // 초 단위
};

// 배터리 소모 감지 (모바일)
const useBatteryDrain = () => {
    const [batteryDrain, setBatteryDrain] = useState(0);
    const [batteryLevel, setBatteryLevel] = useState(1);
    const lastBatteryLevel = useRef<number>(1);

    useEffect(() => {
        // Battery API 사용 (Chrome, Edge 지원)
        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
                setBatteryLevel(battery.level);

                const updateBattery = () => {
                    const currentLevel = battery.level;
                    const drain = lastBatteryLevel.current - currentLevel;
                    
                    if (drain > 0) {
                        setBatteryDrain(prev => prev + drain);
                    }
                    
                    lastBatteryLevel.current = currentLevel;
                    setBatteryLevel(currentLevel);
                };

                battery.addEventListener('levelchange', updateBattery);
                battery.addEventListener('chargingchange', updateBattery);

                // 주기적으로 체크
                const interval = setInterval(updateBattery, 60000); // 1분마다

                return () => {
                    clearInterval(interval);
                    battery.removeEventListener('levelchange', updateBattery);
                    battery.removeEventListener('chargingchange', updateBattery);
                };
            });
        } else {
            // Battery API 미지원 시 시뮬레이션
            const interval = setInterval(() => {
                const drain = Math.random() * 0.01; // 0-1% 시뮬레이션
                setBatteryDrain(prev => prev + drain);
            }, 60000);
            return () => clearInterval(interval);
        }
    }, []);

    return { batteryDrain, batteryLevel };
};

// 자동 채굴 메인 훅
export const useAutoMining = () => {
    const [isMining, setIsMining] = useState(false);
    const [stats, setStats] = useState<MiningStats>({
        cpuUsage: 0,
        networkActivity: 0,
        screenTime: 0,
        batteryDrain: 0,
        totalEarned: 0,
        miningRate: 0,
    });

    const cpuUsage = useCPUUsage();
    const networkActivity = useNetworkActivity();
    const screenTime = useScreenTime();
    const { batteryDrain, batteryLevel } = useBatteryDrain();
    const miningInterval = useRef<NodeJS.Timeout | null>(null);

    // 채굴 시작
    const startMining = () => {
        if (isMining) return;
        setIsMining(true);
    };

    // 채굴 중지
    const stopMining = () => {
        setIsMining(false);
        if (miningInterval.current) {
            clearInterval(miningInterval.current);
            miningInterval.current = null;
        }
    };

    // 자동 채굴 로직
    useEffect(() => {
        if (!isMining) return;

        // 1초마다 채굴 계산
        miningInterval.current = setInterval(() => {
            setStats(prev => {
                // 각 요소별 보상 계산
                const cpuReward = (cpuUsage / 100) * 0.0001; // CPU 1% = 0.0001 KAUS/초
                const networkReward = (networkActivity / 10) * 0.00005; // 10MB = 0.00005 KAUS/초
                const screenReward = (screenTime / 3600) * 0.0001; // 1시간 = 0.0001 KAUS/초
                const batteryReward = batteryDrain * 0.001; // 배터리 1% = 0.001 KAUS

                // 총 보상 (초당)
                const totalReward = cpuReward + networkReward + screenReward + batteryReward;
                
                // 시간당 채굴 속도 계산
                const hourlyRate = totalReward * 3600;

                return {
                    cpuUsage,
                    networkActivity,
                    screenTime: screenTime,
                    batteryDrain,
                    totalEarned: prev.totalEarned + totalReward,
                    miningRate: hourlyRate,
                };
            });
        }, 1000);

        return () => {
            if (miningInterval.current) {
                clearInterval(miningInterval.current);
            }
        };
    }, [isMining, cpuUsage, networkActivity, screenTime, batteryDrain]);

    // 화면 시간 업데이트
    useEffect(() => {
        setStats(prev => ({ ...prev, screenTime }));
    }, [screenTime]);

    // CPU 사용량 업데이트
    useEffect(() => {
        setStats(prev => ({ ...prev, cpuUsage }));
    }, [cpuUsage]);

    // 네트워크 활동 업데이트
    useEffect(() => {
        setStats(prev => ({ ...prev, networkActivity }));
    }, [networkActivity]);

    // 배터리 소모 업데이트
    useEffect(() => {
        setStats(prev => ({ ...prev, batteryDrain }));
    }, [batteryDrain]);

    // Service Worker 메시지 리스너 (백그라운드 채굴 업데이트)
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            const handleMessage = (event: MessageEvent) => {
                if (event.data && event.data.type === 'MINING_UPDATE') {
                    setStats(prev => ({
                        ...prev,
                        totalEarned: prev.totalEarned + event.data.data.earned
                    }));
                }
            };

            navigator.serviceWorker.addEventListener('message', handleMessage);
            
            return () => {
                navigator.serviceWorker.removeEventListener('message', handleMessage);
            };
        }
    }, []);

    return {
        isMining,
        stats,
        batteryLevel,
        startMining,
        stopMining,
    };
};

