"use client";

import { useEffect, useState } from "react";
import styles from "./DashboardContent.module.css";
import Link from "next/link";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Stats
  const [totalPredictions, setTotalPredictions] = useState(0);
  const [mostCommonCareer, setMostCommonCareer] = useState("N/A");
  const [lastPredictionDate, setLastPredictionDate] = useState("N/A");

  useEffect(() => {
    const storedEmail = localStorage.getItem("ns_user_email");

    if (storedEmail) {
      setUserEmail(storedEmail);

      fetch(`http://localhost:5000/api/user/predictions?email=${storedEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.history) {
            const hist = data.history;
            setHistory(hist);

            // 1️⃣ Total Predictions
            setTotalPredictions(hist.length);

            // 2️⃣ Most Suggested Career
            const freq: any = {};
            hist.forEach((item: any) => {
              freq[item.prediction] = (freq[item.prediction] || 0) + 1;
            });
            const mostCommon = Object.keys(freq).length
              ? Object.keys(freq).reduce((a, b) => (freq[a] > freq[b] ? a : b))
              : "N/A";
            setMostCommonCareer(mostCommon);

            // 3️⃣ Last Prediction Date
            if (hist.length > 0 && hist[0].created_at) {
              setLastPredictionDate(
                new Date(hist[0].created_at).toLocaleString()
              );
            }
          }

          setLoadingHistory(false);
        })
        .catch((err) => {
          console.error("Error fetching history:", err);
          setLoadingHistory(false);
        });
    } else {
      setLoadingHistory(false);
    }
  }, []);

  return (
    <div className={styles.container}>

      {/* Greeting */}
      <div className={styles.greetingCard}>
        <h1>Welcome 👋</h1>
        <p>{userEmail || "User"}</p>
      </div>

      {/* ⭐ Analytics Cards */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <p className={styles.statValue}>{totalPredictions}</p>
          <p className={styles.statLabel}>Total Predictions</p>
        </div>

        <div className={styles.statCard}>
          <p className={styles.statValue}>{mostCommonCareer}</p>
          <p className={styles.statLabel}>Most Suggested</p>
        </div>

        <div className={styles.statCard}>
          <p className={styles.statValue}>{lastPredictionDate}</p>
          <p className={styles.statLabel}>Last Prediction</p>
        </div>
      </div>

      {/* History */}
      <div className={styles.historyCard}>
        <h2>Your Past Predictions</h2>

        {loadingHistory ? (
          <p>Loading history…</p>
        ) : history.length === 0 ? (
          <p>No predictions yet.</p>
        ) : (
          <ul className={styles.historyList}>
            {history.map((item) => (
              <li key={item._id} className={styles.historyItem}>
                <strong>{item.prediction}</strong>
                <span>
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString()
                    : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Link href="/careerform" className={styles.actionButton}>
          Get New Prediction
        </Link>

        <Link href="/chatbot" className={styles.actionButton}>
          AI Chatbot
        </Link>

        {/* <button
          className={styles.logoutButton}
          onClick={() => {
            localStorage.removeItem("ns_user_email");
            window.location.href = "/signin";
          }}
        >
          Logout
        </button> */}
      </div>

    </div>
  );
}
