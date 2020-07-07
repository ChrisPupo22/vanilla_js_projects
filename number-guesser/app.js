/*
GAME FUNCTIONALITY
- Player must guess a number within a range
- Player gets a certain amount of guesses 
- Notify player of guesses remaining 
- Notify the player of the correct answer if they lose
- Let the player play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = 2,
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");


// Assign UI min and max 
minNum.textContent = min; 
maxNum.textContent = max; 

// Listen for guess
guessBtn.addEventListener('click', function(e) {
    let guess = parseInt(guessInput.value); 
    console.log(guess)
    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`please enter a valid number between ${min} and ${max}`, 'red')
    }

    // check if user guess is right 
    if(guess === winningNum) {
        // Disable input 
        guessInput.disabled = true; 
        // make border green 
        guessInput.style.borderColor = 'green'; 
        // set winning message
        setMessage(`Congrats! ${winningNum} is correct!!`, 'green')

    } else if(guessesLeft == 1) {
        guessInput.disabled = true; 
        setMessage(`You ran out of guesses, would you like to try again?`, 'red')
        

    } else {
        // set border color to red
        guessInput.style.borderColor = 'red'; 
        // active guesses
        
        guessesLeft = guessesLeft - 1; 
        console.log(guessesLeft)
        // set dynamic losing message
        setMessage(`Oh no, you only have ${guessesLeft} guesses left...`); 

    }
})

function setMessage(msg, color) {
    message.style.color = color; 
    message.textContent = msg; 
}
