"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./GlobalLoader.module.css";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start loader on route change
    setLoading(true);

    // Hide loader after 600ms
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
}
