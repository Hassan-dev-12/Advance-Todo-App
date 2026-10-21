let todos = JSON.parse(localStorage.getItem("bossTodos")) || [];

function render() {
    let list = document.getElementById("todoList");
    list.innerHTML = "";
    todos.forEach((todo, index) => {
        list.innerHTML += `<li>${todo} <span onclick="delTodo(${index})" style="color:red;cursor:pointer;font-weight:bold;">X</span></li>`;
    });
    localStorage.setItem("bossTodos", JSON.stringify(todos));
}

function addTodo() {
    let input = document.getElementById("todoInput");
    if (input.value.trim() === "") return;
    todos.push(input.value);
    input.value = "";
    render();
}

function delTodo(i) {
    todos.splice(i, 1);
    render();
}

function toggleMode() {
    document.body.classList.toggle("dark");
}

render();
