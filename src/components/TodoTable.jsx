import React from "react";
import TodoRow from "./TodoRow";

export default function TodoTable(props) {
  const todos = props.todos;

  return (
    <div className="todo-table">
      {todos.map(todo => {
        return (
          <TodoRow
            todo={todo}
            key={todo.id}
            handleTodoDeleteClick={todoId =>
              props.handleTodoDeleteClick(todoId)
            }
          />
        );
      })}
    </div>
  );
}
