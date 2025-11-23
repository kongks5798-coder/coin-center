'use client';

import { useState, useEffect } from 'react';

interface TrackingPoint {
    id: string;
    name: string;
    lat: number;
    lng: number;
    timestamp: string;
    status: 'warehouse' | 'in-transit' | 'delivered';
}

interface ProductTrackingMapProps {
    productId: string;
    productName: string;
    trackingPoints: TrackingPoint[];
}

export default function ProductTrackingMap({ productId, productName, trackingPoints }: ProductTrackingMapProps) {
    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentLocation, setCurrentLocation] = useState<TrackingPoint | null>(null);

    useEffect(() => {
        // 진행률 애니메이션
        const interval = setInterval(() => {
            setCurrentProgress(prev => {
                if (prev >= 100) return 0;
                return prev + 1;
            });
        }, 100);

        // 현재 위치 업데이트
        const progressIndex = Math.floor((currentProgress / 100) * trackingPoints.length);
        if (progressIndex < trackingPoints.length) {
            setCurrentLocation(trackingPoints[progressIndex]);
        }

        return () => clearInterval(interval);
    }, [currentProgress, trackingPoints]);

    // 지도 좌표 계산 (간단한 2D 맵)
    const mapWidth = 600;
    const mapHeight = 400;
    const scaleX = mapWidth / 360; // 경도 범위
    const scaleY = mapHeight / 180; // 위도 범위

    const getX = (lng: number) => ((lng + 180) * scaleX);
    const getY = (lat: number) => ((90 - lat) * scaleY);

    return (
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border-2 border-purple-500/30">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-purple-400 mb-2">{productName}</h3>
                <div className="text-sm text-gray-400">추적 ID: {productId}</div>
            </div>

            {/* 실제 지도 시각화 */}
            <div className="relative bg-gray-800 rounded-xl overflow-hidden border border-purple-500/20" style={{ width: mapWidth, height: mapHeight }}>
                {/* 배경 그리드 */}
                <svg width={mapWidth} height={mapHeight} className="absolute inset-0">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* 대륙 윤곽선 (간단한 형태) */}
                <svg width={mapWidth} height={mapHeight} className="absolute inset-0">
                    {/* 아시아 */}
                    <path
                        d="M 300 150 Q 320 140, 340 150 T 380 160 Q 400 170, 420 180 T 450 200"
                        fill="none"
                        stroke="rgba(139, 92, 246, 0.2)"
                        strokeWidth="2"
                    />
                    {/* 유럽 */}
                    <path
                        d="M 250 100 Q 270 90, 290 100 T 320 110"
                        fill="none"
                        stroke="rgba(139, 92, 246, 0.2)"
                        strokeWidth="2"
                    />
                    {/* 아메리카 */}
                    <path
                        d="M 100 150 Q 120 140, 140 150 T 180 160 Q 200 170, 220 180"
                        fill="none"
                        stroke="rgba(139, 92, 246, 0.2)"
                        strokeWidth="2"
                    />
                </svg>

                {/* 추적 경로 */}
                <svg width={mapWidth} height={mapHeight} className="absolute inset-0">
                    {trackingPoints.map((point, index) => {
                        if (index === 0) return null;
                        const prevPoint = trackingPoints[index - 1];
                        const x1 = getX(prevPoint.lng);
                        const y1 = getY(prevPoint.lat);
                        const x2 = getX(point.lng);
                        const y2 = getY(point.lat);

                        return (
                            <line
                                key={`line-${index}`}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="rgba(139, 92, 246, 0.5)"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                            />
                        );
                    })}
                </svg>

                {/* 추적 포인트 */}
                {trackingPoints.map((point, index) => {
                    const x = getX(point.lng);
                    const y = getY(point.lat);
                    const isActive = currentLocation?.id === point.id;
                    const isPast = trackingPoints.indexOf(currentLocation || trackingPoints[0]) > index;

                    return (
                        <div
                            key={point.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{ left: x, top: y }}
                        >
                            <div className={`w-4 h-4 rounded-full border-2 ${
                                isActive ? 'bg-purple-500 border-purple-300 animate-ping' :
                                isPast ? 'bg-green-500 border-green-300' :
                                'bg-gray-500 border-gray-300'
                            }`}></div>
                            {isActive && (
                                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 border border-purple-500/50">
                                    <div className="text-xs font-bold text-purple-400">{point.name}</div>
                                    <div className="text-xs text-gray-400">{point.timestamp}</div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* 현재 위치 마커 */}
                {currentLocation && (
                    <div
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                        style={{ left: getX(currentLocation.lng), top: getY(currentLocation.lat) }}
                    >
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full border-2 border-white shadow-lg shadow-purple-500/50 animate-pulse"></div>
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg px-4 py-2 border border-purple-300 shadow-lg">
                            <div className="text-sm font-bold text-white">{currentLocation.name}</div>
                            <div className="text-xs text-purple-100">{currentLocation.timestamp}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* 추적 타임라인 */}
            <div className="mt-6 space-y-3">
                {trackingPoints.map((point, index) => {
                    const isActive = currentLocation?.id === point.id;
                    const isPast = trackingPoints.indexOf(currentLocation || trackingPoints[0]) > index;

                    return (
                        <div
                            key={point.id}
                            className={`flex items-center gap-4 p-3 rounded-lg border ${
                                isActive ? 'bg-purple-500/20 border-purple-500/50' :
                                isPast ? 'bg-green-500/10 border-green-500/30' :
                                'bg-gray-800/50 border-gray-700'
                            }`}
                        >
                            <div className={`w-3 h-3 rounded-full ${
                                isActive ? 'bg-purple-400 animate-pulse' :
                                isPast ? 'bg-green-400' :
                                'bg-gray-500'
                            }`}></div>
                            <div className="flex-1">
                                <div className={`text-sm font-bold ${
                                    isActive ? 'text-purple-400' :
                                    isPast ? 'text-green-400' :
                                    'text-gray-400'
                                }`}>
                                    {point.name}
                                </div>
                                <div className="text-xs text-gray-500">{point.timestamp}</div>
                            </div>
                            <div className={`text-xs px-2 py-1 rounded ${
                                point.status === 'warehouse' ? 'bg-blue-500/20 text-blue-400' :
                                point.status === 'in-transit' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                            }`}>
                                {point.status === 'warehouse' ? '창고' :
                                 point.status === 'in-transit' ? '배송 중' :
                                 '배송 완료'}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 진행률 바 */}
            <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">배송 진행률</span>
                    <span className="text-purple-400 font-bold">{currentProgress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-purple-500/30">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-300"
                        style={{ width: `${currentProgress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

