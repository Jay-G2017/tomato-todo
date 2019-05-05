import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import TitleBoard from "./components/TitleBoard";

export default function TitleTable(props) {
  const [titles, setTitles] = useState([]);
  const projectId = props.match.params.projectId;
  useEffect(() => {
    const url = "http://localhost:3002/api/v1/projects/" + projectId;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTitles(data.titles);
      })
      .catch(error => {
        alert("error", error);
      });
  }, [projectId]);

  const deleteTodoRequest = todoId => {
    const url = `http://localhost:3002/api/v1/todos/${todoId}`;
    fetch(url, { method: "delete" })
      .then(response => response.json)
      .then()
      .catch(error => alert("delete error", error));
  };

  const handleTodoDeleteClick = todoId => {
    const newTitles = titles.slice();
    newTitles.forEach(title => {
      title.todos.forEach((todo, index) => {
        if (todo.id === todoId) title.todos.splice(index, 1);
      });
    });
    deleteTodoRequest(todoId);
    setTitles(newTitles);
  };

  const addTodoRequest = (titleId, todoName) => {
    const url = `http://localhost:3002/api/v1/titles/${titleId}/todos?name=${todoName}`;
    fetch(url, { method: "post" })
      .then(response => response.json())
      .then(data => setTitles(data.titles))
      .catch(error => alert("add error", error));
  };

  const handleAddTodoInputKeyDown = (titleId, event) => {
    event.preventDefault();

    const newTitles = titles.slice();
    const todoName = event.target.value;
    const newTodo = { id: -1, name: todoName };
    newTitles.forEach(title => {
      if (title.id === titleId) title.todos.push(newTodo);
    });

    addTodoRequest(titleId, todoName);
    setTitles(newTitles);
  };

  return (
    <div className="App">
      {titles.map(title => (
        <TitleBoard
          key={title.id}
          title={title}
          handleTodoDeleteClick={todoId => handleTodoDeleteClick(todoId)}
          handleAddTodoInputKeyDown={(titleId, event) =>
            handleAddTodoInputKeyDown(titleId, event)
          }
        />
      ))}
    </div>
  );
}
