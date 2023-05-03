import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { BrandName } from '../../components';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IconContext } from 'react-icons';
import './index.modules.css';
  

export default function Sidebar() {

  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
    <div id='whole-page'>
    <div id="sidebar">
      <BrandName />
      <IconContext.Provider value={{ color: 'white', size: 32}}>
      <RxHamburgerMenu className='' onClick={setOpen}/>
      </IconContext.Provider>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
    </div>
    <div id="content">
      <Outlet />
    </div>
    </div>
    </>
  );
}
