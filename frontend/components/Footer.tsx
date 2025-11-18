import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          © {new Date().getFullYear()} <span className={styles.highlight}>NextStep AI</span>
        </p>
        <div className={styles.line}></div>
        <small>Empowering students with AI-driven career insights</small>
      </div>
      
    

    </footer>
  );
}
