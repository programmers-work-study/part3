// 할 일 데이터를 저장할 배열
let todos = [];

// 새로운 할 일 추가
function addTodo() {
  const newTodoInput = document.getElementById("newTodo");
  const newTodoText = newTodoInput.value.trim();

  if (newTodoText !== "") {
    // 빈값일때는 추가 못하게하기
    todos.push({ text: newTodoText, completed: false });
    newTodoInput.value = "";
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// 체크박스 만들고 한번에 삭제버튼 만들기
function deleteCompletedTodos() {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
}

function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <div>
        <input type="checkbox" ${
          todo.completed ? "checked" : ""
        } onchange="toggleTodo(${index})">
        <span class="todo-text ${todo.completed ? "completed" : ""}">${
      todo.text
    }
        </span>
    </div>
      <button onclick="deleteTodo(${index})">삭제</button>
    `;
    todoList.appendChild(li);
  });
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}
