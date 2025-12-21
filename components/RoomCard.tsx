import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, Users, ArrowRight } from 'lucide-react';
import { Room } from '../types';

const { Link } = ReactRouterDOM as any;
const MotionDiv = motion.div as any;

interface RoomCardProps {
  room: Room;
}

import { useTranslation } from 'react-i18next';

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { t } = useTranslation();
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col gap-4"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-surface/50">
        <Link to={`/room/${room.id}`}>
          <img
            src={room.mainImage}
            alt={room.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Price Tag Overlay */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <span className="text-sm font-semibold text-white">{t('common.price_variable')}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-xl font-bold text-black tracking-tight">{room.name}</h3>
          <span className="text-sm uppercase tracking-wider font-semibold text-gray-700">{room.type}</span>
        </div>

        <p className="text-sm text-gray-800 line-clamp-2">
          {room.capacity} Persone &bull; {room.size}m²
        </p>

        <div className="flex gap-4 mt-2 border-t border-white/5 pt-4">
          {/* Book Button */}
          <a
            href="https://direct-book.com/properties/daraholidayapartments"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-[#bfa030] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            {t('translation:navbar.book')}
          </a>

          <Link to={`/room/${room.id}`} className="ml-auto text-sm font-medium text-accent hover:underline flex items-center gap-1">
            Dettagli <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </MotionDiv>
  );
};

export default RoomCard;