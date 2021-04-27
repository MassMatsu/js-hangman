import { game} from '../app.js';

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
  const word = game.getPuzzle().split('');
  const spacePosition = word.findIndex((letter) => letter === ' ');

  puzzleEl.innerHTML = word
    .map((letter, index) => {
      if (window.innerWidth <= 768 && word.length >= 11) {
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
  }</span>more guesses${game.remainingGuesses === 1 ? '' : 's'}`;

  // game message
  messageEl.textContent = game.message;
  setTimeout(() => {
    messageEl.textContent = '';
    game.message = '';
  }, 2500);
};


