import styles from "./index.module.css";

export default function BrandName() {
  return (
    <div className={styles.title} data-testid="title-div">
      <h1 className={styles.title1} data-testid="title1">
        Dev
      </h1>
      <h1 className={styles.title2} data-testid="title2">
        Connect
      </h1>
    </div>
  );
}
