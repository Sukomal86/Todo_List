const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
let editIndex = -1;

// Initialize Todo List on Page Load
document.addEventListener('DOMContentLoaded', loadTodos);
addBtn.addEventListener('click', handleAddOrEdit);

// Load Todos from Local Storage and Render to DOM
function loadTodos() {
    const todos = getLocalTodos();
    todos.forEach(todo => addTodoToDOM(todo));
}

// Handle Add or Edit Action
function handleAddOrEdit() {
    const inputText = inputBox.value.trim();
    if (!inputText) return alert("Please enter a task.");

    if (editIndex >= 0) {
        updateLocalTodo(editIndex, inputText);
        editTodoInDOM(editIndex, inputText);
        resetInput();
    } else {
        saveLocalTodo(inputText);
        addTodoToDOM(inputText);
    }
    resetInput();
}

// Add Todo to DOM
function addTodoToDOM(todoText) {
    const li = document.createElement('li');
    li.innerHTML = `<p>${todoText}</p>
                    <button onclick="prepareEdit('${todoText}')">Edit</button>
                    <button onclick="removeTodo('${todoText}')">Remove</button>`;
    todoList.appendChild(li);
}

// Prepare for Editing an Existing Todo
function prepareEdit(todoText) {
    inputBox.value = todoText;
    addBtn.innerText = 'Edit';
    editIndex = getLocalTodos().indexOf(todoText);
}

// Update Edited Todo in DOM
function editTodoInDOM(index, newText) {
    todoList.children[index].querySelector('p').innerText = newText;
}

// Remove Todo from DOM and Local Storage
function removeTodo(todoText) {
    const todos = getLocalTodos().filter(todo => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Render Todos to DOM
function renderTodos() {
    todoList.innerHTML = '';
    loadTodos();
}

// Local Storage Operations
function getLocalTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function saveLocalTodo(todoText) {
    const todos = getLocalTodos();
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalTodo(index, newText) {
    const todos = getLocalTodos();
    todos[index] = newText;
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Reset Input Field and Button State
function resetInput() {
    inputBox.value = '';
    addBtn.innerText = 'Add';
    editIndex = -1;
}
