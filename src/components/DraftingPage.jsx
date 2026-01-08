import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFileAlt, FaClock } from "react-icons/fa";
import Navbar from "./Navbar";
import "../styles/DraftingPage.css";

// Profession-specific document types
const getDocTypesByProfession = (profession) => {
  if (profession === "lawyer") {
    return [
      // Legal Documents
      { name: "Power of Attorney", icon: "⚖️", color: "#10B981" },
      { name: "Lease Agreement", icon: "🏠", color: "#3B82F6" },
      { name: "Legal Notice", icon: "📋", color: "#EF4444" },
      { name: "Settlement Agreement", icon: "🤝", color: "#8B5CF6" },
      { name: "VAKALATNAMA", icon: "📜", color: "#F59E0B" },
      { name: "Sale Agreement", icon: "📄", color: "#06B6D4" },
      { name: "Partition / Gift Deed", icon: "🎁", color: "#EC4899" },
      
      // Business Documents
      { name: "NDA", icon: "🔒", color: "#6B7280" },
      { name: "Vendor/Freelance Agreement", icon: "💼", color: "#10B981" },
      { name: "Service Agreement", icon: "🔧", color: "#3B82F6" },
      { name: "Shareholder Agreement", icon: "👥", color: "#8B5CF6" },
      { name: "MoU", icon: "📝", color: "#F59E0B" },
      { name: "Employment Agreement", icon: "💼", color: "#06B6D4" },
      { name: "Founder Agreement", icon: "🚀", color: "#EC4899" },
      { name: "Term Sheet", icon: "📊", color: "#6B7280" },
      
      // Criminal Documents
      { name: "Bail Bond", icon: "🔓", color: "#10B981" },
      { name: "Criminal Complaint", icon: "⚖️", color: "#EF4444" },
      { name: "Affidavit - Identity/Incident", icon: "📋", color: "#3B82F6" },
      { name: "Section 41 A Notice Reply", icon: "📄", color: "#8B5CF6" },
      { name: "Section 200CrPC (PCF)", icon: "⚖️", color: "#F59E0B" },
    ];
  }
  
  if (profession === "Chartered Accountant" || profession === "Company Secretary") {
    return [
      // Corporate Documents
      { name: "Minutes of BM", icon: "📝", color: "#10B981" },
      { name: "MBP - 1", icon: "📊", color: "#3B82F6" },
      { name: "DIR - 8", icon: "📋", color: "#8B5CF6" },
      { name: "Shareholder Resolution", icon: "👥", color: "#F59E0B" },
      { name: "General Business Board Resolution", icon: "🏢", color: "#06B6D4" },
      { name: "MoA/AoA", icon: "📜", color: "#EC4899" },
      { name: "Reply to GST/Legal Notices", icon: "📄", color: "#6B7280" },
      { name: "NDA", icon: "🔒", color: "#10B981" },
      { name: "GST FILE", icon: "📁", color: "#3B82F6" },
      { name: "REGISTERS (MGT-7&9, Dir-12, ADT-1, AGM)", icon: "📚", color: "#8B5CF6" },
    ];
  }
  
  if (profession === "HR manager") {
    return [
      // HR Documents
      { name: "Offer Letter", icon: "📧", color: "#10B981" },
      { name: "Employment Letter", icon: "💼", color: "#3B82F6" },
      { name: "NDA", icon: "🔒", color: "#8B5CF6" },
      { name: "Confirmation Letter", icon: "✅", color: "#F59E0B" },
      { name: "Exit/Termination Letter", icon: "🚪", color: "#EF4444" },
      { name: "Salary Increment Letter", icon: "💰", color: "#06B6D4" },
      { name: "Joining/Application Letter", icon: "📝", color: "#EC4899" },
      { name: "Performance Appraisal Form", icon: "📊", color: "#6B7280" },
      { name: "Warning Letter", icon: "⚠️", color: "#F59E0B" },
    ];
  }
  
  // Default documents for unknown professions
  return [
  { name: "Rent Agreement", icon: "🏠", color: "#10B981" },
  { name: "NDA", icon: "🔒", color: "#EF4444" },
  { name: "Sale Deed", icon: "📄", color: "#8B5CF6" },
  { name: "Employment Contract", icon: "💼", color: "#06B6D4" },
];
};

// Document-specific questions system
const getQuestionsForDocument = (documentName) => {
  // NDA Questions
  if (documentName === "NDA") {
    return [
      { id: 1, question: "What is the Client name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
      { id: 2, question: "What is the Client Address?", placeholder: "eg: 123 Street, City", type: "input", category: "Basic Info", required: true },
      { id: 3, question: "Date of Agreement?", placeholder: "Select date", type: "date", category: "Basic Info", required: true },
      { id: 4, question: "What is the other party's name?", placeholder: "eg: John Smith", type: "input", category: "Parties", required: true },
      { id: 5, question: "What is the other party's address?", placeholder: "eg: 456 Other Street", type: "input", category: "Parties", required: false },
      { id: 6, question: "What is the confidential information?", placeholder: "eg: Business plans, customer data", type: "input", category: "Confidentiality", required: true },
      { id: 7, question: "Duration of confidentiality (years)?", placeholder: "eg: 5", type: "input", category: "Terms", required: false },
      { id: 8, question: "Penalty for breach?", placeholder: "eg: 100000", type: "input", category: "Terms", required: false },
    ];
  }

  // Rent Agreement Questions
  if (documentName === "Rent Agreement") {
    return [
      { id: 1, question: "What is the Client name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
      { id: 2, question: "What is the Client Address?", placeholder: "eg: 123 Street, City", type: "input", category: "Basic Info", required: true },
      { id: 3, question: "Date of Agreement?", placeholder: "Select date", type: "date", category: "Basic Info", required: true },
      { id: 4, question: "What is the Property Address?", placeholder: "eg: 456 Property Street", type: "input", category: "Property Details", required: true },
      { id: 5, question: "Monthly Rent Amount?", placeholder: "eg: 50000", type: "input", category: "Financial Terms", required: true },
      { id: 6, question: "Security Deposit Amount?", placeholder: "eg: 100000", type: "input", category: "Financial Terms", required: true },
      { id: 7, question: "Lease Start Date?", placeholder: "Select date", type: "date", category: "Timeline", required: true },
      { id: 8, question: "Lease End Date?", placeholder: "Select date", type: "date", category: "Timeline", required: true },
      { id: 9, question: "Landlord Name?", placeholder: "eg: John Smith", type: "input", category: "Parties", required: true },
      { id: 10, question: "Landlord Contact Number?", placeholder: "eg: +91 9876543210", type: "input", category: "Parties", required: false },
  { 
    id: 11, 
    question: "Property Type?", 
    type: "options", 
    category: "Property Details",
        required: true,
    options: [
      { label: "A", value: "Apartment", text: "Apartment" },
      { label: "B", value: "House", text: "House" },
      { label: "C", value: "Office", text: "Office" },
      { label: "D", value: "Commercial", text: "Commercial Space" }
    ]
  },
  { 
    id: 12, 
    question: "Furnished Status?", 
    type: "options", 
    category: "Property Details",
        required: true,
    options: [
      { label: "A", value: "Fully Furnished", text: "Fully Furnished" },
      { label: "B", value: "Semi-Furnished", text: "Semi-Furnished" },
      { label: "C", value: "Unfurnished", text: "Unfurnished" }
    ]
  },
      { id: 13, question: "Maintenance Charges?", placeholder: "eg: 5000", type: "input", category: "Financial Terms", required: false },
      { id: 14, question: "Notice Period (days)?", placeholder: "eg: 30", type: "input", category: "Terms & Conditions", required: false },
      { id: 15, question: "Special Terms?", placeholder: "eg: No pets allowed, No smoking", type: "input", category: "Terms & Conditions", required: false },
    ];
  }

  // Employment Contract Questions
  if (documentName === "Employment Contract") {
    return [
      { id: 1, question: "What is the Employee name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
      { id: 2, question: "What is the Employee Address?", placeholder: "eg: 123 Street, City", type: "input", category: "Basic Info", required: true },
      { id: 3, question: "Date of Agreement?", placeholder: "Select date", type: "date", category: "Basic Info", required: true },
      { id: 4, question: "What is the Company name?", placeholder: "eg: ABC Corp", type: "input", category: "Company Info", required: true },
      { id: 5, question: "What is the job title?", placeholder: "eg: Software Developer", type: "input", category: "Job Details", required: true },
      { id: 6, question: "What is the salary amount?", placeholder: "eg: 50000", type: "input", category: "Compensation", required: true },
      { id: 7, question: "Start date?", placeholder: "Select date", type: "date", category: "Timeline", required: true },
      { id: 8, question: "Notice period (days)?", placeholder: "eg: 30", type: "input", category: "Terms", required: false },
    ];
  }

  // Power of Attorney Questions
  if (documentName === "Power of Attorney") {
    return [
      { id: 1, question: "What is the Principal's name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
      { id: 2, question: "What is the Attorney's name?", placeholder: "eg: John Smith", type: "input", category: "Parties", required: true },
      { id: 3, question: "Date of Agreement?", placeholder: "Select date", type: "date", category: "Basic Info", required: true },
      { id: 4, question: "What powers are being granted?", placeholder: "eg: Financial decisions, property management", type: "input", category: "Terms", required: true },
    ];
  }

  // Lease Agreement Questions
  if (documentName === "Lease Agreement") {
    return [
      { id: 1, question: "What is the Tenant's name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
      { id: 2, question: "What is the Landlord's name?", placeholder: "eg: John Smith", type: "input", category: "Parties", required: true },
      { id: 3, question: "Property Address?", placeholder: "eg: 123 Main Street", type: "input", category: "Property", required: true },
      { id: 4, question: "Monthly Rent Amount?", placeholder: "eg: 50000", type: "input", category: "Financial", required: true },
      { id: 5, question: "Lease Start Date?", placeholder: "Select date", type: "date", category: "Timeline", required: true },
      { id: 6, question: "Lease End Date?", placeholder: "Select date", type: "date", category: "Timeline", required: true },
    ];
  }

  // Legal Notice Questions
  if (documentName === "Legal Notice") {
    return [
      { id: 1, question: "What is the Sender's name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
      { id: 2, question: "What is the Recipient's name?", placeholder: "eg: John Smith", type: "input", category: "Parties", required: true },
      { id: 3, question: "Date of Notice?", placeholder: "Select date", type: "date", category: "Basic Info", required: true },
      { id: 4, question: "What is the subject matter?", placeholder: "eg: Breach of contract, payment default", type: "input", category: "Content", required: true },
    ];
  }

  // Settlement Agreement Questions
  if (documentName === "Settlement Agreement") {
    return [
      { id: 1, question: "What is the First Party's name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
      { id: 2, question: "What is the Second Party's name?", placeholder: "eg: John Smith", type: "input", category: "Parties", required: true },
      { id: 3, question: "Date of Agreement?", placeholder: "Select date", type: "date", category: "Basic Info", required: true },
      { id: 4, question: "What is the dispute about?", placeholder: "eg: Contract breach, property dispute", type: "input", category: "Content", required: true },
      { id: 5, question: "Settlement Amount?", placeholder: "eg: 100000", type: "input", category: "Financial", required: false },
    ];
  }

  // VAKALATNAMA Questions
  if (documentName === "VAKALATNAMA") {
    return [
      { id: 1, question: "What is the Client's name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
      { id: 2, question: "What is the Advocate's name?", placeholder: "eg: John Smith", type: "input", category: "Parties", required: true },
      { id: 3, question: "Date of Agreement?", placeholder: "Select date", type: "date", category: "Basic Info", required: true },
      { id: 4, question: "What is the case about?", placeholder: "eg: Civil suit, criminal case", type: "input", category: "Content", required: true },
    ];
  }

  // Sale Agreement Questions
  if (documentName === "Sale Agreement") {
    return [
      { id: 1, question: "What is the Buyer's name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
      { id: 2, question: "What is the Seller's name?", placeholder: "eg: John Smith", type: "input", category: "Parties", required: true },
      { id: 3, question: "Property Address?", placeholder: "eg: 123 Main Street", type: "input", category: "Property", required: true },
      { id: 4, question: "Sale Price?", placeholder: "eg: 5000000", type: "input", category: "Financial", required: true },
      { id: 5, question: "Date of Agreement?", placeholder: "Select date", type: "date", category: "Basic Info", required: true },
    ];
  }

  // Partition / Gift Deed Questions
  if (documentName === "Partition / Gift Deed") {
    return [
      { id: 1, question: "What is the Donor's name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
      { id: 2, question: "What is the Donee's name?", placeholder: "eg: John Smith", type: "input", category: "Parties", required: true },
      { id: 3, question: "Property Address?", placeholder: "eg: 123 Main Street", type: "input", category: "Property", required: true },
      { id: 4, question: "Date of Deed?", placeholder: "Select date", type: "date", category: "Basic Info", required: true },
    ];
  }

  // Default questions for any document
  return [
    { id: 1, question: "What is the Client name?", placeholder: "eg: Aryan Dinesh Joshi", type: "input", category: "Basic Info", required: true },
    { id: 2, question: "What is the Client Address?", placeholder: "eg: 123 Street, City", type: "input", category: "Basic Info", required: true },
    { id: 3, question: "Date of Agreement?", placeholder: "Select date", type: "date", category: "Basic Info", required: true },
  ];
};

export default function DraftingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const client = location.state?.client;
  const [stage, setStage] = useState("home"); // home → docs → form → loading
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [errorTimers, setErrorTimers] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [typedState, setTypedState] = useState({ lineIndex: 0, charIndex: 0 });
  
  // Get questions for the selected document
  const formQuestions = selectedDoc ? getQuestionsForDocument(selectedDoc.name) : [];
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [animateButton, setAnimateButton] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  
  // Load user profile on component mount
  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);
  
  // Get current document types based on user profession
  const currentDocTypes = userProfile ? getDocTypesByProfession(userProfile.userType) : getDocTypesByProfession();
  
  // Loading screen typing simulation
  const mockLines = [
    "Parties identified…",
    "Key dates set…",
    "Clauses adapted…",
    "Formatting applied…",
    "Review pass complete…",
  ];

  useEffect(() => {
    if (stage !== "loading") return;

    // Total duration ~5000ms
    const totalMs = 5000;
    const start = performance.now();

    // Progress bar ticker
    const raf = (ts) => {
      const elapsed = ts - start;
      const pct = Math.min(100, Math.round((elapsed / totalMs) * 100));
      setLoadingProgress(pct);
      if (elapsed < totalMs) requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    // Typed lines ticker
    let line = 0;
    let char = 0;
    const perLine = totalMs / mockLines.length; // even slice
    const charTimer = setInterval(() => {
      const now = performance.now();
      const elapsed = now - start;
      line = Math.min(mockLines.length - 1, Math.floor(elapsed / perLine));
      // animate char within current line
      const lineElapsed = elapsed - line * perLine;
      const lineLen = mockLines[line].length;
      char = Math.min(lineLen, Math.floor((lineElapsed / perLine) * lineLen));
      setTypedState({ lineIndex: line, charIndex: char });
    }, 30);

    const doneTimer = setTimeout(() => {
      clearInterval(charTimer);
      cancelAnimationFrame(rafId);
      setLoadingProgress(100);
      // Smooth transition to documents preview after brief delay
      setTimeout(() => {
        try {
          const existingDocs = JSON.parse(localStorage.getItem('generatedDocuments') || '[]');
          const title = selectedDoc?.name || 'Generated Document';
          const clientName = (client && (client.name || client.firmName)) || formData[1] || 'Client';
          const today = new Date().toISOString().slice(0,10);
          const newDoc = {
            id: Date.now(),
            title,
            type: 'Template',
            client: clientName,
            createdDate: today,
            lastModified: today,
            status: 'In Review',
            size: '—',
          };
          localStorage.setItem('generatedDocuments', JSON.stringify([newDoc, ...existingDocs]));

          if (client) {
            const clientsData = JSON.parse(localStorage.getItem('clientsData') || '[]');
            const idx = clientsData.findIndex((c) => c.id === client.id);
            if (idx >= 0) {
              clientsData[idx].documents = (Number(clientsData[idx].documents) || 0) + 1;
            } else {
              clientsData.push({
                ...client,
                documents: 1,
                pinned: false,
                joinDate: client.joinDate || today,
              });
            }
            localStorage.setItem('clientsData', JSON.stringify(clientsData));
          }
        } catch (e) {}

        navigate("/documents-overview", { state: { justGenerated: true } });
      }, 200);
    }, totalMs);

    return () => {
      clearInterval(charTimer);
      cancelAnimationFrame(rafId);
      clearTimeout(doneTimer);
    };
  }, [stage, navigate, selectedDoc, client, formData]);

  // Prefill form when arriving from Client Vault
  useEffect(() => {
    if (stage !== 'form' || !selectedDoc || !client || formQuestions.length === 0) return;
    if (Object.keys(formData).length > 0) return;
    const updated = { ...formData };
    formQuestions.forEach((q) => {
      const ql = (q.question || '').toLowerCase();
      if (ql.includes("client name")) updated[q.id] = client.name || client.firmName || '';
      if (ql.includes("client address") || ql.includes("address")) updated[q.id] = client.firmAddress || '';
      if (ql.includes("contact") || ql.includes("phone")) updated[q.id] = client.phone || '';
      if (ql.includes("email")) updated[q.id] = client.email || '';
    });
    if (Object.keys(updated).length > Object.keys(formData).length) setFormData(updated);
  }, [stage, selectedDoc, client, formQuestions, formData]);
  
  // Helper functions for dynamic greeting
  const getShortenedTitle = (userType) => {
    const titleMap = {
      'Chartered Accountant': 'CA',
      'Company Secretary': 'CS',
      'HR Manager': 'HR',
      'HR manager': 'HR',
      'lawyer': 'Lawyer',
      'Attorney': 'Attorney',
      'Consultant': 'Consultant'
    };
    return titleMap[userType] || userType;
  };

  const getFirstName = (fullName) => {
    return fullName ? fullName.split(' ')[0] : 'User';
  };

  // Load user profile from localStorage
  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      try {
        const parsedProfile = JSON.parse(profile);
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error('Error parsing user profile:', error);
      }
    }
  }, []);

  // Cleanup error timers when step changes or component unmounts
  useEffect(() => {
    return () => {
      // Clear all timers when component unmounts or step changes
      Object.values(errorTimers).forEach(timer => clearTimeout(timer));
    };
  }, [currentStep, errorTimers]);

  // Button animation function
  const animateButtonClick = (buttonType) => {
    setAnimateButton(buttonType);
    setTimeout(() => setAnimateButton(null), 600);
  };

  // Function to set error with auto-removal after 3 seconds
  const setErrorWithTimer = (fieldId, errorMessage) => {
    // Clear existing timer for this field
    if (errorTimers[fieldId]) {
      clearTimeout(errorTimers[fieldId]);
    }

    // Set the error
    setFormErrors(prev => ({
      ...prev,
      [fieldId]: errorMessage
    }));

    // Set timer to remove error after 3 seconds
    const timer = setTimeout(() => {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
      setErrorTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[fieldId];
        return newTimers;
      });
    }, 3000);

    setErrorTimers(prev => ({
      ...prev,
      [fieldId]: timer
    }));
  };

  // Validation helper functions
  const validatePhoneNumber = (phone) => {
    // Remove spaces, dashes, and parentheses
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    // Check if it's all digits (with optional + at start)
    return /^\+?\d{10,15}$/.test(cleaned);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateYear = (yearStr) => {
    const year = parseInt(yearStr, 10);
    return !isNaN(year) && year >= 1800 && year <= 2200;
  };

  const validateName = (name) => {
    return name && name.trim().length >= 3;
  };

  const validateAddress = (address) => {
    return address && address.trim().length >= 10;
  };

  // Form validation function
  const validateCurrentStep = () => {
    const currentQuestion = formQuestions[currentStep];
    if (!currentQuestion) return true;

    const newErrors = { ...formErrors };
    
    // Check if required field is empty
    if (currentQuestion.required) {
      if (currentQuestion.type === "options") {
        if (!selectedOption) {
          setErrorWithTimer(currentQuestion.id, "This field is required");
          return false;
        }
      } else {
        const fieldValue = formData[currentQuestion.id];
        if (!fieldValue || fieldValue.trim() === "") {
          setErrorWithTimer(currentQuestion.id, "This field is required");
          return false;
        }
      }
    }

    // Additional validation for input fields
    if (currentQuestion.type === "input") {
      const fieldValue = formData[currentQuestion.id];
      if (fieldValue && fieldValue.trim() !== "") {
        const questionLower = currentQuestion.question.toLowerCase();
        
        // Validate contact/phone numbers
        if (questionLower.includes("contact") || questionLower.includes("phone") || questionLower.includes("number")) {
          if (!validatePhoneNumber(fieldValue)) {
            setErrorWithTimer(currentQuestion.id, "Please enter a valid phone number (10-15 digits)");
            return false;
          }
        }
        
        // Validate email
        if (questionLower.includes("email")) {
          if (!validateEmail(fieldValue)) {
            setErrorWithTimer(currentQuestion.id, "Please enter a valid email address");
            return false;
          }
        }
        
        // Validate names (must be at least 3 characters)
        if (questionLower.includes("name") && !questionLower.includes("company") && !questionLower.includes("firm")) {
          if (!validateName(fieldValue)) {
            setErrorWithTimer(currentQuestion.id, "Name must be at least 3 characters long");
            return false;
          }
        }
        
        // Validate addresses (must be at least 10 characters)
        if (questionLower.includes("address")) {
          if (!validateAddress(fieldValue)) {
            setErrorWithTimer(currentQuestion.id, "Address must be at least 10 characters long");
            return false;
          }
        }
        
        // Validate dates - check if year is in range
        if (currentQuestion.type === "date") {
          const year = new Date(fieldValue).getFullYear();
          if (!validateYear(year.toString())) {
            setErrorWithTimer(currentQuestion.id, "Year must be between 1800 and 2200");
            return false;
          }
        }
      }
    }

    // Clear error if field is valid
    if (newErrors[currentQuestion.id]) {
      delete newErrors[currentQuestion.id];
      setFormErrors(newErrors);
    }

    return true;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (stage === "form") {
        if (!isFormStarted && e.key === "Enter") {
          e.preventDefault();
          setIsFormStarted(true);
        } else if (isFormStarted) {
          const currentQuestion = formQuestions[currentStep];
          
          // Handle options-type questions
          if (currentQuestion?.type === "options") {
            // Number keys for option selection
            if (e.key >= "1" && e.key <= "9") {
              const optionIndex = parseInt(e.key) - 1;
              if (optionIndex < currentQuestion.options.length) {
                e.preventDefault();
                setSelectedOption(currentQuestion.options[optionIndex].value);
                setHoveredOption(optionIndex);
              }
            }
            // Letter keys for option selection (A, B, C, D)
            if (e.key >= "a" && e.key <= "z") {
              const optionIndex = currentQuestion.options.findIndex(
                opt => opt.label.toLowerCase() === e.key.toLowerCase()
              );
              if (optionIndex !== -1) {
                e.preventDefault();
                setSelectedOption(currentQuestion.options[optionIndex].value);
                setHoveredOption(optionIndex);
              }
            }
            // Arrow keys for navigation
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              const currentHover = hoveredOption !== null ? hoveredOption : -1;
              let newHover;
              if (e.key === "ArrowDown") {
                newHover = currentHover < currentQuestion.options.length - 1 ? currentHover + 1 : 0;
              } else {
                newHover = currentHover > 0 ? currentHover - 1 : currentQuestion.options.length - 1;
              }
              setHoveredOption(newHover);
            }
            // Enter to confirm selection
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (selectedOption) {
                animateButtonClick('next');
                setFormData({
                  ...formData,
                  [currentQuestion.id]: selectedOption,
                });
                if (currentStep < formQuestions.length - 1) {
                  setCurrentStep(currentStep + 1);
                  setSelectedOption(null);
                  setHoveredOption(null);
                } else {
                  // Show loading screen instead of alert
                  setStage("loading");
                }
              } else if (currentQuestion.required) {
                // Show validation error for required options
                setErrorWithTimer(currentQuestion.id, "This field is required");
              }
            }
          } else {
            // Handle input-type questions
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (validateCurrentStep()) {
                animateButtonClick('next');
                if (currentStep < formQuestions.length - 1) {
                  setCurrentStep(currentStep + 1);
                } else {
                  // Show loading screen instead of alert
                  setStage("loading");
                }
              }
            }
          }
          
          // Shift+Enter for going back
          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            animateButtonClick('back');
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1);
              setSelectedOption(null);
              setHoveredOption(null);
            }
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [stage, isFormStarted, currentStep, formQuestions, formData, selectedOption, hoveredOption, navigate, currentDocTypes]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <div className="drafting-page-wrapper">
      <Navbar />
      <div className="standard-content-container centered">
          {/* Fixed Back Button for form stage */}
          {stage === "form" && (
            <button
              onClick={() => {
                setStage("docs");
                setCurrentStep(0);
                setIsFormStarted(false);
                setSelectedOption(null);
                setHoveredOption(null);
                setFormData({});
              }}
              className="back-button-top"
            >
              <FaArrowLeft />
              Back
            </button>
          )}
          {/* Fixed Back Button for document selection stage */}
          {stage === "docs" && (
            <button
              onClick={() => setStage("home")}
              className="back-button-top"
            >
              <FaArrowLeft />
              Back
            </button>
          )}
          {/* Back to Dashboard Button - Only on home screen */}
          {stage === "home" && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/dashboard")}
              className="back-to-dashboard-button"
            >
              <FaArrowLeft />
              Back to Dashboard
            </motion.button>
          )}

        <AnimatePresence mode="wait">
          {/* ---------------- HOME SCREEN ---------------- */}
          {stage === "home" && (
            <motion.div
              key="home"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="home-screen"
            >
              <div className="welcome-section">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="welcome-icon"
                >
                  <FaFileAlt />
                </motion.div>
                <h1 className="welcome-title">
                  {userProfile && userProfile.name && userProfile.userType 
                    ? `Hello, ${getShortenedTitle(userProfile.userType)} ${getFirstName(userProfile.name)}` 
                    : 'Hello, User'}
                </h1>
                <p className="welcome-subtitle">Ready to draft your next document?</p>
              </div>

              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage("docs")}
                className="draft-button"
              >
                <FaFileAlt />
                DRAFT NOW
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="progress-steps"
              >
                <div className="step-item active">
                  <div className="step-number">1</div>
                  <span>Select Document</span>
                </div>
                <div className="step-connector"></div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <span>Fill Details</span>
                </div>
                <div className="step-connector"></div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <span>Review & Generate</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ---------------- DOCUMENT SELECTION SCREEN ---------------- */}
          {stage === "docs" && (
            <motion.div
              key="docs"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="docs-screen"
            >
              <div className="docs-header">
                <h2 className="docs-title">Choose Document Type</h2>
                <p className="docs-subtitle">Select the type of document you want to draft</p>
              </div>

              <div className="docs-grid">
                {currentDocTypes.map((doc, i) => (
                      <motion.div
                        key={doc.name}
                    className="doc-tile"
                    style={{ '--doc-color': doc.color }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedDoc(doc);
                          setStage("form");
                        }}
                      >
                    <div className="doc-tile-icon">{doc.icon}</div>
                    <h3 className="doc-tile-title">{doc.name}</h3>
                      </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ---------------- FORM SCREEN ---------------- */}
          {stage === "form" && (
            <motion.div
              key="form"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="form-screen"
            >
              {!isFormStarted ? (
                <div className="form-intro-screen">
                  <h2 className="form-intro-title">Let's Draft "{selectedDoc?.name}" Now</h2>
                  <p className="form-intro-subtitle">Let's lock in the names, dates, and more.</p>
                  
                  <div className="form-intro-actions">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsFormStarted(true)}
                      className="start-button"
                    >
                      Start
                    </motion.button>
                    <span className="keyboard-hint">press Enter →</span>
                  </div>
                  
                  <div className="time-estimate">
                    <FaClock />
                    <span>Takes 3 minutes</span>
                  </div>
                </div>
              ) : (
                <div className="form-question-screen">
                  {/* Progress Bar - Fixed position, no animation */}
                  <div className="progress-section">
                    <div className="progress-line">
                      <motion.div
                        className="progress-fill"
                        animate={{ width: `${((currentStep + 1) / formQuestions.length) * 100}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                    <div className="progress-text">
                      {currentStep + 1} / {formQuestions.length}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="question-container"
                    >
                    {/* Step Indicator and Question Text */}
                    <div className="question-header">
                      <span className="step-indicator">{currentStep + 1}→</span>
                      <h3 className="question-text">
                        {formQuestions[currentStep].question}
                        {formQuestions[currentStep].required && (
                          <span className="required-asterisk"> *</span>
                        )}
                      </h3>
                    </div>

                    {/* Answer Area - Centered */}
                    <div className="answer-area">
                      {formQuestions[currentStep].type === "options" ? (
                        <div className="options-container">
                          {formQuestions[currentStep].options.map((option, index) => (
                            <motion.button
                              key={option.value}
                              className={`option-button ${
                                selectedOption === option.value ? "selected" : ""
                              } ${hoveredOption === index ? "hovered" : ""}`}
                              onClick={() => {
                                setSelectedOption(option.value);
                                setHoveredOption(index);
                                // Clear error and timer when user makes a selection
                                if (formErrors[formQuestions[currentStep].id]) {
                                  // Clear the timer
                                  if (errorTimers[formQuestions[currentStep].id]) {
                                    clearTimeout(errorTimers[formQuestions[currentStep].id]);
                                    setErrorTimers(prev => {
                                      const newTimers = { ...prev };
                                      delete newTimers[formQuestions[currentStep].id];
                                      return newTimers;
                                    });
                                  }
                                  // Clear the error immediately
                                  setFormErrors(prev => {
                                    const newErrors = { ...prev };
                                    delete newErrors[formQuestions[currentStep].id];
                                    return newErrors;
                                  });
                                }
                              }}
                              onMouseEnter={() => setHoveredOption(index)}
                              onMouseLeave={() => setHoveredOption(null)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="option-label">{option.label}</span>
                              <span className="option-text">{option.text}</span>
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <input
                          type={formQuestions[currentStep].type || "text"}
                          placeholder={formQuestions[currentStep].placeholder}
                          value={formData[formQuestions[currentStep].id] || ""}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              [formQuestions[currentStep].id]: e.target.value,
                            });
                            // Clear error and timer when user starts typing
                            if (formErrors[formQuestions[currentStep].id]) {
                              // Clear the timer
                              if (errorTimers[formQuestions[currentStep].id]) {
                                clearTimeout(errorTimers[formQuestions[currentStep].id]);
                                setErrorTimers(prev => {
                                  const newTimers = { ...prev };
                                  delete newTimers[formQuestions[currentStep].id];
                                  return newTimers;
                                });
                              }
                              // Clear the error immediately
                              setFormErrors(prev => {
                                const newErrors = { ...prev };
                                delete newErrors[formQuestions[currentStep].id];
                                return newErrors;
                              });
                            }
                          }}
                          className={`question-input ${formErrors[formQuestions[currentStep].id] ? 'error' : ''}`}
                          autoFocus
                        />
                      )}
                  </div>
                  
                  {/* Error Message Display - Outside answer area */}
                  {formErrors[formQuestions[currentStep].id] && (
                    <div className="error-message">
                      {formErrors[formQuestions[currentStep].id]}
                    </div>
                  )}

                    {/* Navigation Buttons - Centered */}
                    <div className="question-navigation">
                      <div className="nav-left">
                        <button
                          disabled={currentStep === 0}
                          onClick={() => {
                            animateButtonClick('back');
                            setCurrentStep(currentStep - 1);
                            setSelectedOption(null);
                            setHoveredOption(null);
                          }}
                          className={`nav-button-back ${animateButton === 'back' ? 'animate-border' : ''}`}
                        >
                          Go Back
                        </button>
                        <span className="keyboard-hint">
                          press <strong>Shift+Enter</strong> ←
                        </span>
                      </div>
                      
                      <div className="nav-right">
                        <span className="keyboard-hint">
                          press <strong>Enter</strong> →
                        </span>
                        {currentStep < formQuestions.length - 1 ? (
                          <button
                            onClick={() => {
                              if (validateCurrentStep()) {
                                animateButtonClick('next');
                                if (formQuestions[currentStep].type === "options" && selectedOption) {
                                  setFormData({
                                    ...formData,
                                    [formQuestions[currentStep].id]: selectedOption,
                                  });
                                }
                                setCurrentStep(currentStep + 1);
                                setSelectedOption(null);
                                setHoveredOption(null);
                              }
                            }}
                            className={`nav-button-next ${animateButton === 'next' ? 'animate-border' : ''}`}
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (validateCurrentStep()) {
                                animateButtonClick('finish');
                                if (formQuestions[currentStep].type === "options" && selectedOption) {
                                  setFormData({
                                    ...formData,
                                    [formQuestions[currentStep].id]: selectedOption,
                                  });
                                }
                                // Show loading screen instead of alert
                                setStage("loading");
                              }
                            }}
                            className={`nav-button-finish ${animateButton === 'finish' ? 'animate-border' : ''}`}
                          >
                            Finish
                          </button>
                        )}
                      </div>
                    </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}

          {/* ---------------- LOADING SCREEN ---------------- */}
          {stage === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="doc-loading-screen"
            >
              <div className="doc-card-wrap">
                <motion.div
                  className="doc-card"
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {mockLines.map((line, idx) => {
                    const isCurrent = idx === typedState.lineIndex;
                    const shown = idx < typedState.lineIndex
                      ? line
                      : isCurrent
                        ? line.slice(0, typedState.charIndex)
                        : "";
                    const completed = idx < typedState.lineIndex;
                    return (
                      <div key={idx} className={`doc-line ${completed ? 'done' : ''}`}>
                        <span>{shown}</span>
                        {isCurrent && <span className="blinking-cursor">|</span>}
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              <div className="doc-loading-progress">
                <div className="doc-loading-label">Drafting your document…</div>
                <div className="doc-loading-bar">
                  <div className="doc-loading-fill" style={{ width: `${loadingProgress}%` }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
