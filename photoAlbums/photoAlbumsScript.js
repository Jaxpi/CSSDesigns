const styleToggle = document.getElementById("style-toggle");
const galleries = [
  document.querySelector(".gallery1"),
  document.querySelector(".gallery2"),
  document.querySelector(".gallery3"),
];

let currentGalleryIndex = 0;

for (let i = 1; i < galleries.length; i++) {
  galleries[i].style.display = "none";
}

styleToggle.addEventListener("click", () => {
  galleries[currentGalleryIndex].style.display = "none";
  currentGalleryIndex = (currentGalleryIndex + 1) % galleries.length;
  galleries[currentGalleryIndex].style.display = "grid";
});

const imageElements = document.querySelectorAll(".galleryimg");
let enlargedImage = null;
let currentIndex = -1;

function enlargeImage(event) {
  const clickedImage = event.target;
  if (enlargedImage === clickedImage) {
    clickedImage.classList.remove("enlarged-image");
    clickedImage.style.clipPath = "";
    enlargedImage = null;
  } else {
    if (enlargedImage) {
      enlargedImage.classList.remove("enlarged-image");
      enlargedImage.style.clipPath = "";
    }
    clickedImage.classList.add("enlarged-image");
    clickedImage.style.clipPath = "none";
    enlargedImage = clickedImage;
    currentIndex = Array.from(imageElements).indexOf(enlargedImage);
  }
}

function showNextImage() {
  if (currentIndex >= 0 && currentIndex < imageElements.length - 1) {
    imageElements[currentIndex + 1].click();
  }
}

function showPreviousImage() {
  if (currentIndex > 0) {
    imageElements[currentIndex - 1].click();
  }
}

imageElements.forEach((img) => {
  img.addEventListener("click", enlargeImage);
});

document.addEventListener("keydown", (event) => {
  if (enlargedImage) {
    if (event.key === "ArrowRight") {
      enlargedImage.classList.remove("enlarged-image");
      enlargedImage.style.clipPath = "";
      showNextImage();
    } else if (event.key === "ArrowLeft") {
      enlargedImage.classList.remove("enlarged-image");
      enlargedImage.style.clipPath = "";
      showPreviousImage();
    }
  }
});
