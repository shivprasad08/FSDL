import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PopularProducts } from './components/PopularProducts';
import { FindPerfectShoes } from './components/FindPerfectShoes';
import { ElevateYourGame } from './components/ElevateYourGame';
import { NewArrivals } from './components/NewArrivals';
import { JustDoIt } from './components/JustDoIt';
import { Footer } from './components/Footer';
import { ProductDetailPage } from './components/ProductDetailPage';

function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <HeroSection />
              <PopularProducts />
              <FindPerfectShoes />
              <ElevateYourGame />
              <NewArrivals />
              <JustDoIt />
            </>
          )}
        />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
