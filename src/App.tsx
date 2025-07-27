import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RestaurantsList from "./components/RestaurantsList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <RestaurantsList />
      <Footer />
    </div>
  );
}

export default App;
