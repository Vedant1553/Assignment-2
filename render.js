function escapeHTML(str) {

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderTaskList(taskListElement, tasks) {

  taskListElement.innerHTML = '';

  if (tasks.length === 0) {

    taskListElement.innerHTML = `
      <li class="empty-state">
        <p>No tasks available</p>
        <span>Add your first task!</span>
      </li>
    `;

    return;
  }

  tasks.forEach(task => {

    const taskElement = document.createElement('li');

    taskElement.className = `task ${task.completed ? 'completed' : ''}`;

    taskElement.dataset.id = task.id;

    taskElement.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${escapeHTML(task.text)}</span>
      </label>

      <div class="task-actions">
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    taskListElement.appendChild(taskElement);
  });
}

export function updateTaskStats(tasks) {

  document.getElementById('total-tasks').textContent = tasks.length;

  const completedTasks = tasks.filter(task => task.completed).length;

  document.getElementById('completed-tasks').textContent = completedTasks;
}