import {Hangman} from '../../hangman.js'

const game = new Hangman('hey mate', 6)
document.body.innerHTML = '<audio id="audio" src=""></audio>';

test('new Hangman should be constructered properly', () => {
  expect(game.text).toEqual(['h', 'e', 'y', ' ', 'm', 'a', 't', 'e']);
  expect(game.remainingGuesses).toBe(6)
  expect(game.guessedLetters).toEqual([])
  expect(game.message).toBe('')
  expect(game.status).toBe('playing')
})

test('should return a string with a conbination of * and a letter according to a condition', () => {
  game.guessedLetters = [];
  expect(game.getPuzzle()).toBe('*** ****');

  game.guessedLetters = ['h', 'e']
  expect(game.getPuzzle()).toBe('he* ***e');
})

test('take input and check if it is valid', () => {
  game.makeGuess('y')
  expect(game.message).toBe('nice!')
})





