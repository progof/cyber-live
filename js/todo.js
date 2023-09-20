const categorySelect = document.getElementById("category-select");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const completedCount = document.getElementById("completed-number");

let completedTasks = 0;

addButton.addEventListener("click", addTask);

function addTask() {
    const category = categorySelect.value;
    const taskText = taskInput.value;
    
    if (taskText.trim() !== "") {
        const taskItem = document.createElement("li");
        taskItem.className = category;
        taskItem.innerHTML = `<span>${taskText}</span> <button class="delete-button">Delete</button>`;
        
        taskList.appendChild(taskItem);
        taskInput.value = "";
        
        taskItem.querySelector(".delete-button").addEventListener("click", () => {
            if (taskItem.classList.contains("completed")) {
                completedTasks--;
                updateCompletedCount();
            }
            taskList.removeChild(taskItem);
        });

        taskItem.querySelector("span").addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            if (taskItem.classList.contains("completed")) {
                completedTasks++;
            } else {
                completedTasks--;
            }
            updateCompletedCount();
        });
    }else {
        alert("Please Enter Task");
    }
}

function updateCompletedCount() {
    completedCount.textContent = completedTasks;
}