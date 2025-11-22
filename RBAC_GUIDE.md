# FIELD NINE RBAC 권한 관리 가이드

## 🎯 RBAC 개요

RBAC (Role-Based Access Control)는 **역할 기반 접근 제어** 시스템으로, 사용자의 역할(Role)에 따라 리소스 접근 권한을 관리합니다.

---

## 👥 팀 구조 (총 22명)

### 1. 디자인팀 (7명) 🎨
**역할**: 브랜드 디자인, UI/UX, 그래픽 디자인

**주요 권한**:
- ✅ 디자인 파일 조회/편집
- ✅ 디자인 승인 (팀장 이상)
- ✅ 작업 생성/수정
- ✅ 팀 조회

**워크플로우**:
```
사원 → 디자인 작업 → 파트장 검토 → 팀장 승인 → 완료
```

---

### 2. 생산팀 (3명) 🏭
**역할**: NEXUS OS, 물류 자동화, 생산 관리

**주요 권한**:
- ✅ NEXUS OS 대시보드 접근
- ✅ 생산 현황 조회/관리
- ✅ 재고 관리
- ✅ 로봇 제어 (NEXUS)

**워크플로우**:
```
NEXUS OS → 생산 계획 → 재고 확인 → 생산 실행 → 완료
```

---

### 3. 온라인팀 (3명) 💻
**역할**: 이커머스, 디지털 마케팅, 온라인 채널

**주요 권한**:
- ✅ 온라인 캠페인 관리
- ✅ 콘텐츠 생성/수정
- ✅ 애널리틱스 조회
- ✅ 소셜 미디어 관리

**워크플로우**:
```
캠페인 기획 → 콘텐츠 제작 → 게시 → 성과 분석
```

---

### 4. 오프라인팀 (2명) 🏪
**역할**: 매장 운영, 고객 서비스, 재고 관리

**주요 권한**:
- ✅ 매장 현황 조회
- ✅ 판매 데이터 조회
- ✅ 재고 관리
- ✅ 고객 관리

**워크플로우**:
```
매장 오픈 → 고객 응대 → 판매 → 재고 업데이트 → 마감
```

---

### 5. 운영지원팀 (7명) ⚙️
**역할**: 인사, 재무, IT, 총무, 시스템 관리

**주요 권한**:
- ✅ 전체 시스템 관리 (관리자만)
- ✅ 재무 정보 조회/관리
- ✅ 인사 관리
- ✅ IT 인프라 관리

**워크플로우**:
```
시스템 모니터링 → 이슈 감지 → 대응 → 로그 기록
```

---

## 📊 역할 계층 (6단계)

### 1. 이사 (Director) 👔
**권한 범위**: 전체 (100%)

**할 수 있는 것**:
- ✅ 모든 리소스 접근
- ✅ 시스템 설정 변경
- ✅ 재무 정보 관리
- ✅ 팀 관리
- ✅ 사용자 권한 변경

**할 수 없는 것**:
- ❌ 없음 (모든 권한)

---

### 2. 팀장 (Manager) 📊
**권한 범위**: 팀 전체 (80%)

**할 수 있는 것**:
- ✅ 팀원 관리
- ✅ 작업 할당
- ✅ 재무 조회
- ✅ 보고서 생성
- ✅ 팀 설정 변경

**할 수 없는 것**:
- ❌ 전사 시스템 설정
- ❌ 다른 팀 관리
- ❌ 재무 정보 수정

---

### 3. 파트장 (Lead) 🎯
**권한 범위**: 파트 내 (60%)

**할 수 있는 것**:
- ✅ 작업 생성/할당
- ✅ 파트원 작업 조회
- ✅ 보고서 생성
- ✅ 팀 조회

**할 수 없는 것**:
- ❌ 팀원 관리
- ❌ 재무 조회
- ❌ 팀 설정 변경

---

### 4. 책임 (Senior) ⭐
**권한 범위**: 개인 + 일부 팀 (40%)

**할 수 있는 것**:
- ✅ 작업 생성/수정
- ✅ 팀 조회
- ✅ 보고서 조회

**할 수 없는 것**:
- ❌ 작업 할당
- ❌ 재무 조회
- ❌ 팀원 관리

---

### 5. 사원 (Staff) 👤
**권한 범위**: 개인 작업 (30%)

**할 수 있는 것**:
- ✅ 자신의 작업 조회/수정
- ✅ 팀 조회
- ✅ 보고서 조회

**할 수 없는 것**:
- ❌ 작업 생성
- ❌ 작업 할당
- ❌ 재무 조회

---

### 6. 인턴 (Intern) 🌱
**권한 범위**: 조회만 (10%)

**할 수 있는 것**:
- ✅ 워크스페이스 조회
- ✅ 작업 조회
- ✅ 팀 조회

**할 수 없는 것**:
- ❌ 작업 생성/수정
- ❌ 모든 관리 기능
- ❌ 재무 조회

---

## 🔐 권한 상세 (25개)

### 워크스페이스 권한
| 권한 ID | 이름 | 설명 | 필요 역할 |
|---------|------|------|----------|
| workspace_view | 워크스페이스 조회 | 대시보드 조회 | 전체 |
| workspace_manage | 워크스페이스 관리 | 설정 변경 | 이사, 팀장 |

### 작업 권한
| 권한 ID | 이름 | 설명 | 필요 역할 |
|---------|------|------|----------|
| task_view | 작업 조회 | 작업 목록 조회 | 전체 |
| task_create | 작업 생성 | 새 작업 생성 | 파트장 이상 |
| task_update | 작업 수정 | 작업 내용 수정 | 책임 이상 |
| task_delete | 작업 삭제 | 작업 삭제 | 팀장 이상 |
| task_assign | 작업 할당 | 팀원에게 할당 | 파트장 이상 |

### 팀 권한
| 권한 ID | 이름 | 설명 | 필요 역할 |
|---------|------|------|----------|
| team_view | 팀 조회 | 팀 정보 조회 | 전체 |
| team_manage | 팀 관리 | 팀원 관리 | 팀장 이상 |

### 디자인 권한 (디자인팀)
| 권한 ID | 이름 | 설명 | 필요 역할 |
|---------|------|------|----------|
| design_view | 디자인 조회 | 디자인 파일 조회 | 전체 |
| design_edit | 디자인 편집 | 파일 편집/업로드 | 사원 이상 |
| design_approve | 디자인 승인 | 승인/반려 | 팀장 이상 |

### 생산 권한 (생산팀)
| 권한 ID | 이름 | 설명 | 필요 역할 |
|---------|------|------|----------|
| production_view | 생산 조회 | 생산 현황 조회 | 전체 |
| production_manage | 생산 관리 | 생산 계획 관리 | 책임 이상 |
| production_nexus | NEXUS OS 접근 | NEXUS 대시보드 | 사원 이상 |

### 온라인 권한 (온라인팀)
| 권한 ID | 이름 | 설명 | 필요 역할 |
|---------|------|------|----------|
| online_view | 온라인 조회 | 온라인 현황 조회 | 전체 |
| online_manage | 온라인 관리 | 캠페인 관리 | 사원 이상 |

### 오프라인 권한 (오프라인팀)
| 권한 ID | 이름 | 설명 | 필요 역할 |
|---------|------|------|----------|
| offline_view | 오프라인 조회 | 매장 현황 조회 | 전체 |
| offline_manage | 오프라인 관리 | 매장 운영 관리 | 사원 이상 |

### 운영 권한 (운영지원팀)
| 권한 ID | 이름 | 설명 | 필요 역할 |
|---------|------|------|----------|
| ops_view | 운영 조회 | 운영 지표 조회 | 전체 |
| ops_manage | 운영 관리 | 시스템 관리 | 책임 이상 |
| ops_admin | 시스템 관리자 | 전체 시스템 관리 | 이사만 |

### 재무 권한
| 권한 ID | 이름 | 설명 | 필요 역할 |
|---------|------|------|----------|
| financial_view | 재무 조회 | 재무 정보 조회 | 팀장 이상 |
| financial_manage | 재무 관리 | 예산/비용 관리 | 이사만 |

### 보고서 권한
| 권한 ID | 이름 | 설명 | 필요 역할 |
|---------|------|------|----------|
| report_view | 보고서 조회 | 보고서 조회 | 사원 이상 |
| report_create | 보고서 생성 | 보고서 생성 | 파트장 이상 |

---

## 💻 코드 사용 예시

### 권한 확인
```typescript
import { RBACUtils } from '@/lib/rbac';

// 사용자 권한 확인
const canEditDesign = RBACUtils.hasPermission(
  'staff',      // 역할
  'design',     // 팀
  'design_edit' // 권한 ID
);

if (canEditDesign) {
  // 디자인 편집 UI 표시
}
```

### 리소스 접근 확인
```typescript
// 특정 작업 수행 가능 여부
const canDeleteTask = RBACUtils.canAccessResource(
  'manager',    // 역할
  'production', // 팀
  'task',       // 리소스
  'delete'      // 작업
);
```

### UI 요소 표시/숨김
```typescript
// 재무 정보 버튼 표시 여부
const showFinancials = RBACUtils.shouldShowUIElement(
  userRole,
  userTeam,
  'financial_view'
);

{showFinancials && (
  <button>재무 정보 보기</button>
)}
```

### 사용자 권한 목록
```typescript
// 현재 사용자의 모든 권한 가져오기
const permissions = RBACUtils.getUserPermissions(
  'manager',
  'design'
);

console.log(permissions);
// [
//   { id: 'workspace_view', name: '워크스페이스 조회', ... },
//   { id: 'task_assign', name: '작업 할당', ... },
//   ...
// ]
```

---

## 🎨 팀별 대시보드 위젯

### 디자인팀
```typescript
const widgets = RBACUtils.getTeamDashboardWidgets('design');
// ['tasks', 'design-files', 'approval-queue', 'team-activity']
```

### 생산팀
```typescript
const widgets = RBACUtils.getTeamDashboardWidgets('production');
// ['nexus-os', 'production-status', 'inventory', 'tasks']
```

### 온라인팀
```typescript
const widgets = RBACUtils.getTeamDashboardWidgets('online');
// ['campaigns', 'analytics', 'social-media', 'tasks']
```

### 오프라인팀
```typescript
const widgets = RBACUtils.getTeamDashboardWidgets('offline');
// ['store-status', 'sales', 'inventory', 'tasks']
```

### 운영지원팀
```typescript
const widgets = RBACUtils.getTeamDashboardWidgets('operations');
// ['system-status', 'hr-dashboard', 'financials', 'tasks']
```

---

## 🔧 권한 관리 시나리오

### 시나리오 1: 신규 직원 온보딩
```typescript
// 1. 회원가입 시 팀과 역할 선택
const newUser = {
  name: '김신입',
  email: 'newbie@fieldnine.io',
  team: 'design',
  position: 'staff'
};

// 2. 자동으로 팀 기본 권한 부여
const defaultPermissions = TEAMS.design.defaultPermissions;
// ['design_view', 'design_edit']

// 3. 역할에 따른 추가 권한
const rolePermissions = ROLES.staff.permissions;
// ['workspace_view', 'task_view', 'task_update', 'team_view', 'report_view']
```

### 시나리오 2: 승진
```typescript
// 사원 → 파트장 승진
const user = getUser('user@fieldnine.io');
user.position = 'lead';

// 새로운 권한 자동 부여
const newPermissions = ROLES.lead.permissions;
// + 'task_create', 'task_assign', 'report_create'
```

### 시나리오 3: 팀 이동
```typescript
// 디자인팀 → 온라인팀 이동
user.team = 'online';

// 팀별 기본 권한 변경
const oldPermissions = TEAMS.design.defaultPermissions;
// ['design_view', 'design_edit']

const newPermissions = TEAMS.online.defaultPermissions;
// ['online_view', 'online_manage']
```

---

## 📋 권한 체크리스트

### 신규 기능 추가 시
- [ ] 권한 ID 정의 (PERMISSIONS)
- [ ] 리소스 및 작업 정의
- [ ] 역할별 권한 할당 (ROLES)
- [ ] 팀별 기본 권한 확인 (TEAMS)
- [ ] UI 요소 권한 체크 추가
- [ ] 테스트 (모든 역할)

### 정기 점검
- [ ] 사용하지 않는 권한 제거
- [ ] 과도한 권한 확인
- [ ] 역할별 권한 재검토
- [ ] 팀별 권한 균형 확인

---

## 🆘 문제 해결

### Q: 권한이 없다고 나옵니다
```typescript
// 1. 현재 사용자 권한 확인
const user = JSON.parse(localStorage.getItem('fieldnine-user'));
console.log(user.role, user.team);

// 2. 필요한 권한 확인
const required = 'design_approve';
const hasPermission = RBACUtils.hasPermission(user.role, user.team, required);
console.log(hasPermission);

// 3. 권한이 없으면 → 팀장/관리자에게 요청
```

### Q: 특정 기능이 안 보입니다
```typescript
// UI 요소 표시 조건 확인
const shouldShow = RBACUtils.shouldShowUIElement(
  user.role,
  user.team,
  'feature_permission'
);

if (!shouldShow) {
  console.log('권한 부족으로 숨김 처리됨');
}
```

---

**최종 업데이트**: 2025-11-22  
**버전**: 1.0.0  
**작성자**: FIELD NINE Development Team
