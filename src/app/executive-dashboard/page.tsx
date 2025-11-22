'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 대표님 전용 슈퍼 관리자 통합 대시보드

interface Widget {
  id: string;
  title: string;
  type: 'team-overview' | 'financial' | 'projects' | 'alerts' | 'performance' | 'custom';
  team?: string;
  data?: any;
  size: 'small' | 'medium' | 'large' | 'full';
  position: { x: number; y: number };
}

interface Team {
  id: string;
  name: string;
  icon: string;
  color: string;
  memberCount: number;
  activeProjects: number;
  budget: number;
  performance: number;
}

const ALL_TEAMS: Team[] = [
  { id: 'filluminate', name: 'FILLUMINATE', icon: '💡', color: 'from-yellow-500 to-orange-500', memberCount: 8, activeProjects: 12, budget: 45000000, performance: 94.7 },
  { id: 'mardmard', name: 'MARD MARD', icon: '🎬', color: 'from-pink-500 to-rose-500', memberCount: 8, activeProjects: 15, budget: 38000000, performance: 91.2 },
  { id: 'nexus', name: 'NEXUS & THE FIELD NINE', icon: '🔗', color: 'from-blue-500 to-cyan-500', memberCount: 5, activeProjects: 8, budget: 52000000, performance: 96.3 },
  { id: 'orasydney', name: 'ORA SYDNEY (예정)', icon: '🌏', color: 'from-purple-500 to-indigo-500', memberCount: 0, activeProjects: 3, budget: 0, performance: 0 },
  { id: 'design', name: '디자인팀', icon: '🎨', color: 'from-purple-500 to-pink-500', memberCount: 7, activeProjects: 18, budget: 28000000, performance: 89.5 },
  { id: 'production', name: '생산팀', icon: '🏭', color: 'from-blue-500 to-cyan-500', memberCount: 3, activeProjects: 6, budget: 62000000, performance: 92.8 },
  { id: 'online', name: '온라인팀', icon: '💻', color: 'from-cyan-500 to-teal-500', memberCount: 3, activeProjects: 10, budget: 32000000, performance: 88.4 },
  { id: 'offline', name: '오프라인팀', icon: '🏪', color: 'from-fuchsia-500 to-purple-500', memberCount: 2, activeProjects: 5, budget: 25000000, performance: 86.9 },
  { id: 'operations', name: '운영지원팀', icon: '⚙️', color: 'from-emerald-500 to-green-500', memberCount: 7, activeProjects: 9, budget: 42000000, performance: 93.6 }
];

const CRITICAL_ALERTS = [
  { id: 1, type: 'CRITICAL', team: 'NEXUS', title: '세무 신고 마감 3일 전', timestamp: '3분 전', priority: 'urgent' },
  { id: 2, type: 'HIGH', team: 'FILLUMINATE', title: '대규모 계약 승인 대기', amount: '₩125M', timestamp: '15분 전', priority: 'high' },
  { id: 3, type: 'MEDIUM', team: 'MARD MARD', title: '신규 캠페인 최종 검토', timestamp: '1시간 전', priority: 'medium' },
  { id: 4, type: 'HIGH', team: '생산팀', title: '재고 부족 경고 (3일분)', timestamp: '2시간 전', priority: 'high' },
  { id: 5, type: 'CRITICAL', team: '운영지원팀', title: '급여 지급 승인 필요 (26명)', amount: '₩87M', timestamp: '4시간 전', priority: 'urgent' }
];

const DEFAULT_WIDGETS: Widget[] = [
  { id: 'w1', title: '전사 재무 현황', type: 'financial', size: 'large', position: { x: 0, y: 0 } },
  { id: 'w2', title: 'CRITICAL 알림', type: 'alerts', size: 'medium', position: { x: 2, y: 0 } },
  { id: 'w3', title: '전체 팀 성과', type: 'performance', size: 'full', position: { x: 0, y: 1 } },
  { id: 'w4', title: 'FILLUMINATE 현황', type: 'team-overview', team: 'filluminate', size: 'medium', position: { x: 0, y: 2 } },
  { id: 'w5', title: 'MARD MARD 현황', type: 'team-overview', team: 'mardmard', size: 'medium', position: { x: 1, y: 2 } },
  { id: 'w6', title: 'NEXUS 현황', type: 'team-overview', team: 'nexus', size: 'medium', position: { x: 2, y: 2 } }
];

export default function ExecutiveDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [widgets, setWidgets] = useState<Widget[]>(DEFAULT_WIDGETS);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>(['all']);
  const [showWidgetPicker, setShowWidgetPicker] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('fieldnine-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    // 대표 또는 본부장만 접근 가능
    if (userData.role !== 'executive' && userData.role !== 'general_manager') {
      alert('슈퍼 관리자 전용 페이지입니다.');
      router.push('/workspace');
      return;
    }
    
    setUser(userData);
  }, [router]);

  const addWidget = (type: Widget['type'], team?: string) => {
    const newWidget: Widget = {
      id: `w${Date.now()}`,
      title: team ? `${ALL_TEAMS.find(t => t.id === team)?.name} 상세` : '새 위젯',
      type,
      team,
      size: 'medium',
      position: { x: 0, y: widgets.length }
    };
    setWidgets([...widgets, newWidget]);
    setShowWidgetPicker(false);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const getTotalBudget = () => {
    return ALL_TEAMS.reduce((sum, team) => sum + team.budget, 0);
  };

  const getAveragePerformance = () => {
    const activeTeams = ALL_TEAMS.filter(t => t.memberCount > 0);
    return activeTeams.reduce((sum, team) => sum + team.performance, 0) / activeTeams.length;
  };

  const getTotalProjects = () => {
    return ALL_TEAMS.reduce((sum, team) => sum + team.activeProjects, 0);
  };

  const getTotalMembers = () => {
    return ALL_TEAMS.reduce((sum, team) => sum + team.memberCount, 0);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#02010a] text-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                FIELD NINE
              </Link>
              <div className="text-sm text-white/40">|</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👑</span>
                <span className="text-lg font-semibold">슈퍼 관리자 대시보드</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCustomizing(!isCustomizing)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isCustomizing
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                {isCustomizing ? '✓ 커스터마이징 완료' : '⚙️ 대시보드 편집'}
              </button>

              {isCustomizing && (
                <button
                  onClick={() => setShowWidgetPicker(true)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium transition-all"
                >
                  + 위젯 추가
                </button>
              )}

              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <span className="text-2xl">{user.avatar}</span>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-white/40">
                    {user.role === 'executive' ? '총괄' : '본부장'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-[1800px] mx-auto p-6">
        {/* 전사 핵심 지표 */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
            <div className="text-sm text-white/60 mb-2">전체 예산</div>
            <div className="text-3xl font-bold mb-1">₩{(getTotalBudget() / 100000000).toFixed(1)}억</div>
            <div className="text-xs text-green-400">+12.4% vs 지난달</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
            <div className="text-sm text-white/60 mb-2">평균 성과</div>
            <div className="text-3xl font-bold mb-1">{getAveragePerformance().toFixed(1)}%</div>
            <div className="text-xs text-green-400">+3.2% vs 목표</div>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-500/10 to-fuchsia-500/5 border border-fuchsia-500/20 rounded-2xl p-6">
            <div className="text-sm text-white/60 mb-2">진행 프로젝트</div>
            <div className="text-3xl font-bold mb-1">{getTotalProjects()}개</div>
            <div className="text-xs text-yellow-400">5개 승인 대기</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
            <div className="text-sm text-white/60 mb-2">전체 인원</div>
            <div className="text-3xl font-bold mb-1">{getTotalMembers()}명</div>
            <div className="text-xs text-white/40">9개 팀 운영 중</div>
          </div>
        </div>

        {/* 위젯 그리드 */}
        <div className="grid grid-cols-3 gap-6">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className={`bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative ${
                widget.size === 'small' ? 'col-span-1' :
                widget.size === 'medium' ? 'col-span-1' :
                widget.size === 'large' ? 'col-span-2' :
                'col-span-3'
              }`}
            >
              {/* 위젯 헤더 */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{widget.title}</h3>
                {isCustomizing && (
                  <button
                    onClick={() => removeWidget(widget.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* 위젯 컨텐츠 */}
              {widget.type === 'financial' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm text-white/60">월간 매출</div>
                      <div className="text-2xl font-bold text-green-400">₩2.4억</div>
                    </div>
                    <div className="text-green-400">+18.2%</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm text-white/60">월간 비용</div>
                      <div className="text-2xl font-bold text-red-400">₩1.1억</div>
                    </div>
                    <div className="text-red-400">+5.4%</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg border border-purple-500/30">
                    <div>
                      <div className="text-sm text-white/60">순이익</div>
                      <div className="text-2xl font-bold">₩1.3억</div>
                    </div>
                    <div className="text-green-400">+32.8%</div>
                  </div>
                </div>
              )}

              {widget.type === 'alerts' && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {CRITICAL_ALERTS.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border ${
                        alert.priority === 'urgent'
                          ? 'bg-red-500/10 border-red-500/30'
                          : alert.priority === 'high'
                          ? 'bg-yellow-500/10 border-yellow-500/30'
                          : 'bg-blue-500/10 border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-bold rounded ${
                            alert.priority === 'urgent'
                              ? 'bg-red-500 text-white'
                              : alert.priority === 'high'
                              ? 'bg-yellow-500 text-black'
                              : 'bg-blue-500 text-white'
                          }`}>
                            {alert.type}
                          </span>
                          <span className="text-sm text-white/60">{alert.team}</span>
                        </div>
                        <span className="text-xs text-white/40">{alert.timestamp}</span>
                      </div>
                      <div className="font-medium">{alert.title}</div>
                      {alert.amount && (
                        <div className="text-sm text-purple-400 mt-1">{alert.amount}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {widget.type === 'performance' && (
                <div className="space-y-4">
                  {ALL_TEAMS.filter(t => t.memberCount > 0).map((team) => (
                    <div key={team.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{team.icon}</span>
                          <span className="font-medium">{team.name}</span>
                        </div>
                        <span className="text-sm font-bold">{team.performance}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${team.color} transition-all duration-500`}
                          style={{ width: `${team.performance}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {widget.type === 'team-overview' && widget.team && (
                <div className="space-y-4">
                  {(() => {
                    const team = ALL_TEAMS.find(t => t.id === widget.team);
                    if (!team) return null;
                    return (
                      <>
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-4xl">{team.icon}</span>
                          <div>
                            <div className="text-xl font-bold">{team.name}</div>
                            <div className="text-sm text-white/60">{team.memberCount}명</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-white/5 rounded-lg">
                            <div className="text-xs text-white/60 mb-1">진행 프로젝트</div>
                            <div className="text-2xl font-bold">{team.activeProjects}개</div>
                          </div>
                          <div className="p-4 bg-white/5 rounded-lg">
                            <div className="text-xs text-white/60 mb-1">예산</div>
                            <div className="text-2xl font-bold">₩{(team.budget / 10000000).toFixed(1)}천만</div>
                          </div>
                        </div>
                        <Link
                          href={`/team/${widget.team}`}
                          className="block w-full py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 border border-purple-500/30 rounded-lg text-center font-medium transition-all"
                        >
                          팀 상세보기 →
                        </Link>
                      </>
                    );
                  })()}
                </div>
              )}

              {widget.type === 'projects' && (
                <div className="space-y-3">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">NEXUS OS 3D 맵 최적화</span>
                      <span className="text-xs px-2 py-1 bg-yellow-500 text-black rounded font-bold">진행중</span>
                    </div>
                    <div className="text-sm text-white/60 mb-2">생산팀 · 마감 2025-11-25</div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: '65%' }} />
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">FILLUMINATE 데이터 파이프라인</span>
                      <span className="text-xs px-2 py-1 bg-green-500 text-white rounded font-bold">완료</span>
                    </div>
                    <div className="text-sm text-white/60 mb-2">FILLUMINATE · 완료 2025-11-20</div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 전체 팀 빠른 접근 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">전체 팀 빠른 접근</h2>
          <div className="grid grid-cols-3 gap-6">
            {ALL_TEAMS.map((team) => (
              <Link
                key={team.id}
                href={team.memberCount > 0 ? `/team/${team.id}` : '#'}
                className={`group p-6 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl transition-all ${
                  team.memberCount > 0
                    ? 'hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-4xl p-3 bg-gradient-to-br ${team.color} rounded-xl`}>
                    {team.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{team.name}</h3>
                    <p className="text-sm text-white/60">
                      {team.memberCount > 0 ? `${team.memberCount}명 · ${team.activeProjects}개 프로젝트` : '준비 중'}
                    </p>
                  </div>
                </div>
                {team.memberCount > 0 && (
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-sm">
                      <span className="text-white/60">성과: </span>
                      <span className="font-bold text-green-400">{team.performance}%</span>
                    </div>
                    <div className="text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                      상세보기 →
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* 위젯 추가 모달 */}
      {showWidgetPicker && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">위젯 추가</h2>
              <button
                onClick={() => setShowWidgetPicker(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">전사 위젯</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => addWidget('financial')}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-all"
                  >
                    <div className="text-lg mb-2">💰 재무 현황</div>
                    <div className="text-sm text-white/60">매출, 비용, 순이익</div>
                  </button>
                  <button
                    onClick={() => addWidget('alerts')}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-all"
                  >
                    <div className="text-lg mb-2">🚨 CRITICAL 알림</div>
                    <div className="text-sm text-white/60">긴급 승인 대기</div>
                  </button>
                  <button
                    onClick={() => addWidget('performance')}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-all"
                  >
                    <div className="text-lg mb-2">📊 전체 팀 성과</div>
                    <div className="text-sm text-white/60">팀별 성과 비교</div>
                  </button>
                  <button
                    onClick={() => addWidget('projects')}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-all"
                  >
                    <div className="text-lg mb-2">📋 프로젝트 현황</div>
                    <div className="text-sm text-white/60">진행 중인 프로젝트</div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">팀별 위젯</h3>
                <div className="grid grid-cols-2 gap-4">
                  {ALL_TEAMS.filter(t => t.memberCount > 0).map((team) => (
                    <button
                      key={team.id}
                      onClick={() => addWidget('team-overview', team.id)}
                      className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{team.icon}</span>
                        <span className="font-bold">{team.name}</span>
                      </div>
                      <div className="text-sm text-white/60">
                        {team.memberCount}명 · {team.activeProjects}개 프로젝트
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
