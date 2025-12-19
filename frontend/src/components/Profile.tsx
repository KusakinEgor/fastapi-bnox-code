import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { getCurrentUser } from "../api/api";

interface ActivityDay {
  date: Date;
  coded: number; // кол-во строк / интенсивность
}

interface ProgramRun {
  id: number;
  language: string;
  lines: number;
  description: string;
  date: string;
  status: "Success" | "Error";
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [activity, setActivity] = useState<ActivityDay[]>([]);
  const [runs, setRuns] = useState<ProgramRun[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      if (!data.error) setUser(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const today = new Date();
    const days: ActivityDay[] = Array.from({ length: 42 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (41 - i));
      return { date, coded: Math.floor(Math.random() * 50) }; // интенсивность кодинга
    });
    setActivity(days);

    setRuns([
      { id: 1, language: "Python", lines: 25, description: "Парсер сайта", date: "2025-12-19 12:30", status: "Success" },
      { id: 2, language: "Rust", lines: 42, description: "CLI инструмент", date: "2025-12-18 16:45", status: "Error" },
      { id: 3, language: "JavaScript", lines: 18, description: "Функция API", date: "2025-12-17 09:10", status: "Success" },
    ]);
  }, []);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>, text: string) => {
    setTooltip({ text, x: e.clientX + 10, y: e.clientY + 10 });
  };
  const handleMouseOut = () => setTooltip(null);

  // Градация цвета по интенсивности
  const getColor = (coded: number) => {
    if (coded === 0) return "#2a2c36";
    if (coded < 10) return "#3b82f6";
    if (coded < 25) return "#60a5fa";
    if (coded < 40) return "#93c5fd";
    return "#bfdbfe";
  };

  const totalActiveDays = activity.filter(d => d.coded > 0).length;
  const totalInactiveDays = activity.length - totalActiveDays;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1117",
        color: "white",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "32px", fontWeight: "bold" }}>
        Мой Профиль
      </h1>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: "1000px" }}>
        {/* Левая колонка */}
        <div
          style={{
            minWidth: "320px",
            backgroundColor: "#1f2028",
            borderRadius: "16px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            flexGrow: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563eb, #60a5fa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px #2563eb",
              }}
            >
              <User size={60} color="white" />
            </div>
            <h2 style={{ margin: 0, fontSize: "24px" }}>{user?.name || "Загрузка..."}</h2>
            <p style={{ color: "#9ca3af", margin: 0 }}>{user?.email || "Загрузка..."}</p>
            <button
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                borderRadius: "12px",
                background: "linear-gradient(90deg, #2563eb, #60a5fa)",
                border: "none",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Редактировать
            </button>
          </div>

          <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-around" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>{totalActiveDays}</p>
              <p style={{ margin: 0, color: "#9ca3af" }}>Активные</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>{totalInactiveDays}</p>
              <p style={{ margin: 0, color: "#9ca3af" }}>Пассивные</p>
            </div>
          </div>
        </div>

        {/* Правая колонка */}
        <div
          style={{
            minWidth: "420px",
            backgroundColor: "#1f2028",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            flexGrow: 1,
          }}
        >
          <h3 style={{ margin: "0 0 16px 0", fontSize: "20px" }}>Активность за 6 недель</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4px" }}>
            {Array.from({ length: 6 }).map((_, weekIdx) => (
              <div key={weekIdx} style={{ display: "grid", gridTemplateRows: "repeat(7, 20px)", gap: "4px" }}>
                {activity.slice(weekIdx * 7, weekIdx * 7 + 7).map((day, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                      backgroundColor: getColor(day.coded),
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => handleMouseOver(e, `${day.date.toDateString()}: ${day.coded} строк`)}
                    onMouseOut={handleMouseOut}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Последние выполнения */}
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Последние выполнения</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {runs.map((run) => (
                <div
                  key={run.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#25262b",
                    padding: "12px",
                    borderRadius: "10px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ minWidth: "60px" }}>{run.language}</span>
                  <span style={{ flexGrow: 1, textAlign: "center" }}>{run.description}</span>
                  <span style={{ minWidth: "60px", textAlign: "center" }}>{run.lines} строк</span>
                  <span style={{ minWidth: "60px", textAlign: "center", color: run.status === "Success" ? "#4ade80" : "#f87171" }}>
                    {run.status}
                  </span>
                  <span style={{ minWidth: "100px", textAlign: "right" }}>{run.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
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
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default Profile;
