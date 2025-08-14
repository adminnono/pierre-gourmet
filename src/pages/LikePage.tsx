import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, ChefHat, UtensilsCrossed, Heart } from "lucide-react";
import { useFavorites } from "../components/FavoriteContext";

const LikePage: React.FC = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="mb-6">
            <Heart className="w-16 h-16 mx-auto text-gray-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Aucun coup de cœur pour le moment
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Parcourez les restaurants et cliquez sur le ❤️ pour les ajouter à
            vos coups de cœur !
          </p>
          <Link
            to="/carnet-de-tables"
            className="inline-flex items-center space-x-2 bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span>Découvrir les restaurants</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-500 mr-3 fill-current" />
            <h2 className="text-4xl font-bold text-slate-900">
              Mes Coups de Cœur
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {favorites.length} restaurant{favorites.length > 1 ? "s" : ""} que
            j'ai adoré{favorites.length > 1 ? "s" : ""} et que je recommande
            vivement
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/carnet-de-tables/${restaurant.slug}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-slate-900 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">
                    {restaurant.rating}
                  </span>
                </div>

                {/* Favorite Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                    <Heart size={14} className="fill-current" />
                    <span className="text-xs font-medium">Coup de cœur</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {restaurant.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-slate-600">
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span className="text-sm truncate">
                      {restaurant.location}
                    </span>
                  </div>

                  <div className="flex items-center text-slate-600">
                    <ChefHat size={16} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">Chef {restaurant.chef}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-slate-600">
                    <UtensilsCrossed size={16} className="mr-2" />
                    <span className="text-sm">Menu</span>
                  </div>
                  <span className="text-lg font-bold text-amber-600">
                    {restaurant.totalPerPerson || "Prix variable"}
                  </span>
                </div>

                {/* Dishes Preview */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-xs text-slate-500 space-y-1">
                    {restaurant.dishes.slice(0, 2).map((dish, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="truncate mr-2">{dish.name}</span>
                        <span className="font-medium">{dish.price}€</span>
                      </div>
                    ))}
                    {restaurant.dishes.length > 2 && (
                      <div className="text-center text-slate-400 text-xs">
                        +{restaurant.dishes.length - 2} autres options
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LikePage;
