class Activity {
  constructor(category, minutes, seconds, intention, message, favorite, redo) {
    this.category = category;
    this.minutes = minutes;
    this.seconds = seconds;
    this.intention = intention;
    this.message = message;
    this.id = Date.now();
    this.favorite = false;
    this.redo = false;
  }

  toggleFavorite() {
  this.favorite = !this.favorite;
  }

  toggleRedo() {
  this.redo = !this.redo;
  }


}
