//The Man\in JS file
import NotesApi from "./NotesApi.js";

NotesApi.saveNote({
  title: "Node Updated!",
  body: "Hi! I'm the updated again note",
  id: 905490,
});

console.log(NotesApi.getAllNotes());
