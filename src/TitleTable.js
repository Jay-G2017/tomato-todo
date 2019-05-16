import React, { useState, useEffect } from "react";
import TitleBoard from "./components/TitleBoard";

export default function TitleTable(props) {
  const { titles } = props;

  return (
    <div className="App">
      {titles &&
        titles.map(title => (
          <TitleBoard
            key={title.id}
            title={title}
            handleTodoDeleteClick={todoId =>
              props.handleTodoDeleteClick(todoId)
            }
            handleAddTodoInputKeyDown={(titleId, todoName) =>
              props.handleAddTodoInputKeyDown(titleId, todoName)
            }
          />
        ))}
    </div>
  );
}
