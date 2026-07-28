const sections = [
  { title: "Major Arcana", cards: majorArcana },
  ...MINOR_SUITS.map((suit) => ({
    title: suit,
    cards: minorArcana.filter((card) => card.suit === suit),
  })),
];

const sectionsContainer = document.getElementById("card-sections");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(card) {
  lightboxImage.src = `images/${card.file}`;
  lightboxImage.alt = cardLabel(card);
  lightbox.hidden = false;
}

function closeLightbox() {
  lightbox.hidden = true;
}

for (const section of sections) {
  const sectionEl = document.createElement("section");
  sectionEl.className = "card-section";

  const heading = document.createElement("h2");
  heading.textContent = section.title;
  sectionEl.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "card-grid";

  for (const card of section.cards) {
    const label = cardLabel(card);

    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "card-thumb";
    thumb.setAttribute("aria-label", `Enlarge ${label}`);
    thumb.addEventListener("click", () => openLightbox(card));

    const img = document.createElement("img");
    img.className = "card-image";
    img.src = `images/${card.file}`;
    img.alt = label;
    img.loading = "lazy";

    thumb.appendChild(img);
    grid.appendChild(thumb);
  }

  sectionEl.appendChild(grid);
  sectionsContainer.appendChild(sectionEl);
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});
