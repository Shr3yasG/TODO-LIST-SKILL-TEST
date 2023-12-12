// Initializing an empty array to store tasks
let tasks = [];

// getting DOM elements
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");
const button = document.getElementById("add-btn");
const deleteAll = document.getElementById("delete-all");
var comptask = 0;
var completedtask = document.getElementById("c-count");

//function to add a task to the DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${
    task.done ? "checked" : ""
  } class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="image/trash-solid.svg" class="delete" data-id="${task.id}" />
    `;
  taskList.append(li);
}

// function to render the task list
function renderList() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDOM(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

// function to mark a task as complete
function markTaskAsComplete(taskId) {
  const task = tasks.filter(function (task) {
    return task.id === taskId;
  });
  if (task.length > 0) {
    const currentTask = task[0];
    if (currentTask.done) {
      currentTask.done = false;
      comptask--;
    } else {
      currentTask.done = true;
      comptask++;
    }
    renderList();
    completedtask.innerHTML = comptask;
    showNotification("Task marked successfully");
  } else {
    showNotification("Could not mark the task");
  }
}

// function to delete a task
function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  tasks = newTasks;
  renderList();
  showNotification("Task deleted successfully");
  if (comptask > 0) {
    comptask--;
    completedtask.innerHTML = comptask;
  }
}

//function to add a task to the tasks array
function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added successfully");
    return;
  } else {
    showNotification("Task cannot be added");
  }
}

// function to show a notification to the user
function showNotification(text) {
  alert(text);
}

// function to handle keypress and mousedown events on the input field
function handleInputKeypress(e) {
  if (e.key == "Enter" || e.type == "mousedown") {
    const text = addTaskInput.value;
    if (!text) {
      showNotification("Task text cannot be empty");
      return;
    }
    const task = {
      text,
      id: Date.now().toString(),
      done: false,
    };
    addTaskInput.value = ""; // Use addTaskInput instead of e.target
    addTask(task);
  }
}

function handleClickListener(e) {
  const target = e.target;
  if (target.className === "delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className === "custom-checkbox") {
    const taskId = target.id;
    markTaskAsComplete(taskId);
    return;
  }
}

// function to delete all task
function clearAll() {
  tasks = [];
  renderList();
  showNotification("All tasks cleared successfully");
  completedtask.innerHTML = 0;
}

// Filter button

// get filter DOM
const allLink = document.getElementById("all");
const remLink = document.getElementById("rem");
const comLink = document.getElementById("com");

// add event listeners to DOM
allLink.addEventListener("click", showAllTasks);
remLink.addEventListener("click", showUncompletedTasks);
comLink.addEventListener("click", showCompletedTasks);

// function to show all tasks
function showAllTasks() {
  allLink.classList.add("active");
  remLink.classList.remove("active");
  comLink.classList.remove("active");
  const tasks = document.querySelectorAll("#list li");
  tasks.forEach((task) => {
    task.style.display = "flex";
    console.log(task);
  });
}

// function to show uncompleted tasks
function showUncompletedTasks() {
  allLink.classList.remove("active");
  remLink.classList.add("active");
  comLink.classList.remove("active");
  const tasks = document.querySelectorAll("#list li");
  tasks.forEach((task) => {
    const checkbox = task.querySelector(".custom-checkbox");
    if (checkbox.checked) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  });
}

// function to show completed tasks
function showCompletedTasks() {
  allLink.classList.remove("active");
  remLink.classList.remove("active");
  comLink.classList.add("active");
  const tasks = document.querySelectorAll("#list li");
  tasks.forEach((task) => {
    const checkbox = task.querySelector(".custom-checkbox");
    if (checkbox.checked) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

// function containing all eventlistner

function initializeApp() {
  document.addEventListener("click", handleClickListener);
  button.addEventListener("mousedown", handleInputKeypress); // Change event listener to 'mousedown'
  deleteAll.addEventListener("click", clearAll);
}

// Initialize app
initializeApp();
