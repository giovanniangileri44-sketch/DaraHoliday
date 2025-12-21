
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
                book: 'Prenota'
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
                discover_price: 'Scoprilo Ora'
            }
        }
    },
    en: {
        translation: {
            navbar: {
                home: 'Home',
                rooms: 'Rooms',
                contacts: 'Contacts',
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
                price_variable: 'Price Variable'
            }
        }
    },
    fr: {
        translation: {
            navbar: {
                home: 'Accueil',
                rooms: 'Chambres',
                contacts: 'Contacts',
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
                price_variable: 'Prix Variable'
            }
        }
    },
    de: {
        translation: {
            navbar: {
                home: 'Startseite',
                rooms: 'Zimmer',
                contacts: 'Kontakte',
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
                price_variable: 'Preis Variabel'
            }
        }
    },
    es: {
        translation: {
            navbar: {
                home: 'Inicio',
                rooms: 'Habitaciones',
                contacts: 'Contactos',
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
                price_variable: 'Precio Variable'
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
