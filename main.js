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

  // event.preventDefault();
  // console.log('5')
  // var timerTemplate = `
  // <section class="timer-container">
  //       <span class="current-activity-text">${taskInput.value}</span>
  //       <div class="input-div">
  //         <span class="min-sec-counter minute-digits">${minuteInput.value}</span>
  //         <div class="clock-colon-div">
  //           <div class="dot">
  //           </div>
  //           <div class="dot">
  //           </div>
  //         </div>
  //         <span class="min-sec-counter second-digits">${secondInput.value}</span>
  //       </div>
  //       <button class="start-timer-button">START</button>
  //       <button class="log-button">LOG ACTIVITY</button>
  //     </section>
  // `;
  // var startTimer = document.querySelector('.start-activity');
  // console.log('6')
  // timerContainer.innerHTML = timerTemplate;
  // console.log('7')
};
