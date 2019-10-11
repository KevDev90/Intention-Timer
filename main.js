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

startButton.addEventListener('click', updateErrors)


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

  timerButton.addEventListener('click', beginTimer);
  
function beginTimer() {
  var domMin = document.querySelector(".minute-digits");
  var domSec = document.querySelector(".second-digits");
  domMin = Number(domMin.innerText);
  domSec = Number(domSec.innerText);
  // Recursive function that only breaks if the condition is met
  checkTheTime(domSec, domMin);
}

function checkTheTime(sec, min) {
//!! Still need to represent these changes on the DOM
  if (sec < 0 && min >0) { // If we're out of sec and have min remaining
    min --;
    sec += 60;
    console.log('After TimeSlip:', min, sec)
  } else if (sec === 0 && min === 0) { // If everything is 0, exit loop
    console.log('Finished')
    return 'Finished'
  } else { // Decrement sec is default
    sec --;
    console.log('Timer at', min, sec)
  }
  // Here we use setTimeout to call this func every second
  // We are passing it the changed values of sec & min
  window.setTimeout(checkTheTime, 1000, sec, min);
}
