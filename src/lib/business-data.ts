export interface BusinessData {
  id: string
  name: string
  slides: {
    title: string
    content: string[]
  }[]
  theme: {
    primary: string
    secondary: string
    accent: string
    bgGradient: string
  }
}

export const businessPresentations: BusinessData[] = [
  {
    id: "ai-logistics",
    name: "AI 물류 플랫폼",
    slides: [
      {
        title: "전 세계 물류를 하나로 연결합니다",
        content: [
          "실시간 AI 경로 최적화",
          "자동 물류 센터 관제 시스템",
          "전 세계 1,000+ 물류 거점 연결",
        ],
      },
      {
        title: "AI 드론이 배송의 미래를 바꿉니다",
        content: [
          "전 세계 AI 드론 주문 독점 수주",
          "24시간 자동화 생산 라인",
          "지속적 AI 업그레이드 가능 드론",
        ],
      },
      {
        title: "완벽한 하청 공정 관리",
        content: [
          "품질 관리 AI 시스템",
          "실시간 생산 모니터링",
          "납기 준수율 99.8%",
        ],
      },
      {
        title: "데이터로 물류를 예측합니다",
        content: [
          "수요 예측 AI 엔진",
          "재고 최적화 알고리즘",
          "물류비 30% 절감 효과",
        ],
      },
    ],
    theme: {
      primary: "#00FF94",
      secondary: "#00C2FF",
      accent: "#00FF94",
      bgGradient: "linear-gradient(135deg, #050505 0%, #001a14 50%, #000505 100%)",
    },
  },
  {
    id: "rfid-system",
    name: "RFID 상품 코드화 시스템",
    slides: [
      {
        title: "모든 상품에 고유한 디지털 신원을",
        content: [
          "카우스 코인 기반 RFID 기술",
          "상품별 고유 코드 부여",
          "블록체인 기록으로 위변조 불가",
        ],
      },
      {
        title: "실시간 위치 추적",
        content: [
          "GPS급 정확도로 상품 위치 파악",
          "물류센터 내 자동 재고 관리",
          "배송 중 실시간 위치 공유",
        ],
      },
      {
        title: "100% 정품 인증 보장",
        content: [
          "제조부터 소비자까지 전 과정 기록",
          "QR 스캔으로 정품 즉시 확인",
          "가짜 상품 유통 차단",
        ],
      },
      {
        title: "투명한 유통 과정",
        content: [
          "제조 → 검수 → 보관 → 배송 전 단계 공개",
          "소비자가 직접 확인 가능",
          "신뢰할 수 있는 공급망",
        ],
      },
    ],
    theme: {
      primary: "#E0F2FE",
      secondary: "#0EA5E9",
      accent: "#0EA5E9",
      bgGradient: "linear-gradient(135deg, #050505 0%, #0a1a2e 50%, #050505 100%)",
    },
  },
  {
    id: "fulfillment",
    name: "풀필먼트 서비스",
    slides: [
      {
        title: "주문부터 배송까지 단 하루",
        content: [
          "자동화 주문 처리 시스템",
          "전국 10개 거점 물류센터",
          "당일 출고율 95%",
        ],
      },
      {
        title: "스마트 재고 관리",
        content: [
          "AI 기반 재고 예측",
          "자동 발주 시스템",
          "재고 부족률 0.1% 이하",
        ],
      },
      {
        title: "완벽한 포장과 배송",
        content: [
          "자동 포장 로봇 시스템",
          "친환경 포장재 사용",
          "파손율 0.05%",
        ],
      },
      {
        title: "e-커머스 통합 솔루션",
        content: [
          "모든 쇼핑몰과 API 연동",
          "실시간 재고/주문 동기화",
          "통합 대시보드 제공",
        ],
      },
    ],
    theme: {
      primary: "#FF6B35",
      secondary: "#F7931E",
      accent: "#FF6B35",
      bgGradient: "linear-gradient(135deg, #050505 0%, #2a0f0a 50%, #050505 100%)",
    },
  },
  {
    id: "brand",
    name: "브랜드 사업",
    slides: [
      {
        title: "데이터가 만드는 브랜드",
        content: [
          "소비자 빅데이터 분석",
          "AI 트렌드 예측 시스템",
          "타겟 마케팅 자동화",
        ],
      },
      {
        title: "브랜드 전략 컨설팅",
        content: [
          "브랜드 아이덴티티 구축",
          "시장 포지셔닝 전략",
          "론칭부터 성장까지 전 과정 지원",
        ],
      },
      {
        title: "통합 마케팅 솔루션",
        content: [
          "온오프라인 통합 캠페인",
          "SNS 마케팅 자동화",
          "ROI 실시간 측정",
        ],
      },
      {
        title: "글로벌 브랜드로 성장",
        content: [
          "해외 시장 진출 지원",
          "다국어 마케팅 시스템",
          "글로벌 유통망 연결",
        ],
      },
    ],
    theme: {
      primary: "#D4AF37",
      secondary: "#F5E6D3",
      accent: "#D4AF37",
      bgGradient: "linear-gradient(135deg, #050505 0%, #1a1508 50%, #050505 100%)",
    },
  },
  {
    id: "fashion",
    name: "패션 사업",
    slides: [
      {
        title: "AI가 트렌드를 읽습니다",
        content: [
          "글로벌 패션 트렌드 AI 분석",
          "SNS 실시간 트렌드 모니터링",
          "다음 시즌 스타일 예측",
        ],
      },
      {
        title: "빠른 상품화 Fast Fashion 2.0",
        content: [
          "디자인부터 생산까지 2주",
          "소량 다품종 생산 시스템",
          "재고 리스크 최소화",
        ],
      },
      {
        title: "온오프라인 통합 판매",
        content: [
          "자체 온라인 스토어 운영",
          "전국 팝업스토어 네트워크",
          "O2O 연계 쇼핑 경험",
        ],
      },
      {
        title: "지속 가능한 패션",
        content: [
          "친환경 소재 사용",
          "업사이클링 프로그램",
          "탄소 발자국 최소화",
        ],
      },
    ],
    theme: {
      primary: "#EC4899",
      secondary: "#A855F7",
      accent: "#EC4899",
      bgGradient: "linear-gradient(135deg, #050505 0%, #1a0a1a 50%, #050505 100%)",
    },
  },
  {
    id: "kaus-ai",
    name: "KAUS AI",
    slides: [
      {
        title: "필드나인의 두뇌, KAUS AI",
        content: [
          "전사 데이터 통합 관리",
          "실시간 비즈니스 인텔리전스",
          "자동 의사결정 지원",
        ],
      },
      {
        title: "학습하고 진화하는 AI",
        content: [
          "딥러닝 기반 자기 학습",
          "비즈니스 패턴 자동 분석",
          "지속적 성능 향상",
        ],
      },
      {
        title: "모든 사업부를 연결",
        content: [
          "물류 - 풀필먼트 - 브랜드 - 패션 통합",
          "크로스 데이터 분석",
          "시너지 효과 극대화",
        ],
      },
      {
        title: "예측하고 최적화합니다",
        content: [
          "수요 예측 정확도 95%",
          "자원 배분 자동 최적화",
          "비용 절감 효과 평균 35%",
        ],
      },
    ],
    theme: {
      primary: "#00C2FF",
      secondary: "#0066FF",
      accent: "#00C2FF",
      bgGradient: "linear-gradient(135deg, #050505 0%, #001a2e 50%, #050505 100%)",
    },
  },
  {
    id: "kaus-coin",
    name: "KAUS Coin",
    slides: [
      {
        title: "필드나인 생태계의 화폐",
        content: [
          "모든 거래에 카우스 코인 사용",
          "블록체인 기반 투명한 거래",
          "수수료 최소화",
        ],
      },
      {
        title: "RFID와 완벽한 통합",
        content: [
          "상품 코드화의 핵심 기술",
          "위변조 불가능한 거래 기록",
          "실시간 정산 시스템",
        ],
      },
      {
        title: "리워드 프로그램",
        content: [
          "거래량에 따른 코인 적립",
          "파트너사 혜택 제공",
          "생태계 참여 인센티브",
        ],
      },
      {
        title: "안전하고 빠른 결제",
        content: [
          "은행급 보안 시스템",
          "즉시 결제 완료",
          "국제 송금 지원",
        ],
      },
    ],
    theme: {
      primary: "#00FF94",
      secondary: "#D4AF37",
      accent: "#00FF94",
      bgGradient: "linear-gradient(135deg, #050505 0%, #0a1a0a 50%, #050505 100%)",
    },
  },
  {
    id: "data-garden",
    name: "데이터 가든 센터",
    slides: [
      {
        title: "넥서스 더 필드나인의 심장",
        content: [
          "전사 데이터 통합 저장소",
          "페타바이트급 저장 용량",
          "99.999% 가동률 보장",
        ],
      },
      {
        title: "엔터프라이즈급 보안",
        content: [
          "다중 암호화 시스템",
          "실시간 침입 탐지",
          "ISO 27001 인증",
        ],
      },
      {
        title: "무한 확장 가능",
        content: [
          "클라우드 네이티브 아키텍처",
          "자동 스케일링",
          "글로벌 분산 저장",
        ],
      },
      {
        title: "실시간 데이터 처리",
        content: [
          "밀리초 단위 응답 속도",
          "빅데이터 실시간 분석",
          "AI 학습 인프라 제공",
        ],
      },
    ],
    theme: {
      primary: "#94A3B8",
      secondary: "#0EA5E9",
      accent: "#94A3B8",
      bgGradient: "linear-gradient(135deg, #050505 0%, #0a141a 50%, #050505 100%)",
    },
  },
]

