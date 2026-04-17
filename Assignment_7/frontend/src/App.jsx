import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Toaster from 'react-hot-toast';
import Landing from './pages/Landing';

import FeedbackForm from './pages/FeedbackForm';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        {/* Add more routes here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
