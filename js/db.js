//Quelle: https://github.com/iamshaunjp/pwa-tutorial

const db = firebase.firestore();
// Offline Daten austausch ermöglichen
db.enablePersistence()
.catch(err =>{ //Fehlerursache eingrenzen
    if(err.code == 'failed precondition'){
        // Wahrscheinlich sind mehrere Tabs offen zur selben Zeit
        console.log("persistence failed");
    }else if(err.code == 'unimplemented'){
        //fehlende Browser unterstützung
            console.log('persistence is not avialable')
    }
});


//Quelle: https://github.com/iamshaunjp/pwa-tutorial
// neue Notiz hinzufügen
const form = document.querySelector('.add-note');
form.addEventListener('submit', evt =>{
    evt.preventDefault(); // Standard Aktion ist Webseite aktualisieren und das möchten wir vermeiden
  
   
    // Datenbankspeicherung
    const note = { // innerhalb des Form-Elements haben die Inputs jeweils eine ID, auf die zurückgegriffen werden kann
        title: form.title.value, 
        description: form.descriptions.value
    };
    auth.onAuthStateChanged(user => { // Immer wenn eine Authentifizierungsveränderung vorliegt, wird diese Funktion ausgelöst
        //Wenn der Nutzer eingeloggt ist
    db.collection(user.uid).add(note).catch(err => console.log(err));    
// Form danach zurücksetzen
    form.title.value = '';
    form.descriptions.value = '';
});});

//Quelle: https://github.com/iamshaunjp/pwa-tutorial
// Das div der Notiz wird betrachtet und ein Eventlistener erstellt. Falls es sich um ein Icon handelt, lösche das Element.
const noteContainer = document.querySelector('.notes');
noteContainer.addEventListener('click', evt =>{
    // Es handelt sich hier um ein Mouseevent und das Objekt besitzt das Property target, welches wiederum ein TagName besitzt.
    if(evt.target.tagName === 'I'){ // I = Icon
        auth.onAuthStateChanged(user => { // Immer wenn eine Authentifizierungsveränderung vorliegt, wird diese Funktion ausgelöst
            //Wenn der Nutzer eingeloggt ist
        const id = evt.target.getAttribute('data-id'); // getAttribute ist eine Methode um die ID aus dem DOM zu bekommen.
        db.collection(user.uid).doc(id).delete(); // Es wird genau das Element mit der zugehörigen ID in Firebase-Datenbank gesucht und gelöscht
    })}
})