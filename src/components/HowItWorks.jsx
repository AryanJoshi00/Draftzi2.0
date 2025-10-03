import React from "react";
import { FileCheck, Sparkles, Download } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./HowItWorks.css";

export default function HowItWorks() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 300
  });

  return (
    <section className="how-it-works-section" ref={ref}>
      <div className={`how-it-works-container ${isVisible ? 'animate-in' : ''}`}>
        <div className="how-it-works-header stagger-item">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-subtitle">
            Three simple steps to professional documents
          </p>
        </div>

        <div className="how-it-works-steps">
          <div className="how-step stagger-item">
            <div className="step-number">1</div>
            <div className="step-icon">
              <FileCheck size={32} />
            </div>
            <h3 className="step-title">Pick a Document</h3>
            <p className="step-description">
              Choose from 50+ professionally crafted templates for legal, HR, and compliance needs.
            </p>
          </div>

          <div className="step-connector stagger-item">
            <div className="connector-line"></div>
          </div>

          <div className="how-step stagger-item">
            <div className="step-number">2</div>
            <div className="step-icon">
              <Sparkles size={32} />
            </div>
            <h3 className="step-title">Auto-Fill Magic</h3>
            <p className="step-description">
              Our AI-powered vault pre-loads your data and customizes the document to your specific requirements.
            </p>
          </div>

          <div className="step-connector stagger-item">
            <div className="connector-line"></div>
          </div>

          <div className="how-step stagger-item">
            <div className="step-number">3</div>
            <div className="step-icon">
              <Download size={32} />
            </div>
            <h3 className="step-title">Download & Share</h3>
            <p className="step-description">
              Get your legally sound, professionally formatted document ready for immediate use.
            </p>
          </div>
        </div>

        <div className="how-it-works-tagline stagger-item">
          <p>That's it. Draftzi makes drafting easy-peasy.</p>
        </div>
      </div>
    </section>
  );
}
