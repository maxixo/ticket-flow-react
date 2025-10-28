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
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (countWords(title) < 3) errs.title = "Title must be at least 3 words.";
    if (countWords(description) < 3)
      errs.description = "Description must be at least 3 words.";
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
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", textAlign: "center", color: "#1f2937" }}>
          Create New Ticket
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Title */}
          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                border: errors.title
                  ? "1px solid #dc2626"
                  : "1px solid #d1d5db",
                outline: "none",
                fontSize: "1rem",
              }}
              onFocus={(e) => (e.currentTarget.style.border = "1px solid #2563eb")}
              onBlur={(e) =>
                (e.currentTarget.style.border = errors.title
                  ? "1px solid #dc2626"
                  : "1px solid #d1d5db")
              }
            />
            {errors.title && (
              <p style={{ color: "#dc2626", marginTop: 6 }}>{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                border: errors.description
                  ? "1px solid #dc2626"
                  : "1px solid #d1d5db",
                outline: "none",
                fontSize: "1rem",
              }}
              onFocus={(e) => (e.currentTarget.style.border = "1px solid #2563eb")}
              onBlur={(e) =>
                (e.currentTarget.style.border = errors.description
                  ? "1px solid #dc2626"
                  : "1px solid #d1d5db")
              }
            />
            {errors.description && (
              <p style={{ color: "#dc2626", marginTop: 6 }}>
                {errors.description}
              </p>
            )}
          </div>

          {/* Status and Priority */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
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
                }}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              {errors.status && (
                <p style={{ color: "#dc2626", marginTop: 6 }}>{errors.status}</p>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
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
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <p style={{ color: "#dc2626", marginTop: 6 }}>{errors.priority}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <button
              type="button"
              onClick={() => navigate("/ticket_list")}
              style={{
                background: "#9ca3af",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
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
