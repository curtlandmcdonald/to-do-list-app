// Retrieve to-do list from local storage or intialize an empty array.
let todo = JSON.parse(localStorage.getItem("todo")) || [];

// Declare constants.
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".addButton");
const deleteButton = document.getElementById("deleteButton");

// Initialize event listener.
document.addEventListener("DOMContentLoaded", function () {
  // Add the task to the to-do list when the Add button is clicked.
  addButton.addEventListener("click", addTask);

  // If Enter key is pressed, add the task to the to-do list.
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent page redirects and refreshes.
      addTask();
    }
  });

  // Delete all tasks on the to-do list when Delete All button is clicked.
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks(); // Display all tasks.
});

// Function to add a task to the to-do list.
function addTask() {
  // Initialize the new task to the user input value with extra whitespace trimmed.
  const newTask = todoInput.value.trim();

  // If new task is not an empty string, push new task onto the to-do list.
  if (newTask !== "") {
    todo.push({
      text: newTask,
      disabled: false,
    });

    saveToLocalStorage(); // Save new task to local storage.
    todoInput.value = ""; // Clear the user input value in the textbox.
    displayTasks(); // Display tasks.
  }
}

// Function to delete all tasks from the to-do list.
function deleteAllTasks() {
  todo = []; // Set to-do list to empty array.
  saveToLocalStorage(); // Save tasks to local storage.
  displayTasks(); // Display tasks.
}

// Function to display tasks on the to-do list.
function displayTasks() {
  // Clear the HTML within the to-do list.
  todoList.innerHTML = "";

  // For each item in the to-do list:
  todo.forEach((item, index) => {
    // Create a new paragraph tag element.
    const p = document.createElement("p");

    // Set the inner HTML of the paragraph tag:
    // - <div> contains <input> and <p> tags.
    // - <input> contains a checkbox that can be clicked to disable/enable tasks.
    // - <p> contains text that can be edited by clicking it.
    p.innerHTML = `
        <div class="todo-container">
            <input 
              type="checkbox" 
              class="todo-checkbox" 
              id="input-${index}" 
              ${item.disabled ? "checked" : ""}
            >
            <p 
              id="todo-${index}" 
              class="${item.disabled ? "disabled" : ""}" 
              onclick="editTask(${index})"
            >
              ${item.text}
            </p>
        </div>
    `;

    // Toggle the task if its checkbox state changes.
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(index);
    });

    // Append task to the to-do list.
    todoList.appendChild(p);
  });

  // Set to-do list item count to to-do list length.
  todoCount.textContent = todo.length;
}

// Function to edit the text within a task.
function editTask(index) {
  // Get existing text and replace with new input.
  const todoItem = document.getElementById(`todo-${index}`); // Get to-do list item via index.
  const existingText = todo[index].text; // Store existing user input text.
  const inputElement = document.createElement("input"); // Create a new input element.
  inputElement.value = existingText; // Set new input to existing user input text.
  todoItem.replaceWith(inputElement); // Replace existing user input text with new input.
  inputElement.focus(); // Focus to-do list item being edited.

  // When a "blur" occurs (focus shifts to task being edited):
  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim(); // Set updated text to new input with whitespace trimmed.

    // If updated text exists:
    if (updatedText) {
      todo[index].text = updatedText; // Set task text to updated text.
      saveToLocalStorage(); // Save task to local storage.
    }

    // Display tasks.
    displayTasks();
  });
}

// Function to toggle tasks as complete/incomplete.
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled; // Set selected task to disabled/enabled.
  saveToLocalStorage(); // Save tasks to local storage.
  displayTasks(); // Display tasks.
}

// Function to save to-do list items to local storage.
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
