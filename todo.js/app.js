//variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-tasks");

eventListeners();

function eventListeners() {
  //all event listeners
  form.addEventListener("submit", addTask);
  document.addEventListener("DOMContentLoaded", loadAllTasksToTheUI);
  secondCardBody.addEventListener("click", deleteTask);
  filter.addEventListener("keyup", filterTasks);
  clearButton.addEventListener("click", clearAllTasks);
}

function loadAllTasksToTheUI() {
  let tasks = getTasksFromTheStorage();

  tasks.forEach(function (task) {
    addTaskToTheUI(task);
  });
}
function deleteTask(e) {
  if (e.target.className === "fa fa-remove") {
    console.log("deletion");
    e.target.parentElement.parentElement.remove();
    deleteTaskFromTheStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "task deleted succesfully");
  }
}
function filterTasks(e) {
  const filterValue = e.target.value.toLowerCase;
  const listItems = document.querySelectorAll(".list-group-items");
  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display: none !important");
    } else {
      listItem.setAttribute("style", "display: block");
    }
  });
}
function addTask(e) {
  const newTask = taskInput.value.trim();
  if (newTask === "") {
    /* 
    <div class="alert alert-danger" role="alert">
    This is a danger alert—check it out!
    </div>
    */
    showAlert("danger", "please add a text to your task");
  } else {
    addTaskToTheUI(newTask);
    addTaskToTheStorage(newTask);
    showAlert("success", "task has been added succesfully");
  }
  e.preventDefault();
}
function clearAllTasks(e) {
  if (confirm("do you want to clear all tasks ?")) {
    //clears tasks
    while (taskList.firstElementChild != null) {
      taskList.removeChild(taskList.firstElementChild);
    }
  }
  localStorage.removeItem("tasks");
}

function getTasksFromTheStorage() {
  //get tasks from the local storage
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

function addTaskToTheStorage(newTask) {
  let tasks = getTasksFromTheStorage();
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function deleteTaskFromTheStorage(deleteTask) {
  let tasks = getTasksFromTheStorage();
  tasks.forEach(function (task, index) {
    if (task === deleteTask) {
      tasks.splice(index, 1); //remove value from array
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function showAlert(type, message) {
  const alert = document.createElement("div");
  // alert.className = "alert alert-"+type;
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);
  setTimeout(function () {
    alert.remove();
  }, 1500);
}

function addTaskToTheUI(newTask) {
  // adds string as a list item to the UI
  /* 
 <li class="list-group-item d-flex justify-content-between">
     Task 1
        <a href="#" class="delete-item">
         <i class="fa fa-remove"></i>
        </a>
    </li> 
*/
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class='fa fa-remove'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";
  listItem.appendChild(document.createTextNode(newTask));
  listItem.appendChild(link);
  taskList.appendChild(listItem);
  taskInput.value = "";
}
