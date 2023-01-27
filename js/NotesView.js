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

    console.log(
      this._createListItemHTML(
        440772,
        "Tarik LaRoda",
        "Bachelor Of Science Student",
        new Date()
      )
    );

    // TODO: Hide the note preview by default
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `
    <div class="notes__list-item data-note-id="${id}">
    <div class="notes__small-title">${title}</div>
    <div class="notes__small-body">${body.substring(0, MAX_BODY_LENGTH)}${
      body.length > MAX_BODY_LENGTH ? "..." : ""
    }/div>
    <div class="notes__small-updated">${updated.toLocaleString(undefined, {
      dateStyle: "full",
      timeStyle: "short",
    })}</div>
    `;
  }
}
