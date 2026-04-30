/**
 * produtiv.me — sw.js v4.0
 * ═══════════════════════════════════════════════════════════════════
 * ESTRATÉGIA:
 *   Este arquivo é o Service Worker PRINCIPAL e ÚNICO do app.
 *   Ele importa o SDK do OneSignal internamente (importScripts),
 *   eliminando o conflito entre os dois SWs.
 *
 * POR QUE O CONFLITO ACONTECIA:
 *   Sem este arquivo, o OneSignal registrava o OneSignalSDKWorker.js
 *   como SW automaticamente. Esse SW intercepta TODOS os fetch —
 *   inclusive o handshake WebSocket do Supabase Realtime — e sem
 *   lógica de bypass, o navegador fechava a conexão antes de
 *   estabelecê-la. Resultado: "closed before connection established".
 *
 * SOLUÇÃO:
 *   1. Você registra /sw.js manualmente (este arquivo).
 *   2. Este SW importa o OneSignal internamente via importScripts.
 *   3. O OneSignal funciona "dentro" do seu SW.
 *   4. Você controla os bypasses (Supabase, WebSocket, etc.).
 *
 * DEPLOY: Coloque este arquivo na RAIZ do seu projeto (/sw.js).
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────────────────────────────────
   ONESIGNAL — importado DENTRO do SW, não na página HTML.
   O SDK v16 detecta que está num SW e não tenta registrar
   um worker concorrente.
───────────────────────────────────────────────────────────────── */
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');

/* ─────────────────────────────────────────────────────────────────
   VERSÃO E CACHES
───────────────────────────────────────────────────────────────── */
const SW_VERSION    = '4.0.0';
const CACHE_STATIC  = `pm-static-v${SW_VERSION}`;
const CACHE_DYNAMIC = `pm-dynamic-v${SW_VERSION}`;

// Shell mínimo pré-cacheado no install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

/* ─────────────────────────────────────────────────────────────────
   BYPASS — estas origens NUNCA passam pelo cache do SW.
   CRÍTICO: sem isso, o Supabase Realtime (WebSocket) é interceptado
   e a conexão morre antes de ser estabelecida.
───────────────────────────────────────────────────────────────── */
const BYPASS_HOSTNAMES = [
  'supabase.co',      // REST API + Realtime WebSocket + Auth
  'supabase.in',      // CDN do Supabase
  'onesignal.com',    // OneSignal tem lógica própria via importScripts
  'googleapis.com',   // Google Fonts / Firebase
  'gstatic.com',
  'cdnjs.cloudflare.com', // Chart.js, FontAwesome, etc. — CDN externo
  'jsdelivr.net',         // Supabase JS CDN
];

function shouldBypass(url) {
  if (!url.protocol.startsWith('http')) return true;
  // WebSockets NUNCA devem ser interceptados pelo cache
  if (url.protocol === 'wss:' || url.protocol === 'ws:') return true;
  return BYPASS_HOSTNAMES.some(h => url.hostname.includes(h));
}

/* ═══════════════════════════════════════════════════════════════
   INSTALL
═══════════════════════════════════════════════════════════════ */
self.addEventListener('install', (event) => {
  console.log(`[SW ${SW_VERSION}] install`);
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()) // ativa imediatamente sem aguardar reload
  );
});

/* ═══════════════════════════════════════════════════════════════
   ACTIVATE — remove caches de versões antigas
═══════════════════════════════════════════════════════════════ */
self.addEventListener('activate', (event) => {
  console.log(`[SW ${SW_VERSION}] activate`);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_STATIC && k !== CACHE_DYNAMIC)
          .map(k => {
            console.log(`[SW] Removendo cache antigo: ${k}`);
            return caches.delete(k);
          })
      ))
      .then(() => self.clients.claim())
  );
});

/* ═══════════════════════════════════════════════════════════════
   FETCH — cache inteligente com bypass seguro
═══════════════════════════════════════════════════════════════ */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Só processa GET — POST/PUT/DELETE passam direto (operações Supabase)
  if (request.method !== 'GET') return;

  // Bypass total para origens críticas
  if (shouldBypass(url)) return;

  // Assets estáticos → Stale-While-Revalidate
  // (responde do cache imediatamente, atualiza em background)
  if (isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Páginas HTML e outros → Network-First com fallback offline
  event.respondWith(networkFirstWithFallback(request));
});

function isStaticAsset(url) {
  return /\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico|webp)(\?.*)?$/
    .test(url.pathname);
}

async function staleWhileRevalidate(request) {
  const cache  = await caches.open(CACHE_DYNAMIC);
  const cached = await cache.match(request);

  // Atualiza em background sem bloquear a resposta
  const fetchPromise = fetch(request)
    .then(res => {
      if (res?.status === 200) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);

  return cached || (await fetchPromise);
}

async function networkFirstWithFallback(request) {
  try {
    const res = await fetch(request);
    // Cacheia HTML para uso offline
    if (res.status === 200 && request.headers.get('Accept')?.includes('text/html')) {
      const cache = await caches.open(CACHE_DYNAMIC);
      cache.put(request, res.clone());
    }
    return res;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // SPA fallback
    if (request.headers.get('Accept')?.includes('text/html')) {
      return (await caches.match('/')) || (await caches.match('/index.html'));
    }
    return new Response('Offline', { status: 503 });
  }
}

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND SYNC — processa fila de ações feitas offline
═══════════════════════════════════════════════════════════════ */
self.addEventListener('sync', (event) => {
  if (event.tag === 'pm-offline-queue') {
    console.log('[SW] Background sync acionado');
    event.waitUntil(notifyClientToProcessQueue());
  }
});

async function notifyClientToProcessQueue() {
  const clients = await self.clients.matchAll({ type: 'window' });
  if (clients.length > 0) {
    // Delega para a aba aberta (tem acesso ao localStorage e ao supabaseClient)
    clients[0].postMessage({ type: 'PROCESS_OFFLINE_QUEUE' });
  }
  // Se não há aba aberta, a fila será processada no próximo app.init()
}

/* ═══════════════════════════════════════════════════════════════
   MESSAGE — comunicação bidirecional com a página
   ATENÇÃO: não use event.waitUntil() aqui sem necessidade —
   é a causa mais comum do erro "message handler" no console.
═══════════════════════════════════════════════════════════════ */
self.addEventListener('message', (event) => {
  if (!event.data) return;
  const { type, payload } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      // Página pediu para ativar nova versão do SW
      self.skipWaiting();
      break;

    case 'CACHE_URLS':
      // Página pediu para cachear URLs específicas
      if (Array.isArray(payload?.urls)) {
        caches.open(CACHE_DYNAMIC).then(c => c.addAll(payload.urls));
      }
      break;

    case 'PING':
      event.source?.postMessage({ type: 'PONG', version: SW_VERSION });
      break;

    // OneSignal pode enviar mensagens próprias — deixa passar silenciosamente
    default:
      break;
  }
});
