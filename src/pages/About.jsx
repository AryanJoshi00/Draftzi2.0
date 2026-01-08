import React from "react";
import "../styles/About.css";

export default function About() {
  const teamMembers = [
    {
      name: "ARYAN JOSHI",
      role: "UI/UX Developer & Co-Founder",
      email: "aryan.joshi@djsce.ac.in"
    },
    {
      name: "Jatin Gupta",
      role: "Co-Founder",
      email: "jatin.gupta@djsce.ac.in"
    },
    {
      name: "Bhameksh Mistry",
      role: "Frontend Engineer",
      email: "bhameksh.mistry@djsce.ac.in"
    },
    {
      name: "Kevin Savla",
      role: "Backend Engineer",
      email: "kevin.savla@djsce.ac.in"
    }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About Draftzi</h1>
          <p className="about-subtitle">
            Revolutionizing legal document drafting with AI-powered solutions
          </p>
        </div>
      </div>

      <div className="about-mission-section">
        <div className="about-container">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            At Draftzi, we believe that legal professionals should spend less time on paperwork 
            and more time on what matters most - serving their clients. Our AI-powered platform 
            streamlines document creation, compliance tracking, and client management, enabling 
            legal teams to work more efficiently and effectively.
          </p>
        </div>
      </div>

      <div className="about-team-section">
        <div className="about-container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-cards-grid">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-card"
              >
                <div className="team-card-content">
                  <div className="team-card-avatar">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                  <a href={`mailto:${member.email}`} className="team-member-email">
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about-footer-section">
        <div className="about-container">
          <p className="project-note">
            This website was made for Web Application Development Laboratory Mini Project.
          </p>
        </div>
      </div>
    </div>
  );
}

