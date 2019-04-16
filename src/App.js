import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoGroupTable from "./components/TodoGroupTable";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlayCircle);
library.add(faMinusCircle);

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoGroupTable />
      </div>
    );
  }
}

export default App;
