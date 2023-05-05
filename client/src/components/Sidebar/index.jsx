import { BsKanban } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { RxDashboard } from 'react-icons/rx';
import { IoCreateOutline } from 'react-icons/io5';
import { RiTeamFill } from 'react-icons/ri';
import { TbListSearch } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function Sidebar() {

  function logout() {
    return null;
  }

  return (
    <div className={styles['link-list']}>
      <Link to='/auth/dashboard'><div className={styles['list-item']}><RxDashboard className={styles['icon-btn']}/>Dashboard</div></Link>
      <Link to='/auth/kanban'><div className={styles['list-item']}><BsKanban className={styles['icon-btn']}/>Kanban</div></Link>
      <Link to='/auth/team'><div className={styles['list-item']}><RiTeamFill className={styles['icon-btn']}/>Your Team</div></Link>
      <Link to='/auth/new-project'><div className={styles['list-item']}><IoCreateOutline className={styles['icon-btn']}/>Create Project</div></Link>
      <Link to='/auth/projects'><div className={styles['list-item']}><TbListSearch className={styles['icon-btn']}/>Search Projects</div></Link>
      <div className={styles['list-item']}><BiLogOut className={styles['icon-btn']} onClick={logout}/><p>Log Out</p></div>
    </div>
  )
}
