# FIELD NINE Backend API

**프로덕션 URL**: https://www.fieldnine.io

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
cd backend
npm install
```

### 2. 환경 변수 설정
```bash
cp .env.example .env
# .env 파일을 열어서 실제 값으로 수정
```

### 3. 개발 서버 실행
```bash
npm run dev
```

서버가 `http://localhost:3001`에서 실행됩니다.

## 📡 API 엔드포인트

### 인증 (Authentication)
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/me` - 현재 사용자 정보
- `POST /api/auth/logout` - 로그아웃

### 작업 (Tasks)
- `GET /api/tasks` - 작업 목록 조회
- `GET /api/tasks/:id` - 작업 상세 조회
- `POST /api/tasks` - 작업 생성
- `PUT /api/tasks/:id` - 작업 수정
- `DELETE /api/tasks/:id` - 작업 삭제

### 팀 (Teams)
- `GET /api/teams` - 팀 목록
- `GET /api/teams/:teamId` - 팀 상세
- `GET /api/teams/:teamId/members` - 팀원 목록
- `GET /api/teams/:teamId/tasks` - 팀 작업 목록

### NEXUS OS
- `GET /api/nexus/robots` - 로봇 상태
- `GET /api/nexus/warehouse` - 창고 현황
- `GET /api/nexus/predictions` - AI 예측
- `POST /api/nexus/rfid-scan` - RFID 스캔 기록

## 🔐 인증

모든 보호된 엔드포인트는 JWT 토큰이 필요합니다.

```bash
Authorization: Bearer <your-jwt-token>
```

## 📝 예제 요청

### 회원가입
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "홍길동",
    "email": "hong@fieldnine.io",
    "password": "password123",
    "position": "staff",
    "team": "design"
  }'
```

### 로그인
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hong@fieldnine.io",
    "password": "password123"
  }'
```

### 작업 생성
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "새 작업",
    "description": "작업 설명",
    "status": "pending",
    "priority": "high"
  }'
```

## 🗄️ 데이터베이스 (향후)

현재는 메모리 기반 Mock 데이터를 사용합니다.  
프로덕션에서는 PostgreSQL을 사용할 예정입니다.

```bash
# PostgreSQL 설치 및 설정
createdb fieldnine
psql fieldnine < schema.sql
```

## 🌐 배포

### Vercel에 배포
```bash
vercel --prod
```

### Railway에 배포
```bash
railway up
```

## 📚 더 보기

- **프론트엔드**: https://www.fieldnine.io
- **문서**: [HANDOFF_DOCUMENT.md](../HANDOFF_DOCUMENT.md)
- **RBAC 가이드**: [RBAC_GUIDE.md](../RBAC_GUIDE.md)
