import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

const Contacts: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    messaggio: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui puoi aggiungere la logica per inviare l'email
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ nome: '', email: '', telefono: '', messaggio: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/contacts-bg.jpg"
          alt="Marsala Windmills Sunset"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/80" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-[#D4AF37] transition-colors">
            <ArrowLeft size={20} />
            <span>Torna alla home</span>
          </Link>
        </div>
      </div>

      <div className="relative z-10 pt-12 px-6 pb-20 max-w-7xl mx-auto">

        {/* Titolo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contattaci</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Siamo sempre a disposizione per rispondere alle tue domande e aiutarti a pianificare il tuo soggiorno a Marsala.
          </p>
        </motion.div>

        {/* Griglia Contatti Rapidi */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {/* Instagram */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col items-center text-center h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Instagram size={24} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Instagram</h3>
                <p className="text-sm text-gray-500 mb-4">Seguici per foto e aggiornamenti</p>
              </div>
              <a
                href="https://www.instagram.com/daraholidayapartments/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Visita
              </a>
            </div>
          </div>

          {/* Telefono */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col items-center text-center h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Phone size={24} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Telefono</h3>
                <p className="text-sm text-gray-500 mb-4">Chiamaci direttamente</p>
              </div>
              <a
                href="tel:+393773171447"
                className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                +39 377 317 1447
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col items-center text-center h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Mail size={24} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-sm text-gray-500 mb-4">Scrivi un'email</p>
              </div>
              <a
                href="mailto:greenenergyagricolas@libero.it"
                className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Scrivi
              </a>
            </div>
          </div>

          {/* Facebook */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col items-center text-center h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Facebook size={24} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Facebook</h3>
                <p className="text-sm text-gray-500 mb-4">Seguici su Facebook</p>
              </div>
              <a
                href="https://www.facebook.com/share/1EHgWnrP7C/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Visita
              </a>
            </div>
          </div>
        </motion.div>

        {/* Form Contatti */}
        <motion.div
          id="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Inviaci una Richiesta</h2>
          <p className="text-gray-600 text-center mb-8">Compila il modulo e ti risponderemo al più presto.</p>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Messaggio Inviato!</h3>
              <p className="text-gray-600">Grazie, ti risponderemo presto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Il tuo nome"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="tua@email.com"
                />
              </div>

              {/* Telefono */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Telefono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="+39 XXX XXXX XXX"
                />
              </div>

              {/* Messaggio */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Messaggio</label>
                <textarea
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  placeholder="Scrivi il tuo messaggio..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-white font-bold py-4 rounded-lg transition-all hover:shadow-lg active:scale-95"
              >
                Invia Richiesta
              </button>
            </form>
          )}
        </motion.div>

        {/* Info Aggiuntive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Orari di Disponibilità</h3>
          <p className="text-gray-600 mb-6">Siamo disponibili per rispondere alle tue domande durante gli orari seguenti:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="font-semibold">Lun - Ven:</p>
              <p>09:00 - 18:00</p>
            </div>
            <div>
              <p className="font-semibold">Sab - Dom:</p>
              <p>10:00 - 16:00</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contacts;
