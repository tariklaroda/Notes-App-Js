import NotesApi from "./NotesApi";

export default class FavouritesAPI {
  //favourites

  static getAllFavourites() {
    const favourites = JSON.parse(localStorage.getItem("notesapp-favourites"));

    return favourites.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveFavoriteNote(noteToSave) {
    //get all favourites
    const favourites = FavouritesAPI.getAllFavourites();

    //push note in favourites
    favourites.push(noteToSave);

    //Save to LS
    localStorage.setItem("notesapp-favourites", JSON.stringify(favourites));

    //delet Note from regular NOtes
    NotesApi.deleteNote(noteToSave.id);
  }

  static deleteFavouriteNote(note) {}
}
