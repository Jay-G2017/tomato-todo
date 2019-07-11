import React, { useState } from "react";
import TodoRow from "./TodoRow";
import "./TitleBoard.scss";
import Styled from "styled-components";
import { Input } from "antd";

const TitleRow = Styled.div`
  margin-bottom: 10px;
`;

const AddTodoBar = Styled.div`

`;

export default function TitleBoard(props) {
  const { title } = props;
  const [inputValue, setInputValue] = useState(null);
  return (
    <div className="title-board">
      <TitleRow>{title.name}</TitleRow>
      <AddTodoBar>
        <Input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="add a todo"
          onPressEnter={e => {
            e.preventDefault();
            props.handleAddTodoInputKeyDown(title.id, e.target.value);
            setInputValue(null);
          }}
        />
      </AddTodoBar>
      {title.todos.map(todo => (
        <TodoRow
          todo={todo}
          key={todo.id}
          handleTodoDeleteClick={todoId => props.handleTodoDeleteClick(todoId)}
        />
      ))}
    </div>
  );
}
