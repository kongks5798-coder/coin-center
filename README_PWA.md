# KAUS PWA 앱 설치 가이드

## 📱 KAUS Progressive Web App (PWA)

KAUS 앱은 PWA 기술을 사용하여 모바일과 데스크톱에서 네이티브 앱처럼 설치하고 사용할 수 있습니다.

## ✨ 주요 기능

### 1. **오프라인 채굴**
- 인터넷 연결이 없어도 앱에서 채굴할 수 있습니다
- Service Worker가 데이터를 캐시하여 오프라인에서도 작동합니다

### 2. **푸시 알림**
- 채굴 완료 알림
- 보상 획득 알림
- 활동 기반 채굴 알림

### 3. **빠른 접근**
- 홈 화면에 바로가기 추가
- 앱처럼 독립적인 창에서 실행
- 빠른 로딩 속도

### 4. **백그라운드 동기화**
- 앱이 백그라운드에서도 채굴 데이터를 동기화합니다
- 네트워크가 복구되면 자동으로 서버와 동기화합니다

## 📲 설치 방법

### iOS (iPhone/iPad)

1. **Safari 브라우저 사용**
   - Chrome이 아닌 Safari 브라우저를 사용해야 합니다

2. **공유 버튼 클릭**
   - 화면 하단의 공유 버튼 (□↑)을 누르세요

3. **홈 화면에 추가**
   - "홈 화면에 추가" 옵션을 선택하세요

4. **설치 완료**
   - 홈 화면에서 KAUS 앱을 실행하세요!

### Android

1. **Chrome 브라우저 사용**
   - Chrome 브라우저에서 사이트를 열어주세요

2. **설치 프롬프트 확인**
   - 화면에 나타나는 "앱 설치" 팝업을 확인하세요

3. **설치 버튼 클릭**
   - "설치" 버튼을 눌러주세요

4. **설치 완료**
   - 홈 화면에서 KAUS 앱을 실행하세요!

### 데스크톱 (Windows/Mac)

1. **Chrome/Edge 브라우저 사용**
   - Chrome 또는 Edge 브라우저를 사용해주세요

2. **주소창 아이콘 확인**
   - 주소창 오른쪽에 설치 아이콘 (➕)이 나타납니다

3. **설치 클릭**
   - 설치 아이콘을 클릭하고 "설치"를 선택하세요

4. **설치 완료**
   - 바로가기에서 KAUS 앱을 실행하세요!

## 🛠️ 개발자 가이드

### Service Worker 등록

Service Worker는 자동으로 등록됩니다. `/sw.js` 파일이 루트에 있어야 합니다.

### Manifest 설정

`/public/manifest.json` 파일에서 앱 메타데이터를 설정할 수 있습니다.

### 아이콘 생성

아이콘을 생성하려면:

```bash
npm install sharp --save-dev
node scripts/generate-icons.js
```

또는 온라인 도구를 사용하여 SVG를 PNG로 변환할 수 있습니다:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

## 📋 필수 아이콘 크기

다음 크기의 아이콘이 필요합니다:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

## 🔧 커스터마이징

### 테마 색상 변경

`/public/manifest.json`에서 `theme_color`를 변경하세요.

### 앱 이름 변경

`/public/manifest.json`에서 `name`과 `short_name`을 변경하세요.

## 🚀 배포

PWA는 자동으로 배포됩니다. HTTPS가 필요합니다 (Vercel은 자동으로 제공).

## 📞 지원

문제가 발생하면:
- GitHub Issues에 문의하세요
- support@fieldnine.io로 이메일을 보내주세요

---

**KAUS - FIELD NINE Corporation**  
© 2035 All rights reserved.

