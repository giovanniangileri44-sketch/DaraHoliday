import React from 'react';
import { Search, Calendar, Users, ArrowRight } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-surface/90 backdrop-blur-md border border-white/5 rounded-full p-2 flex flex-col md:flex-row items-center shadow-2xl relative z-20">

        {/* Section 1: Dates */}
        <div className="flex-1 w-full md:w-auto px-6 py-3 md:py-2 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 rounded-3xl transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest text-textMuted font-bold">Check-in / Check-out</span>
              <span className="text-sm font-medium text-textPrimary">Aggiungi date</span>
            </div>
          </div>
        </div>

        {/* Section 2: Guests */}
        <div className="flex-1 w-full md:w-auto px-6 py-3 md:py-2 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 rounded-3xl transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest text-textMuted font-bold">Ospiti</span>
              <span className="text-sm font-medium text-textPrimary">Aggiungi ospiti</span>
            </div>
          </div>
        </div>

        {/* Section 3: Button */}
        <div className="p-1 w-full md:w-auto">
          <a href="https://direct-book.com/properties/daraholidayapartments" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-accent hover:bg-[#bfa030] text-surface font-bold rounded-full px-8 py-4 md:py-3 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <span>Prenota Ora</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default SearchBar;