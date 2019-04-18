import React, { Component } from "react";
import "./TodoRow.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TodoRow extends Component {
  renderTodoCheckbox() {
    let todoId = this.props.todo.id;
    return (
      <div className="todo-checkbox">
        <input type="checkbox" id={"checkbox" + todoId} />
        <label htmlFor={"checkbox" + todoId} />
      </div>
    );
  }

  renderTodoContent() {
    return <div className="todo-content">{this.props.todo.name}</div>;
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
      <div
        className="todo-delete text-danger "
        onClick={() => this.props.handleTodoDeleteClick(this.props.todo.id)}
      >
        <FontAwesomeIcon icon="minus-circle" />
      </div>
    );
  }
  render() {
    return (
      <div className="todo-row flex-between align-center">
        {this.renderTodoCheckbox()}
        {this.renderTodoContent()}
        {this.renderTodoTomatoPlay()}
        {this.renderTodoDelete()}
      </div>
    );
  }
}

export default TodoRow;
