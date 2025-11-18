import styles from "./FeaturesSection.module.css";
import Image from "next/image";
import { Brain, Sparkles, Globe2 } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Why Choose NextStep AI?</h2>
      <p className={styles.subheading}>
        NextStep AI isn’t just another career suggestion tool — it’s a smart
        guide built to understand *you*, analyze your potential, and connect
        you with your ideal career direction.
      </p>

      <div className={styles.features}>
        {/* Feature 1 */}
        <div className={styles.featureRow}>
          <div className={styles.text}>
            <div className={styles.iconWrap}>
              <Sparkles className={styles.icon} size={36} />
            </div>
            <h3>AI-Powered Career Insights</h3>
            <p>
              Our intelligent recommendation engine analyzes your academic
              data and interests to uncover personalized career matches based
              on real-world success trends.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/tr4.svg"
              alt="AI Analysis Illustration"
              width={350}
              height={250}
              className={styles.image}
            />
          </div>
        </div>

        {/* Feature 2 */}
        <div className={`${styles.featureRow} ${styles.reverse}`}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/tr5.svg"
              alt="Personality Insights Illustration"
              width={350}
              height={300}
              className={styles.image}
            />
          </div>
          <div className={styles.text}>
            <div className={styles.iconWrap}>
              <Brain className={styles.icon} size={36} />
            </div>
            <h3>Personality & Strength Analysis</h3>
            <p>
              Using advanced NLP models, NextStep AI reads your essay to
              understand your thought patterns and highlight strengths that
              align with specific fields.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className={styles.featureRow}>
          <div className={styles.text}>
            <div className={styles.iconWrap}>
              <Globe2 className={styles.icon} size={36} />
            </div>
            <h3>Global Job Market Insights</h3>
            <p>
              Explore trending and future-ready career roles worldwide,
              helping you plan your academic journey strategically.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/tr3.svg"
              alt="Global Careers Illustration"
              width={350}
              height={250}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
