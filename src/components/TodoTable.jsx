import React, { Component } from "react";
import TodoRow from "./TodoRow";

class TodoTable extends Component {
  state = {};
  render() {
    return (
      <div className="todo-table">
        {this.props.todos.map(todo => {
          return <TodoRow todo={todo} key={todo.id} />;
        })}
      </div>
    );
  }
}

export default TodoTable;
