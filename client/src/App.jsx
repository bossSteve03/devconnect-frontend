import React from 'react'
import { Routes, Route } from "react-router-dom";
import { LandingNav, SideNav } from "./layouts";
import { Landing, NotFound, AboutUs, ContactUs } from './pages'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingNav />}>
          <Route index element={<Landing />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
        <Route path="/auth" element={<SideNav />}>
          {/* <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/team' element={<CurrentTeam />} />
          <Route path="/*" element={<NotFound />} />
          <Route path='/calendar' element={<Calendar />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App
