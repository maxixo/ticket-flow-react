import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, saveUsers } from "../utils/storage";

export default function Signup() {
  const [name, setName] = useState("");
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

    if (field === "name") {
      if (!name.trim()) {
        errs.name = "Name is required.";
      } else if (name.trim().length < 2) {
        errs.name = "Name must be at least 2 characters.";
      } else {
        delete errs.name;
      }
    }

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

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, password: true });

    // Validate all fields
    const errs: Record<string, string> = {};
    if (!name.trim()) {
      errs.name = "Name is required.";
    } else if (name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    }

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

    // Check if user exists
    const users = getUsers();
    const exists = users.find((u: any) => u.email === email);

    if (exists) {
      setError("An account with this email already exists.");
      setSuccess("");
      return;
    }

    saveUsers([...users, { name, email, password }]);
    setError("");
    setSuccess("🎉 Account created successfully! Redirecting...");
    setTimeout(() => navigate("/login"), 1500);
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
          Create an Account
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

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ 
              display: "block", 
              fontSize: "0.875rem", 
              fontWeight: 600, 
              color: "#374151",
              marginBottom: "0.5rem"
            }}>
              Name *
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (touched.name) {
                  const errs = { ...fieldErrors };
                  if (!e.target.value.trim()) {
                    errs.name = "Name is required.";
                  } else if (e.target.value.trim().length < 2) {
                    errs.name = "Name must be at least 2 characters.";
                  } else {
                    delete errs.name;
                  }
                  setFieldErrors(errs);
                }
              }}
              onBlur={() => handleBlur("name")}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: touched.name && fieldErrors.name
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
                if (!fieldErrors.name) {
                  e.currentTarget.style.borderColor = "#2563eb";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.3)";
                }
              }}
              onBlurCapture={(e) => {
                if (!fieldErrors.name) {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            />
            {touched.name && fieldErrors.name && (
              <p style={{ 
                color: "#dc2626", 
                marginTop: "6px", 
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}>
                <span>⚠️</span> {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <label style={{ 
              display: "block", 
              fontSize: "0.875rem", 
              fontWeight: 600, 
              color: "#374151",
              marginBottom: "0.5rem"
            }}>
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
            <label style={{ 
              display: "block", 
              fontSize: "0.875rem", 
              fontWeight: 600, 
              color: "#374151",
              marginBottom: "0.5rem"
            }}>
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="Create a password (min. 6 characters)"
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
            Sign Up
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
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2563eb",
              fontWeight: 600,
              textDecoration: "none",
            }}
            onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}