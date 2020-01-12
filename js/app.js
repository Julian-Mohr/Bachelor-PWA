// Service Worker registrieren
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}
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
firebase.analytics();