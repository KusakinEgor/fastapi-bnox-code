import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      style={{
        padding: "12px 24px",
        backgroundColor: "#0f1117",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
            margin: 0,
            cursor: "pointer",
            transition: "color 0.3s ease, transform 0.2s ease",
          }}
          onClick={() => navigate("/")}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#3b82f6";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Bnox<span style={{ color: "#3b82f6" }}>Code</span>
        </h1>

        <nav
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                color: location.pathname === link.path ? "#3b82f6" : "#9ca3af",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: location.pathname === link.path ? "600" : "400",
                transition: "color 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === link.path ? "#3b82f6" : "#9ca3af")
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => navigate("/auth")}
          style={{
            padding: "8px 18px",
            fontSize: "15px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background 0.3s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1e40af";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#2563eb";
            e.currentTarget.style.transform = "scale(1)";
          }}
          className="desktop-signin"
        >
          Sign in
        </button>

        <button
          onClick={toggleMenu}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            display: "none", 
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "12px",
            textAlign: "center",
          }}
          className="mobile-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                color: location.pathname === link.path ? "#3b82f6" : "#9ca3af",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: location.pathname === link.path ? "600" : "400",
              }}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              navigate("/auth");
              setMenuOpen(false);
            }}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          >
            Sign in
          </button>
        </div>
      )}

      <style>
        {`
          @media (max-width: 768px) {
            .desktop-nav, .desktop-signin {
              display: none;
            }
            .mobile-menu-btn {
              display: block;
            }
          }
        `}
      </style>
    </header>
  );
}
