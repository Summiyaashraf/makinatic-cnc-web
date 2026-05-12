"use client"; 
import React, { Suspense } from "react";
import Navbar from "@/src/app/components/Navbar";
import Hero from "@/src/app/components/Hero";
import ProductSection from "@/src/app/components/Products";
import AboutSection from "@/src/app/components/About";
import Footer from "@/src/app/components/Footer";
import Features from "@/src/app/components/Features";
import ContactPage from "@/src/app/components/Contact";
import ReviewSection from "./components/Review";
import MaintenanceSection from "./components/Maintenance";
import { useLanguage } from "./context/LanguageContext"; 

export default function Home() {
  const context = useLanguage();
  const language = context?.language || 'ar';
  const isAr = language === 'ar';

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="h-screen flex items-center justify-center text-blue-900">Loading...</div>}>
        <Navbar />
        <Hero /> 
        <ProductSection />
        <MaintenanceSection isAr={isAr} />
        <AboutSection />
        <Features />
        <ReviewSection />
        <ContactPage />
        <Footer />
      </Suspense>
    </main>
  );
}
