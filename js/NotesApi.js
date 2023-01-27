// Responsible for interacting with the local storage
// To store and retrieve our notes

export default class NotesApi {
  //methods we will be using

  static getAllNotes() {
    // gets the notes from local storage, if there are no notes return
    // empty array
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

    //return the notes sorted (in order of recency) by updated timestamp
    return notes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    //will update and insert a new note
    const notes = NotesApi.getAllNotes();

    // takes noteToSave id and compares it with the other notes,
    // if it finds a note with the same id, put into the 'existing object'
    const existing = notes.find((note) => note.id == noteToSave.id);

    // Edit/Update
    if (existing) {
      //if the note id already exist then simply update
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    } else {
      //give new note an id and a time stamp
      noteToSave.id = Math.floor(Math.random() * 1000000);
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }

  static deleteNote(id) {
    //get all of the notes, then filter to get all the notes that DON'T have the selected id.
    const notes = NotesApi.getAllNotes();
    const newNotes = notes.filter((note) => note.id != id);

    //store all the notes (that don't have the deleted note id)
    localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
  }
}
