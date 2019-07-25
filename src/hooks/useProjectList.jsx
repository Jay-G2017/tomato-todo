import { useState } from "react";
import { message } from "antd";

function useProjectList() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(null);

  const fetchProjectList = () => {
    const url = window.tomatoApi.baseUrl + "/api/v1/categories/1/projects";
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setProjects(data);
        if (!projectId && data[0]) setProjectId(data[0].id.toString());
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  return { projects, projectId, setProjectId, fetchProjectList };
}

export default useProjectList;
