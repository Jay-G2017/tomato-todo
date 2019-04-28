import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import TitleBoard from "./components/TitleBoard";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlayCircle);
library.add(faMinusCircle);

export default function TitleTable(props) {
  return (
    <div className="App">
      <TitleBoard />
      <TitleBoard />
    </div>
  );
}
