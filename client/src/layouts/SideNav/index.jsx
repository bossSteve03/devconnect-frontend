import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BrandName, Sidebar, SidebarCollapsed } from '../../components'
import styles from './index.module.css';
import greenbg from '../../../public/greenbg.png'
  

export default function SideNav() {

  const [collapsed, setCollapsed] = useState(false);

  function handleCollapsed() {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className={styles['whole-page']}>
  <div className={`${collapsed ? styles['sidebar'] : styles['sidebarCollapsed']}`}>
    <div className={styles["top"]}>
      <RxHamburgerMenu className={styles["burger-btn"]} onClick={handleCollapsed}/>
      <BrandName className={styles['BN']} />
    </div>
    {collapsed ? <Sidebar /> : <SidebarCollapsed />}
    <RxHamburgerMenu className={styles['sidebar-space']}/>
  </div>
  <div style={{backgroundImage:`url(${greenbg})`}} className={`${collapsed ? styles['content'] : styles['contentCollapsed']}`}>
    <Outlet />
  </div>
</div>
    </>
  );
}
