"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe, ChevronDown, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isSpareOpen, setIsSpareOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // FIXED: Cross-page smooth scroll handler logic
  const handleMaintenanceScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu if open

    if (pathname === '/') {
      // If already on Home page, directly scroll smoothly
      const element = document.getElementById('MaintenanceSection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page (like /spare-parts), redirect to home with hash
      router.push('/#MaintenanceSection');
    }
  };

  const industries = [
    { id: 'Singe Industry', label: language === 'ar' ? 'صناعة الإشارات' : 'Singe Industry' },
    { id: 'Wood Factory', label: language === 'ar' ? 'مصنع الأخشاب' : 'Wood Factory' },
    { id: 'Metal Factory', label: language === 'ar' ? 'مصنع المعادن' : 'Metal Factory' },
    { id: 'Aluminum & Glass Fabrication Industry', label: language === 'ar' ? 'صناعة الألمنيوم والزجاج' : 'Aluminum & Glass Fabrication Industry' }
  ];

  const spareCategories = [
    { id: 'CNC Router', label: language === 'ar' ? 'قطع غيار سي إن سي راوتر' : 'CNC Router Parts' },
    { id: 'Fiber Laser', label: language === 'ar' ? 'قطع غيار فايبر ليزر' : 'Fiber Laser Parts' },
    { id: 'CO2 Laser', label: language === 'ar' ? 'قطع غيار سي أو تو ليزر' : 'CO2 Laser Parts' }
  ];

  if (!mounted) return <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 h-20 shadow-sm" />;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/cnc-logo.png"      
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

            {/* Spare Parts & Services Dropdown */}
            <div 
              className="relative group h-20 flex items-center"
              onMouseEnter={() => setIsSpareOpen(true)}
              onMouseLeave={() => setIsSpareOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-600 group-hover:text-[#0056b3] font-semibold transition-colors">
                {language === 'ar' ? 'قطع الغيار والخدمات' : 'Parts & Services'}
                <ChevronDown size={16} className={`transition-transform duration-200 ${isSpareOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSpareOpen && (
                <div className="absolute top-[80%] left-0 w-72 bg-white border border-gray-100 shadow-xl rounded-xl py-2 animate-in fade-in zoom-in duration-200 z-[60]">
                  <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {language === 'ar' ? 'قطع الغيار' : 'Spare Parts'}
                  </p>
                  {spareCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/spare-parts?category=${encodeURIComponent(cat.id)}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#0056b3] font-medium"
                    >
                      {cat.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 my-2"></div>
                  
                  {/* FIXED: Trigger custom explicit scroll click handler */}
                  <button 
                    onClick={handleMaintenanceScroll}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#0056b3] hover:bg-blue-50 text-left"
                    style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
                  >
                    <Settings size={16} />
                    {language === 'ar' ? 'خدمات الصيانة والدعم' : 'Maintenance & Support'}
                  </button>
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
            
            {/* Products Mobile */}
            <button 
              onClick={() => setIsProductOpen(!isProductOpen)}
              className="w-full flex justify-between items-center px-4 py-3 text-base font-bold text-gray-700 hover:bg-blue-50 rounded-xl"
            >
              {t('products')}
              <ChevronDown size={20} className={isProductOpen ? 'rotate-180' : ''} />
            </button>
            {isProductOpen && (
              <div className="bg-gray-50 rounded-xl mx-2 py-2">
                {industries.map((ind) => (
                  <Link key={ind.id} href={`/products?industry=${encodeURIComponent(ind.id)}`} className="block px-8 py-2 text-sm text-gray-600" onClick={() => setIsOpen(false)}>
                    {ind.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Spare Parts & Maintenance Mobile */}
            <button 
              onClick={() => setIsSpareOpen(!isSpareOpen)}
              className="w-full flex justify-between items-center px-4 py-3 text-base font-bold text-gray-700 hover:bg-blue-50 rounded-xl"
            >
              {language === 'ar' ? 'قطع الغيار والخدمات' : 'Parts & Services'}
              <ChevronDown size={20} className={isSpareOpen ? 'rotate-180' : ''} />
            </button>
            {isSpareOpen && (
              <div className="bg-gray-50 rounded-xl mx-2 py-2">
                {spareCategories.map((cat) => (
                  <Link key={cat.id} href={`/spare-parts?category=${encodeURIComponent(cat.id)}`} className="block px-8 py-2 text-sm text-gray-600" onClick={() => setIsOpen(false)}>
                    {cat.label}
                  </Link>
                ))}
                {/* FIXED: Mobile scroll button click binding */}
                <button 
                  onClick={handleMaintenanceScroll} 
                  className="w-full block text-right px-8 py-2 text-sm font-bold text-[#0056b3] border-t border-gray-200 mt-2 pt-2 bg-transparent"
                >
                  {language === 'ar' ? 'خدمات الصيانة والدعم' : 'Maintenance & Support'}
                </button>
              </div>
            )}

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
