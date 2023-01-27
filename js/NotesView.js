// We're using this javascript file to render the HTML for our notes app

export default class NotesView {
  //create a constructor that will take the root (the 'app' div) and an object
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;

    //render initial HTML for the root
    this.root.innerHTML = `
        <div class="notes__sidebar"> 
            <button class="notes__add">Add Note</button>
            <div class="notes__list"></div>
        </div>
        <div class="notes__preview">
            <input type="text" class="notes__title" placeholder="New Note"/>
            <textarea class="notes__body">Take Note...</textarea>
        </div>
    `;

    //add event listener
    //select the addNote button, inputTitle and input body
    const btnAddNote = this.root.querySelector(".notes__add");
    const inpTitle = this.root.querySelector(".notes__title");
    const inpBody = this.root.querySelector(".notes__body");

    //add event listener when button is clicked
    btnAddNote.addEventListener("click", () => {
      // call the add function
      this.onNoteAdd();
    });

    //for both the Title and Body inputs, call event function after you exit the text field
    [inpTitle, inpBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        //get updated Title and body, from the elements
        const updatedTitle = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();
        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    // TODO: Hide the note preview by default
    this.updateNotePreviewVisibility(false);
  }

  _createListItemHTML(id, title, body, updated) {
    //create the sidebar Note
    // if the body is more than 90 characters, crop it
    const MAX_BODY_LENGTH = 60;

    return `
    <div class="notes__list-item" data-note-id="${id}">
    <div class="notes__small-title">${title}</div>
    <div class="notes__small-body">${body.substring(0, MAX_BODY_LENGTH)}${
      body.length > MAX_BODY_LENGTH ? "..." : ""
    }</div>
    <div class="notes__small-updated">${updated.toLocaleString(undefined, {
      dateStyle: "full",
      timeStyle: "short",
    })}</div>
    `;
  }

  //This Function updates the Note lists in the sidebar
  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".notes__list");

    // Empty The Notes List (The HTML version)
    notesListContainer.innerHTML = "";

    //create an HTML version for each note
    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      //insert the HTML version one after the other
      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    // Add select/delete events for each list item

    // for EVERY note in container add an event listener
    notesListContainer
      .querySelectorAll(".notes__list-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });
        noteListItem.addEventListener("dblclick", () => {
          const doDelete = confirm(
            "Are you sure you want to delete this note?"
          );

          if (doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
  }

  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    //if note was previously selected, remove the "bolded class"
    this.root.querySelectorAll(".notes__list-item").forEach((noteListItem) => {
      noteListItem.classList.remove("notes__list-item--selected");
    });

    // specifically choose the note with right id, to be selected
    // add the 'bolded class' to signify that it is the selected note
    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
