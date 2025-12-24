import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import RoomCard from '../components/RoomCard';
import { rooms } from '../data/rooms';

const Rooms: React.FC = () => {
  const { t } = useTranslation();
  const [filterCapacity, setFilterCapacity] = useState<'all' | number>('all');

  const filtered = rooms.filter(r => filterCapacity === 'all' || r.capacity === filterCapacity);

  return (
    <div className="min-h-screen bg-white">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/rooms-bg.jpg"
          alt="Marsala Windmills Sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      <Navbar variant="light" />

      <div className="relative z-10 pt-24 px-6 pb-20 max-w-7xl mx-auto">

        {/* Header Pagina */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-black mb-2">{t('rooms_page.title')}</h1>
            <p className="text-black/80 font-medium">{t('rooms_page.subtitle')}</p>
          </div>

          {/* Filtri a pillola */}
          <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 flex gap-1">
            {(['all', 2, 3, 4] as const).map(cap => (
              <button
                key={cap}
                onClick={() => setFilterCapacity(cap)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filterCapacity === cap
                  ? 'bg-[#D4AF37] text-white shadow-md'
                  : 'text-black hover:bg-gray-50'
                  }`}
              >
                {cap === 'all' ? t('rooms_page.filter_all') : t('rooms_page.filter_guests', { count: cap })}
              </button>
            ))}
          </div>
        </div>

        {/* Griglia Camere */}
        {filtered.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8"

          >
            {filtered.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            <p className="text-lg">{t('rooms_page.no_results')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
