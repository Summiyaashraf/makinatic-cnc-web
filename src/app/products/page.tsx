"use client";
import React, { Suspense } from "react"; 
import Navbar from "@/src/app/components/Navbar";
import Footer from "@/src/app/components/Footer";
import ProductSection from "@/src/app/components/Products";

export default function AllProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-10">
        <Suspense fallback={
          <div className="py-20 text-center text-[#061a80] font-bold text-xl">
            MakinAtic Machines Loading...
          </div>
        }>
          <ProductSection isFullPage={true} />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
