'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let goal = 100;

const resetGame = function () {
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
};

const switchPlayers = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  } else {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  }
};

const setWinner = function () {
  diceEl.classList.add('hidden');
  if (activePlayer === 0) {
    player0El.classList.remove('player--active');
    player0El.classList.add('player--winner');
  } else {
    player1El.classList.remove('player--active');
    player1El.classList.add('player--winner');
  }
};

// Starting conditions
resetGame();

// Rolling dice funct
btnRoll.addEventListener('click', function () {
  if (scores[activePlayer] < goal) {
    // 1. Generate a random numnbet between 1 and 6
    let dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for number
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // switch to next player and background
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (scores[activePlayer] < goal) {
    // add current score to array and display total score for correct player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    // if score >= 100 = you won the game!
    if (scores[activePlayer] >= goal) {
      setWinner();
    } else {
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', function () {
  resetGame();
});
