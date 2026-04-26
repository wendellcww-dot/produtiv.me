self.addEventListener('message', event => {
  console.log('SW recebeu:', event.data);
});

self.addEventListener('install', e => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', function(e){
  e.notification.close();

  const url = e.notification.data?.url || '/';

  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clients => {
        for (let client of clients) {
          if (client.url.includes(self.location.origin)) {
            return client.focus();
          }
        }
        return self.clients.openWindow(url);
      })
  );
});
