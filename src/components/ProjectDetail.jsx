import React, { useEffect, useState, useRef } from "react";
import { Menu, Input, Button, message } from "antd";
import { cloneDeep } from "lodash";
import styled from "styled-components";
import TitleBoard from "./TitleBoard";
import TodoRow from "./TodoRow";

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const Sider = styled.div`
  padding-top: 10px;
  flex: 0 0 200px;
  height: 100%;
  overflow: auto;
  border-right: 1px solid hsla(0, 0%, 85%, 1);
`;

const MenuStyled = styled.div`
  & .ant-menu {
    background-color: transparent;
  }
  & .ant-menu-inline {
    border-right: none;
  }
  & .ant-menu-item-selected {
    color: #fff;
    background-color: hsla(0, 0%, 70%, 1) !important;
  }
  & .ant-menu-item::after {
    border-right: none;
  }
`;

const ProjectContainer = styled.div`
  flex: 1 1 auto;
  height: 100%;
`;

const ProjectHeader = styled.div`
  height: 50px;
  border-bottom: 1px solid hsla(0, 0%, 85%, 1);
  padding: 0 80px;
  line-height: 50px;
`;

const ProjectBody = styled.div`
  height: calc(100% - 110px);
  overflow: auto;
  padding: 20px 80px;
`;

const NoneGroupTodoContainer = styled.div`
  margin-bottom: 20px;
`;

const ProjectFooter = styled.div`
  height: 60px;
  padding: 0 80px;
  border-top: 1px solid hsla(0, 0%, 85%, 1);
  display: flex;
  align-items: center;
  background-color: hsla(0, 0%, 90%, 1);
`;

function ProjectDetail(props) {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(null);

  const [project, setProject] = useState({});

  const [inputValue, setInputValue] = useState(null);
  const addTodoInput = useRef(null);

  useEffect(() => {
    fetchProjectList();
    const _projectId = props.match.params.projectId;
    setProjectId(_projectId);
  }, []);

  useEffect(() => {
    if (projectId) fetchProject(projectId);
  }, [projectId]);

  const fetchProjectList = () => {
    const url = window.tomatoApi.baseUrl + "/api/v1/categories/1/projects";
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setProjects(data);
        if (!projectId && data[0]) setProjectId(data[0].id.toString());
      })
      .catch(error => {
        message.error(error.message);
      });
  };

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

  return (
    <Container>
      <Sider>
        <MenuStyled>
          <Menu
            mode="inline"
            selectedKeys={[projectId]}
            onClick={({ key }) => {
              setProjectId(key);
              window.history.pushState(null, null, `/projects/${key}`);
            }}
          >
            {projects.map(project => (
              <Menu.Item key={project.id}>{project.name}</Menu.Item>
            ))}
          </Menu>
        </MenuStyled>
      </Sider>
      <ProjectContainer>
        <ProjectHeader>{project.name}</ProjectHeader>
        <ProjectBody>
          <NoneGroupTodoContainer>
            {project.todos &&
              project.todos.map(todo => (
                <TodoRow
                  key={todo.id}
                  todo={todo}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))}
          </NoneGroupTodoContainer>
          {project.titles &&
            project.titles.map(title => (
              <TitleBoard
                key={title.id}
                title={title}
                projectId={projectId}
                handleDeleteTodo={handleDeleteTodo}
                handleAddTodo={handleAddTodo}
              />
            ))}
        </ProjectBody>
        <ProjectFooter>
          <Input
            ref={addTodoInput}
            style={{ flex: "1 1 auto", marginRight: "30px" }}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onPressEnter={e => {
              e.preventDefault();
              handleAddTodo(e.target.value, null, projectId);
              setInputValue(null);
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              handleAddTodo(addTodoInput.current.props.value, null, projectId);
              setInputValue(null);
            }}
          >
            添加Todo
          </Button>
        </ProjectFooter>
      </ProjectContainer>
    </Container>
  );
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

export default ProjectDetail;
