import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import './index.modules.css'
  

export default function Sidebar() {

  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
    <div id="sidebar">
      <h3>Sidebar</h3>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
    </div>
    <div id="content">
      <Outlet />
    </div>
    </>
  );
}
