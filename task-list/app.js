// Define our UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
// console.log(form)
// console.log(taskList)

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add Task Event
  form.addEventListener("submit", addTask);

  //  Remove task from the list
  taskList.addEventListener("click", deleteTask);

  // Remove all tasks from list
  clearBtn.addEventListener("click", clearTasks);

  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if(localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    //Create li element
    const li = document.createElement("li");
    //Add Class
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    // append the link to the li
    li.appendChild(link);

    // Store task in local storage
    // storeTaskInLocalStorage(link);

    // checks to see if the task input is empty
    // and if not then adds the task to the list

    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("please add a task");
    
  }

  //Create li element
  const li = document.createElement("li");
  //Add Class
  li.className = "collection-item";
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // add icon html
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  // append the link to the li
  li.appendChild(link);

  // Store task in local storage
  storeTaskInLocalStorage(taskInput.value);

  // checks to see if the task input is empty
  // and if not then adds the task to the list

  taskList.appendChild(li);

  // clear input
  taskInput.value = "";

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) e.target.parentElement.parentElement.remove();

    // Calling function that removes a task from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Removes task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  console.log(taskItem.textContent);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  taskList.innerHTML = "";
  
  clearTasksFromLocalStorage(); 
}

function clearTasksFromLocalStorage() {
  localStorage.clear(); 

}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    console.log(task);
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
