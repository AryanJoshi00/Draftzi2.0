import React from "react";
import { Scale, TrendingUp, Users } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./WhoSection.css";

export default function WhoSection() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 200
  });

  return (
    <section className="who-section" ref={ref}>
      <div className={`who-container ${isVisible ? 'animate-in' : ''}`}>
        <div className="who-header stagger-item">
          <h2 className="who-title">Who is Draftzi For?</h2>
          <p className="who-subtitle">
            Trusted by thousands of professionals who value their time
          </p>
        </div>

        <div className="who-cards">
          <div className="who-card stagger-item">
            <div className="who-card-icon-wrapper">
              <div className="who-card-icon">
                <Scale size={28} />
              </div>
            </div>
            <h3 className="who-card-title">Lawyers</h3>
            <p className="who-card-text">
              Draft NDAs, notices, and agreements faster than ever. 
              Focus on strategy, not paperwork.
            </p>
          </div>

          <div className="who-card stagger-item">
            <div className="who-card-icon-wrapper">
              <div className="who-card-icon">
                <TrendingUp size={28} />
              </div>
            </div>
            <h3 className="who-card-title">CAs/CSs</h3>
            <p className="who-card-text">
              Automate compliance registers, filings, and resolutions. 
              Never miss a deadline again.
            </p>
          </div>

          <div className="who-card stagger-item">
            <div className="who-card-icon-wrapper">
              <div className="who-card-icon">
                <Users size={28} />
              </div>
            </div>
            <h3 className="who-card-title">HR Teams</h3>
            <p className="who-card-text">
              Generate offer letters, policies, and exit docs instantly. 
              Streamline your HR workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
