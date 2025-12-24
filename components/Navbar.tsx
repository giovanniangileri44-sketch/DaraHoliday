import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Globe, Menu, X, Check, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const { Link, useLocation } = ReactRouterDOM as any;

const CORE_LANGUAGES = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' }
];

const ALL_LANGUAGES = [
  ...CORE_LANGUAGES,
  { code: 'sq', label: 'Albanian' },
  { code: 'ar', label: 'Arabic' },
  { code: 'hy', label: 'Armenian' },
  { code: 'az', label: 'Azerbaijani' },
  { code: 'eu', label: 'Basque' },
  { code: 'be', label: 'Belarusian' },
  { code: 'bg', label: 'Bulgarian' },
  { code: 'ca', label: 'Catalan' },
  { code: 'zh-CN', label: 'Chinese (Simplified)' },
  { code: 'zh-TW', label: 'Chinese (Traditional)' },
  { code: 'hr', label: 'Croatian' },
  { code: 'cs', label: 'Czech' },
  { code: 'da', label: 'Danish' },
  { code: 'nl', label: 'Dutch' },
  { code: 'et', label: 'Estonian' },
  { code: 'tl', label: 'Filipino' },
  { code: 'fi', label: 'Finnish' },
  { code: 'gl', label: 'Galician' },
  { code: 'ka', label: 'Georgian' },
  { code: 'el', label: 'Greek' },
  { code: 'ht', label: 'Haitian Creole' },
  { code: 'he', label: 'Hebrew' },
  { code: 'hi', label: 'Hindi' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'is', label: 'Icelandic' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ga', label: 'Irish' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'lv', label: 'Latvian' },
  { code: 'lt', label: 'Lithuanian' },
  { code: 'mk', label: 'Macedonian' },
  { code: 'ms', label: 'Malay' },
  { code: 'mt', label: 'Maltese' },
  { code: 'no', label: 'Norwegian' },
  { code: 'fa', label: 'Persian' },
  { code: 'pl', label: 'Polish' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ro', label: 'Romanian' },
  { code: 'ru', label: 'Russian' },
  { code: 'sr', label: 'Serbian' },
  { code: 'sk', label: 'Slovak' },
  { code: 'sl', label: 'Slovenian' },
  { code: 'sw', label: 'Swahili' },
  { code: 'sv', label: 'Swedish' },
  { code: 'th', label: 'Thai' },
  { code: 'tr', label: 'Turkish' },
  { code: 'uk', label: 'Ukrainian' },
  { code: 'ur', label: 'Urdu' },
  { code: 'vi', label: 'Vietnamese' },
  { code: 'cy', label: 'Welsh' },
  { code: 'yi', label: 'Yiddish' }
];

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

interface NavbarProps {
  variant?: 'dark' | 'light';
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'dark' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // Use state to track current language to support both i18n and Google Translate
  const [currentLang, setCurrentLang] = useState('it');

  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Sync local state with i18n initial state
    setCurrentLang(i18n.language);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'it',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );
    };

    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const triggerGoogleTranslate = (langCode: string) => {
    // 1. Set i18n to Italian so Google Translate has a consistent source
    i18n.changeLanguage('it');

    // 2. Set the Google Translate cookie manually to "source/destination"
    // The format is usually /auto/target or /source/target. 
    // We force source=it to match our base.
    const cookieValue = `/it/${langCode}`;
    document.cookie = `googtrans=${cookieValue}; path=/`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;

    // 3. Reload the page to ensure Google Translate script runs on the fresh content
    // This is the most reliable way to force Google Translate on an SPA
    window.location.reload();
  };

  const clearGoogleTranslate = () => {
    // Clear cookies for root and domain
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
  };

  const toggleLanguage = (langCode: string) => {
    const isCore = CORE_LANGUAGES.some(l => l.code === langCode);

    // Update local state
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);

    if (isCore) {
      // If we are switching to a core language, we want to use i18n.
      // We must ensure Google Translate is OFF.

      // Check if Google Translate cookie exists
      const cookies = document.cookie.split(';');
      const hasGoogTrans = cookies.some(c => c.trim().startsWith('googtrans='));

      if (hasGoogTrans) {
        clearGoogleTranslate();
        // We need to reload to get rid of Google Translate's DOM changes
        // After reload, we need to apply the core language. 
        // We can save the desired language in localStorage to apply it on init.
        localStorage.setItem('dara_preferred_lang', langCode);
        window.location.reload();
        return;
      }

      i18n.changeLanguage(langCode);
      localStorage.setItem('dara_preferred_lang', langCode);
    } else {
      // Switching to a non-core language: Use Google Translate
      triggerGoogleTranslate(langCode);
    }
  };

  const filteredLanguages = ALL_LANGUAGES.filter(lang =>
    lang.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Restore preferred language on mount if it's a core language
  useEffect(() => {
    const savedLang = localStorage.getItem('dara_preferred_lang');
    if (savedLang && CORE_LANGUAGES.some(l => l.code === savedLang)) {
      // Only apply if it's different and no google translate is active
      if (i18n.language !== savedLang && !document.cookie.includes('googtrans=')) {
        i18n.changeLanguage(savedLang);
        setCurrentLang(savedLang);
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
              <div className="absolute right-0 mt-2 w-64 bg-surface border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">

                {/* Search Input */}
                <div className="p-3 border-b border-white/10 sticky top-0 bg-surface z-10">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" />
                    <input
                      type="text"
                      placeholder="Search language..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-accent transition-colors placeholder:text-textMuted"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Language List */}
                <div className="overflow-y-auto">
                  {filteredLanguages.length > 0 ? (
                    filteredLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => toggleLanguage(lang.code)}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-white/5 transition-colors ${currentLang === lang.code ? 'text-accent font-bold' : 'text-textMuted'
                          }`}
                      >
                        {lang.label}
                        {currentLang === lang.code && <Check className="w-3 h-3" />}
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-textMuted text-sm">
                      No languages found
                    </div>
                  )}
                </div>

                {/* Hidden Google Translate Element */}
                <div id="google_translate_element" className="hidden absolute" />
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
        <div className={`fixed inset-0 top-0 z-40 flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-top-10 duration-300 md:hidden ${variant === 'light' ? 'bg-white' : 'bg-background'}`}>
          <Link to="/" className={`text-xl font-bold hover:text-accent ${variant === 'light' ? 'text-slate-900' : 'text-white'}`}>{t('navbar.home')}</Link>
          <Link to="/camere" className={`text-xl font-bold hover:text-accent ${variant === 'light' ? 'text-slate-900' : 'text-white'}`}>{t('navbar.rooms')}</Link>
          <Link to="/galleria" className={`text-xl font-bold hover:text-accent ${variant === 'light' ? 'text-slate-900' : 'text-white'}`}>{t('navbar.gallery')}</Link>
          <Link to="/contatti" className={`text-xl font-bold hover:text-accent ${variant === 'light' ? 'text-slate-900' : 'text-white'}`}>{t('navbar.contacts')}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;