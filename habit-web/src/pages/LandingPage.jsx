// habit-web/src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(1200px 800px at 20% -10%, #1a2028 0%, #0f1216 45%)",
      color: "var(--text, #e6eaf2)"
    }}>
      <div style={{
        width: "min(800px, 92vw)",
        textAlign: "center",
        padding: "48px",
        borderRadius: "14px",
        background: "rgba(18,22,27,0.6)",
        border: "1px solid rgba(35,42,51,0.6)"
      }}>
        <h1 style={{ margin: 0, fontSize: "2.1rem", color: "var(--accent, #7cc4ff)" }}>
          Habit Tracker
        </h1>
        <p style={{ color: "var(--muted, #9aa3b2)", marginTop: "12px" }}>
          Track your habits, stay consistent, and build great routines.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "28px" }}>
          <Link to="/login" className="btn btn-primary" aria-label="Sign up">
            Login
          </Link>

          <Link to="/signup" className="btn" aria-label="Register" style={{ background: "transparent" }}>
            Register
          </Link>
        </div>

        <div style={{ marginTop: "24px", color: "var(--muted, #9aa3b2)", textAlign: "center" }}>
          <small>Don't have an account? Use the Register button.</small>
        </div>
        <footer className="site-footer">
        <div className="container footer-inner">
          <p>© 2025 TJ, Nathaniel, Ryan, Mohamed, Sweta</p>
        </div>
      </footer>
      </div>
    </div>
    
  );
}
