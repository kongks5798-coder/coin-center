'use client';

import React, { useState, useEffect } from 'react';

const PredictiveAI = () => {
  const [predictions, setPredictions] = useState({
    nextHourOrders: 245,
    peakTime: '14:00 - 16:00',
    recommendedRobots: 7,
    expectedLoad: 85,
    batteryAlerts: [
      { robot: 'AGV-003', timeRemaining: 28, action: 'Charge in 30 min' },
    ],
    inventoryAlerts: [
      { item: 'Box Type-A', stock: 234, reorderAt: 500 },
      { item: 'Bubble Wrap', stock: 12, reorderAt: 50, urgent: true },
    ],
    efficiency: 98.5,
    predictedBottleneck: 'Zone D (14:30 예상)'
  });

  // AI 예측 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev => ({
        ...prev,
        nextHourOrders: prev.nextHourOrders + Math.floor(Math.random() * 10) - 5,
        expectedLoad: Math.min(100, Math.max(60, prev.expectedLoad + Math.floor(Math.random() * 6) - 3)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="nexus-panel" style={{ padding: '1.5rem' }}>
      <h3 className="panel-title">🤖 AI PREDICTIVE ANALYTICS</h3>
      
      {/* 다음 시간 예측 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          background: 'rgba(0, 204, 255, 0.1)',
          border: '1px solid rgba(0, 204, 255, 0.3)',
          borderRadius: '6px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.7rem', color: '#00ccff', marginBottom: '0.3rem' }}>
            NEXT HOUR ORDERS
          </div>
          <div style={{ fontSize: '2rem', color: '#00ccff', fontWeight: 'bold' }}>
            {predictions.nextHourOrders}
          </div>
          <div style={{ fontSize: '0.65rem', color: '#00ff41', marginTop: '0.3rem' }}>
            AI Prediction
          </div>
        </div>

        <div style={{
          background: 'rgba(0, 255, 65, 0.1)',
          border: '1px solid rgba(0, 255, 65, 0.3)',
          borderRadius: '6px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.7rem', color: '#00ff41', marginBottom: '0.3rem' }}>
            RECOMMENDED ROBOTS
          </div>
          <div style={{ fontSize: '2rem', color: '#00ff41', fontWeight: 'bold' }}>
            {predictions.recommendedRobots}
          </div>
          <div style={{ fontSize: '0.65rem', color: '#00ccff', marginTop: '0.3rem' }}>
            Auto-calculated
          </div>
        </div>

        <div style={{
          background: `rgba(${predictions.expectedLoad > 90 ? '255, 51, 51' : '255, 204, 0'}, 0.1)`,
          border: `1px solid rgba(${predictions.expectedLoad > 90 ? '255, 51, 51' : '255, 204, 0'}, 0.3)`,
          borderRadius: '6px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.7rem', color: predictions.expectedLoad > 90 ? '#ff3333' : '#ffcc00', marginBottom: '0.3rem' }}>
            EXPECTED LOAD
          </div>
          <div style={{ fontSize: '2rem', color: predictions.expectedLoad > 90 ? '#ff3333' : '#ffcc00', fontWeight: 'bold' }}>
            {predictions.expectedLoad}%
          </div>
          <div style={{ fontSize: '0.65rem', color: '#00ccff', marginTop: '0.3rem' }}>
            {predictions.peakTime}
          </div>
        </div>
      </div>

      {/* 알림 섹션 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* 배터리 알림 */}
        <div>
          <h4 style={{
            fontSize: '0.8rem',
            color: '#ffcc00',
            marginBottom: '0.5rem',
            borderBottom: '1px solid rgba(255, 204, 0, 0.3)',
            paddingBottom: '0.3rem'
          }}>
            ⚡ BATTERY ALERTS
          </h4>
          {predictions.batteryAlerts.map((alert, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 204, 0, 0.1)',
              border: '1px solid rgba(255, 204, 0, 0.3)',
              borderRadius: '4px',
              padding: '0.6rem',
              marginBottom: '0.5rem'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#ffcc00', fontWeight: 'bold' }}>
                {alert.robot}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#00ccff', marginTop: '0.2rem' }}>
                🔋 {alert.timeRemaining} min remaining
              </div>
              <div style={{ fontSize: '0.65rem', color: '#00ff41', marginTop: '0.2rem' }}>
                → {alert.action}
              </div>
            </div>
          ))}
        </div>

        {/* 재고 알림 */}
        <div>
          <h4 style={{
            fontSize: '0.8rem',
            color: '#ff3333',
            marginBottom: '0.5rem',
            borderBottom: '1px solid rgba(255, 51, 51, 0.3)',
            paddingBottom: '0.3rem'
          }}>
            📦 INVENTORY ALERTS
          </h4>
          {predictions.inventoryAlerts.map((alert, idx) => (
            <div key={idx} style={{
              background: alert.urgent ? 'rgba(255, 51, 51, 0.1)' : 'rgba(255, 204, 0, 0.1)',
              border: alert.urgent ? '1px solid rgba(255, 51, 51, 0.3)' : '1px solid rgba(255, 204, 0, 0.3)',
              borderRadius: '4px',
              padding: '0.6rem',
              marginBottom: '0.5rem'
            }}>
              <div style={{ fontSize: '0.75rem', color: alert.urgent ? '#ff3333' : '#ffcc00', fontWeight: 'bold' }}>
                {alert.item} {alert.urgent && '⚠️'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#00ccff', marginTop: '0.2rem' }}>
                Stock: {alert.stock} (Reorder at {alert.reorderAt})
              </div>
              <div style={{ fontSize: '0.65rem', color: '#00ff41', marginTop: '0.2rem' }}>
                → {alert.urgent ? 'ORDER NOW!' : 'Monitor'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 병목 예측 */}
      <div style={{
        marginTop: '1rem',
        background: 'rgba(138, 43, 226, 0.1)',
        border: '1px solid rgba(138, 43, 226, 0.3)',
        borderRadius: '6px',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: '#8a2be2', fontWeight: 'bold' }}>
            🎯 PREDICTED BOTTLENECK
          </span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#00ff41' }}>
          {predictions.predictedBottleneck}
        </div>
      </div>
    </div>
  );
};

export default PredictiveAI;
