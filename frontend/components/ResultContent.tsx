"use client";

import styles from "./ResultContent.module.css";
import { Target, Brain, Lightbulb, Wrench, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * Simple mapping of career -> insights.
 * Edit this object to add more careers or change text.
 */
const INSIGHTS: Record<string, {
  why: string[],
  strengths: string[],
  skills: string[],
  nextSteps: string[]
}> = {
  "software engineer": {
    why: [
      "Strong problem solving and logical thinking",
      "Comfortable with programming and system design",
      "Good fit when you enjoy building products and services"
    ],
    strengths: [
      "Coding fundamentals",
      "Debugging & system thinking",
      "Attention to architecture"
    ],
    skills: [
      "Data structures & algorithms",
      "Backend frameworks and REST/GraphQL",
      "Unit testing and CI/CD"
    ],
    nextSteps: [
      "Build small full-stack projects",
      "Learn a backend framework (Node/Python/Java)",
      "Practice algorithms on platforms like LeetCode"
    ]
  },

  "data analyst": {
    why: [
      "You enjoy finding insights from data",
      "You like visualizing information and telling a story with numbers"
    ],
    strengths: [
      "Analytical thinking",
      "Comfort with spreadsheets and tabular data",
      "Ability to interpret charts"
    ],
    skills: [
      "SQL and relational databases",
      "Excel / pandas for data cleaning",
      "Basic statistics and visualization (PowerBI/Tableau)"
    ],
    nextSteps: [
      "Take a beginner data analysis course",
      "Complete a small project analyzing a dataset",
      "Learn SQL and build dashboards"
    ]
  },

  "data scientist": {
    why: [
      "You like working with models, math and real-world problems",
      "You enjoy both data cleaning and modeling"
    ],
    strengths: [
      "Statistical thinking",
      "Comfort with Python & libraries",
      "Curiosity to test hypotheses"
    ],
    skills: [
      "Python (pandas, scikit-learn)",
      "Data preprocessing and feature engineering",
      "Model evaluation and basic ML algorithms"
    ],
    nextSteps: [
      "Work on small ML projects (regression/classification)",
      "Learn model validation and pipelines",
      "Share projects on GitHub and Kaggle"
    ]
  },

  "ai engineer": {
    why: [
      "You are excited by applied machine learning and deploying models",
      "Good when you like engineering and ML together"
    ],
    strengths: [
      "System design for ML",
      "Model deployment knowledge",
      "Understanding of ML lifecycle"
    ],
    skills: [
      "Deep learning basics and frameworks (PyTorch/TensorFlow)",
      "APIs and model serving",
      "MLOps basics (Docker, CI)"
    ],
    nextSteps: [
      "Train a small neural network and deploy it",
      "Learn containerization and model serving",
      "Study end-to-end ML projects"
    ]
  },

  "ui/ux designer": {
    why: [
      "You enjoy visual design and improving user experiences",
      "Good if you care about usability and aesthetics"
    ],
    strengths: [
      "Visual sense and empathy for users",
      "Wireframing and prototyping skills",
      "Attention to user flows"
    ],
    skills: [
      "Figma / Adobe XD",
      "User research and usability testing",
      "Basic frontend knowledge (HTML/CSS)"
    ],
    nextSteps: [
      "Create UI mockups and prototypes",
      "Study design patterns and accessibility",
      "Build a small portfolio of screens"
    ]
  }
};

export default function ResultContent() {
  const searchParams = useSearchParams();
  const rawCareer = searchParams.get("career") || "";
  const careerKey = rawCareer.trim().toLowerCase();

  // pick insights if available, otherwise fallback to a generic suggestion
  const insights = INSIGHTS[careerKey];

  // fallback content when career is unknown
  const fallback = {
    why: [
      "Model returned: " + (rawCareer || "Unknown"),
      "We provide general suggestions below — refine inputs for better results."
    ],
    strengths: [
      "Curiosity to learn",
      "Willingness to practice",
      "Basic problem solving"
    ],
    skills: [
      "Clear communication",
      "Learn fundamentals in your interest area",
      "Build small projects"
    ],
    nextSteps: [
      "Try refining your career goal wording",
      "Add more concrete skills in the form",
      "Check related courses and tutorials"
    ]
  };

  const shown = insights ?? fallback;

  return (
    <section className={styles.section}>

      {/* Hero Header */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Your AI Career Insights</h1>
        <p className={styles.heroSubtitle}>
          Based on your inputs, here's the personalized guidance crafted for you.
        </p>
      </div>

      <div className={styles.gridContainer}>

        {/* Main Career Card (Full Width) */}
        <div className={`${styles.card} ${styles.fullWidth}`}>
          <div className={styles.cardHeader}>
            <Target size={28} className={styles.icon} />
            <h2>Suggested Career</h2>
          </div>
          <p className={styles.mainResult}>{rawCareer || "Career Not Found"}</p>
        </div>

        {/* Why This Career */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Brain size={28} className={styles.icon} />
            <h2>Why This Career?</h2>
          </div>
          <ul className={styles.list}>
            {shown.why.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>

        {/* Strengths */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Lightbulb size={28} className={styles.icon} />
            <h2>Your Strengths</h2>
          </div>
          <ul className={styles.list}>
            {shown.strengths.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>

        {/* Skills to Improve */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Wrench size={28} className={styles.icon} />
            <h2>Skills to Improve</h2>
          </div>
          <ul className={styles.list}>
            {shown.skills.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>

        {/* Next Steps */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <TrendingUp size={28} className={styles.icon} />
            <h2>Next Steps</h2>
          </div>
          <ul className={styles.list}>
            {shown.nextSteps.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonRow}>
        <Link href="/careerform" className={styles.buttonPrimary}>
          Try Again
        </Link>

        <Link href="/chatbot" className={styles.buttonSecondary}>
          Chat with AI
        </Link>

        <Link href="/dashboard" className={styles.buttonOutline}>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
