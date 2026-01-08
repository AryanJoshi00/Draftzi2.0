import React, { useState } from "react";
import { FaEnvelope, FaUser, FaComment, FaPaperPlane } from "react-icons/fa";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const teamMembers = [
    {
      name: "Aryan Joshi",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="contact-content-section">
        <div className="contact-container">
          <div className="contact-grid">
            <div className="contact-form-section">
              <h2 className="form-title">Send us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser className="form-icon" />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="form-icon" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">
                    <FaComment className="form-icon" />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">
                    <FaComment className="form-icon" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us more..."
                  />
                </div>
                <button type="submit" className="submit-btn">
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>

            <div className="contact-info-section">
              <h2 className="info-title">Contact Our Team</h2>
              <div className="team-contact-list">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-contact-card">
                    <div className="contact-card-header">
                      <div className="contact-avatar">
                        {member.name.charAt(0)}
                      </div>
                      <div className="contact-details">
                        <h3 className="contact-name">{member.name}</h3>
                        <p className="contact-role">{member.role}</p>
                      </div>
                    </div>
                    <a href={`mailto:${member.email}`} className="contact-email">
                      <FaEnvelope />
                      {member.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

