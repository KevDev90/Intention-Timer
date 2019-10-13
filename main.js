var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var invalidChar = ["-",  "+",  "e", "."];
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
var activityLog = [];
var chosenActivity = '';
var logButton = document.querySelector('.log-button');
var rightSection = document.querySelector('.right-section');

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
  chosenActivity = "Study";
});

meditateButton.addEventListener('click', function(){
  meditateButton.classList.toggle('meditateClass');
  timerButton.classList.toggle('meditate-color');
  timerButton.classList.remove('study-color');
  timerButton.classList.remove('exercise-color');
  studyButton.classList.remove('studyClass');
  exerciseButton.classList.remove('exerciseClass');
  chosenActivity = "Meditate";
});

exerciseButton.addEventListener('click', function(){
  exerciseButton.classList.toggle('exerciseClass');
  timerButton.classList.toggle('exercise-color');
  timerButton.classList.remove('study-color');
  timerButton.classList.remove('meditate-color');
  studyButton.classList.remove('studyClass');
  meditateButton.classList.remove('meditateClass');
  chosenActivity = "Exercise";
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
  var domMinText = Number(domMin.innerText);
  var domSecText = Number(domSec.innerText);
  // Recursive function that only breaks if the condition is met
  checkTheTime(domSecText, domMinText);
}

function checkTheTime(sec, min) {
  if (sec < 1 && min >0) {
    min --;
    sec += 59;
    domSec.innerHTML = sec;
    if (min < 10) {
      domMin.innerText = "0" + min;
    } else {
      domMin.innerText = min;
    }
  } else if (sec === 0 && min === 0) { // If everything is 0, exit loop and bring up bring up message
    timerButton.innerHTML = "COMPLETE!";
    document.querySelector('.log-button').classList.remove('invisible');
    document.querySelector('.input-div').classList.add('hidden');
    document.querySelector('.motivate').classList.remove('hidden');
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
};

function makeStartEnabled() {
  startButton.disabled = false;
};

function revealTimer() {
  timerContainer.classList.add('hidden');
  newTimer.classList.remove('hidden');
  document.querySelector('.current-activity-text').innerHTML = taskInput.value;
  document.querySelector('.minute-digits').innerHTML = minuteInput.value;
  document.querySelector('.second-digits').innerHTML = secondInput.value;
};

logButton.addEventListener('click', addPastActivity);

function createInstance() {
  var pastActivity = new Activity(chosenActivity.value, minuteInput.value, secondInput.value, taskInput.value);
  activityLog.push(pastActivity);
  return pastActivity;
};

function addPastActivity() {
  var newActivity = createInstance();
  makeCard(newActivity);
  document.querySelector('.first-prompt').classList.add('hidden');
  document.querySelector('.second-prompt').classList.add('hidden');
  newTimer.classList.add('hidden');
  document.querySelector('.new-activity-button-div').classList.remove('hidden');
};

function makeCard(newActivity) {
  rightSection.insertAdjacentHTML('beforeend', `<div id="${newActivity.id}" class="past-activity">
  <div class="border-section">
  <h3 class="category">${newActivity.category}</h3>
  <h3 class="time-display">${newActivity.minutes} MIN ${newActivity.seconds} SECONDS</h3>
  </div>
  <p class="task-description card-text">${newActivity.intention}</p>
  <p class="message card-text"></p>
  </div>`)
};

document.querySelector('.new-activity-button').addEventListener('click', function() {
  timerContainer.classList.remove('hidden');
  document.querySelector('.new-activity-button-div').classList.add('hidden');
})

// var pastActivity = new Activity {
//   category = chosenActivity;
//   minutes = minuteInput.value;
//   seconds = secondInput.value;
//   intention = document.querySelector('.current-activity-text').value;
//   color = categoryObject[chosenActivity];
//   message = '';
// };

// var categoryObject = {
//   "Study": '#83FD78',
//   "Meditate": '#C278FD',
//   "Exercise": '#FD8078',
// };
