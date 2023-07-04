const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let currentScore = 0;
let scoreMultiplier = 1;
let timer = 0;
let interval;
let totalPairs = cards.length / 2;
let matchedPairs = 0;

const bestScoreElement = document.getElementById('best-score-dbz');
const bestScore = getBestScore();
bestScoreElement.textContent = bestScore + ' points';

function getBestScore() {
  return localStorage.getItem('bestScoreDbz') || 0;
}

function updateBestScore(score) {
  localStorage.setItem('bestScoreDbz', score);
}

function startTimer() {
  interval = setInterval(() => {
    timer += 1;
    currentScore -= 1;

    if (currentScore <= 0) {
      currentScore = 0;
    }

    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    document.getElementById('score').textContent = currentScore;
    document.getElementById('timer').textContent = `${minutes} m ${seconds} s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    
    // Commencer le timer au premier clic seulement
    if (timer === 0) {
      startTimer();
    }
    
    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  currentScore += 10 * scoreMultiplier;
  document.getElementById('score').textContent = currentScore;

  if (currentScore > getBestScore()) {
    updateBestScore(currentScore);
  }
  resetBoard();
}


function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
    matchedPairs++;
    scoreMultiplier++;

    if (matchedPairs === totalPairs) {
      stopTimer();
      // Ici, vous pouvez effectuer d'autres actions lorsque toutes les paires ont été trouvées
    }
  } else {
    unflipCards();
    scoreMultiplier = 1;
  }
}


function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


(function shuffle() {
  
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function restartGame() {
  // Réinitialiser les variables
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  currentScore = 0;
  timer = 0;
  scoreMultiplier = 1;
  matchedPairs = 0;

  const bestScoreElement = document.getElementById('best-score-dbz');
  const bestScore = getBestScore();
  bestScoreElement.textContent = bestScore + ' points';
  
  // Réinitialiser les affichages
  document.getElementById('score').textContent = currentScore;
  document.getElementById('timer').textContent = timer;
  
  // Réinitialiser les cartes
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  
  // Mélanger les cartes
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
  
  // Arrêter le timer s'il est en cours
  if (matchedPairs === totalPairs) {
    stopTimer();
    // Ici, vous pouvez effectuer d'autres actions lorsque toutes les paires ont été trouvées
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));