//The Main JS file
import NotesApi from "./NotesApi.js";
import NotesView from "./NotesView.js";

const app = document.getElementById("app");
const view = new NotesView(app, {
  //in this function we simply console.log that the button was clicked
  onNoteAdd() {
    console.log("Let's add a new note!");
  },
  //in this function we simply console.log the newTitle and body
  onNoteEdit(newTitle, newBody) {
    console.log("The new title is:", newTitle);
    console.log("The new body is:", newBody);
  },
});
console.log(NotesApi.getAllNotes());
