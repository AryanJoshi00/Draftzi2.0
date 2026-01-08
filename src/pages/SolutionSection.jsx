import React from "react";
import { Zap, Lock, Calendar, LayoutDashboard } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./SolutionSection.css";

export default function SolutionSection() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 150
  });

  return (
    <section className="solution-section" ref={ref}>
      <div className={`solution-container ${isVisible ? 'animate-in' : ''}`}>
        <div className="solution-header stagger-item">
          <h2 className="solution-title">
            Draftzi turns Draft Hard into Draft Smart
          </h2>
          <p className="solution-subtitle">
            Automate your document workflow with intelligent templates and AI assistance
          </p>
        </div>

        <div className="solution-grid">
          <div className="solution-features">
            <div className="feature-card stagger-item">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h3 className="feature-title">AI Drafting Engine</h3>
              <p className="feature-text">
                NDAs, MoAs, Affidavits, Offer Letters & more generated instantly.
              </p>
            </div>

            <div className="feature-card stagger-item">
              <div className="feature-icon">
                <Lock size={24} />
              </div>
              <h3 className="feature-title">Client Vault</h3>
              <p className="feature-text">
                Save client data once, auto-fill documents forever.
              </p>
            </div>

            <div className="feature-card stagger-item">
              <div className="feature-icon">
                <Calendar size={24} />
              </div>
              <h3 className="feature-title">Compliance Calendar</h3>
              <p className="feature-text">
                Never miss a deadline with intelligent reminders.
              </p>
            </div>

            <div className="feature-card stagger-item">
              <div className="feature-icon">
                <LayoutDashboard size={24} />
              </div>
              <h3 className="feature-title">Smart Dashboard</h3>
              <p className="feature-text">
                Track pending work, filings & recent documents.
              </p>
            </div>
          </div>

          {/* Dashboard Screenshot Placeholder */}
          <div className="solution-visual stagger-item">
            <div className="dashboard-screenshot">
              <img 
                src="/dashboard-screenshot.png" 
                alt="Draftzi Dashboard" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
