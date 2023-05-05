import { BsKanban } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { RxDashboard } from 'react-icons/rx';
import { IoCreateOutline } from 'react-icons/io5';
import { RiTeamFill } from 'react-icons/ri';
import { TbListSearch } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function SidebarCollapsed() {

  function logout() {
    return null;
  }

  return (
    <div className={styles['icon-list']}>
      <Link to='/auth/dashboard'><RxDashboard className={styles['icon-btn']}/></Link>
      <Link to='/auth/kanban'><BsKanban className={styles['icon-btn']}/></Link>
      <Link to='/auth/team'><RiTeamFill className={styles['icon-btn']}/></Link>
      <Link to='/auth/new-project'><IoCreateOutline className={styles['icon-btn']}/></Link>
      <Link to='/auth/projects'><TbListSearch className={styles['icon-btn']}/></Link>
      <BiLogOut className={styles['icon-btn']} onClick={logout}/>
    </div>
  )
}
