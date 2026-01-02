import { useState } from 'react';

export default function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    const x = ((clientX - left) / width - 0.5) * 60; 
    const y = ((clientY - top) / height - 0.5) * 60;

    setOffset({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        padding: "140px 20px",
        textAlign: "center",
        backgroundColor: "#0f1117",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle at center, rgba(37, 99, 235, 0.4), transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
          transition: "transform 0.1s linear",
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Build the Future with Our Platform
        </h1>
        <p
          style={{
            fontSize: "20px",
            maxWidth: "700px",
            margin: "0 auto 40px",
            color: "#9ca3af",
          }}
        >
          The most reliable infrastructure for your AI, apps, and business.
        </p>
        <button
          style={{
            padding: "14px 32px",
            fontSize: "16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
