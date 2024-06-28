const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    capsKey: null,
  },

  properties: {
    value: "",
    capsLock: false,
    keyboardInputs: null,
    keyLayout: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ],
  },

  init() {
    // create and setup main element
    this.elements.main = document.createElement("div");
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    document.body.appendChild(this.elements.main);

    // create and setup child container component
    this.elements.keysContainer = document.createElement("div");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.main.appendChild(this.elements.keysContainer);

    // create and setup key elements
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // open keyboard for elements with .use-keyboard-input
    this.properties.keyboardInputs = document.querySelectorAll(
      ".use-keyboard-input"
    );
    this.properties.keyboardInputs.forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createIconHTML(icon_name) {
    return `<span class="material-icons">${icon_name}</span>`;
  },

  _createKeyBtn(iconName, class1, onclick, class2) {
    this.keyElement = document.createElement("button");

    // add common attributes and classes
    this.keyElement.setAttribute("type", "button");
    this.keyElement.classList.add("keyboard__key");

    // add specific listeners and classes
    this.keyElement.classList.add(class1, class2);
    this.keyElement.innerHTML = this._createIconHTML(iconName);
    this.keyElement.addEventListener("click", onclick);
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    this.properties.keyLayout.forEach((key) => {
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      switch (key) {
        case "backspace":
          this._createKeyBtn("backspace", "keyboard__key--wide", () => {
            this.properties.value = this.properties.value.slice(0, -1);
            this._updateValueInTarget();
          });
          break;

        case "caps":
          this._createKeyBtn(
            "keyboard_capslock",
            "keyboard__key--activatable",
            () => {
              this.elements.capsKey.classList.toggle("keyboard__key--active");
              this._toggleCapsLock();
            },
            "keyboard__key--wide"
          );
          this.elements.capsKey = this.keyElement;
          break;

        case "enter":
          this._createKeyBtn("keyboard_return", "keyboard__key--wide", () => {
            this.properties.value += "\n";
            this._updateValueInTarget();
          });
          break;

        case "space":
          this._createKeyBtn("space_bar", "keyboard__key--extra--wide", () => {
            this.properties.value += " ";
            this._updateValueInTarget();
          });
          break;

        case "done":
          this._createKeyBtn(
            "check_circle",
            "keyboard__key--dark",
            () => {
              this.close();
              this._updateValueInTarget();
            },
            "keyboard__key--wide"
          );
          break;

        default:
          this._createKeyBtn();
          this.keyElement.textContent = key.toLowerCase();

          this.keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._updateValueInTarget();
          });
          break;
      }

      fragment.appendChild(this.keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  },

  _updateValueInTarget() {
    this.properties.keyboardInputs.forEach((keyboard) => {
      keyboard.value = this.properties.value;
    });
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (let key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput) {
    this.properties.value = initialValue || "";
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = this.properties.value;
    this.elements.main.classList.add("keyboard--hidden");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

// const notesContainer = document.querySelector(".notes-container");
// const createBtn = document.querySelector(".btn");
// let notes = document.querySelectorAll(".input-box");

// // Get references to the relevant elements
// const styleToggle = document.getElementById("style-toggle");
// const container = document.getElementById("container");
// const containerH1 = document.getElementById("container-h1");
// const containerH1Img = document.getElementById("container-h1-img");
// const containerBtn = document.getElementById("container-button");
// const containerBtnImg = document.getElementById("container-button-img");

// // Initialize with the default style and set new style upon click event
// let currentStyle = parseInt(localStorage.getItem("currentStyle")) || 3;

// const elementsToUpdate = [
//   notesContainer.getElementsByTagName("p"),
//   container,
//   containerH1,
//   containerH1Img,
//   containerBtn,
//   containerBtnImg,
// ];

// function applyStyle(style) {
//   elementsToUpdate.forEach((element) => {
//     if (element.length >= 0) {
//       for (i = 0; i < element.length; i++) {
//         element[i].classList.remove("style1", "style2", "style3");
//         element[i].classList.add(`style${style}`);
//       }
//     } else {
//       element.className = `style${style}`;
//     }
//   });
// }

// styleToggle.addEventListener("click", () => {
//   currentStyle = (currentStyle % 3) + 1;
//   applyStyle(currentStyle);
//   localStorage.setItem("currentStyle", currentStyle);
// });

// function showNotes() {
//   notesContainer.innerHTML = localStorage.getItem("notes");
// }

// function updateStorage() {
//   localStorage.setItem("notes", notesContainer.innerHTML);
// }

// createBtn.addEventListener("click", () => {
//   let inputBox = document.createElement("p");
//   let img = document.createElement("img");
//   inputBox.className = "input-box style" + currentStyle;
//   inputBox.setAttribute("contenteditable", "true");
//   img.src = "../assets/deleteIcon.png";
//   img.className = "input-box-img";
//   notesContainer.appendChild(inputBox).appendChild(img);
// });

// notesContainer.addEventListener("click", function (e) {
//   if (e.target.tagName === "IMG") {
//     e.target.parentElement.remove();
//     updateStorage();
//   } else if (e.target.tagName === "P") {
//     notes = document.querySelectorAll(".input-box");
//     notes.forEach((nt) => {
//       nt.onkeyup = function () {
//         updateStorage();
//       };
//     });
//   }
// });

// document.addEventListener("keydown", (event) => {
//   if (event.key === "Enter") {
//     document.execCommand("insertLineBreak");
//     event.preventDefault();
//   }
// });

// showNotes();
// applyStyle(currentStyle);
