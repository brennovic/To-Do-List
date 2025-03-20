const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('category');
const taskList = document.getElementById('taskList');
const filterSelect = document.getElementById('filter');

// Carrega tarefas do localStorage ao iniciar
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    const filter = filterSelect.value;
    tasks
        .filter(task => filter === 'Todos' || task.category === filter)
        .forEach((task, index) => addTaskToDOM(task, index));
}

// Adiciona tarefa ao localStorage
function addTask() {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    if (taskText === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, category });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    loadTasks();
}

// Adiciona tarefa ao DOM
function addTaskToDOM(task, index) {
    const li = document.createElement('li');
    li.className = `task ${task.category}`;
    li.innerHTML = `
        ${task.text}
        <button onclick="removeTask(${index})">X</button>
    `;
    taskList.appendChild(li);
}

// Remove tarefa
function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Eventos
document.getElementById('addTaskBtn').addEventListener('click', addTask);
filterSelect.addEventListener('change', loadTasks);
window.onload = loadTasks;
