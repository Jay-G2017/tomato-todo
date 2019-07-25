import React, { useEffect, useState, useRef } from "react";
import { Menu, Input, Button } from "antd";
import styled from "styled-components";
import TitleBoard from "./TitleBoard";
import useProject from "../hooks/useProject";
import useProjectList from "../hooks/useProjectList";
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
  const {
    projects,
    projectId,
    setProjectId,
    fetchProjectList
  } = useProjectList();

  const { project, fetchProject, handleAddTodo } = useProject();
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
              project.todos.map(todo => <TodoRow key={todo.id} todo={todo} />)}
          </NoneGroupTodoContainer>
          {project.titles &&
            project.titles.map(title => (
              <TitleBoard key={title.id} title={title} projectId={projectId} />
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

export default ProjectDetail;
