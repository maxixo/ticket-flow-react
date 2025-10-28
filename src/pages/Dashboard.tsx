// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTickets } from "../utils/storage";
import type { Ticket } from "../types";
import Navbar from "../components/Navbar"; // ✅ Add Navbar import

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTickets(getTickets());
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

  return (
    <div style={{  backgroundColor: "#f9fafb",  margin: 0, padding: "3em" // ✅ remove all default body margins
       , minHeight: "100vh" }}>
      {/* ✅ Navbar at top */}
      <div style={{ background: "linear-gradient(to bottom right, #2563eb, #7c3aed)", margin: 0,
          padding: 0, }}>
        <Navbar />
      </div>

      {/* Dashboard Content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2rem 1rem",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#1f2937",
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          Dashboard
        </h2>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Total Tickets", count: total, color: "#2563eb" },
            { label: "Open", count: open, color: "#16a34a" },
            { label: "In Progress", count: inProgress, color: "#ca8a04" },
            { label: "Closed", count: closed, color: "#374151" },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.label}
              </p>
              <h2
                style={{
                  color: stat.color,
                  fontSize: "1.875rem",
                  fontWeight: 700,
                }}
              >
                {stat.count}
              </h2>
            </div>
          ))}
        </div>

        {/* Completion Rate + Priority Breakdown */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Completion Rate */}
          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              Completion Rate
            </h3>
            <div
              style={{
                height: "1rem",
                borderRadius: "9999px",
                backgroundColor: "#e5e7eb",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: `${completionRate}%`,
                  height: "100%",
                  background: "linear-gradient(to right, #3b82f6, #2563eb)",
                  transition: "width 0.5s",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#4b5563",
              }}
            >
              {total > 0
                ? `${closed} of ${total} tickets completed (${completionRate}%)`
                : "No tickets available."}
            </p>
          </div>

          {/* Priority Breakdown */}
          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              Priority Breakdown
            </h3>
            {renderPriority("High Priority", priorityStats.high, "#fee2e2", "#dc2626")}
            {renderPriority("Medium Priority", priorityStats.medium, "#fef9c3", "#a16207")}
            {renderPriority("Low Priority", priorityStats.low, "#dcfce7", "#15803d")}
          </div>
        </div>

        {/* Recent Tickets */}
        {recent.length > 0 && (
          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              Recent Tickets
            </h3>
            {recent.map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: "#1f2937" }}>{t.title}</p>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "#6b7280" }}>
                    Priority: {t.priority}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      background:
                        t.status === "open"
                          ? "#dcfce7"
                          : t.status === "in_progress"
                          ? "#fef9c3"
                          : "#e5e7eb",
                      color:
                        t.status === "open"
                          ? "#15803d"
                          : t.status === "in_progress"
                          ? "#a16207"
                          : "#374151",
                      textTransform: "capitalize",
                    }}
                  >
                    {t.status.replace("_", " ")}
                  </span>
                  <Link to={`/tickets/${t.id}/edit`} style={{ color: "#ca8a04", fontWeight: 600 }}>
                    ✏️
                  </Link>
                  <Link to={`/tickets/${t.id}/delete`} style={{ color: "#dc2626", fontWeight: 600 }}>
                    🗑️
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Manage Tickets */}
        <Link
          to="/tickets"
          style={{
            display: "inline-block",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        >
          Manage Tickets
        </Link>
      </div>
    </div>
  );
}

// Priority helper
const renderPriority = (label: string, count: number, bg: string, color: string) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.75rem",
    }}
  >
    <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>{label}</span>
    <span
      style={{
        padding: "4px 10px",
        backgroundColor: bg,
        color,
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 600,
      }}
    >
      {count}
    </span>
  </div>
);
