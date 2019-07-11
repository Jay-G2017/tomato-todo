import React, { useState, useEffect } from "react";
import { message } from "antd";

function useProject(projectId) {
  const [project, setProject] = useState({});

  useEffect(() => {
    if (projectId) {
      const url = window.tomatoApi.baseUrl + "/api/v1/projects/" + projectId;
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setProject(data);
        })
        .catch(error => {
          message.error(error);
        });
    }
  }, [projectId]);

  const addTodoRequest = (titleId, todoName) => {
    const url = `${
      window.tomatoApi.baseUrl
    }/api/v1/titles/${titleId}/todos?name=${todoName}`;
    fetch(url, { method: "post" })
      .then(response => response.json())
      .then(res => message.info("创建成功"))
      .catch(error => alert("add error", error));
  };

  const handleAddTodoInputKeyDown = (titleId, todoName) => {
    const newTitles = project.titles.slice(); //slice对object没用
    const newTodo = { id: -1, name: todoName };
    newTitles.forEach(title => {
      if (title.id === titleId) title.todos.push(newTodo);
    });

    addTodoRequest(titleId, todoName);
    setProject({ ...project, titles: newTitles });
  };

  const deleteTodoRequest = todoId => {
    const url = `${window.tomatoApi.baseUrl}/api/v1/todos/${todoId}`;
    fetch(url, { method: "delete" })
      .then(response => response.json)
      .then()
      .catch(error => alert("delete error", error));
  };

  const handleTodoDeleteClick = todoId => {
    const newTitles = project.titles.slice();
    newTitles.forEach(title => {
      title.todos.forEach((todo, index) => {
        if (todo.id === todoId) title.todos.splice(index, 1);
      });
    });
    deleteTodoRequest(todoId);
    setProject({ ...project, titles: newTitles });
  };

  return { project, handleAddTodoInputKeyDown, handleTodoDeleteClick };
}

export default useProject;
