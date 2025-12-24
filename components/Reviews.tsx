import React from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const reviews = [
    {
        id: 1,
        author: "Giovanni Angileri",
        rating: 5,
        text: "Un gioiello nel cuore di Marsala! L'appartamento è curato nei minimi dettagli, pulitissimo e con un arredamento moderno che ti fa sentire subito a casa. La posizione è perfetta per visitare il centro e le saline al tramonto. Torneremo sicuramente!",
        date: "5 giorni fa"
    },
    {
        id: 2,
        author: "Alessandro Corrao",
        rating: 5,
        text: "Ottima vacanza, alloggio molto comodo e confortevole",
        date: "4 settimane fa"
    },
    {
        id: 3,
        author: "Joseph Culicchia",
        rating: 5,
        text: "Ho soggiornato in questo appartamento per le vacanze e ho avuto un'esperienza davvero eccellente. Il posto è pulito, moderno e dotato di tutto il necessario per un soggiorno confortevole. La cucina è ben fornita, il letto è molto comodo.",
        date: "4 settimane fa"
    },
    {
        id: 4,
        author: "Alessandro Putzolu",
        rating: 5,
        text: "Valutazione 5 stelle.",
        date: "4 settimane fa"
    },
    {
        id: 5,
        author: "Pippo Licata",
        rating: 5,
        text: "Valutazione 5 stelle.",
        date: "3 mesi fa"
    },
    {
        id: 6,
        author: "Giuseppe",
        rating: 5,
        text: "Valutazione 5 stelle.",
        date: "3 mesi fa"
    }
];

const Reviews: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-background overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white mb-4"
                >
                    {t('reviews.title')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-textMuted text-lg"
                >
                    {t('reviews.subtitle')}
                </motion.p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full flex">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-6 px-6"
                    animate={{ x: [0, -100 * reviews.length] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Duplicating the list to ensure seamless loop */}
                    {[...reviews, ...reviews, ...reviews].map((review, index) => (
                        <motion.div
                            key={`${review.id}-${index}`}
                            className="flex-shrink-0 w-[300px] md:w-[400px] p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-accent/50 transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{review.author}</h4>
                                    <span className="text-xs text-textMuted">{review.date}</span>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-gray-600'}`}
                                    />
                                ))}
                            </div>

                            <p className="text-textMuted text-sm italic">"{review.text}"</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>



        </section>
    );
};

export default Reviews;
