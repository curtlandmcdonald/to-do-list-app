// Retrieve to-do list from local storage or intialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];

// Declare constants
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  // Call addTask() when addButton is clicked
  addButton.addEventListener("click", addTask);

  // If Enter key is pressed, call addTask()
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Prevent page redirects and refreshes
      event.preventDefault();
      addTask();
    }
  });

  // Call deleteAllTasks() when deleteButton is clicked
  deleteButton.addEventListener("click", deleteAllTasks);

  // Display all tasks
  displayTasks();
});

// Function to add a task to the to-do list
function addTask() {
  // Initialize newTask to the todoInput value with extra whitespace trimmed
  const newTask = todoInput.value.trim();

  // If newTask is not an empty string, push newTask onto the to-do list
  if (newTask !== "") {
    todo.push({
      text: newTask,
      disabled: false,
    });

    // Save to local storage
    saveToLocalStorage();

    // Clear the todoInput value
    todoInput.value = "";

    // Display tasks
    displayTasks();
  }
}

// Function to delete all tasks from the to-do list
function deleteAllTasks() {
  //
  todo = [];

  //
  saveToLocalStorage();

  //
  displayTasks();
}

// Function to display tasks on the to-do list
function displayTasks() {
  //
  todoList.innerHTML = "";

  //
  todo.forEach((item, index) => {
    //
    const p = document.createElement("p");

    //
    p.innerHTML = `
        <div class="todo-container">
            <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
            <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
        </div>
    `;

    //
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(index);
    });

    //
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

//
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

//
function toggleTask(index) {
  //
  todo[index].disabled = !todo[index].disabled;

  //
  saveToLocalStorage();

  //
  displayTasks();
}

// Function to save to-do list items to local storage
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
