// src/pages/TicketManagement.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Plus, Edit2, Trash2 } from "lucide-react";
import Toast from "../components/ui/toast";
import { clearSession } from "../utils/auth";
import type { Ticket, TicketFormData, FormErrors, TicketStatus, TicketPriority } from "../types/index";

const TicketManagement: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<TicketFormData>({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Load tickets on mount
  useEffect(() => {
    try {
      const storedTickets = localStorage.getItem("tickets");
      setTickets(storedTickets ? (JSON.parse(storedTickets) as Ticket[]) : []);
    } catch {
      setTickets([]);
    }
  }, []);

  // Persist tickets
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  // Validation
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    else if (formData.title.trim().length < 3) newErrors.title = "Title must be at least 3 characters";
    else if (formData.title.trim().length > 100) newErrors.title = "Title must not exceed 100 characters";

    if (formData.description && formData.description.length > 500)
      newErrors.description = "Description must not exceed 500 characters";

    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.priority) newErrors.priority = "Priority is required";

    return newErrors;
  };

  // Create / update ticket
  const handleSubmit = (): void => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = Object.values(newErrors)[0] as string;
      setToast({ message: firstError, type: "error" });
      return;
    }

    if (editingId !== null) {
      setTickets((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...formData } : t))
      );
      setToast({ message: "Ticket updated successfully", type: "success" });
    } else {
    const newTicket: Ticket = {
    ...formData,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
  };      setTickets((prev) => [...prev, newTicket]);
      setToast({ message: "Ticket created successfully", type: "success" });
    }

    setShowForm(false);
    setEditingId(null);
    setFormData({ title: "", description: "", status: "open", priority: "medium" });
    setErrors({});
  };

  // Edit / delete
  const handleEdit = (ticket: Ticket): void => {
    setFormData({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
    });
    setEditingId(ticket.id);
    setShowForm(true);
  };

  const handleDelete = (id: number): void => {
    if (window.confirm("Delete this ticket?")) {
      setTickets((prev) => prev.filter((t) => t.id !== id));
      setToast({ message: "Ticket deleted successfully!", type: "success" });
    }
  };

  const handleLogout = (): void => {
    clearSession();
    navigate("/");
  };

  const statusColors: Record<TicketStatus, string> = {
    open: "bg-green-100 text-green-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    closed: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">TicketFlow</h1>
          <div className="flex gap-4">
            <button onClick={() => navigate("/dashboard")} className="text-gray-600 hover:text-gray-800">
              <LayoutDashboard size={20} />
            </button>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Ticket Management</h2>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({ title: "", description: "", status: "open", priority: "medium" });
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus size={20} />
            New Ticket
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Ticket" : "Create Ticket"}</h3>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ticket title"
                  maxLength={100}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the ticket (optional)"
                  maxLength={500}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Status & Priority */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFormData({ ...formData, status: e.target.value as TicketStatus })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select status</option>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                  <select
                    value={formData.priority}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFormData({ ...formData, priority: e.target.value as TicketPriority })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {editingId ? "Update" : "Create"}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setErrors({});
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ticket List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{ticket.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[ticket.status]}`}>
                  {ticket.status.replace("_", " ")}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{ticket.description || "No description"}</p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Priority: {ticket.priority}</span>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tickets yet. Create your first ticket!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketManagement;
