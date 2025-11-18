"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>NextStep AI</h2>

      <nav className={styles.nav}>
        <Link href="/dashboard" className={styles.link}>Dashboard</Link>
        <Link href="/profile" className={styles.link}>Profile</Link>
        <Link href="/careerform" className={styles.link}>Career Form</Link>
        <Link href="/chatbot" className={styles.link}>AI Chatbot</Link>

        <button
          className={styles.logout}
          onClick={() => {
            localStorage.removeItem("ns_user_email");
            localStorage.removeItem("ns_display_name");
            window.location.href = "/signin";
          }}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
