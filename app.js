const render = () => {
  const puzzleEl = document.getElementById('puzzle');
  const remainingGuessesEl = document.getElementById('remainingGuesses');
  const messageEl = document.getElementById('message');

  puzzleEl.textContent = game.getPuzzle();
  remainingGuessesEl.textContent = `you have ${game.remainingGuesses}
   more chance${game.remainingGuesses === 1 ? '' : 's'} left`;
  messageEl.textContent = game.message;
  setTimeout(() => {
    messageEl.textContent = '';
  }, 1000);
};

const clearText = () => {
  let inputEl = document.getElementById('guessText');
  inputEl.value = '';
};

document.querySelector('#submitGuess').addEventListener('submit', (e) => {
  e.preventDefault();
  game.makeGuess(e.target.guessText.value);
  game.setStatus()
  render();
  clearText();
  
});

const game = new Hangman('Masa man', 2);
render();
game.setStatus()
