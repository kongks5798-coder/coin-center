/**
 * FIELD NINE ENTERPRISE RBAC SYSTEM
 * 
 * 🔐 최고 보안 등급 권한 관리 시스템
 * 
 * 보안 등급:
 * - CRITICAL: 대표, 본부장만 접근 (세무, 회계, 계약, 급여, 법무)
 * - HIGH: 부장 이상 (재무, 인사, 전략, 감사)
 * - MEDIUM: 실장 이상 (팀 운영, 성과, 예산)
 * - NORMAL: 팀장 이상 (일반 업무, 프로젝트)
 * - PUBLIC: 전체 (공지, 기본 정보)
 * 
 * 슈퍼 관리자:
 * - 👑 대표 (CEO): 모든 권한 + 최종 승인 + 전사 통제
 * - ⭐ 본부장 (GM): 모든 권한 + 전사 관리 + CRITICAL 접근
 */

export type TeamId = 'design' | 'mardmard' | 'production' | 'online' | 'offline' | 'operations' | 'all';
export type RoleLevel = 'executive' | 'general_manager' | 'director' | 'manager' | 'team_leader' | 'lead' | 'senior' | 'staff' | 'intern';
export type SecurityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL' | 'PUBLIC';

// 슈퍼 관리자 정의
export const SUPER_ADMINS = {
  CEO: 'executive', // 대표
  GM: 'general_manager' // 본부장
} as const;

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'execute')[];
  securityLevel: SecurityLevel;
  requiresSuperAdmin?: boolean;
}

export interface Role {
  level: RoleLevel;
  label: string;
  permissions: string[];
  canManageTeam: boolean;
  canAccessFinancials: boolean;
  canModifySettings: boolean;
  securityClearance: SecurityLevel;
  isSuperAdmin: boolean;
  canViewAllTeams: boolean;
}

export interface Team {
  id: TeamId;
  name: string;
  description: string;
  icon: string;
  color: string;
  maxMembers: number;
  defaultPermissions: string[];
}

// 🔐 CRITICAL 권한 (대표, 본부장만 접근)
export const CRITICAL_PERMISSIONS: Record<string, Permission> = {
  tax_management: {
    id: 'tax_management',
    name: '세무 관리',
    description: '세무 신고, 세금 계산, 국세청 신고',
    resource: 'tax',
    actions: ['create', 'read', 'update', 'delete'],
    securityLevel: 'CRITICAL',
    requiresSuperAdmin: true
  },
  accounting_full: {
    id: 'accounting_full',
    name: '회계 전체 관리',
    description: '전표 처리, 결산, 재무제표 작성',
    resource: 'accounting',
    actions: ['create', 'read', 'update', 'delete'],
    securityLevel: 'CRITICAL',
    requiresSuperAdmin: true
  },
  contract_critical: {
    id: 'contract_critical',
    name: '주요 계약 관리',
    description: 'M&A, 투자, 대규모 계약 체결',
    resource: 'contract',
    actions: ['create', 'read', 'update', 'delete', 'execute'],
    securityLevel: 'CRITICAL',
    requiresSuperAdmin: true
  },
  salary_full: {
    id: 'salary_full',
    name: '급여 전체 관리',
    description: '전 직원 급여, 보너스, 인센티브 관리',
    resource: 'salary',
    actions: ['create', 'read', 'update', 'delete'],
    securityLevel: 'CRITICAL',
    requiresSuperAdmin: true
  },
  legal_critical: {
    id: 'legal_critical',
    name: '법무 관리',
    description: '소송, 법적 분쟁, 규제 대응',
    resource: 'legal',
    actions: ['create', 'read', 'update', 'delete'],
    securityLevel: 'CRITICAL',
    requiresSuperAdmin: true
  },
  audit_full: {
    id: 'audit_full',
    name: '감사 전체',
    description: '내부 감사, 외부 감사, 컴플라이언스',
    resource: 'audit',
    actions: ['create', 'read', 'update', 'delete', 'execute'],
    securityLevel: 'CRITICAL',
    requiresSuperAdmin: true
  },
  board_decisions: {
    id: 'board_decisions',
    name: '이사회 결정',
    description: '이사회 안건, 의결 사항',
    resource: 'board',
    actions: ['create', 'read', 'update', 'execute'],
    securityLevel: 'CRITICAL',
    requiresSuperAdmin: true
  },
  investment_critical: {
    id: 'investment_critical',
    name: '투자 의사결정',
    description: '대규모 투자, 자본 배분',
    resource: 'investment',
    actions: ['create', 'read', 'update', 'execute'],
    securityLevel: 'CRITICAL',
    requiresSuperAdmin: true
  }
};

// 📊 HIGH 권한 (부장 이상)
export const HIGH_PERMISSIONS: Record<string, Permission> = {
  financial_view: {
    id: 'financial_view',
    name: '재무 조회',
    description: '재무제표, 손익계산서 조회',
    resource: 'financial',
    actions: ['read'],
    securityLevel: 'HIGH'
  },
  financial_manage: {
    id: 'financial_manage',
    name: '재무 관리',
    description: '예산 편성, 비용 승인',
    resource: 'financial',
    actions: ['create', 'read', 'update'],
    securityLevel: 'HIGH'
  },
  hr_full: {
    id: 'hr_full',
    name: '인사 관리',
    description: '채용, 평가, 승진, 퇴직',
    resource: 'hr',
    actions: ['create', 'read', 'update', 'delete'],
    securityLevel: 'HIGH'
  },
  strategy_view: {
    id: 'strategy_view',
    name: '전략 조회',
    description: '경영 전략, 사업 계획 조회',
    resource: 'strategy',
    actions: ['read'],
    securityLevel: 'HIGH'
  },
  contract_manage: {
    id: 'contract_manage',
    name: '일반 계약 관리',
    description: '공급업체, 고객 계약',
    resource: 'contract',
    actions: ['create', 'read', 'update'],
    securityLevel: 'HIGH'
  }
};

// 📁 MEDIUM 권한 (실장 이상)
export const MEDIUM_PERMISSIONS: Record<string, Permission> = {
  budget_view: {
    id: 'budget_view',
    name: '예산 조회',
    description: '부서별 예산 현황 조회',
    resource: 'budget',
    actions: ['read'],
    securityLevel: 'MEDIUM'
  },
  performance_manage: {
    id: 'performance_manage',
    name: '성과 관리',
    description: '팀 KPI, 목표 설정',
    resource: 'performance',
    actions: ['create', 'read', 'update'],
    securityLevel: 'MEDIUM'
  },
  resource_allocate: {
    id: 'resource_allocate',
    name: '리소스 배분',
    description: '팀원 배치, 장비 할당',
    resource: 'resource',
    actions: ['create', 'read', 'update'],
    securityLevel: 'MEDIUM'
  }
};

// 📝 NORMAL 권한 (팀장 이상)
export const NORMAL_PERMISSIONS: Record<string, Permission> = {
  workspace_view: {
    id: 'workspace_view',
    name: '워크스페이스 조회',
    description: '워크스페이스 대시보드 조회',
    resource: 'workspace',
    actions: ['read'],
    securityLevel: 'NORMAL'
  },
  workspace_manage: {
    id: 'workspace_manage',
    name: '워크스페이스 관리',
    description: '워크스페이스 설정 변경',
    resource: 'workspace',
    actions: ['create', 'read', 'update', 'delete'],
    securityLevel: 'NORMAL'
  },
  task_view: {
    id: 'task_view',
    name: '작업 조회',
    description: '팀 작업 조회',
    resource: 'task',
    actions: ['read'],
    securityLevel: 'PUBLIC'
  },
  task_create: {
    id: 'task_create',
    name: '작업 생성',
    description: '새 작업 생성',
    resource: 'task',
    actions: ['create'],
    securityLevel: 'NORMAL'
  },
  task_update: {
    id: 'task_update',
    name: '작업 수정',
    description: '작업 내용 수정',
    resource: 'task',
    actions: ['update'],
    securityLevel: 'PUBLIC'
  },
  task_delete: {
    id: 'task_delete',
    name: '작업 삭제',
    description: '작업 삭제',
    resource: 'task',
    actions: ['delete'],
    securityLevel: 'NORMAL'
  },
  task_assign: {
    id: 'task_assign',
    name: '작업 할당',
    description: '팀원에게 작업 할당',
    resource: 'task',
    actions: ['update'],
    securityLevel: 'NORMAL'
  },
  team_view: {
    id: 'team_view',
    name: '팀 조회',
    description: '팀 정보 조회',
    resource: 'team',
    actions: ['read'],
    securityLevel: 'PUBLIC'
  },
  team_manage: {
    id: 'team_manage',
    name: '팀 관리',
    description: '팀 설정 및 멤버 관리',
    resource: 'team',
    actions: ['create', 'read', 'update', 'delete'],
    securityLevel: 'NORMAL'
  },
  report_view: {
    id: 'report_view',
    name: '보고서 조회',
    description: '각종 보고서 조회',
    resource: 'report',
    actions: ['read'],
    securityLevel: 'PUBLIC'
  },
  report_create: {
    id: 'report_create',
    name: '보고서 생성',
    description: '보고서 생성',
    resource: 'report',
    actions: ['create', 'read'],
    securityLevel: 'NORMAL'
  }
};

// 🎨 팀별 전문 권한
export const TEAM_PERMISSIONS: Record<string, Permission> = {
  design_view: {
    id: 'design_view',
    name: '디자인 조회',
    description: '디자인 파일 조회',
    resource: 'design',
    actions: ['read'],
    securityLevel: 'PUBLIC'
  },
  design_edit: {
    id: 'design_edit',
    name: '디자인 편집',
    description: '디자인 파일 편집',
    resource: 'design',
    actions: ['create', 'read', 'update'],
    securityLevel: 'NORMAL'
  },
  design_approve: {
    id: 'design_approve',
    name: '디자인 승인',
    description: '디자인 승인/반려',
    resource: 'design',
    actions: ['execute'],
    securityLevel: 'NORMAL'
  },
  production_view: {
    id: 'production_view',
    name: '생산 조회',
    description: '생산 현황 조회',
    resource: 'production',
    actions: ['read'],
    securityLevel: 'PUBLIC'
  },
  production_manage: {
    id: 'production_manage',
    name: '생산 관리',
    description: '생산 계획 관리',
    resource: 'production',
    actions: ['create', 'read', 'update'],
    securityLevel: 'NORMAL'
  },
  production_nexus: {
    id: 'production_nexus',
    name: 'NEXUS OS 접근',
    description: 'NEXUS OS 제어',
    resource: 'nexus',
    actions: ['read', 'execute'],
    securityLevel: 'NORMAL'
  },
  online_view: {
    id: 'online_view',
    name: '온라인 조회',
    description: '온라인 채널 조회',
    resource: 'online',
    actions: ['read'],
    securityLevel: 'PUBLIC'
  },
  online_manage: {
    id: 'online_manage',
    name: '온라인 관리',
    description: '온라인 캠페인 관리',
    resource: 'online',
    actions: ['create', 'read', 'update', 'delete'],
    securityLevel: 'NORMAL'
  },
  offline_view: {
    id: 'offline_view',
    name: '오프라인 조회',
    description: '매장 현황 조회',
    resource: 'offline',
    actions: ['read'],
    securityLevel: 'PUBLIC'
  },
  offline_manage: {
    id: 'offline_manage',
    name: '오프라인 관리',
    description: '매장 운영 관리',
    resource: 'offline',
    actions: ['create', 'read', 'update'],
    securityLevel: 'NORMAL'
  },
  ops_view: {
    id: 'ops_view',
    name: '운영 조회',
    description: '운영 현황 조회',
    resource: 'operations',
    actions: ['read'],
    securityLevel: 'PUBLIC'
  },
  ops_manage: {
    id: 'ops_manage',
    name: '운영 관리',
    description: '시스템 운영 관리',
    resource: 'operations',
    actions: ['create', 'read', 'update', 'delete'],
    securityLevel: 'NORMAL'
  },
  ops_admin: {
    id: 'ops_admin',
    name: '시스템 관리자',
    description: '전체 시스템 관리',
    resource: 'system',
    actions: ['create', 'read', 'update', 'delete', 'execute'],
    securityLevel: 'MEDIUM'
  }
};

// 모든 권한 통합
export const PERMISSIONS: Record<string, Permission> = {
  ...CRITICAL_PERMISSIONS,
  ...HIGH_PERMISSIONS,
  ...MEDIUM_PERMISSIONS,
  ...NORMAL_PERMISSIONS,
  ...TEAM_PERMISSIONS
};

// 역할별 권한 정의
export const ROLES: Record<RoleLevel, Role> = {
  executive: {
    level: 'executive',
    label: '대표 (CEO)',
    permissions: Object.keys(PERMISSIONS), // 모든 권한
    canManageTeam: true,
    canAccessFinancials: true,
    canModifySettings: true,
    securityClearance: 'CRITICAL',
    isSuperAdmin: true,
    canViewAllTeams: true
  },
  general_manager: {
    level: 'general_manager',
    label: '본부장',
    permissions: Object.keys(PERMISSIONS), // 모든 권한
    canManageTeam: true,
    canAccessFinancials: true,
    canModifySettings: true,
    securityClearance: 'CRITICAL',
    isSuperAdmin: true,
    canViewAllTeams: true
  },
  director: {
    level: 'director',
    label: '부장',
    permissions: [
      ...Object.keys(HIGH_PERMISSIONS),
      ...Object.keys(MEDIUM_PERMISSIONS),
      ...Object.keys(NORMAL_PERMISSIONS),
      ...Object.keys(TEAM_PERMISSIONS)
    ],
    canManageTeam: true,
    canAccessFinancials: true,
    canModifySettings: true,
    securityClearance: 'HIGH',
    isSuperAdmin: false,
    canViewAllTeams: true
  },
  manager: {
    level: 'manager',
    label: '실장',
    permissions: [
      ...Object.keys(MEDIUM_PERMISSIONS),
      ...Object.keys(NORMAL_PERMISSIONS),
      ...Object.keys(TEAM_PERMISSIONS),
      'financial_view'
    ],
    canManageTeam: true,
    canAccessFinancials: true,
    canModifySettings: false,
    securityClearance: 'MEDIUM',
    isSuperAdmin: false,
    canViewAllTeams: true
  },
  team_leader: {
    level: 'team_leader',
    label: '팀장',
    permissions: [
      ...Object.keys(NORMAL_PERMISSIONS),
      ...Object.keys(TEAM_PERMISSIONS)
    ],
    canManageTeam: true,
    canAccessFinancials: false,
    canModifySettings: false,
    securityClearance: 'NORMAL',
    isSuperAdmin: false,
    canViewAllTeams: false
  },
  lead: {
    level: 'lead',
    label: '파트장',
    permissions: [
      'workspace_view',
      'task_view', 'task_create', 'task_update', 'task_assign',
      'team_view',
      'report_view', 'report_create',
      ...Object.keys(TEAM_PERMISSIONS).filter(k => k.includes('_view') || k.includes('_edit'))
    ],
    canManageTeam: false,
    canAccessFinancials: false,
    canModifySettings: false,
    securityClearance: 'NORMAL',
    isSuperAdmin: false,
    canViewAllTeams: false
  },
  senior: {
    level: 'senior',
    label: '책임',
    permissions: [
      'workspace_view',
      'task_view', 'task_create', 'task_update',
      'team_view',
      'report_view',
      ...Object.keys(TEAM_PERMISSIONS).filter(k => k.includes('_view') || k.includes('_edit'))
    ],
    canManageTeam: false,
    canAccessFinancials: false,
    canModifySettings: false,
    securityClearance: 'NORMAL',
    isSuperAdmin: false,
    canViewAllTeams: false
  },
  staff: {
    level: 'staff',
    label: '사원',
    permissions: [
      'workspace_view',
      'task_view', 'task_update',
      'team_view',
      'report_view',
      ...Object.keys(TEAM_PERMISSIONS).filter(k => k.includes('_view'))
    ],
    canManageTeam: false,
    canAccessFinancials: false,
    canModifySettings: false,
    securityClearance: 'PUBLIC',
    isSuperAdmin: false,
    canViewAllTeams: false
  },
  intern: {
    level: 'intern',
    label: '인턴',
    permissions: [
      'workspace_view',
      'task_view',
      'team_view',
      ...Object.keys(TEAM_PERMISSIONS).filter(k => k.includes('_view'))
    ],
    canManageTeam: false,
    canAccessFinancials: false,
    canModifySettings: false,
    securityClearance: 'PUBLIC',
    isSuperAdmin: false,
    canViewAllTeams: false
  }
};

// 팀 정의
export const TEAMS: Record<TeamId, Team> = {
  all: {
    id: 'all',
    name: '전체 (슈퍼 관리자)',
    description: '모든 팀 조회 및 관리',
    icon: '👑',
    color: 'gold',
    maxMembers: 2,
    defaultPermissions: []
  },
  design: {
    id: 'design',
    name: '디자인팀',
    description: 'UI/UX, 그래픽 디자인',
    icon: '🎨',
    color: 'purple',
    maxMembers: 7,
    defaultPermissions: ['design_view', 'design_edit']
  },
  mardmard: {
    id: 'mardmard',
    name: 'MARD MARD',
    description: '크리에이티브, 마케팅',
    icon: '🎬',
    color: 'pink',
    maxMembers: 8,
    defaultPermissions: ['design_view', 'design_edit', 'online_view']
  },
  production: {
    id: 'production',
    name: '생산팀',
    description: 'NEXUS OS, 생산 관리',
    icon: '🏭',
    color: 'blue',
    maxMembers: 3,
    defaultPermissions: ['production_view', 'production_manage', 'production_nexus']
  },
  online: {
    id: 'online',
    name: '온라인팀',
    description: '이커머스, 디지털 마케팅',
    icon: '💻',
    color: 'cyan',
    maxMembers: 3,
    defaultPermissions: ['online_view', 'online_manage']
  },
  offline: {
    id: 'offline',
    name: '오프라인팀',
    description: '매장 운영',
    icon: '🏪',
    color: 'fuchsia',
    maxMembers: 2,
    defaultPermissions: ['offline_view', 'offline_manage']
  },
  operations: {
    id: 'operations',
    name: '운영지원팀',
    description: '인사, 재무, IT',
    icon: '⚙️',
    color: 'emerald',
    maxMembers: 7,
    defaultPermissions: ['ops_view', 'ops_manage']
  }
};

// 🔐 핵심 보안 함수

/**
 * 슈퍼 관리자 여부 확인
 */
export function isSuperAdmin(userRole: RoleLevel): boolean {
  return ROLES[userRole].isSuperAdmin;
}

/**
 * 보안 등급 접근 권한 확인
 */
export function hasSecurityClearance(userRole: RoleLevel, requiredLevel: SecurityLevel): boolean {
  const clearanceHierarchy: SecurityLevel[] = ['PUBLIC', 'NORMAL', 'MEDIUM', 'HIGH', 'CRITICAL'];
  const userClearanceIndex = clearanceHierarchy.indexOf(ROLES[userRole].securityClearance);
  const requiredIndex = clearanceHierarchy.indexOf(requiredLevel);
  
  return userClearanceIndex >= requiredIndex;
}

/**
 * 권한 확인 (보안 등급 포함)
 */
export function hasPermission(
  userRole: RoleLevel,
  userTeam: TeamId,
  permissionId: string
): boolean {
  const role = ROLES[userRole];
  const permission = PERMISSIONS[permissionId];
  
  if (!permission) return false;

  // 슈퍼 관리자 필수 권한 체크
  if (permission.requiresSuperAdmin && !role.isSuperAdmin) {
    return false;
  }

  // 보안 등급 체크
  if (!hasSecurityClearance(userRole, permission.securityLevel)) {
    return false;
  }

  // 역할 기반 권한 확인
  if (role.permissions.includes(permissionId)) {
    return true;
  }

  // 팀 기본 권한 확인
  const team = TEAMS[userTeam];
  if (team && team.defaultPermissions.includes(permissionId)) {
    return true;
  }

  return false;
}

/**
 * 리소스 접근 권한 확인
 */
export function canAccessResource(
  userRole: RoleLevel,
  userTeam: TeamId,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete' | 'execute'
): boolean {
  const relevantPermissions = Object.values(PERMISSIONS).filter(
    p => p.resource === resource && p.actions.includes(action)
  );

  return relevantPermissions.some(p => hasPermission(userRole, userTeam, p.id));
}

/**
 * 전체 팀 조회 권한 확인 (대표, 본부장만)
 */
export function canViewAllTeams(userRole: RoleLevel): boolean {
  return ROLES[userRole].canViewAllTeams;
}

/**
 * 접근 가능한 팀 목록 가져오기
 */
export function getAccessibleTeams(userRole: RoleLevel, userTeam: TeamId): TeamId[] {
  if (canViewAllTeams(userRole)) {
    return Object.keys(TEAMS) as TeamId[];
  }
  return [userTeam];
}

/**
 * 사용자의 모든 권한 가져오기
 */
export function getUserPermissions(userRole: RoleLevel, userTeam: TeamId): Permission[] {
  const role = ROLES[userRole];
  const team = TEAMS[userTeam];
  
  const allPermissionIds = [...new Set([...role.permissions, ...(team?.defaultPermissions || [])])];
  
  return allPermissionIds
    .map(id => PERMISSIONS[id])
    .filter(p => p !== undefined && hasSecurityClearance(userRole, p.securityLevel));
}

/**
 * 팀별 대시보드 위젯 설정
 */
export function getTeamDashboardWidgets(teamId: TeamId): string[] {
  const widgets: Record<TeamId, string[]> = {
    all: ['all-teams-overview', 'critical-alerts', 'financial-summary', 'company-metrics'],
    design: ['tasks', 'design-files', 'approval-queue', 'team-activity'],
    mardmard: ['campaigns', 'creative-projects', 'content-calendar', 'tasks'],
    production: ['nexus-os', 'production-status', 'inventory', 'tasks'],
    online: ['campaigns', 'analytics', 'social-media', 'tasks'],
    offline: ['store-status', 'sales', 'inventory', 'tasks'],
    operations: ['system-status', 'hr-dashboard', 'financials', 'tasks']
  };

  return widgets[teamId] || ['tasks', 'team-activity'];
}

/**
 * 파이프라인 생성 권한 확인
 */
export function canCreatePipeline(userRole: RoleLevel, targetTeam: TeamId): boolean {
  // 팀장 이상은 자기 팀 파이프라인 생성 가능
  if (ROLES[userRole].canManageTeam) {
    return true;
  }
  return false;
}

/**
 * 팀 간 협업 요청 권한
 */
export function canRequestCollaboration(userRole: RoleLevel): boolean {
  return hasSecurityClearance(userRole, 'NORMAL');
}

// 유틸리티 함수 export
export const RBACUtils = {
  isSuperAdmin,
  hasSecurityClearance,
  hasPermission,
  canAccessResource,
  canViewAllTeams,
  getAccessibleTeams,
  getUserPermissions,
  getTeamDashboardWidgets,
  canCreatePipeline,
  canRequestCollaboration,
  canManageTeam: (role: RoleLevel) => ROLES[role].canManageTeam,
  canAccessFinancials: (role: RoleLevel) => ROLES[role].canAccessFinancials,
  canModifySettings: (role: RoleLevel) => ROLES[role].canModifySettings
};
