"use client";
import React, { useEffect, useState } from 'react';
import Script from 'next/script';

const ReviewSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Jab tak client side load na ho, kuch render na karein (Build safety)
  if (!mounted) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#002B5B] mb-4">
            Our Google Reviews
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl border-b-4 border-blue-600 min-h-[350px]">
          {/* Elfsight Widget Div */}
          <div 
            className="elfsight-app-22006d02-55aa-4589-be02-32c9d80b191a" 
            data-elfsight-app-lazy
          ></div>
        </div>

      </div>

      {/* Next.js Optimized Script Loader */}
      <Script 
        src="https://static.elfsight.com/platform/platform.js" 
        strategy="afterInteractive"
      />
    </section>
  );
};

export default ReviewSection;
