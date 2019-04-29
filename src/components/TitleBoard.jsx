import React, { useState } from "react";
import TitleRow from "./TitleRow";
import AddTodoBar from "./AddTodoBar";
import TodoTable from "./TodoTable";
import "./TitleBoard.scss";

export default function TitleBoard(props) {
  /*
  const [title, setTitle] = useState({ name: "完成一个todo组" });
  const [todos, setTodos] = useState([
    { id: 1, name: "可以添加todo" },
    { id: 2, name: "可以删除todo" },
    { id: 3, name: "可以编辑todo" }
  ]);

  const handleTodoDeleteClick = todoId => {
    const newTodos = todos.slice();
    newTodos.forEach((todo, index) => {
      if (todo.id === todoId) newTodos.splice(index, 1);
    });
    setTodos(newTodos);
  };

  const handleAddTodoInputKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();

      const newTodos = todos.slice();
      const newTodo = { name: e.target.value };
      let lastId = 0;
      if (todos.length) lastId = todos[todos.length - 1].id;
      newTodo.id = lastId + 1;
      newTodos.push(newTodo);

      setTodos(newTodos);
      e.target.value = null;
    }
  };
  */

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
