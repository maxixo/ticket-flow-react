// src/pages/Dashboard.tsx
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../utils/storage";
import type { Ticket } from "../types/index";

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setTickets(getTickets());
    // no dependency on tickets to avoid infinite loop
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const inProgress = tickets.filter((t) => t.status === "in_progress").length;
  const closed = tickets.filter((t) => t.status === "closed").length;
  const completionRate = total > 0 ? Math.round((closed / total) * 100) : 0;

  const priorityStats = {
    high: tickets.filter((t) => t.priority === "high").length,
    medium: tickets.filter((t) => t.priority === "medium").length,
    low: tickets.filter((t) => t.priority === "low").length,
  };

  const recent = [...tickets].slice(-5).reverse();

  const renderPriority = (label: string, count: number, bg: string, color: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <span style={{ fontSize: 14, color: "#4b5563" }}>{label}</span>
      <span style={{ padding: "4px 10px", background: bg, color, borderRadius: 9999, fontSize: 12, fontWeight: 600 }}>
        {count}
      </span>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: "2rem 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 16px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Dashboard</h2>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 8px rgba(0,0,0,0.06)", padding: 20, textAlign: "center" }}>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Total Tickets</p>
            <h2 style={{ fontSize: 28, color: "#2563eb", margin: 0 }}>{total}</h2>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 8px rgba(0,0,0,0.06)", padding: 20, textAlign: "center" }}>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Open</p>
            <h2 style={{ fontSize: 28, color: "#16a34a", margin: 0 }}>{open}</h2>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 8px rgba(0,0,0,0.06)", padding: 20, textAlign: "center" }}>
            <p style={{ color: "#6b7280", fontSize: 14 }}>In Progress</p>
            <h2 style={{ fontSize: 28, color: "#ca8a04", margin: 0 }}>{inProgress}</h2>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 8px rgba(0,0,0,0.06)", padding: 20, textAlign: "center" }}>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Closed</p>
            <h2 style={{ fontSize: 28, color: "#374151", margin: 0 }}>{closed}</h2>
          </div>
        </div>

        {/* Completion + Priority */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 8px rgba(0,0,0,0.06)", padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1f2937", marginBottom: 12 }}>Completion Rate</h3>
            <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#2563eb" }}>{completionRate}% Complete</span>
            </div>
            <div style={{ overflow: "hidden", height: 12, borderRadius: 9999, backgroundColor: "#e5e7eb", marginBottom: 12 }}>
              <div style={{ height: "100%", width: `${completionRate}%`, background: "linear-gradient(to right,#3b82f6,#2563eb)", transition: "width 0.4s" }} />
            </div>
            <p style={{ fontSize: 14, color: "#4b5563" }}>{total > 0 ? `${closed} of ${total} tickets completed` : "No tickets available."}</p>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 8px rgba(0,0,0,0.06)", padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1f2937", marginBottom: 12 }}>Priority Breakdown</h3>
            <div>
              {renderPriority("High Priority", priorityStats.high, "#fee2e2", "#dc2626")}
              {renderPriority("Medium Priority", priorityStats.medium, "#fef9c3", "#a16207")}
              {renderPriority("Low Priority", priorityStats.low, "#dcfce7", "#15803d")}
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        {recent.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 8px rgba(0,0,0,0.06)", padding: 20, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1f2937", marginBottom: 12 }}>Recent Tickets</h3>
            <div>
              {recent.map((t) => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px dashed #f3f4f6" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>{t.title}</p>
                    <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>Priority: {t.priority}</p>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: 600,
                      background: t.status === "open" ? "#dcfce7" : t.status === "in_progress" ? "#fef9c3" : "#e5e7eb",
                      color: t.status === "open" ? "#15803d" : t.status === "in_progress" ? "#a16207" : "#374151"
                    }}>{t.status.replace("_", " ")}</span>
                    <Link to={`/tickets/${t.id}/edit`} style={{ color: "#ca8a04", fontWeight: 600 }}>✏️</Link>
                    <Link to={`/tickets/${t.id}/delete`} style={{ color: "#dc2626", fontWeight: 600 }}>🗑️</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/tickets" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "0.75rem 1.25rem", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>Manage Tickets</Link>
          <Link to="/tickets/create" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "0.75rem 1.25rem", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>+ New Ticket</Link>
        </div>
      </div>
    </div>
  );
}
