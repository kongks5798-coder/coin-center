'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  // 임시 데모 데이터 생성
  useEffect(() => {
    if (!currentUser) return;

    // 데모 작업들
    const demoTasks: Task[] = [
      {
        id: 'task-1',
        title: 'NEXUS OS 3D 맵 성능 최적화',
        description: '로봇 경로 계산 알고리즘을 50ms 이하로 개선',
        assignee: currentUser,
        assignedBy: { ...currentUser, id: 'admin-1', name: '박나인', role: 'admin' },
        status: 'in-progress',
        priority: 'urgent',
        deadline: new Date('2025-11-25'),
        createdAt: new Date('2025-11-20'),
        updatedAt: new Date(),
        tags: ['NEXUS', 'Performance', 'Backend'],
        comments: [],
        attachments: [],
        progress: 65,
        estimatedHours: 16,
        actualHours: 10.5
      },
      {
        id: 'task-2',
        title: 'MARD MARD 브랜드 가이드 작성',
        description: '로고, 컬러 팔레트, 타이포그래피 정리',
        assignee: { ...currentUser, id: 'user-2', name: '이크리에이티브', department: 'MARD MARD' },
        assignedBy: currentUser,
        status: 'review',
        priority: 'high',
        deadline: new Date('2025-11-23'),
        createdAt: new Date('2025-11-18'),
        updatedAt: new Date(),
        tags: ['MARD MARD', 'Design', 'Branding'],
        comments: [],
        attachments: [],
        progress: 90,
        estimatedHours: 8,
        actualHours: 7.2
      },
      {
        id: 'task-3',
        title: 'FILLUMINATE 데이터 파이프라인 구축',
        description: 'Kafka + Spark 실시간 스트리밍 처리',
        assignee: currentUser,
        assignedBy: currentUser,
        status: 'pending',
        priority: 'medium',
        deadline: new Date('2025-11-28'),
        createdAt: new Date('2025-11-22'),
        updatedAt: new Date(),
        tags: ['FILLUMINATE', 'Data', 'Infrastructure'],
        comments: [],
        attachments: [],
        progress: 0,
        estimatedHours: 24,
        actualHours: 0
      },
      {
        id: 'task-4',
        title: 'fieldnine.io 도메인 연결',
        description: 'Vercel DNS 설정 및 SSL 인증서 적용',
        assignee: { ...currentUser, id: 'user-3', name: '최데브옵스', department: 'Infrastructure' },
        assignedBy: currentUser,
        status: 'completed',
        priority: 'high',
        deadline: new Date('2025-11-22'),
        createdAt: new Date('2025-11-21'),
        updatedAt: new Date(),
        tags: ['DevOps', 'Domain', 'Security'],
        comments: [],
        attachments: [],
        progress: 100,
        estimatedHours: 4,
        actualHours: 3.5
      }
    ];
    setTasks(demoTasks);

    // 활동 로그
    const demoLogs: ActivityLog[] = [
      {
        id: 'log-1',
        user: currentUser,
        action: 'updated',
        target: 'NEXUS OS 3D 맵 성능 최적화',
        details: '진행률 65%로 업데이트',
        timestamp: new Date(),
        blockchainHash: '0x7a9f..3d2e'
      },
      {
        id: 'log-2',
        user: { ...currentUser, id: 'user-2', name: '이크리에이티브' },
        action: 'submitted',
        target: 'MARD MARD 브랜드 가이드',
        details: '검토 요청됨',
        timestamp: new Date(Date.now() - 1800000),
        blockchainHash: '0x5b2c..1a4f'
      }
    ];
    setActivityLogs(demoLogs);
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
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  FIELD NINE
                </div>
                <span className="text-sm text-white/40">Workspace</span>
              </Link>
              
              <nav className="flex gap-2">
                {(['dashboard', 'tasks', 'team', 'analytics'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      view === v 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
                <Link
                  href="/data-management"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
                >
                  📊 데이터 관리
                </Link>
              </nav>
            </div>

            {currentUser && (
              <div className="flex items-center gap-3">
                {/* 슈퍼 관리자 전용 버튼 */}
                {(currentUser.role === 'executive' || currentUser.role === 'general_manager') && (
                  <Link
                    href="/executive-dashboard"
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-purple-500/50"
                  >
                    <span>👑</span>
                    <span>슈퍼 관리자 대시보드</span>
                  </Link>
                )}
                
                <span className="text-sm text-white/60">{currentUser.department}</span>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-xl">{currentUser.avatar}</span>
                  <div>
                    <div className="text-sm font-medium">{currentUser.name}</div>
                    <div className="text-xs text-white/40 capitalize">{currentUser.role}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300 hover:bg-red-500/20 transition-all"
                  title="로그아웃"
                >
                  🚪 로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 py-8">
        {view === 'dashboard' && (
          <div className="space-y-8">
            {/* 통계 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <h2 className="text-2xl font-bold mb-4">나의 작업</h2>
              <div className="grid md:grid-cols-2 gap-4">
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
              <h2 className="text-2xl font-bold mb-4">최근 활동</h2>
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">전체 작업</h2>
              <div className="flex gap-3">
                <select 
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm"
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
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm"
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
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold mb-2">분석 & 리포트</h2>
            <p className="text-white/60">곧 출시됩니다</p>
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
