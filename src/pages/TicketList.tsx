import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTickets, saveTickets } from "../utils/storage";
import type { Ticket } from "../types/index";

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  function handleDelete(id: string | number) {
    if (!confirm("Are you sure you want to delete this ticket? This cannot be undone.")) return;
    const updated = getTickets().filter((t) => t.id !== id);
    saveTickets(updated);
    navigate("/dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
    

      {/* Ticket List Section */}
      <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "0 1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1f2937" }}>Ticket Management</h2>
          <Link
            to="/tickets/create"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            + New Ticket
          </Link>
        </div>

        {/* Tickets Grid */}
        {tickets.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                style={{
                  background: "white",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#1f2937",
                      margin: 0,
                    }}
                  >
                    {ticket.title}
                  </h3>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: 9999,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      backgroundColor:
                        ticket.status === "open"
                          ? "#dcfce7"
                          : ticket.status === "in_progress"
                          ? "#fef9c3"
                          : "#e5e7eb",
                      color:
                        ticket.status === "open"
                          ? "#15803d"
                          : ticket.status === "in_progress"
                          ? "#a16207"
                          : "#374151",
                    }}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                </div>

                <p
                  style={{
                    color: "#4b5563",
                    fontSize: "0.875rem",
                    marginBottom: "1rem",
                  }}
                >
                  {ticket.description || "No description"}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    Priority: {ticket.priority}
                  </span>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <Link
                      to={`/tickets/${ticket.id}/edit`}
                      style={{
                        color: "#2563eb",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "#1d4ed8")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "#2563eb")}
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      style={{
                        color: "#dc2626",
                        background: "none",
                        border: "none",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "#b91c1c")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "#dc2626")}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No tickets found.{" "}
            <Link
              to="/tickets/create"
              style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}
            >
              Create one
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
