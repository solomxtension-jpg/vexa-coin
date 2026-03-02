// --- Service Worker: service-worker.js ---
const CACHE_NAME = 'vexa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add any CSS, JS, images you use
];

// --- Install Event ---
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// --- Activate Event ---
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(self.clients.claim());
});

// --- Fetch Event: Serve cached assets ---
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedRes => {
      return cachedRes || fetch(event.request);
    })
  );
});

// --- Background Sync for mining ---
self.addEventListener('sync', event => {
  if (event.tag === 'sync-mining') {
    event.waitUntil(syncMining());
  }
});

// --- Sync Mining Function ---
async function syncMining() {
  const db = await openIndexedDB();
  const tx = db.transaction('pending', 'readwrite');
  const store = tx.objectStore('pending');
  const allItems = await store.getAll();

  for (let item of allItems) {
    try {
      // Send mined coins to Supabase via fetch
      await fetch('/sync-mining', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      store.delete(item.id); // Remove after successful sync
    } catch (err) {
      console.error('Sync failed', err);
    }
  }
  await tx.done;
}

// --- IndexedDB Setup for offline mining ---
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
