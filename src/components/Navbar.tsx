// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <nav
      className="navbar"
      style={{
        background: "linear-gradient(to right, #2563eb, #7c3aed)",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      {/* ✅ Logo text cleaned — no stray characters */}
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.25rem",
          letterSpacing: "0.5px",
          userSelect: "none",
        }}
      >
        TicketFlow
      </div>

      {/* Hamburger Toggle */}
      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        style={{
          background: "none",
          border: "none",
          color: "white",
          fontSize: "1.8rem",
          cursor: "pointer",
          display: isMobile ? "block" : "none",
        }}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation Links */}
      <div
        className={`navbar-links ${menuOpen && isMobile ? "active" : ""}`}
        style={{
          display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
          flexDirection: isMobile ? "column" : "row",
          position: isMobile ? "absolute" : "static",
          top: "64px",
          right: 0,
          background: isMobile ? "rgba(37,99,235,0.97)" : "transparent",
          width: isMobile ? "100%" : "auto",
          padding: isMobile ? "1rem 0" : 0,
          gap: isMobile ? "1.25rem" : "2rem",
          textAlign: "center",
          transition: "all 0.3s ease",
        }}
      >
        <Link
          to="/dashboard"
          onClick={() => handleLinkClick("/dashboard")}
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/tickets"
          onClick={() => handleLinkClick("/tickets")}
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          Tickets
        </Link>

        <Link
          to="/tickets/create"
          onClick={() => handleLinkClick("/tickets/create")}
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          Create
        </Link>

        <button
          onClick={() => handleLinkClick("/login")}
          style={{
            background: "none",
            border: "none",
            color: "#fca5a5",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
