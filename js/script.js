/*
 * declaring all needed variables and selection all needed DOM elements
 * declaring array holding the content of the cards
 */
let deck = document.querySelector(".deck");
let replyBtn = document.querySelector(".replay");
let modalWindow = document.querySelector(".modal");
let closeBtn = document.querySelector(".closeBtn");
let flippedCards = [];
let counter = 0;
let moves = document.querySelector(".moves");
let matchedCards = 0;
let cardsToFlip = 2;
let fullStar = "<i class=\"fas fa-star\"></i>";
let emptyStar = "<i class=\"far fa-star\"></i>";
let star1 = document.querySelector(".star1");
let star2 = document.querySelector(".star2");
let star3 = document.querySelector(".star3");
let cards = ["<i class=\"fas fa-gamepad\"></i>",
  "<i class=\"fas fa-gamepad\"></i>",
  "<i class=\"fas fa-ambulance\"></i>",
  "<i class=\"fas fa-ambulance\"></i>",
  "<i class=\"fas fa-birthday-cake\"></i>",
  "<i class=\"fas fa-birthday-cake\"></i>",
  "<i class=\"fas fa-chess\"></i>",
  "<i class=\"fas fa-chess\"></i>",
  "<i class=\"fab fa-fort-awesome\"></i>",
  "<i class=\"fab fa-fort-awesome\"></i>",
  "<i class=\"fas fa-bomb\"></i>",
  "<i class=\"fas fa-bomb\"></i>",
  "<i class=\"fas fa-plane\"></i>",
  "<i class=\"fas fa-plane\"></i>",
  "<i class=\"fas fa-university\"></i>",
  "<i class=\"fas fa-university\"></i>"
];

/*
 * shuffle function from http://stackoverflow.com/a/2450976
 */

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * function for dealing cards in shuffled order
 * create cards, add style to them and fontawesome icon
 */
function dealCards(cards) {
  shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    let cardItem = document.createElement("div");
    cardItem.className = "card";
    let icon = cards[i];
    cardItem.innerHTML = icon;
    deck.appendChild(cardItem);
  }
}

/*
 * function for removing cards from DOM
 */
function removeCards(cards) {
  let cardsToRemove = document.querySelectorAll(".card");
  for (let i = 0; i < cardsToRemove.length; i++) {
    cardsToRemove[i].remove();
  }
}

/*
 *functions for changing the css of cards based on their status during the game
 */
function flipCard(card) {
  card.classList.add("show");
  flippedCards.push(card);
}

function matched(card1, card2) {
  card1.classList.add("matched");
  card2.classList.add("matched");
  flippedCards = [];
}

function hideCards(card1, card2) {
  card1.classList.remove("show");
  card2.classList.remove("show");
  flippedCards = [];
}

/*
 *functions for showing and hiding the pop-up modal window
 */
function showModal() {
  modalWindow.style.display = "flex";
}

function hideModal() {
  modalWindow.style.display = "none";
}

/*
 * function for decreasing the stars score
 * function for reseting stars to initial value - 3 full stars
 */

function decreaseStar(moves) {
  if (moves > 12) {
    star3.innerHTML = emptyStar;
  }
  if (moves > 16) {
    star2.innerHTML = emptyStar;
  }
  if (moves > 20) {
    star1.innerHTML = emptyStar;
  }
}

function resetStars() {
  star1.innerHTML = fullStar;
  star2.innerHTML = fullStar;
  star3.innerHTML = fullStar;
}

/*
 * function has as argument an array of flipped cardsArray
 * shows both card for a second (750 miliseconds)
 * checks if the cards matched or not
 * if they do, marks them as matched, if not, flippes them back
 * incrementing the counter for number of removeCards
 * displaying the number of moves in DOM
 * checks if all cards are matched => win
 */
function waitAndCheck(cardsArray) {
  setTimeout(function() {
    icon1 = cardsArray[0].innerHTML;
    icon2 = cardsArray[1].innerHTML;
    if (icon1 === icon2) {
      matched(cardsArray[0], cardsArray[1]);
      cardsToFlip = 2;
      matchedCards += 2;
      if (matchedCards === 16) {
        showModal();
      }
    } else {
      hideCards(cardsArray[0], cardsArray[1]);
      cardsArray[0].addEventListener("click", listen);
      cardsArray[1].addEventListener("click", listen);
      cardsToFlip = 2;
    }
    counter += 1;
    moves.innerHTML = counter;
    decreaseStar(counter);
  }, 750);
}

let listen = function() {
  if (cardsToFlip > 0) {
    cardsToFlip -= 1;
    this.removeEventListener("click", listen);
    flipCard(this);
  }
  if (cardsToFlip === 0) {
    cardsToFlip = -1;
    waitAndCheck(flippedCards);
  }
};

function game() {
  let allCards = document.querySelectorAll(".card");
  allCards.forEach(function(card) {
    card.addEventListener("click", listen);
  });
}

/*
 * function for a new game
 */
function replay() {
  hideModal();
  removeCards();
  resetStars();
  dealCards(cards);
  flippedCards = [];
  counter = 0;
  moves.innerHTML = counter;
  matchedCards = 0;
  cardsToFlip = 2;
  game();
}

/*
 * automatically deal cards when page is loaded
 * automatically start a new game
 */
document.addEventListener("DOMContentLoaded", dealCards(cards));
game();

/*
 * event listener for the reply button above the deck of cards
 */
replyBtn.addEventListener("click", function() {
  replay();
});

/*
 * event listener for the close button on modal pop-up window
 */
closeBtn.addEventListener("click", function() {
  hideModal();
});

modalWindow.addEventListener("click", function() {
  hideModal();
});

/*
 * handling click on a card
 * 4) implement timer
 * 5) handle the stars (desrease them according to number of moves)
 * 6) display modal - with congrats, time, stars and replay option
 */
