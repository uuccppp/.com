const CACHE_NAME = "quran-app-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./css/main.css",
  "./css/layout.css",
  "./css/components.css",
  "./css/darkmode.css",

  "./js/logic.js",
  "./js/data.js",
  "./js/storage.js",
  "./js/calculator.js",
  "./js/quiz.js",
  "./js/quran_app.js",
  "./js/azkar.js",

  "./quran.json",
  "./azkar.json",

  "./1768411699920.png",
  "./1768472913710.mp4"
];

// تثبيت
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// تفعيل
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// الجلب + التحديث
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});

// إشعار بوجود تحديث
self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
