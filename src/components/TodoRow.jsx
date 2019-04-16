import React, { Component } from "react";
import "./TodoRow.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TodoRow extends Component {
  state = {};

  renderTodoCheckbox(todoId) {
    return (
      <div className="todo-checkbox">
        <input type="checkbox" id={"checkbox" + todoId} />
        <label htmlFor={"checkbox" + todoId} />
      </div>
    );
  }

  renderTodoContent(todoName) {
    return <div className="todo-content">{todoName}</div>;
  }

  renderTodoTomatoPlay() {
    return (
      <div className="todo-play text-secondary">
        <FontAwesomeIcon icon="play-circle" />
      </div>
    );
  }

  renderTodoDelete() {
    return (
      <div className="todo-delete text-danger">
        <FontAwesomeIcon icon="minus-circle" />
      </div>
    );
  }
  render() {
    return (
      <div className="todo-row flex-between align-center">
        {this.renderTodoCheckbox(this.props.todo.id)}
        {this.renderTodoContent(this.props.todo.name)}
        {this.renderTodoTomatoPlay()}
        {this.renderTodoDelete()}
      </div>
    );
  }
}

export default TodoRow;
