export class Hangman {
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
  // take input and check if it matches. then set the message and play sound
  makeGuess(guess) {
    const newGuess = guess.toLowerCase();
    if (newGuess.match(/[a-z]/)) {
      const isUnique = !this.guessedLetters.includes(newGuess);
      const isRight = this.text.includes(newGuess);

      if (isUnique) {
        this.guessedLetters.push(newGuess);
      }
      if (!isUnique) {
        this.message = 'got it already';
        this.play('already');
      } else if (isUnique && isRight) {
        this.message = 'nice!';
        this.play('correct');
      } else if (isUnique && !isRight) {
        this.remainingGuesses--;
        this.message = 'wrong guess..';
        this.play('incorrect');
      }
    } else {
      this.message = 'plese type a letter';
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
  // play sound effect dynamicaly
  play(src) {
    const audio = document.getElementById('audio');
    audio.src = `./sound/${src}.mp3`;
    audio.play();
  }
}
