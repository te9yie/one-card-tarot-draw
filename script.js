const MAJOR_ARCANA_FILES = [
  "00-TheFool.png",
  "01-TheMagician.png",
  "02-TheHighPriestess.png",
  "03-TheEmpress.png",
  "04-TheEmperor.png",
  "05-TheHierophant.png",
  "06-TheLovers.png",
  "07-TheChariot.png",
  "08-Strength.png",
  "09-TheHermit.png",
  "10-WheelOfFortune.png",
  "11-Justice.png",
  "12-TheHangedMan.png",
  "13-Death.png",
  "14-Temperance.png",
  "15-TheDevil.png",
  "16-TheTower.png",
  "17-TheStar.png",
  "18-TheMoon.png",
  "19-TheSun.png",
  "20-Judgement.png",
  "21-TheWorld.png",
];

const MINOR_SUITS = ["Cups", "Pentacles", "Swords", "Wands"];

const majorArcana = MAJOR_ARCANA_FILES.map((file) => ({ file, isMajor: true }));

const minorArcana = MINOR_SUITS.flatMap((suit) =>
  Array.from({ length: 14 }, (_, i) => ({
    file: `${suit}${String(i + 1).padStart(2, "0")}.png`,
    isMajor: false,
  }))
);

const allCards = [...majorArcana, ...minorArcana];

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
