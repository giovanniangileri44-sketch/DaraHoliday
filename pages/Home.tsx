import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Reviews from '../components/Reviews';
import { useTranslation } from 'react-i18next';

const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;
const MotionDiv = motion.div as any;

const welcomeImages = [
  "/images/welcome-1.jpg",
  "/images/welcome-2.jpg",
  "/images/welcome-3.jpg",
  "/images/welcome-4.jpg",
  "/images/welcome-5.jpg",
  "/images/welcome-6.jpg",
  "/images/welcome-7.jpg",
  "/images/welcome-8.jpg",
  "/images/welcome-9.jpg"
];

const Home: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % welcomeImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/home-main.jpg"
            className="w-full h-full object-cover opacity-60"
            alt="Cinque Terre Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-8 mt-[-5vh]">
          <MotionH1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white"
          >
            Dara<span className="text-accent">Holiday</span> Apartments
          </MotionH1>

          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            {t('hero.subtitle')}
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="pt-8 flex gap-4 justify-center flex-wrap"
          >
            <Link
              to="/camere"
              className="bg-accent hover:bg-[#bfa030] text-surface font-bold rounded-full px-8 py-4 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <span>{t('hero.viewRooms')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://direct-book.com/properties/daraholidayapartments"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-[#bfa030] text-surface font-bold rounded-full px-8 py-4 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <span>{t('hero.bookNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </MotionDiv>
        </div>
      </section>

      {/* WELCOME SECTION REDESIGNED */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        {/* Background Slider */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={welcomeImages[currentImage]}
              alt="Marsala Views"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlays for Blending */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

        {/* Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t('welcome.title')}
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-md mb-10">
              {t('welcome.description')}
            </p>

            <Link
              to="/camere"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/50 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <span>{t('welcome.discover')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <Reviews />

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-textMuted text-sm">
          <p>&copy; 2024 DaraHoliday. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent">Privacy</a>
            <a href="#" className="hover:text-accent">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;