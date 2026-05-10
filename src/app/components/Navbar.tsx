"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const industries = [
    { id: 'Singe Industry', label: language === 'ar' ? 'صناعة الإشارات' : 'Singe Industry' },
    { id: 'Wood Factory', label: language === 'ar' ? 'مصنع الأخشاب' : 'Wood Factory' },
    { id: 'Metal Factory', label: language === 'ar' ? 'مصنع المعادن' : 'Metal Factory' },
    { id: 'Aluminum & Glass Fabrication Industry', label: language === 'ar' ? 'صناعة الألمنيوم والزجاج' : 'Aluminum & Glass Fabrication Industry' }
  ];

  if (!mounted) return <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 h-20 shadow-sm" />;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/Makinatic logo cnc.png"      
              alt="Makinati Logo" 
              width={90}
              height={90}           
              priority              
              className="object-contain w-auto h-12 md:h-16"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-[#0056b3] font-semibold transition-colors">
              {t('home')}
            </Link>

            {/* Products Dropdown */}
            <div 
              className="relative group h-20 flex items-center"
              onMouseEnter={() => setIsProductOpen(true)}
              onMouseLeave={() => setIsProductOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-600 group-hover:text-[#0056b3] font-semibold transition-colors">
                {t('products')}
                <ChevronDown size={16} className={`transition-transform duration-200 ${isProductOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProductOpen && (
                <div className="absolute top-[80%] left-0 w-80 bg-white border border-gray-100 shadow-xl rounded-xl py-2 animate-in fade-in zoom-in duration-200 z-[60]">
                  <Link 
                    href="/products" 
                    className="block px-4 py-3 text-sm font-black text-[#0056b3] border-b border-gray-0 hover:bg-blue-50 uppercase"
                  >
                    {language === 'ar' ? 'جميع الآلات' : 'All Machines'}
                  </Link>
                  {industries.map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/products?industry=${encodeURIComponent(ind.id)}`}
                      className="block px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#0056b3] transition-colors font-medium"
                    >
                      {ind.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/company-profile" className="text-gray-600 hover:text-[#0056b3] font-semibold transition-colors">
              {t('profile')}
            </Link>
            <Link href="/#contact" className="text-gray-600 hover:text-[#0056b3] font-semibold transition-colors">
              {t('contact')}
            </Link>
            
            <button onClick={toggleLanguage} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-100 text-[#0056b3]">
              <Globe size={18} />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLanguage} className="p-2 text-[#0056b3]"><Globe size={22} /></button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 overflow-y-auto max-h-screen">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link href="/" className="block px-4 py-3 text-base font-bold text-gray-700 hover:bg-blue-50 rounded-xl" onClick={() => setIsOpen(false)}>
              {t('home')}
            </Link>
            
            <div className="space-y-1">
              <button 
                onClick={() => setIsProductOpen(!isProductOpen)}
                className="w-full flex justify-between items-center px-4 py-3 text-base font-bold text-gray-700 hover:bg-blue-50 rounded-xl"
              >
                {t('products')}
                <ChevronDown size={20} className={isProductOpen ? 'rotate-180' : ''} />
              </button>
              
              {isProductOpen && (
                <div className="bg-gray-50 rounded-xl mx-2 py-2">
                  <Link href="/products" className="block px-8 py-2 text-sm font-bold text-[#0056b3]" onClick={() => setIsOpen(false)}>
                    {language === 'ar' ? 'جميع الآلات' : 'All Machines'}
                  </Link>
                  {industries.map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/products?industry=${encodeURIComponent(ind.id)}`}
                      className="block px-8 py-2 text-sm text-gray-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {ind.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/company-profile" className="block px-4 py-3 text-base font-bold text-gray-700 rounded-xl" onClick={() => setIsOpen(false)}>
              {t('profile')}
            </Link>
            <Link href="/#contact" className="block px-4 py-3 text-base font-bold text-gray-700 rounded-xl" onClick={() => setIsOpen(false)}>
              {t('contact')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
