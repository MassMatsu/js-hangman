const render = () => {
  const puzzleEl = document.getElementById('puzzle');
  const remainingGuessesEl = document.getElementById('remainingGuesses');
  const messageEl = document.getElementById('message');

  puzzleEl.textContent = game.getPuzzle();
  remainingGuessesEl.textContent = `you have ${game.remainingGuesses === 0 ? 'no' : game.remainingGuesses} more chance${game.remainingGuesses === 1 ? '' : 's'} left`;
  messageEl.textContent = game.message;
  setTimeout(() => {
    messageEl.textContent = '';
  }, 1000);
};

const renderResult = () => {
  const guessBtn = document.getElementById('guessBtn');
  const statusContainer = document.getElementById('statusContainer');
  const statusEl = document.createElement('h2');
  statusContainer.appendChild(statusEl);

  if (game.status === 'over') {
    statusEl.textContent = 'you lose, game is over';
    guessBtn.disabled = true;
  }
  if (game.status === 'made it') {
    statusEl.textContent = 'Great job! you guessed the word!';
  }

  if (game.status !== 'playing') {
    const nextGameBtn = document.createElement('button');
    nextGameBtn.textContent = 'next game';
    nextGameBtn.addEventListener('click', () => {
      guessBtn.disabled = false;
      game.resetGame();
      startGame();
    });
    statusContainer.appendChild(nextGameBtn);
  }
};

const clearText = () => {
  let inputEl = document.getElementById('guessText');
  inputEl.value = '';
};

document.querySelector('#submitGuess').addEventListener('submit', (e) => {
  e.preventDefault();
  game.makeGuess(e.target.guessText.value); // set the puzzle
  game.setStatus();                         // check status and set it
  render();                                 // render the main part
  renderResult();                           // render the result if it finished
  clearText();                              // clear the input
});                               

const startGame = async () => {
  const puzzle = await fetchPuzzle();
  game = new Hangman(puzzle, 2);
  render();
};


let game;
startGame();
