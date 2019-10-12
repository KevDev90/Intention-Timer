var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var invalidChar = [  "-",  "+",  "e", "."];
var minuteInput = document.querySelector('.minute-input');
var secondInput = document.querySelector('.second-input');
var taskInput = document.querySelector('.task-input');
var startButton = document.querySelector('.start-button');
var timerContainer = document.querySelector('.activity-section');
var inputs = document.querySelectorAll('.input');
var timerButton = document.querySelector('.start-timer-button');
var newTimer = document.querySelector('.timer-container');
var domMin = document.querySelector('.minute-digits');
var domSec = document.querySelector('.second-digits');


var endTime = new Date().setTime();
var currentTime = new Date().getTime();
var remainingTime = endTime - currentTime;
var mins = Math.floor((remainingTime/1000)/60);
var secs = Math.floor(remainingTime/1000);


minuteInput.addEventListener("keydown", function(e) {
  if (invalidChar.includes(e.key)) {
    e.preventDefault();
  }
});

secondInput.addEventListener("keydown", function(e) {
  if (invalidChar.includes(e.key)) {
    e.preventDefault();
  }
});

studyButton.addEventListener('click', function(){
  studyButton.classList.toggle('studyClass');
  timerButton.classList.toggle('study-color');
  timerButton.classList.remove('meditate-color');
  timerButton.classList.remove('exercise-color');
  exerciseButton.classList.remove('exerciseClass');
  meditateButton.classList.remove('meditateClass');
});

meditateButton.addEventListener('click', function(){
  meditateButton.classList.toggle('meditateClass');
  timerButton.classList.toggle('meditate-color');
  timerButton.classList.remove('study-color');
  timerButton.classList.remove('exercise-color');
  studyButton.classList.remove('studyClass');
  exerciseButton.classList.remove('exerciseClass');
});

exerciseButton.addEventListener('click', function(){
  exerciseButton.classList.toggle('exerciseClass');
  timerButton.classList.toggle('exercise-color');
  timerButton.classList.remove('study-color');
  timerButton.classList.remove('meditate-color');
  studyButton.classList.remove('studyClass');
  meditateButton.classList.remove('meditateClass');
});

startButton.addEventListener('click', updateErrors);

timerButton.addEventListener('click', beginTimer);


minuteInput.addEventListener('keyup', function(){
if (minuteInput.value !== '') {
    makeStartEnabled()
  }
})

secondInput.addEventListener('keyup', function(){
if (secondInput.value !== '') {
    makeStartEnabled()
  }
})

taskInput.addEventListener('keyup', function(){
if (taskInput.value !== '') {
    makeStartEnabled()
  }
})

timerButton.addEventListener('click', beginTimer);

function beginTimer() {
  // var domMin = document.querySelector(".minute-digits");
  // var domSec = document.querySelector(".second-digits");
  var domMinText = Number(domMin.innerText);
  var domSecText = Number(domSec.innerText);
  // Recursive function that only breaks if the condition is met
  checkTheTime(domSecText, domMinText);
}

function checkTheTime(sec, min) {
//!! Still need to represent these changes on the DOM
  if (sec < 1 && min >0) { // If we're out of sec and have min remaining
    min --;
    sec += 59;
    domSec.innerHTML = sec;
    if (min < 10) {
      domMin.innerText = "0" + min;
    } else {
      domMin.innerText = min;

    }


  } else if (sec === 0 && min === 0) { // If everything is 0, exit loop
    timerButton.innerHTML = "COMPLETE!";
    document.querySelector('.log-button').classList.remove('invisible');
  } else { // Decrement sec is default
    sec --;
    if (sec < 10) {
      domSec.innerText = "0" + sec;
    } else {
      domSec.innerText = sec;

    }
  }
  // Here we use setTimeout to call this func every second
  // We are passing it the changed values of sec & min
  window.setTimeout(checkTheTime, 1000, sec, min);
}

function updateErrors() {
  if (minuteInput.value === '' ||
     secondInput.value === '' ||
     taskInput.value === '') {
     console.log('1')
     emptyInputError();
     console.log('2')
     startButton.disabled = true;
     console.log('3')
}
if (minuteInput.value !== '' &&
    secondInput.value !== '' &&
    taskInput.value !== '') {
      console.log('4')
    revealTimer()
  }
}

function emptyInputError() {
  document.querySelector('.start-error').classList.remove('hidden');
}

function makeStartEnabled() {
  startButton.disabled = false;
}

function revealTimer() {
  timerContainer.classList.add('hidden');
  newTimer.classList.remove('hidden');
  document.querySelector('.current-activity-text').innerHTML = taskInput.value;
  document.querySelector('.minute-digits').innerHTML = minuteInput.value;
  document.querySelector('.second-digits').innerHTML = secondInput.value;
}

class activityLog {
  constructor(category, time, intention) {
    this.category = category;
    this.time = time;
    this.intention = intention;
  }
}
