let tasks = JSON.parse(localStorage.getItem("bossTasks")) || [];
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function saveAndRender() {
    localStorage.setItem("bossTasks", JSON.stringify(tasks));
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        if(task.done) li.style.background = "#d4edda";
        li.innerHTML = `<span onclick="doneTask(${index})" style="flex:1; cursor:pointer; ${task.done ? 'text-decoration:line-through; opacity:0.6' : ''}">${task.text}</span>
        <button onclick="editTask(${index})" style="background:#007bff; color:white; border:none; padding:5px 10px; border-radius:5px; margin-right:5px;">✏️</button>
        <button onclick="deleteTask(${index})" style="background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:5px;">X</button>`;
        taskList.appendChild(li);
    });
}

function addTask() {
    let val = taskInput.value.trim();
    if(val === "") return;
    tasks.push({text: val, done: false});
    taskInput.value = "";
    saveAndRender();
}

document.getElementById("addBtn").addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(e){ if(e.key === "Enter") addTask(); });

window.doneTask = function(i){ tasks[i].done = !tasks[i].done; saveAndRender(); }
window.deleteTask = function(i){ tasks.splice(i,1); saveAndRender(); }
window.editTask = function(i){
    let n = prompt("ایڈیٹ کرو باس:", tasks[i].text);
    if(n){ tasks[i].text = n; saveAndRender(); }
}

document.getElementById("modeBtn").onclick = function(){ document.body.classList.toggle("dark"); }

saveAndRender();
