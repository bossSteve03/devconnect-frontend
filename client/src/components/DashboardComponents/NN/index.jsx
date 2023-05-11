import { Link } from 'react-router-dom';
import styles from '../index.module.css'

export default function NeedsName() {
  return (
    <div className={styles["containerBorder"]}>
      <div className={styles["messageContainer"]}>
      <h1 className={styles["messageTitle"]}>
        You have not set your <strong className={styles["messageTitle"]}>name</strong> yet.
      </h1>
      <p className={styles["messageContent"]}>
        Please go to <Link className={styles["messageContent"]}>User Profile</Link> and fill your <strong className={styles["messageContent"]}>name</strong> field.
      </p>
    </div>
    </div>
  )
}
