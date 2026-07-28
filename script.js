const reversedToggle = document.getElementById("reversed-toggle");
const majorOnlyToggle = document.getElementById("major-only-toggle");
const cardArea = document.getElementById("card-area");
const cardFlipper = document.getElementById("card-flipper");
const cardImage = document.getElementById("card-image");

let rotation = 0;
let isBusy = false;

function isFront() {
  return ((rotation % 360) + 360) % 360 === 180;
}

function drawCard() {
  const pool = majorOnlyToggle.checked ? majorArcana : allCards;
  const card = pool[Math.floor(Math.random() * pool.length)];
  const isReversed = reversedToggle.checked && Math.random() < 0.5;

  cardImage.src = `images/${card.file}`;
  cardImage.alt = card.file.replace(/\.png$/, "");
  cardImage.classList.toggle("reversed", isReversed);

  return cardImage.decode().catch(() => {});
}

async function flip(direction) {
  if (isBusy) return;
  isBusy = true;

  if (!isFront()) {
    await drawCard();
  }
  rotation += direction * 180;
  cardFlipper.style.transform = `rotateY(${rotation}deg)`;

  isBusy = false;
}

cardArea.addEventListener("click", (event) => {
  const rect = cardArea.getBoundingClientRect();
  const clickedRightHalf = event.clientX - rect.left > rect.width / 2;
  flip(clickedRightHalf ? -1 : 1);
});

cardArea.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    flip(-1);
  }
});
