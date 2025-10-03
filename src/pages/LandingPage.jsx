import React from "react";
import Hero from "./Hero";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import HowItWorks from "../components/HowItWorks";
import DocumentCardScroller from "../components/DocumentCardScroller";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <DocumentCardScroller />
      <FinalCTA />
      <Footer />
    </>
  );
}
