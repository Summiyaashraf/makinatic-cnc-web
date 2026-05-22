"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sparePartsData = [
  // === FIBER LASER PARTS ===
  { id: 1, nameEn: "Fiber Laser Head 6KW", nameAr: "رأس فايبر ليزر 6 كيلو واط", category: "Fiber Laser", images: ["/fiber-head-1.png", "/fiber-head-2.png"] },
  { id: 2, nameEn: "Fiber Laser Remote", nameAr: "جهاز تحكم لاسلكي للفايبر ليزر", category: "Fiber Laser", images: ["/fiber-remote.png", "/fiber-remote.png"] },
  { id: 3, nameEn: "Fiber Laser Lenses", nameAr: "عدسات فايبر ليزر", category: "Fiber Laser", images: ["/fiber-lenses-1.png", "/fiber-lenses-2.png"] },
  { id: 4, nameEn: "Fiber Laser Ceramic Ring", nameAr: "حلقة سيراميك فايبر ليزر", category: "Fiber Laser", images: ["/ceramic-ring-1.png", "/ceramic-ring-2.png"] },
  { id: 5, nameEn: "Fiber Laser Lens Connector", nameAr: "موصل عدسة فايبر ليزر", category: "Fiber Laser", images: ["/lens-connector-1.png", "/lens-connector-2.png"] },
  { id: 6, nameEn: "Fiber Laser Nozzles", nameAr: "فوهات (نوزل) فايبر ليزر", category: "Fiber Laser", images: ["/nozzles-1.png", "/nozzles-2.png"] },
  { id: 7, nameEn: "CNC Fiber Laser Chillers", nameAr: "مبردات فايبر ليزر CNC", category: "Fiber Laser", images: ["/chiller.png", "/chiller.png"] },
  { id: 8, nameEn: "CNC Fiber Control Card", nameAr: "كرت تحكم فايبر ليزر CNC", category: "Fiber Laser", images: ["/control-card.png", "/control-card.png"] },
  { id: 9, nameEn: "Servo Motors", nameAr: "محركات سيرفو", category: "Fiber Laser", images: ["/servo-motor.png", "/servo-motor.png"] },

  // === CNC ROUTER PARTS ===
  { id: 10, nameEn: "CNC Router Controller DSP A11", nameAr: "جهاز تحكم سي إن سي راوتر DSP A11", category: "CNC Router", images: ["/dsp-a11-1.png", "/dsp-a11-2.png"] },
  { id: 11, nameEn: "Yako Drive", nameAr: "متحرك ياكو (Yako Drive)", category: "CNC Router", images: ["/yako-drive.png", "/yako-drive.png"] },
  { id: 12, nameEn: "Yaskawa Servo Drive", nameAr: "متحرك سيرفو ياسكاوا", category: "CNC Router", images: ["/yaskawa-drive.png", "/yaskawa-drive.png"] },
  { id: 13, nameEn: "CNC HGH Bearings / Rails", nameAr: "سكة ومحامل CNC HGH", category: "CNC Router", images: ["/bearings-1.png", "/bearings-2.png"] },
  { id: 14, nameEn: "CNC Router Air Cool Spindle", nameAr: "مغزل تبريد هواء لسي إن سي راوتر", category: "CNC Router", images: ["/air-spindle-1.png", "/air-spindle-2.png"] },
  { id: 15, nameEn: "CNC Router Water Cool Spindle", nameAr: "مغزل تبريد ماء لسي إن سي راوتر", category: "CNC Router", images: ["/water-spindle.png", "/water-spindle.png"] },
  { id: 16, nameEn: "CNC Router Best Inverter", nameAr: "إنفيرتر سي إن سي راوتر", category: "CNC Router", images: ["/inverter.png", "/inverter.png"] },
  { id: 17, nameEn: "CNC Router Sensors", nameAr: "حساسات سي إن سي راوتر", category: "CNC Router", images: ["/sensors-1.png", "/sensors-2.png"] },
  { id: 18, nameEn: "CNC Router Collets", nameAr: "كوليتات سي إن سي راوتر", category: "CNC Router", images: ["/collets.png", "/collets.png"] },
  { id: 19, nameEn: "CNC Router Tools / Bits", nameAr: "ريش وأدوات سي إن سي راوتر", category: "CNC Router", images: ["/bits.png", "/bits.png"] },
  { id: 20, nameEn: "CNC ROUTER Dust Collector", nameAr: "جامع غبار لسي إن سي راوتر", category: "CNC Router", images: ["/dust-collector.png", "/dust-collector.png"] },
  { id: 21, nameEn: "CNC Router Oil Box / Pump", nameAr: "مضخة زيت لسي إن سي راوتر", category: "CNC Router", images: ["/oil-pump.png", "/oil-pump.png"] },

  // === CNC CO2 LASER PARTS ===
  { id: 22, nameEn: "CNC Co2 Laser Head", nameAr: "رأس ليزر CO2 CNC", category: "CO2 Laser", images: ["/co2-head.png", "/co2-head.png"] },
  { id: 23, nameEn: "CNC Co2 Lens", nameAr: "عدسة ليزر CO2 CNC", category: "CO2 Laser", images: ["/co2-lens.png", "/co2-lens.png"] },
  { id: 24, nameEn: "CNC Co2 Mirror", nameAr: "مرايا ليزر CO2 CNC", category: "CO2 Laser", images: ["/co2-mirror.png", "/co2-mirror.png"] },
  { id: 22, nameEn: "CNC CO2 Laser Tube", nameAr: "أنبوب ليزر CO2 CNC", category: "CO2 Laser", images: ["/laser-tube-1.png", "/laser-tube-2.png"] },
  { id: 23, nameEn: "CNC Co2 Power Supply", nameAr: " مزود طاقة ليزر CO2 CNC", category: "CO2 Laser", images: ["/power-supply-1.png", "/power-supply-2.png"] },
  { id: 24, nameEn: "CNC CO2 RD Controller", nameAr: "جهاز تحكم ليزر CO2 CNC", category: "CO2 Laser", images: ["/controller.png", "/controller.png"] },
  { id: 24, nameEn: "CNC CO2 Chiller", nameAr: "مبرد ليزر CO2 CNC", category: "CO2 Laser", images: ["/chiller-co2.png", "/chiller-co2.png"] }
];

// Inner component for individual part card image slider logic
const PartCardImageSlider = ({ images, altName }: { images: string[]; altName: string }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="h-56 bg-gray-100 flex items-center justify-center border-b border-gray-100 relative group overflow-hidden">
      {/* Product Image */}
      <div className="w-full h-full relative bg-[#f4f4f5]"> 
        <Image
          src={images[currentImgIndex]}
          alt={altName}
          fill
          sizes="(max-w-7xl) 33vw"
          className="object-contain p-4 mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
      </div>

      {/* Slider Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <span 
                key={idx} 
                className={`h-1.5 w-1.5 rounded-full transition-all ${idx === currentImgIndex ? 'bg-[#0056b3] w-3' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

function SparePartsContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  
  const categoryParam = searchParams.get('category') || 'All';
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  const categories = [
    { id: 'All', label: language === 'ar' ? 'الكل' : 'All Parts' },
    { id: 'CNC Router', label: language === 'ar' ? 'سي إن سي راوتر' : 'CNC Router' },
    { id: 'Fiber Laser', label: language === 'ar' ? 'فايبر ليزر' : 'Fiber Laser' },
    { id: 'CO2 Laser', label: language === 'ar' ? 'سي أو تو ليزر' : 'CO2 Laser' }
  ];

  const filteredParts = activeTab === 'All' 
    ? sparePartsData 
    : sparePartsData.filter(part => part.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 font-sans" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold text-center text-[#002B5B] mb-4">
          {language === 'ar' ? 'قطع غيار ماكيناتي' : 'Makinati Spare Parts'}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto text-sm md:text-base">
          {language === 'ar' 
            ? 'نقدم أفضل قطع الغيار الأصلية وعالية الجودة لجميع ماكينات الـ CNC لضمان استمرارية إنتاجك.' 
            : 'We provide top-quality original spare parts for all CNC machines to ensure your production never stops.'}
        </p>

        {/* Tabs / Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm ${
                activeTab === cat.id 
                ? 'bg-[#0056b3] text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredParts.map((part) => (
            <div key={part.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              
              {/* Image Slider Component */}
              <PartCardImageSlider 
                images={part.images} 
                altName={language === 'ar' ? part.nameAr : part.nameEn} 
              />
              
              {/* Content Box */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-bold text-[#0056b3] bg-blue-50 rounded-md mb-3">
                    {part.category === 'CNC Router' && (language === 'ar' ? 'سي إن سي راوتر' : 'CNC Router')}
                    {part.category === 'Fiber Laser' && (language === 'ar' ? 'فايبر ليزر' : 'Fiber Laser')}
                    {part.category === 'CO2 Laser' && (language === 'ar' ? 'سي أو تو ليزر' : 'CO2 Laser')}
                  </span>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                    {language === 'ar' ? part.nameAr : part.nameEn}
                  </h3>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-[#002B5B] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-[#0056b3] transition-colors shadow-sm">
                    {language === 'ar' ? 'طلب تسعيرة' : 'Request Quote'}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function SparePartsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0056b3]"></div>
      </div>
    }>
      <SparePartsContent />
    </Suspense>
  );
}
