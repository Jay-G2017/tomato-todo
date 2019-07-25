import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import ProjectDetail from "./components/ProjectDetail";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { ProjectContextProvider } from "./contexts/ProjectContext";

const Header = styled.div`
  height: 50px;
  line-height: 50px;
  padding: 0 50px;
  background-color: #fff;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.4);
`;

const Body = styled.div`
  overflow: auto;
  height: calc(100vh - 50px);
`;

function App() {
  return (
    <Router>
      <Header>TimeNote</Header>
      <Body>
        <ProjectContextProvider>
          <Route path="/" exact component={ProjectDetail} />
          <Route path="/projects/:projectId" component={ProjectDetail} />
        </ProjectContextProvider>
      </Body>
    </Router>
  );
}

export default App;
