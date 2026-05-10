import dynamic from 'next/dynamic'; // Dynamic import ko use karein
import Navbar from "@/src/app/components/Navbar";
import Hero from "@/src/app/components/Hero";
import ProductSection from "@/src/app/components/Products";
import AboutSection from "@/src/app/components/About";
import Footer from "@/src/app/components/Footer";
import Features from "@/src/app/components/Features";
import ContactPage from "@/src/app/components/Contact";

const ReviewsPage = dynamic(() => import("./components/Review"), { 
  ssr: false,
  loading: () => <div className="h-20 bg-gray-50 flex items-center justify-center italic text-gray-400">Loading Reviews...</div>
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero /> 
      <ProductSection />
      <AboutSection />
      <Features />
      
      <ReviewsPage />
      
      <ContactPage />
      <Footer />
    </main>
  );
}
