// 找到页面上的元素
const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const clearDoneButton = document.getElementById("clearDoneButton");
const todoList = document.getElementById("todoList");

// 从浏览器本地存储读取任务；如果没有保存过，就使用空数组
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 页面打开时，先显示已经保存的任务
renderTodos();

// 点击“添加”按钮时，添加一个新任务
addButton.addEventListener("click", addTodo);

// 在输入框按下回车键时，也添加任务
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

// 点击按钮时，删除所有已经完成的任务
clearDoneButton.addEventListener("click", function () {
  todos = todos.filter(function (todo) {
    return todo.done === false;
  });

  saveTodos();
  renderTodos();
});

function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    alert("请输入任务内容");
    return;
  }

  const newTodo = {
    text: text,
    done: false
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();

  todoInput.value = "";
  todoInput.focus();
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(function (todo, index) {
    // 创建列表项
    const item = document.createElement("li");
    item.className = "todo-item";

    if (todo.done) {
      item.classList.add("done");
    }

    // 创建复选框
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    // 创建任务文字
    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    // 创建删除按钮
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "删除";

    // 勾选时，修改任务状态并保存
    checkbox.addEventListener("change", function () {
      todo.done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    // 点击删除按钮时，删除当前任务
    deleteButton.addEventListener("click", function () {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    item.appendChild(checkbox);
    item.appendChild(span);
    item.appendChild(deleteButton);
    todoList.appendChild(item);
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
