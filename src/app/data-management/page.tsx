'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ⛔ CRITICAL SECURITY: 데이터 관리 시스템 - 총괄/본부장 전용
// 최고 보안 등급 - 재무, 세무, 인사 등 핵심 데이터 관리

interface DataEntry {
  id: string;
  category: string; // 'financial' | 'tax' | 'hr' | 'project' | 'inventory' | 'sales' | 'custom'
  title: string;
  data: any;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  department: string;
  accessLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL' | 'PUBLIC';
  tags: string[];
  attachments?: string[];
}

interface DataTemplate {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  fields: TemplateField[];
  requiredRole: string[];
}

interface TemplateField {
  name: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'select' | 'textarea' | 'file';
  label: string;
  required: boolean;
  options?: string[];
}

const DATA_TEMPLATES: DataTemplate[] = [
  // 재무 데이터
  {
    id: 'financial-revenue',
    name: '월간 매출 입력',
    category: 'financial',
    icon: '💰',
    description: '월별 매출 데이터 입력',
    requiredRole: ['executive', 'general_manager', 'director', 'manager'],
    fields: [
      { name: 'month', type: 'date', label: '년월', required: true },
      { name: 'revenue', type: 'currency', label: '매출액', required: true },
      { name: 'cost', type: 'currency', label: '비용', required: true },
      { name: 'profit', type: 'currency', label: '순이익', required: true },
      { name: 'category', type: 'select', label: '구분', required: true, options: ['상품매출', '서비스매출', '기타매출'] },
      { name: 'notes', type: 'textarea', label: '비고', required: false }
    ]
  },
  {
    id: 'financial-expense',
    name: '지출 내역',
    category: 'financial',
    icon: '💸',
    description: '회사 지출 기록',
    requiredRole: ['executive', 'general_manager', 'director', 'manager'],
    fields: [
      { name: 'date', type: 'date', label: '지출일', required: true },
      { name: 'amount', type: 'currency', label: '금액', required: true },
      { name: 'category', type: 'select', label: '분류', required: true, options: ['인건비', '임대료', '마케팅', '시스템', '운영비', '기타'] },
      { name: 'vendor', type: 'text', label: '거래처', required: true },
      { name: 'description', type: 'textarea', label: '내용', required: true },
      { name: 'receipt', type: 'file', label: '영수증', required: false }
    ]
  },

  // 세무 데이터
  {
    id: 'tax-report',
    name: '세무 신고',
    category: 'tax',
    icon: '📋',
    description: '세무 신고 데이터',
    requiredRole: ['executive', 'general_manager'],
    fields: [
      { name: 'quarter', type: 'select', label: '분기', required: true, options: ['1분기', '2분기', '3분기', '4분기'] },
      { name: 'taxType', type: 'select', label: '세금 종류', required: true, options: ['부가가치세', '법인세', '소득세', '기타'] },
      { name: 'amount', type: 'currency', label: '세액', required: true },
      { name: 'dueDate', type: 'date', label: '납부기한', required: true },
      { name: 'status', type: 'select', label: '상태', required: true, options: ['예정', '진행중', '완료'] },
      { name: 'notes', type: 'textarea', label: '비고', required: false }
    ]
  },

  // 인사 데이터
  {
    id: 'hr-salary',
    name: '급여 정보',
    category: 'hr',
    icon: '💵',
    description: '직원 급여 데이터',
    requiredRole: ['executive', 'general_manager'],
    fields: [
      { name: 'employeeName', type: 'text', label: '직원명', required: true },
      { name: 'month', type: 'date', label: '급여월', required: true },
      { name: 'baseSalary', type: 'currency', label: '기본급', required: true },
      { name: 'bonus', type: 'currency', label: '상여금', required: false },
      { name: 'deduction', type: 'currency', label: '공제액', required: false },
      { name: 'netPay', type: 'currency', label: '실수령액', required: true }
    ]
  },
  {
    id: 'hr-attendance',
    name: '근태 관리',
    category: 'hr',
    icon: '📅',
    description: '직원 출퇴근 기록',
    requiredRole: ['team_leader', 'lead', 'senior'],
    fields: [
      { name: 'employeeName', type: 'text', label: '직원명', required: true },
      { name: 'date', type: 'date', label: '날짜', required: true },
      { name: 'checkIn', type: 'text', label: '출근시간', required: true },
      { name: 'checkOut', type: 'text', label: '퇴근시간', required: true },
      { name: 'status', type: 'select', label: '상태', required: true, options: ['정상', '지각', '조퇴', '결근', '휴가'] },
      { name: 'notes', type: 'textarea', label: '비고', required: false }
    ]
  },

  // 프로젝트 데이터
  {
    id: 'project-new',
    name: '신규 프로젝트',
    category: 'project',
    icon: '🚀',
    description: '새 프로젝트 등록',
    requiredRole: ['manager', 'team_leader'],
    fields: [
      { name: 'projectName', type: 'text', label: '프로젝트명', required: true },
      { name: 'client', type: 'text', label: '클라이언트', required: false },
      { name: 'startDate', type: 'date', label: '시작일', required: true },
      { name: 'endDate', type: 'date', label: '종료일', required: true },
      { name: 'budget', type: 'currency', label: '예산', required: true },
      { name: 'team', type: 'select', label: '담당팀', required: true, options: ['디자인팀', 'MARD MARD', '생산팀', '온라인팀', '오프라인팀', '운영지원팀'] },
      { name: 'description', type: 'textarea', label: '프로젝트 설명', required: true }
    ]
  },
  {
    id: 'project-milestone',
    name: '마일스톤',
    category: 'project',
    icon: '🎯',
    description: '프로젝트 단계 기록',
    requiredRole: ['team_leader', 'lead'],
    fields: [
      { name: 'projectName', type: 'text', label: '프로젝트명', required: true },
      { name: 'milestone', type: 'text', label: '마일스톤', required: true },
      { name: 'completionDate', type: 'date', label: '완료일', required: true },
      { name: 'progress', type: 'number', label: '진행률 (%)', required: true },
      { name: 'deliverables', type: 'textarea', label: '산출물', required: true },
      { name: 'nextSteps', type: 'textarea', label: '다음 단계', required: false }
    ]
  },

  // 재고 데이터
  {
    id: 'inventory-stock',
    name: '재고 현황',
    category: 'inventory',
    icon: '📦',
    description: '제품 재고 관리',
    requiredRole: ['staff', 'senior'],
    fields: [
      { name: 'productName', type: 'text', label: '제품명', required: true },
      { name: 'sku', type: 'text', label: 'SKU', required: true },
      { name: 'quantity', type: 'number', label: '수량', required: true },
      { name: 'location', type: 'text', label: '보관위치', required: true },
      { name: 'lastUpdated', type: 'date', label: '최종 업데이트', required: true },
      { name: 'reorderLevel', type: 'number', label: '재주문 기준', required: false }
    ]
  },

  // 영업 데이터
  {
    id: 'sales-daily',
    name: '일일 매출',
    category: 'sales',
    icon: '💳',
    description: '일일 판매 기록',
    requiredRole: ['staff', 'senior'],
    fields: [
      { name: 'date', type: 'date', label: '날짜', required: true },
      { name: 'channel', type: 'select', label: '판매채널', required: true, options: ['온라인', '오프라인', '도매', 'B2B'] },
      { name: 'amount', type: 'currency', label: '매출액', required: true },
      { name: 'transactions', type: 'number', label: '거래건수', required: true },
      { name: 'avgTransaction', type: 'currency', label: '평균 거래액', required: false },
      { name: 'notes', type: 'textarea', label: '비고', required: false }
    ]
  },

  // 커스텀 데이터
  {
    id: 'custom-data',
    name: '커스텀 데이터',
    category: 'custom',
    icon: '📝',
    description: '자유 형식 데이터',
    requiredRole: ['staff', 'senior', 'lead'],
    fields: [
      { name: 'title', type: 'text', label: '제목', required: true },
      { name: 'category', type: 'text', label: '분류', required: true },
      { name: 'content', type: 'textarea', label: '내용', required: true },
      { name: 'date', type: 'date', label: '날짜', required: true },
      { name: 'attachment', type: 'file', label: '첨부파일', required: false }
    ]
  }
];

const ROLE_HIERARCHY: Record<string, number> = {
  'executive': 9,
  'general_manager': 8,
  'director': 7,
  'manager': 6,
  'team_leader': 5,
  'lead': 4,
  'senior': 3,
  'staff': 2,
  'intern': 1
};

export default function DataManagementPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<'templates' | 'mydata' | 'alldata'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<DataTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    const storedUser = localStorage.getItem('fieldnine-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    
    // ⛔ CRITICAL SECURITY: 접근 권한 설정
    // localStorage에서 추가 권한 확인 (대표님이 나중에 설정 가능)
    const allowedRoles = ['executive', 'general_manager'];
    const additionalAccess = localStorage.getItem('fieldnine-data-management-access');
    if (additionalAccess) {
      try {
        const extraRoles = JSON.parse(additionalAccess);
        allowedRoles.push(...extraRoles);
      } catch (e) {
        console.error('Invalid access configuration');
      }
    }
    
    // 권한 체크
    if (!allowedRoles.includes(userData.role)) {
      alert('🔒 접근 거부\n\n이 페이지는 최고 관리자 전용입니다.\n(총괄, 본부장만 접근 가능)\n\n추가 권한이 필요하면 총괄에게 문의하세요.');
      router.push('/workspace');
      return;
    }
    
    setUser(userData);

    // 저장된 데이터 로드
    const stored = localStorage.getItem('fieldnine-data-entries');
    if (stored) {
      setDataEntries(JSON.parse(stored));
    }
  }, [router]);

  const canUseTemplate = (template: DataTemplate) => {
    if (!user) return false;
    const userLevel = ROLE_HIERARCHY[user.role] || 0;
    const requiredLevel = Math.min(...template.requiredRole.map(r => ROLE_HIERARCHY[r] || 0));
    return userLevel >= requiredLevel;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate || !user) return;

    const newEntry: DataEntry = {
      id: `data-${Date.now()}`,
      category: selectedTemplate.category,
      title: formData.title || selectedTemplate.name,
      data: { ...formData },
      createdBy: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      department: user.department,
      accessLevel: selectedTemplate.category === 'tax' || selectedTemplate.category === 'financial' ? 'CRITICAL' : 
                   selectedTemplate.category === 'hr' ? 'HIGH' : 'NORMAL',
      tags: [selectedTemplate.category, user.department]
    };

    const updated = [...dataEntries, newEntry];
    setDataEntries(updated);
    localStorage.setItem('fieldnine-data-entries', JSON.stringify(updated));

    alert('✓ 데이터가 저장되었습니다!');
    setSelectedTemplate(null);
    setFormData({});
  };

  const myData = dataEntries.filter(e => e.createdBy === user?.name);
  const filteredData = filterCategory === 'all' 
    ? dataEntries 
    : dataEntries.filter(e => e.category === filterCategory);

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
              <h1 className="text-xl font-bold">📊 데이터 관리 시스템</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/workspace" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                ← 워크스페이스
              </Link>
              {(user.role === 'executive' || user.role === 'general_manager') && (
                <Link href="/executive-dashboard" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-medium transition-all">
                  👑 슈퍼 관리자
                </Link>
              )}
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <span className="text-xl">{user.avatar}</span>
                <span className="font-medium">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto p-6">
        {/* 탭 네비게이션 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setView('templates')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              view === 'templates'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                : 'bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
          >
            📝 데이터 입력
          </button>
          <button
            onClick={() => setView('mydata')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              view === 'mydata'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                : 'bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
          >
            📋 내가 입력한 데이터 ({myData.length})
          </button>
          {(ROLE_HIERARCHY[user.role] >= 5) && (
            <button
              onClick={() => setView('alldata')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                view === 'alldata'
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              🌐 전체 데이터 ({dataEntries.length})
            </button>
          )}
        </div>

        {/* 데이터 입력 템플릿 */}
        {view === 'templates' && !selectedTemplate && (
          <div>
            <h2 className="text-2xl font-bold mb-6">사용 가능한 데이터 템플릿</h2>
            <div className="grid grid-cols-3 gap-6">
              {DATA_TEMPLATES.map(template => {
                const canUse = canUseTemplate(template);
                return (
                  <button
                    key={template.id}
                    onClick={() => canUse && setSelectedTemplate(template)}
                    disabled={!canUse}
                    className={`p-6 rounded-2xl text-left transition-all ${
                      canUse
                        ? 'bg-black/40 border border-white/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer'
                        : 'bg-black/20 border border-white/5 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-4xl mb-4">{template.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                    <p className="text-sm text-white/60 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                        {template.category}
                      </span>
                      {!canUse && (
                        <span className="text-xs text-red-400">권한 없음</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 데이터 입력 폼 */}
        {view === 'templates' && selectedTemplate && (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedTemplate(null)}
              className="mb-6 text-white/60 hover:text-white transition-colors"
            >
              ← 템플릿 목록으로
            </button>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{selectedTemplate.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">{selectedTemplate.name}</h2>
                  <p className="text-white/60">{selectedTemplate.description}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {selectedTemplate.fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium mb-2">
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>

                    {field.type === 'text' && (
                      <input
                        type="text"
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                      />
                    )}

                    {field.type === 'number' && (
                      <input
                        type="number"
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                      />
                    )}

                    {field.type === 'currency' && (
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-white/40">₩</span>
                        <input
                          type="number"
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                          placeholder="0"
                        />
                      </div>
                    )}

                    {field.type === 'date' && (
                      <input
                        type="date"
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                      />
                    )}

                    {field.type === 'select' && (
                      <select
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="">선택하세요</option>
                        {field.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {field.type === 'textarea' && (
                      <textarea
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 resize-none"
                      />
                    )}

                    {field.type === 'file' && (
                      <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-purple-500/50 transition-all cursor-pointer">
                        <div className="text-white/60 mb-2">파일을 선택하거나 드래그하세요</div>
                        <input
                          type="file"
                          className="w-full"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFormData({ ...formData, [field.name]: file.name });
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg font-bold text-lg transition-all shadow-lg shadow-purple-500/50"
                >
                  💾 데이터 저장
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 내 데이터 */}
        {view === 'mydata' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">내가 입력한 데이터 ({myData.length}개)</h2>
            <div className="space-y-4">
              {myData.map(entry => (
                <div key={entry.id} className="bg-black/40 border border-white/10 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                          {entry.category}
                        </span>
                        <span className="text-xs px-2 py-1 bg-white/10 rounded">
                          {entry.department}
                        </span>
                        <span className="text-xs text-white/40">
                          {new Date(entry.createdAt).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      entry.accessLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-300' :
                      entry.accessLevel === 'HIGH' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {entry.accessLevel}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(entry.data).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-white/60">{key}: </span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {myData.length === 0 && (
                <div className="text-center py-12 text-white/40">
                  아직 입력한 데이터가 없습니다. 템플릿을 선택해서 데이터를 추가하세요.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 전체 데이터 */}
        {view === 'alldata' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">전체 데이터 ({filteredData.length}개)</h2>
              <div className="flex gap-2">
                {['all', 'financial', 'tax', 'hr', 'project', 'inventory', 'sales', 'custom'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      filterCategory === cat
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {cat === 'all' ? '전체' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {filteredData.map(entry => (
                <div key={entry.id} className="bg-black/40 border border-white/10 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold mb-2">{entry.title}</h3>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                          {entry.category}
                        </span>
                        <span className="text-white/60">{entry.createdBy}</span>
                        <span className="text-white/40">
                          {new Date(entry.createdAt).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      entry.accessLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-300' :
                      entry.accessLevel === 'HIGH' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {entry.accessLevel}
                    </span>
                  </div>
                  <div className="text-sm text-white/60">
                    {Object.keys(entry.data).length}개 필드
                  </div>
                </div>
              ))}
              {filteredData.length === 0 && (
                <div className="col-span-2 text-center py-12 text-white/40">
                  데이터가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
