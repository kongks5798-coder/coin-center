# 🔒 FIELD NINE 보안 설정 가이드

## 데이터 관리 시스템 접근 권한 설정

### 📌 기본 권한 (현재)
- ✅ **공경수** (총괄, executive)
- ✅ **김본부** (본부장, general_manager)

---

## 🔓 추가 권한 부여 방법

대표님이 브라우저 개발자 도구에서 직접 설정할 수 있습니다.

### 1️⃣ 브라우저 개발자 도구 열기
- **Chrome/Edge**: `F12` 또는 `Ctrl + Shift + I`
- **Safari**: `Cmd + Option + I`

### 2️⃣ Console 탭 선택

### 3️⃣ 아래 명령어 입력

#### 예시 1: 부장(director) 추가
```javascript
localStorage.setItem('fieldnine-data-management-access', JSON.stringify(['director']))
```

#### 예시 2: 부장 + 실장(manager) 추가
```javascript
localStorage.setItem('fieldnine-data-management-access', JSON.stringify(['director', 'manager']))
```

#### 예시 3: 팀장(team_leader)까지 추가
```javascript
localStorage.setItem('fieldnine-data-management-access', JSON.stringify(['director', 'manager', 'team_leader']))
```

#### 예시 4: 모든 직급에게 권한 부여
```javascript
localStorage.setItem('fieldnine-data-management-access', JSON.stringify(['director', 'manager', 'team_leader', 'lead', 'senior', 'staff', 'intern']))
```

### 4️⃣ 페이지 새로고침
```javascript
location.reload()
```

---

## 🚫 권한 제거 (기본값으로 되돌리기)

```javascript
localStorage.removeItem('fieldnine-data-management-access')
location.reload()
```

---

## 📋 직급 코드 참고표

| 직급명 | 코드 | 설명 |
|--------|------|------|
| 총괄 | `executive` | 최고 권한 (기본 허용) |
| 본부장 | `general_manager` | 전체 관리 (기본 허용) |
| 부장 | `director` | 부서 관리 |
| 실장 | `manager` | 부서 운영 |
| 팀장 | `team_leader` | 팀 관리 |
| 파트장 | `lead` | 작업 할당 |
| 책임 | `senior` | 작업 생성 |
| 사원 | `staff` | 작업 수정 |
| 인턴 | `intern` | 조회만 |

---

## 💡 활용 시나리오

### 시나리오 1: 부장에게만 재무 데이터 입력 권한
```javascript
localStorage.setItem('fieldnine-data-management-access', JSON.stringify(['director']))
location.reload()
```
→ 이부장님이 데이터 관리 시스템 접근 가능

### 시나리오 2: 부장 + 실장에게 권한
```javascript
localStorage.setItem('fieldnine-data-management-access', JSON.stringify(['director', 'manager']))
location.reload()
```
→ 이부장, 박실장 접근 가능

### 시나리오 3: 특정 팀장만 허용 (향후 개인별 설정 시)
현재는 직급 단위로만 가능. 
향후 업그레이드 시 개인 이메일 기반 권한 설정 가능.

---

## ⚠️ 보안 권장사항

1. **최소 권한 원칙**: 필요한 직급만 추가
2. **정기 검토**: 분기별 권한 재확인
3. **감사 로그**: 데이터 입력 시 자동 기록됨
4. **비상 차단**: 문제 발생 시 즉시 `removeItem` 실행

---

## 🔍 현재 설정 확인

```javascript
console.log('추가 권한:', localStorage.getItem('fieldnine-data-management-access'))
```

출력이 `null`이면 기본 설정 (총괄, 본부장만 가능)
