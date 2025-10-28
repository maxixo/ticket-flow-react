import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, setCurrentUser } from "../utils/storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const errs = { ...fieldErrors };

    if (field === "email") {
      if (!email.trim()) {
        errs.email = "Email is required.";
      } else if (!validateEmail(email)) {
        errs.email = "Please enter a valid email address.";
      } else {
        delete errs.email;
      }
    }

    if (field === "password") {
      if (!password.trim()) {
        errs.password = "Password is required.";
      } else if (password.length < 6) {
        errs.password = "Password must be at least 6 characters.";
      } else {
        delete errs.password;
      }
    }

    setFieldErrors(errs);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ email: true, password: true });

    // Validate all fields
    const errs: Record<string, string> = {};
    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!validateEmail(email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      errs.password = "Password is required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Check credentials
    const users = getUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      setError("Invalid email or password.");
      setSuccess("");
      return;
    }

    setCurrentUser(user);
    
    // 🔥 Dispatch custom event to notify Navbar of auth change
    window.dispatchEvent(new Event("authChange"));
    
    setError("");
    setSuccess("🎉 Logged in successfully!");
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #2563eb, #7c3aed)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.875rem",
            fontWeight: 700,
            textAlign: "center",
            color: "#1f2937",
            marginBottom: "1.5rem",
          }}
        >
          Welcome Back
        </h2>

        {success && (
          <div
            style={{
              backgroundColor: "#dcfce7",
              color: "#166534",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {success}
          </div>
        )}
        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Email *
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) {
                  const errs = { ...fieldErrors };
                  if (!e.target.value.trim()) {
                    errs.email = "Email is required.";
                  } else if (!validateEmail(e.target.value)) {
                    errs.email = "Please enter a valid email address.";
                  } else {
                    delete errs.email;
                  }
                  setFieldErrors(errs);
                }
              }}
              onBlur={() => handleBlur("email")}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: touched.email && fieldErrors.email
                  ? "2px solid #dc2626"
                  : "1px solid #d1d5db",
                borderRadius: "0.5rem",
                outline: "none",
                fontSize: "1rem",
                backgroundColor: "#ffffff",
                color: "#000000",
                transition: "all 0.2s",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
              onFocus={(e) => {
                if (!fieldErrors.email) {
                  e.currentTarget.style.borderColor = "#2563eb";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.3)";
                }
              }}
              onBlurCapture={(e) => {
                if (!fieldErrors.email) {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            />
            {touched.email && fieldErrors.email && (
              <p style={{ 
                color: "#dc2626", 
                marginTop: "6px", 
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}>
                <span>⚠️</span> {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) {
                  const errs = { ...fieldErrors };
                  if (!e.target.value.trim()) {
                    errs.password = "Password is required.";
                  } else if (e.target.value.length < 6) {
                    errs.password = "Password must be at least 6 characters.";
                  } else {
                    delete errs.password;
                  }
                  setFieldErrors(errs);
                }
              }}
              onBlur={() => handleBlur("password")}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: touched.password && fieldErrors.password
                  ? "2px solid #dc2626"
                  : "1px solid #d1d5db",
                borderRadius: "0.5rem",
                outline: "none",
                fontSize: "1rem",
                backgroundColor: "#ffffff",
                color: "#000000",
                transition: "all 0.2s",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
              onFocus={(e) => {
                if (!fieldErrors.password) {
                  e.currentTarget.style.borderColor = "#2563eb";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.3)";
                }
              }}
              onBlurCapture={(e) => {
                if (!fieldErrors.password) {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            />
            {touched.password && fieldErrors.password && (
              <p style={{ 
                color: "#dc2626", 
                marginTop: "6px", 
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}>
                <span>⚠️</span> {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.75rem",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
              marginTop: "0.5rem",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          >
            Sign In
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.875rem",
            color: "#4b5563",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#2563eb",
              fontWeight: 600,
              textDecoration: "none",
            }}
            onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}