import { Link } from 'react-router-dom'
import styles from './index.module.css'

export default function NotFound() {
  return (
    <div className={styles["container"]}>
      <h1>Sorry! Page Not Found.</h1>
      <p><Link to='/auth/dashboard'>Click here!</Link> to go back to Dashboard.</p>
    </div>
  )
}
