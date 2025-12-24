
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    it: {
        translation: {
            navbar: {
                home: 'Home',
                rooms: 'Camere',
                contacts: 'Contatti',
                room_detail: 'Dettagli Camera',
                gallery: 'Galleria'
            },
            hero: {
                title: 'DaraHoliday Apartments',
                subtitle: 'Il tuo rifugio esclusivo nel cuore di Marsala.',
                viewRooms: 'Visualizza Camere',
                bookNow: 'Prenota Ora'
            },
            welcome: {
                title: 'Benvenuti a Marsala',
                description: 'Scopri la bellezza della Sicilia occidentale soggiornando nei nostri appartamenti curati nei minimi dettagli. Situati in posizioni strategiche, offriamo il punto di partenza ideale per esplorare le saline, le isole Egadi e il centro storico.',
                discover: 'Scopri di più'
            },
            common: {
                guests: 'Ospiti',
                night: 'notte',
                available: 'Disponibile',
                from: 'da',
                price_variable: 'Prezzo Variabile',
                discover_price: 'Scoprilo Ora',
                cleanliness: 'Pulizia',
                included: 'Inclusa',
                cancellation: 'Cancellazione',
                free_cancellation: 'Gratuita entro 48h',
                best_price: 'Miglior prezzo garantito prenotando direttamente.',
                superhost_desc: 'DaraHoliday è un Superhost impegnato a fornire un soggiorno eccezionale.',
                spacious_desc: 'Questo alloggio offre {{size}}m² di spazio per il tuo comfort.',
                superhost: 'Superhost',
                spacious: 'Spazioso',
                ground_floor: 'Piano Terra',
                first_floor: 'Primo Piano',
                terrace: 'Terrazza',
                balcony: 'Balcone'
            },
            room_detail: {
                description_title: 'Descrizione',
                amenities_title: 'Servizi Inclusi',
                kitchen: 'Cucina & Cibo',
                comfort: 'Comfort & Clima',
                bathroom: 'Bagno & Lavanderia',
                security: 'Sicurezza',
                accessories: 'Accessori',
                description_template: '{{type}} situato al {{floor}} con {{outdoor}}.'
            },
            amenities: {
                kitchen_space: 'Cucina (Spazio preparazione)',
                fridge: 'Frigorifero & Freezer',
                coffee_machine: 'Macchina del caffè & Bollitore',
                stove: 'Fornelli (Induzione) & Forno',
                microwave: 'Forno a microonde',
                dishes: 'Calici, Piatti e posate',
                ac: 'Aria condizionata',
                heating: 'Riscaldamento',
                wifi: 'Wi-Fi & Pocket Wi-Fi',
                tv: 'TV',
                bidet: 'Bidet, Sapone, Shampoo',
                hairdryer: 'Asciugacapelli',
                washing_machine: 'Lavatrice',
                hangers: 'Grucce & Spazio abiti',
                co_detector: 'Rilevatore CO',
                alarm: 'Allarme & Estintore',
                first_aid: 'Kit pronto soccorso',
                private_entrance: 'Ingresso privato',
                parking: 'Parcheggio gratuito',
                workspace: 'Spazio lavoro',
                single_floor: 'Casa singolo piano'
            },
            gallery: {
                title: 'Galleria',
                subtitle: 'Esplora la nostra struttura e la bellezza di Marsala',
                filters: {
                    all: 'Tutto',
                    marsala: 'Marsala',
                    apartments: 'Appartamenti',
                    renders: 'Render'
                }
            },
            reviews: {
                title: 'Cosa dicono di noi',
                subtitle: 'Le esperienze dei nostri ospiti'
            },
            rooms_page: {
                title: 'Le Nostre Camere',
                subtitle: 'Trova la soluzione perfetta per le tue esigenze.',
                filter_all: 'Tutte',
                filter_guests: '{{count}} Ospiti',
                no_results: 'Nessuna camera trovata con questo filtro.'
            }
        }
    },
    en: {
        translation: {
            navbar: {
                home: 'Home',
                rooms: 'Rooms',
                contacts: 'Contacts',
                gallery: 'Gallery',
                book: 'Book'
            },
            hero: {
                title: 'DaraHoliday Apartments',
                subtitle: 'Your exclusive retreat in the heart of Marsala.',
                viewRooms: 'View Rooms',
                bookNow: 'Book Now'
            },
            welcome: {
                title: 'Welcome to Marsala',
                description: 'Discover the beauty of Western Sicily by staying in our meticulously curated apartments. Strategically located, they offer the ideal starting point to explore the salt pans, the Egadi Islands, and the historic center.',
                discover: 'Discover More'
            },
            common: {
                guests: 'Guests',
                night: 'night',
                available: 'Available',
                from: 'from',
                price_variable: 'Price Variable',
                discover_price: 'Check Availability',
                cleanliness: 'Cleaning',
                included: 'Included',
                cancellation: 'Cancellation',
                free_cancellation: 'Free within 48h',
                best_price: 'Best price guaranteed when booking directly.',
                superhost_desc: 'DaraHoliday is a Superhost committed to providing an exceptional stay.',
                spacious_desc: 'This accommodation offers {{size}}m² of space for your comfort.',
                superhost: 'Superhost',
                spacious: 'Spacious',
                ground_floor: 'Ground Floor',
                first_floor: 'First Floor',
                terrace: 'Terrace',
                balcony: 'Balcony'
            },
            room_detail: {
                description_title: 'Description',
                amenities_title: 'Amenities',
                kitchen: 'Kitchen & Dining',
                comfort: 'Comfort & Climate',
                bathroom: 'Bathroom & Laundry',
                security: 'Security',
                accessories: 'Accessories',
                description_template: '{{type}} located on the {{floor}} with {{outdoor}}.'
            },
            amenities: {
                kitchen_space: 'Kitchen (Prep space)',
                fridge: 'Refrigerator & Freezer',
                coffee_machine: 'Coffee Machine & Kettle',
                stove: 'Stove (Induction) & Oven',
                microwave: 'Microwave',
                dishes: 'Glasses, Dishes & Cutlery',
                ac: 'Air Conditioning',
                heating: 'Heating',
                wifi: 'Wi-Fi & Pocket Wi-Fi',
                tv: 'TV',
                bidet: 'Bidet, Soap, Shampoo',
                hairdryer: 'Hairdryer',
                washing_machine: 'Washing Machine',
                hangers: 'Hangers & Clothing Storage',
                co_detector: 'CO Detector',
                alarm: 'Alarm & Fire Extinguisher',
                first_aid: 'First Aid Kit',
                private_entrance: 'Private Entrance',
                parking: 'Free Parking',
                workspace: 'Workspace',
                single_floor: 'Single Level Home'
            },
            gallery: {
                title: 'Gallery',
                subtitle: 'Explore our property and the beauty of Marsala',
                filters: {
                    all: 'All',
                    marsala: 'Marsala',
                    apartments: 'Apartments',
                    renders: 'Renders'
                }
            },
            reviews: {
                title: 'What they say about us',
                subtitle: 'Our guests\' experiences'
            },
            rooms_page: {
                title: 'Our Rooms',
                subtitle: 'Find the perfect solution for your needs.',
                filter_all: 'All',
                filter_guests: '{{count}} Guests',
                no_results: 'No rooms found with this filter.'
            }
        }
    },
    fr: {
        translation: {
            navbar: {
                home: 'Accueil',
                rooms: 'Chambres',
                contacts: 'Contacts',
                gallery: 'Galerie',
                book: 'Réserver'
            },
            hero: {
                title: 'DaraHoliday Apartments',
                subtitle: 'Votre refuge exclusif au cœur de Marsala.',
                viewRooms: 'Voir les Chambres',
                bookNow: 'Réserver Maintenant'
            },
            welcome: {
                title: 'Bienvenue à Marsala',
                description: 'Découvrez la beauté de la Sicile occidentale en séjournant dans nos appartements méticuleusement soignés. Idéalement situés, ils offrent le point de départ idéal pour explorer les marais salants, les îles Égades et le centre historique.',
                discover: 'En savoir plus'
            },
            common: {
                guests: 'Invités',
                night: 'nuit',
                available: 'Disponible',
                from: 'à partir de',
                price_variable: 'Prix Variable',
                discover_price: 'Vérifier la disponibilité',
                cleanliness: 'Nettoyage',
                included: 'Inclus',
                cancellation: 'Annulation',
                free_cancellation: 'Gratuite sous 48h',
                best_price: 'Meilleur prix garanti en réservant directement.',
                superhost_desc: 'DaraHoliday est un Superhost engagé à fournir un séjour exceptionnel.',
                spacious_desc: 'Cet hébergement offre {{size}}m² d\'espace pour votre confort.',
                superhost: 'Superhost',
                spacious: 'Spacieux',
                ground_floor: 'Rez-de-chaussée',
                first_floor: 'Premier Étage',
                terrace: 'Terrasse',
                balcony: 'Balcon'
            },
            room_detail: {
                description_title: 'Description',
                amenities_title: 'Équipements',
                kitchen: 'Cuisine & Repas',
                comfort: 'Confort & Climat',
                bathroom: 'Salle de bain & Salle de lavage',
                security: 'Sécurité',
                accessories: 'Accessoires',
                description_template: '{{type}} situé au {{floor}} avec {{outdoor}}.'
            },
            amenities: {
                kitchen_space: 'Cuisine (Espace prépa)',
                fridge: 'Réfrigérateur & Congélateur',
                coffee_machine: 'Machine à café & Bouilloire',
                stove: 'Plaques de cuisson & Four',
                microwave: 'Micro-ondes',
                dishes: 'Verres, Vaisselle & Couverts',
                ac: 'Climatisation',
                heating: 'Chauffage',
                wifi: 'Wi-Fi & Pocket Wi-Fi',
                tv: 'TV',
                bidet: 'Bidet, Savon, Shampooing',
                hairdryer: 'Sèche-cheveux',
                washing_machine: 'Lave-linge',
                hangers: 'Cintres & Rangement',
                co_detector: 'Détecteur de CO',
                alarm: 'Alarme & Extincteur',
                first_aid: 'Trousse de secours',
                private_entrance: 'Entrée privée',
                parking: 'Parking gratuit',
                workspace: 'Espace de travail',
                single_floor: 'Maison de plain-pied'
            },
            gallery: {
                title: 'Galerie',
                subtitle: 'Découvrez notre propriété et la beauté de Marsala',
                filters: {
                    all: 'Tout',
                    marsala: 'Marsala',
                    apartments: 'Appartements',
                    renders: 'Renders'
                }
            },
            reviews: {
                title: 'Ce qu\'ils disent de nous',
                subtitle: 'Les expériences de nos invités'
            },
            rooms_page: {
                title: 'Nos Chambres',
                subtitle: 'Trouvez la solution parfaite pour vos besoins.',
                filter_all: 'Toutes',
                filter_guests: '{{count}} Invités',
                no_results: 'Aucune chambre trouvée avec ce filtre.'
            }
        }
    },
    de: {
        translation: {
            navbar: {
                home: 'Startseite',
                rooms: 'Zimmer',
                contacts: 'Kontakte',
                gallery: 'Galerie',
                book: 'Buchen'
            },
            hero: {
                title: 'DaraHoliday Apartments',
                subtitle: 'Ihr exklusiver Rückzugsort im Herzen von Marsala.',
                viewRooms: 'Zimmer Ansehen',
                bookNow: 'Jetzt Buchen'
            },
            welcome: {
                title: 'Willkommen in Marsala',
                description: 'Entdecken Sie die Schönheit Westsiziliens in unseren sorgfältig eingerichteten Apartments. Strategisch günstig gelegen, bieten sie den idealen Ausgangspunkt, um die Salinen, die Ägadischen Inseln und das historische Zentrum zu erkunden.',
                discover: 'Mehr entdecken'
            },
            common: {
                guests: 'Gäste',
                night: 'Nacht',
                available: 'Verfügbar',
                from: 'ab',
                price_variable: 'Preis Variabel',
                discover_price: 'Verfügbarkeit prüfen',
                cleanliness: 'Reinigung',
                included: 'Inbegriffen',
                cancellation: 'Stornierung',
                free_cancellation: 'Kostenlos innerhalb von 48h',
                best_price: 'Bestpreisgarantie bei Direktbuchung.',
                superhost_desc: 'DaraHoliday ist ein Superhost, der sich für einen außergewöhnlichen Aufenthalt einsetzt.',
                spacious_desc: 'Diese Unterkunft bietet {{size}}m² Platz für Ihren Komfort.',
                superhost: 'Superhost',
                spacious: 'Geräumig',
                ground_floor: 'Erdgeschoss',
                first_floor: 'Erster Stock',
                terrace: 'Terrasse',
                balcony: 'Balkon'
            },
            room_detail: {
                description_title: 'Beschreibung',
                amenities_title: 'Ausstattung',
                kitchen: 'Küche & Essen',
                comfort: 'Komfort & Klima',
                bathroom: 'Bad & Wäsche',
                security: 'Sicherheit',
                accessories: 'Zubehör',
                description_template: '{{type}} im {{floor}} mit {{outdoor}}.'
            },
            amenities: {
                kitchen_space: 'Küche (Zubereitung)',
                fridge: 'Kühlschrank & Gefrierschrank',
                coffee_machine: 'Kaffeemaschine & Wasserkocher',
                stove: 'Herd & Ofen',
                microwave: 'Mikrowelle',
                dishes: 'Gläser, Geschirr & Besteck',
                ac: 'Klimaanlage',
                heating: 'Heizung',
                wifi: 'WLAN & Pocket Wi-Fi',
                tv: 'TV',
                bidet: 'Bidet, Seife, Shampoo',
                hairdryer: 'Föhn',
                washing_machine: 'Waschmaschine',
                hangers: 'Kleiderbügel & Stauraum',
                co_detector: 'CO-Melder',
                alarm: 'Alarm & Feuerlöscher',
                first_aid: 'Erste-Hilfe-Set',
                private_entrance: 'Privater Eingang',
                parking: 'Kostenloser Parkplatz',
                workspace: 'Arbeitsplatz',
                single_floor: 'Einstöckiges Haus'
            },
            gallery: {
                title: 'Galerie',
                subtitle: 'Entdecken Sie unser Anwesen und die Schönheit von Marsala',
                filters: {
                    all: 'Alles',
                    marsala: 'Marsala',
                    apartments: 'Wohnungen',
                    renders: 'Renders'
                }
            },
            reviews: {
                title: 'Was sie über uns sagen',
                subtitle: 'Die Erfahrungen unserer Gäste'
            },
            rooms_page: {
                title: 'Unsere Zimmer',
                subtitle: 'Finden Sie die perfekte Lösung für Ihre Bedürfnisse.',
                filter_all: 'Alle',
                filter_guests: '{{count}} Gäste',
                no_results: 'Keine Zimmer mit diesem Filter gefunden.'
            }
        }
    },
    es: {
        translation: {
            navbar: {
                home: 'Inicio',
                rooms: 'Habitaciones',
                contacts: 'Contactos',
                gallery: 'Galería',
                book: 'Reservar'
            },
            hero: {
                title: 'DaraHoliday Apartments',
                subtitle: 'Tu refugio exclusivo en el corazón de Marsala.',
                viewRooms: 'Ver Habitaciones',
                bookNow: 'Reservar Ahora'
            },
            welcome: {
                title: 'Bienvenido a Marsala',
                description: 'Descubre la belleza de Sicilia occidental alojándote en nuestros apartamentos meticulosamente cuidados. Ubicados estratégicamente, ofrecen el punto de partida ideal para explorar las salinas, las islas Egadi y el centro histórico.',
                discover: 'Descubre más'
            },
            common: {
                guests: 'Huéspedes',
                night: 'noche',
                available: 'Disponible',
                from: 'desde',
                price_variable: 'Precio Variable',
                discover_price: 'Ver Disponibilidad',
                cleanliness: 'Limpieza',
                included: 'Incluida',
                cancellation: 'Cancelación',
                free_cancellation: 'Gratuita dentro de 48h',
                best_price: 'Mejor precio garantizado reservando directamente.',
                superhost_desc: 'DaraHoliday es un Superhost comprometido a proporcionar una estancia excepcional.',
                spacious_desc: 'Este alojamiento ofrece {{size}}m² de espacio para su comodidad.',
                superhost: 'Superhost',
                spacious: 'Espacioso',
                ground_floor: 'Planta Baja',
                first_floor: 'Primer Piso',
                terrace: 'Terraza',
                balcony: 'Balcón'
            },
            room_detail: {
                description_title: 'Descripción',
                amenities_title: 'Servicios',
                kitchen: 'Cocina & Comedor',
                comfort: 'Confort & Clima',
                bathroom: 'Baño & Lavandería',
                security: 'Seguridad',
                accessories: 'Accesorios',
                description_template: '{{type}} ubicado en el {{floor}} con {{outdoor}}.'
            },
            amenities: {
                kitchen_space: 'Cocina (Espacio prep)',
                fridge: 'Refrigerador & Congelador',
                coffee_machine: 'Cafetera & Hervidor',
                stove: 'Estufa & Horno',
                microwave: 'Microondas',
                dishes: 'Vasos, Platos & Cubiertos',
                ac: 'Aire acondicionado',
                heating: 'Calefacción',
                wifi: 'Wi-Fi & Pocket Wi-Fi',
                tv: 'TV',
                bidet: 'Bidet, Jabón, Champú',
                hairdryer: 'Secador de pelo',
                washing_machine: 'Lavadora',
                hangers: 'Perchas & Armario',
                co_detector: 'Detector de CO',
                alarm: 'Alarma & Extintor',
                first_aid: 'Botiquín',
                private_entrance: 'Entrada privada',
                parking: 'Estacionamiento gratis',
                workspace: 'Espacio de trabajo',
                single_floor: 'Casa de una planta'
            },
            gallery: {
                title: 'Galería',
                subtitle: 'Explore nuestra propiedad y la belleza de Marsala',
                filters: {
                    all: 'Todo',
                    marsala: 'Marsala',
                    apartments: 'Apartamentos',
                    renders: 'Renders'
                }
            },
            reviews: {
                title: 'Lo que dicen de nosotros',
                subtitle: 'Las experiencias de nuestros huéspedes'
            },
            rooms_page: {
                title: 'Nuestras Habitaciones',
                subtitle: 'Encuentra la solución perfecta para tus necesidades.',
                filter_all: 'Todas',
                filter_guests: '{{count}} Huéspedes',
                no_results: 'No se encontraron habitaciones con este filtro.'
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'it',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
