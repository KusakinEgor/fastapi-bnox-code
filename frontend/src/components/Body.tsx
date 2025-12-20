import React, { useEffect } from "react";
import { FaRocket, FaLock, FaCheckCircle, FaKeyboard, FaPlay, FaShareAlt } from "react-icons/fa";
import { SiPython, SiJavascript } from "react-icons/si";
import { motion } from "framer-motion";

export default function Body() {
  useEffect(() => {
    document.body.style.background = "linear-gradient(120deg, #0f111a, #1a1d29)";
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section
      style={{
        padding: "80px 20px",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "50px" }}>
          Why Choose Our Platform?
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px" }}>
          {[
            { icon: <FaRocket size={28} />, title: "Fast", desc: "Optimized for performance and scalability." },
            { icon: <FaLock size={28} />, title: "Secure", desc: "Enterprise-level security by default." },
            { icon: <FaCheckCircle size={28} />, title: "Reliable", desc: "99.99% uptime and trusted worldwide." },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
              }}
              style={{
                padding: "25px",
                borderRadius: "16px",
                background: "#1a1d29",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                textAlign: "center",
                cursor: "pointer",
                border: "1px solid rgba(79,70,229,0.3)",
                transition: "border 0.3s ease",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10, color: "#6366f1" }}
                style={{ marginBottom: "15px", color: "#4f46e5" }}
              >
                {item.icon}
              </motion.div>
              <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ color: "#9ca3af", fontSize: "15px" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: "120px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "40px" }}>How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px" }}>
            {[
              { icon: <FaKeyboard size={24} />, title: "Write Code", desc: "Type Python or JavaScript directly in the browser." },
              { icon: <FaPlay size={24} />, title: "Run Instantly", desc: 'Click "Run" and see the output in real-time.' },
              { icon: <FaShareAlt size={24} />, title: "Share Easily", desc: "Generate a shareable link to your code snippet." },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
                }}
                style={{
                  padding: "25px",
                  borderRadius: "16px",
                  background: "#1a1d29",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                  textAlign: "center",
                  cursor: "pointer",
                  border: "1px solid rgba(79,70,229,0.2)",
                  transition: "border 0.3s ease",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5, color: "#6366f1" }}
                  style={{ marginBottom: "12px", color: "#4f46e5" }}
                >
                  {item.icon}
                </motion.div>
                <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "120px", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "40px" }}>Supported Languages</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
            {[
              { title: "Python", code: 'print("Hello, World!")', icon: <SiPython size={32} color="#3776AB"/> },
              { title: "JavaScript", code: 'console.log("Hello, World!");', icon: <SiJavascript size={32} color="#f7df1e"/> },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
                }}
                style={{
                  padding: "25px",
                  borderRadius: "16px",
                  background: "#1a1d29",
                  width: "240px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                  textAlign: "center",
                  cursor: "pointer",
                  border: "1px solid rgba(79,70,229,0.2)",
                  transition: "border 0.3s ease",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 5, color: item.title === "Python" ? "#3776AB" : "#f7df1e" }}
                  style={{ marginBottom: "12px" }}
                >
                  {item.icon}
                </motion.div>
                <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>{item.title}</h3>
                <pre style={{ textAlign: "left", color: "#9ca3af", fontSize: "14px" }}>{item.code}</pre>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
