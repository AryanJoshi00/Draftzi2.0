import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "../styles/Pricing.css";

export default function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "Forever",
      description: "Perfect for individuals getting started",
      features: [
        "5 documents per month",
        "Basic templates",
        "Client vault (up to 10 clients)",
        "Email support",
        "Community access"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "For growing legal practices",
      features: [
        "Unlimited documents",
        "All premium templates",
        "Unlimited clients",
        "Priority support",
        "Advanced analytics",
        "Compliance calendar",
        "Document versioning"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large firms and teams",
      features: [
        "Everything in Professional",
        "Team collaboration",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom templates",
        "API access"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="pricing-page">
      <div className="pricing-hero">
        <div className="pricing-hero-content">
          <h1 className="pricing-title">Simple, Transparent Pricing</h1>
          <p className="pricing-subtitle">
            Choose the plan that works best for your practice
          </p>
        </div>
      </div>

      <div className="pricing-plans-section">
        <div className="pricing-container">
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    {plan.period !== "Forever" && plan.period !== "pricing" && (
                      <span className="period">/{plan.period}</span>
                    )}
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <FaCheck className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`plan-cta ${plan.popular ? 'popular-cta' : ''}`}
                  onClick={() => navigate("/signup")}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pricing-faq-section">
        <div className="pricing-container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I change plans later?</h4>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a free trial?</h4>
              <p>Yes! Professional plan includes a 14-day free trial. No credit card required.</p>
            </div>
            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
            </div>
            <div className="faq-item">
              <h4>Do you offer refunds?</h4>
              <p>Yes, we offer a 30-day money-back guarantee on all paid plans.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

