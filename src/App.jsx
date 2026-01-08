import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ClientVault from "./components/ClientVault";
import DocumentsOverview from "./components/DocumentsOverview";
import ComplianceCalendar from "./components/ComplianceCalendar";
import Notifications from "./components/Notifications";
import ProfileSettings from "./components/ProfileSettings";
import UpgradePlan from "./components/UpgradePlan";
import AccountSettings from "./components/AccountSettings";
import Help from "./components/Help";
import DraftingPage from "./components/DraftingPage";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";

function HomePage() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <LandingPage />
      </main>
    </div>
  );
}

function SignupPage() {
  return (
    <div className="signup-page-wrapper">
      <Navbar />
      <Signup />
    </div>
  );
}

function DashboardPage() {
  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
}

function ClientVaultPage() {
  return (
    <div className="client-vault-page">
      <Navbar />
      <ClientVault />
    </div>
  );
}

function DocumentsOverviewPage() {
  return (
    <div className="documents-overview-page">
      <Navbar />
      <DocumentsOverview />
    </div>
  );
}


function ComplianceCalendarPage() {
  return (
    <div className="compliance-calendar-page">
      <Navbar />
      <ComplianceCalendar />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/client-vault" element={<ClientVaultPage />} />
        <Route path="/documents-overview" element={<DocumentsOverviewPage />} />
        <Route
          path="/compliance-calendar"
          element={<ComplianceCalendarPage />}
        />
        <Route path="/notifications" element={<div className="client-vault-page"><Navbar /><Notifications /></div>} />
        <Route path="/profile-settings" element={<div className="client-vault-page"><Navbar /><ProfileSettings /></div>} />
        <Route path="/upgrade-plan" element={<div className="client-vault-page"><Navbar /><UpgradePlan /></div>} />
        <Route path="/account-settings" element={<div className="client-vault-page"><Navbar /><AccountSettings /></div>} />
        <Route path="/help" element={<div className="client-vault-page"><Navbar /><Help /></div>} />
        <Route path="/drafting" element={<DraftingPage />} />
        <Route path="/features" element={<div className="app-wrapper"><Navbar /><Features /></div>} />
        <Route path="/pricing" element={<div className="app-wrapper"><Navbar /><Pricing /></div>} />
        <Route path="/about" element={<div className="app-wrapper"><Navbar /><About /></div>} />
        <Route path="/contact" element={<div className="app-wrapper"><Navbar /><Contact /></div>} />
      </Routes>
    </Router>
  );
}

export default App;
