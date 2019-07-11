import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import styled from "styled-components";
import TitleBoard from "./components/TitleBoard";
import useProject from "./hooks/useProject";

const { Header, Sider, Content } = Layout;

const HeaderContent = styled(Header)`
  background-color: rgba(242, 242, 242, 1);
  border-bottom: 1px solid #e2e2e2;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const LayoutContent = styled(Layout)`
  overflow: auto;
  height: calc(100vh - 50px);
`;

function ProjectDetail(props) {
  const _projectId = props.match.params.projectId;
  const [projectId, setProjectId] = useState(_projectId);
  const [projects, setProjects] = useState([]);

  const {
    project,
    handleAddTodoInputKeyDown,
    handleTodoDeleteClick
  } = useProject(projectId);

  useEffect(() => {
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
        alert("error", error.message);
      });
  }, []);

  return (
    <>
      <Sider
        style={{
          backgroundColor: "#fbfbfb",
          overflow: "auto",
          height: "calc(100% -50px)"
        }}
      >
        <div style={{ padding: "20px 0" }}>
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
        </div>
      </Sider>
      <LayoutContent>
        <HeaderContent>{project.name}</HeaderContent>
        <Content>
          <div className="App">
            {project.titles &&
              project.titles.map(title => (
                <TitleBoard
                  key={title.id}
                  title={title}
                  handleTodoDeleteClick={todoId =>
                    handleTodoDeleteClick(todoId)
                  }
                  handleAddTodoInputKeyDown={(titleId, todoName) =>
                    handleAddTodoInputKeyDown(titleId, todoName)
                  }
                />
              ))}
          </div>
        </Content>
      </LayoutContent>
    </>
  );
}

export default ProjectDetail;
