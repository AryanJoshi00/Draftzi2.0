import React, { useState } from "react";
import { Scale, TrendingUp, Users, FileText, Download } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./DocumentsShowcase.css";

export default function DocumentsShowcase() {
  const [activeTab, setActiveTab] = useState("lawyers");
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 100
  });

  const documentCategories = {
    lawyers: {
      icon: Scale,
      label: "Lawyers",
      documents: [
        { name: "Power of Attorney", category: "Legal" },
        { name: "Lease Agreement", category: "Contract" },
        { name: "Legal Notice", category: "Notice" },
        { name: "Settlement Agreement", category: "Legal" },
        { name: "Vakalatnama", category: "Court" },
        { name: "Sale Agreement", category: "Contract" },
        { name: "Partition Deed", category: "Property" },
        { name: "Gift Deed", category: "Property" },
        { name: "NDA", category: "Contract" },
        { name: "MoU", category: "Agreement" },
        { name: "Service Agreement", category: "Contract" },
        { name: "Shareholder Agreement", category: "Corporate" },
        { name: "Employment Agreement", category: "HR" },
        { name: "Founder Agreement", category: "Corporate" },
        { name: "Term Sheet", category: "Investment" },
        { name: "Bail Bond", category: "Court" },
        { name: "Criminal Complaint", category: "Court" },
        { name: "Affidavit (Identity)", category: "Legal" },
        { name: "Affidavit (Incident)", category: "Legal" },
        { name: "Section 41A Notice Reply", category: "Legal" },
        { name: "Section 200 CrPC", category: "Court" }
      ]
    },
    cas: {
      icon: TrendingUp,
      label: "CAs/CSs",
      documents: [
        { name: "Minutes of Board Meeting", category: "Corporate" },
        { name: "Shareholder Resolution", category: "Corporate" },
        { name: "Business Board Resolution", category: "Corporate" },
        { name: "MoA/AoA", category: "Corporate" },
        { name: "Reply to GST Notice", category: "Tax" },
        { name: "Reply to Legal Notice", category: "Legal" },
        { name: "MGT-7 Register", category: "Compliance" },
        { name: "MGT-9 Register", category: "Compliance" },
        { name: "DIR-12", category: "MCA" },
        { name: "ADT-1", category: "Audit" },
        { name: "AGM Notice", category: "Corporate" },
        { name: "DIR-8", category: "MCA" },
        { name: "MBP-1", category: "Banking" },
        { name: "GST Filing Documents", category: "Tax" },
        { name: "NDAs", category: "Contract" }
      ]
    },
    hr: {
      icon: Users,
      label: "HR Teams",
      documents: [
        { name: "Offer Letter", category: "Employment" },
        { name: "Employment Letter", category: "Employment" },
        { name: "NDAs", category: "Contract" },
        { name: "Confirmation Letter", category: "Employment" },
        { name: "Exit Letter", category: "Employment" },
        { name: "Termination Letter", category: "Employment" },
        { name: "Salary Increment Letter", category: "Employment" },
        { name: "Joining Letter", category: "Employment" },
        { name: "Application Letter", category: "General" },
        { name: "Performance Appraisal Form", category: "HR" },
        { name: "Warning Letter", category: "Employment" }
      ]
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section className="documents-showcase-section" ref={ref}>
      <div className={`documents-showcase-container ${isVisible ? 'animate-in' : ''}`}>
        <div className="documents-showcase-header stagger-item">
          <h2 className="documents-showcase-title">Documents Showcase</h2>
          <p className="documents-showcase-subtitle">
            50+ ready-to-use legal & business templates. All accessible in just a few clicks.
          </p>
        </div>

        <div className="documents-tabs stagger-item">
          {Object.entries(documentCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                className={`tab-button ${activeTab === key ? 'active' : ''}`}
                onClick={() => handleTabChange(key)}
              >
                <IconComponent size={20} />
                <span>{category.label}</span>
              </button>
            );
          })}
          <div className={`tab-indicator tab-${activeTab}`}></div>
        </div>

        <div className="documents-grid-wrapper stagger-item">
          <div className={`documents-grid ${activeTab}`}>
            {documentCategories[activeTab].documents.map((doc, index) => (
              <div 
                key={`${activeTab}-${index}`}
                className="document-card"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="document-card-icon">
                  <FileText size={24} />
                </div>
                <div className="document-card-content">
                  <h3 className="document-card-title">{doc.name}</h3>
                  <span className="document-card-category">{doc.category}</span>
                </div>
                <div className="document-card-action">
                  <Download size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="documents-cta stagger-item">
          <button className="premium-cta-button">
            <span>Get Started</span>
            <div className="button-glow"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
