import {game, startGame} from '../app.js'

export const renderModal = () => {
  const statusContainer = document.getElementById('modal-container');
  const statusEl = document.getElementById('status');
  const answerEl = document.getElementById('answer');
  const nextGameBtn = document.getElementById('nextBtn');

  if (game.status === 'over') {
    statusEl.textContent = 'Game is over';
    game.play('over');
  }
  if (game.status === 'completed') {
    statusEl.innerHTML = '<h2>Great job!</h2> <h2>you guessed the word!</h2>';
    game.play('completed');
  }

  if (game.status !== 'playing') {
    answerEl.innerHTML = `
      <p>the puzzle was <span> "${game.text.join('')}" </span></p>
    `;

    nextGameBtn.addEventListener(
      'click',
      () => {
        statusContainer.classList.remove('show');
        startGame();
      },
      { once: true }
    );

    statusContainer.classList.add('show');
  }
};