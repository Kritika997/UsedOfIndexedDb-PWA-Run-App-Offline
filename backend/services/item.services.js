const Todo = require("../models/todo");

exports.addTodo = (todoData) =>{
    return Todo.create(todoData);
}