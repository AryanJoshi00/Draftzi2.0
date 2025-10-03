import React from "react";
import { Clock, CheckCircle, Bell, Briefcase } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./WhyChoose.css";

export default function WhyChoose() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 200
  });

  return (
    <section className="why-choose-section" ref={ref}>
      <div className={`why-choose-container ${isVisible ? 'animate-in' : ''}`}>
        <div className="why-choose-header stagger-item">
          <h2 className="why-choose-title">Why Professionals Choose Draftzi</h2>
          <p className="why-choose-subtitle">
            Join thousands of professionals who've transformed their workflow
          </p>
        </div>

        <div className="why-choose-stats">
          <div className="stat-card stagger-item">
            <div className="stat-icon">
              <Clock size={32} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">80%</h3>
              <p className="stat-label">Save drafting time</p>
              <p className="stat-description">Focus on what matters most - your clients and strategy</p>
            </div>
          </div>

          <div className="stat-card stagger-item">
            <div className="stat-icon">
              <CheckCircle size={32} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">Zero</h3>
              <p className="stat-label">Manual errors</p>
              <p className="stat-description">AI-powered accuracy ensures professional quality every time</p>
            </div>
          </div>

          <div className="stat-card stagger-item">
            <div className="stat-icon">
              <Bell size={32} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">100%</h3>
              <p className="stat-label">Compliance coverage</p>
              <p className="stat-description">Stay ahead with intelligent reminders and updates</p>
            </div>
          </div>

          <div className="stat-card stagger-item">
            <div className="stat-icon">
              <Briefcase size={32} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">3x</h3>
              <p className="stat-label">More productive</p>
              <p className="stat-description">Work faster. Serve more clients. Stress less.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
