"use client";
import React, { useState, useMemo } from 'react';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { machinesData } from '../data/machines';
import Link from 'next/link';

const ProductSection = ({ isFullPage = false }: { isFullPage?: boolean }) => {
  const [selectedMachine, setSelectedMachine] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('All');

  const industries = [
    { id: 'All', label: 'All Machines' },
    { id: 'Singe Industry', label: 'Singe Industry' },
    { id: 'Wood Factory', label: 'Wood Factory' },
    { id: 'Metal Factory', label: 'Metal Factory' },
    { id: 'Aluminum & Glass Fabrication Industry', label: 'Aluminum & Glass Fabrication Industry' }
  ];
  // Logic to filter machines based on active tab
  const filteredMachines = useMemo(() => {
    let result = machinesData;
    if (activeTab !== 'All') {
      result = machinesData.filter(m => m.industries?.includes(activeTab));
    }
    // Agar home page pe ho to sirf 4 machines dikhao, warna filter ke mutabiq saari
    return isFullPage ? result : result.slice(0, 4);
  }, [activeTab, isFullPage]);

  const openWhatsApp = (name: string) => {
    window.open(`https://wa.me/966542677664?text=I am interested in ${name}`, '_blank');
  };

  return (
    <section className="py-12 md:py-20 bg-[#061a80]" id="products">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-black text-center mb-6 text-[#f8fafc] leading-tight px-2 uppercase">
          {isFullPage ? "Industrial Solutions by Industry" : "Our Featured Machinery"}
        </h2>

        {/* Industry Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {industries.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border-2 
                ${activeTab === tab.id 
                  ? 'bg-white text-[#061a80] border-white shadow-xl scale-105' 
                  : 'bg-transparent text-blue-200 border-blue-400/30 hover:border-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Machine Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {filteredMachines.map((m) => (
            <div key={m.id} className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-gray-100 hover:shadow-2xl transition-all flex flex-col h-full group animate-in fade-in zoom-in duration-300">
              <div className="h-48 md:h-64 w-full flex items-center justify-center bg-gray-50 rounded-2xl mb-6 overflow-hidden">
                <img 
                  src={m.mainImage} 
                  className="max-h-96 max-w-96 object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
                  alt={m.name} 
                />
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  {m.industries?.map(ind => (
                    <span key={ind} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">{ind}</span>
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#002B5B] uppercase leading-snug">{m.name}</h3>
                <p className="text-blue-600 font-bold mb-6 text-xs md:text-sm">{m.shortDesc}</p>
              </div>

              <button 
                onClick={() => setSelectedMachine(m)} 
                className="w-full py-4 bg-[#002B5B] text-white rounded-xl font-bold uppercase tracking-wider hover:bg-blue-900 mt-auto text-sm md:text-base transition-colors"
              >
                View Technical Specs
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMachines.length === 0 && (
          <div className="text-center py-20 text-blue-200">
            <p className="text-xl font-bold italic">More machines for this category coming soon...</p>
          </div>
        )}
      </div>

      {!isFullPage && (
        <div className="mt-12 md:mt-16 text-center px-4">
          <Link href="/products">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#061a80] px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl text-sm">
              Explore All Solutions <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      )}

      {/* Modal - Unchanged but included for complete copy-paste */}
      {selectedMachine && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white rounded-t-[2rem] md:rounded-[2rem] max-w-5xl w-full max-h-[90vh] md:max-h-[95vh] overflow-y-auto relative p-6 md:p-10">
            <button 
                onClick={() => setSelectedMachine(null)} 
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition-all z-10"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8 border-b pb-6 mt-4 md:mt-0">
              <h2 className="text-2xl md:text-3xl font-black text-[#002B5B] uppercase px-4">{selectedMachine.name}</h2>
              <p className="text-blue-600 font-bold italic text-xs md:text-sm">International Brand | European Standard</p>
            </div>

            <div className="mb-10">
              <h4 className="text-lg md:text-xl font-black text-blue-800 mb-6 italic underline uppercase">Main Spare Parts:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {selectedMachine.spareParts?.map((item: any, idx: number) => (
                  <div key={idx} className="border border-blue-800/30 p-2 md:p-3 rounded-xl text-center bg-gray-50 flex flex-col items-center justify-center">
                    <img src={item.img || null} alt={item.title} className="w-full h-20 md:h-32 object-contain mb-2 rounded-lg" />
                    <p className="font-black text-[9px] md:text-[11px] uppercase text-gray-800 leading-tight">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {selectedMachine.mainParts && (
                <div>
                  <h4 className="text-base md:text-lg font-black text-blue-800 mb-4 italic underline uppercase">1. Main Parts:</h4>
                  <div className="border-2 border-gray-100 rounded-2xl overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm min-w-[400px]">
                      <thead className="bg-[#002B5B] text-white">
                        <tr><th className="p-3 w-12 text-center">Sr.</th><th className="p-3">Item</th><th className="p-3">Specification</th></tr>
                      </thead>
                      <tbody>
                        {selectedMachine.mainParts.map((part: any, i: number) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="p-3 border-t text-center font-bold text-blue-700">{part.sr}</td>
                            <td className="p-3 border-t font-black text-[#002B5B]">{part.part}</td>
                            <td className="p-3 border-t text-gray-600 text-[11px] leading-relaxed">{part.spec}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-base md:text-lg font-black text-blue-800 mb-4 italic underline uppercase">2. Parameter:</h4>
                <div className="space-y-1 md:space-y-2">
                  {selectedMachine.parameters.map((p: any, i: number) => (
                    <div key={i} className="flex justify-between items-center p-3 border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">{p.label}</span>
                      <span className="text-[10px] md:text-xs font-black text-[#002B5B] text-right ml-4">{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white pt-4 pb-2 md:static md:p-0">
                <button 
                  onClick={() => openWhatsApp(selectedMachine.name)}
                  className="w-full mt-4 md:mt-10 py-4 md:py-5 bg-[#25D366] text-white rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 hover:scale-[1.01] transition-all shadow-lg shadow-green-200"
                >
                  <MessageCircle size={24} /> WHATSAPP QUOTATION
                </button>
            </div>
          </div>
        </div>
      )}
    </section>
  ); 
};

export default ProductSection;