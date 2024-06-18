// Assuming you have an array of image elements with class "image-element"
const imageElements = document.querySelectorAll(".galleryimg");
let enlargedImage = null;
let currentIndex = -1;

function enlargeImage(event) {
  const clickedImage = event.target;
  if (enlargedImage === clickedImage) {
    // Clicked again, send it back to its original position
    clickedImage.classList.remove("enlarged-image");
    enlargedImage = null;
  } else {
    // Hide the previously enlarged image (if any)
      if (enlargedImage) {
          enlargedImage.classList.remove("enlarged-image");
    }
    // Enlarge the clicked image
    clickedImage.classList.add("enlarged-image");
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
