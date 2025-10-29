// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/storage";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Determine which links to show based on current page
  const isDashboard = location.pathname === "/dashboard";
  const isTicketList = location.pathname === "/tickets" || location.pathname === "/ticket-list";
  const isLanding = location.pathname === "/" || location.pathname === "/landing";

  const renderLinks = () => {
    if (isLoggedIn) {
      // Dashboard page: Show only Logout
      if (isDashboard) {
        return (
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#dc2626",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
              transition: "color 0.3s",
              padding: isMobile ? "0.5rem 0" : "0",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#b91c1c")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#dc2626")}
          >
            Logout
          </button>
        );
      }

      // Ticket List page: Show Dashboard and Logout
      if (isTicketList) {
        return (
          <>
            <Link
              to="/dashboard"
              onClick={() => handleLinkClick("/dashboard")}
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1rem",
                transition: "color 0.3s",
                padding: isMobile ? "0.5rem 0" : "0",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#1d4ed8")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#2563eb")}
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "#dc2626",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1rem",
                transition: "color 0.3s",
                padding: isMobile ? "0.5rem 0" : "0",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#b91c1c")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#dc2626")}
            >
              Logout
            </button>
          </>
        );
      }

      // Other logged-in pages: Show Dashboard, Tickets, and Logout
      return (
        <>
          <Link
            to="/dashboard"
            onClick={() => handleLinkClick("/dashboard")}
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "color 0.3s",
              padding: isMobile ? "0.5rem 0" : "0",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#1d4ed8")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#2563eb")}
          >
            Dashboard
          </Link>

          <Link
            to="/tickets"
            onClick={() => handleLinkClick("/tickets")}
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "color 0.3s",
              padding: isMobile ? "0.5rem 0" : "0",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#1d4ed8")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#2563eb")}
          >
            Tickets
          </Link>

          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#dc2626",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
              transition: "color 0.3s",
              padding: isMobile ? "0.5rem 0" : "0",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#b91c1c")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#dc2626")}
          >
            Logout
          </button>
        </>
      );
    }

    // Landing page or not logged in: Show Login, Contact, Tickets
    return (
      <>
        <Link
          to="/login"
          onClick={() => handleLinkClick("/login")}
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem",
            transition: "color 0.3s",
            padding: isMobile ? "0.5rem 0" : "0",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#1d4ed8")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#2563eb")}
        >
          Login
        </Link>

        <Link
          to="/contact"
          onClick={() => handleLinkClick("/contact")}
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem",
            transition: "color 0.3s",
            padding: isMobile ? "0.5rem 0" : "0",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#1d4ed8")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#2563eb")}
        >
          Contact
        </Link>

        <Link
          to="/tickets"
          onClick={() => handleLinkClick("/tickets")}
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem",
            transition: "color 0.3s",
            padding: isMobile ? "0.5rem 0" : "0",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#1d4ed8")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#2563eb")}
        >
          Tickets
        </Link>
      </>
    );
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
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          color: "#2563eb",
          fontWeight: 700,
          fontSize: "1.5rem",
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
          background: isMobile ? "white" : "transparent",
          width: isMobile ? "100%" : "auto",
          padding: isMobile ? "1.5rem 0" : 0,
          gap: "1rem",
          alignItems: "center",
          textAlign: "center",
          transition: "all 0.3s ease",
          boxShadow: isMobile ? "0 4px 6px rgba(0,0,0,0.1)" : "none",
        }}
      >
        {renderLinks()}
      </div>
    </nav>
  );
}