/**
 * FIELD NINE ROLE-BASED ACCESS CONTROL (RBAC)
 * 
 * 팀별 권한 관리 시스템
 * - 디자인팀 (7명)
 * - 생산팀 (3명)
 * - 온라인팀 (3명)
 * - 오프라인팀 (2명)
 * - 운영지원팀 (7명)
 */

export type TeamId = 'design' | 'mardmard' | 'production' | 'online' | 'offline' | 'operations';
export type RoleLevel = 'executive' | 'general_manager' | 'director' | 'manager' | 'team_leader' | 'lead' | 'senior' | 'staff' | 'intern';

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'execute')[];
}

export interface Role {
  level: RoleLevel;
  label: string;
  permissions: string[]; // Permission IDs
  canManageTeam: boolean;
  canAccessFinancials: boolean;
  canModifySettings: boolean;
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

// 권한 정의
export const PERMISSIONS: Record<string, Permission> = {
  // 워크스페이스 권한
  workspace_view: {
    id: 'workspace_view',
    name: '워크스페이스 조회',
    description: '워크스페이스 대시보드 및 기본 정보 조회',
    resource: 'workspace',
    actions: ['read']
  },
  workspace_manage: {
    id: 'workspace_manage',
    name: '워크스페이스 관리',
    description: '워크스페이스 설정 변경 및 관리',
    resource: 'workspace',
    actions: ['create', 'read', 'update', 'delete']
  },

  // 작업 권한
  task_view: {
    id: 'task_view',
    name: '작업 조회',
    description: '자신 및 팀의 작업 조회',
    resource: 'task',
    actions: ['read']
  },
  task_create: {
    id: 'task_create',
    name: '작업 생성',
    description: '새로운 작업 생성',
    resource: 'task',
    actions: ['create']
  },
  task_update: {
    id: 'task_update',
    name: '작업 수정',
    description: '작업 상태 및 내용 수정',
    resource: 'task',
    actions: ['update']
  },
  task_delete: {
    id: 'task_delete',
    name: '작업 삭제',
    description: '작업 삭제',
    resource: 'task',
    actions: ['delete']
  },
  task_assign: {
    id: 'task_assign',
    name: '작업 할당',
    description: '팀원에게 작업 할당',
    resource: 'task',
    actions: ['update']
  },

  // 팀 권한
  team_view: {
    id: 'team_view',
    name: '팀 조회',
    description: '팀 정보 및 멤버 조회',
    resource: 'team',
    actions: ['read']
  },
  team_manage: {
    id: 'team_manage',
    name: '팀 관리',
    description: '팀 설정 및 멤버 관리',
    resource: 'team',
    actions: ['create', 'read', 'update', 'delete']
  },

  // 디자인 권한
  design_view: {
    id: 'design_view',
    name: '디자인 조회',
    description: '디자인 파일 및 리소스 조회',
    resource: 'design',
    actions: ['read']
  },
  design_edit: {
    id: 'design_edit',
    name: '디자인 편집',
    description: '디자인 파일 편집 및 업로드',
    resource: 'design',
    actions: ['create', 'read', 'update']
  },
  design_approve: {
    id: 'design_approve',
    name: '디자인 승인',
    description: '디자인 승인 및 반려',
    resource: 'design',
    actions: ['execute']
  },

  // 생산 권한
  production_view: {
    id: 'production_view',
    name: '생산 조회',
    description: '생산 현황 및 재고 조회',
    resource: 'production',
    actions: ['read']
  },
  production_manage: {
    id: 'production_manage',
    name: '생산 관리',
    description: '생산 계획 및 재고 관리',
    resource: 'production',
    actions: ['create', 'read', 'update']
  },
  production_nexus: {
    id: 'production_nexus',
    name: 'NEXUS OS 접근',
    description: 'NEXUS OS 대시보드 및 제어',
    resource: 'nexus',
    actions: ['read', 'execute']
  },

  // 온라인 권한
  online_view: {
    id: 'online_view',
    name: '온라인 조회',
    description: '온라인 채널 현황 조회',
    resource: 'online',
    actions: ['read']
  },
  online_manage: {
    id: 'online_manage',
    name: '온라인 관리',
    description: '온라인 캠페인 및 콘텐츠 관리',
    resource: 'online',
    actions: ['create', 'read', 'update', 'delete']
  },

  // 오프라인 권한
  offline_view: {
    id: 'offline_view',
    name: '오프라인 조회',
    description: '오프라인 매장 현황 조회',
    resource: 'offline',
    actions: ['read']
  },
  offline_manage: {
    id: 'offline_manage',
    name: '오프라인 관리',
    description: '매장 운영 및 재고 관리',
    resource: 'offline',
    actions: ['create', 'read', 'update']
  },

  // 운영지원 권한
  ops_view: {
    id: 'ops_view',
    name: '운영 조회',
    description: '운영 지표 및 시스템 조회',
    resource: 'operations',
    actions: ['read']
  },
  ops_manage: {
    id: 'ops_manage',
    name: '운영 관리',
    description: '시스템 설정 및 운영 관리',
    resource: 'operations',
    actions: ['create', 'read', 'update', 'delete']
  },
  ops_admin: {
    id: 'ops_admin',
    name: '시스템 관리자',
    description: '전체 시스템 관리 권한',
    resource: 'system',
    actions: ['create', 'read', 'update', 'delete', 'execute']
  },

  // 재무 권한
  financial_view: {
    id: 'financial_view',
    name: '재무 조회',
    description: '재무 정보 조회',
    resource: 'financial',
    actions: ['read']
  },
  financial_manage: {
    id: 'financial_manage',
    name: '재무 관리',
    description: '예산 및 비용 관리',
    resource: 'financial',
    actions: ['create', 'read', 'update']
  },

  // 보고서 권한
  report_view: {
    id: 'report_view',
    name: '보고서 조회',
    description: '각종 보고서 조회',
    resource: 'report',
    actions: ['read']
  },
  report_create: {
    id: 'report_create',
    name: '보고서 생성',
    description: '보고서 생성 및 내보내기',
    resource: 'report',
    actions: ['create', 'read']
  }
};

// 역할별 권한 정의
export const ROLES: Record<RoleLevel, Role> = {
  executive: {
    level: 'executive',
    label: '총괄',
    permissions: Object.keys(PERMISSIONS), // 모든 권한
    canManageTeam: true,
    canAccessFinancials: true,
    canModifySettings: true
  },
  general_manager: {
    level: 'general_manager',
    label: '본부장',
    permissions: Object.keys(PERMISSIONS), // 모든 권한
    canManageTeam: true,
    canAccessFinancials: true,
    canModifySettings: true
  },
  director: {
    level: 'director',
    label: '부장',
    permissions: [
      'workspace_view', 'workspace_manage',
      'task_view', 'task_create', 'task_update', 'task_delete', 'task_assign',
      'team_view', 'team_manage',
      'financial_view', 'financial_manage',
      'report_view', 'report_create'
    ],
    canManageTeam: true,
    canAccessFinancials: true,
    canModifySettings: true
  },
  manager: {
    level: 'manager',
    label: '실장',
    permissions: [
      'workspace_view', 'workspace_manage',
      'task_view', 'task_create', 'task_update', 'task_delete', 'task_assign',
      'team_view', 'team_manage',
      'financial_view',
      'report_view', 'report_create'
    ],
    canManageTeam: true,
    canAccessFinancials: true,
    canModifySettings: false
  },
  team_leader: {
    level: 'team_leader',
    label: '팀장',
    permissions: [
      'workspace_view',
      'task_view', 'task_create', 'task_update', 'task_delete', 'task_assign',
      'team_view', 'team_manage',
      'financial_view',
      'report_view', 'report_create'
    ],
    canManageTeam: true,
    canAccessFinancials: false,
    canModifySettings: false
  },
  lead: {
    level: 'lead',
    label: '파트장',
    permissions: [
      'workspace_view',
      'task_view', 'task_create', 'task_update', 'task_assign',
      'team_view',
      'report_view', 'report_create'
    ],
    canManageTeam: false,
    canAccessFinancials: false,
    canModifySettings: false
  },
  senior: {
    level: 'senior',
    label: '책임',
    permissions: [
      'workspace_view',
      'task_view', 'task_create', 'task_update',
      'team_view',
      'report_view'
    ],
    canManageTeam: false,
    canAccessFinancials: false,
    canModifySettings: false
  },
  staff: {
    level: 'staff',
    label: '사원',
    permissions: [
      'workspace_view',
      'task_view', 'task_update',
      'team_view',
      'report_view'
    ],
    canManageTeam: false,
    canAccessFinancials: false,
    canModifySettings: false
  },
  intern: {
    level: 'intern',
    label: '인턴',
    permissions: [
      'workspace_view',
      'task_view',
      'team_view'
    ],
    canManageTeam: false,
    canAccessFinancials: false,
    canModifySettings: false
  }
};

// 팀 정의 (총 26명)
export const TEAMS: Record<TeamId, Team> = {
  design: {
    id: 'design',
    name: '디자인팀',
    description: '브랜드 디자인, UI/UX, 그래픽 디자인',
    icon: '🎨',
    color: 'purple',
    maxMembers: 7,
    defaultPermissions: ['design_view', 'design_edit']
  },
  mardmard: {
    id: 'mardmard',
    name: 'MARD MARD',
    description: '크리에이티브 컨텐츠, 브랜딩, 마케팅',
    icon: '🎬',
    color: 'pink',
    maxMembers: 8,
    defaultPermissions: ['design_view', 'design_edit', 'online_view']
  },
  production: {
    id: 'production',
    name: '생산팀',
    description: 'NEXUS OS, 물류 자동화, 생산 관리',
    icon: '🏭',
    color: 'blue',
    maxMembers: 3,
    defaultPermissions: ['production_view', 'production_manage', 'production_nexus']
  },
  online: {
    id: 'online',
    name: '온라인팀',
    description: '이커머스, 디지털 마케팅, 온라인 채널',
    icon: '💻',
    color: 'cyan',
    maxMembers: 3,
    defaultPermissions: ['online_view', 'online_manage']
  },
  offline: {
    id: 'offline',
    name: '오프라인팀',
    description: '매장 운영, 고객 서비스, 재고 관리',
    icon: '🏪',
    color: 'fuchsia',
    maxMembers: 2,
    defaultPermissions: ['offline_view', 'offline_manage']
  },
  operations: {
    id: 'operations',
    name: '운영지원팀',
    description: '인사, 재무, IT, 총무, 시스템 관리',
    icon: '⚙️',
    color: 'emerald',
    maxMembers: 7,
    defaultPermissions: ['ops_view', 'ops_manage']
  }
};

/**
 * 사용자 권한 확인
 */
export function hasPermission(
  userRole: RoleLevel,
  userTeam: TeamId,
  permissionId: string
): boolean {
  const role = ROLES[userRole];
  const team = TEAMS[userTeam];

  // 역할 기반 권한 확인
  if (role.permissions.includes(permissionId)) {
    return true;
  }

  // 팀 기본 권한 확인
  if (team.defaultPermissions.includes(permissionId)) {
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
  const role = ROLES[userRole];
  
  // 해당 리소스 관련 권한 찾기
  const relevantPermissions = Object.values(PERMISSIONS).filter(
    p => p.resource === resource && p.actions.includes(action)
  );

  // 권한 중 하나라도 있으면 접근 가능
  return relevantPermissions.some(p => hasPermission(userRole, userTeam, p.id));
}

/**
 * 팀 관리 권한 확인
 */
export function canManageTeam(userRole: RoleLevel): boolean {
  return ROLES[userRole].canManageTeam;
}

/**
 * 재무 정보 접근 권한 확인
 */
export function canAccessFinancials(userRole: RoleLevel): boolean {
  return ROLES[userRole].canAccessFinancials;
}

/**
 * 설정 수정 권한 확인
 */
export function canModifySettings(userRole: RoleLevel): boolean {
  return ROLES[userRole].canModifySettings;
}

/**
 * 사용자의 모든 권한 가져오기
 */
export function getUserPermissions(userRole: RoleLevel, userTeam: TeamId): Permission[] {
  const role = ROLES[userRole];
  const team = TEAMS[userTeam];
  
  const allPermissionIds = [...new Set([...role.permissions, ...team.defaultPermissions])];
  
  return allPermissionIds
    .map(id => PERMISSIONS[id])
    .filter(p => p !== undefined);
}

/**
 * UI 요소 표시 여부 확인
 */
export function shouldShowUIElement(
  userRole: RoleLevel,
  userTeam: TeamId,
  elementPermission: string
): boolean {
  return hasPermission(userRole, userTeam, elementPermission);
}

/**
 * 팀별 대시보드 위젯 설정
 */
export function getTeamDashboardWidgets(teamId: TeamId): string[] {
  const widgets: Record<TeamId, string[]> = {
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
 * 권한 체크 데코레이터 (함수용)
 */
export function requirePermission(permissionId: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const user = JSON.parse(localStorage.getItem('fieldnine-user') || '{}');
      
      if (!hasPermission(user.role, user.team, permissionId)) {
        console.error(`Permission denied: ${permissionId}`);
        alert('권한이 없습니다.');
        return;
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

export const RBACUtils = {
  hasPermission,
  canAccessResource,
  canManageTeam,
  canAccessFinancials,
  canModifySettings,
  getUserPermissions,
  shouldShowUIElement,
  getTeamDashboardWidgets
};
