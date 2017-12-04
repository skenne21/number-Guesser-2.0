var userGuess = document.querySelector('#user-guess');
var submitButton = document.querySelector('.submit-btn');
var clearButton = document.querySelector('.clear-btn');
var resetButton = document.querySelector('.reset-btn');
var randomNumber;
var minNumber;
var maxNumber;
var counter = 0;

generateRandomNumber();

function userInput() {
  event.preventDefault();
  counter++;
  userGuess = parseInt(userGuess.value);
  console.log('userGuess' , userGuess);
  console.log('gamecounter', counter)
  valueIsANumber();
  readySecondaryButtons();
};

function generateRandomNumber() {
  minNumber = 0;
  maxNumber = 100;
  randomNumber = Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
  console.log('randomNumber', randomNumber);
};

function valueIsANumber() {
  if(isNaN(userGuess) === true) {
    gameTextHint();
    document.querySelector('.min-max-text').innerHTML = `
    Your Was Not In Range, Pick a Number Between ${minNumber}  and ${maxNumber} !`
  } else {
    verifyNumberRange();
  };
};

function verifyNumberRange() {
  if (userGuess < minNumber || userGuess > maxNumber) {
    gameTextHint();
    document.querySelector('.min-max-text').innerHTML = `
    Your Was Not In Range, Pick a Number Between ${minNumber}  and ${maxNumber} !`;
  } else {
    compareNumbers();
  };
};

function compareNumbers() {
  if (userGuess < randomNumber) {
    gameTextHint();
    document.querySelector('.min-max-text').innerHTML = 'Too Low, Guess Again!';
  } else if (userGuess > randomNumber) {
    gameTextHint();
    document.querySelector('.min-max-text').innerHTML = 'Too High, Guess Again!';
  } else if (userGuess === randomNumber) {
    correctGuess();
  }; 
};

function correctGuess() {
  gameTextHint();
  document.querySelector('.min-max-text').innerHTML = 'Boom, You Got It Right, Play Again!';
  generateRandomNumber();
  minNumber -= 10;
  maxNumber +=10
  counter = 0;
  console.log('counter', counter, 'min', minNumber, 'max', maxNumber)
};

function gameTextHint() {
  document.querySelector('.ui-text').innerHTML = 'Your Guess Was';
  document.querySelector('.changed-text').innerHTML = `${userGuess}`;
};

function readySecondaryButtons() {
  clearButton.addEventListener('click', clearInput);
  resetButton.addEventListener('click', resetGame);

  // reset buttons
}

function enableButtons() {
  submitButton.disabled = false; 
  clearButton.disabled = false;
  if (counter >= 5) {
    resetButton.disabled = false;
  }
}

function clearInput() {
  event.preventDefault();
  document.querySelector('#user-guess').value = '';
  userGuess = document.querySelector('#user-guess');
  submitButton.setAttribute('disabled', true);
  clearButton.setAttribute('disabled', true);
}

function resetGame() {
  counter = 0;
  minNumber = 0; 
  maxNumber = 100;
  document.querySelector('#user-guess').value = '';
  document.querySelector('.ui-text').innerHTML = 'Guess a Number';
  document.querySelector('.changed-text').innerHTML = '';
  document.querySelector('.min-max-text').innerHTML = 'Between ' + minNumber + ' and ' + maxNumber;
  generateRandomNumber();
}

submitButton.addEventListener('click', userInput);
userGuess.addEventListener('keyup', enableButtons);

// create ui that changes as the min and max number change
// create button for user setting own range
// how do I make random number change as the user wins have min and max 0 to 100 || what user sets or winning value 