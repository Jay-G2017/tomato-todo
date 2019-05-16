import React, { useState, useContext } from "react";
import { Input } from "antd";
import "./AddTodoBar.scss";
import useProject from "../hooks/useProject";

export default function AddTodoBar(props) {
  const [value, setValue] = useState(null);

  return (
    <div className="add-todo-bar">
      <form>
        <Input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="add a todo"
          onPressEnter={e => {
            e.preventDefault();
            props.handleAddTodoInputKeyDown(props.titleId, e.target.value);
            setValue(null);
          }}
        />
      </form>
    </div>
  );
}
