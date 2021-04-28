import { keys } from '../utils/data.js';
import { game } from '../app.js';
import { renderModal } from '../view/modal.js';
import { render } from '../view/mainView.js';

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

  // event listener for keybaord click
  const keysEl = document.querySelectorAll('.key');
  keysEl.forEach((key) => {
    key.addEventListener('click', (e) => {
      game.makeGuess(e.target.name); // set the puzzle
      game.setStatus(); // check status and set it
      render(); // render the main part
      renderModal(); // render the result if it finished
      //clearText(); // clear the input
    });
  });
};
