import React, { Component } from "react";

class TodoGroupRow extends Component {
  state = {};
  render() {
    return <div className="todo-group-row">{this.props.name}</div>;
  }
}

export default TodoGroupRow;
