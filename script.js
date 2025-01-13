// @ts-check

const todoInput = document.querySelector("#newTodo");
const todoList = document.querySelector("#todoList");
const todoForm = document.querySelector("form");

/**
 * Reads todo items from the browser's local storage
 * @returns {string[]}
 */
function readTodos() {
  const todosFromLocalStorage = JSON.parse(
    localStorage.getItem("todos") ?? "[]"
  );
  return todosFromLocalStorage;
}

const initialTodos = readTodos();
initialTodos.forEach(createTodoItemHTML);

/**
 * Adds a todo item to the browser's local storage
 * @param {string} todo - The text content for the todo item
 * @returns {void}
 */
function addTodoToLocalStorage(todo) {
  const todos = readTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * Remove a todo item from the browser's local storage
 * @param {number} id - The index of the todo item to remove
 * @returns {void}
 */
function removeTodoFromLocalStorage(id) {
  const todos = readTodos();
  todos.splice(id, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * Creates and appends a new todo item element to the todo list
 * @param {string} todo - The text content for the todo item
 * @returns {void}
 */
function createTodoItemHTML(todo) {
  const todoListItem = document.createElement("li");
  const todoListItemCheckbox = document.createElement("input");
  const todoListItemLabel = document.createElement("label");
  todoListItemCheckbox.type = "checkbox";
  todoListItemCheckbox.name = `todo${todoList.children.length}`;
  todoListItem.dataset.id = todoList.children.length;
  todoListItemLabel.textContent = todo;
  todoListItemLabel.htmlFor = todoListItemCheckbox.name;

  todoListItemCheckbox.addEventListener("change", (e) => {
    // const label = e.target.nextElementSibling;
    // if (e.target.checked) {
    //   label.style.textDecoration = "line-through";
    // } else {
    //   label.style.textDecoration = "none";
    // }

    if (!(e.target instanceof HTMLInputElement) || !e.target.checked) return;

    e.target.disabled = true;

    removeTodoFromLocalStorage(e.target.dataset.id);

    const listItem = e.target.parentElement;

    setTimeout(() => {
      listItem.remove();
    }, 1000);
  });

  todoListItem.appendChild(todoListItemCheckbox);
  todoListItem.appendChild(todoListItemLabel);
  todoList.appendChild(todoListItem);
}

/**
 * Form that adds a new todo item to the todo list
 */
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const todoValue = formData.get("newTodo");

  createTodoItemHTML(todoValue);
  addTodoToLocalStorage(todoValue);
});
