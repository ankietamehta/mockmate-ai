"use client";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
    <Navbar/>
      <Hero />
      <HowItWorks />
      <Features />
      
        <FAQ/>
      <CTA/>
    <Footer/>
    </>
  );
}

