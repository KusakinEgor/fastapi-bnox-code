import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { getCurrentUser } from "../api/api";

export default function Profile() {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      if (!data.error) setUser(data);
    };
    fetchUser();
  }, []);

  const days = 42;
  const today = new Date();
  const activity = Array.from({ length: days }, (_, i) => {
  const date = new Date();
  date.setDate(today.getDate() - (days - 1 - i));
  return {
    date: date.toDateString(),
    coded: Math.random() > 0.5,
  };
  });

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>, text: string) => {
    setTooltip({ text, x: e.clientX + 10, y: e.clientY + 10 });
  };
  const handleMouseOut = () => setTooltip(null);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f1117, #1f1f2e)",
        color: "white",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "#1f2028",
          borderRadius: "16px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          animation: "fadeIn 1s ease-in-out",
          gap: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2563eb, #60a5fa)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px #2563eb",
            animation: "pulse 2s infinite",
          }}
        >
          <User size={60} color="white" />
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #60a5fa, #2563eb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "glow 3s ease-in-out infinite alternate",
          }}
        >
          {user ? user.name : "Загрузка..."}
        </h2>

        <button
          style={{
            marginTop: "8px",
            padding: "6px 14px",
            borderRadius: "12px",
            background: "linear-gradient(90deg, #2563eb, #60a5fa)",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          Edit Profile
        </button>

        <p style={{ color: "#9ca3af", margin: "4px 0 0" }}>
          {user ? user.email : "Загрузка..."}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 20px)",
            gap: "4px",
            marginTop: "20px",
          }}
        >
          {activity.map((day, idx) => (
            <div
              key={idx}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "4px",
                backgroundColor: day.coded ? "#2563eb" : "#2a2c36",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                handleMouseOver(e, `${day.date}: ${day.coded ? "Кодил" : "Не кодил"}`)
              }
              onMouseOut={handleMouseOut}
            />
          ))}
        </div>

        {tooltip && (
          <div
            style={{
              position: "fixed",
              top: tooltip.y,
              left: tooltip.x,
              padding: "6px 12px",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "12px",
              pointerEvents: "none",
              transition: "all 0.2s ease",
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>

      <style>{`
        @keyframes glow {
          0% { text-shadow: 0 0 5px #2563eb, 0 0 10px #60a5fa; }
          50% { text-shadow: 0 0 15px #60a5fa, 0 0 30px #2563eb; }
          100% { text-shadow: 0 0 5px #2563eb, 0 0 10px #60a5fa; }
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 20px #2563eb; }
          50% { transform: scale(1.05); box-shadow: 0 0 30px #60a5fa; }
          100% { transform: scale(1); box-shadow: 0 0 20px #2563eb; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
