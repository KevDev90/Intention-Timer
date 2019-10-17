class Activity {
  constructor(category, minutes, seconds, intention, message) {
    this.category = chosenActivity;
    this.minutes = minutes;
    this.seconds = seconds;
    this.intention = intention;
    this.color = this.determineColor();
    this.message = message;
    this.id = Date.now();
    this.favorite = false;
  }

  toggleFavorite() {
  this.favorite = !this.favorite;
  }

  determineColor() {
    if(this.category === "Study") {
      return 'B3FD78';
    } else if(this.category === "Meditate") {
      return 'C278FD'
    } else {
      return 'FD8078'
    }
  }
};
