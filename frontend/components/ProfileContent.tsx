"use client";

import { useEffect, useState } from "react";
import styles from "./ProfileContent.module.css";

export default function ProfileContent() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("ns_user_email");
    const storedName = localStorage.getItem("ns_display_name");

    if (storedEmail) setEmail(storedEmail);
    if (storedName) setName(storedName);
  }, []);

  const handleSave = () => {
    localStorage.setItem("ns_display_name", name);
    setMessage("Profile updated successfully ✔️");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.aiGlow}></div>
      <div className={styles.aiParticles}></div>
      <div className={styles.card}>
        <h1 className={styles.title}>Profile Settings</h1>

        <label className={styles.label}>Display Name</label>
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label className={styles.label}>Email</label>
        <input type="text" className={styles.input} value={email} readOnly />

        {message && <p className={styles.message}>{message}</p>}

        <button className={styles.button} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
