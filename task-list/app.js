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
  // Add Task Event
  form.addEventListener("submit", addTask);

  //  Remove task from the list
  taskList.addEventListener("click", deleteTask);

  // Remove all tasks from list
  clearBtn.addEventListener("click", clearTasks);

  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
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

  // checks to see if the task input is empty
  // and if not then adds the task to the list

  taskList.appendChild(li);

  // clear input
  taskInput.value = "";

  e.preventDefault();
}

function deleteTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) e.target.parentElement.parentElement.remove();
  }
}

function clearTasks() {
  taskList.innerHTML = "";
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task) {
        const item = task.firstChild.textContent; 
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'; 
        } else {
            task.style.display = 'none'; 
        }
    });
}
