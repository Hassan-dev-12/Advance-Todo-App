const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const themeBtn = document.getElementById('modeBtn');

let tasks = JSON.parse(localStorage.getItem('bossTasks')) || [];

function makeLink(text) {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-z0-9-]+\.(com|net|org|pk|io|co|app)(\/[^\s]*)?)/gi;
  return text.replace(urlRegex, (url) => {
    let href = url;
    if (!href.startsWith('http')) {
      href = 'https://' + href;
    }
    return `<a href="${href}" target="_blank" style="color:#0d6efd; text-decoration:underline; font-weight:bold;">${url}</a>`;
  });
}

function save() {
  localStorage.setItem('bossTasks', JSON.stringify(tasks));
}

function render() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.style.cssText = "display:flex; justify-content:space-between; margin-top:8px; background:#f2f2f2; padding:8px; border-radius:6px;";
    li.innerHTML = `
      <span>${makeLink(task.text)}</span>
      <div>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;
  tasks.push({ text: text });
  taskInput.value = '';
  save();
  render();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  save();
  render();
}

function editTask(i) {
  const newText = prompt("Edit karo boss:", tasks[i].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[i].text = newText.trim();
    save();
    render();
  }
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

render();
