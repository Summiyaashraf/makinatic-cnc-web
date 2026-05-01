import Navbar from "@/src/app/components/Navbar";
import Hero from "@/src/app/components/Hero";
import ProductSection from "@/src/app/components/Products";
import AboutSection from "@/src/app/components/About";
import Footer from "@/src/app/components/Footer";
import Features from "@/src/app/components/Features";
import ContactPage from "@/src/app/components/Contact";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero /> 
      <Suspense fallback={
        <div className="py-20 text-center bg-[#061a80] text-white">
          Loading Products...
        </div>
      }>
        <ProductSection />
      </Suspense>

      <AboutSection />
      <Features />
      <ContactPage />
      <Footer />
    </main>
  );
}
