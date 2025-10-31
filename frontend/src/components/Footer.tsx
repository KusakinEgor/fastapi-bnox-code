import React from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/KusakinEgor/bnox-code" },
    { icon: <FaEnvelope />, href: "mailto:example@example.com" },
  ];

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #0f111a, #1a1d29)",
        color: "#aaa",
        padding: "60px 20px",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Copy */}
        <p style={{ fontSize: "14px", marginBottom: "10px" }}>
          &copy; {new Date().getFullYear()} <strong>Bnox-Code</strong>. All rights reserved.
        </p>

        {/* Links */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "10px" }}>
          {["About", "Contact"].map((link, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ y: -2, color: "#6366f1" }}
              style={{ color: "#aaa", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Social Icons */}
        <div style={{ display: "flex", gap: "20px" }}>
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#6366f1" }}
              style={{ color: "#aaa", fontSize: "18px", transition: "color 0.3s" }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
