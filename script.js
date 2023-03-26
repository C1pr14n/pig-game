'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnReset = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const currentScP1 = document.getElementById('current--0'); // getElbyID faster than querySelector
const currentScP2 = document.getElementById('current--1');
const scoreP1 = document.getElementById('score--0');
const scoreP2 = document.getElementById('score--1');

// Declaring the globals
let scores, currentScore, activePlayer, isPlaying;

// Initialising
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  currentScP1.textContent = 0;
  currentScP2.textContent = 0;

  diceImg.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player2.classList.remove('player--active');
  player1.classList.add('player--active');
};
init();

// Functions
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // switch player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // change css classes:
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

const rollDice = () => {
  if (isPlaying) {
    const dice = Math.floor(Math.random() * 6) + 1;

    diceImg.classList.remove('hidden');

    // Display img dice (maybe an IIFE)
    const changeDiceImg = nr => {
      diceImg.src = `dice-${nr}.png`;
    };
    changeDiceImg(dice);

    // Check for dice roll = 1
    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const holdScore = () => {
  if (isPlaying) {
    // Add currentScore to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player's score is >= 100 (finish game || switch player)
    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      diceImg.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

// Events
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnReset.addEventListener('click', init);
