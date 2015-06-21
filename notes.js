(function () {
  
  
  
}());




























// Create a var to store the list of options
var list = document.querySelector("#list");

// function that adds items to list
function addToList(name) {
  // option is child of select
  var option = document.createElement("option");
  // set option's text to name
  option.textContent = name;
  // then append to list
  list.appendChild(option);
}

// Initialize the list from localStorage
var notes = JSON.parse(localStorage.getItem("notes")) || {"shopping list": ""};
// for all names in the local storage notes
for (var name in notes)
  // and if those notes have the property name
  if (notes.hasOwnProperty(name))
    // add them to the list
    addToList(name);

function saveToStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// sets the attribute of the saved-notification button
// and then resets it to unsaved after animation + 800ms
function saveNotification() {
  var savenoted = document.querySelector(".saved-notification");
  savenoted.setAttribute("class", "saved-notification" );
  setTimeout(function() {
      savenoted.setAttribute("class", "saved-notification unsaved" );
  }, 1500)
}

var current = document.querySelector("#currentnote");
current.value = notes[list.value];

// update value of list of notes
list.addEventListener("change", function() {
  current.value = notes[list.value];
});

// update value of notes
current.addEventListener("change", function() {
  notes[list.value] = current.value;
  saveToStorage();
  saveNotification();
});

// update value of notes when Enter is pressed
current.addEventListener("keydown", function(event) {
  if (event.keyCode == 13) {
    notes[list.value] = current.value;
    saveToStorage();
    saveNotification();
  }
});

// remove all notes and reload page
function clearNotes() {
  localStorage.removeItem("notes");
  location.reload();
}

// add a Note, reset form and focus
function addNote() {
  var currentname = document.querySelector("#currentname");
  var name = currentname.value;
  if (!name) {
    currentname.focus();
    currentname.setAttribute('placeholder', 'Name needed!');
    return;
  }
  if (!notes.hasOwnProperty(name)) {
    notes[name] = "";
    addToList(name);
    saveToStorage();
  }
  list.value = name;
  current.value = notes[name];
  currentname.value = "";
}