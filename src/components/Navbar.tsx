// src/components/Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        background: "linear-gradient(to bottom right, #2563eb, #7c3aed)",
        color: "white",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
          <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
            TicketFlow
          </Link>
        </h1>

        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "1.75rem",
            cursor: "pointer",
            display: "none",
          }}
          className="navbar-toggle"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Links */}
        <div
          className={`navbar-links ${menuOpen ? "active" : ""}`}
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            transition: "all 0.3s ease",
          }}
        >
          <Link to="/dashboard" style={navLinkStyle}>
            Dashboard
          </Link>
          <Link to="/tickets" style={navLinkStyle}>
            Tickets
          </Link>
          <Link to="/tickets/create" style={navLinkStyle}>
            Create
          </Link>
          <Link to="/login" style={{ ...navLinkStyle, color: "#fca5a5" }}>
            Logout
          </Link>
        </div>
      </div>

      {/* Responsive Mobile Styling */}
      <style>
        {`
          @media (max-width: 768px) {
            .navbar-toggle {
              display: block;
            }
            .navbar-links {
              flex-direction: column;
              width: 100%;
              display: none;
              background: rgba(0, 0, 0, 0.3);
              backdrop-filter: blur(12px);
              margin-top: 1rem;
              padding: 1rem 0;
              text-align: center;
            }
            .navbar-links.active {
              display: flex;
            }
            .navbar-links a {
              color: #ffffffcc;
              text-decoration: none;
              padding: 0.75rem 0;
              font-weight: 600;
              transition: color 0.3s;
            }
            .navbar-links a:hover {
              color: white;
            }
          }
        `}
      </style>
    </nav>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: "#ffffffcc",
  fontWeight: 600,
  textDecoration: "none",
  transition: "color 0.3s",
};
