"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SignupPage.module.css";
import Link from "next/link";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
};

type SignUpErrors = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignUpErrors>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let valid = true;
    let newErrors: SignUpErrors = { name: "", email: "", password: "" };

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
      valid = false;
    }

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
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
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
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerMsg(data.error || "Signup failed.");
        setLoading(false);
        return;
      }

      // store email locally so career form can send it
try {
  localStorage.setItem("ns_user_email", form.email);
} catch (e) {
  // ignore if localStorage not available
}

      setServerMsg("Account created successfully 🎉");
setLoading(false);

// delay redirect
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
        <h1 className={styles.title}>Create Account ✨</h1>
        <p className={styles.subtitle}>Join NextStep AI</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className={styles.input}
            value={form.name}
            onChange={handleInput}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account? <Link href="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
