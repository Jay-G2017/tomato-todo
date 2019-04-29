import React from "react";
import "./AddTodoBar.scss";

export default function AddTodoBar(props) {
  return (
    <div className="add-todo-bar">
      <form>
        <input
          type="text"
          placeholder="add a todo"
          onKeyDown={e => props.handleAddTodoInputKeyDown(props.titleId, e)}
        />
      </form>
    </div>
  );
}
