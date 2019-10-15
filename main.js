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
var borderColor = '';
var logButton = document.querySelector('.log-button');
var rightSection = document.querySelector('.right-section');
var endTime = new Date().setTime();
var currentTime = new Date().getTime();
var remainingTime = endTime - currentTime;
var mins = Math.floor((remainingTime/1000)/60);
var secs = Math.floor(remainingTime/1000);
var acc = document.getElementsByClassName("accordion");
var userMessage = document.querySelector('.user-message');
var i;



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
  studyButton.classList.toggle('Class');
  exerciseButton.classList.remove('Class');
  meditateButton.classList.remove('Class');
  timerButton.classList.toggle('study-timer-border');
  timerButton.classList.remove('meditate-timer-border');
  timerButton.classList.remove('exercise-timer-border');
  exerciseButton.classList.remove('exerciseClass');
  meditateButton.classList.remove('meditateClass');
  chosenActivity = "Study";
});

meditateButton.addEventListener('click', function(){
  meditateButton.classList.toggle('Class');
  studyButton.classList.remove('Class');
  exerciseButton.classList.remove('Class');
  meditateButton.classList.toggle('meditateClass');
  timerButton.classList.toggle('meditate-timer-border');
  timerButton.classList.remove('study-timer-border');
  timerButton.classList.remove('exercise-timer-border');
  studyButton.classList.remove('studyClass');
  exerciseButton.classList.remove('exerciseClass');
  chosenActivity = "Meditate";

});

exerciseButton.addEventListener('click', function(){
  exerciseButton.classList.toggle('exerciseClass');
  exerciseButton.classList.toggle('Class');
  studyButton.classList.remove('Class');
  meditateButton.classList.remove('Class');
  timerButton.classList.toggle('exercise-timer-border');
  timerButton.classList.remove('study-timer-border');
  timerButton.classList.remove('meditate-timer-border');
  studyButton.classList.remove('studyClass');
  meditateButton.classList.remove('meditateClass');
  chosenActivity = "Exercise";

});

startButton.addEventListener('click', updateErrors);



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

document.querySelector('.right-section').addEventListener('click', addRedo);



timerButton.addEventListener('click', beginTimer);

logButton.addEventListener('click', addPastActivity);

document.querySelector('.new-activity-button').addEventListener('click', backToMain);

function beginTimer() {
  var domMinText = Number(domMin.innerText);
  var domSecText = Number(domSec.innerText);
  checkTheTime(domSecText, domMinText);
}

function checkTheTime(sec, min) {
  if (sec < 1 && min >0) {
    min --;
    sec += 59;
    domSec.innerText = sec;
    if (min < 10) {
      domMin.innerText = "0" + min;
    } else {
      domMin.innerText = min;
    }
  } else if (sec === 0 && min === 0) {
    timerButton.innerHTML = "COMPLETE!";
    document.querySelector('.log-button').classList.remove('invisible');
    document.querySelector('.input-div').classList.add('hidden');
    document.querySelector('.motivate').classList.remove('hidden');
  } else {
    sec --;
    if (sec < 10) {
      domSec.innerText = "0" + sec;
    } else {
      domSec.innerText = sec;
    }
  }
  window.setTimeout(checkTheTime, 1000, sec, min);
}

function updateErrors() {
if (minuteInput.value === '' ||
     secondInput.value === '' ||
     taskInput.value === '') {
     emptyInputError();
     startButton.disabled = true;
     }
if (minuteInput.value !== '' &&
    secondInput.value !== '' &&
    taskInput.value !== '') {
    revealTimer()
    disableRedoButton()
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

function createInstance() {
  var pastActivity = new Activity(chosenActivity.value, minuteInput.value, secondInput.value, taskInput.value, userMessage.value);
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
  <div class="${newActivity.category}-color">
  <h3 class="category">${newActivity.category}</h3>
  <h3 class="time-display">${newActivity.minutes} MIN ${newActivity.seconds} SECONDS</h3>
  </div>
  <p class="task-description card-text">${newActivity.intention}</p>
  <p class="message card-text"></p>
  <div class="div-soup">
  <button class="redo-card" disabled=true type="button" onclick= "addRedo(event)">REDO</button>
  <button class="favorite-card" type="button" onclick= "favoriteButton(event)"></button>
  </div>
  <button class="accordion"></button>
  <div class="panel">
  <p>${newActivity.message}</p>
  </div>
  </div>`)
};

document.querySelector('.new-activity-button').addEventListener('click', backToMain)

function backToMain() {
  timerContainer.classList.remove('hidden');
  document.querySelector('.new-activity-button-div').classList.add('hidden');
  enableRedoButton()
};


function favoriteButton(event) {

  var cardId = event.target.closest('.past-activity').id;
  var favButton = document.querySelector('favorite-card')
  var instance = activityLog.find(function(task){
  return Number(task.id) === Number(cardId);
  })
  instance.toggleFavorite();
  if (!instance.favorite) {
    event.target.classList.remove('favorite');
  } else {
    event.target.classList.add('favorite');
  }
}

function enableRedoButton() {
  var buttons = document.querySelectorAll('.redo-card');
  for (var i=0; i < activityLog.length; i++) {
    activityLog[i].redo = true
    buttons[i].disabled = false;
  }
}

function disableRedoButton() {
  var buttons = document.querySelectorAll('.redo-card');
  for (var i=0; i < activityLog.length; i++) {
    activityLog[i].redo = false
    buttons[i].disabled = true;
  }
}


function addRedo(event) {
  if(event.target.classList.contains('redo-card')){
  var cardId = event.target.closest('.past-activity').id;
  var instance = activityLog.find(function(task){
    return Number(task.id) === Number(cardId);
  });
    taskInput.value = instance.intention;
    minuteInput.value = instance.minutes;
    secondInput.value = instance.seconds;
  }
}



// use the above to find the instance
// find the input elements using querySelector's or globally
// assign the value of those elements to the instance property values
// instance.category instance.minutes
// this input element = instance.minutes
//change them in the form look that up, might run into it not wanting to edit it.
//once its edited, reassign those properties on the instance to those new input values
//


//
// function redoCard(event) {
//   var cardId = event.target.closest('.past-activity').id;
//   var redoButton = document.querySelector('redo-card')
//   var instance = activityLog.find(function(task){
//     return Number(task.id) === Number(cardId);
//   })
//   instance.changeRedo();
// }
//
//
// //
//   function changeRedo(event) {
//   if (!event.target.classList.contains('my-selector-class')
