'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const showAuthButtons = pathname === "/";

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* Logo Section */}
        <div className={styles.leftSide}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo2.svg"
              alt="NextStep AI Logo"
              width={250}
              height={300}
              priority
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/dashboard" className={styles.link}>Dashboard</Link>

          {/* <Link href="/careerform" className={styles.link}>Career Form</Link> */}
          <Link href="/chatbot" className={styles.link}>Chatbot</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>

        </nav>

        {/* Right side buttons */}
        <div className={styles.rightSide}>
          {showAuthButtons && (
            <div className={styles.authButtons}>
              <Link href="/signin" className={styles.signinButton}>Sign In</Link>
              <Link href="/signup" className={styles.signupButton}>Sign Up</Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
