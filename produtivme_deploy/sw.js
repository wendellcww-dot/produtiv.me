// produtiv.me — Service Worker
// Responsável por: notificações em background + clique abre o app

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
  const url = (e.notification.data && e.notification.data.url) ? e.notification.data.url : '/';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clients){
      // Se já tem o app aberto, foca nele
      for(var i = 0; i < clients.length; i++){
        var client = clients[i];
        if(client.url.indexOf(self.location.origin) !== -1 && 'focus' in client){
          return client.focus();
        }
      }
      // Se não tem, abre uma nova janela
      if(self.clients.openWindow){
        return self.clients.openWindow(url);
      }
    })
  );
});

// Fecha notificação ao clicar em "fechar"
self.addEventListener('notificationclose', function(e){
  // pode logar analytics aqui se quiser
});
