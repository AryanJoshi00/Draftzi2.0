import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "../styles/Footer.css";

export default function Footer() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 200
  });

  return (
    <footer className="footer" ref={ref}>
      <div className={`footer-container ${isVisible ? 'animate-in' : ''}`}>
        <div className="footer-section stagger-item">
          <h3>About Draftzi</h3>
          <p>
            Streamlining legal document creation with AI-powered automation.
            Trusted by thousands of legal professionals worldwide.
          </p>
        </div>

        <div className="footer-section stagger-item">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div>

        <div className="footer-section stagger-item">
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="#">Document Templates</a>
            </li>
            <li>
              <a href="#">Legal Guides</a>
            </li>
            <li>
              <a href="#">API Documentation</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        <div className="footer-section stagger-item">
          <h3>Contact</h3>
          <p>Email: hello@draftzi.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>
            Address: 123 Legal Street, Suite 100
            <br />
            New York, NY 10001
          </p>
        </div>
      </div>

      <div className="footer-bottom stagger-item">
        <p>
          &copy; 2025 Draftzi. All rights reserved. | Privacy Policy | Terms of
          Service
        </p>
      </div>

      <div className="footer-brand stagger-item">
        <span>DRAFTZI</span>
      </div>
    </footer>
  );
}
