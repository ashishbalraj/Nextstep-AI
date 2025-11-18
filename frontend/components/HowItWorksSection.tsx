import styles from "./HowItWorksSection.module.css";
import { Lightbulb, Brain, Target } from "lucide-react"; // simple icons

export default function HowItWorksSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>How It Works..!</h2>
      <p className={styles.subheading}>
        Understand your career path in three simple, AI-powered steps.
      </p>

      <div className={styles.cards}>
        {/* Step 1 */}
        <div className={styles.card}>
          <div className={styles.icon}>
            <Lightbulb size={40} />
          </div>
          <h3 className={styles.title}>Step 1: Provide Details</h3>
          <p className={styles.desc}>
            Share your academic background, subjects, and interests — it only takes a minute.
          </p>
        </div>

        {/* Step 2 */}
        <div className={styles.card}>
          <div className={styles.icon}>
            <Brain size={40} />
          </div>
          <h3 className={styles.title}>Step 2: AI Analysis</h3>
          <p className={styles.desc}>
            Our AI model processes your profile to understand your strengths and aspirations.
          </p>
        </div>

        {/* Step 3 */}
        <div className={styles.card}>
          <div className={styles.icon}>
            <Target size={40} />
          </div>
          <h3 className={styles.title}>Step 3: Personalized Guidance</h3>
          <p className={styles.desc}>
            Receive tailored career insights and recommended paths suited just for you.
          </p>
        </div>
      </div>
    </section>
  );
}
