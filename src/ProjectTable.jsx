import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { configConsumerProps } from "antd/lib/config-provider";

function ProjectTable(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3002/api/v1/categories/1/projects";
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setProjects(data);
      })
      .catch(error => {
        alert("error", error);
      });
  }, [1]);

  return (
    <div style={{ padding: "20px 0" }}>
      <Menu>
        {projects.map(project => {
          return (
            <Menu.Item key={project.id.toString()}>
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
}

export default ProjectTable;
