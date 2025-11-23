// KAUS PWA Service Worker
const CACHE_NAME = 'kaus-app-v1';
const RUNTIME_CACHE = 'kaus-runtime-v1';

// 캐시할 리소스
const PRECACHE_URLS = [
  '/',
  '/mining',
  '/activity-mining',
  '/wallet',
  '/earn-kaus',
  '/manifest.json',
];

// 설치 시 캐시
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// 활성화 시 오래된 캐시 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
  // API 요청은 네트워크 우선
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return new Response(JSON.stringify({ error: '오프라인입니다' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  // 정적 리소스는 캐시 우선
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME_CACHE).then((cache) => {
          return fetch(event.request).then((response) => {
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        });
      })
      .catch(() => {
        // 오프라인 폴백
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// 백그라운드 동기화 (채굴 데이터 저장)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-mining-data') {
    event.waitUntil(syncMiningData());
  }
});

async function syncMiningData() {
  // IndexedDB에서 채굴 데이터 가져와서 서버에 동기화
  // 실제 구현 시 IndexedDB 사용
  console.log('채굴 데이터 동기화 중...');
}

// 백그라운드 채굴 (페이지가 닫혀도 계속 실행)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'START_BACKGROUND_MINING') {
    startBackgroundMining();
  } else if (event.data && event.data.type === 'STOP_BACKGROUND_MINING') {
    stopBackgroundMining();
  }
});

let miningInterval = null;

function startBackgroundMining() {
  if (miningInterval) return;
  
  // 백그라운드에서 주기적으로 채굴 계산
  miningInterval = setInterval(() => {
    // CPU 집약적 작업 수행 (실제 채굴 시뮬레이션)
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.sqrt(i) * Math.sin(i);
    }
    
    // 채굴 데이터를 IndexedDB에 저장
    // 실제 구현 시 IndexedDB 사용
    console.log('백그라운드 채굴 중...', result);
    
    // 클라이언트에게 채굴 완료 알림
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'MINING_UPDATE',
          data: { earned: 0.0001, timestamp: Date.now() }
        });
      });
    });
  }, 5000); // 5초마다 채굴
}

function stopBackgroundMining() {
  if (miningInterval) {
    clearInterval(miningInterval);
    miningInterval = null;
  }
}

// 푸시 알림
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'KAUS 알림';
  const options = {
    body: data.body || '새로운 알림이 있습니다',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: data.url || '/',
    actions: [
      {
        action: 'open',
        title: '열기'
      },
      {
        action: 'close',
        title: '닫기'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data || '/')
    );
  }
});

