import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTickets } from "../utils/storage";
import type { Ticket } from "../types";
import Navbar from "../components/Navbar";

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
    <div
      style={{
        backgroundColor: "#f9fafb",
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "7rem 1.5rem 2rem", // space for fixed navbar
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#1f2937",
            marginBottom: "2rem",
          }}
        >
          Dashboard
        </h2>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {[{ label: "Total Tickets", count: total, color: "#2563eb" },
            { label: "Open", count: open, color: "#16a34a" },
            { label: "In Progress", count: inProgress, color: "#ca8a04" },
            { label: "Closed", count: closed, color: "#374151" }].map((stat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                textAlign: "center",
                transition: "all 0.2s",
              }}
            >
              <p style={{ color: "#6b7280", marginBottom: "0.25rem" }}>{stat.label}</p>
              <h2 style={{ color: stat.color, fontSize: "1.875rem", fontWeight: 700 }}>
                {stat.count}
              </h2>
            </div>
          ))}
        </div>

        {/* Completion Rate and Priority Breakdown */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
            <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Completion Rate</h3>
            <div
              style={{
                height: "1rem",
                borderRadius: "9999px",
                backgroundColor: "#e5e7eb",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${completionRate}%`,
                  height: "100%",
                  background: "linear-gradient(to right, #3b82f6, #2563eb)",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
            <p style={{ marginTop: "1rem", color: "#4b5563" }}>
              {total > 0
                ? `${closed} of ${total} tickets completed (${completionRate}%)`
                : "No tickets yet"}
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
            <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Priority Breakdown</h3>
            {renderPriority("High Priority", priorityStats.high, "#fee2e2", "#dc2626")}
            {renderPriority("Medium Priority", priorityStats.medium, "#fef9c3", "#a16207")}
            {renderPriority("Low Priority", priorityStats.low, "#dcfce7", "#15803d")}
          </div>
        </div>

        {/* Manage Tickets Button */}
        <Link
          to="/tickets"
          style={{
            display: "inline-block",
            backgroundColor: "#2563eb",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Manage Tickets
        </Link>
      </div>
    </div>
  );
}

// helper
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
        fontWeight: 600,
        fontSize: "0.75rem",
      }}
    >
      {count}
    </span>
  </div>
);
