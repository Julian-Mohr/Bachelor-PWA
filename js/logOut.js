//extra Logout für den Ordner Pages (Ausnahme: fallback.html)
const auth = firebase.auth();


//Authentication Status Änderung
auth.onAuthStateChanged(user => { 
    if(user){
        setupUI(user); // In ui.js erstellt
        token();
    }
    //Nutzer ist nicht eingeloggt
    else{
        setupUI();
        deleteToken();

}
})

// Quelle: https://github.com/iamshaunjp/firebase-auth
//Log-out
const logout = document.querySelector('#logout');
logout.addEventListener('click', event => {
    event.preventDefault();
    auth.signOut();
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