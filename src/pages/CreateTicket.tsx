import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets, saveTickets } from "../utils/storage";
import type { Ticket } from "../types/index";

function countWords(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"open" | "in_progress" | "closed">("open");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const validateField = (field: string, value: string) => {
    const errs = { ...errors };
    
    if (field === "title") {
      if (!value.trim()) {
        errs.title = "Title is required.";
      } else if (countWords(value) < 3) {
        errs.title = "Title must be at least 3 words.";
      } else {
        delete errs.title;
      }
    }
    
    if (field === "description") {
      if (!value.trim()) {
        errs.description = "Description is required.";
      } else if (countWords(value) < 3) {
        errs.description = "Description must be at least 3 words.";
      } else {
        delete errs.description;
      }
    }
    
    setErrors(errs);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    if (field === "title") validateField("title", title);
    if (field === "description") validateField("description", description);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ title: true, description: true, status: true, priority: true });
    
    const errs: Record<string, string> = {};
    
    if (!title.trim()) {
      errs.title = "Title is required.";
    } else if (countWords(title) < 3) {
      errs.title = "Title must be at least 3 words.";
    }
    
    if (!description.trim()) {
      errs.description = "Description is required.";
    } else if (countWords(description) < 3) {
      errs.description = "Description must be at least 3 words.";
    }
    
    if (!status) errs.status = "Status is required.";
    if (!priority) errs.priority = "Priority is required.";
    
    setErrors(errs);
    
    if (Object.keys(errs).length) return;

    const tickets = getTickets();
    const newTicket: Ticket = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      title,
      description,
      status,
      priority,
      created_at: new Date().toLocaleString(),
    };
    tickets.push(newTicket);
    saveTickets(tickets);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "6rem 1rem 3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          padding: "2rem",
        }}
      >
        <h2 style={{ 
          fontSize: "1.5rem", 
          fontWeight: 700, 
          marginBottom: "1.5rem", 
          textAlign: "center", 
          color: "#1f2937" 
        }}>
          Create New Ticket
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Title */}
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: 600,
              color: "#374151",
              fontSize: "0.95rem"
            }}>
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (touched.title) validateField("title", e.target.value);
              }}
              onBlur={() => handleBlur("title")}
              placeholder="Enter ticket title (at least 3 words)"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                border: touched.title && errors.title
                  ? "2px solid #dc2626"
                  : "1px solid #d1d5db",
                outline: "none",
                fontSize: "1rem",
                color: "#000000",
                transition: "border-color 0.2s",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
              onFocus={(e) => {
                if (!errors.title) {
                  e.currentTarget.style.border = "2px solid #2563eb";
                }
              }}
              onBlurCapture={(e) => {
                if (!errors.title) {
                  e.currentTarget.style.border = "1px solid #d1d5db";
                }
              }}
            />
            {touched.title && errors.title && (
              <p style={{ 
                color: "#dc2626", 
                marginTop: "6px", 
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}>
                <span>⚠️</span> {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: 600,
              color: "#374151",
              fontSize: "0.95rem"
            }}>
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (touched.description) validateField("description", e.target.value);
              }}
              onBlur={() => handleBlur("description")}
              rows={4}
              placeholder="Enter ticket description (at least 3 words)"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                border: touched.description && errors.description
                  ? "2px solid #dc2626"
                  : "1px solid #d1d5db",
                outline: "none",
                fontSize: "1rem",
                color: "#1f2937",
                transition: "border-color 0.2s",
                resize: "vertical",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                if (!errors.description) {
                  e.currentTarget.style.border = "2px solid #2563eb";
                }
              }}
              onBlurCapture={(e) => {
                if (!errors.description) {
                  e.currentTarget.style.border = "1px solid #d1d5db";
                }
              }}
            />
            {touched.description && errors.description && (
              <p style={{ 
                color: "#dc2626", 
                marginTop: "6px", 
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}>
                <span>⚠️</span> {errors.description}
              </p>
            )}
          </div>

          {/* Status and Priority */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "1rem",
          }}>
            <div>
              <label style={{ 
                display: "block", 
                marginBottom: "8px", 
                fontWeight: 600,
                color: "#374151",
                fontSize: "0.95rem"
              }}>
                Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                  outline: "none",
                  color: "#1f2937",
                  cursor: "pointer",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: "36px",
                }}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              {touched.status && errors.status && (
                <p style={{ color: "#dc2626", marginTop: "6px", fontSize: "0.875rem" }}>
                  {errors.status}
                </p>
              )}
            </div>

            <div>
              <label style={{ 
                display: "block", 
                marginBottom: "8px", 
                fontWeight: 600,
                color: "#374151",
                fontSize: "0.95rem"
              }}>
                Priority *
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                  outline: "none",
                  color: "#1f2937",
                  cursor: "pointer",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: "36px",
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {touched.priority && errors.priority && (
                <p style={{ color: "#dc2626", marginTop: "6px", fontSize: "0.875rem" }}>
                  {errors.priority}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            marginTop: "1rem",
            gap: "1rem",
            flexWrap: "wrap"
          }}>
            <button
              type="button"
              onClick={() => navigate("/ticket_list")}
              style={{
                background: "#6b7280",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 600,
                transition: "background-color 0.2s",
                flex: "1",
                minWidth: "120px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#4b5563")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "#6b7280")
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 600,
                transition: "background-color 0.2s",
                flex: "1",
                minWidth: "120px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#1d4ed8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "#2563eb")
              }
            >
              Save Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}