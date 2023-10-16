// On app load, get all tasks from localStorage
window.onload = loadTasks;

// On form submit add task
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});

function loadTasks() {
  // check if localStorage has any tasks
  // if not then return
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? "checked" : ""}>
          <input type="text" value="${task.task}" class="task ${task.completed ? "completed" : ""}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  // return if task is empty
  if (task.value === "") {
    alert("Please add some task!");
    return false;
  }
  // check is task already exist
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task already exist!");
    return false;
  }

  // add task to local storage
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
  list.insertBefore(li, list.children[0]);
  // clear input
  task.value = "";
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}


function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  
    tasks.forEach((task, index) => {
      if (task.task === event.parentNode.children[1].value) {
        // Delete task from the array
        tasks.splice(index, 1);
      }
    });
  
    // Update local storage after removing the task
    localStorage.setItem("tasks", JSON.stringify(tasks));
  
    // Remove the task element from the list
    event.parentElement.remove();
  }

  function editTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  
    // Get the current task and the edited task
    const currentTaskValue = currentTask;
    const editedTaskValue = event.value;
  
    // Check if the edited task is empty or already exists
    if (editedTaskValue === "") {
      alert("Task is empty!");
      event.value = currentTaskValue;
      return;
    }
  
    const existingTask = tasks.find(task => task.task === editedTaskValue);
    if (existingTask && existingTask.task !== currentTaskValue) {
      alert("Task already exists!");
      event.value = currentTaskValue;
      return;
    }
  
    // Update the task in the local storage
    tasks.forEach(task => {
      if (task.task === currentTaskValue) {
        task.task = editedTaskValue;
      }
    });
  
    // Save the updated tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  
    // Update the currentTask variable
    currentTask = editedTaskValue;
  }
  