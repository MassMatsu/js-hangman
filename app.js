const render = () => {
  const wrongEl = document.getElementById('wrong-letter');
  const figureParts = document.querySelectorAll('.figure-part');
  const puzzleEl = document.getElementById('puzzle');
  const remainingGuessesEl = document.getElementById('remainingGuesses');
  const messageEl = document.getElementById('message');

  // wrong letters
  const wrong = game.guessedLetters.filter(
    (letter) => !game.text.includes(letter)
  );
  if (wrong.length > 0) {
    wrongEl.innerHTML = wrong
      .map((item) => {
        return `
    <span>${item}</span>
    `;
      })
      .join('');
  } else {
    wrongEl.innerHTML = `<span>letters appear here</span>`;
  }

  // figure part
  figureParts.forEach((part, index) => {
    if (index < wrong.length) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // puzzle
  const puzzle = game.getPuzzle().split('');
  console.log(puzzle)
  puzzleEl.innerHTML = game
    .getPuzzle()
    .split('')
    .map((letter) => {
      return `
      <span>${letter}</span>
    `;
    })
    .join('');

  // remaining guesses message
  remainingGuessesEl.textContent = `- you have ${
    game.remainingGuesses === 0 ? 'no' : game.remainingGuesses
  } more chance${game.remainingGuesses === 1 ? '' : 's'} left -`;

  // game message
  messageEl.textContent = game.message;
  setTimeout(() => {
    messageEl.textContent = '';
    game.message = '';
  }, 1000);
};

const renderResult = () => {
  const statusContainer = document.getElementById('modal-container');
  const statusEl = document.getElementById('status');
  const answerEl = document.getElementById('answer');
  const nextGameBtn = document.getElementById('nextBtn');

  if (game.status === 'over') {
    statusEl.textContent = 'Game is over';
  }
  if (game.status === 'completed') {
    statusEl.textContent = 'Great job! you guessed the word!';
  }

  if (game.status !== 'playing') {
    answerEl.innerHTML = `
      <p>the puzzle was <span> "${game.text.join('')}" </span></p>
    `;
    nextGameBtn.addEventListener('click', () => {
      statusContainer.classList.remove('show');
      startGame();
    });
    statusContainer.classList.add('show');
  }
};

const clearText = () => {
  let inputEl = document.getElementById('guessText');
  inputEl.value = '';
};

// window.addEventListener('DOMContentLoaded', () => {
//   const audio = document.getElementById('opening');
//   audio.src = './sound/terror.mp3'
//   audio.autoplay = true
//   //audio.play()
//   //game.play('correct')
//   console.log('loaded')
// })

const play = (src) => {
  const audio = document.getElementById('audio');
  const btn = document.getElementById('guessBtn');

  btn.addEventListener('click', () => {
    audio.src = `./sound/${src}.mp3`;
    audio.play();
  });
};

document.querySelector('#submitGuess').addEventListener('submit', (e) => {
  e.preventDefault();

  game.makeGuess(e.target.guessText.value); // set the puzzle
  game.setStatus(); // check status and set it
  render(); // render the main part
  renderResult(); // render the result if it finished
  clearText(); // clear the input
});

const startGame = async () => {
  const puzzle = await fetchPuzzle();
  game = new Hangman(puzzle, 6);
  render();
};

let game;
startGame();



