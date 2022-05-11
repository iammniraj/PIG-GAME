'use strict';

//selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, cuurentScore, activePlayer, playing;

const init = function () {
  //starting condition
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  //global var
  score = [0, 0];
  cuurentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  cuurentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//when diece get roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    //displaying dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    //check for role 1:
    if (dice !== 1) {
      //   add dice current score
      cuurentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        cuurentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += cuurentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');

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
});

btnnew.addEventListener('click', init);
