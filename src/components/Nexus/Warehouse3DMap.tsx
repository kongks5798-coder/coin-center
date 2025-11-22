'use client';

import React, { useState, useEffect } from 'react';

const Warehouse3DMap = () => {
  const [robotPositions, setRobotPositions] = useState([
    { id: 'AGV-001', zone: 'D-3', x: 45, y: 32 },
    { id: 'AGV-002', zone: 'A-2', x: 15, y: 18 },
    { id: 'PACKER-001', zone: 'Pack-1', x: 75, y: 50 },
    { id: 'PACKER-002', zone: 'Pack-2', x: 75, y: 65 },
  ]);

  const zones = [
    { name: 'Zone A', x: 10, y: 10, width: 30, height: 25, activity: 'high', items: 3420 },
    { name: 'Zone B', x: 45, y: 10, width: 30, height: 25, activity: 'medium', items: 2150 },
    { name: 'Zone C', x: 10, y: 40, width: 30, height: 25, activity: 'low', items: 980 },
    { name: 'Zone D', x: 45, y: 40, width: 30, height: 25, activity: 'high', items: 4890 },
  ];

  const packingStations = [
    { name: 'Pack-1', x: 80, y: 48 },
    { name: 'Pack-2', x: 80, y: 63 },
  ];

  // 로봇 위치 실시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setRobotPositions(prev => prev.map(robot => ({
        ...robot,
        x: robot.x + (Math.random() - 0.5) * 2,
        y: robot.y + (Math.random() - 0.5) * 2,
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getActivityColor = (activity: string) => {
    switch(activity) {
      case 'high': return 'rgba(255, 0, 0, 0.3)';
      case 'medium': return 'rgba(255, 165, 0, 0.2)';
      case 'low': return 'rgba(0, 255, 65, 0.15)';
      default: return 'rgba(100, 100, 100, 0.1)';
    }
  };

  return (
    <div className="nexus-panel" style={{ padding: '1.5rem' }}>
      <h3 className="panel-title">🗺️ 3D WAREHOUSE MAP</h3>
      
      <div style={{ 
        position: 'relative',
        width: '100%',
        height: '400px',
        background: 'rgba(0, 20, 0, 0.3)',
        border: '1px solid rgba(0, 255, 65, 0.3)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* 그리드 배경 */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0, 255, 65, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* 구역 (히트맵) */}
          {zones.map((zone, idx) => (
            <g key={idx}>
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                fill={getActivityColor(zone.activity)}
                stroke="#00ff41"
                strokeWidth="0.5"
                rx="2"
              />
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + 5}
                textAnchor="middle"
                fill="#00ff41"
                fontSize="3"
                fontWeight="bold"
              >
                {zone.name}
              </text>
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + 10}
                textAnchor="middle"
                fill="#00ccff"
                fontSize="2.5"
              >
                {zone.items.toLocaleString()} items
              </text>
            </g>
          ))}

          {/* 포장 스테이션 */}
          {packingStations.map((station, idx) => (
            <g key={idx}>
              <rect
                x={station.x - 3}
                y={station.y - 3}
                width="6"
                height="6"
                fill="rgba(0, 204, 255, 0.3)"
                stroke="#00ccff"
                strokeWidth="0.5"
                rx="1"
              />
              <text
                x={station.x}
                y={station.y + 1}
                textAnchor="middle"
                fill="#00ccff"
                fontSize="2"
                fontWeight="bold"
              >
                📦
              </text>
            </g>
          ))}

          {/* 로봇 (실시간 이동) */}
          {robotPositions.map((robot, idx) => (
            <g key={idx}>
              <circle
                cx={robot.x}
                cy={robot.y}
                r="2"
                fill={robot.id.includes('AGV') ? '#00ff41' : '#00ccff'}
                stroke="#ffffff"
                strokeWidth="0.3"
              >
                <animate
                  attributeName="opacity"
                  values="1;0.5;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x={robot.x}
                y={robot.y - 3}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="2"
                fontWeight="bold"
              >
                {robot.id}
              </text>
            </g>
          ))}
        </svg>

        {/* 범례 */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '0.5rem',
          borderRadius: '4px',
          fontSize: '0.7rem'
        }}>
          <div style={{ color: '#ff0000', marginBottom: '0.2rem' }}>🔴 High Activity</div>
          <div style={{ color: '#ffa500', marginBottom: '0.2rem' }}>🟠 Medium Activity</div>
          <div style={{ color: '#00ff41', marginBottom: '0.2rem' }}>🟢 Low Activity</div>
          <div style={{ color: '#00ff41', marginBottom: '0.2rem' }}>● AGV Robot</div>
          <div style={{ color: '#00ccff' }}>● Packer Robot</div>
        </div>
      </div>
    </div>
  );
};

export default Warehouse3DMap;
