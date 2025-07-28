import React from 'react';
import Header from './components/Header';
import RestaurantCarousel from './components/RestaurantCarousel';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <RestaurantCarousel />
      <Footer />
    </div>
  );
}

export default App;