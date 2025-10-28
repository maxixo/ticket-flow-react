// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/storage";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      // Check for currentUser (matches your storage.ts key)
      const currentUser = localStorage.getItem("currentUser");
      setIsLoggedIn(!!currentUser);
    };

    checkAuth();

    // Listen for custom auth event (same tab)
    window.addEventListener("authChange", checkAuth);
    // Listen for storage changes (other tabs)
    window.addEventListener("storage", checkAuth);
    
    // Check auth on window focus (when user comes back to tab)
    window.addEventListener("focus", checkAuth);
    
    return () => {
      window.removeEventListener("authChange", checkAuth);
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("focus", checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    // Use the logout function from storage.ts
    logout();
    
    // Update state
    setIsLoggedIn(false);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authChange"));
    
    // Close menu and redirect
    setMenuOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className="navbar"
      style={{
        background: "white",
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
      {/* Logo */}
      <div
        style={{
          color: "#2563eb",
          fontWeight: 700,
          fontSize: "1.25rem",
          letterSpacing: "0.5px",
          userSelect: "none",
          cursor: "pointer",
        }}
        onClick={() => handleLinkClick(isLoggedIn ? "/dashboard" : "/")}
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
          color: "#2563eb",
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
          alignItems: "center",
          textAlign: "center",
          transition: "all 0.3s ease",
        }}
      >
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              onClick={() => handleLinkClick("/dashboard")}
              style={{
                color: isMobile ? "white" : "#2563eb",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1rem",
                transition: "color 0.3s",
              }}
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: isMobile ? "white" : "#dc2626",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => !isMobile && (e.currentTarget.style.color = "#b91c1c")}
              onMouseOut={(e) => !isMobile && (e.currentTarget.style.color = "#dc2626")}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              style={{
                color: isMobile ? "white" : "#2563eb",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1rem",
                transition: "color 0.3s",
              }}
            >
              Home
            </Link>

            <button
              onClick={handleLogin}
              style={{
                background: "white",
                border: "none",
                color:  "#2563eb",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1rem",
                borderRadius: "0.5rem",
              }}
             
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}