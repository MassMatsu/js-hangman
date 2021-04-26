import { keys } from './utils/data.js';
import { game, startGame } from './app.js';

export const render = () => {
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
      .map((letter) => {
        return `
    <span class='wrong-letter'>${letter}</span>
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
  remainingGuessesEl.innerHTML = `<span class='remaining-guesses'>${
    game.remainingGuesses === 0 ? 'no' : game.remainingGuesses
  }</span>more guesses${game.remainingGuesses === 1 ? '' : 's'}`;

  // game message
  messageEl.textContent = game.message;
  setTimeout(() => {
    messageEl.textContent = '';
    game.message = '';
  }, 2000);
};

export const renderResult = () => {
  const statusContainer = document.getElementById('modal-container');
  const statusEl = document.getElementById('status');
  const answerEl = document.getElementById('answer');
  const nextGameBtn = document.getElementById('nextBtn');

  if (game.status === 'over') {
    statusEl.textContent = 'Game is over';
    game.play('over');
  }
  if (game.status === 'completed') {
    statusEl.textContent = 'Great job! you guessed the word!';
    game.play('completed');
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

// keyboard
export const renderKeyboard = () => {
  const firstRowContainer = document.getElementById('first-quarter');
  const secondRowContainer = document.getElementById('second-quarter');
  const thirdRowContainer = document.getElementById('third-quarter');
  const forthRowContainer = document.getElementById('forth-quarter');
  firstRowContainer.innerHTML = keys
    .map((key, index) => {
      if (index < 7) {
        return `<button class='key' name='${key}'>${key}</button>`;
      }
    })
    .join('');
  secondRowContainer.innerHTML = keys
    .map((key, index) => {
      if (index >= 7 && index < 14) {
        return `<button class='key' name='${key}'>${key}</button>`;
      }
    })
    .join('');
  thirdRowContainer.innerHTML = keys
    .map((key, index) => {
      if (index >= 14 && index < 21) {
        return `<button class='key' name='${key}'>${key}</button>`;
      }
    })
    .join('');
  forthRowContainer.innerHTML = keys
    .map((key, index) => {
      if (index >= 21) {
        return `<button class='key' name='${key}'>${key}</button>`;
      }
    })
    .join('');
};
