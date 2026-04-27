// 🔴 TEM QUE SER A PRIMEIRA LINHA
self.addEventListener('message', (event) => {
  console.log('SW recebeu:', event.data);
});

// OneSignal
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');

// opcional
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('SW ativo');
});
