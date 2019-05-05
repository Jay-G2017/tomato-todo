import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";
import TitleTable from "./TitleTable";
import ProjectTable from "./ProjectTable";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header style={{ backgroundColor: "skyblue" }}>TimeNote</Header>
        <Layout>
          <Sider style={{ width: "100px", color: "white", width: "80px" }}>
            sider
          </Sider>
          <Sider style={{ backgroundColor: "#fbfbfb" }}>
            <ProjectTable />
          </Sider>
          <Layout>
            <Header
              style={{
                backgroundColor: "rgba(242, 242, 242, 0.9)",
                borderBottom: "1px solid #e2e2e2"
              }}
            >
              header area
            </Header>
            <Content>
              <Route path="/projects/:projectId" component={TitleTable} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
