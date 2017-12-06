var userGuess = document.querySelector('#user-guess');
var submitButton = document.querySelector('.submit-btn');
var clearButton = document.querySelector('.clear-btn');
var resetButton = document.querySelector('.reset-btn');
var submitMinMaxButton = document.querySelector('.submit-min-max');
var clearMinMaxInputButton = document.querySelector('.clear-min-max-values');
var feedbackText = document.querySelector('.feedback-text');
var randomNumber;
var childElement;
var minNumber = 0;
var maxNumber = 100;
var counter = 0;

generateRandomNumber();

function userInput() {
  event.preventDefault();
  userGuess = parseInt(userGuess.value);
  runGame();
  console.log('userGuess' , userGuess);
};

function runGame() {
  counter++;
  valueIsANumber();
  readySecondaryButtons();
  createMinAndMaxDisplay();
  console.log('gamecounter', counter)
};

function generateRandomNumber() {
  randomNumber = Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
  console.log('randomNumber', randomNumber);
  return randomNumber;
};

function valueIsANumber() {
  if(isNaN(userGuess) === true) {
    document.querySelector('.ui-text').innerHTML = 'Your Guess Was';
    document.querySelector('.changed-text').innerHTML = 'Oops!';
    feedbackText.innerHTML = `
    Not A Number, Pick a Number Between ${minNumber}  and ${maxNumber} !`;
  } else {
    verifyNumberRange();
  };
};

function verifyNumberRange() {
  if (userGuess < minNumber || userGuess > maxNumber) {
    gameTextHint();
    feedbackText.innerHTML = `
    Not In Range, Pick a Number Between ${minNumber}  and ${maxNumber} !`;
  } else {
    compareNumbers();
  };
};

function compareNumbers() {
  if (userGuess < randomNumber) {
    gameTextHint();
    feedbackText.innerHTML = 'Too Low, Guess Again!';
  } else if (userGuess > randomNumber) {
    gameTextHint();
    feedbackText.innerHTML = 'Too High, Guess Again!';
  } else if (userGuess === randomNumber) {
    correctGuess();
  }; 
};

function correctGuess() {
  gameTextHint();
  feedbackText.innerHTML = 'Boom, You Got It Right, Play Again!';
  generateRandomNumber();
  minNumber -= 10;
  maxNumber +=10
  counter = 0;
  submitMinMaxButton.disabled = false;
  console.log('counter', counter, 'min', minNumber, 'max', maxNumber)
};

function gameTextHint() {
  document.querySelector('.ui-text').innerHTML = 'Your Guess Was';
  document.querySelector('.changed-text').innerHTML = `${userGuess}`;
};

function readySecondaryButtons() {
  clearButton.addEventListener('click', clearInput);
  resetButton.addEventListener('click', resetGame);
  clearMinMaxInputButton.addEventListener('click', resetMinMaxInput)
};


function createMinAndMaxDisplay() {
  var parentElement = document.querySelector('.min-max-section');
  childElement = document.createElement('div');
  childElement.setAttribute('class', 'min-max-display');
  console.log(minNumber, maxNumber)
  childElement.innerHTML = (`
    <h4> Min Vaule: ${minNumber} & Max Value: ${maxNumber}</h4>
    <h4> Number of Guess: ${counter}</h4 >
    `);
  parentElement.appendChild(childElement);
}

function removeMinMaxDisplay() {
  var parentElement = document.querySelector('.min-max-section');
  console.log(parentElement)
  parentElement.removeChild(childElement);
}

function enableButtons() {
  submitButton.disabled = false; 
  clearButton.disabled = false;
  if (counter === 5) {
    resetButton.disabled = false;
  };
};

function clearInput() {
  console.log(childElement)
  event.preventDefault();
  document.querySelector('#user-guess').value = '';
  userGuess = document.querySelector('#user-guess');
  removeMinMaxDisplay();
  disableButtons();
};

function disableButtons() {
  submitButton.setAttribute('disabled', true);
  clearButton.setAttribute('disabled', true);
};

function resetGame() {
  window.location.reload(true)
};

function setMinMaxValues() {
  event.preventDefault();
  minNumber = parseInt(document.getElementById('min-value').value);
  maxNumber= parseInt(document.getElementById('max-value').value);
  generateRandomNumber();
  resetMinMaxInput();
  console.log(minNumber, maxNumber) 
};

function resetMinMaxInput() {
  clearMinMaxInputButton.disabled = false;
  submitMinMaxButton.setAttribute('disabled', true);
};

userGuess.addEventListener('keyup', enableButtons);
submitButton.addEventListener('click', userInput);
submitMinMaxButton.addEventListener('click', setMinMaxValues);
