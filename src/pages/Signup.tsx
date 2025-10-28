import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUsers, saveUsers, setCurrentUser } from "../utils/storage";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();

    if (users.some(u => u.email === email)) {
      setError("Email already exists.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    navigate("/dashboard");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f9fafb"
    }}>
      <form onSubmit={handleSignup} style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "400px"
      }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2563eb", marginBottom: "1rem" }}>Sign Up</h2>
        {error && <p style={{ color: "#dc2626", marginBottom: "1rem" }}>{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}
          required
        />
        <button type="submit" style={{
          background: "#16a34a",
          color: "#fff",
          padding: "0.75rem",
          width: "100%",
          border: "none",
          borderRadius: "0.5rem",
          fontWeight: 600
        }}>Sign Up</button>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Already have an account? <Link to="/login" style={{ color: "#2563eb" }}>Login</Link>
        </p>
      </form>
    </div>
  );
}
