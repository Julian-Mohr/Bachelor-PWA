const notifyButton = document.querySelector('.js-notify-btn'); // Angabe des Benachrichtigungsbutton 
// Quelle: https://developers.google.com/web/ilt/pwa/lab-integrating-web-push#5_optional_best_practice
//Push-Berechtigung erfragen
function ask(){Notification.requestPermission(status => {
    console.log('Notification permission status:', status);
  });}
  
  // Quelle: https://developers.google.com/web/ilt/pwa/lab-integrating-web-push#5_optional_best_practice
  //Push-Benachrichtigung ausgeben
  function displayNotification(){
    if (Notification.permission == 'granted') { // 'granted' = zugelassen
      navigator.serviceWorker.getRegistration().then(reg => {
    
        // Benachrichtigung konfigurieren
        const options = {
          body: 'Das ist eine Push-Benachrichtigung',
          icon: '/img/icons/icon-192x192.png', // Speicherort des Icon
          vibrate: [100, 50, 100], // Vibrationsabstäne: vibrieren,pause vibrieren ( in Milisekunden)
          data: { // Zusatzinformationen
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
        
          // Hinzufügen Buttons/Features 
          actions: [
            {action: 'explore', title: 'Zur Homepage',
              icon: '/img/checkmark.png'},
            {action: 'close', title: 'Push-Benachrichtigung schließen',
              icon: '/img/xmark.png'}, 
          ],
          tag: 'id1'
          
        };
        reg.showNotification('Button Push-Notification!', options);
      });
    }}
  
    // Quelle: https://developers.google.com/web/ilt/pwa/lab-integrating-web-push#5_optional_best_practice
    // Rufe die Funktion für Benachrichtigung anzeigen an, wenn der Button gedrückt wurde
    notifyButton.addEventListener('click', () => { // notifyButton in Zeile 1 definiert
      ask();
      displayNotification();
    });