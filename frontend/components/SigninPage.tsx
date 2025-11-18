"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SigninPage.module.css";
import Link from "next/link";

interface SignInForm {
  email: string;
  password: string;
}

interface SignInErrors {
  email: string;
  password: string;
}

export default function SignInPage() {
  const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<SignInErrors>({ email: "", password: "" });

  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let valid = true;
    let newErrors: SignInErrors = { email: "", password: "" };

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email.";
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerMsg(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // store email locally so we can attach it to future requests
try {
  localStorage.setItem("ns_user_email", form.email);
} catch (e) {}

      setServerMsg("Login successful 🎉");
setLoading(false);

// delay before redirect
setTimeout(() => {
  router.push("/dashboard");
}, 1500);


    } catch (error: any) {
      setServerMsg("Server error: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.aiGlow}></div>
      <div className={styles.aiParticles}></div>

      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back 👋</h1>
        <p className={styles.subtitle}>Sign in to continue</p>

        <form className={styles.form} onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            value={form.email}
            onChange={handleInput}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            value={form.password}
            onChange={handleInput}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

{serverMsg && (
  <p
    className={`${styles.serverMessage} ${
      serverMsg.toLowerCase().includes("success")
        ? styles.successMessage
        : styles.errorMessage
    }`}
  >
    {serverMsg} {serverMsg.toLowerCase().includes("success") && "Redirecting..."}
  </p>
)}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={styles.switchText}>
          Don’t have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
