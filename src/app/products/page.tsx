import Navbar from "@/src/app/components/Navbar";
import Footer from "@/src/app/components/Footer";
import ProductSection from "@/src/app/components/Products";
import { Suspense } from "react";

export default function AllProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-10"> 
        <Suspense fallback={
          <div className="min-h-[50vh] flex items-center justify-center bg-[#061a80]">
            <div className="text-white font-bold animate-pulse uppercase tracking-widest">
              Loading Machines...
            </div>
          </div>
        }>
          <ProductSection isFullPage={true} />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
