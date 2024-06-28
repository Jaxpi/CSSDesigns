let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", (event) => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle,
  });
}

const styleToggle = document.getElementById("style-toggle");
let currentStyleIndex = 0;

styleToggle.addEventListener("click", () => {
  const keyboard = document.querySelector(".simple-keyboard");
  const keyboardKeys = document.querySelectorAll(".hg-button");

  // Remove all previous styles
  for (let i = 0; i < 3; i++) {
    keyboard.classList.remove(`style${i + 1}`);
    keyboardKeys.forEach((key) => key.classList.remove(`style${i + 1}`));
  }

  currentStyleIndex = (currentStyleIndex + 1) % 3;
  const currentStyle = `style${currentStyleIndex + 1}`;

  // Apply the new style
  keyboard.classList.add(currentStyle);
  keyboardKeys.forEach((key) => key.classList.add(currentStyle));

  // Check if it's the 3rd click
  if (currentStyleIndex === 2) {
    // Reset to the beginning style
    currentStyleIndex = 0;
    keyboard.classList.remove(`style3`);
    keyboard.classList.add(`style1`);
    keyboardKeys.forEach((key) => {
      key.classList.remove(`style3`);
      key.classList.add(`style1`);
    });
    const styleToggle = document.getElementById("style-toggle");
    let currentStyleIndex = 0;

    styleToggle.addEventListener("click", () => {
      const keyboard = document.querySelector(".keyboard");
      const keyboardKeys = document.querySelectorAll(".keyboard__key");

      // Remove all previous styles
      for (let i = 0; i < 3; i++) {
        keyboard.classList.remove(`style${i + 1}`);
        keyboardKeys.forEach((key) => key.classList.remove(`style${i + 1}`));
      }

      currentStyleIndex = (currentStyleIndex + 1) % 3;
      const currentStyle = `style${currentStyleIndex + 1}`;

      // Apply the new style
      keyboard.classList.add(currentStyle);
      keyboardKeys.forEach((key) => key.classList.add(currentStyle));

      // Check if it's the 3rd click
      if (currentStyleIndex === 2) {
        // Reset to the beginning style
        currentStyleIndex = 0;
        keyboard.classList.remove(`style3`);
        keyboard.classList.add(`style1`);
        keyboardKeys.forEach((key) => {
          key.classList.remove(`style3`);
          key.classList.add(`style1`);
        });
      }
    });
  }
});
