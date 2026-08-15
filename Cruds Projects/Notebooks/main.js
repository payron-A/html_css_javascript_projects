// function to get Id 
const getId = id => document.getElementById(id);

// ===greeting ===
(function () {
    const greeting = getId('greeting')
    const date = new Date();
    if (date.getHours() < 12) {
        greeting.textContent = 'Good Morning'
    } else if (date.getHours() > 18) {
        greeting.textContent = 'Good Evening'
    } else {
        greeting.textContent = 'Good Afternoon'
    }
})();

// === Theme ===
function toggelTheme() {
    const topbar = document.querySelector('.topbar');
    topbar.style.background = theme.bg;
    topbar.style.color = theme.cl;
    document.body.style.background = theme.bg;
    document.body.style.color = theme.cl;
}

let themeBtn = getId('themeBtn');
let themeIcon = getId('theme-icon');
const moonIcon = 'fa-solid fa-moon'
const sunIcon = 'fa-solid fa-sun'
let themeLabel = getId('theme-label');

const theme = JSON.parse(localStorage.getItem('theme')) || {
    bg: 'var(--black)',
    cl: 'var(--white)'
}
themeIcon.classList = theme.bg == 'var(--black)' ? moonIcon : sunIcon
themeLabel.textContent = theme.bg == 'var(--black)' ? 'dark' : 'light'

toggelTheme()
themeBtn.onclick = () => {
    if (theme.bg == 'var(--black)') {
        theme.bg = 'var(--white)';
        theme.cl = 'var(--black)'
        themeIcon.classList = sunIcon;
        themeLabel.textContent = 'light'
    } else {
        theme.bg = 'var(--black)'
        theme.cl = 'var(--white)'
        themeLabel.textContent = 'dark'
        themeIcon.classList = moonIcon;
    }
    localStorage.theme = JSON.stringify(theme);
    toggelTheme();
}
// NOTEBOOK ELEMENT
const addnotebookBtn = document.querySelector(".nb-add-btn");
const notebookmodal = document.querySelector(".notebook-modal");
const overlay = document.querySelector(".overlay");
const actions = document.querySelectorAll(".actions");
const nbList = getId("nb-list");
const nbIpt = getId("nb-ipt");

//=== DATA ===
let notebooks =JSON.parse(localStorage.getItem('notebooks')) || [];
localStorage.notebooks = JSON.stringify(notebooks);
let currentNotebook = null;

//===NOTE ELEMENT ===
let noteMode = 'createNote'
const notemodal = document.querySelector(".note-modal");
let notesGrid = getId('notes-grid');
let tagIpt = getId('tag-ipt');
let titleIpt = getId('title-ipt');
let previewIpt = getId('preview-ipt');
let fab = document.querySelector('.fab');
let editId ;
//=== EVENTS ===
// open notebook modal
addnotebookBtn.onclick = () => {
    overlay.style.display = 'flex';
    notebookmodal.style.display = 'flex';
}
// open note modal
fab.onclick = () => {
    if (!currentNotebook) {
        alert("select the notebooks first!");
        return;
    }

    overlay.style.display = 'flex';
    notemodal.style.display = 'flex';
}

document.querySelectorAll('.cancel').forEach(btn => {
    btn.onclick = cancelAll;
});
document.querySelectorAll('.save').forEach(btn => {
    btn.onclick = save;
});
//=== SAVE FUNCTION ===
function save() {
    //save notebook
    if (notebookmodal.style.display === 'flex') {
        
        if(nbIpt.value.trim() == ''){return} // check if the notebook input is empty 
        let notebook = {
            name: nbIpt.value.trim(),
            notes: []
        }
        currentNotebook = notebook;
        notebooks.push(notebook);
        showNB();
    }
    //save note 
    if (notemodal.style.display === 'flex') {
        if (!currentNotebook || previewIpt.value.trim() == '')return; 
        let note = {
            tag: tagIpt.value,
            title: titleIpt.value,
            preview: previewIpt.value,
            date: new Date().toLocaleDateString()
        };
        if(noteMode == 'createNote'){
            currentNotebook.notes.push(note);
        }else{
            currentNotebook.notes[editId] = note;
            noteMode = 'createNote'
        }
        showNotes();
    }
    localStorage.notebooks = JSON.stringify(notebooks)
    cancelAll();
}
//== SHOW NOTEBOOKS ===
function showNB() {
    nbList.innerHTML = notebooks.map((notebook, index) =>
        `
        <div class="nb-link" onclick="selectNotebook(${index})">
            <span class="dot"></span>
            <span class="nb-name">${notebook.name}</span>
            <i class="fa-solid fa-xmark nb-del" onclick= "deleteNB(${index})"></i>
        </div> 
        `
    ).join("");
}
showNB() 
//=== SELECT NOTEBOOK ===
function selectNotebook(index) {
    currentNotebook = notebooks[index];
    showNotes();
}
//=== DELETE NOTEBOOK ===
function deleteNB(i){
    if(!confirm('Are you sure about remove the notebook ?'))return;
    notebooks.splice(i,1)
    localStorage.notebooks = JSON.stringify(notebooks);
    showNB();
     notesGrid.innerHTML = '';
}
//=== SHOW NOTES ===
function showNotes() {
    if (!currentNotebook) return;

    notesGrid.innerHTML = currentNotebook.notes.map((note,i) => `
        <div class="note-card">
            <span class="note-tag">${note.tag}</span>
            <div class="note-title">${note.title}</div>
            <div class="note-preview">${note.preview}</div>
            <div class="note-footer">
                <span class="note-date">${note.date}</span>
                    <div class="note-actions">
                        <i class="fa-solid fa-pen" title="Edit"onclick="editNote(${i})"></i>
                        <i class="fa-solid fa-trash" title="Delete"onclick="deleteNote(${i})"></i>
                    </div>
            </div>
        </div>
    `).join("");
}
//=== CANCEL ===
function cancelAll() {
    overlay.style.display = 'none';
    notebookmodal.style.display = 'none';
    notemodal.style.display = 'none';

    nbIpt.value = '';
    tagIpt.value = '';
    titleIpt.value = '';
    previewIpt.value = '';
}
//=== EDIT NOTES ===
function editNote(i){
    noteMode ='editNote';
    overlay.style.display = 'flex';
    notemodal.style.display = 'flex';
    tagIpt.value = currentNotebook.notes[i].tag;
    titleIpt.value = currentNotebook.notes[i].title;
    previewIpt.value = currentNotebook.notes[i].preview;
    editId = i;
}
//=== DELETE NOTES ===
function deleteNote(i){
    currentNotebook.notes.splice(i,1)
    localStorage.notebooks = JSON.stringify(notebooks)
    showNotes();
}