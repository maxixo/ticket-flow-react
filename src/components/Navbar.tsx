// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // ✅ ensure global navbar styles apply

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  // ✅ Handle resize to toggle between desktop and mobile layouts
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Close mobile menu after clicking a link
  const handleLinkClick = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">TicketFlow</div>

      {/* Hamburger toggle (mobile only) */}
      <button
        className="navbar-toggle"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation links */}
      <div className={`navbar-links ${menuOpen && isMobile ? "active" : ""}`}>
        <Link to="/dashboard" onClick={() => handleLinkClick("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/tickets" onClick={() => handleLinkClick("/tickets")}>
          Tickets
        </Link>
        <Link to="/tickets/create" onClick={() => handleLinkClick("/tickets/create")}>
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
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
