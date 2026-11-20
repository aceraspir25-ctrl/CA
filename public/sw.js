/**
 * JARVIS CCA-04: Service Worker for Offline Academic PWA
 * Caches essential static assets and offline study resources for low-connectivity Indian regions.
 */

const CACHE_NAME = "jarvis-cca04-v1"
const OFFLINE_URLS = [
  "/dashboard",
  "/vault",
  "/amendments",
  "/exam-simulator",
  "/career",
  "/library",
  "/manifest.json"
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS).catch((err) => {
        console.warn("[SW] Cache pre-fill partial failure:", err)
      })
    })
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    })
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return

  // Skip API routes and Chrome extensions
  const url = new URL(event.request.url)
  if (url.pathname.startsWith("/api/") || !url.protocol.startsWith("http")) return

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version while fetching fresh in background (stale-while-revalidate)
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone())
              })
            }
          })
          .catch(() => null)
        return cachedResponse
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone)
            })
          }
          return networkResponse
        })
        .catch(() => {
          // Fallback to cached dashboard if offline
          return caches.match("/dashboard")
        })
    })
  )
})
