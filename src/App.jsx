import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";
import styled from "styled-components";
import TitleTable from "./TitleTable";
import ProjectDetail from "./ProjectDetail";
import ProjectTable from "./ProjectTable";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const { Header, Footer, Sider, Content } = Layout;

const LayoutInner = styled(Layout)`
  overflow: auto;
  height: calc(100vh - 50px);
`;

const LayoutContent = styled(Layout)`
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
        <LayoutInner>
          <Sider
            style={{
              backgroundColor: "#fbfbfb",
              overflow: "auto",
              height: "calc(100% -50px)"
            }}
          >
            <ProjectTable />
          </Sider>
          <LayoutContent>
            <Route path="/projects/:projectId" component={ProjectDetail} />
          </LayoutContent>
        </LayoutInner>
      </Layout>
    </Router>
  );
}

export default App;
