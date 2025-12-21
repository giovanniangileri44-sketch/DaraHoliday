import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Check, Wifi, User, Maximize, Star, Share2, Heart,
    Utensils, Refrigerator, Coffee, Flame, Microwave, Wine,
    Snowflake, ThermometerSun, Tv,
    Droplet, Wind, WashingMachine, Shirt,
    ShieldAlert, FlameKindling, BriefcaseMedical,
    Key, Car, Briefcase, Home,
    ChevronLeft, ChevronRight, X // Added imports
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { rooms } from '../data/rooms';

const { useParams, Link } = ReactRouterDOM as any;

const RoomDetail: React.FC = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const room = rooms.find((r) => r.id === id);
    const [currentImage, setCurrentImage] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false); // Gallery State

    // Combine main image and gallery for the slider
    const sliderImages = room ? [room.mainImage, ...room.gallery] : [];

    // Auto-scroll hero slider (only when gallery is CLOSED)
    useEffect(() => {
        if (!sliderImages.length || isGalleryOpen) return;
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % sliderImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [sliderImages.length, isGalleryOpen]);

    // Keyboard Navigation for Gallery
    useEffect(() => {
        if (!isGalleryOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsGalleryOpen(false);
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGalleryOpen, sliderImages.length]);

    const showNextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    };

    const showPrevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImage((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    if (!room) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-white">
                <h2>Camera non trovata</h2>
                <Link to="/" className="ml-4 text-accent underline">Torna alla Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-textPrimary">
            <Navbar />

            {/* GALLERY MODAL */}
            <AnimatePresence>
                {isGalleryOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                        onClick={() => setIsGalleryOpen(false)} // Click outside to close
                    >
                        {/* Close Button - Top Center */}
                        <button
                            onClick={() => setIsGalleryOpen(false)}
                            className="absolute top-6 left-1/2 -translate-x-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 ring-1 ring-white/20"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Prev Button */}
                        <button
                            onClick={showPrevImage}
                            className="absolute left-4 md:left-8 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors border border-white/10"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={showNextImage}
                            className="absolute right-4 md:right-8 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors border border-white/10"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        {/* Image Container */}
                        <div className="relative w-full h-full max-w-7xl max-h-[85vh] p-4 flex items-center justify-center pointer-events-none">
                            <AnimatePresence mode="popLayout">
                                <motion.img
                                    key={currentImage}
                                    src={sliderImages[currentImage]}
                                    alt={`Gallery image ${currentImage + 1}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()} // Prevent close on image click
                                />
                            </AnimatePresence>
                        </div>

                        {/* Thumbnails Indicator */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4 flex-wrap">
                            {sliderImages.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImage ? 'bg-accent w-4' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* SLIDER SECTION (Hero) */}
            <section className="relative h-[70vh] w-full overflow-hidden cursor-pointer group" onClick={() => setIsGalleryOpen(true)}>
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
                            src={sliderImages[currentImage]}
                            alt={`${room.name} view ${currentImage + 1}`}
                            className="w-full h-full object-cover transition-transform duration-[10s] ease-linear scale-100 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                    </motion.div>
                </AnimatePresence>

                {/* Gradient Overlays */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

                {/* View Gallery Hint */}
                <div className="absolute bottom-8 right-8 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 flex items-center gap-2">
                        <Maximize className="w-4 h-4" /> Clicca per espandere
                    </span>
                </div>

                {/* Back Button (Floating) */}
                <div className="absolute top-24 left-6 z-20" onClick={(e) => e.stopPropagation()}>
                    <Link to="/camere" className="inline-flex items-center text-white/80 hover:text-accent transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Torna alle camere
                    </Link>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 py-8 -mt-20 relative z-20">

                {/* Header Info */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 drop-shadow-lg">{room.name}</h1>
                            <div className="flex items-center gap-4 text-textMuted">
                                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {room.capacity} Ospiti</span>
                                <span className="flex items-center gap-1"><Maximize className="w-4 h-4" /> {room.size}m²</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: `DaraHoliday - ${room.name}`,
                                        text: `Scopri questo alloggio a Marsala: ${room.name}`,
                                        url: window.location.href,
                                    }).catch(console.error);
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    // Optional: You could show a toast here if you have a toast system, for now keeping it simple as requested
                                    alert('Link copiato negli appunti!');
                                }
                            }}
                            className="p-3 rounded-full bg-surface border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <Share2 className="w-5 h-5 text-white" />
                        </button>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN: Details */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Description */}
                        <section>
                            <h3 className="text-2xl font-bold mb-4 text-white">Descrizione</h3>
                            <p className="text-textMuted leading-relaxed text-lg">
                                {room.description}
                            </p>
                        </section>

                        {/* Amenities */}
                        {/* Amenities */}
                        <section>
                            <h3 className="text-2xl font-bold mb-6 text-white">Servizi Inclusi</h3>

                            <div className="space-y-8">
                                {/* Cucina & Cibo */}
                                <div>
                                    <h4 className="text-lg font-semibold text-white/90 mb-4 px-1">Cucina & Cibo</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Utensils className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Cucina (Spazio preparazione)</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Refrigerator className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Frigorifero & Freezer</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Coffee className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Macchina del caffè & Bollitore</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Flame className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Fornelli (Induzione) & Forno</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Microwave className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Forno a microonde</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Wine className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Calici, Piatti e posate</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Comfort & Clima */}
                                <div>
                                    <h4 className="text-lg font-semibold text-white/90 mb-4 px-1">Comfort & Clima</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Snowflake className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Aria condizionata</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <ThermometerSun className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Riscaldamento</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Wifi className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Wi-Fi & Pocket Wi-Fi</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Tv className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">TV</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bagno & Lavanderia */}
                                <div>
                                    <h4 className="text-lg font-semibold text-white/90 mb-4 px-1">Bagno & Lavanderia</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Droplet className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Bidet, Sapone, Shampoo</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Wind className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Asciugacapelli</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <WashingMachine className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Lavatrice</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Shirt className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Grucce & Spazio abiti</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Sicurezza */}
                                <div>
                                    <h4 className="text-lg font-semibold text-white/90 mb-4 px-1">Sicurezza</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <ShieldAlert className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Rilevatore CO</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <FlameKindling className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Allarme & Estintore</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <BriefcaseMedical className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Kit pronto soccorso</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Accessori */}
                                <div>
                                    <h4 className="text-lg font-semibold text-white/90 mb-4 px-1">Accessori</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Key className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Ingresso privato</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Car className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Parcheggio gratuito</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Briefcase className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Spazio lavoro</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-white/5">
                                            <Home className="w-5 h-5 text-accent" />
                                            <span className="font-medium text-sm">Casa singolo piano</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* Additional Info Cards */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 rounded-3xl bg-surface/50 border border-white/5">
                                <div className="flex items-center gap-3 mb-2 text-accent">
                                    <Star className="w-5 h-5 fill-accent" />
                                    <span className="font-bold">Superhost</span>
                                </div>
                                <p className="text-sm text-textMuted">
                                    DaraHoliday è un Superhost impegnato a fornire un soggiorno eccezionale.
                                </p>
                            </div>
                            <div className="p-6 rounded-3xl bg-surface/50 border border-white/5">
                                <div className="flex items-center gap-3 mb-2 text-accent">
                                    <Maximize className="w-5 h-5" />
                                    <span className="font-bold">Spazioso</span>
                                </div>
                                <p className="text-sm text-textMuted">
                                    Questo alloggio offre {room.size}m² di spazio per il tuo comfort.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* RIGHT COLUMN: Sticky Sidebar */}
                    <div className="relative">
                        <div className="sticky top-28 bg-surface rounded-3xl p-6 border border-white/10 shadow-2xl">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <span className="text-xl font-bold text-white uppercase">{t('common.price_variable')}</span>
                                </div>
                                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-full border border-green-500/20">
                                    {t('common.available')}
                                </span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between py-3 border-b border-white/10 text-sm">
                                    <span className="text-textMuted">{t('common.guests')}</span>
                                    <span className="text-white font-medium">{room.capacity} Persone</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-white/10 text-sm">
                                    <span className="text-textMuted">Pulizia</span>
                                    <span className="text-white font-medium">Inclusa</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-white/10 text-sm">
                                    <span className="text-textMuted">Cancellazione</span>
                                    <span className="text-white font-medium">Gratuita entro 48h</span>
                                </div>
                            </div>

                            <a
                                href="https://direct-book.com/properties/daraholidayapartments"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                            >
                                <button className="w-full bg-accent hover:bg-[#bfa030] text-surface font-bold text-lg py-4 rounded-full transition-all hover:scale-[1.02] shadow-lg active:scale-95">
                                    {t('common.discover_price')}
                                </button>
                            </a>

                            <p className="text-center text-xs text-textMuted mt-4">
                                Miglior prezzo garantito prenotando direttamente.
                            </p>
                        </div>
                    </div>

                </div>

            </main >
        </div >
    );
};

export default RoomDetail;