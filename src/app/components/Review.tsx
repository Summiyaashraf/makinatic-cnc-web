"use client";
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Script from 'next/script';

const ReviewSection = () => {
  // Safe Context Access
  const context = useLanguage();
  const language = context ? context.language : 'ar'; 
  const isAr = language === 'ar';

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server-side rendering ko build time par skip karne ke liye
  if (!mounted) {
    return <div className="py-20 text-center italic text-gray-400">Loading Section...</div>;
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#002B5B] mb-4 uppercase italic">
              {isAr ? 'تقييمات عملائنا على Google' : 'Our Google Reviews'}
            </h2>
            <div className="w-24 h-2 bg-blue-700 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto font-medium">
              {isAr 
                ? 'ثقة عملائنا هي سر تميزنا. اطلع على آراء شركائنا الموثقة مباشرة من محرك البحث Google.' 
                : "Our customers' trust is the secret to our excellence. Check out the verified reviews from our partners directly from Google."}
            </p>
          </div>

          <div className="bg-white p-4 md:p-10 rounded-[2.5rem] shadow-2xl border-b-8 border-blue-700 min-h-[400px]">
            {/* Live Widget */}
            <div 
              className="elfsight-app-22006d02-55aa-4589-be02-32c9d80b191a" 
              data-elfsight-app-lazy
            >
                <p className="text-center text-gray-400 mt-20 italic">Loading Verified Reviews...</p>
            </div>
          </div>

          <div className={`mt-12 flex flex-col md:flex-row items-center justify-center gap-6 opacity-80 ${isAr ? 'md:flex-row-reverse' : ''}`}>
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
               alt="Google" 
               className="w-8 h-8"
               loading="lazy"
             />
             <p className="text-[#002B5B] font-bold text-sm md:text-base">
                {isAr ? 'تقييمات موثوقة ١٠٠٪ عبر Google Business' : '100% Verified Reviews via Google Business'}
             </p>
          </div>
        </div>
      </section>

      <Script 
        src="https://static.elfsight.com/platform/platform.js" 
        strategy="afterInteractive" 
      />
    </>
  );
};

export default ReviewSection;
