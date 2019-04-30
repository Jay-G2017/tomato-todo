import React, { useState } from "react";
import { Input } from "antd";
import "./AddTodoBar.scss";

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
            props.handleAddTodoInputKeyDown(props.titleId, e);
            setValue(null);
          }}
        />
      </form>
    </div>
  );
}
