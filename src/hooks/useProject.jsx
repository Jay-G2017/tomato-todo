import { useContext } from "react";
import { message } from "antd";
import { ProjectContext } from "../contexts/ProjectContext";
import { cloneDeep } from "lodash";

function useProject() {
  const [project, setProject] = useContext(ProjectContext);

  const fetchProject = projectId => {
    const url = window.tomatoApi.baseUrl + "/api/v2/projects/" + projectId;
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
  };

  const postToAddTodo = (todoName, titleId, projectId) => {
    const url = `${
      window.tomatoApi.baseUrl
    }/api/v1/projects/${projectId}/todos?name=${todoName}&title_id=${titleId}`;
    fetch(url, { method: "post" })
      .then(response => response.json())
      .then(res => {
        message.success("创建成功");
        fetchProject(projectId);
      })
      .catch(error => alert("add error", error));
  };

  const handleAddTodo = (todoName, titleId, projectId) => {
    let _project = cloneDeep(project);
    const newTodo = { id: -1, name: todoName };
    if (titleId) {
      _project.titles.forEach(title => {
        if (title.id === titleId) title.todos.push(newTodo);
      });
    } else {
      _project.todos.push(newTodo);
    }
    setProject(_project);

    postToAddTodo(todoName, titleId, projectId);
  };

  const postTodeleteTodo = todoId => {
    const url = `${window.tomatoApi.baseUrl}/api/v1/todos/${todoId}`;
    fetch(url, { method: "delete" })
      .then(response => response.json)
      .then(() => message.success("删除成功"))
      .catch(error => alert("delete error", error));
  };

  const handleDeleteTodo = todoId => {
    setProject(deleteTodoFromProject(project, todoId));

    postTodeleteTodo(todoId);
  };

  return {
    project,
    fetchProject,
    handleAddTodo,
    handleDeleteTodo
  };
}

function deleteTodoFromProject(project, todoId) {
  let _project = cloneDeep(project);
  _project.todos.forEach((todo, index) => {
    if (todo.id === todoId) _project.todos.splice(index, 1);
  });

  _project.titles.forEach(title => {
    title.todos.forEach((todo, index) => {
      if (todo.id === todoId) title.todos.splice(index, 1);
    });
  });

  return _project;
}

export default useProject;
