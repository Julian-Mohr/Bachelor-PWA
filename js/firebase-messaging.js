//Firebase Message Service
const messaging = firebase.messaging();

// Quelle: https://github.com/firebase/quickstart-js/blob/0ade4699aab0eb1d7eb20b159233269c9b0af454/messaging/index.html#L198-L210
//Public Vapid Key
messaging.usePublicVapidKey('BISuzOxuIhLiSXVkCMREpyjKPV9FgY5Vb1aj1xEGVJVf4GN5PP5xPOkG6rk6W3Wtb7hlolQQn7xh_u7BpgSkg6U');

// Quelle: https://github.com/firebase/quickstart-js/blob/0ade4699aab0eb1d7eb20b159233269c9b0af454/messaging/index.html#L198-L210
//Wenn der Token geändert wurde
messaging.onTokenRefresh(() => { 
  messaging.getToken().then((refreshedToken) => {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    setTokenSentToServer(false);
    // Send Instance ID token to app server.
    sendTokenToServer(refreshedToken);
    token();
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
  });
});

// Quelle: https://github.com/firebase/quickstart-js/blob/0ade4699aab0eb1d7eb20b159233269c9b0af454/messaging/index.html#L198-L210
  // Send the Instance ID token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
      console.log('Sending token to server...');
      // Send the current token to your server.
      setTokenSentToServer(true);
    } else {
      console.log('Token already sent to server so won\'t send it again ' +
          'unless it changes');
    }

  }

  // Quelle: https://github.com/firebase/quickstart-js/blob/0ade4699aab0eb1d7eb20b159233269c9b0af454/messaging/index.html#L198-L210
  function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
  }

  // Quelle: https://github.com/firebase/quickstart-js/blob/0ade4699aab0eb1d7eb20b159233269c9b0af454/messaging/index.html#L198-L210
  function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  }

  // Quelle: https://github.com/firebase/quickstart-js/blob/0ade4699aab0eb1d7eb20b159233269c9b0af454/messaging/index.html#L198-L210
  //Push-Benachrichtigung auf der Konsole anzeigen, wenn Tab aktiv
  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
  });

  // Quelle: https://github.com/firebase/quickstart-js/blob/0ade4699aab0eb1d7eb20b159233269c9b0af454/messaging/index.html#L198-L210
  function token() {
    // [START get_token]
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
        subscribeTokenToTopic(currentToken,'news');
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
        setTokenSentToServer(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      setTokenSentToServer(false);
    });
    // [END get_token]
  }

  // Topic Messaging Firebase
  // Quelle: https://stackoverflow.com/questions/40389335/how-to-subscribe-to-topics-with-web-browser-using-firebase-cloud-messaging
  function subscribeTokenToTopic(token, topic) {
    fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'key='+ 'AAAAbiCZ-lc:APA91bFC15dEUJNb3AFdgfEl2LE8WwAm6OyW6bdRyksyeGeftgHnKVjgSGhifyKNeu6TyR6xAlQBTEtlZeW1fVAdot_iMvwtpLQMpgt1HHdhy5M7QViAUlK_QV14JMYPl_JVlzwHL06C'
      })
    }).then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
      }
      console.log('Subscribed to "'+topic+'"');
    }).catch(error => {
      console.error(error);
    })
  }

// Quelle: https://github.com/firebase/quickstart-js/blob/0ade4699aab0eb1d7eb20b159233269c9b0af454/messaging/index.html
function deleteToken() {
    // Delete Instance ID token.
    // [START delete_token]
    firebase.messaging().getToken().then((currentToken) => {
      messaging.deleteToken(currentToken).then(() => {
        if(isTokenSentToServer()){
        unsubscribeTokenFromTopic(currentToken,'news'); // Von Topic "news" abmelden
        setTokenSentToServer(false);
        console.log('Token deleted.');
      }
      }).catch((err) => {
        console.log('Unable to delete token. ', err);
      });

    }).catch((err) => {
      console.log('Error retrieving Instance ID token. ', err);
    });;
  }

  //Topic Messaging Firebase
  function unsubscribeTokenFromTopic(token, topic) {
    fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': 'key='+ 'AAAAbiCZ-lc:APA91bFC15dEUJNb3AFdgfEl2LE8WwAm6OyW6bdRyksyeGeftgHnKVjgSGhifyKNeu6TyR6xAlQBTEtlZeW1fVAdot_iMvwtpLQMpgt1HHdhy5M7QViAUlK_QV14JMYPl_JVlzwHL06C'
      })
    }).then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw 'Error Unsubscribing to topic: '+response.status + ' - ' + response.text();
      }
      console.log('Unsubscribed to "'+ topic +'"');
      auth.signOut();
    }).catch(error => {
      console.error(error);
    })
  }

  
