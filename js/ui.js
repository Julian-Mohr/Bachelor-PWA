const notes = document.querySelector('.notes'); //Klasse (Ort) für das einfügen des HTML-Templates der Notizen in Index.html
const loggedOutLinks = document.querySelectorAll('.logged-out'); //Alle Logged-Out Links aus der Nav-Bar
const loggedInLinks = document.querySelector('.logged-in'); //Alle Logged-In Links aus der Nav-Bar
const sideMenu = document.querySelector('.uiClass'); // Menü Link
const conditional = document.querySelector('.conditional');
const loggedOutContent = document.querySelector('.loggedOutContent');

//Conditional Nav-Menü
//Quelle: https://github.com/iamshaunjp/pwa-tutorial
const setupUI = (user) => {
  if(user){
    //Umschalten
    loggedOutContent.style.display = 'none';
    loggedInLinks.style.display = 'block';
    loggedOutLinks.forEach(item => item.style.display = 'none');
    sideMenu.style.display = 'block';
    conditional.style.display = 'block';
    
  }else{
    loggedOutContent.style.display = 'block';
    loggedInLinks.style.display = 'none';
    loggedOutLinks.forEach(item => item.style.display = 'block');
    sideMenu.style.display = 'none';
    conditional.style.display = 'none';
    
    
  }
}

//Quelle: https://github.com/iamshaunjp/pwa-tutorial
document.addEventListener('DOMContentLoaded', function() { 
  // Nav Menü
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // Notiz Form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
   //Sign-In/Up Pop-Ups
   var modals = document.querySelectorAll('.modal');
   M.Modal.init(modals);
});

//Quelle: https://github.com/iamshaunjp/pwa-tutorial
//Notizen in HTML ausgeben
const renderNotes = (data, id) => {
    //HTML Vorlage für Daten Input
    const html = `
    <div class="card-panel note white row" data-id= "${id}">
    <i class="material-icons"> note</i>
          <div class="note-details">
            <div class="note-title">${data.title}</div>
            <div class="note-descriptions">${data.description}</div>
          </div>
          <div class="note-delete">
            <i class="material-icons" data-id= "${id}">delete_outline</i>
    </div>`
  ;
  notes.innerHTML += html; // Vorlage wird innerhalb der Klasse (siehe Zeile 1) hinzugefügt
}

//Quelle: https://github.com/iamshaunjp/pwa-tutorial
//remove, welches in db.js verwendet wird
const removeNote = (id) =>{
  const note = document.querySelector(`.note[data-id=${id}]`); // Suche im DOM nach der Klasse note und der entsprechenden ID
  note.remove(); 
}