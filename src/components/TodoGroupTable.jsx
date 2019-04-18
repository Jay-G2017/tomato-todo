import React, { Component } from "react";
import TodoGroupRow from "./TodoGroupRow";
import AddTodoBar from "./AddTodoBar";
import TodoTable from "./TodoTable";

class TodoGroupTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoGroup: { name: "完成一个todo组" },
      todos: [
        { id: 1, name: "可以添加todo" },
        { id: 2, name: "可以删除todo" },
        { id: 3, name: "可以编辑todo" }
      ]
    };
  }

  handleAddTodoInputKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      const todos = this.state.todos.slice();
      const newTodo = { name: e.target.value };
      let lastId = 0;
      if (todos.length) lastId = todos[todos.length - 1].id;
      newTodo.id = lastId + 1;
      todos.push(newTodo);

      this.setState({ todos: todos });
      e.target.value = null;
    }
  }

  handleTodoDeleteClick(todoId) {
    const todos = this.state.todos.slice();
    todos.forEach((todo, index) => {
      if (todo.id === todoId) todos.splice(index, 1);
    });
    this.setState({ todos: todos });
  }

  render() {
    const todoGroup = {};
    todoGroup.name = this.state.todoGroup.name;
    todoGroup.todos = this.state.todos;

    return (
      <div className="todo-group-table">
        <TodoGroupRow name={todoGroup.name} />
        <AddTodoBar
          handleAddTodoInputKeyDown={e => this.handleAddTodoInputKeyDown(e)}
        />
        <TodoTable
          todos={todoGroup.todos}
          handleTodoDeleteClick={e => this.handleTodoDeleteClick(e)}
        />
      </div>
    );
  }
}

export default TodoGroupTable;
