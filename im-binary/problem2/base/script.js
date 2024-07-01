const todos = [];

const input = document.getElementById("newTodo");
const todoList = document.getElementById("todoList");

function addTodo() {
  todos.push(input.value);
  input.value = '';
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = todos.map((todo, index) => {
    return `<li class="todo">
      <span>${todo}</span>
      <button onclick="deleteTodo(${index})">삭제</button>
    </li>`;
  }).join('');
}
