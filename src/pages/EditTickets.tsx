// src/pages/EditTicket.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTickets, saveTickets } from "../utils/storage";
import type { Ticket, TicketStatus, TicketPriority } from "../types";

const EditTicket: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TicketStatus>("open");
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const tickets = getTickets();
    const ticketId = Number(id);
    const found = tickets.find((x) => x.id === ticketId);

    if (!found) {
      navigate("/dashboard");
      return;
    }

    setTicket(found);
    setTitle(found.title);
    setDescription(found.description);
    setStatus(found.status);
    setPriority(found.priority);
  }, [id, navigate]);

  if (!ticket) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const errs: Record<string, string> = {};
    if (title.trim().length < 3) errs.title = "Title must be at least 3 characters.";
    if (description.trim().length < 3) errs.description = "Description must be at least 3 characters.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const tickets = getTickets();
    const updated = tickets.map((t) =>
      t.id === ticket.id ? { ...t, title, description, status, priority } : t
    );

    saveTickets(updated);
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: "2rem 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 16px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
            padding: 24,
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Edit Ticket</h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Title */}
            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Title *</label>
              <input
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 8,
                  border: errors.title ? "1px solid #dc2626" : "1px solid #d1d5db",
                }}
              />
              {errors.title && <p style={{ color: "#dc2626", marginTop: 6 }}>{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Description *</label>
              <textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 8,
                  border: errors.description ? "1px solid #dc2626" : "1px solid #d1d5db",
                }}
              />
              {errors.description && <p style={{ color: "#dc2626", marginTop: 6 }}>{errors.description}</p>}
            </div>

            {/* Status & Priority */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Status *</label>
                <select
                  value={status}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatus(e.target.value as TicketStatus)
                  }
                  style={{ width: "100%", padding: 12, borderRadius: 8 }}
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Priority *</label>
                <select
                  value={priority}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setPriority(e.target.value as TicketPriority)
                  }
                  style={{ width: "100%", padding: 12, borderRadius: 8 }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                style={{ background: "#9ca3af", color: "#fff", padding: "8px 16px", borderRadius: 8 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: 8 }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTicket;
