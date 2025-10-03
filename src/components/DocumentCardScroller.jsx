import React, { useEffect, useRef, useState } from "react";
import "./DocumentCardScroller.css";

// Smooth easing function for better animation feel
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function DocumentCardScroller() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionsRef = useRef([]);
  
  // Remove scroll animations - we don't want slide effects for card scroller

  const sections = [
    {
      id: "lawyers",
      title: "For Lawyers",
      subtitle: "Comprehensive legal documents that meet court standards",
      cards: [
        { icon: "⚖️", title: "Legal Notice" },
        { icon: "📄", title: "Power of Attorney" },
        { icon: "🤝", title: "Agreement Draft" },
        { icon: "🏛️", title: "Court Petition" },
        { icon: "✍️", title: "Affidavit" },
        { icon: "📋", title: "Contract Review" },
        { icon: "🔒", title: "NDA Template" },
        { icon: "📝", title: "Lease Agreement" },
        { icon: "⚡", title: "Cease & Desist" },
      ]
    },
    {
      id: "cas",
      title: "For CAs/CSs",
      subtitle: "Statutory compliance documents that save hours of work",
      cards: [
        { icon: "📊", title: "Annual Return" },
        { icon: "💼", title: "Board Resolution" },
        { icon: "🏢", title: "Company Formation" },
        { icon: "📈", title: "Financial Statement" },
        { icon: "🔍", title: "Audit Report" },
        { icon: "📑", title: "Secretarial Audit" },
        { icon: "💰", title: "Tax Filing" },
        { icon: "🎯", title: "Compliance Report" },
        { icon: "📌", title: "AGM Notice" },
      ]
    },
    {
      id: "hrs",
      title: "For HRs",
      subtitle: "Employee documentation that maintains consistency and professionalism",
      cards: [
        { icon: "👤", title: "Offer Letter" },
        { icon: "📋", title: "Employment Contract" },
        { icon: "⚠️", title: "Warning Letter" },
        { icon: "🚪", title: "Termination Notice" },
        { icon: "📊", title: "Performance Review" },
        { icon: "🎓", title: "Experience Letter" },
        { icon: "📝", title: "Policy Document" },
        { icon: "🔄", title: "Transfer Letter" },
        { icon: "✅", title: "Increment Letter" },
      ]
    }
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          sectionsRef.current.forEach((section, index) => {
            if (!section) return;
            
            const track = section.querySelector('.cards-track');
            if (!track) return;

            const rect = section.getBoundingClientRect();
            
            // Check if section is in viewport
            if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
              // Calculate progress with smoother easing
              const rawProgress = Math.max(0, Math.min(1, -rect.top / (section.offsetHeight - window.innerHeight)));
              const progress = easeOutCubic(rawProgress);
              
              const cards = track.querySelectorAll('.card');
              const cardWidth = cards.length > 0 ? cards[0].offsetWidth : 300;
              const gap = 32;
              const containerWidth = section.offsetWidth;
              const paddingWidth = containerWidth * 0.1; // 5vw on each side = 10vw total
              const visibleWidth = containerWidth - paddingWidth;
              const totalWidth = (cardWidth + gap) * cards.length;
              const maxTranslateX = Math.max(0, totalWidth - visibleWidth);
              const translateX = -(maxTranslateX * progress);
              
              // Apply smooth transform with parallax
              track.style.transform = `translateX(${translateX}px) translateZ(0)`;
              
              // Animate cards into view with gentler staggered delays
              cards.forEach((card, cardIndex) => {
                const cardProgress = Math.max(0, Math.min(1, progress - (cardIndex * 0.05)));
                if (cardProgress > 0.2) {
                  card.classList.add('in-view');
                  card.style.transitionDelay = `${cardIndex * 0.08}s`;
                } else {
                  card.classList.remove('in-view');
                }
              });
            } else {
              // Reset cards when section is out of view
              const cards = track.querySelectorAll('.card');
              cards.forEach(card => {
                card.classList.remove('in-view');
              });
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e) => {
      if (hoveredCard) {
        const cursor = document.querySelector('.custom-cursor');
        const draftText = document.querySelector('.floating-draft-text');
        
        if (cursor) {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
        }
        
        if (draftText) {
          draftText.style.left = (e.clientX + 15) + 'px';
          draftText.style.top = (e.clientY - 15) + 'px';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredCard]);

  const handleCardMouseEnter = (cardIndex) => {
    // Only show custom cursor on desktop
    if (window.innerWidth > 768) {
      setHoveredCard(cardIndex);
      document.body.classList.add('hovering-card');
    }
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
    document.body.classList.remove('hovering-card');
  };

  const handleSectionMouseEnter = (sectionElement) => {
    const track = sectionElement.querySelector('.cards-track');
    if (!track) return;

    const rect = sectionElement.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / (sectionElement.offsetHeight - window.innerHeight)));
    const cards = track.querySelectorAll('.card');
    const cardWidth = cards.length > 0 ? cards[0].offsetWidth : 300;
    const gap = 32;
    const containerWidth = sectionElement.offsetWidth;
    const paddingWidth = containerWidth * 0.1;
    const visibleWidth = containerWidth - paddingWidth;
    const totalWidth = (cardWidth + gap) * cards.length;
    const maxTranslateX = Math.max(0, totalWidth - visibleWidth);
    const translateX = -(maxTranslateX * progress);
    track.style.transform = `translateX(${translateX}px)`;
  };

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <div 
          key={section.id}
          className="section-wrapper" 
          data-section={section.id}
          ref={el => sectionsRef.current[sectionIndex] = el}
          onMouseEnter={(e) => handleSectionMouseEnter(e.currentTarget)}
        >
          <div className="section-sticky">
            <div className="section-header">
              <h2 className="section-title">{section.title}</h2>
              <p className="section-subtitle">{section.subtitle}</p>
            </div>
            <div className="cards-container">
              <div className="cards-track">
                {section.cards.map((card, cardIndex) => (
                  <div 
                    key={cardIndex}
                    className="card"
                    onMouseEnter={() => handleCardMouseEnter(`${section.id}-${cardIndex}`)}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div className="card-icon">{card.icon}</div>
                    <div className="card-title">{card.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Custom cursor and floating Draft text */}
      {hoveredCard && (
        <>
          <div className="custom-cursor"></div>
          <div className="floating-draft-text">Draft →</div>
        </>
      )}
    </>
  );
}