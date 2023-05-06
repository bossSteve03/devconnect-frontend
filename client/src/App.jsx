import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { LandingNav, SideNav } from "./layouts";
import { ProjectsProvider } from "../src/context";
import  tokenService from "./services/tokenService"
import {
  Landing,
  NotFound,
  AboutUs,
  Signup,
  Login,
  User,
  Kanban,
  CreateProject,
  CurrentProject,
  SearchProjects,
  Dashboard
} from "./pages";

function App() {
  const [ userIsLoggedIn, setUserIsLoggedIn ] = useState(false);
  const { token } = tokenService();

  useEffect(() => {
    let isValid = (token !== null && token !== undefined);
    setUserIsLoggedIn(isValid);
  }, []);
  
  return (
    <>
      <ProjectsProvider>
        <Routes>
          <Route path="/" element={<LandingNav />}>
            <Route index element={<Landing />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          {userIsLoggedIn && 
            <Route path="/auth" element={<SideNav />}>
              <Route path='/auth/team' element={<CurrentProject />} />
              <Route path='/auth/dashboard' element={<Dashboard />} />
              {/* <Route path='/auth/calendar' element={<Calendar />} /> */}
              <Route path="/auth/*" element={<NotFound />} />
              <Route path="/auth/user" element={<User />} />
              <Route path="/auth/kanban" element={<Kanban />} />
              <Route path="/auth/new-project" element={<CreateProject />} />
              <Route path="/auth/projects" element={<SearchProjects />} />
            </Route>
          }
        </Routes>
      </ProjectsProvider>
    </>
  );
}

export default App;
