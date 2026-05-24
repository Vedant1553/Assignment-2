import { saveTasks, loadTasks } from './modules/storage.js';
import { renderTaskList, updateTaskStats } from './modules/render.js';
import { validateTaskInput } from './modules/validation.js';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = loadTasks();
let currentFilter = 'all';

function createTask(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function getFilteredTasks() {

  if (currentFilter === 'active') {
    return tasks.filter(task => !task.completed);
  }

  if (currentFilter === 'completed') {
    return tasks.filter(task => task.completed);
  }

  return tasks;
}

function refreshUI() {
  renderTaskList(taskList, getFilteredTasks());
  updateTaskStats(tasks);
}

refreshUI();

taskForm.addEventListener('submit', (e) => {

  e.preventDefault();

  const validation = validateTaskInput(taskInput.value);

  if (!validation.valid) {
    errorMessage.textContent = validation.message;
    return;
  }

  errorMessage.textContent = '';

  const newTask = createTask(taskInput.value);

  tasks.push(newTask);

  saveTasks(tasks);

  refreshUI();

  taskInput.value = '';
});

taskList.addEventListener('click', (e) => {

  const taskElement = e.target.closest('.task');

  if (!taskElement) return;

  const taskId = Number(taskElement.dataset.id);

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (e.target.classList.contains('delete-btn')) {

    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      tasks.splice(taskIndex, 1);
    }
  }

  if (e.target.type === 'checkbox') {
    tasks[taskIndex].completed = e.target.checked;
  }

  saveTasks(tasks);

  refreshUI();
});

filterButtons.forEach(button => {

  button.addEventListener('click', () => {

    document.querySelector('.filter-btn.active').classList.remove('active');

    button.classList.add('active');

    currentFilter = button.dataset.filter;

    refreshUI();
  });
});