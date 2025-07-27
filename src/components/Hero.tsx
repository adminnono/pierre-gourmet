import React from 'react';
import { ChefHat, Star, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-500 text-white p-4 rounded-full">
              <ChefHat className="w-12 h-12" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Passionné de Cuisine <span className="text-orange-500">Gastronomique</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Critique culinaire et créateur de contenu sur les anciens candidats de Top Chef. 
            Je partage mes découvertes gastronomiques parisiennes et mes coups de cœur.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-orange-500 mr-2" />
              <span>Critique gastronomique</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-orange-500 mr-2" />
              <span>Paris & région</span>
            </div>
            <div className="flex items-center">
              <ChefHat className="w-5 h-5 text-orange-500 mr-2" />
              <span>Expert Top Chef</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;