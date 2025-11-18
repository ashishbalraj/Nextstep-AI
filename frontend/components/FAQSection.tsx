"use client";
import { useState } from "react";
import styles from "./FAQSection.module.css";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does NextStep AI guide my career?",
      answer:
        "Our AI analyzes your academic data, subjects, and interests, then matches them with career options and job trends.",
    },
    {
      question: "Do I need to sign up or log in?",
      answer:
        "You can directly fill in the Career Form and get your prediction without creating an account.So the platform works with or without signing in — totally your choice.",
    },
    {
      question: "Can I update my inputs later?",
      answer:
        "Yes, you can revisit the form and submit updated academic or interest data anytime for new AI insights.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>
      <div className={styles.faqs}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faq} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            <button
              className={styles.question}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <ChevronDown
                size={20}
                className={`${styles.icon} ${
                  activeIndex === index ? styles.rotate : ""
                }`}
              />
            </button>
            <div
              className={`${styles.answer} ${
                activeIndex === index ? styles.show : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
