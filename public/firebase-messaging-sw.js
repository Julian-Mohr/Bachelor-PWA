importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js'); 
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');
// Firebase Messaging

var firebaseConfig = {
  apiKey: "AIzaSyBadUde1pKRZg3FFZuilK3x1BIrKu47HJA",
  authDomain: "test-78e0a.firebaseapp.com",
  databaseURL: "https://test-78e0a.firebaseio.com",
  projectId: "test-78e0a",
  storageBucket: "test-78e0a.appspot.com",
  messagingSenderId: "472993364567",
  appId: "1:472993364567:web:b716085d1e7176d3f38112",
  measurementId: "G-PE3ENHCB6K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Quelle: https://github.com/iamshaunjp/pwa-tutorial
const staticCacheName = 'site-static-v17'; // Name des statischen Caches
const dynamicCacheName = 'site-dynamic-v17'; // Name des dynamischen Caches
const assets = [ // wichtigsten Seiten in einer Variablen abgespeichert
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/auth.js',
  '/js/firebase-messaging.js',
  '/js/notify.js',
  '/js/db.js',
  '/js/materialize.min.js',
  '/js/logOut.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/pages/fallback.html',
  '/img/icons/icon-192x192.png',
  '/img/checkmark.png',
  '/img/xmark.png'
];

// Quelle: https://github.com/iamshaunjp/pwa-tutorial
// Cache größe limitieren 
const limitCacheSize = (name, size) => { // Name und Größe wird der Funktion übergeben
  caches.open(name).then(cache => { // Das jeweilige Cache öffnen
    cache.keys().then(keys => { // keys entsprechen den einträgen
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size)); // Rekursion
      }
    });
  });
};

// Quelle: https://github.com/iamshaunjp/pwa-tutorial
// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil( // Installationsprozess erhalten, bis die restlichen Anweisung durchgeführt wurden
    caches.open(staticCacheName).then((cache) => {
      console.log('caching app-shell assets');
      cache.addAll(assets); // alle Inhalte in dem Cache hinzufügen
    })
  );
});

// Quelle: https://github.com/iamshaunjp/pwa-tutorial
// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys // ein Array von Promises, welches alle promises durchläuft.
        // dynamic- und static-Cache könnten sich überlappen, deshalb werden Redundante-Daten entfernt.
        .filter(key => key !== staticCacheName && key !== dynamicCacheName) //Falls keine Übereinstimmung --> true wird ausgegeben und es wird im Array behalten
        .map(key => caches.delete(key)) // jetzt nehmen wir das (Zwischen)Array und gehen Caches durch mit dessen Werte und löschen alle.
      );
    })
  );
});

// Quelle: https://github.com/iamshaunjp/pwa-tutorial
// fetch event
self.addEventListener('fetch', evt => {
  if(evt.request.url.indexOf('firestore.googleapis.com') === -1 ){ // Sicherstellen, dass nichts von Firestore zwischengespeichert wird
 evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      //Wenn das fetch im Cache vorhanden ist, gebe es aus
      return cacheRes || fetch(evt.request).then(fetchRes => { // falls nicht, nimm fetchRes
        return caches.open(dynamicCacheName).then(cache => { // lege eine neuen Key in Cache an
          cache.put(evt.request.url, fetchRes.clone()); // Die Abfrage wird dupliziert und im dynamicCache gespeichert
          // dynamicCache schlank halten
          limitCacheSize(dynamicCacheName, 15);
          return fetchRes; // Das duplizieren war notwendig, um das fetch noch ausgeben zu können.
        })
      });
    }).catch(() => { // Wenn das fetch nicht abrufbar ist
      if(evt.request.url.indexOf('.html') > -1){ // Index gibt einen Integer zurück von der Position des Elements und wenn das Element nicht vorhanden ist, gibt es -1 aus.
        return caches.match('/pages/fallback.html'); // Fallback-Page anzeigen
      } 
    })
  );
  }
});


//Push-Benachrichtigung handling

// Quelle: https://developers.google.com/web/ilt/pwa/lab-integrating-web-push#5_optional_best_practice
//Schließen der Benachrichtigung
self.addEventListener('notificationclose', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey); // In der Konsole auskunft über geschlossene Benachrichtigung anzeigen
});

  // Quelle: https://developers.google.com/web/ilt/pwa/lab-integrating-web-push#5_optional_best_practice
  // klicken der Benachrichtigung
  self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
    const action = event.action; 

    if (action === 'close') { // Nicht jeder Browser unterstützt action-Buttons, deshalb wird es als erstes abgefragt.
      notification.close();
    } else {
      clients.openWindow('https://test-78e0a.firebaseapp.com'); // Weiterleitung auf individuelle Webseite
      notification.close(); 
    }

  });

  // Quelle: https://github.com/firebase/quickstart-js/blob/0ade4699aab0eb1d7eb20b159233269c9b0af454/messaging/index.html#L198-L210
  messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/img/icons-192x192.png'
    };

    return self.registration.showNotification(notificationTitle,
    notificationOptions);});
