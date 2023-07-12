const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "center"
    });

    items[currentItem].classList.add("current-item");
  });
});

window.addEventListener('load', function() {
  const galleryWrapper = document.querySelector('.gallery-wrapper');
  const gallery = document.querySelector('.gallery');
  const items = document.querySelectorAll('.item');
  const currentItem = document.querySelector('.ft2');
  const itemWidth = currentItem.offsetWidth;
  const itemIndex = Array.from(items).indexOf(currentItem);
  galleryWrapper.scrollLeft = (itemWidth + 10) * itemIndex - galleryWrapper.offsetWidth / 2 + itemWidth / 2;
}); 