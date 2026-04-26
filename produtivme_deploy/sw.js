// 🔥 OneSignal (sempre no topo)
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Seu código abaixo 👇

// Mensagens
self.addEventListener('message', function(event) {
  console.log('SW recebeu mensagem:', event.data);
});

const CACHE_NAME = 'produtivme-v1';

// Instala
self.addEventListener('install', function(e){
  self.skipWaiting();
});

// Ativa
self.addEventListener('activate', function(e){
  e.waitUntil(self.clients.claim());
});

// Clique notificação
self.addEventListener('notificationclick', function(e){
  e.notification.close();

  const url = e.notification.data?.url || '/';

  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(clients){
        for (let client of clients) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
  );
});
