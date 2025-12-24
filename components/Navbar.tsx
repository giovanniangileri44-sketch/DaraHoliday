import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Globe, Menu, X, Check, Home, BedDouble, Image, Phone, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const { Link, useLocation } = ReactRouterDOM as any;

const CORE_LANGUAGES = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' }
];

interface NavbarProps {
  variant?: 'dark' | 'light';
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'dark' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangMenuOpen(false);
    localStorage.setItem('dara_preferred_lang', langCode);
  };

  // Restore preferred language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('dara_preferred_lang');
    if (savedLang && CORE_LANGUAGES.some(l => l.code === savedLang)) {
      if (i18n.language !== savedLang) {
        i18n.changeLanguage(savedLang);
      }
    }
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 ${isScrolled || isMobileMenuOpen || location.pathname !== '/'
        ? (variant === 'light'
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'
          : 'bg-background/80 backdrop-blur-md border-b border-white/5 py-3')
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className={`text-2xl font-bold tracking-tight z-50 ${variant === 'light' ? 'text-slate-900' : 'text-white'}`}>
          D<span className="text-accent">H</span>
        </Link>

        {/* Center Links - Desktop */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className={`text-sm font-medium hover:text-accent transition-colors ${variant === 'light' ? 'text-slate-600' : 'text-white'}`}>{t('navbar.home')}</Link>
          <Link to="/camere" className={`text-sm font-medium hover:text-accent transition-colors ${variant === 'light' ? 'text-slate-600' : 'text-white'}`}>{t('navbar.rooms')}</Link>
          <Link to="/galleria" className={`text-sm font-medium hover:text-accent transition-colors ${variant === 'light' ? 'text-slate-600' : 'text-white'}`}>{t('navbar.gallery')}</Link>
          <Link to="/contatti" className={`text-sm font-medium hover:text-accent transition-colors ${variant === 'light' ? 'text-slate-600' : 'text-white'}`}>{t('navbar.contacts')}</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`transition-colors p-2 rounded-full hover:bg-black/5 ${variant === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              <Globe className="w-5 h-5" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
                {/* Language List */}
                <div className="py-2">
                  {CORE_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => toggleLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-white/5 transition-colors ${i18n.language === lang.code ? 'text-accent font-bold' : 'text-textMuted'
                        }`}
                    >
                      {lang.label}
                      {i18n.language === lang.code && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 rounded-full transition-colors z-50 ${variant === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 top-0 z-40 flex flex-col pt-24 pb-8 px-6 animate-in slide-in-from-top-0 duration-300 md:hidden ${variant === 'light' ? 'bg-white/95 backdrop-blur-xl' : 'bg-black/95 backdrop-blur-xl'}`}>

          <div className="flex flex-col space-y-2 w-full max-w-md mx-auto">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between p-5 rounded-2xl transition-all active:scale-[0.98] shadow-sm ${variant === 'light' ? 'bg-slate-50 text-slate-900 border border-slate-200' : 'bg-zinc-900 text-white border border-white/10'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${variant === 'light' ? 'bg-slate-200' : 'bg-white/10'}`}>
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold">{t('navbar.home')}</span>
              </div>
              <ChevronRight className={`w-5 h-5 ${variant === 'light' ? 'text-slate-400' : 'text-white/40'}`} />
            </Link>

            <Link
              to="/camere"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between p-5 rounded-2xl transition-all active:scale-[0.98] shadow-sm ${variant === 'light' ? 'bg-slate-50 text-slate-900 border border-slate-200' : 'bg-zinc-900 text-white border border-white/10'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${variant === 'light' ? 'bg-slate-200' : 'bg-white/10'}`}>
                  <BedDouble className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold">{t('navbar.rooms')}</span>
              </div>
              <ChevronRight className={`w-5 h-5 ${variant === 'light' ? 'text-slate-400' : 'text-white/40'}`} />
            </Link>

            <Link
              to="/galleria"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between p-5 rounded-2xl transition-all active:scale-[0.98] shadow-sm ${variant === 'light' ? 'bg-slate-50 text-slate-900 border border-slate-200' : 'bg-zinc-900 text-white border border-white/10'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${variant === 'light' ? 'bg-slate-200' : 'bg-white/10'}`}>
                  <Image className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold">{t('navbar.gallery')}</span>
              </div>
              <ChevronRight className={`w-5 h-5 ${variant === 'light' ? 'text-slate-400' : 'text-white/40'}`} />
            </Link>

            <Link
              to="/contatti"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between p-5 rounded-2xl transition-all active:scale-[0.98] shadow-sm ${variant === 'light' ? 'bg-slate-50 text-slate-900 border border-slate-200' : 'bg-zinc-900 text-white border border-white/10'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${variant === 'light' ? 'bg-slate-200' : 'bg-white/10'}`}>
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold">{t('navbar.contacts')}</span>
              </div>
              <ChevronRight className={`w-5 h-5 ${variant === 'light' ? 'text-slate-400' : 'text-white/40'}`} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;