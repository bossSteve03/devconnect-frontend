import styles from '../index.module.css';

export default function HasName() {

  return (
    <div className={styles["containerBorderH"]}>
      <div className={styles["messageContainer"]}>
        <h1 className={styles["messageTitleN"]}>
        Task complete.
        </h1>
        <p className={styles["messageContentN"]}>
          <strong className={styles["messageContentN"]}>
          Name
          </strong>
         successfully added to User Profile.
        </p>
      </div>
    </div>
  )
}
