'use client';

import React from 'react';
import AssetDashboard from './AssetDashboard';
import LiveLogTicker from './LiveLogTicker';
import './nexus-style.css';

const NexusContainer = () => {
  return (
    <div className="nexus-container">
      {/* 헤더 */}
      <div className="nexus-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#00ff41', 
          textAlign: 'center',
          letterSpacing: '4px',
          textShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
          marginBottom: '0.5rem'
        }}>
          NEXUS OS v2.1
        </h1>
        <p style={{ 
          textAlign: 'center', 
          opacity: 0.7,
          fontSize: '0.9rem',
          letterSpacing: '2px'
        }}>
          5,000㎡ LOGISTICS CONTROL CENTER
        </p>
      </div>

      {/* 대시보드 그리드 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <AssetDashboard />
        <LiveLogTicker />
      </div>

      {/* 시스템 상태 바 */}
      <div className="nexus-panel" style={{ 
        display: 'flex', 
        justifyContent: 'space-around',
        padding: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.3rem' }}>CPU USAGE</div>
          <div style={{ fontSize: '1.5rem', color: '#00ff41', fontWeight: 'bold' }}>23%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.3rem' }}>BLOCKCHAIN SYNC</div>
          <div style={{ fontSize: '1.5rem', color: '#00ccff', fontWeight: 'bold' }}>100%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.3rem' }}>NETWORK STATUS</div>
          <div style={{ fontSize: '1.5rem', color: '#00ff41', fontWeight: 'bold' }}>ONLINE</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.3rem' }}>UPTIME</div>
          <div style={{ fontSize: '1.5rem', color: '#00ccff', fontWeight: 'bold' }}>99.9%</div>
        </div>
      </div>
    </div>
  );
};

export default NexusContainer;
