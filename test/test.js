describe("Supporting functions", function() {
    it("$ short querySelector function", function() {
        assert.notEqual($("body"), null);
        assert.isObject($("body"));
    });
    it("showCurrentTodos (boolean argument)", function() {
        assert.equal(showCurrentTodos(true).length + showCurrentTodos(false).length, todos.length);
    });
});

describe("Render entered todos", function() {
    it("append child to ul #todoList", function() {
        var beforeRender = todoList.children.length;
        inputText.value = "test todo1";
        enterBtn.click();
        assert.isAbove(todoList.children.length, beforeRender);
    });
});

describe("Count active todos", function() {
    it("count active todos and inner result value into HTML", function() {
        var beforeChangeActive = todosLeft.innerText;
        todos[0].isDone = true;
        countActiveTodos();
        assert.notEqual(beforeChangeActive, todosLeft.innerText);
    });
});

describe("Filtration todos with button group", function() {
    it("I dont know in which way I can test this feature :(", function() {
        assert(false);
    });
});

describe("'Clear completed' button", function() {
    it("clear all completed todos", function() {
        var beforeClearCompleted = todos.length;
        todos[0].isDone = true;
        clearCompleted.click();
        assert.isAbove(beforeClearCompleted, todos.length);
    });
});

describe("'Mark all' button", function() {
    it("change isDone status into completed/uncompleted for all todos", function() {
        inputText.value = "test todo2";
        enterBtn.click();
        markAllCompleted.click();
        assert.isTrue(todos[0].isDone);
        markAllCompleted.click();
        assert.isFalse(todos[0].isDone);
    });
});