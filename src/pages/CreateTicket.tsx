// src/pages/CreateTicket.tsx
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
    if (countWords(description) < 3) errs.description = "Description must be at least 3 words.";
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
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: "2rem 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 8px rgba(0,0,0,0.06)", padding: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Create New Ticket</h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Title *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} style={{
                width: "100%", padding: 12, borderRadius: 8, border: errors.title ? "1px solid #dc2626" : "1px solid #d1d5db"
              }} />
              {errors.title && <p style={{ color: "#dc2626", marginTop: 6 }}>{errors.title}</p>}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Description *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} style={{
                width: "100%", padding: 12, borderRadius: 8, border: errors.description ? "1px solid #dc2626" : "1px solid #d1d5db"
              }} />
              {errors.description && <p style={{ color: "#dc2626", marginTop: 6 }}>{errors.description}</p>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Status *</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={{ width: "100%", padding: 12, borderRadius: 8 }}>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.status && <p style={{ color: "#dc2626", marginTop: 6 }}>{errors.status}</p>}
              </div>

              <div>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Priority *</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value as any)} style={{ width: "100%", padding: 12, borderRadius: 8 }}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && <p style={{ color: "#dc2626", marginTop: 6 }}>{errors.priority}</p>}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <button type="button" onClick={() => navigate("/ticket_list")} style={{ background: "#9ca3af", color: "#fff", padding: "8px 16px", borderRadius: 8 }}>Cancel</button>
              <button type="submit" style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: 8 }}>Save Ticket</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
