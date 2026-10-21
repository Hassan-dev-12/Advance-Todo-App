let tasks = JSON.parse(localStorage.getItem("bossTasksPro")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

function save() { 
    localStorage.setItem("bossTasksPro", JSON.stringify(tasks)); 
}

function render() {
    taskList.innerHTML = "";
    let filtered = tasks.filter(t => {
        if(currentFilter === "done") return t.done;
        if(currentFilter === "pending") return !t.done;
        return true;
    });

    filtered.forEach((task, i) => {
        let li = document.createElement("li");
        if(task.done) li.classList.add("done");
        li.innerHTML = `<span onclick="toggleDone(${i})" style="flex:1; cursor:pointer">${task.text}</span>
        <div class="task-actions">
          <button class="edit-btn" onclick="editTask(${i})">✏️</button>
          <button class="delete-btn" onclick="deleteTask(${i})">X</button>
        </div>`;
        taskList.appendChild(li);
    });

    let pending = tasks.filter(t => !t.done).length;
    counter.textContent = `${pending} کام باقی ہیں باس، ${tasks.length - pending} مکمل ✅`;
}

function addTask() {
    let value = taskInput.value.trim();
    if(value === "") return;
    tasks.push({ text: value, done: false });
    taskInput.value = "";
    save();
    render();
}

document.getElementById("addBtn").addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter") addTask();
});

window.toggleDone = (i) => { 
    tasks[i].done = !tasks[i].done; 
    save(); 
    render(); 
}
window.deleteTask = (i) => { 
    tasks.splice(i, 1); 
    save(); 
    render(); 
}
window.editTask = (i) => {
    let newText = prompt("ایڈیٹ کرو باس:", tasks[i].text);
    if(newText) { 
        tasks[i].text = newText; 
        save(); 
        render(); 
    }
}
window.filterTasks = (type, event) => {
    currentFilter = type;
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");
    render();
}

document.getElementById("modeBtn").onclick = () => { 
    document.body.classList.toggle("dark"); 
}

render();
