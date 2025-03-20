
document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addTaskBtn").addEventListener("click", addTask);

document.getElementById("filter").addEventListener("change", function() {
    let filterValue = this.value;
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        if (filterValue === "all") {
            task.style.display = "flex";
        } else if (filterValue === "completed") {
            task.style.display = task.classList.contains("completed") ? "flex" : "none";
        } else if (filterValue === "notCompleted") {
            task.style.display = task.classList.contains("completed") ? "none" : "flex";
        }
    });
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.textContent = taskText;

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "✔️";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = function() {
        li.classList.toggle("completed");
        saveTasks();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
        saveTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(taskData => {
        let li = document.createElement("li");
        li.textContent = taskData.text;

        let completeBtn = document.createElement("button");
        completeBtn.textContent = "✔️";
        completeBtn.classList.add("complete-btn");
        if (taskData.completed) {
            li.classList.add("completed");
        }

        completeBtn.onclick = function() {
            li.classList.toggle("completed");
            saveTasks();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.textContent.replace("✔️", "").replace("❌", "").trim(),
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

