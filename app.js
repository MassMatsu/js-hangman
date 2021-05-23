import { render } from './view/mainView.js';
import { renderKeyboard } from './view/keyboard.js';
import { Hangman } from './hangman.js';
import { fetchPuzzle } from './api/requests.js';

export const startGame = async () => {
  const puzzle = await fetchPuzzle();
  game = new Hangman(puzzle, 6);
  render();
  game.play('terror');
};

// initial start of the game !!
export let game; // every new game, it will be new Hangman
startGame();
renderKeyboard();
