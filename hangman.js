const Hangman = function (wordToGuess, guesses) {
  this.text = wordToGuess.toLowerCase().split('');
  this.guessesCount = guesses;
  this.guessedLetters = [];
};

Hangman.prototype.getPuzzle = function() {
  let puzzle = '';
  this.text.forEach((letter) => {
    if (this.guessedLetters.includes(letter) || letter === ' ') {
      puzzle += letter
    } else {
      puzzle += '*'
    }
  })
  return puzzle;
};

Hangman.prototype.makeGuess = function(guess) {
  if (guess.match(/[a-zA-Z]/)) { // input form needs maxlength='1'
    if (!this.guessedLetters.includes(guess)) {
      this.guessedLetters.push(guess)
      this.guessesCount --
      console.log(this.guessedLetters, this.guessesCount)
    }
  } else {
    console.log('plese type an alphabet letter')
  }
}

const game1 = new Hangman('Mas ma', 3);
const game2 = new Hangman('kimiko', 3);
game1.makeGuess('m')
console.log(game1.getPuzzle());


