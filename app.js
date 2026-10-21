const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const themeBtn = document.getElementById('modeBtn');
const searchInput = document.getElementById('searchInput');

let tasks = JSON.parse(localStorage.getItem('bossTasks')) || [];
let searchQuery = "";

// لنک کو نیلا بنانے والا جادو
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
    // سرچ والا فلٹر
    if (task.text.toLowerCase().includes(searchQuery.toLowerCase())) {
      const li = document.createElement('li');
      li.style.cssText = "display:flex; justify-content:space-between; align-items:center; margin-top:8px; background:#f2f2f2; padding:10px; border-radius:8px;";
      li.innerHTML = `
        <span style="word-break:break-all;">${makeLink(task.text)}</span>
        <div style="display:flex; gap:5px;">
          <button onclick="editTask(${index})" style="cursor:pointer;">✏️</button>
          <button onclick="deleteTask(${index})" style="cursor:pointer;">❌</button>
        </div>
      `;
      taskList.appendChild(li);
    }
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

// بٹنوں کے ایونٹ
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  render();
});

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

render();
