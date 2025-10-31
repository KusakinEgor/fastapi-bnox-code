import React from "react";
import { FaLaptopCode, FaRobot, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

interface Feature {
  title: string;
  desc: string;
  icon: JSX.Element;
}

export default function Features() {
  const features: Feature[] = [
    {
      title: "Online IDE",
      desc: "Write and run code in the browser with real-time output.",
      icon: <FaLaptopCode size={28} color="#3b82f6" />,
    },
    {
      title: "AI Assistant",
      desc: "Get smart code suggestions and explanations powered by AI.",
      icon: <FaRobot size={28} color="#3b82f6" />,
    },
    {
      title: "Collaboration",
      desc: "Share projects and collaborate with your team in real time.",
      icon: <FaUsers size={28} color="#3b82f6" />,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#0f1117",
        color: "white",
        height: "100vh", // <-- обязательно
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // центр по вертикали
        alignItems: "center",
        overflow: "hidden",
        padding: "0 20px", // горизонтальные отступы
      }}
    >
      {/* Анимированные фоновые круги */}
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, #3b82f6, transparent)",
          borderRadius: "50%",
          opacity: 0.2,
        }}
      />
      <motion.div
        animate={{ x: [0, -15, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        style={{
          position: "absolute",
          bottom: "-120px",
          right: "-120px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, #6366f1, transparent)",
          borderRadius: "50%",
          opacity: 0.2,
        }}
      />

      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: "900px", width: "100%", textAlign: "center", zIndex: 1 }}
      >
        <h1 style={{ fontSize: "38px", fontWeight: "bold", marginBottom: "16px" }}>
          Features of <span style={{ color: "white" }}>Bnox</span>
          <span style={{ color: "#3b82f6" }}>Code</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#9ca3af", marginBottom: "40px" }}>
          Build, run, and share your projects seamlessly with our cutting-edge platform
        </p>
      </motion.div>

      {/* Карточки */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          maxWidth: "900px",
          width: "100%",
          zIndex: 1,
        }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
            }}
            style={{
              backgroundColor: "#1f2028",
              padding: "28px 20px",
              borderRadius: "14px",
              textAlign: "center",
              cursor: "default",
              transition: "all 0.3s ease",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 8 }}
              style={{ marginBottom: "14px" }}
            >
              {feature.icon}
            </motion.div>
            <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "10px", color: "#3b82f6" }}>
              {feature.title}
            </h3>
            <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: 1.5 }}>
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
