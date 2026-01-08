import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaRocket, 
  FaShieldAlt, 
  FaClock, 
  FaFileContract, 
  FaSearch, 
  FaCloud,
  FaLock,
  FaChartLine,
  FaUsers,
  FaCheckCircle
} from "react-icons/fa";
import "../styles/Features.css";

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaRocket />,
      title: "AI-Powered Drafting",
      description: "Generate professional legal documents in minutes with our advanced AI technology."
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & Compliant",
      description: "Bank-level encryption ensures your documents and client data are always protected."
    },
    {
      icon: <FaClock />,
      title: "Save Time",
      description: "Reduce document creation time by up to 90% with automated drafting workflows."
    },
    {
      icon: <FaFileContract />,
      title: "Template Library",
      description: "Access hundreds of pre-built legal document templates for every use case."
    },
    {
      icon: <FaSearch />,
      title: "Smart Search",
      description: "Find documents, clients, and deadlines instantly with intelligent search capabilities."
    },
    {
      icon: <FaCloud />,
      title: "Cloud Storage",
      description: "Access your documents from anywhere, anytime with secure cloud storage."
    },
    {
      icon: <FaLock />,
      title: "Access Control",
      description: "Manage permissions and control who can view or edit your documents."
    },
    {
      icon: <FaChartLine />,
      title: "Analytics Dashboard",
      description: "Track document generation, client activity, and compliance deadlines at a glance."
    },
    {
      icon: <FaUsers />,
      title: "Client Management",
      description: "Organize and manage all your clients in one centralized vault."
    }
  ];

  const benefits = [
    "No credit card required",
    "Cancel anytime",
    "24/7 customer support",
    "Regular feature updates",
    "99.9% uptime guarantee"
  ];

  return (
    <div className="features-page">
      <div className="features-hero">
        <div className="features-hero-content">
          <h1 className="features-title">Powerful Features for Legal Professionals</h1>
          <p className="features-subtitle">
            Everything you need to streamline your legal document workflow
          </p>
          <button 
            className="features-cta"
            onClick={() => navigate("/signup")}
          >
            Get Started Free
          </button>
        </div>
      </div>

      <div className="features-grid-section">
        <div className="features-container">
          <h2 className="section-title">Core Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="features-benefits-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose Draftzi?</h2>
          <div className="benefits-list">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <FaCheckCircle className="benefit-icon" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


