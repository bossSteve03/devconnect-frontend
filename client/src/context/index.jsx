import { createContext, useContext, useState } from "react";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
export const useProjects = () => useContext(ProjectsContext);

export const UserContext = createContext()
export const UserProvider = ({ children }) =>{
  const [user,setUser] = useState("")
  return (
    <UserContext.Provider value = {{user,setUser}}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser =()=> useContext(UserContext)