import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BrandName, Sidebar, SidebarCollapsed } from '../../components'
import styles from './index.module.css';
  

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
      {collapsed ? <BrandName /> : <></>}
      <RxHamburgerMenu className={styles["burger-btn"]} onClick={handleCollapsed}/>
    </div>
    {collapsed ? <Sidebar /> : <SidebarCollapsed />}
    <RxHamburgerMenu className={styles['sidebar-space']}/>
  </div>
  <div className={`${collapsed ? styles['content'] : styles['contentCollapsed']}`}>
    <Outlet />
  </div>
</div>
    </>
  );
}
