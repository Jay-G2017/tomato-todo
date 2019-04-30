import React from "react";
import { Layout } from "antd";
import TitleTable from "./TitleTable";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>header</Header>
      <Layout>
        <Sider>sider</Sider>
        <Layout>
          <Header>sub</Header>
          <Content>
            <TitleTable />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
