// Assuming you have an array of image elements with class "image-element"
const imageElements = document.querySelectorAll(".galleryimg");
let enlargedImage = null;
let currentIndex = -1;

function enlargeImage(event) {
  const clickedImage = event.target;
  if (enlargedImage === clickedImage) {
    // Clicked again, send it back to its original position
    clickedImage.classList.remove("enlarged-image");
    clickedImage.style.clipPath = "";
    enlargedImage = null;
  } else {
    // Hide the previously enlarged image (if any)
    if (enlargedImage) {
      enlargedImage.classList.remove("enlarged-image");
      enlargedImage.style.clipPath = "";
    }
    // Enlarge the clicked image
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

// Attach click event listeners to each image element
imageElements.forEach((img) => {
  img.addEventListener("click", enlargeImage);
});

// Add arrow key navigation for next/previous images
document.addEventListener("keydown", (event) => {
  if (enlargedImage) {
    if (event.key === "ArrowRight") {
      enlargedImage.classList.remove("enlarged-image");
      showNextImage();
    } else if (event.key === "ArrowLeft") {
      enlargedImage.classList.remove("enlarged-image");
      showPreviousImage();
    }
  }
});

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
  // Toggle display for the current gallery
  galleries[currentGalleryIndex].style.display = "none"; // Hide current gallery

  // Switch to the next gallery
  currentGalleryIndex = (currentGalleryIndex + 1) % galleries.length;
  galleries[currentGalleryIndex].style.display = "grid"; // Show next gallery
});
