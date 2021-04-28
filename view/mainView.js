import { game } from '../app.js';

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
    wrongEl.innerHTML = `<span>letters appear</span>`;
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
  const spacePosition = puzzle.findIndex((letter) => letter === ' ');

  puzzleEl.innerHTML = puzzle
    .map((letter, index) => {
      if (window.innerWidth <= 768 && puzzle.length > 12) {
        let br = index === spacePosition ? '<br>' : '';
        return `
        ${
          index < spacePosition
            ? '<span>' + letter + '</span>'
            : br + '<span>' + letter + '</span>'
        }
        `;
      } else {
        return `
          <span>${letter}</span>
        `;
      }
    })
    .join('');

  // remaining guesses message
  remainingGuessesEl.innerHTML = `<span class='remaining-guesses'>${
    game.remainingGuesses === 0 ? 'no' : game.remainingGuesses
  }</span>more guess${
    game.remainingGuesses > 1 || game.remainingGuesses === 0 ? 'es' : ''
  }`;

  // game message
  messageEl.textContent = game.message;
  setTimeout(() => {
    messageEl.textContent = '';
    game.message = '';
  }, 2500);
};
