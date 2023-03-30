// DOM Elements
const dot = document.querySelector(".dot");
const time = document.querySelector(".time");
const tdGui = document.querySelector(".gui-app");
const taskBox = document.querySelector(".task-box");
const clearAll = document.querySelector(".clear-btn");
const container = document.querySelector(".container");
const greetName = document.querySelector(".greet-name");
const shutdownImg = document.querySelector(".shutdown");
const filters = document.querySelectorAll(".filters span");
const application = document.querySelector(".application");
const todoTaskbar = document.querySelector(".todo-taskbar");
const blackScreen = document.querySelector(".black-screen");
const closeApp = document.querySelector(".exit-application");
const taskInput = document.querySelector(".task-input input");
const shutdownName = document.querySelector(".shutdown-name");
const shutdownBlackscreen = document.querySelector(".shutdown-bscreen");


// Keypress listener to run signinAnimation function
window.addEventListener("keydown", signinAnimation);

// Application double click listener to show App GUI and Icon from the taskbar
application.addEventListener("dblclick", appGUI);

// Application click listener to close the App GUI and Icon from the taskbar
closeApp.addEventListener("click", hideappGUI);

// Function when power icon is click
shutdownImg.addEventListener("dblclick", shutdownBscreen);

// Declaring other variables and getting local storage todo-list
let editId;
let isEditTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));

// Functions for filtering task
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

// Functions for showing task inputted
function showTodo(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        liTag += 
                `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                        <p class="${completed}">${todo.name}</p>
                    </label>
                    <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                            <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
      }
    });
  }
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length
    ? clearAll.classList.remove("active")
    : clearAll.classList.add("active");
    taskBox.offsetHeight >= 100
    ? taskBox.classList.add("overflow")
    : taskBox.classList.remove("overflow");
}

// Calling show task function
showTodo("all");

// Menu functions
function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

// Update task functions
function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Edit task functions
function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add("active");
}

// Delete task functions
function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filter);
}

// Clear all task functions
clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

// Function when inputted task and pressed enter
taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
  }
});

// Combination of Animations
function signinAnimation() {
  animateBlackscreen();
  setTimeout(hideBlackscreen, 700);
  setTimeout(showContainer, 700);
}

// Shutdown animation
function shutdownBscreen() {
  setTimeout(hideContainer, 700);
  setTimeout(showBlackscreen, 800);
  setTimeout(landingPage, 3000);
}

// AM or PM
const showAmPm = true;

// Function for time
function showTime() {
  let today = new Date();

  // Declaring time as variables
  let hrs = today.getHours();
  let mins = today.getMinutes();

  // Set AM or PM
  const amPM = hrs >= 12 ? "PM" : "AM";

  // 12 hours format
  hrs = hrs % 12 || 12;

  // Output time
  time.innerHTML = `${hrs}:${addZero(mins)} ${showAmPm ? amPM : ""}`;
  setTimeout(showTime, 1000);
}

// Add zeros for time
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Run Date and Time
showTime();

// Run Greetings!
showName();

function animateBlackscreen() {
  blackScreen.classList.add("animate-hide-blackscreen");
}

function hideBlackscreen() {
  blackScreen.classList.add("hide-blackscreen");
}

function showContainer() {
  container.classList.add("show-container");
}

function hideContainer() {
  container.classList.remove("show-container");
  container.classList.add("hide-container");
}

// Function for showing the App GUI and App icon from taskbar
function appGUI() {
  todotbShow();
  tdshowApp();
}

function todotbShow() {
  todoTaskbar.classList.add("show-icon");
}

function tdshowApp() {
  tdGui.classList.add("todo-show-app");
}

// Function for hiding the App GUI and App icon from taskbar
function hideappGUI() {
  todotbHide();
  tdhideApp();
}

function todotbHide() {
  todoTaskbar.classList.add("hide-icon");
}

function tdhideApp() {
  tdGui.classList.add("todo-hide-app");
}

function showName() {
  greetName.innerHTML = `Hello, ${localStorage.getItem("textvalue")}!`;
}

function showBlackscreen() {
  shutdownBlackscreen.classList.add("show-shutdown-bscreen");
}

function landingPage() {
  window.location.replace("./index.html");
}
