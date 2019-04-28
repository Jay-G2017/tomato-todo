import React from "react";
import "./TodoRow.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TodoRow(props) {
  const todo = props.todo;

  return (
    <div className="todo-row flex-between align-center">
      {renderTodoCheckbox(todo.id)}
      {renderTodoContent(todo.name)}
      {renderTodoTomatoPlay(props)}
      {renderTodoDelete(props)}
    </div>
  );
}

function renderTodoCheckbox(todoId) {
  return (
    <div className="todo-checkbox">
      <input type="checkbox" id={"checkbox" + todoId} />
      <label htmlFor={"checkbox" + todoId} />
    </div>
  );
}

function renderTodoContent(value) {
  return <div className="todo-content">{value}</div>;
}

function renderTodoTomatoPlay() {
  return (
    <div className="todo-play text-secondary">
      <FontAwesomeIcon icon="play-circle" />
    </div>
  );
}

function renderTodoDelete(props) {
  return (
    <div
      className="todo-delete text-danger "
      onClick={() => props.handleTodoDeleteClick(props.todo.id)}
    >
      <FontAwesomeIcon icon="minus-circle" />
    </div>
  );
}
