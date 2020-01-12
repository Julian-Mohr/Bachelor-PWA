const auth = firebase.auth();
const addButton = document.querySelector('#addButton');

// Quelle: https://github.com/iamshaunjp/firebase-auth
//Reaktion auf Log-In Status 
auth.onAuthStateChanged(user => { // Immer wenn eine Authentifizierungsveränderung vorliegt, wird diese Funktion ausgelöst
    //Wenn der Nutzer eingeloggt ist
    if(user){

    notes.innerHTML=`<h6 class ="center">Notizen</h6>`;
    //real-time-listener (reagiert auf jeder Veränderung innerhalb der Collection in Firebase)

    //Quelle: https://github.com/iamshaunjp/pwa-tutorial
    db.collection(user.uid).onSnapshot((snapshot) => { // Wenn es eine Veränderung gibt wird ein Schnappschuss gemacht
        snapshot.docChanges().forEach(change => { // Man betrachtet nur die Veränderungen
            if(change.type === 'added'){ // Das Objekt besitzt in unseren Fall den Typ added oder removed
                // Daten sollen zu Webseite hinzugefügt werden
                renderNotes(change.doc.data(),change.doc.id) // Funktion in ui.js erstellt
            }if(change.type === 'removed'){
                // Daten sollen von der Seite entfernt werden
                // Extra Funktion notwendig, sonst wird das Element erst bei Aktualisierung der Seite entfernt
                removeNote(change.doc.id); // in ui.js definiert
            }
            addButton.innerHTML=
                `<a class="btn-floating btn-small btn-large add-btn sidenav-trigger waves-effect waves-light" data-target="side-form">
                <i class="material-icons">add</i>
                </a>`
        });
    });
        setupUI(user); // In ui.js erstellt
        token(); //firebase-messaging erstellt
    
    }
    //Nutzer ist nicht eingeloggt
    else{
    
        notes.innerHTML=`</br> <h5 class= "center-align">Sie müssen sich erst einloggen, um die Inhalte zu sehen!</h5></br>`;
        addButton.innerHTML=``;
        setupUI();
        deleteToken();
}
});

// Quelle: https://github.com/iamshaunjp/firebase-auth
//Sign-Up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (event) => {
    //Aktualisierung der Seite vermeiden
    event.preventDefault();
    //User-Info erhalten
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    //User erstellen
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        //nach der Erstellung Pop-Up schließen und Form leeren
        return db.collection(cred.user.uid).doc('notes').set({
            title: "Notiz-Titel",
            description: "Beschreibung"
        })}).then(()=> {
            const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.querySelector('.error').innerHTML = '';
        signupForm.reset();
        }).catch(err =>{
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});
    

// Quelle: https://github.com/iamshaunjp/firebase-auth
//Log-out
const logout = document.querySelector('#logout');
logout.addEventListener('click', event => {
    event.preventDefault();
    auth.signOut();
})
// Quelle: https://github.com/iamshaunjp/firebase-auth
//Log-in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    //User-Informationen erhalten
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred=> {
        console.log('user logged in');
        //Schließen und Form zurücksetzen
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.querySelector('.error').innerHTML = '';
        loginForm.reset();
        
    }).catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;})
});