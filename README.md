# Bachelor-PWA
Bachelorarbeit: Progressive Web Apps von Julian Mohr

# Beschreibung:
Dieses Projekt dient der Visualisierung einer Progressive-Web-App (PWA) im Rahmen einer Bachelorarbeit. Die erstellte PWA verfügt über grundlegende Funktionen, wie: Hinzufügen zum Home-Screen, Offline-Nutzung und Push-Benachrichtigung.

Für die Background-Synchonisation, Versenden der Push-Benachrichtigungen und Authentifizierung wurde Google Firebase verwendet.

# Vorgehensweise:

Zu aller erst bin ich dem Tutorial "PWA Tutorial for Beginners" von "The Net Ninja" auf YouTube gefolgt. Dieses Tutotial umfasste das implementieren des Service Workers, Offline-Nutzung und Hinzufügen zum Home-Screen. Außerdem wurde darin Firestore von Firebase vorgestellt und ermöglichte somit eine Background-Synchronisation von Daten.

(Link zur Playlist: https://www.youtube.com/playlist?list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzDusSL7 (aufgerufen am 10.12.2019)
 Link zum Quellcode: https://github.com/iamshaunjp/pwa-tutorial/tree/lesson-29 ((aufgerufen am 08.12.2019)))
 
 Anschließend habe ich eine Authentifzierungsmöglichkeit implementiert, dass nur noch registrierte Nutzer Daten lesen und schreiben erlaubt. Hierfür habe ich ebenfalls Firebase und das Tutorial "Firebase Auth Tutorial" von "The Net Ninja" verwendet. 
 
 (Link zur Playlist: https://www.youtube.com/playlist?list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ (aufgerufen am 17.12.2019)
  Link zum Quellcode: https://github.com/iamshaunjp/firebase-auth/tree/lesson-23 (aufgerufen am 17.12.2019))
  
  
 Als nächstes habe ich mich der Push-Benachrichtigung gewidmet
 Hier bin ich zuerst der Anleitung von Google-Developers gefolgt und habe eine Push-Benachrichtigung via Knopfdruck implementiert.
 
 (Link: https://developers.google.com/web/ilt/pwa/lab-integrating-web-push#5_optional_best_practices)
 
 Jedoch um eine automatisierte Benachrichtigung zu versenden, bin ich mit deren Erklärungen nicht weiter gekommen. Hierfür bin ich den Docs von Firebase gefolgt. Um ein besseres Verständnis zu erlangen, hilft es vorerst nur den Quellcode von Firebase isoliert zu betrachten und eventuell mit diesem zu Experimentieren.
 
 (Link zum Dokument: https://firebase.google.com/docs/cloud-messaging/js/first-message (aufgerufen am 22.12.2019)
 Link zum Quellcode:https://github.com/firebase/quickstart-js/blob/d6b930f23bd5297251828022c2cb5202067ac35e/messaging/index.html#L84-L85 (aufgerufen am 22.12.2019))
 
 Für das Abmelden von Push-Benachrichtigung habe ich keine ideale Lösung gefunden. Deshalb habe ich das an- und abmelden von der App für das An- und Abmelden von Topics bei Firebase. Topics ist eine Möglichkeit einer ausgewählten Gruppe der App Nachrichten zu versenden. Um das implementieren zu können hat mir ein Forumsbeitrag in Stackoverflow geholfen. Firebase hat eine Erklärung für die Implementierung, aber diese hat mir leider nicht weiterhelfen können.
 
 (Link Forumsbeitrag: https://stackoverflow.com/questions/40389335/how-to-subscribe-to-topics-with-web-browser-using-firebase-cloud-messaging (aufgerufen am 05.01.2020)
  Link Firebase-Dokument: https://firebase.google.com/docs/cloud-messaging/js/topic-messaging (aufgerufen am 12.01.2020)
 
 

