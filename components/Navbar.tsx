import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Globe, Menu, X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const { Link, useLocation } = ReactRouterDOM as any;

const LANGUAGES = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' }
];

const Navbar: React.FC = () => {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangMenuOpen(false);
  };

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 ${isScrolled || isMobileMenuOpen || location.pathname !== '/'
        ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-3'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight text-white z-50">
          D<span className="text-accent">H</span>
        </Link>

        {/* Center Links - Desktop */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-sm font-medium hover:text-accent transition-colors text-white">{t('navbar.home')}</Link>
          <Link to="/camere" className="text-sm font-medium hover:text-accent transition-colors text-white">{t('navbar.rooms')}</Link>
          <Link to="/contatti" className="text-sm font-medium hover:text-accent transition-colors text-white">{t('navbar.contacts')}</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="text-white hover:text-accent transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <Globe className="w-5 h-5" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-surface border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {LANGUAGES.map((lang) => (
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
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 bg-background z-40 flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-top-10 duration-300 md:hidden">
          <Link to="/" className="text-2xl font-bold text-white hover:text-accent">{t('navbar.home')}</Link>
          <Link to="/camere" className="text-2xl font-bold text-white hover:text-accent">{t('navbar.rooms')}</Link>
          <Link to="/contatti" className="text-2xl font-bold text-white hover:text-accent">{t('navbar.contacts')}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;