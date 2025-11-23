# 🌐 www.fieldnine.io 도메인 연결 가이드

## 현재 상황
- ✅ **Vercel 프로젝트**: `fieldnine.io` (Production URL: `coin-center.vercel.app`)
- ✅ **도메인 등록**: `fieldnine.io` (가비아)
- ⏳ **도메인 연결**: `www.fieldnine.io` (진행 필요)

---

## 🚀 도메인 연결 방법 (2가지)

### 방법 1: Vercel 대시보드에서 연결 (권장)

1. **Vercel 대시보드 접속**
   - https://vercel.com/kaus2025/fieldnine.io
   - 또는 https://vercel.com/dashboard

2. **Settings → Domains 이동**
   - 프로젝트 선택: `fieldnine.io`
   - 좌측 메뉴에서 **Settings** 클릭
   - **Domains** 탭 클릭

3. **도메인 추가**
   - "Add Domain" 버튼 클릭
   - `www.fieldnine.io` 입력
   - "Add" 클릭

4. **DNS 설정 확인**
   - Vercel이 자동으로 DNS 설정 방법을 안내합니다
   - 보통 CNAME 레코드를 사용합니다

---

### 방법 2: 가비아 DNS에서 직접 설정

1. **가비아 로그인**
   - https://www.gabia.com
   - My가비아 로그인

2. **DNS 관리**
   - My가비아 → 도메인 관리
   - `fieldnine.io` 선택
   - DNS 정보 → DNS 설정

3. **CNAME 레코드 추가** (권장)
   ```
   레코드 타입: CNAME
   호스트명: www
   값/위치: cname.vercel-dns.com
   TTL: 3600
   ```

   또는 **A 레코드 추가** (대안)
   ```
   레코드 타입: A
   호스트명: www
   값/위치: 76.76.21.21
   TTL: 3600
   ```

4. **저장 및 대기**
   - "레코드 추가" 클릭
   - 5-10분 대기 (DNS 전파 시간)

5. **Vercel에서 확인**
   - Vercel 대시보드 → Settings → Domains
   - `www.fieldnine.io` 추가
   - 자동으로 인증됨

---

## ✅ 확인 방법

### 1. DNS 전파 확인
```bash
# Windows PowerShell
nslookup www.fieldnine.io

# 또는 온라인 도구 사용
# https://dnschecker.org
```

### 2. 브라우저에서 확인
- https://www.fieldnine.io 접속
- 정상적으로 로드되면 성공!

---

## 🔧 문제 해결

### 도메인이 연결되지 않는 경우

1. **DNS 전파 대기**
   - 최대 24시간 소요 가능
   - 보통 5-10분 내 완료

2. **Vercel 인증 확인**
   - Settings → Domains에서 상태 확인
   - "Valid Configuration" 표시 확인

3. **DNS 레코드 재확인**
   - 가비아에서 레코드가 올바르게 설정되었는지 확인
   - TTL 값 확인 (너무 길면 변경)

4. **브라우저 캐시 삭제**
   - Ctrl + Shift + Delete
   - 캐시된 이미지 및 파일 삭제

---

## 📝 현재 Vercel 프로젝트 정보

- **프로젝트명**: `fieldnine.io`
- **Production URL**: `https://coin-center.vercel.app`
- **도메인**: `fieldnine.io` (연결됨)
- **추가 필요**: `www.fieldnine.io`

---

## 🎯 다음 단계

1. ✅ Vercel 대시보드에서 `www.fieldnine.io` 추가
2. ✅ 가비아 DNS에 CNAME 또는 A 레코드 추가
3. ✅ DNS 전파 대기 (5-10분)
4. ✅ https://www.fieldnine.io 접속 확인

---

**업데이트**: 2025-11-23  
**상태**: 🟡 도메인 연결 진행 중

