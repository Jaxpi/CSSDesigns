const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// Get references to the relevant elements
const styleToggle = document.getElementById("style-toggle");
// const inputBoxImg = document.querySelectorAll(".input-box-img");
const container = document.getElementById("container");
const containerH1 = document.getElementById("container-h1");
const containerH1Img = document.getElementById("container-h1-img");
const containerBtn = document.getElementById("container-button");
const containerBtnImg = document.getElementById("container-button-img");

// Initialize with the default style and set new style upon click event
let currentStyle = parseInt(localStorage.getItem("currentStyle")) || 1;

const elementsToUpdate = [
  notesContainer.getElementsByTagName("p"),
  // inputBoxImg,
  container,
  containerH1,
  containerH1Img,
  containerBtn,
  containerBtnImg,
];

function applyStyle(style) {
  elementsToUpdate.forEach((element) => {
    if (element.length > 0) {
      // If it is, iterate over each node
      for (i = 0; i < element.length;i++){
        element[i].classList.remove("style1", "style2", "style3");
        element[i].classList.add(`style${style}`);
      };
    } else {
      // If it's a single element, apply the class name directly
      element.className = `style${style}`;
    }
  });
}

applyStyle(currentStyle);

styleToggle.addEventListener("click", () => {
  currentStyle = (currentStyle % 3) + 1;
  applyStyle(currentStyle);
  localStorage.setItem("currentStyle", currentStyle);
});

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box style"+currentStyle;
  inputBox.setAttribute("contenteditable", "true");
  img.src = "../assets/deleteIcon.png";
  img.className = "input-box-img";
  notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      nt.onkeyup = function () {
        updateStorage();
      };
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

showNotes();