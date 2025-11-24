'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Lazy load heavy components for better performance
const SearchBar = dynamic(() => import('@/components/SearchBar').then(mod => ({ default: mod.SearchBar })), {
  loading: () => <div className="w-full max-w-md h-10 bg-white/5 rounded-lg animate-pulse" />,
  ssr: false
});

const AnalyticsDashboard = dynamic(() => import('@/components/AnalyticsDashboard').then(mod => ({ default: mod.AnalyticsDashboard })), {
  loading: () => (
    <div className="space-y-6">
      <div className="h-8 bg-white/5 rounded-lg animate-pulse w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-1/2 mb-4" />
            <div className="h-8 bg-white/10 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  ),
  ssr: false
});

// 타입 정의
type UserRole = 'admin' | 'manager' | 'staff' | 'executive' | 'general_manager' | 'director' | 'team_leader' | 'lead' | 'senior' | 'intern';
type TaskStatus = 'pending' | 'in-progress' | 'review' | 'completed' | 'blocked';
type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: User;
  assignedBy: User;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  comments: Comment[];
  attachments: Attachment[];
  progress: number; // 0-100
  estimatedHours: number;
  actualHours: number;
}

interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
  edited: boolean;
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: User;
  uploadedAt: Date;
}

interface ActivityLog {
  id: string;
  user: User;
  action: string;
  target: string;
  details: string;
  timestamp: Date;
  blockchainHash?: string;
}

export default function WorkspacePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [view, setView] = useState<'dashboard' | 'tasks' | 'team' | 'analytics'>('dashboard');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');
  const [loading, setLoading] = useState(true);

  // 인증 확인 및 데모 데이터 생성
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
      setLoading(false);
    }
  }, []);

  // 실제 데이터는 localStorage에서 불러오기
  useEffect(() => {
    if (!currentUser) return;

    // localStorage에서 저장된 작업 불러오기
    const savedTasks = localStorage.getItem('fieldnine-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    // localStorage에서 저장된 활동 로그 불러오기
    const savedLogs = localStorage.getItem('fieldnine-activity-logs');
    if (savedLogs) {
      setActivityLogs(JSON.parse(savedLogs));
    }
  }, [currentUser]);

  // 통계 계산
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    urgent: tasks.filter(t => t.priority === 'urgent').length,
    avgProgress: tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length || 0
  };

  const getStatusColor = (status: TaskStatus) => {
    const colors = {
      pending: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      'in-progress': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      review: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      completed: 'bg-green-500/20 text-green-300 border-green-500/30',
      blocked: 'bg-red-500/20 text-red-300 border-red-500/30'
    };
    return colors[status];
  };

  const getPriorityColor = (priority: TaskPriority) => {
    const colors = {
      urgent: 'bg-red-500/20 text-red-300 border-red-500/50',
      high: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
      medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      low: 'bg-green-500/20 text-green-300 border-green-500/50'
    };
    return colors[priority];
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fieldnine-user');
      window.location.href = '/login';
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-[#02010a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⏳</div>
          <div className="text-2xl font-bold mb-2">로딩 중...</div>
          <div className="text-white/40">워크스페이스를 준비하고 있습니다</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02010a] text-white">
      {/* 헤더 */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  FIELD NINE
                </div>
                <span className="text-xs sm:text-sm text-white/40">Workspace</span>
              </Link>
              
              {/* Search Bar - Mobile */}
              <div className="w-full sm:hidden">
                <Suspense fallback={<div className="w-full h-10 bg-white/5 rounded-lg animate-pulse" />}>
                  <SearchBar />
                </Suspense>
              </div>
              
              <nav className="flex flex-wrap gap-2">
                {(['dashboard', 'tasks', 'team', 'analytics'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      view === v 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {v === 'dashboard' ? '대시보드' : 
                     v === 'tasks' ? '작업' :
                     v === 'team' ? '팀' :
                     v === 'analytics' ? '분석' : v}
                  </button>
                ))}
                <Link
                  href="/data-management"
                  className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
                >
                  📊 데이터
                </Link>
              </nav>
            </div>

            {currentUser && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                {/* Search Bar - Desktop */}
                <div className="hidden sm:block">
                  <Suspense fallback={<div className="w-64 h-10 bg-white/5 rounded-lg animate-pulse" />}>
                    <SearchBar />
                  </Suspense>
                </div>

                {/* 슈퍼 관리자 전용 버튼 */}
                {(currentUser.role === 'executive' || currentUser.role === 'general_manager') && (
                  <Link
                    href="/executive-dashboard"
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-purple-500/50 text-sm"
                  >
                    <span>👑</span>
                    <span className="hidden sm:inline">슈퍼 관리자 대시보드</span>
                    <span className="sm:hidden">관리자</span>
                  </Link>
                )}
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="hidden sm:inline text-sm text-white/60">{currentUser.department}</span>
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex-1 sm:flex-initial">
                    <span className="text-lg sm:text-xl">{currentUser.avatar}</span>
                    <div className="flex-1 sm:flex-initial">
                      <div className="text-xs sm:text-sm font-medium">{currentUser.name}</div>
                      <div className="text-xs text-white/40 capitalize">{currentUser.role}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 sm:px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-xs sm:text-sm text-red-300 hover:bg-red-500/20 transition-all"
                    title="로그아웃"
                  >
                    <span className="hidden sm:inline">🚪 로그아웃</span>
                    <span className="sm:hidden">🚪</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {view === 'dashboard' && (
          <div className="space-y-8">
            {/* 통계 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-300">{stats.total}</div>
                <div className="text-sm text-white/60 mt-1">전체 작업</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-300">{stats.inProgress}</div>
                <div className="text-sm text-white/60 mt-1">진행 중</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-yellow-300">{stats.urgent}</div>
                <div className="text-sm text-white/60 mt-1">긴급</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-300">{stats.avgProgress.toFixed(1)}%</div>
                <div className="text-sm text-white/60 mt-1">평균 진행률</div>
              </div>
            </div>

            {/* 나의 작업 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">나의 작업</h2>
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                {tasks.filter(t => t.assignee.id === currentUser?.id).map(task => (
                  <div
                    key={task.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 mb-4">{task.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/40">진행률</span>
                        <span className="font-medium">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className="text-xs text-white/40">
                          마감: {task.deadline.toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 최근 활동 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">최근 활동</h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                {activityLogs.map(log => (
                  <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0">
                    <span className="text-2xl">{log.user.avatar}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{log.user.name}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-sm text-white/60">{log.action}</span>
                      </div>
                      <div className="text-sm text-white/80 mb-1">{log.target}</div>
                      <div className="text-xs text-white/40">{log.details}</div>
                      {log.blockchainHash && (
                        <div className="mt-2 flex items-center gap-2 text-xs">
                          <span className="text-cyan-400">⛓️ Blockchain</span>
                          <code className="text-white/40 font-mono">{log.blockchainHash}</code>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-white/40 whitespace-nowrap">
                      {log.timestamp.toLocaleTimeString('ko-KR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'tasks' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">전체 작업</h2>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <select 
                  className="flex-1 sm:flex-initial bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                >
                  <option value="all">모든 상태</option>
                  <option value="pending">대기</option>
                  <option value="in-progress">진행중</option>
                  <option value="review">검토</option>
                  <option value="completed">완료</option>
                </select>
                <select 
                  className="flex-1 sm:flex-initial bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as any)}
                >
                  <option value="all">모든 우선순위</option>
                  <option value="urgent">긴급</option>
                  <option value="high">높음</option>
                  <option value="medium">보통</option>
                  <option value="low">낮음</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredTasks.map(task => (
                <div
                  key={task.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/60 mb-3">{task.description}</p>
                      <div className="flex items-center gap-6 text-sm text-white/50">
                        <span>담당: {task.assignee.name}</span>
                        <span>•</span>
                        <span>부서: {task.assignee.department}</span>
                        <span>•</span>
                        <span>마감: {task.deadline.toLocaleDateString('ko-KR')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">{task.progress}%</div>
                      <div className="text-xs text-white/40 mt-1">{task.actualHours}h / {task.estimatedHours}h</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'team' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">👥</div>
            <h2 className="text-2xl font-bold mb-2">팀 협업 기능</h2>
            <p className="text-white/60">곧 출시됩니다</p>
          </div>
        )}

        {view === 'analytics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">분석 & 리포트</h2>
              <div className="flex gap-2">
                <button className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm hover:bg-white/10 transition-colors">
                  📥 내보내기
                </button>
                <button className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm hover:bg-white/10 transition-colors">
                  📧 공유
                </button>
              </div>
            </div>
            
            {/* NEXUS OS Analytics Dashboard */}
            <Suspense fallback={<div className="text-center py-12 text-white/60">로딩 중...</div>}>
              <AnalyticsDashboard />
            </Suspense>
            
            {/* Workspace Analytics Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Task Completion Rate */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">작업 완료율</h3>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {stats.completed > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                </div>
                <div className="text-sm text-white/60">
                  {stats.completed} / {stats.total} 완료
                </div>
                <div className="mt-4 w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${stats.completed > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Average Progress */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">평균 진행률</h3>
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {stats.avgProgress.toFixed(1)}%
                </div>
                <div className="text-sm text-white/60">
                  전체 작업 평균
                </div>
                <div className="mt-4 w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-cyan-500 h-2 rounded-full transition-all"
                    style={{ width: `${stats.avgProgress}%` }}
                  />
                </div>
              </div>

              {/* Urgent Tasks */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">긴급 작업</h3>
                <div className="text-4xl font-bold text-red-400 mb-2">
                  {stats.urgent}
                </div>
                <div className="text-sm text-white/60">
                  즉시 처리 필요
                </div>
                {stats.urgent > 0 && (
                  <div className="mt-4 text-xs text-red-400">
                    ⚠️ 우선순위 높음
                  </div>
                )}
              </div>
            </div>

            {/* Task Status Distribution */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6">작업 상태 분포</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400">{stats.pending}</div>
                  <div className="text-sm text-white/60 mt-1">대기</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{stats.inProgress}</div>
                  <div className="text-sm text-white/60 mt-1">진행중</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{stats.review}</div>
                  <div className="text-sm text-white/60 mt-1">검토</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
                  <div className="text-sm text-white/60 mt-1">완료</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">
                    {tasks.filter(t => t.status === 'blocked').length}
                  </div>
                  <div className="text-sm text-white/60 mt-1">차단</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 작업 상세 모달 */}
      {selectedTask && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedTask(null)}
        >
          <div 
            className="bg-[#0a0a0f] border border-white/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-3xl font-bold">{selectedTask.title}</h2>
                <button 
                  onClick={() => setSelectedTask(null)}
                  className="text-white/40 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-sm text-white/40 mb-2">설명</div>
                  <p className="text-white/80">{selectedTask.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-white/40 mb-2">담당자</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{selectedTask.assignee.avatar}</span>
                      <div>
                        <div className="font-medium">{selectedTask.assignee.name}</div>
                        <div className="text-xs text-white/40">{selectedTask.assignee.department}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-white/40 mb-2">할당자</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{selectedTask.assignedBy.avatar}</span>
                      <div>
                        <div className="font-medium">{selectedTask.assignedBy.name}</div>
                        <div className="text-xs text-white/40">{selectedTask.assignedBy.role}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-white/40 mb-2">상태</div>
                    <span className={`inline-block px-3 py-1 rounded text-sm border ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-2">우선순위</div>
                    <span className={`inline-block px-3 py-1 rounded text-sm border ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-2">마감일</div>
                    <div className="text-white/80">{selectedTask.deadline.toLocaleDateString('ko-KR')}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-white/40 mb-2">진행률</div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-white/10 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full"
                        style={{ width: `${selectedTask.progress}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold text-cyan-400">{selectedTask.progress}%</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-white/40 mb-2">예상 시간</div>
                    <div className="text-xl font-semibold text-white/80">{selectedTask.estimatedHours}시간</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-2">실제 시간</div>
                    <div className="text-xl font-semibold text-cyan-400">{selectedTask.actualHours}시간</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-white/40 mb-2">태그</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
