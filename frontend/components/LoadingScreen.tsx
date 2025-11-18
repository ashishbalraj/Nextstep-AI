import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner}></div>
      <h2 className={styles.text}>Analyzing your profile...</h2>
      <p className={styles.subtext}>This will only take a few seconds</p>
    </div>
  );
}
