import {keys} from '../utils/data.js'

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
};