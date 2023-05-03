
import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { LandingNav, SideNav } from "./layouts";
import { Landing, NotFound, AboutUs, ContactUs, Signup, Login, User } from './pages'

function App() {
  const [user, setUser] = useState('')
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingNav />}>
          <Route index element={<Landing />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Route>
        <Route path="/auth" element={<SideNav />}>
          {/* <Route path='/auth/dashboard' element={<Dashboard />} />
          <Route path='/auth/team' element={<CurrentTeam />} />
          <Route path="/auth/*" element={<NotFound />} />
          <Route path='/auth/calendar' element={<Calendar />} /> */}
          <Route path="/auth/user" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
