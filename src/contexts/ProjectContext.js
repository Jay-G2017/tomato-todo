import React, { useState } from "react";
const ProjectContext = React.createContext();

const ProjectContextProvider = props => {
  const [project, setProject] = useState({});
  return (
    <ProjectContext.Provider value={[project, setProject]}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectContextProvider };
