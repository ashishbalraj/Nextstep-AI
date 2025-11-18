"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatbotContent.module.css";
import { Send } from "lucide-react";

export default function ChatbotContent() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your career assistant. How can I help you today?" }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;

    // Add the user's message instantly
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    // Show "typing..." message
    setLoading(true);
    setMessages((prev) => [...prev, { sender: "bot", text: "Typing..." }]);

    try {
      // Send to backend AI route
      const response = await fetch("http://localhost:5000/api/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();

      // Remove typing message
      setMessages((prev) => prev.slice(0, -1));

      // Add real AI response
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "Sorry, I couldn't understand that." }
      ]);

      setLoading(false);

    } catch (error) {
      console.error("Chatbot error:", error);

      // Remove typing message
      setMessages((prev) => prev.slice(0, -1));

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server error. Try again later." }
      ]);

      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.chatContainer}>
        <h1 className={styles.heading}>Career Chat Assistant</h1>

        {/* Messages */}
        <div className={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                msg.sender === "user" ? styles.userMessage : styles.botMessage
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <input
            type="text"
            className={styles.input}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className={styles.sendButton} onClick={sendMessage} disabled={loading}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
