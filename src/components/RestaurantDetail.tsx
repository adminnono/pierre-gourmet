import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  ChefHat,
  Clock,
  Euro,
  ExternalLink,
  Heart,
  Camera,
  Instagram,
  Phone,
  Globe,
} from "lucide-react";
import { useFavorites } from "./FavoriteContext";

interface Dish {
  name: string;
  price: string;
  images: string[];
}

interface Restaurant {
  id: number;
  name: string;
  location: string;
  chef: string;
  rating: string;
  image: string;
  dishes: Dish[];
  menuUrl?: string;
  siteWeb?: string;
  instaLink?: string;
  totalPerPerson?: string;
  phone?: string;
  hours?: string;
  map: string;
  mapUrl: string;
}

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack: () => void;
}

const RestaurantDetail: React.FC<RestaurantDetailProps> = ({
  restaurant,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "menu" | "map">(
    "overview"
  );
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const isRestaurantFavorite = isFavorite(restaurant.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: "overview", label: "Aperçu", icon: Star },
    { id: "menu", label: "Menu & Prix", icon: Euro },
    { id: "map", label: "Localisation", icon: MapPin },
  ];

  const handleFavoriteClick = () => {
    toggleFavorite(restaurant);
  };

  const handleShare = async () => {
    const shareData = {
      title: restaurant.name,
      text: `Découvrez ce restaurant : ${restaurant.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Partage réussi");
      } catch (err) {
        console.error("Erreur de partage:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("URL copiée dans le presse-papiers !");
      } catch {
        alert("Le partage n'est pas supporté et la copie a échoué.");
      }
    }
  };

  const MapView = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe
            src={restaurant.map}
            className="w-full h-full border-0 rounded-lg"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Informations Pratiques
          </h3>
          {restaurant.mapUrl && (
            <a
              href={restaurant.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Ouvrir Google Maps</span>
            </a>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-3 text-gray-400" />
            <span>{restaurant.location}</span>
          </div>
          {restaurant.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-3 text-gray-400" />
              <span>{restaurant.phone}</span>
            </div>
          )}
          {restaurant.hours && (
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-3 text-gray-400" />
              <span>{restaurant.hours}</span>
            </div>
          )}
          {restaurant.siteWeb && (
            <div className="flex items-center text-gray-600">
              <Globe className="w-5 h-5 mr-3 text-gray-400" />
              <a
                href={restaurant.siteWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Site web officiel
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Actions */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleFavoriteClick}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isRestaurantFavorite
                  ? "bg-red-500 text-white shadow-lg scale-110"
                  : "bg-white/90 text-gray-900 hover:bg-white hover:scale-105"
              }`}
              title={
                isRestaurantFavorite
                  ? "Retirer des coups de cœur"
                  : "Ajouter aux coups de cœur"
              }
            >
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                  isRestaurantFavorite ? "fill-current" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Infos */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
            {restaurant.totalPerPerson && (
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <Euro className="w-5 h-5" />
                <span className="font-semibold">
                  {restaurant.totalPerPerson}
                </span>
              </div>
            )}
            {isRestaurantFavorite && (
              <div className="bg-red-500/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-semibold">Coup de cœur</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4 text-lg">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-5 h-5" />
              <span>Chef {restaurant.chef}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{restaurant.location.split(",")[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-x-4 sm:flex sm:space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* About */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  À propos
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Découvrez l'univers culinaire du Chef {restaurant.chef} dans
                  ce restaurant d'exception. Une expérience gastronomique unique
                  qui allie tradition et innovation.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">
                      {restaurant.rating}/10
                    </div>
                    <div className="text-sm text-gray-600">Note Pierre</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Euro className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">
                      {restaurant.totalPerPerson || "Variable"}
                    </div>
                    <div className="text-sm text-gray-600">Prix moyen</div>
                  </div>
                </div>
              </div>

              {/* Notes privées */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Mes Notes Privées
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 italic">
                    "Une expérience mémorable ! Le service était impeccable et
                    chaque plat était une œuvre d'art. Je recommande
                    particulièrement le menu dégustation."
                  </p>
                </div>
              </div>
            </div>

            {/* Infos pratiques + Réseaux */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Informations Pratiques
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{restaurant.location}</span>
                  </div>
                  {restaurant.hours && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3 text-gray-400" />
                      <span>{restaurant.hours}</span>
                    </div>
                  )}
                  {restaurant.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-3 text-gray-400" />
                      <span>{restaurant.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Réseaux Sociaux
                </h3>
                <div className="flex space-x-4">
                  {restaurant.instaLink && (
                    <button
                      onClick={() =>
                        window.open(restaurant.instaLink, "_blank")
                      }
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>Voir sur Instagram</span>
                    </button>
                  )}

                  {restaurant.siteWeb && (
                    <a
                      href={restaurant.siteWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Site Web</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Menu & Prix
                </h2>
                {restaurant.menuUrl && (
                  <a
                    href={restaurant.menuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Menu Complet</span>
                  </a>
                )}
              </div>

              <div className="grid gap-6">
                {restaurant.dishes.map((dish, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {dish.name}
                      </h3>
                      <div className="text-2xl font-bold text-amber-600">
                        {dish.price}€
                      </div>
                    </div>

                    {dish.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {dish.images.map((imgIndex, i) => (
                          <div
                            key={i}
                            className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                          >
                            <Camera className="w-8 h-8 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "map" && <MapView />}
      </div>
    </div>
  );
};

export default RestaurantDetail;
