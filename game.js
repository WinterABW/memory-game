let cardsUncovered = 0;
let card1 = null;
let card2 = null;
let first = null;
let second = null;
let moves = 0;
let hits = 0;
const showMoves = document.getElementById("moves");
const showHits = document.getElementById("hits");
const showTimer = document.getElementById("time");
let activeTimer = false;
let timer = 30;
let intervalTime = null;

let nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
nums = nums.sort(() => {
  return Math.random() - 0.5;
});

function start() {
  intervalTime = setInterval(() => {
    timer--;
    showTimer.innerHTML = `Time: ${timer} seconds`;
    if (timer === 0) {
      blockCards();
      clearInterval(intervalTime);
    }
  }, 1000);
}

function blockCards() {
  for (let index = 0; index <= 15; index++) {
    let blockCard = document.getElementById(index);
    blockCard.innerHTML = nums[index];
    blockCard.disabled = true;
  }
}

function uncover(id) {
  if (!activeTimer) {
    start();
    activeTimer = true;
  }
  cardsUncovered++;

  if (cardsUncovered === 1) {
    card1 = document.getElementById(id);
    first = nums[id];
    card1.innerHTML = nums[id];
    card1.disabled = true;
  } else if (cardsUncovered === 2) {
    card2 = document.getElementById(id);
    second = nums[id];
    card2.innerHTML = nums[id];
    card2.disabled = true;
    moves++;
    showMoves.innerHTML = `Movements: ${moves}`;

    if (first === second) {
      cardsUncovered = 0;
      hits++;
      showHits.innerHTML = `Hits: ${hits}`;
      if (hits === 8) {
        clearInterval(intervalTime);
        showHits.innerHTML = `Hits: ${hits} 🥳`;
        showTimer.innerHTML = `Completado en ${30 - timer} segundos`;
        showMoves.innerHTML = `Movements: ${moves} 😎`;
      }
    } else {
      setTimeout(() => {
        card1.innerHTML = "";
        card2.innerHTML = "";
        card1.disabled = false;
        card2.disabled = false;
        cardsUncovered = 0;
      }, 800);
    }
  }
}