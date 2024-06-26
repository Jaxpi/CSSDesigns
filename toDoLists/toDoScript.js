// Displays current date and time on page
window.setInterval(function () {
  $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
}, 1000);

// Get references to the relevant elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-text");
const todoList = document.getElementById("todo-list");
const styleToggle = document.getElementById("style-toggle");
const styleContainer = document.getElementById("container1");
const styleJumbotron = document.getElementById("jumbotron");
const styleDate = document.getElementById("currentDay");

// Initialize with the default style and set new style upon click event
let currentStyle = parseInt(localStorage.getItem("currentStyle")) || 1;

const elementsToUpdate = [
  styleContainer,
  todoList,
  todoForm,
  todoInput,
  styleJumbotron,
  styleDate,
];

function applyStyle(style) {
  elementsToUpdate.forEach((element) => {
    element.className = `style${style}`;
  });
}

applyStyle(currentStyle);

styleToggle.addEventListener("click", () => {
  currentStyle = (currentStyle % 3) + 1;
  applyStyle(currentStyle);
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach((button) => {
    button.className = "close";
    button.classList.remove("style1", "style2", "style3");
    button.classList.add(`style${currentStyle}`);
    localStorage.setItem(`buttonStyle${button.id}`, currentStyle)
  });
  localStorage.setItem("currentStyle", currentStyle);
  console.log("current style: ", `style${currentStyle}`)
});

// Load existing items from local storage (if any)
const savedItems = JSON.parse(localStorage.getItem("todoItems")) || [];

// Function to render the list items
function renderTodoItems() {
  todoList.innerHTML = "";
  savedItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.text;
    li.dataset.index = index;
    li.draggable = true; // Make the list item draggable

    // Add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.className = "close";
    deleteButton.id = "delete-button";
    const storedStyle = localStorage.getItem(`buttonStyle${deleteButton.id}`);
  if (storedStyle) {
    deleteButton.classList.add(`style${storedStyle}`);
  }
    deleteButton.addEventListener("click", deleteTodoItem);
    li.appendChild(deleteButton);
    // Mark as checked if needed
    if (item.checked) {
      li.classList.add("checked");
    }

    // Toggle checked state on click
    li.addEventListener("click", toggleChecked);

    // Add drag-and-drop event listeners
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragover", handleDragOver);
    li.addEventListener("drop", handleDrop);

    todoList.appendChild(li);
  });
}

// Function to add a new item
function addTodoItem(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    savedItems.push({ text, checked: false });
    localStorage.setItem("todoItems", JSON.stringify(savedItems));
    renderTodoItems();
    todoInput.value = "";
  }
}

// Function to delete an item
function deleteTodoItem(e) {
  e.stopPropagation();
  const index = e.target.closest("li").dataset.index;
  savedItems.splice(index, 1);
  localStorage.setItem("todoItems", JSON.stringify(savedItems));
  renderTodoItems();
}

// Function to toggle checked state
function toggleChecked(e) {
  const index = e.target.closest("li").dataset.index;
  savedItems[index].checked = !savedItems[index].checked;
  localStorage.setItem("todoItems", JSON.stringify(savedItems));
  renderTodoItems();
}

// Drag-and-drop event handlers
let draggedItemIndex = null;

function handleDragStart(e) {
  draggedItemIndex = parseInt(e.target.dataset.index);
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const targetIndex = parseInt(e.target.dataset.index);
  if (draggedItemIndex !== targetIndex) {
    const [movedItem] = savedItems.splice(draggedItemIndex, 1);
    savedItems.splice(targetIndex, 0, movedItem);
    localStorage.setItem("todoItems", JSON.stringify(savedItems));
    renderTodoItems();
  }
}

// Event listener for form submission
todoForm.addEventListener("submit", addTodoItem);

// Initial rendering
renderTodoItems();