class Hangman {
  constructor(wordToGuess, guesses) {
    this.text = wordToGuess.toLowerCase().split(''); // convert it to an array
    this.remainingGuesses = guesses;
    this.guessedLetters = [];
    this.message = '';
    this.status = 'playing';
  }
  // set and get the puzzle
  getPuzzle() {
    let puzzle = '';
    this.text.forEach((letter) => {
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        puzzle += letter;
      } else {
        puzzle += '*';
      }
    });
    return puzzle;
  }
  // take input and check if it matches and set the message
  makeGuess(guess) {
    if (guess.toLowerCase().match(/[a-z]/)) {
      const isUnique = !this.guessedLetters.includes(guess);
      const isRight = this.text.includes(guess);

      if (isUnique) {
        this.guessedLetters.push(guess);
        console.log('push');
      }
      if (isUnique && isRight) {
        this.message = 'nice!';
      }
      if (isUnique && !isRight) {
        this.remainingGuesses--;
        this.message = 'wrong guess..';
      }
    } else {
      this.message = 'plese type an alphabet letter';
    }
  }
  // set game status whether if it's playing, clear or over
  setStatus() {
    // make this.text to string and remove ' ', and then put it back to array with split
    //const text = this.text.join('').replace(/\s+/g, '').split('');

    // every letter in the array is included in the guessedLetters will return true
    const completionFlag = this.text.every((letter) => {
      return this.guessedLetters.includes(letter) || letter === ' ';
    });

    if (completionFlag) {
      this.status = 'completed';
    }
    if (this.remainingGuesses === 0) {
      this.status = 'over';
    }
  }
}

