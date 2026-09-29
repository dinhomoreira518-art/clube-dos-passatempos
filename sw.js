const C="clube-v1",F=["/","/index.html","/styles.css","/app.js","/icon.svg","/manifest.webmanifest"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{const y=r.clone();caches.open(C).then(c=>c.put(e.request,y));return r}).catch(()=>caches.match(e.request)))});