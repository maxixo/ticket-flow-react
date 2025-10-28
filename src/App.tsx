// src/App.tsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TicketList from "./pages/TicketList";
import CreateTicket from "./pages/CreateTicket";
import EditTicket from "./pages/EditTickets";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import { getCurrentUser } from "./utils/storage";

export default function App() {
  const user = getCurrentUser();
  const location = useLocation();

  // Paths that should NOT display the navbar
  const hideNavbarPaths = ["/", "/login", "/signup"];

  const shouldShowNavbar = user && !hideNavbarPaths.includes(location.pathname);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",  display: "flex", flexDirection: "column" }}>
      {/* ✅ Render Navbar only for logged-in users and not on public pages */}
      {shouldShowNavbar && <Navbar />}

      {/* ✅ Page Routes */}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Pages */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/tickets"
            element={
              <RequireAuth>
                <TicketList />
              </RequireAuth>
            }
          />
          <Route
            path="/tickets/create"
            element={
              <RequireAuth>
                <CreateTicket />
              </RequireAuth>
            }
          />
          <Route
            path="/tickets/:id/edit"
            element={
              <RequireAuth>
                <EditTicket />
              </RequireAuth>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
