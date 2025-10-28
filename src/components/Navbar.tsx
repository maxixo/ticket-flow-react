import { Link, useNavigate } from "react-router-dom";
import { logout } from "./../utils/storage";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      background: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#2563eb" }}>TicketFlow</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/dashboard" style={{ color: "#374151", textDecoration: "none", fontWeight: 500 }}>Dashboard</Link>
        <button onClick={handleLogout} style={{
          color: "#dc2626",
          fontWeight: 600,
          background: "none",
          border: "none",
          cursor: "pointer"
        }}>Logout</button>
      </div>
    </nav>
  );
}
