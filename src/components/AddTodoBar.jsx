import React, { Component } from "react";
import "./AddTodoBar.scss";

class AddTodoBar extends Component {
  state = {};

  handleAddTodoInputKeyDown(e) {
    console.log("event", e.target.value);
  }
  render() {
    return (
      <div className="add-todo-bar">
        <form>
          <input
            type="text"
            placeholder="add a todo"
            onKeyDown={e => this.props.handleAddTodoInputKeyDown(e)}
          />
        </form>
      </div>
    );
  }
}

export default AddTodoBar;
