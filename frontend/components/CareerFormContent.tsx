"use client";

import { useState } from "react";
import styles from "./CareerFormContent.module.css";
import { useRouter } from "next/navigation";

export default function CareerFormContent() {
  const [form, setForm] = useState({
    qualification: "",
    hobbies: "",
    about: "",
    goal: "",
    skills: "",
  });

  const [errors, setErrors] = useState({
    qualification: "",
    hobbies: "",
    about: "",
    goal: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const router = useRouter();

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate inputs before submit
  const validate = () => {
    let valid = true;
    let newErrors: any = {};

    if (!form.qualification.trim()) {
      newErrors.qualification = "Please enter your highest qualification.";
      valid = false;
    }

    if (!form.hobbies.trim()) {
      newErrors.hobbies = "Please enter your hobbies.";
      valid = false;
    }

    if (form.about.trim().length < 30) {
      newErrors.about = "Please write at least 30 characters.";
      valid = false;
    }

    if (!form.goal.trim()) {
      newErrors.goal = "Please enter your career goal.";
      valid = false;
    }

    if (!form.skills.trim()) {
      newErrors.skills = "Please enter your skills.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit handler (Connected to ML backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setServerMsg("");

    try {
      // read email stored during signin/signup
      let emailToSend: string | null = null;
      try {
        emailToSend = localStorage.getItem("ns_user_email");
      } catch (err) {
        emailToSend = null;
      }

      // build the payload to send to backend
      const payload = {
        ...form,
        email: emailToSend, // attach user email here
      };

      const res = await fetch("http://localhost:5000/api/career/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerMsg(data.error || "Prediction failed.");
        setLoading(false);
        return;
      }

      const predictedCareer = data.career_prediction;

      setServerMsg("Prediction successful 🎉 Redirecting...");
      console.log("Predicted career:", predictedCareer);

      // Step 1: loading page
      router.push("/loading");

      // Step 2: result page with predicted career
      setTimeout(() => {
        router.push(`/result?career=${encodeURIComponent(predictedCareer)}`);
      }, 1500);

      // Reset form after submit
      setForm({
        qualification: "",
        hobbies: "",
        about: "",
        goal: "",
        skills: "",
      });

      setLoading(false);
    } catch (error: any) {
      setServerMsg("Server error: " + error.message);
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Career Guidance Form</h1>
        <p className={styles.subtext}>
          Fill in the details below to receive AI-powered career insights.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>

          {/* Qualification */}
          <label className={styles.label}>Highest Qualification / Currently Pursuing</label>
          <input
            type="text"
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            className={styles.input}
            placeholder="e.g., BSc CS, Diploma, 12th Grade"
          />
          {errors.qualification && <p className={styles.error}>{errors.qualification}</p>}

          {/* Hobbies */}
          <label className={styles.label}>Hobbies</label>
          <input
            type="text"
            name="hobbies"
            value={form.hobbies}
            onChange={handleChange}
            className={styles.input}
            placeholder="e.g., Reading, Coding, Music"
          />
          {errors.hobbies && <p className={styles.error}>{errors.hobbies}</p>}

          {/* About */}
          <label className={styles.label}>About Yourself & Interests</label>
          <textarea
            name="about"
            rows={5}
            value={form.about}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Write at least 30 characters..."
          ></textarea>
          {errors.about && <p className={styles.error}>{errors.about}</p>}

          {/* Career Goal */}
          <label className={styles.label}>Career Goal</label>
          <input
            type="text"
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className={styles.input}
            placeholder="e.g., Data Scientist, Software Engineer"
          />
          {errors.goal && <p className={styles.error}>{errors.goal}</p>}

          {/* Skills */}
          <label className={styles.label}>Skills</label>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className={styles.input}
            placeholder="e.g., Python, Communication"
          />
          {errors.skills && <p className={styles.error}>{errors.skills}</p>}

          {/* Server message */}
          {serverMsg && <p className={styles.serverMsg}>{serverMsg}</p>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Processing..." : "Submit Details"}
          </button>
        </form>
      </div>
    </section>
  );
}
