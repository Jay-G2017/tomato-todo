import React from "react";
import TitleRow from "./TitleRow";
import AddTodoBar from "./AddTodoBar";
import TodoTable from "./TodoTable";
import "./TitleBoard.scss";

export default function TitleBoard(props) {
  return (
    <div className="title-board">
      <TitleRow name={props.title.name} />
      <AddTodoBar
        titleId={props.title.id}
        handleAddTodoInputKeyDown={(titleId, e) =>
          props.handleAddTodoInputKeyDown(titleId, e)
        }
      />
      <TodoTable
        todos={props.title.todos}
        handleTodoDeleteClick={todoId => props.handleTodoDeleteClick(todoId)}
      />
    </div>
  );
}
