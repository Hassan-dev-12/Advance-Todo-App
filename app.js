let tasks = JSON.parse(localStorage.getItem("bossTasksPro")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const addBtn = document.getElementById("addBtn");
const modeBtn = document.getElementById("modeBtn");

function save() { localStorage.setItem("bossTasksPro", JSON.stringify(tasks)); }

function render() {
    taskList.innerHTML = "";
    let filtered = tasks.filter(t => {
        if(currentFilter === "done") return t.done;
        if(currentFilter === "pending") return !t.done;
        return true;
    });
    filtered.forEach((task, index) => {
        let li = document.createElement("li");
        if(task.done) li.classList.add("done");
        li.innerHTML = `<span onclick="toggleDone(${index})" style="cursor:pointer; flex:1">${task.text}</span>
        <div class="task-actions">
        <button class="edit-btn" onclick="editTask(${index})">✏️</button>
        <button class="delete-btn" onclick="deleteTask(${index})">X</button>
        </div>`;
        taskList.appendChild(li);
    });
    let pending = tasks.filter(t => !t.done).length;
    counter.textContent = `${pending} Kaam Baqi Hain Boss, ${tasks.length - pending} Done ✅`;
}

addBtn.onclick = () => {
    if(taskInput.value.trim() === "") return;
    tasks.push({ text: taskInput.value, done: false });
    taskInput.value = ""; save(); render();
}
window.toggleDone = (i) => { tasks[i].done = !tasks[i].done; save(); render(); }
window.deleteTask = (i) => { tasks.splice(i, 1); save(); render(); }
window.editTask = (i) => {
    let newText = prompt("Edit karo Boss:", tasks[i].text);
    if(newText) { tasks[i].text = newText; save(); render(); }
}
window.filterTasks = (type) => {
    currentFilter = type;
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");
    render();
}
modeBtn.onclick = () => { document.body.classList.toggle("dark"); }

render();
