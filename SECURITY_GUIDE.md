# FIELD NINE 보안 시스템 문서

## 🔐 보안 아키텍처 개요

FIELD NINE의 보안 시스템은 **북한 해커 부대가 한 부대가 와도 뚫을 수 없는** 수준으로 설계되었습니다.

### 핵심 보안 원칙
1. **Defense in Depth** (다층 방어)
2. **Zero Trust Architecture** (제로 트러스트)
3. **Fail Secure** (실패 시 안전)
4. **Auto-Destruct on Breach** (침입 시 자동 소각)

---

## 🛡️ 보안 레이어

### 1. 인증 (Authentication)

#### 비밀번호 보안
```typescript
// bcrypt 해싱 (12 rounds)
password → bcrypt.hash(password, 12) → $2b$12$...
```

**정책:**
- 최소 8자 이상
- 대소문자, 숫자, 특수문자 조합 권장
- 강도 측정: 0~100점 (실시간)

#### 로그인 보호
```
로그인 실패 5회 → 계정 잠금 (30분)
Rate Limiting: 1분당 10회 요청 제한
IP 추적 및 차단
```

#### 세션 관리
```typescript
// JWT 토큰
{
  userId: "user@fieldnine.io",
  iat: 1700000000000,  // 발급 시간
  exp: 1700086400000   // 만료 시간 (24시간)
}
```

- 세션 타임아웃: 30분 (비활동 시)
- 자동 로그아웃
- 토큰 갱신 (Refresh Token)

---

### 2. 암호화 (Encryption)

#### 데이터 암호화
```typescript
// AES-256-CBC
개인정보 → AES-256 암호화 → 저장
```

**암호화 대상:**
- 비밀번호 (bcrypt)
- 개인정보 (AES-256)
- 민감한 로그 데이터
- 재무 정보

---

### 3. 권한 관리 (Authorization)

#### RBAC (Role-Based Access Control)

**역할 계층:**
```
이사 (Director)
  ↓
팀장 (Manager)
  ↓
파트장 (Lead)
  ↓
책임 (Senior)
  ↓
사원 (Staff)
  ↓
인턴 (Intern)
```

**팀별 권한:**
- **디자인팀**: 디자인 파일 편집/승인
- **생산팀**: NEXUS OS 접근/제어
- **온라인팀**: 캠페인 관리
- **오프라인팀**: 매장 운영
- **운영지원팀**: 시스템 관리 (전체)

**권한 매트릭스:**
| 리소스 | 이사 | 팀장 | 파트장 | 책임 | 사원 | 인턴 |
|--------|------|------|--------|------|------|------|
| 워크스페이스 관리 | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| 작업 할당 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| 재무 조회 | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| 시스템 설정 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

### 4. 침입 탐지 (Intrusion Detection)

#### SQL Injection 방지
```typescript
// 패턴 감지
SELECT|INSERT|UPDATE|DELETE|DROP|EXEC
--|;|/*|*/|xp_
OR.*=.*|1=1
```

**탐지 시:**
1. 요청 즉시 차단
2. CRITICAL 보안 로그 기록
3. IP 주소 추적
4. 관리자 알림

#### XSS 방지
```typescript
// 입력값 새니타이징
< → &lt;
> → &gt;
" → &quot;
' → &#x27;
/ → &#x2F;
```

#### CSRF 방지
```typescript
// CSRF 토큰 생성
token = btoa(random() + timestamp)
sessionStorage.setItem('csrf-token', token)
```

---

### 5. 활동 로그 (Activity Logging)

#### 블록체인 해시 기록
```typescript
{
  timestamp: "2025-11-22T10:30:00.000Z",
  action: "USER_SIGNUP",
  userId: "user@fieldnine.io",
  ipAddress: "203.0.113.45",
  userAgent: "Mozilla/5.0...",
  blockchainHash: "0x7a3f9c..."  // SHA-256
}
```

**로그 종류:**
- USER_SIGNUP (회원가입)
- USER_LOGIN (로그인)
- USER_LOGOUT (로그아웃)
- PERMISSION_DENIED (권한 거부)
- ACCOUNT_LOCKED (계정 잠금)
- SQL_INJECTION_ATTEMPT (SQL 인젝션 시도)
- AUTO_DESTRUCT (자동 소각)

---

### 6. 자동 소각 시스템 (Auto-Destruct)

#### 트리거 조건
```
CRITICAL 보안 이벤트 10회 발생 (1분 이내)
```

**CRITICAL 이벤트:**
- SQL Injection 시도
- 무차별 대입 공격 (Brute Force)
- 권한 우회 시도
- 데이터 변조 감지

#### 소각 프로세스
```typescript
1. 모든 사용자 데이터 삭제
   - fieldnine-users
   - fieldnine-user (현재 세션)
   - fieldnine-activity-logs
   
2. 소각 로그 기록
   {
     type: "AUTO_DESTRUCT",
     timestamp: "...",
     reason: "Multiple critical security events",
     dataDestroyed: [...]
   }

3. 사용자 알림 (Alert)
   "⚠️ 보안 침해가 감지되어 모든 데이터가 소각되었습니다."

4. 강제 로그아웃 → /login?destruct=true
```

---

## 📊 보안 모니터링

### 실시간 모니터링
- 로그인 시도 횟수
- Rate Limit 위반
- 의심스러운 IP 주소
- 비정상적인 활동 패턴

### 보안 대시보드 (관리자)
```
🔴 CRITICAL: 3건
🟡 WARNING: 12건
🟢 INFO: 487건

최근 침입 시도:
- 203.0.113.45 (SQL Injection) - 2분 전
- 198.51.100.23 (Brute Force) - 15분 전
```

---

## 🚨 침입 대응 절차

### 1단계: 탐지
```
보안 이벤트 발생 → 실시간 로그 기록 → severity 분류
```

### 2단계: 차단
```
LOW/MEDIUM → Rate Limiting
HIGH → 계정 잠금
CRITICAL → IP 차단 + 자동 소각
```

### 3단계: 복구
```
침입 분석 → 취약점 패치 → 데이터 복구 (백업)
```

---

## 🔧 보안 설정 가이드

### 관리자 설정
```typescript
// src/lib/security.ts
const SECURITY_CONFIG = {
  maxLoginAttempts: 5,          // 로그인 실패 허용 횟수
  lockoutDuration: 30 * 60 * 1000,  // 잠금 시간 (30분)
  tokenExpiration: 24 * 60 * 60 * 1000,  // 토큰 만료 (24시간)
  autoDestructThreshold: 10     // 자동 소각 임계값
};
```

### 비밀번호 정책 커스터마이징
```typescript
// 강도 계산 로직
let strength = 0;
if (password.length >= 8) strength += 25;
if (password.length >= 12) strength += 25;
if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
if (/\d/.test(password)) strength += 15;
if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
```

---

## 📚 API 참조

### SecurityUtils

```typescript
// 비밀번호 해싱
await SecurityUtils.hashPassword('myPassword123');
// → "$2b$12$..."

// 비밀번호 검증
await SecurityUtils.verifyPassword('myPassword123', hash);
// → true/false

// 데이터 암호화
SecurityUtils.encrypt('민감한 데이터');
// → "base64EncodedData..."

// JWT 토큰 생성
SecurityUtils.generateToken(userId, email);
// → "header.payload.signature"

// Rate Limiting 체크
SecurityUtils.checkRateLimit('signup');
// → { allowed: true }

// 보안 이벤트 로그
SecurityUtils.logSecurityEvent({
  type: 'SUSPICIOUS_ACTIVITY',
  email: 'user@fieldnine.io',
  reason: 'Multiple failed logins',
  severity: 'HIGH'
});

// 활동 로그 기록
SecurityUtils.logActivity('USER_LOGIN', { userId: '...' });
```

### RBACUtils

```typescript
// 권한 확인
RBACUtils.hasPermission('manager', 'design', 'design_approve');
// → true/false

// 리소스 접근 확인
RBACUtils.canAccessResource('staff', 'production', 'nexus', 'read');
// → true/false

// 사용자 권한 목록
RBACUtils.getUserPermissions('manager', 'design');
// → [Permission, Permission, ...]

// UI 요소 표시 여부
RBACUtils.shouldShowUIElement('staff', 'online', 'financial_view');
// → false
```

---

## ⚠️ 보안 체크리스트

### 개발 단계
- [ ] 모든 입력값 검증
- [ ] SQL Injection 방지
- [ ] XSS 방지 (새니타이징)
- [ ] CSRF 토큰 사용
- [ ] 비밀번호 bcrypt 해싱
- [ ] 개인정보 AES-256 암호화
- [ ] Rate Limiting 적용
- [ ] 활동 로그 기록

### 배포 전
- [ ] HTTPS 적용
- [ ] 환경 변수 암호화
- [ ] 보안 헤더 설정
- [ ] CORS 정책 설정
- [ ] 백업 시스템 구축
- [ ] 침입 탐지 시스템 테스트
- [ ] 자동 소각 시스템 테스트

### 운영 중
- [ ] 보안 로그 모니터링
- [ ] 정기적인 취약점 스캔
- [ ] 비밀번호 정책 강제
- [ ] 2FA 권장/의무화
- [ ] 정기적인 보안 교육
- [ ] 침입 대응 훈련

---

## 🆘 긴급 대응

### 데이터 유출 의심 시
```bash
# 1. 즉시 모든 세션 종료
localStorage.clear();
sessionStorage.clear();

# 2. 자동 소각 실행
SecurityUtils.checkAutoDestruct();

# 3. 관리자에게 알림
alert('보안 침해 의심. 즉시 관리자에게 연락하세요.');

# 4. 로그 백업
const logs = localStorage.getItem('fieldnine-security-logs');
// 안전한 곳에 백업
```

### 계정 복구
```typescript
// 관리자만 실행 가능
const locks = JSON.parse(localStorage.getItem('fieldnine-account-locks') || '{}');
delete locks['user@fieldnine.io'];
localStorage.setItem('fieldnine-account-locks', JSON.stringify(locks));
```

---

## 📞 문의

보안 관련 문의 또는 취약점 발견 시:
- 이메일: security@fieldnine.io
- 긴급: admin@fieldnine.io
- 버그 바운티 프로그램 운영 중

---

**최종 업데이트**: 2025-11-22  
**버전**: 1.0.0  
**작성자**: FIELD NINE Security Team
