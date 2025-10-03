import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./FinalCTA.css";

export default function FinalCTA() {
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 200
  });

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <section className="final-cta-section" ref={ref}>
      <div className="final-cta-background">
        <div className="cta-particles"></div>
        <div className="cta-gradient"></div>
      </div>
      
      <div className={`final-cta-container ${isVisible ? 'animate-in' : ''}`}>
        <div className="final-cta-content stagger-item">
          <h2 className="final-cta-title">Tomorrow's workload drafted today.</h2>
          <p className="final-cta-subtitle">
            Join thousands of professionals who've already transformed their workflow with Draftzi.
          </p>
          
          <button className="final-cta-button stagger-item" onClick={handleSignUpClick}>
            <span>Start Drafting</span>
            <ArrowRight size={20} />
            <div className="button-ripple"></div>
          </button>
          
          <p className="final-cta-note stagger-item">
            Free to start • No credit card required • 50+ templates included
          </p>
        </div>
      </div>
    </section>
  );
}
