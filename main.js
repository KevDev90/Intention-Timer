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
});

meditateButton.addEventListener('click', function(){
  meditateButton.classList.toggle('meditateClass');
});

exerciseButton.addEventListener('click', function(){
  exerciseButton.classList.toggle('exerciseClass');
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
  event.preventDefault();
  console.log('5')
  var timerTemplate = `
  <section class="timer-container">
        <span class="current-activity-text">${taskInput.value}</span>
        <div class="input-div">
          <span class="min-sec-counter">${minuteInput.value}</span>
          <div class="clock-colon-div">
            <div class="dot">
            </div>
            <div class="dot">
            </div>
          </div>
          <span class="min-sec-counter">${secondInput.value}</span>
        </div>
        <button class="start-timer-button">START</button>
        <button class="log-button">LOG ACTIVITY</button>
      </section>
  `;
  var startTimer = document.querySelector('.start-activity');
  console.log('6')
  timerContainer.innerHTML = timerTemplate;
  console.log('7')
};
