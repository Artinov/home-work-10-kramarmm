// USEFULL SHORT querySelector FUNCTION
function $(selector) {
    return document.querySelector(selector);
}

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
    todoIndexValue = 0;

// TODO OBJECT PROTOTYPE
function makeTodo(text, index) {
    this.text = text,
    this.isDone = false,
    this.index = index
}

// MAIN ARRAY WITH ALL ENTERED AND ONE DEFAULT TODOS
var todos = [new makeTodo("Enter what needs to be done", 0)];

// INITIAL RENDER AND COUNT
renderTodos();
countActiveTodos();


// ENTER EVENT HANDLERS 
inputText.onkeypress = function(e) {
    addEnteredTodo(e.keyCode == 13);
}

enterBtn.onclick = function() {
    addEnteredTodo(true);
}

function addEnteredTodo(condition) {
    if (condition && inputText.value != "") {
        todoIndexValue++;
        todos.push(new makeTodo(inputText.value, todoIndexValue));
        inputText.value = ""; // clear form after enter
        renderTodos();
        countActiveTodos();
    }
}


// RENDER FUNCTION
function renderTodos() {

    todoElementTemplate = $("#templateDiv li").cloneNode(true);

    if (todos.length == 0) {
        todosList.innerHTML = "";
        return; // if array is empty do nothing
    }

    todos.forEach(function(todo) {
        todoElementTemplate.querySelector("#templateTodoText").innerText = todo.text;
        todoElementTemplate.setAttribute("todo-index", todo.index);
        todoElementTemplate.style.display = "block";

        // CHECKBOXES
        todoElementTemplate.querySelector("input").onchange = function(e) {

            var li = e.path[2];
            var todoIndex = li.getAttribute("todo-index");
            var todo = todos.filter(function(todo) {
                return todo.index == todoIndex;
            });

            todo = todos.indexOf(todo[0]);
            todo = todos[todo];

            if (e.path[0].checked) {
                li.setAttribute("class","horizontal-line todo-done");
                todo.isDone = true;
            } else {
                li.setAttribute("class","horizontal-line");
                todo.isDone = false;
            }
            countActiveTodos();
        }

        // DELETE BUTTON
        todoElementTemplate.querySelector("button").onclick = function(e) {

            var li = e.path[2];
            var todoIndex = li.getAttribute("todo-index");
            var todo = todos.filter(function(todo) {
                return todo.index == todoIndex;
            });
            todoIndex = todos.indexOf(todo[0]);
            todos.splice(Number(todoIndex), 1);

            todosList.removeChild(li);
            countActiveTodos();
        }

        todosList.appendChild(todoElementTemplate);
    });
}


// FILTER TODOS WITH BUTTON GROUP
btnGroup.onclick = function(e) {
    for (var i = 0, child; child = btnGroup.children[i]; i++) {
        child.setAttribute("class", "btn btn-default");
    }
    e.path[0].setAttribute("class", "btn btn-success");
}

showActive.onclick = function(e) {
    changeDisplayStyleElement("none", "block");
}

showCompleted.onclick = function(e) {
    changeDisplayStyleElement("block", "none");
}

showAll.onclick = function() {
    changeDisplayStyleElement("block", "block");
}

function changeDisplayStyleElement(displayStyle1, displayStyle2) {
    function bool(boolean, displayStyle) {
        showCurrentTodos(boolean).forEach(function(todo) {
            var li = getLiElementTemplate(todo);
            li.style.display = displayStyle;
        });
    }
    bool(true, displayStyle1);
    bool(false, displayStyle2);
}


// FOOTER "Todos left" COUNTER
function countActiveTodos() {
    todosLeft.innerText = showCurrentTodos(false).length;
}

function showCurrentTodos(boolean) {
    return todos.filter(function(todo) {
        return todo.isDone == boolean;
    });
}


// FOOTER "CLEAR COMPLETED" BUTTON
clearCompleted.onclick = function() {
    todos.forEach(function(todo, i) {
        if (todo.isDone == true) {
            var li = getLiElementTemplate(todo);
            todosList.removeChild(li);
        }
    });
    todos = showCurrentTodos(false);
}


// MARK ALL TRUE/FALSE
markAllCompleted.onclick = function() {
    if (showCurrentTodos(false).length == 0) {
        inverseIsDoneInto(false);
    } else {
        inverseIsDoneInto(true);
    }
    countActiveTodos();
}

function inverseIsDoneInto(boolean) {
    todos.forEach(function(todo) {
        var li = getLiElementTemplate(todo);
        var checkbox = li.querySelector("label>input");

        todo.isDone = boolean;
        checkbox.checked = boolean;

        if (todo.isDone == true) {
            li.setAttribute("class","horizontal-line todo-done");
        } else {
            li.setAttribute("class","horizontal-line");
        }
    });
}


function getLiElementTemplate(todo) { //argument must be "todo" becouse using forEach(todo)
    var li = $("li[todo-index='" + todo.index + "']");
    return li;
}