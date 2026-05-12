"use client";
import React, { useEffect, useState } from 'react';
import { Wrench, Settings, ShieldCheck } from 'lucide-react';

interface MaintenanceProps {
  isAr?: boolean; 
}

const MaintenanceSection = ({ isAr = false }: MaintenanceProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const services = [
    {
      title: isAr ? 'صيانة دورية' : 'Regular Maintenance',
      desc: isAr ? 'نقدم خدمات صيانة شاملة لضمان استمرار عمل الماكينات بأعلى كفاءة.' : 'We provide comprehensive maintenance to ensure your machines run at peak efficiency.',
      icon: <Wrench className="w-8 h-8 text-blue-600" />
    },
    {
      title: isAr ? 'قطع غيار أصلية' : 'Original Spare Parts',
      desc: isAr ? 'توفير جميع قطع الغيار والمكونات الأصلية لضمان استمرارية الإنتاج.' : 'Providing all original spare parts and components to ensure production continuity.',
      icon: <Settings className="w-8 h-8 text-blue-600" />
    },
    {
      title: isAr ? 'دعم فني متخصص' : 'Expert Technical Support',
      desc: isAr ? 'فريقنا يعمل بدقة عالية لحل جميع المشكلات التقنية بعناية فائقة.' : 'Our team works with high precision to solve all technical issues carefully.',
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />
    }
  ];

  return (
    <section className="py-20 bg-blue-50" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#002B5B] mb-4">
            {isAr ? 'خدمات الصيانة والدعم' : 'Maintenance & Support Services'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">
            {isAr 
              ? 'نحن نلتزم بتقديم الماكينات التي تعمل باستمرار وتقلل من وقت الإنتاج.' 
              : 'We are committed to delivering machines that perform consistently and reduce production time.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <div key={index} className={`p-8 rounded-2xl bg-white shadow-lg border-b-4 border-blue-600 transition-transform hover:-translate-y-2 ${isAr ? 'text-right' : 'text-left'}`}>
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#002B5B] mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaintenanceSection;
