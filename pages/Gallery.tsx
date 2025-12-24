import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Navbar from '../components/Navbar';

type MediaType = 'image' | 'video';
type Category = 'marsala' | 'renders'; // Apartments removed

interface GalleryItem {
    id: number;
    type: MediaType;
    src: string;
    category: Category;
    alt?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
    // --- MARSALA (Videos) ---
    { id: 101, type: 'video', src: '/videos/marsala/hero.mp4', category: 'marsala', alt: 'Saline di Marsala' },
    { id: 102, type: 'video', src: '/videos/marsala/kitesurf.mp4', category: 'marsala', alt: 'Kitesurf allo Stagnone' },

    // --- MARSALA (Images) ---
    { id: 103, type: 'image', src: '/images/welcome-1.jpg', category: 'marsala', alt: 'Tramonto Saline dello Stagnone' },
    { id: 104, type: 'image', src: '/images/welcome-2.jpg', category: 'marsala', alt: 'Favignana Cala Rossa' },
    { id: 105, type: 'image', src: '/images/welcome-3.jpg', category: 'marsala', alt: 'Tramonto Saline dello Stagnone' },
    { id: 106, type: 'image', src: '/images/welcome-4.jpg', category: 'marsala', alt: 'Kitesurf allo Stagnone' },
    { id: 107, type: 'image', src: '/images/welcome-5.jpg', category: 'marsala', alt: 'Tramonto Saline' },
    { id: 108, type: 'image', src: '/images/welcome-6.jpg', category: 'marsala', alt: 'Isola Lunga' },
    { id: 109, type: 'image', src: '/images/welcome-7.jpg', category: 'marsala', alt: 'Amerigo Vespucci da Favignana' },
    { id: 110, type: 'image', src: '/images/welcome-8.jpg', category: 'marsala', alt: 'Favignana' },
    { id: 111, type: 'image', src: '/images/welcome-9.jpg', category: 'marsala', alt: 'Saline dello Stagnone' },
    { id: 112, type: 'image', src: '/images/home-main.jpg', category: 'marsala', alt: 'Saline dello Stagnone' },

    // --- RENDER ---
    { id: 201, type: 'video', src: '/videos/render/CLIP 13.mp4', category: 'renders', alt: 'Clip Render 13' },
    { id: 202, type: 'video', src: '/videos/render/CLIP 14.mp4', category: 'renders', alt: 'Clip Render 14' },
    { id: 203, type: 'video', src: '/videos/render/esterno-1.mp4', category: 'renders', alt: 'Esterno Diurno' },
    { id: 204, type: 'video', src: '/videos/render/esterno-2.mp4', category: 'renders', alt: 'Esterno Dettagli' },
    { id: 205, type: 'video', src: '/videos/render/esterno-3.mp4', category: 'renders', alt: 'Esterno Panoramica' },
    { id: 206, type: 'video', src: '/videos/render/esterno-4.mp4', category: 'renders', alt: 'Esterno Sera' },
    { id: 208, type: 'video', src: '/videos/render/terrazzo-2.mp4', category: 'renders', alt: 'Vista Terrazzo' },
    { id: 209, type: 'video', src: '/videos/render/volo-uccello.mp4', category: 'renders', alt: 'Vista Aerea' },
];

const Gallery: React.FC = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<Category>('marsala');
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

    const filteredItems = filter === 'all'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === filter);

    const openLightbox = (item: GalleryItem) => {
        // Find index in the CURRENT filtered list to allow navigation
        const index = filteredItems.findIndex(i => i.id === item.id);
        setSelectedItemIndex(index);
    };

    const closeLightbox = () => setSelectedItemIndex(null);

    const nextItem = useCallback(() => {
        if (selectedItemIndex === null) return;
        setSelectedItemIndex((prev) =>
            prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1
        );
    }, [selectedItemIndex, filteredItems.length]);

    const prevItem = useCallback(() => {
        if (selectedItemIndex === null) return;
        setSelectedItemIndex((prev) =>
            prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1
        );
    }, [selectedItemIndex, filteredItems.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedItemIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextItem();
            if (e.key === 'ArrowLeft') prevItem();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItemIndex, nextItem, prevItem]);

    const currentItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

    return (
        <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
            <Navbar variant="light" />

            <main className="pt-28 pb-10 min-h-screen flex flex-col">
                {/* Header */}
                <div className="px-4 md:px-8 text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 mb-2"
                    >
                        {t('gallery.title')}
                    </motion.h1>
                    <p className="text-slate-600 max-w-xl mx-auto">{t('gallery.subtitle')}</p>
                </div>

                {/* Filters */}
                <div className="flex justify-center gap-4 mb-16">
                    {['marsala', 'renders'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat as Category)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${filter === cat
                                ? 'bg-accent text-white shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Horizontal Scroll Gallery */}
                <div className="flex-1 overflow-x-auto overflow-y-hidden flex items-center gap-8 px-8 py-12 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                onClick={() => openLightbox(item)}
                                className="relative flex-shrink-0 snap-center cursor-pointer group rounded-[32px] overflow-hidden border border-slate-200 bg-white shadow-lg
                                           w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-video
                                           hover:border-accent/50 transition-all duration-500"
                            >
                                {item.type === 'video' ? (
                                    <video
                                        preload="metadata"
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                    >
                                        <source src={`${item.src}#t=0.1`} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                    <span className="text-white text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {item.alt}
                                    </span>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-4 rounded-full">
                                        <Play className="w-8 h-8 text-white fill-current" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {currentItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex items-center justify-center text-slate-900"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 lg:top-10 lg:right-10 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 hover:text-slate-900 transition-colors z-50"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Nav Buttons */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevItem(); }}
                            className="absolute left-4 lg:left-10 p-3 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-900 transition-all hover:scale-110 z-50 shadow-sm"
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); nextItem(); }}
                            className="absolute right-4 lg:right-10 p-3 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-900 transition-all hover:scale-110 z-50 shadow-sm"
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Content */}
                        <motion.div
                            key={currentItem.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full h-full max-w-7xl max-h-[85vh] p-4 flex items-center justify-center relative"
                        >
                            {currentItem.type === 'video' ? (
                                <video
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-full rounded-lg shadow-2xl"
                                >
                                    <source src={currentItem.src} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={currentItem.src}
                                    alt={currentItem.alt}
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                />
                            )}

                            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                                <h3 className="text-xl text-white font-medium drop-shadow-md">
                                    {currentItem.alt}
                                </h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
