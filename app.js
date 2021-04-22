const render = () => {
  const puzzleEl = document.getElementById('puzzle');
  const remainingGuessesEl = document.getElementById('remainingGuesses');
  const messageEl = document.getElementById('message');

  puzzleEl.textContent = game.getPuzzle();
  remainingGuessesEl.textContent = `you have ${game.remainingGuesses === 0 ? 'no' : game.remainingGuesses} more chance${game.remainingGuesses === 1 ? '' : 's'} left`;
  messageEl.textContent = game.message;
  setTimeout(() => {
    messageEl.textContent = ''
    game.message = '';
  }, 1000);
};

const renderResult = () => {
  const guessBtn = document.getElementById('guessBtn');
  const statusContainer = document.getElementById('statusContainer');
  const statusEl = document.getElementById('status');
  const answerEl = document.getElementById('answer')
  const nextGameBtn = document.getElementById('nextBtn');

  if (game.status === 'over') {
    statusEl.textContent = 'game is over';
    guessBtn.disabled = true;
  }
  if (game.status === 'completed') {
    statusEl.textContent = 'Great job! you guessed the word!';
  }

  if (game.status !== 'playing') {
    answerEl.textContent = `the puzzle was ${game.text.join('')}`
    nextGameBtn.addEventListener('click', () => {
      guessBtn.disabled = false;
      statusContainer.classList.remove('show')
      startGame();
    });
    statusContainer.classList.add('show')
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
