# 🔒 FIELD NINE 보안 설정 가이드

## 데이터 관리 시스템 접근 권한 설정

### 📌 기본 권한 (전문가 추천 설정)

#### 🏢 임원급 - 전체 접근 가능
- ✅ **공경수** (총괄, executive) - 최고 권한
- ✅ **김본부** (본부장, general_manager) - 전체 관리
- ✅ **박규민** (부장, director) - 부서 관리
- ✅ **박해운** (실장, manager) - 부서 운영

#### 🎯 권한 범위

| 데이터 유형 | 총괄 | 본부장 | 부장 | 실장 | 팀장 | 파트장 | 책임 | 사원 |
|------------|------|--------|------|------|------|--------|------|------|
| 💰 재무 (매출/지출) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 📋 세무 신고 | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 💵 급여 정보 | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| 📅 근태 관리 | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| 🚀 프로젝트 생성 | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| 🎯 마일스톤 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| 📦 재고 관리 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| 💳 일일 매출 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### 🛡️ 보안 철학

**최소 권한 원칙 (Principle of Least Privilege)**
1. **재무/세무**: 법적 책임이 있는 임원만 (총괄, 본부장)
2. **인사**: 임원진이 공유하여 관리 (급여는 4명, 근태는 팀장급까지)
3. **프로젝트**: 기획은 임원/팀장급, 실행은 파트장까지
4. **운영**: 재고/매출은 현장 실무진도 입력 가능

---

## 🔓 추가 권한 부여 방법

대표님이 브라우저 개발자 도구에서 직접 설정할 수 있습니다.

### 1️⃣ 브라우저 개발자 도구 열기
- **Chrome/Edge**: `F12` 또는 `Ctrl + Shift + I`
- **Safari**: `Cmd + Option + I`

### 2️⃣ Console 탭 선택

### 3️⃣ 팀장급에게 권한 추가

```javascript
localStorage.setItem('fieldnine-data-management-access', JSON.stringify(['team_leader']))
location.reload()
```

### 4️⃣ 전체 직원에게 권한 부여 (비추천)

```javascript
localStorage.setItem('fieldnine-data-management-access', JSON.stringify(['team_leader', 'lead', 'senior', 'staff']))
location.reload()
```

---

## 🚫 권한 제거 (기본값으로 되돌리기)

```javascript
localStorage.removeItem('fieldnine-data-management-access')
location.reload()
```

---

## 💡 전문가 추천 시나리오

### ✅ 현재 설정 (Best Practice)
- **접근 가능**: 공경수, 김본부, 박규민, 박해운 (4명)
- **장점**: 
  * 재무/세무 보안 완벽
  * 인사 데이터 임원진 공유
  * 법적 리스크 최소화
  * 감사 추적 용이

### ⚠️ 팀장급 추가 시 (중간 보안)
```javascript
localStorage.setItem('fieldnine-data-management-access', JSON.stringify(['team_leader']))
```
- **추가 인원**: 각 팀 팀장 (6명 추가)
- **장점**: 팀별 자율성 증가
- **단점**: 급여 정보 노출 위험

### ❌ 전체 공개 (비추천)
```javascript
localStorage.setItem('fieldnine-data-management-access', JSON.stringify(['team_leader', 'lead', 'senior', 'staff', 'intern']))
```
- **위험**: 재무/세무/인사 데이터 유출
- **권장하지 않음**

---

## 🔍 현재 설정 확인

```javascript
console.log('기본 권한:', ['executive', 'general_manager', 'director', 'manager'])
console.log('추가 권한:', localStorage.getItem('fieldnine-data-management-access'))
```

---

## 📊 권한별 데이터 템플릿

### 🔒 CRITICAL (총괄/본부장만)
- 월간 매출 입력
- 지출 내역
- 세무 신고

### 🔐 HIGH (임원진 공유)
- 급여 정보
- 근태 관리

### 📊 MEDIUM (팀장급까지)
- 신규 프로젝트
- 마일스톤

### 📝 NORMAL (실무진 포함)
- 재고 관리
- 일일 매출
- 커스텀 데이터

---

## ⚖️ 법적 고려사항

1. **개인정보보호법**: 급여 정보는 최소 인원만 접근
2. **근로기준법**: 근태 기록은 관리자급 이상
3. **법인세법**: 재무/세무는 법적 책임자만
4. **내부회계관리제도**: 4-eyes principle (2인 이상 검증)

---

## 🎓 전문가 의견

**Fortune 500 기업 표준 권한 체계:**
- 재무: CFO, 재무팀장
- 세무: CFO, 세무사
- 인사: CHRO, 인사팀장
- 운영: 각 부서장

**FIELD NINE 적용:**
- 총괄/본부장 = CFO + CHRO (통합 관리)
- 부장/실장 = 팀장급 (실무 공유)
- 팀장 이하 = 데이터 입력 (조회 제한)
