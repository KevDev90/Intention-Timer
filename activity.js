class Activity {
  constructor(category, minutes, seconds, intention, color, message) {
    this.category = chosenActivity;
    this.minutes = minutes;
    this.seconds = seconds;
    this.intention = intention;
    this.color = color;
    this.message = message;
    this.id = Date.now();
    this.favorite = false;
  }

  toggleFavorite() {
  this.favorite = !this.favorite;
  }
};
