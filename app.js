import { render, renderResult, renderKeyboard } from './view.js';
import { Hangman } from './hangman.js';
import { fetchPuzzle } from './requests.js';

export const startGame = async () => {
  const puzzle = await fetchPuzzle();
  game = new Hangman(puzzle, 6);
  render();
  game.play('terror');
};

export let game;
renderKeyboard();
startGame();

const keysEl = document.querySelectorAll('.key');
keysEl.forEach((key) => {
  key.addEventListener('click', (e) => {
    game.makeGuess(e.target.name); // set the puzzle
    game.setStatus(); // check status and set it
    render(); // render the main part
    renderResult(); // render the result if it finished
    //clearText(); // clear the input
  });
});
