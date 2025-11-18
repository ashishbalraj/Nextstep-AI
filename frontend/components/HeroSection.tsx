import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Discover Your Perfect <span className={styles.highlight}>Career Path</span> with AI
        </h1>
        <p className={styles.subtitle}>
          NextStep AI helps students find their ideal direction through personalized
          guidance, smart insights, and AI-powered recommendations.
        </p>
        <Link href="/signin" className={styles.button}>
          Get Started
        </Link>
      </div>

      <div className={styles.imageContainer}>
  <div className={styles.diagonalWrapper}>
    <img
      src="/images/imgg1.svg"
      alt="Education Illustration"
      className={styles.topDiagonal}
    //    width={400}
    //    height={350}
    />

    <img
      src="/images/tr2.svg"
      alt="AI Idea Lightbulb"
      className={styles.bottomDiagonal}
      width={400}
       height={300}
    />
  </div>
</div>

    </section>
  );
}
