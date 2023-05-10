import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { LandingNav, SideNav } from "./layouts";
import { useProjects } from "./context";
import tokenService from "./services/tokenService";
import { UserProvider } from "./context";
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
  Dashboard,
} from "./pages";

function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const { token } = tokenService();
  const location = useLocation();
  const navigate = useNavigate();
  const { projects, setProjects } = useProjects();
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/project/1");
        const data = await response.json();
        const mapProjects = data["user projects"].map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          positions: project.positions,
          duration: project.duration,
        }));
        setProjects(mapProjects);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, []);
  useEffect(() => {
    let isValid = token !== null && token !== undefined;
    setUserIsLoggedIn(isValid);
    if (isValid === false && location.pathname.includes("/auth")) {
      navigate("/login");
      window.alert(
        "You do not have access to this route and are being redirected to the log in page. Please log in and try again."
      );
    }
  }, []);
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/project/1");
        const data = await response.json();
        const mapProjects = data["user projects"].map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          positions: project.positions,
          duration: project.duration,
        }));
        setProjects(mapProjects);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingNav />}>
            <Route index element={<Landing />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          {userIsLoggedIn && (
            <Route path="/auth" element={<SideNav />}>
              {/* <Route path='/auth/calendar' element={<Calendar />} /> */}
              <Route path="/auth/dashboard" element={<Dashboard />} />
              <Route path="/auth/team" element={<CurrentProject />} />
              <Route path="/auth/*" element={<NotFound />} />
              <Route path="/auth/user" element={<User />} />
              <Route path="/auth/kanban" element={<Kanban />} />
              <Route path="/auth/new-project" element={<CreateProject />} />
              <Route path="/auth/projects" element={<SearchProjects />} />
            </Route>
          )}
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
