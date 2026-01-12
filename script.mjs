const TODOS_KEY = 'todos_v1';
const form = document.getElementById('todo-form');
const input = document.querySelector('.userInput');
const result = document.querySelector('.result');

let todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');

const saveTodos = () => localStorage.setItem(TODOS_KEY, JSON.stringify(todos));

const createTodoElement = (todo) => {
  const div = document.createElement('div');
  div.className = 'singleTodo';
  div.dataset.id = todo.id;

  const p = document.createElement('p');
  p.textContent = todo.text;

  const btnDelete = document.createElement('button');
  btnDelete.className = 'delete';
  btnDelete.textContent = 'Delete';

  const btnEdit = document.createElement('button');
  btnEdit.className = 'edit';
  btnEdit.textContent = 'Edit';

  div.append(p, btnDelete, btnEdit);
  return div;
};

const renderTodos = () => {
  result.innerHTML = '';
  todos.forEach((todo) => result.appendChild(createTodoElement(todo)));
};

const add_todo = (event) => {
  event.preventDefault();
  const userInput = input.value.trim();
  if (!userInput) return;

  const todo = { id: String(Date.now()), text: userInput };
  todos.push(todo);
  saveTodos();

  result.appendChild(createTodoElement(todo));
  input.value = '';
};

const handleResultClick = (event) => {
  const target = event.target;

  if (target.classList.contains('delete')) {
    const item = target.parentNode;
    const id = item.dataset.id;
    todos = todos.filter((t) => t.id !== id);
    saveTodos();

    item.classList.add('removing');
    item.addEventListener('animationend', () => item.remove(), { once: true });
  } else if (target.classList.contains('edit')) {
    const item = target.parentNode;
    const p = item.querySelector('p');
    const newText = prompt('Enter new updated text', p.textContent);
    if (newText && newText.trim()) {
      p.textContent = newText.trim();
      const id = item.dataset.id;
      const t = todos.find((t) => t.id === id);
      if (t) {
        t.text = p.textContent;
        saveTodos();
      }
      p.classList.add('highlight');
      p.addEventListener('animationend', () => p.classList.remove('highlight'), { once: true });
    }
  }
};

form.addEventListener('submit', add_todo);
result.addEventListener('click', handleResultClick);

// initial render
renderTodos();
