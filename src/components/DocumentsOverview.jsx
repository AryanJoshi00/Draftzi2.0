import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaFileAlt,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import "../styles/DocumentsOverview.css";

export default function DocumentsOverview() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [documents, setDocuments] = useState([]);
  const [showTour, setShowTour] = useState(false);
  const justGenerated = location.state?.justGenerated;
  const tourSeen = (typeof window !== 'undefined') && localStorage.getItem('documentsTourSeen') === 'true';
  
  useEffect(() => {
    if (justGenerated && !tourSeen) {
      setShowTour(true);
    }
  }, [justGenerated, tourSeen]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('generatedDocuments') || '[]');
      setDocuments(stored);
    } catch {
      setDocuments([]);
    }
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      doc.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
      case "Completed":
        return "#10b981"; // Green
      case "Pending Review":
      case "In Review":
        return "#f59e0b"; // Yellow
      case "Unapproved":
        return "#dc2626"; // Red
      case "Draft":
      default:
        return "#ffffff"; // White (default created)
    }
  };

  const handleStatusChange = (documentId, newStatus) => {
    try {
      const stored = JSON.parse(localStorage.getItem('generatedDocuments') || '[]');
      const updated = stored.map((d) => 
        d.id === documentId ? { ...d, status: newStatus } : d
      );
      localStorage.setItem('generatedDocuments', JSON.stringify(updated));
      setDocuments(updated);
    } catch (error) {
      console.error('Error updating document status:', error);
    }
  };

  return (
    <div className="standard-page-container">
      <div className="standard-content-container centered">
        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={handleBackToDashboard}>
            <FaArrowLeft />
            Back to Dashboard
          </button>
          <h1 className="page-title">Documents Overview</h1>
          <p className="page-subtitle">
            Manage and track all your generated documents
          </p>
        </div>

        {/* Removed inline success banner per request */}

        {/* Search and Filter Section */}
        <div className="overview-controls">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <FaFilter className="filter-icon" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="contract">Contract</option>
              <option value="agreement">Agreement</option>
              <option value="policy">Policy</option>
            </select>
          </div>
        </div>

        {/* Document Stats */}
        <div className="document-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaFileAlt />
            </div>
            <div className="stat-content">
              <h3>Total Documents</h3>
              <p className="stat-number">{documents.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaCalendarAlt />
            </div>
            <div className="stat-content">
              <h3>This Month</h3>
              <p className="stat-number">
                {
                  documents.filter(
                    (doc) =>
                      new Date(doc.createdDate).getMonth() ===
                      new Date().getMonth()
                  ).length
                }
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaUser />
            </div>
            <div className="stat-content">
              <h3>Active Clients</h3>
              <p className="stat-number">
                {new Set(documents.map((doc) => doc.client)).size}
              </p>
            </div>
          </div>
        </div>

        {justGenerated && (
          <div className="inline-success-banner">
            <strong>Document generated successfully.</strong> Please review the document and approve it to finalize.
          </div>
        )}

        {/* Documents List */}
        <div className="documents-list">
          <h2 className="list-title">All Documents</h2>
          <div className="documents-table">
            <div className="table-header">
              <div className="header-cell">Document</div>
              <div className="header-cell">Type</div>
              <div className="header-cell">Client</div>
              <div className="header-cell">Created</div>
              <div className="header-cell">Status</div>
              <div className="header-cell">Actions</div>
            </div>
            <div className="table-body">
              {filteredDocuments.map((document, idx) => (
                <div key={document.id} className={`table-row ${(justGenerated && !tourSeen && idx === 0) ? 'tour-highlight' : ''}`}>
                  <div className="table-cell document-info">
                    <div className="document-icon">
                      <FaFileAlt />
                    </div>
                    <div className="document-details">
                      <h4 className="document-title">{document.title}</h4>
                      <p className="document-size">{document.size}</p>
                    </div>
                  </div>
                  <div className="table-cell">
                    <span className="document-type">{document.type}</span>
                  </div>
                  <div className="table-cell">
                    <span className="client-name">{document.client}</span>
                  </div>
                  <div className="table-cell">
                    <span className="created-date">
                      {new Date(document.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="table-cell">
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(document.status),
                        color: document.status === 'Draft' || !document.status ? '#1a1a1a' : '#ffffff',
                        border: (document.status === 'Draft' || !document.status) ? '2px solid #e2e8f0' : 'none'
                      }}
                    >
                      {document.status || 'Draft'}
                    </span>
                  </div>
                  <div className="table-cell">
                    <div className="action-buttons">
                      <button className="action-btn view" title="View">
                        <FaEye />
                      </button>
                      <button className="action-btn edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="action-btn download" title="Download">
                        <FaDownload />
                      </button>
                      <button className="action-btn delete" title="Delete">
                        <FaTrash />
                      </button>
                      {/* Status Action Buttons */}
                      <div className="status-action-buttons">
                        <button
                          className="status-btn white"
                          title="Set as Draft (Default)"
                          onClick={() => handleStatusChange(document.id, 'Draft')}
                          style={{ backgroundColor: '#ffffff', color: '#1a1a1a', border: '2px solid #e2e8f0' }}
                        >
                          Draft
                        </button>
                        <button
                          className="status-btn yellow"
                          title="Set as Pending Review"
                          onClick={() => handleStatusChange(document.id, 'Pending Review')}
                          style={{ backgroundColor: '#f59e0b', color: '#ffffff' }}
                        >
                          Review
                        </button>
                        <button
                          className="status-btn green"
                          title="Approve"
                          onClick={() => handleStatusChange(document.id, 'Approved')}
                          style={{ backgroundColor: '#10b981', color: '#ffffff' }}
                        >
                          Approve
                        </button>
                        <button
                          className="status-btn red"
                          title="Unapprove"
                          onClick={() => handleStatusChange(document.id, 'Unapproved')}
                          style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* First-run tutorial modal */}
        {showTour && (
          <div className="tour-overlay" role="dialog" aria-modal="true" onClick={() => {
            setShowTour(false);
            try { localStorage.setItem('documentsTourSeen', 'true'); } catch {}
          }}>
            <div className="tour-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Review & Approve</h3>
              <ol className="tour-steps">
                <li>Open the latest document (highlighted).</li>
                <li>Skim key details for accuracy.</li>
                <li>Click <strong>Approve</strong> to finalize.</li>
              </ol>
              <div className="tour-actions">
                <button
                  className="tour-primary"
                  onClick={() => {
                    setShowTour(false);
                    try { localStorage.setItem('documentsTourSeen', 'true'); } catch {}
                  }}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
