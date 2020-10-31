const cards = document.querySelectorAll('.memory-card');

let visibleCard = false;
let lockedCard = false;
let firstCard, secondCard;
let score = [1000];
let totalScore = [];
let countHits = 0;

function rotateCard() {
 if (lockedCard) return;
 if (this === firstCard) return;

  this.classList.add('flip');

  if (!visibleCard) {
    visibleCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkCards();
}

function checkCards() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableCards() : unrotateCards();

  if(!isMatch) {
    const inputScore = document.querySelector('#display');

    const calcScore = score[score.length -1] - 50;
    score.push(calcScore)
    const totalScoreCalc = score[score.length -1];
    totalScore.push(totalScoreCalc);

    inputScore.value = totalScoreCalc;

    if(totalScoreCalc == 0) {
      const resultadoInput = document.querySelector('#resultadoMiss');
      const mainNone = document.querySelector('main');
      const sectionBlock = document.querySelector('.miss');

      mainNone.style.display = 'none';
      sectionBlock.style.display = 'block';
      resultadoInput.value = totalScoreCalc;
    }
  } else {
    countHits++;
    if(countHits == 12) {
      const resultadoInput = document.querySelector('#resultado');
      const mainNone = document.querySelector('main');
      const sectionBlock = document.querySelector('.congratulations');

      mainNone.style.display = 'none';
      sectionBlock.style.display = 'block';
      resultadoInput.value = totalScore[totalScore.length - 1];
      
    }
  }
}

function disableCards() {
  firstCard.removeEventListener('click', rotateCard);
  secondCard.removeEventListener('click', rotateCard);

  resetCard();
}

function unrotateCards() {
   lockedCard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetCard();
  }, 1500);
}

function resetCard() {
  [visibleCard, lockedCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function random() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 24);
    card.style.order = ramdomPos;
  });
}

random();

cards.forEach(card => card.addEventListener('click', rotateCard));