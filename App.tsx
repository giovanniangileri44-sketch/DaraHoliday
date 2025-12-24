import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Home from './pages/Home';
import RoomDetail from './pages/RoomDetail';
import Rooms from './pages/Rooms';
import Contacts from './pages/Contacts';
import Gallery from './pages/Gallery';
import { useEffect } from 'react';

const { HashRouter, Routes, Route, ScrollRestoration, useLocation } = ReactRouterDOM as any;

// Simple ScrollToTop component to handle scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camere" element={<Rooms />} />
        <Route path="/camere/:id" element={<RoomDetail />} />
        <Route path="/galleria" element={<Gallery />} />
        <Route path="/contatti" element={<Contacts />} />
        <Route path="/room/:id" element={<RoomDetail />} />
      </Routes>
    </HashRouter>
  );
};

export default App;