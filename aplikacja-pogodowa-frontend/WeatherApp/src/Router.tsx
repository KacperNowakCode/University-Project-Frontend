import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import SlugPage from './[city]/page.tsx'; // Page to render for a dynamic slug

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<SlugPage />} /> {/* Dynamic Route */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
