"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: "Home",
    products: "Products",
    profile: "Company Profile",
    contact: "Contact Us",
    heroTitle: "Precision, Reliability, & Innovation",
    heroDesc: "CNC Makinati is a trusted name in CNC machining solutions. We are committed to delivering machines that perform consistently, reduce production time, and maximize customer satisfaction.",
    explore: "EXPLORE MACHINES",
    contactBtn: "CONTACT US",
  },
  ar: {

    home: "الرئيسية",
    products: "منتجاتنا",
    profile: "ملف الشركة",
    contact: "تواصل معنا",

    heroTitle: "دقة، موثوقية، وابتكار",
    heroDesc: "ماكيناتي سي إن سي اسم موثوق في حلول التصنيع الآلي. نحن ملتزمون بتقديم معدات تعمل بكفاءة عالية، وتقلل من وقت الإنتاج، وتحقق أقصى درجات رضا العملاء.",
    explore: "تصفح المعدات",
    contactBtn: "تواصل معنا",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
