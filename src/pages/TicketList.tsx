// src/pages/TicketList.tsx
import  { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTickets, saveTickets } from "../utils/storage";
import  type { Ticket } from "./../types/index";


export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this ticket? This cannot be undone.")) return;
    const updated = getTickets().filter((t) => t.id !== id);
    saveTickets(updated);
    // after delete go to dashboard
    navigate("/dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", padding: "2rem 0", backgroundColor: "#f9fafb" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700 }}>Manage Tickets</h2>
          <Link to="/tickets/create" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "0.75rem 1.25rem", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>+ New Ticket</Link>
        </div>

        {tickets.length ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, boxShadow: "0 4px 8px rgba(0,0,0,0.06)" }}>
              <thead style={{ background: "#2563eb", color: "#fff" }}>
                <tr>
                  <th style={{ padding: 16, textAlign: "left" }}>Title</th>
                  <th style={{ padding: 16, textAlign: "left" }}>Priority</th>
                  <th style={{ padding: 16, textAlign: "left" }}>Status</th>
                  <th style={{ padding: 16, textAlign: "left" }}>Created At</th>
                  <th style={{ padding: 16, textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: 16, color: "#1f2937" }}>{t.title}</td>
                    <td style={{ padding: 16, color: "#4b5563", textTransform: "capitalize" }}>{t.priority}</td>
                    <td style={{ padding: 16 }}>
                      {t.status === "open" ? (
                        <span style={{ padding: "4px 10px", borderRadius: 9999, background: "#dcfce7", color: "#15803d", fontWeight: 600 }}>Open</span>
                      ) : t.status === "in_progress" ? (
                        <span style={{ padding: "4px 10px", borderRadius: 9999, background: "#fef9c3", color: "#a16207", fontWeight: 600 }}>In Progress</span>
                      ) : (
                        <span style={{ padding: "4px 10px", borderRadius: 9999, background: "#e5e7eb", color: "#374151", fontWeight: 600 }}>Closed</span>
                      )}
                    </td>
                    <td style={{ padding: 16, color: "#6b7280" }}>{t.created_at}</td>
                    <td style={{ padding: 16, textAlign: "center" }}>
                      <Link to={`/tickets/${t.id}/edit`} style={{ color: "#ca8a04", fontWeight: 600, marginRight: 12 }}>✏️ Edit</Link>
                      <button onClick={() => handleDelete(t.id)} style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#6b7280", marginTop: 32 }}>No tickets found. Click “+ New Ticket” to create one.</p>
        )}

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link to="/dashboard" style={{ backgroundColor: "#4b5563", color: "#fff", padding: "0.75rem 1.25rem", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>⬅ Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
