import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";
import styled from "styled-components";
import ProjectDetail from "./ProjectDetail";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const { Header } = Layout;

const LayoutBodyStyled = styled(Layout)`
  overflow: auto;
  height: calc(100vh - 50px);
`;

function App() {
  return (
    <Router>
      <Layout>
        <Header style={{ backgroundColor: "skyblue", height: "50px" }}>
          TimeNote
        </Header>
        <LayoutBodyStyled>
          <Route path="/" exact component={ProjectDetail} />
          <Route path="/projects/:projectId" component={ProjectDetail} />
        </LayoutBodyStyled>
      </Layout>
    </Router>
  );
}

export default App;
