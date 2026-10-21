const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("bossTasks")) || [];

function makeLink(text) {
  if (text.includes(".com") || text.includes(".pk") || text.includes("www") || text.includes(".org")) {
    let url = text.startsWith("http") ? text : "https://" + text;
    return `<a href="${url}" target="_blank" style="color:#007bff; text-decoration:underline;">${text}</a>`;
  }
  return text;
}

function saveAndRender() {
    localStorage.setItem("bossTasks", JSON.stringify(tasks));
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        if(task.done) li.style.background = "#d4edda";
        li.innerHTML = `<span onclick="doneTask(${index})" style="flex:1; cursor:pointer; ${task.done ? 'text-decoration:line-through' : ''}">${makeLink(task.text)}</span> <button onclick="editTask(${index})" style="background:#007bff; color:white; border:none; padding:5px 10px; border-radius:5px; margin-left:5px;">✏️</button> <button onclick="deleteTask(${index})" style="background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:5px; margin-left:5px;">X</button>`;
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

function doneTask(index) {
    tasks[index].done = !tasks[index].done;
    saveAndRender();
}

function editTask(index) {
    let newVal = prompt("Edit Task:", tasks[index].text);
    if(newVal !== null && newVal.trim() !== "") {
        tasks[index].text = newVal.trim();
        saveAndRender();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

saveAndRender();
