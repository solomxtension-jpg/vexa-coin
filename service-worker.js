const CACHE_NAME = 'vexa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)));
});

// --- Sync Offline Mining ---
self.addEventListener('sync', event => {
  if (event.tag === 'sync-mining') {
    event.waitUntil(syncMining());
  }
});

async function syncMining() {
  const db = await openIndexedDB();
  const tx = db.transaction('pending', 'readwrite');
  const store = tx.objectStore('pending');
  const allItems = await store.getAll();

  for (let item of allItems) {
    try {
      await fetch('https://YOUR_SUPABASE_PROJECT_URL/functions/v1/sync-mining', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY`
        },
        body: JSON.stringify(item)
      });
      store.delete(item.id);
    } catch (err) {
      console.error('Sync failed', err);
    }
  }
  await tx.done;
}

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('vexa-db', 1);
    request.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('pending')) {
        db.createObjectStore('pending', { keyPath: 'id', autoIncrement: true });
      }
    };
    request.onsuccess = e => resolve(e.target.result);
    request.onerror = e => reject(e.target.error);
  });
}
