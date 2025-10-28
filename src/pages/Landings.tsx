// src/pages/Landings.tsx
import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div style={{ position: "relative", width: "100%", margin: 0, padding: 0, overflowX: "hidden" }}>
      {/* HERO SECTION */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(to bottom right, #2563eb, #7c3aed)",
          color: "white",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* NAVBAR */}
        <nav
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              padding: "1rem 2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "white", margin: 0 }}>
              TicketFlow
            </h1>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <Link
                to="/login"
                style={navLinkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#ffffffcc")}
              >
                Login
              </Link>
              <Link
                to="/contact"
                style={navLinkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#ffffffcc")}
              >
                Contact
              </Link>
              <Link
                to="/ticket"
                style={navLinkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#ffffffcc")}
              >
                Tickets
              </Link>
            </div>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "8rem 1rem",
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>TicketFlow</h1>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "2rem",
              maxWidth: "42rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Streamline your support workflow with our powerful ticket management system
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/login"
              style={{
                backgroundColor: "white",
                color: "#2563eb",
                padding: "0.75rem 2rem",
                borderRadius: "0.5rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                backgroundColor: "transparent",
                border: "2px solid white",
                color: "white",
                padding: "0.75rem 2rem",
                borderRadius: "0.5rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#2563eb";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "white";
              }}
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Decorative Circle */}
        <div
          style={{
            position: "absolute",
            top: "8rem",
            right: "2.5rem",
            width: "16rem",
            height: "16rem",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
          }}
        />

        {/* Wavy Bottom */}
        <svg
          style={{ position: "absolute", bottom: 0, width: "100%", display: "block" }}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z" fill="#f9fafb" />
        </svg>
      </div>

      {/* FEATURES SECTION */}
      <div style={{ backgroundColor: "#f9fafb", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "3rem",
              color: "#1f2937",
            }}
          >
            Why Choose TicketFlow?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: "🎯",
                title: "Easy Management",
                desc: "Create, update, and track tickets effortlessly.",
              },
              {
                icon: "⚡",
                title: "Real-time Updates",
                desc: "Stay informed with instant status changes.",
              },
              {
                icon: "🔒",
                title: "Secure & Reliable",
                desc: "Your data is protected with enterprise-grade security.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  padding: "2rem 1.75rem",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{feature.icon}</div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#1f2937",
                    marginBottom: "0.5rem",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "#4b5563", fontSize: "1rem" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          background: "linear-gradient(to bottom right, #2563eb, #7c3aed)",
          color: "white",
          padding: "3rem 0",
          marginTop: "5rem",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* BRAND */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.875rem" }}>⚡</span>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>TicketFlow</h3>
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#e5e7eb",
                  maxWidth: "300px",
                  marginBottom: "1rem",
                }}
              >
                Pioneering the next wave of digital innovation and seamless user experiences for a
                connected future.
              </p>
            </div>

            {/* ABOUT */}
            <FooterSection title="About" items={["Features", "Our Mission", "Careers", "Contact"]} />
            {/* LEGAL */}
            <FooterSection
              title="Legal"
              items={["Privacy Policy", "Terms of Service", "Cookie Policy"]}
            />
            {/* NEWSLETTER */}
            <div>
              <h4 style={{ fontWeight: 600, color: "white", marginBottom: "1rem" }}>Stay Connected</h4>
              <p style={{ fontSize: "0.875rem", color: "#e5e7eb", marginBottom: "1rem" }}>
                Get updates and exclusive insights delivered straight to your inbox.
              </p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    color: "white",
                    fontSize: "0.875rem",
                  }}
                />
                <button
                  type="button"
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "white",
                    color: "#7c3aed",
                    fontWeight: 600,
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#e5e7eb",
            }}
          >
            <p>&copy; {new Date().getFullYear()} TicketFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper: Footer Section Component
const FooterSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div>
    <h4 style={{ fontWeight: 600, color: "white", marginBottom: "1rem" }}>{title}</h4>
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, idx) => (
        <li key={idx} style={{ marginBottom: "0.75rem" }}>
          <a
            href="#"
            style={{
              fontSize: "0.875rem",
              color: "#e5e7eb",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#e5e7eb")}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Navbar link base style
const navLinkStyle: React.CSSProperties = {
  color: "#ffffffcc",
  fontWeight: 600,
  textDecoration: "none",
  transition: "color 0.3s",
};

export default Landing;
