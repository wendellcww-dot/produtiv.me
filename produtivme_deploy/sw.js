
self.addEventListener('message', function(event) {
  console.log('SW recebeu mensagem:', event.data);
});

// ✅ EVENTO DE PUSH (ESTAVA FALTANDO)
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};

  event.waitUntil(
    self.registration.showNotification(data.title || 'Notificação', {
      body: data.body || 'Você tem uma nova mensagem',
      data: data,
    })
  );
});

const CACHE_NAME = 'produtivme-v1';

// Instala o SW
self.addEventListener('install', function(e){
  self.skipWaiting();
});

// Ativa o SW
self.addEventListener('activate', function(e){
  e.waitUntil(self.clients.claim());
});

// Clique na notificação → abre ou foca o app
self.addEventListener('notificationclick', function(e){
  e.notification.close();

  const url = (e.notification.data && e.notification.data.url) 
    ? e.notification.data.url 
    : '/';

  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clients){
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

// Fecha notificação
self.addEventListener('notificationclose', function(e){
  // opcional
});
