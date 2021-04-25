class Hangman {
  constructor(wordToGuess, guesses) {
    this.text = wordToGuess.toLowerCase().split(''); // convert it to an array
    this.remainingGuesses = guesses;
    this.guessedLetters = [];
    this.message = '';
    this.status = 'playing';
  }
  play(src) {
    const audio = document.getElementById('audio');
    const btn = document.getElementById('guessBtn');

    btn.addEventListener('click', () => {
      audio.src = `./sound/${src}.mp3`;
      audio.play();
      console.log('hello')
    });
  };
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
      }
      if (!isUnique) {
        this.message = 'got it already'
      }
      if (isUnique && isRight) {
        this.message = 'nice!';
        this.play('correct')
      }
      if (isUnique && !isRight) {
        this.remainingGuesses--;
        this.message = 'wrong guess..';
        this.play('incorrect')
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

}

