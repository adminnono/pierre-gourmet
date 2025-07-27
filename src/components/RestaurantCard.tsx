import React from 'react';
import { Restaurant } from '../types/Restaurant';
import { MapPin, User, Euro, Calendar, Edit2, Trash2 } from 'lucide-react';
import StarRating from './StarRating';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ 
  restaurant, 
  onEdit, 
  onDelete 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {restaurant.photos.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={restaurant.photos[0]}
            alt={restaurant.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
            <StarRating rating={restaurant.rating} readonly size="sm" />
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
            <div className="flex items-center text-gray-600 mb-1">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{restaurant.location}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-1">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">Chef {restaurant.chef}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{formatDate(restaurant.visitDate)}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(restaurant)}
              className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(restaurant.id)}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {restaurant.notes && (
          <p className="text-gray-700 mb-4 text-sm italic">"{restaurant.notes}"</p>
        )}

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-gray-900">Plats dégustés</h4>
            <div className="flex items-center text-orange-600 font-bold">
              <Euro className="w-4 h-4 mr-1" />
              <span>{restaurant.totalBill}€</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {restaurant.dishes.slice(0, 3).map((dish) => (
              <div key={dish.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">{dish.name}</span>
                <span className="text-gray-500">{dish.price}€</span>
              </div>
            ))}
            {restaurant.dishes.length > 3 && (
              <p className="text-xs text-gray-500 italic">
                +{restaurant.dishes.length - 3} autres plats...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;