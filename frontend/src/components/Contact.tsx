import React, { useState } from "react";
import { contact } from "../api/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await contact(name, email, message);

    if (res.error) {
      alert(res.error);
    } else {
      alert(res.message || "Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#0f1117",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Contact Us</h1>
      <p style={{ maxWidth: "600px", textAlign: "center", marginBottom: "30px" }}>
        Have questions, suggestions, or just want to say hi? Reach out to us anytime!
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "320px",
          backgroundColor: "#1f2937",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #374151",
            backgroundColor: "#111827",
            color: "white",
          }}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #374151",
            backgroundColor: "#111827",
            color: "white",
          }}
        />
        <textarea
          placeholder="Your Message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #374151",
            backgroundColor: "#111827",
            color: "white",
            resize: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            fontSize: "15px",
            backgroundColor: "#2563eb",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        >
          Send
        </button>
      </form>
    </div>
  );
}
