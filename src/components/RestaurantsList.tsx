import React, { useState, useEffect } from 'react';
import { Restaurant } from '../types/Restaurant';
import RestaurantCard from './RestaurantCard';
import RestaurantForm from './RestaurantForm';
import { Plus, Search } from 'lucide-react';

const RestaurantsList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('pierre-gourmet-restaurants');
    if (saved) {
      setRestaurants(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pierre-gourmet-restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  const handleSave = (restaurantData: Omit<Restaurant, 'id'>) => {
    if (editingRestaurant) {
      setRestaurants(prev => prev.map(r => 
        r.id === editingRestaurant.id 
          ? { ...restaurantData, id: editingRestaurant.id }
          : r
      ));
    } else {
      const newRestaurant: Restaurant = {
        ...restaurantData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setRestaurants(prev => [newRestaurant, ...prev]);
    }
    
    setShowForm(false);
    setEditingRestaurant(undefined);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce restaurant ?')) {
      setRestaurants(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingRestaurant(undefined);
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.chef.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mes Découvertes <span className="text-orange-500">Gastronomiques</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les restaurants que j'ai visités et mes impressions détaillées sur chaque expérience culinaire.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un restaurant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un restaurant</span>
          </button>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm ? 'Aucun restaurant trouvé' : 'Aucun restaurant ajouté'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? 'Essayez avec d\'autres mots-clés'
                : 'Commencez par ajouter votre première découverte gastronomique'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Ajouter un restaurant
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {showForm && (
          <RestaurantForm
            restaurant={editingRestaurant}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </section>
  );
};

export default RestaurantsList;