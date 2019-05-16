import React, { useEffect, useState, useContext } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import TitleTable from "./TitleTable";
import useProject from "./hooks/useProject";

const { Header, Content } = Layout;

const HeaderContent = styled(Header)`
  background-color: rgba(242, 242, 242, 1);
  border-bottom: 1px solid #e2e2e2;
  position: sticky;
  top: 0;
  z-index: 10;
`;

function ProjectDetail(props) {
  const projectId = props.match.params.projectId;

  const {
    project,
    handleAddTodoInputKeyDown,
    handleTodoDeleteClick
  } = useProject(projectId);

  return (
    <>
      <HeaderContent>{project.name}</HeaderContent>
      <Content>
        <TitleTable
          titles={project.titles}
          handleAddTodoInputKeyDown={(titleId, todoName) =>
            handleAddTodoInputKeyDown(titleId, todoName)
          }
          handleTodoDeleteClick={todoId => {
            handleTodoDeleteClick(todoId);
          }}
        />
      </Content>
    </>
  );
}

export default ProjectDetail;
