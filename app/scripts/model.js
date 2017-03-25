
// VARIABLES
var inputText = $("#todoText"),
    enterBtn = $("#enterBtn"),
    todosList = $("#todoList"),
    todosLeft = $("#todosLeft"),
    clearCompleted = $("#clearCompleted"),
    markAllCompleted = $("#markAllCompleted"),
    showAll = $("#showAll"),
    showActive = $("#showActive"),
    showCompleted = $("#showCompleted"),
    btnGroup = $(".btn-group"),
    todoIndexValue = 0,
    checkboxCounter = 0;

// TODO OBJECT PROTOTYPE
function makeTodo(text, index) {
    this.text = text,
    this.isDone = false,
    this.index = index
}

// MAIN ARRAY WITH ALL ENTERED AND ONE DEFAULT TODOS
var todos = [new makeTodo("Enter what needs to be done", 0)];

function addEnteredTodo(condition) {
    if (condition && inputText.value != "") {
        todoIndexValue++;
        todos.push(new makeTodo(inputText.value, todoIndexValue));
        inputText.value = ""; // clear form after enter
        markAllCompleted.css({ opacity: 0.5 });
        renderTodos();
        countActiveTodos();
    }
}