
// INITIAL RENDER AND COUNT
renderTodos();
countActiveTodos();


// RENDER FUNCTION
function renderTodos() {

    todoElementTemplate = $("#templateDiv li").clone(true);

    if (todos.length == 0) {
        todosList.innerHTML = "";
        return; // if array is empty do nothing
    }

    todos.forEach(function(todo) {
        $("#templateTodoText").innerText = todo.text;
        todoElementTemplate.attr("todo-index", todo.index);
        todoElementTemplate.show();

        // CHECKBOXES
        $("#templateDiv li:input").change( function(e) {

            var li = e.path[2];
            var todoIndex = li.attr("todo-index");
            var todo = todos.filter(function(todo) {
                return todo.index == todoIndex;
            });

            todo = todos.indexOf(todo[0]);
            todo = todos[todo];

            if (e.path[0].checked) {
                checkboxCounter++;
                // console.log(checkboxCounter);
                li.attr("class", "horizontal-line todo-done");
                clearCompleted.style.opacity = 1;
                todo.isDone = true;
            } else {
                checkboxCounter--;
                // console.log(checkboxCounter);
                li.attr("class", "horizontal-line");
                clearCompleted.style.opacity = 0;
                todo.isDone = false;
            }

            todos.length == showCurrentTodos(true).length ? markAllCompleted.css({ opacity: 1 }) : markAllCompleted.css({ opacity: 0.5 });
            console.log(todos.length);
            console.log(showCurrentTodos(true).length);
            // checkboxCounter ? clearCompleted.style.opacity = 1 : clearCompleted.style.opacity = 0;
            countActiveTodos();
        });

        // DELETE BUTTON
        $("#templateDiv li:button").click( function(e) {

            var li = e.path[2];
            var todoIndex = li.attr("todo-index");
            var todo = todos.filter(function(todo) {
                return todo.index == todoIndex;
            });
            todoIndex = todos.indexOf(todo[0]);
            todos.splice(Number(todoIndex), 1);

            todosList.removeChild(li);
            countActiveTodos();
        });

        todosList.append(todoElementTemplate);
    });
}


// FILTER TODOS WITH BUTTON GROUP
btnGroup.click( function(e) {
    for (var i = 0, child; child = btnGroup.children[i]; i++) {
        child.attr("class", "btn btn-default");
    }
    e.path[0].attr("class", "btn btn-success");
});

showActive.click( function(e) {
    changeDisplayStyleElement("none", "block");
});

showCompleted.click( function(e) {
    changeDisplayStyleElement("block", "none");
});

showAll.click( function() {
    changeDisplayStyleElement("block", "block");
});

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


// FOOTER "CLEAR COMPLETED" BUTTON
clearCompleted.click( function() {
    todos.forEach(function(todo, i) {
        if (todo.isDone == true) {
            var li = getLiElementTemplate(todo);
            todosList.removeChild(li);
        }
    });
    clearCompleted.style.opacity = 0;
    todos = showCurrentTodos(false);
});


// MARK ALL TRUE/FALSE
markAllCompleted.click( function() {
    if (showCurrentTodos(false).length == 0) {
        markAllCompleted.css({ opacity: 0.5 });
        inverseIsDoneInto(false);
    } else {
        markAllCompleted.css({ opacity: 1 });
        inverseIsDoneInto(true);
    }
    countActiveTodos();
});