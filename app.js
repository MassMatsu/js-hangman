import { render} from './view/mainView.js';
import {renderModal} from './view/modal.js'
import {renderKeyboard} from './view/keyboard.js'
import { Hangman } from './hangman.js';
import { fetchPuzzle } from './requests.js';

export let game;

export const startGame = async () => {
  const puzzle = await fetchPuzzle();
  game = new Hangman(puzzle, 6);
  render();
  game.play('terror');
};

renderKeyboard();
startGame();

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
