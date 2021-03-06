import React from "react";
import "./TodoRow.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import useProject from "../hooks/useProject";

library.add(faPlayCircle);
library.add(faMinusCircle);

export default function TodoRow(props) {
  const todo = props.todo;
  const { handleDeleteTodo } = useProject();

  const renderTodoDelete = () => {
    return (
      <div
        className="todo-delete text-danger "
        onClick={() => handleDeleteTodo(todo.id)}
      >
        <FontAwesomeIcon icon="minus-circle" />
      </div>
    );
  };

  return (
    <div className="todo-row flex-between align-center">
      <div className="todo-checkbox">
        <input type="checkbox" id={"checkbox" + todo.id} />
        <label htmlFor={"checkbox" + todo.id} />
      </div>
      <div className="todo-content">{todo.name}</div>
      {/* {renderTodoTomatoPlay(props)} */}
      {renderTodoDelete(props)}
    </div>
  );
}

function renderTodoTomatoPlay() {
  return (
    <div className="todo-play text-secondary">
      <FontAwesomeIcon icon="play-circle" />
    </div>
  );
}
