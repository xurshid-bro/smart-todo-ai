const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');
const aiBox = document.getElementById('ai-suggestion');

const aiSuggestions = [
  "Study Python 30 minutes",
  "Read about Machine Learning",
  "Practice LeetCode problem",
  "Watch KAIST lecture on YouTube",
  "Work on GitHub projects",
  "Learn React.js basics",
  "Do 10 push-ups (stay healthy!)"
];

function addTask(text = null) {
  const taskText = text || input.value.trim();
  if (!taskText) return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  li.querySelector('span').addEventListener('click', () => li.classList.toggle('completed'));
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    saveData();
  });

  list.appendChild(li);
  if (!text) input.value = '';
  saveData();
  showAISuggestion();
}

function showAISuggestion() {
  const random = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
  aiBox.textContent = `AI suggestion: ${random}`;
  aiBox.style.display = 'block';
  setTimeout(() => aiBox.style.display = 'none', 8000);
}

function saveData() {
  const tasks = [];
  document.querySelectorAll('#todoList li span').forEach(span => {
    tasks.push({
      text: span.textContent,
      completed: span.parentElement.classList.contains('completed')
    });
  });
  localStorage.setItem('smartTodoXurshid', JSON.stringify(tasks));
}

function loadData() {
  const data = localStorage.getItem('smartTodoXurshid');
  if (data) {
    JSON.parse(data).forEach(item => {
      addTask(item.text);
      if (item.completed) list.lastChild.classList.add('completed');
    });
  }
}

addBtn.addEventListener('click', () => addTask());
input.addEventListener('keypress', e => { if (e.key === 'Enter') addTask(); });

loadData();
showAISuggestion();
