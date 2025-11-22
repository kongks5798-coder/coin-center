'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { RBACUtils, TEAMS } from '@/lib/rbac';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  position: string;
  avatar: string;
  status: 'active' | 'away' | 'offline';
}

export default function TeamPage() {
  const router = useRouter();
  const params = useParams();
  const teamId = params.teamId as string;
  
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [widgets, setWidgets] = useState<string[]>([]);

  useEffect(() => {
    // 로그인 체크
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('fieldnine-user');
      if (!storedUser) {
        window.location.href = '/login';
        return;
      }
      const user = JSON.parse(storedUser);
      setCurrentUser(user);

      // 팀별 위젯 설정
      const teamWidgets = RBACUtils.getTeamDashboardWidgets(teamId as any);
      setWidgets(teamWidgets);

      // 팀원 데모 데이터 (실제로는 API에서 가져옴)
      loadTeamMembers(teamId);
    }
  }, [teamId]);

  const loadTeamMembers = (teamId: string) => {
    // 데모 데이터
    const demoMembers: Record<string, TeamMember[]> = {
      design: [
        { id: '1', name: '김디자인', email: 'design@fieldnine.io', position: '팀장', avatar: '🎨', status: 'active' },
        { id: '2', name: '이UI', email: 'ui@fieldnine.io', position: '사원', avatar: '✏️', status: 'active' },
        { id: '3', name: '박그래픽', email: 'graphic@fieldnine.io', position: '사원', avatar: '🖼️', status: 'away' }
      ],
      mardmard: [
        { id: '1', name: '이크리에이티브', email: 'creative@fieldnine.io', position: '팀장', avatar: '👩‍🎨', status: 'active' },
        { id: '2', name: '김마케팅', email: 'marketing@fieldnine.io', position: '사원', avatar: '📢', status: 'active' },
        { id: '3', name: '박콘텐츠', email: 'content@fieldnine.io', position: '사원', avatar: '📝', status: 'active' }
      ],
      production: [
        { id: '1', name: '최생산', email: 'prod@fieldnine.io', position: '팀장', avatar: '🏭', status: 'active' },
        { id: '2', name: '정물류', email: 'logistics@fieldnine.io', position: '사원', avatar: '📦', status: 'active' }
      ],
      online: [
        { id: '1', name: '강이커머스', email: 'ecom@fieldnine.io', position: '팀장', avatar: '💻', status: 'active' },
        { id: '2', name: '윤마케팅', email: 'marketing2@fieldnine.io', position: '사원', avatar: '📊', status: 'active' }
      ],
      offline: [
        { id: '1', name: '서매장', email: 'store@fieldnine.io', position: '팀장', avatar: '🏪', status: 'active' },
        { id: '2', name: '한고객', email: 'customer@fieldnine.io', position: '사원', avatar: '👥', status: 'away' }
      ],
      operations: [
        { id: '1', name: '최데브옵스', email: 'devops@fieldnine.io', position: '팀장', avatar: '👨‍💻', status: 'active' },
        { id: '2', name: '황클라우드', email: 'cloud@fieldnine.io', position: '사원', avatar: '☁️', status: 'active' }
      ]
    };

    setTeamMembers(demoMembers[teamId] || []);
  };

  const teamInfo = TEAMS[teamId as keyof typeof TEAMS];

  if (!teamInfo) {
    return <div>팀을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-[#02010a] text-white">
      {/* 헤더 */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/workspace" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                FIELD NINE
              </Link>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <span className="text-4xl">{teamInfo.icon}</span>
                <div>
                  <h1 className="text-xl font-bold">{teamInfo.name}</h1>
                  <p className="text-xs text-white/40">{teamInfo.description}</p>
                </div>
              </div>
            </div>
            {currentUser && (
              <div className="flex items-center gap-3">
                <span className="text-xl">{currentUser.avatar}</span>
                <div className="text-sm">
                  <div className="font-medium">{currentUser.name}</div>
                  <div className="text-white/40">{currentUser.role}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* 팀 통계 */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-white/40 text-sm mb-2">팀원</div>
            <div className="text-3xl font-bold">{teamMembers.length}명</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-white/40 text-sm mb-2">활성 작업</div>
            <div className="text-3xl font-bold">12개</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-white/40 text-sm mb-2">완료율</div>
            <div className="text-3xl font-bold">87%</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-white/40 text-sm mb-2">이번 주 성과</div>
            <div className="text-3xl font-bold text-green-400">+15%</div>
          </div>
        </div>

        {/* 팀 위젯 */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {widgets.includes('tasks') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">📋 팀 작업</h2>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="font-medium mb-1">작업 #{i}</div>
                    <div className="text-xs text-white/60">진행 중 • 우선순위: 높음</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {widgets.includes('design-files') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🎨 디자인 파일</h2>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="font-medium mb-1">메인 배너 디자인</div>
                  <div className="text-xs text-white/60">최종 수정: 2시간 전</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="font-medium mb-1">로고 리뉴얼 시안</div>
                  <div className="text-xs text-white/60">검토 대기 중</div>
                </div>
              </div>
            </div>
          )}

          {widgets.includes('nexus-os') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🤖 NEXUS OS</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">로봇 가동률</span>
                  <span className="font-bold text-green-400">94.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">평균 처리 시간</span>
                  <span className="font-bold">2.3분</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">오늘 처리량</span>
                  <span className="font-bold">1,247개</span>
                </div>
              </div>
            </div>
          )}

          {widgets.includes('campaigns') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">📢 캠페인</h2>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="font-medium mb-1">블랙프라이데이 프로모션</div>
                  <div className="text-xs text-white/60">진행 중 • 전환율 12.3%</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="font-medium mb-1">신규 고객 유치</div>
                  <div className="text-xs text-white/60">목표 달성 87%</div>
                </div>
              </div>
            </div>
          )}

          {widgets.includes('store-status') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🏪 매장 현황</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">오늘 방문객</span>
                  <span className="font-bold">342명</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">오늘 매출</span>
                  <span className="font-bold text-green-400">₩2.4M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">재고 현황</span>
                  <span className="font-bold">정상</span>
                </div>
              </div>
            </div>
          )}

          {widgets.includes('system-status') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">⚙️ 시스템 상태</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">서버 상태</span>
                  <span className="font-bold text-green-400">정상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">CPU 사용률</span>
                  <span className="font-bold">34%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">메모리 사용률</span>
                  <span className="font-bold">58%</span>
                </div>
              </div>
            </div>
          )}

          {widgets.includes('analytics') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">📊 애널리틱스</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">오늘 방문자</span>
                  <span className="font-bold">2,847명</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">전환율</span>
                  <span className="font-bold text-green-400">+8.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">평균 체류시간</span>
                  <span className="font-bold">4분 32초</span>
                </div>
              </div>
            </div>
          )}

          {widgets.includes('production-status') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🏭 생산 현황</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">오늘 생산량</span>
                  <span className="font-bold">1,234개</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">목표 달성률</span>
                  <span className="font-bold text-green-400">98.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">불량률</span>
                  <span className="font-bold">0.3%</span>
                </div>
              </div>
            </div>
          )}

          {widgets.includes('inventory') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">📦 재고 관리</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">총 재고</span>
                  <span className="font-bold">12,847개</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">재주문 필요</span>
                  <span className="font-bold text-yellow-400">3개 품목</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">회전율</span>
                  <span className="font-bold">34일</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 팀원 목록 */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">👥 팀원 ({teamMembers.length}명)</h2>
          <div className="grid grid-cols-3 gap-4">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{member.avatar}</span>
                  <div className="flex-1">
                    <div className="font-medium">{member.name}</div>
                    <div className="text-xs text-white/40">{member.position}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    member.status === 'active' ? 'bg-green-400' :
                    member.status === 'away' ? 'bg-yellow-400' :
                    'bg-white/20'
                  }`} />
                </div>
                <div className="text-xs text-white/60">{member.email}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
