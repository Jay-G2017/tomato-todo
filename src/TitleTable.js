import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import TitleBoard from "./components/TitleBoard";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlayCircle);
library.add(faMinusCircle);

export default function TitleTable(props) {
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3002/api/v1/projects/9");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const result = JSON.parse(xhr.responseText);
        setTitles(result.titles);
      } else {
      }
    };
  }, [5]);

  const deleteTodoRequest = todoId => {
    let xhr = new XMLHttpRequest();
    const url = `http://localhost:3002/api/v1/todos/${todoId}`;
    xhr.open("DELETE", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const result = JSON.parse(xhr.responseText);
        console.log(result);
        setTitles(result.titles);
      } else {
      }
    };
  };

  const handleTodoDeleteClick = todoId => {
    const newTitles = titles.slice();
    newTitles.forEach(title => {
      title.todos.forEach((todo, index) => {
        if (todo.id == todoId) title.todos.splice(index, 1);
      });
    });
    deleteTodoRequest(todoId);
    setTitles(newTitles);
  };

  const addTodoRequest = (titleId, todoName) => {
    let xhr = new XMLHttpRequest();
    const url = `http://localhost:3002/api/v1/titles/${titleId}/todos?name=${todoName}`;
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const result = JSON.parse(xhr.responseText);
        console.log("add todo success", result);
        setTitles(result.titles);
      } else {
      }
    };
  };

  const handleAddTodoInputKeyDown = (titleId, event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      const newTitles = titles.slice();
      const todoName = event.target.value;
      const newTodo = { id: -1, name: todoName };
      newTitles.forEach(title => {
        if (title.id == titleId) title.todos.push(newTodo);
      });

      addTodoRequest(titleId, todoName);
      setTitles(newTitles);
      event.target.value = null;
    }
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
