'use client';

import React, { useState } from 'react';

const HardwareGuide = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'rfid' | 'api'>('overview');

  return (
    <div className="nexus-panel" style={{ padding: '1.5rem' }}>
      <h3 className="panel-title">🔧 HARDWARE INTEGRATION GUIDE</h3>
      
      {/* 탭 네비게이션 */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '1rem',
        borderBottom: '1px solid rgba(0, 255, 65, 0.3)',
        paddingBottom: '0.5rem'
      }}>
        <button
          onClick={() => setSelectedTab('overview')}
          style={{
            background: selectedTab === 'overview' ? 'rgba(0, 255, 65, 0.2)' : 'transparent',
            border: selectedTab === 'overview' ? '1px solid #00ff41' : '1px solid rgba(0, 255, 65, 0.3)',
            color: '#00ff41',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontFamily: 'Courier New, monospace'
          }}
        >
          OVERVIEW
        </button>
        <button
          onClick={() => setSelectedTab('rfid')}
          style={{
            background: selectedTab === 'rfid' ? 'rgba(0, 255, 65, 0.2)' : 'transparent',
            border: selectedTab === 'rfid' ? '1px solid #00ff41' : '1px solid rgba(0, 255, 65, 0.3)',
            color: '#00ff41',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontFamily: 'Courier New, monospace'
          }}
        >
          RFID SETUP
        </button>
        <button
          onClick={() => setSelectedTab('api')}
          style={{
            background: selectedTab === 'api' ? 'rgba(0, 255, 65, 0.2)' : 'transparent',
            border: selectedTab === 'api' ? '1px solid #00ff41' : '1px solid rgba(0, 255, 65, 0.3)',
            color: '#00ff41',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontFamily: 'Courier New, monospace'
          }}
        >
          API INTEGRATION
        </button>
      </div>

      {/* 컨텐츠 */}
      <div style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
        {selectedTab === 'overview' && (
          <div>
            <h4 style={{ color: '#00ccff', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
              📋 필요한 하드웨어
            </h4>
            <div style={{ 
              background: 'rgba(0, 255, 65, 0.05)',
              border: '1px solid rgba(0, 255, 65, 0.2)',
              borderRadius: '6px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ marginBottom: '0.8rem' }}>
                <div style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                  1️⃣ Raspberry Pi 4 (8GB RAM)
                </div>
                <div style={{ color: '#00ccff', fontSize: '0.75rem', paddingLeft: '1rem' }}>
                  • 가격: 약 ₩80,000<br/>
                  • 용도: RFID 리더 제어, 데이터 처리<br/>
                  • 구매처: 디바이스마트, 엘레파츠
                </div>
              </div>

              <div style={{ marginBottom: '0.8rem' }}>
                <div style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                  2️⃣ RFID/NFC Reader (RC522)
                </div>
                <div style={{ color: '#00ccff', fontSize: '0.75rem', paddingLeft: '1rem' }}>
                  • 가격: 약 ₩5,000/개<br/>
                  • 용도: 상품 태그 스캔<br/>
                  • 권장: 10개 이상 설치 (구역별)
                </div>
              </div>

              <div style={{ marginBottom: '0.8rem' }}>
                <div style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                  3️⃣ RFID Tags (NTAG215/216)
                </div>
                <div style={{ color: '#00ccff', fontSize: '0.75rem', paddingLeft: '1rem' }}>
                  • 가격: 약 ₩200/개<br/>
                  • 용도: 모든 상품에 부착<br/>
                  • KAUS Coin 블록체인 ID 연결
                </div>
              </div>

              <div>
                <div style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                  4️⃣ 바코드 스캔너 (옵션)
                </div>
                <div style={{ color: '#00ccff', fontSize: '0.75rem', paddingLeft: '1rem' }}>
                  • 가격: 약 ₩50,000/개<br/>
                  • 용도: 기존 바코드와 병행 사용
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'rgba(0, 204, 255, 0.1)',
              border: '1px solid rgba(0, 204, 255, 0.3)',
              borderRadius: '6px',
              padding: '0.8rem'
            }}>
              <div style={{ color: '#00ccff', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                💰 총 예상 비용 (소규모 시작)
              </div>
              <div style={{ color: '#00ff41', fontSize: '0.9rem' }}>
                약 ₩500,000 ~ ₩1,000,000 (초기 테스트용)
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'rfid' && (
          <div>
            <h4 style={{ color: '#00ccff', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
              🔌 RFID 설치 가이드
            </h4>
            
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(0, 255, 65, 0.3)',
              borderRadius: '6px',
              padding: '1rem',
              marginBottom: '1rem',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.75rem',
              color: '#00ff41'
            }}>
              <div style={{ color: '#00ccff', marginBottom: '0.5rem' }}>
                # Raspberry Pi + RC522 연결
              </div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`
# 1. SPI 활성화
sudo raspi-config
# Interface Options → SPI → Enable

# 2. 라이브러리 설치
pip3 install mfrc522
pip3 install spidev

# 3. Python 코드
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522

reader = SimpleMFRC522()

try:
    print("RFID 스캔 대기 중...")
    id, text = reader.read()
    print(f"ID: {id}")
    print(f"Data: {text}")
    
    # KAUS 블록체인 연동
    blockchain_id = f"KAUS-{id}"
    # API로 전송...
    
finally:
    GPIO.cleanup()
`}</pre>
            </div>

            <div style={{ 
              background: 'rgba(255, 204, 0, 0.1)',
              border: '1px solid rgba(255, 204, 0, 0.3)',
              borderRadius: '6px',
              padding: '0.8rem'
            }}>
              <div style={{ color: '#ffcc00', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                ⚡ 배선 연결 (RC522 → Raspberry Pi)
              </div>
              <div style={{ color: '#00ccff', fontSize: '0.75rem', lineHeight: '1.8' }}>
                SDA → Pin 24 (GPIO 8)<br/>
                SCK → Pin 23 (GPIO 11)<br/>
                MOSI → Pin 19 (GPIO 10)<br/>
                MISO → Pin 21 (GPIO 9)<br/>
                IRQ → (연결 안 함)<br/>
                GND → Pin 6 (Ground)<br/>
                RST → Pin 22 (GPIO 25)<br/>
                3.3V → Pin 1 (3.3V Power)
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'api' && (
          <div>
            <h4 style={{ color: '#00ccff', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
              🌐 NEXUS OS API 연동
            </h4>
            
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(0, 255, 65, 0.3)',
              borderRadius: '6px',
              padding: '1rem',
              marginBottom: '1rem',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.75rem',
              color: '#00ff41'
            }}>
              <div style={{ color: '#00ccff', marginBottom: '0.5rem' }}>
                # API 엔드포인트
              </div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`
import requests
import json

# NEXUS OS API 베이스 URL
API_BASE = "https://coin-center.vercel.app/api"

# 1. 상품 스캔 기록
def log_scan(rfid_id, location):
    data = {
        "rfid_id": rfid_id,
        "location": location,
        "timestamp": datetime.now().isoformat(),
        "blockchain_id": f"KAUS-{rfid_id}"
    }
    
    response = requests.post(
        f"{API_BASE}/scan",
        json=data,
        headers={"Authorization": "Bearer YOUR_API_KEY"}
    )
    
    return response.json()

# 2. 재고 업데이트
def update_inventory(item_id, quantity):
    data = {
        "item_id": item_id,
        "quantity": quantity,
        "zone": "D-3"
    }
    
    response = requests.post(
        f"{API_BASE}/inventory/update",
        json=data
    )
    
    return response.json()

# 3. 로봇 상태 전송
def send_robot_status(robot_id, status, battery):
    data = {
        "robot_id": robot_id,
        "status": status,
        "battery": battery,
        "current_task": "Picking Item #A-4523"
    }
    
    response = requests.post(
        f"{API_BASE}/robots/status",
        json=data
    )
    
    return response.json()

# 사용 예시
log_scan("123456789", "Zone D-3")
update_inventory("SKU-99203", 50)
send_robot_status("AGV-001", "ACTIVE", 87)
`}</pre>
            </div>

            <div style={{ 
              background: 'rgba(138, 43, 226, 0.1)',
              border: '1px solid rgba(138, 43, 226, 0.3)',
              borderRadius: '6px',
              padding: '0.8rem'
            }}>
              <div style={{ color: '#8a2be2', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                🔐 보안 (Blockchain 연동)
              </div>
              <div style={{ color: '#00ccff', fontSize: '0.75rem', lineHeight: '1.8' }}>
                • 모든 스캔 데이터는 KAUS Coin 블록체인에 기록<br/>
                • SHA-256 해시로 데이터 무결성 보장<br/>
                • 스마트 컨트랙트로 자동 검증<br/>
                • 위변조 불가능한 감사 추적
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HardwareGuide;
