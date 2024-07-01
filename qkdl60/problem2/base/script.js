let todoList = [];
const $addForm = document.querySelector(".addForm");

function addTodo() {
  // 여기에 기능을 구현하세요.
  const $input = document.querySelector("#newTodo");
  if ($input) {
    const inputValue = $input.value.trim();
    if (!inputValue.length) return;
    todoList.push(inputValue);
    $input.value = "";
    $input.focus();
    renderTodos();
  }
}

function deleteTodo(index) {
  // 여기에 기능을 구현하세요.
  const filteredTodos = todoList.filter((todo, idx) => index !== idx);
  todoList = filteredTodos;
  renderTodos();
}

function renderTodos() {
  // 여기에 기능을 구현하세요.
  const $todoList = document.querySelector("#todoList");
  if ($todoList) {
    $todoList.innerHTML = todoList
      .map(
        (todo, idx) => `
    <li class="todo" id="${idx}">
      <div>
        <input type="checkbox"/>
        ${todo}
        <button onclick="deleteTodo(${idx})">delete</button>
      </div>
    </li>`
      )
      .join("");
  }
}
