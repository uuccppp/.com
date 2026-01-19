const CACHE_NAME = "thuraya-quran-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  // الصور والفيديو
  "./1768411699920.png",
  "./1768472913710.mp4",

  // CSS
  "./css/main.css",
  "./css/layout.css",
  "./css/components.css",
  "./css/darkmode.css",

  // JS
  "./js/data.js",
  "./js/storage.js",
  "./js/calculator.js",
  "./js/quiz.js",
  "./js/quran_app.js",
  "./js/azkar.js",
  "./js/logic.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

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
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});