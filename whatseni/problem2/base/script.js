let idx = 0;
let todoList = new Map();
function addTodo() {
  const value = document.getElementById('newTodo').value;
  const key = idx++;
  if (!todoList.has(key)) todoList.set(key, value);
  document.getElementById('newTodo').value = "";
  renderTodos();
}

function deleteTodo(index) {
  if (todoList.has(index)) todoList.delete(index);
  renderTodos();
}

function renderTodos() {
  const todoEl = document.getElementById('todoList');
  todoEl.innerHTML = "";
  todoList.forEach((value, key) => {
    const appendEl = document.createElement('li');
    appendEl.className = "todo";
    const temp = `
      <span>${value}</span>
      <button onclick="deleteTodo(${key})">delete</button>
    `;
    appendEl.innerHTML = temp;
    todoEl.appendChild(appendEl);
  })
}

renderTodos();