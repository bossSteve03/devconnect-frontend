import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LandingNav, SideNav } from "./layouts";
import { ProjectsProvider } from "../src/context";
import {
  Landing,
  NotFound,
  AboutUs,
  ContactUs,
  Signup,
  Login,
  User,
  Project,
  Projects,
} from "./pages";

function App() {
  const [user, setUser] = useState("");
  return (
    <>
      <ProjectsProvider>
        <Routes>
          <Route path="/" element={<LandingNav />}>
            <Route index element={<Landing />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/new-project" element={<Project />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
          <Route path="/auth" element={<SideNav />}>
            {/* <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/team' element={<CurrentTeam />} />
            <Route path="/*" element={<NotFound />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/user' element={<UserProfile />} /> */}
          </Route>
        </Routes>
      </ProjectsProvider>
    </>
  );
}

export default App;
