const Hangman = function (wordToGuess, guesses) {
  this.text = wordToGuess.toLowerCase().split(''); // convert it to an array
  this.remainingGuesses = guesses;
  this.guessedLetters = [];
  this.message = ''
  this.status = 'playing'
};

Hangman.prototype.getPuzzle = function () {
  let puzzle = '';
  this.text.forEach((letter) => {
    if (this.guessedLetters.includes(letter) || letter === ' ') {
      puzzle += letter;
    } else {
      puzzle += '*';
    }
  });
  return puzzle;
};

Hangman.prototype.makeGuess = function (guess) {
  if (guess.toLowerCase().match(/[a-z]/)) {
    const isUnique = !this.guessedLetters.includes(guess);
    const isRight = this.text.includes(guess);

    if (isUnique) {
      this.guessedLetters.push(guess);
      console.log('push')
    }
    if (isUnique && isRight) {
      this.message = 'nice!'
    } 
    if (isUnique && !isRight) {
      this.remainingGuesses--;
      this.message = 'wrong guess!'
    }
  } else {
    this.message = 'plese type an alphabet letter';
  }
};

Hangman.prototype.setStatus = function() {
  // make this.text to string and remove ' ', and then put it back to array with split
  const text = this.text.join('').replace(/\s+/g, '').split('')
 
  // every letter in the array is included in the guessedLetters will return true
  const clearFlag = text.every((letter) => {
    return this.guessedLetters.includes(letter)
  })

  if (clearFlag) {
    this.status = 'clear'
  };
  if (this.remainingGuesses === 0) {
    this.status = 'over';
  }
};
