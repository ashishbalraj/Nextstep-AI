import Image from "next/image";
import styles from "./AboutPage.module.css";


export default function AboutPage() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.heading}>About NextStep AI</h1>
        <p className={styles.text}>
          NextStep AI is an AI-powered career counseling platform designed to
          help students identify their strengths, explore career paths, and make
          informed decisions for their future. Our goal is to bridge the gap
          between academics and real-world opportunities using intelligent data
          analysis.
        </p>

        <p className={styles.text}>
          We combine academic insights, personality understanding, and
          real-time job market trends to guide students toward meaningful
          careers. Every recommendation is backed by machine learning models
          that constantly evolve with industry patterns.
        </p>

        <p className={styles.mission}>
          <strong>Our Mission:</strong> Empower every student with clarity and
          confidence in choosing their career journey through AI-driven
          guidance.
        </p>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src="/images/abt2.svg"
          alt="About illustration"
          width={500}
          height={400}
          className={styles.image}
          priority
        />
      </div>
    </section>
  );
}
