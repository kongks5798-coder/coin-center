# 🌐 fieldnine.io 도메인 설정 가이드

## 현재 도메인
- **메인**: fieldnine.io
- **구 도메인**: kausnexus-git-main-kaus2025.vercel.app (자동 리다이렉트)

---

## 📋 Vercel 도메인 연결 단계

### 1️⃣ Vercel 대시보드 설정

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - 프로젝트: `kaus-nexus` 선택

2. **도메인 추가**
   - **Settings** → **Domains** 이동
   - "Add Domain" 클릭
   - `fieldnine.io` 입력 후 "Add"

3. **서브도메인 추가 (선택사항)**
   ```
   www.fieldnine.io
   workspace.fieldnine.io
   nexus.fieldnine.io
   ```

---

### 2️⃣ DNS 설정 (도메인 등록업체)

도메인을 구매한 업체(Namecheap/GoDaddy/Cloudflare 등)의 DNS 관리 패널에서:

#### **Option A: A 레코드 (권장)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (1시간)

Type: A  
Name: www
Value: 76.76.21.21
TTL: 3600
```

#### **Option B: CNAME 레코드**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### **서브도메인 설정 (선택)**
```
Type: CNAME
Name: workspace
Value: cname.vercel-dns.com
TTL: 3600

Type: CNAME
Name: nexus
Value: cname.vercel-dns.com
TTL: 3600
```

---

### 3️⃣ SSL 인증서 (자동)

Vercel이 자동으로 Let's Encrypt SSL 인증서를 발급합니다:
- ✅ HTTPS 자동 활성화
- ✅ 자동 갱신
- ✅ HTTP → HTTPS 리다이렉트

**확인 시간**: DNS 전파 후 5-10분 소요

---

## 🔍 도메인 전파 확인

### DNS 전파 체크
```bash
# Windows (PowerShell)
nslookup fieldnine.io

# Mac/Linux
dig fieldnine.io
```

### 온라인 도구
- https://dnschecker.org
- https://www.whatsmydns.net

**전파 시간**: 보통 5분 ~ 48시간 (평균 1-2시간)

---

## 🚀 프로덕션 배포

### 자동 배포 (권장)
```bash
git add -A
git commit -m "🌐 Production deployment"
git push origin main
```
→ Vercel이 자동으로 fieldnine.io에 배포

### 수동 배포
```bash
cd frontend
npx vercel --prod
```

---

## 📱 도메인 구조

### 메인 페이지
- `https://fieldnine.io` → 랜딩 페이지
- `https://www.fieldnine.io` → 메인 도메인 리다이렉트

### 서브 페이지
- `https://fieldnine.io/login` → 로그인
- `https://fieldnine.io/workspace` → 워크스페이스 대시보드
- `https://fieldnine.io/nexus` → NEXUS OS

### 서브도메인 (선택)
- `https://workspace.fieldnine.io` → 워크스페이스 전용
- `https://nexus.fieldnine.io` → NEXUS OS 전용
- `https://api.fieldnine.io` → API 엔드포인트 (미래)

---

## 🔒 보안 설정

### Next.js 헤더 (이미 설정됨)
- ✅ `Strict-Transport-Security` (HSTS)
- ✅ `X-Frame-Options` (Clickjacking 방지)
- ✅ `X-Content-Type-Options` (MIME 스니핑 방지)
- ✅ `Referrer-Policy`

### Vercel 보안
- ✅ DDoS 방지
- ✅ SSL/TLS 1.3
- ✅ 자동 방화벽

---

## 🛠️ 문제 해결

### 도메인이 연결되지 않는 경우

1. **DNS 전파 확인**
   ```bash
   nslookup fieldnine.io
   ```
   - IP가 `76.76.21.21`인지 확인

2. **Vercel 프로젝트 확인**
   - Settings → Domains에서 도메인 상태 확인
   - "Valid Configuration" 표시 여부

3. **캐시 클리어**
   ```bash
   # DNS 캐시 클리어 (Windows)
   ipconfig /flushdns
   
   # Mac
   sudo dscacheutil -flushcache
   ```

4. **브라우저 캐시**
   - Ctrl + Shift + R (강제 새로고침)
   - 시크릿 모드로 테스트

### SSL 인증서 오류

- Vercel 대시보드에서 "Renew Certificate" 클릭
- 5-10분 대기 후 재시도

---

## 📊 모니터링

### Vercel Analytics
- https://vercel.com/[프로젝트]/analytics
- 실시간 트래픽 확인
- 성능 지표 모니터링

### DNS 모니터링
- https://uptimerobot.com (무료)
- fieldnine.io 상태 알림 설정

---

## ✅ 체크리스트

- [ ] Vercel에서 fieldnine.io 도메인 추가
- [ ] 도메인 등록업체에서 A 레코드 설정
- [ ] DNS 전파 대기 (1-2시간)
- [ ] HTTPS 활성화 확인
- [ ] www.fieldnine.io 리다이렉트 확인
- [ ] 모든 페이지 접근 테스트
- [ ] 로그인/워크스페이스 기능 테스트
- [ ] 모바일 반응형 확인

---

## 🎉 완료!

**공식 도메인**: https://fieldnine.io

**FIELD NINE** - 미래를 설계하는 혁신 플랫폼
