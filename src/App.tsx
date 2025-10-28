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

  const hideNavbarPaths = ["/", "/login", "/signup"];
  const shouldShowNavbar = user && !hideNavbarPaths.includes(location.pathname);

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      {shouldShowNavbar && <Navbar />}
      <div style={{ paddingTop: shouldShowNavbar ? "80px" : "0" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
