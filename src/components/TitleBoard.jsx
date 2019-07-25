import React, { useState } from "react";
import TodoRow from "./TodoRow";
import Styled from "styled-components";
import { Input } from "antd";
import useProject from "../hooks/useProject";

const TitleBoardContainer = Styled.div`
  margin-bottom: 40px;
`;

const TitleRow = Styled.div`
  margin-bottom: 10px;
`;

const AddTodoBar = Styled.div`

`;

export default function TitleBoard(props) {
  const { title, projectId } = props;
  const [inputValue, setInputValue] = useState(null);
  const { handleAddTodo } = useProject();
  return (
    <TitleBoardContainer>
      <TitleRow>{title.name}</TitleRow>
      <AddTodoBar>
        <Input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="add a todo"
          onPressEnter={e => {
            e.preventDefault();
            handleAddTodo(e.target.value, title.id, projectId);
            setInputValue(null);
          }}
        />
      </AddTodoBar>
      {title.todos.map(todo => (
        <TodoRow todo={todo} key={todo.id} />
      ))}
    </TitleBoardContainer>
  );
}
