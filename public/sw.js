/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const version = "v1:";
const cacheNames = {
  assets: `${version}assets`,
  pages: `${version}pages}`,
  posts: `${version}posts`,
};

const cacheLimits = {
  pages: 100,
  posts: 100,
};

// Function to trim cache based on specified limit
async function trimCache(cacheName, limit) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > limit) {
    for (let i = 0; i < keys.length - limit; i++) {
      if (keys[i]) await cache.delete(keys[i]);
    }
  }
}

// Install event: Cache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheNames.assets).then((cache) => {
      return cache.addAll([
        "/offline/", // Offline page
        "/favicon.png",
        "/c/default.min.css",
        "/c/advanced.min.css",
        "/j/main.min.js",
        // Add more essential assets here
      ]);
    })
  );
});

// Activate event: Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (!key.startsWith(version)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch event: Serve assets from cache or network
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Determine cache strategy based on request destination
  if (url.origin === location.origin) {
    // Serve assets from cache
    if (url.pathname.startsWith("/images/")) {
      event.respondWith(
        caches.match(request).then((cachedResponse) => {
          return cachedResponse ?? fetch(request);
        })
      );
    }

    // Serve podcast episodes from cache with trimming
    else if (url.pathname.startsWith("/posts/")) {
      event.respondWith(
        caches.open(cacheNames.posts).then(async (cache) => {
          const cachedResponse = await cache.match(request);
          if (cachedResponse) {
            return cachedResponse;
          } else {
            const networkResponse = await fetch(request);
            await cache.put(request, networkResponse.clone());
            await trimCache(cacheNames.posts, cacheLimits.posts);
            return networkResponse;
          }
        })
      );
    }
  }
});

import { precacheAndRoute } from "workbox-precaching/precacheAndRoute";
precacheAndRoute([]);
