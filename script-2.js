var submitInput = document.querySelector('.submit-btn');
var clearButton = document.querySelector('.clear-btn');
var verifyInput = document.querySelector('#user-guess');
var gameData = {};
  
verifyInput.addEventListener('keyup', disabledSubmitButton);
submitInput.addEventListener('click', userInput);


function randomNumberGenerator(min, max) {
  gameData.minNumber = 0;
  gameData.maxNumber = 100;
  // sets min and max of user input or if user wins and incresses by 10 and -10;
  gameData.randomNumber = Math.floor(Math.random() * (gameData.maxNumber - gameData.minNumber  +1) + gameData.minNumber); 
}

randomNumberGenerator();

function userInput() {
  event.preventDefault();
  gameData.userGuess = parseInt(document.querySelector('#user-guess').value);
  notAnNumber();
  console.log(gameData)
}

function notAnNumber() {
  if (isNaN(gameData.userGuess)) {
    appenedText();
    document.querySelector('.min-max-text').innerHTML = 'That was Not a Number, Guess Again!'
  }
  verifyWithInRange();
  readySecondaryButtons();
  // should I change the h2 element to be more user friendly?
  // changes appened text and h2
}

function verifyWithInRange() {
  if (gameData.userGuess < gameData.minNumber) {
    minMaxText();
  } else if (gameData.userGuess > gameData.maxNumber) {
    minMaxText();
  } else {
    compareNumbers();
    }
}

function minMaxText() {
  appenedText();
  document.querySelector('.min-max-text').innerHTML = 
    'That Number Was Not In Range, Guess a Number Between ' + 
    gameData.minNumber + ' and' + gameData.maxNumber;
}
  
function appenedText () {
  document.querySelector('.ui-text').innerHTML = 'Your Guess Was'; 
  var appenedElement = document.querySelector('.user-data');
  var createElement = document.createElement('h2');
  createElement.classList.add('user-guess-text')
  createElement.innerHTML = gameData.userGuess
  appenedElement.appendChild(createElement);
}

function compareNumbers() {
  if (gameData.userGuess < gameData.randomNumber) {
      appenedText();
      document.querySelector('.min-max-text').innerHTML = 'Too Low, Try Again!!!';
  } else if (gameData.userGuess > gameData.randomNumber) {
      appenedText();
      document.querySelector('.min-max-text').innerHTML = 'Too High, Try Again!!!';
  } else if (gameData.userGuess === gameData.randomNumber) {
    correctGuess();
  }
}

function correctGuess() {
  appenedText();
  document.querySelector('.min-max-text').innerHTML = 'BOOM!!!, Play Again!';
  randomNumberGenerator();
  // reset min and max vaules
  // call cear functon?      
}

function readySecondaryButtons() {
  clearButton.addEventListener('click', clearInput);
  var resetButton = document.querySelector('.reset-btn');
  resetButton.addEventListener('click', resetGame); 
}

function clearInput() {
  event.preventDefault();
  document.querySelector('#user-guess').value = '';
  var createdElement = document.getElementsByClassName('user-guess-text');
  createdElement = createdElement[0];
  createdElement.parentNode.removeChild(createdElement);
}

function resetGame() {
  // remove h2
  // reset innerHTml of text to start ui
  // reset min and max vaule to 0 and 100;
  // randomNumberGenerator();
}

//  function gamecounter() {
//   // where should game counter be called to loop through all trys?
//    var counter = 0;
//    counter++
//    if (counter >=5) {
//     // enable reset button
//     // run reset function
//    }
//    // if user wins five times, able to create own inputs min and max
// }

function disabledSubmitButton() {
  if (verifyInput.value) {
    submitInput.removeAttribute('disabled', true);
    disableClearButton();
  }  
}

function disableClearButton() {
  if (verifyInput.value) {
    clearButton.removeAttribute('disabled' , true);
    clearButton.addEventListener('click', resetSubmitAndClearButton);
  } 
}

function resetSubmitAndClearButton() {
  submitInput.setAttribute('disabled', true);
  clearButton.setAttribute('disabled', true);
}


  
  // after submit clicked it redisables submit untill value
  // reset disabled after 5 tries
  // after submitbutton hit on allow clear button to be hit, cant reguess without clearing
// }


// buttons disabled if no input
// can submit with enter key instead of click
// change min and max values by 10 everytime user wins
// get rid of vars at top of page, maybe add to function tha passes varibles to other functions
// if user wins 5 times can set own min and max range