
// ENTER EVENT HANDLERS 
inputText.keypress( function(e) {
    addEnteredTodo(e.keyCode == 13);
});

enterBtn.click( function() {
    addEnteredTodo(true);
});

function showCurrentTodos(boolean) {
    return todos.filter(function(todo) {
        return todo.isDone == boolean;
    });
}

function inverseIsDoneInto(boolean) {
    todos.forEach(function(todo) {
        var li = getLiElementTemplate(todo);
        var checkbox = $("li[todo-index='" + todo.index + ":label>input");

        todo.isDone = boolean;
        checkbox.checked = boolean;

        if (todo.isDone == true) {
            li.attr("class", "horizontal-line todo-done");
        } else {
            li.attr("class", "horizontal-line");
        }
    });
}

function getLiElementTemplate(todo) { //argument must be "todo" becouse using forEach(todo)
    var li = $("li[todo-index='" + todo.index + "']");
    return li;
}