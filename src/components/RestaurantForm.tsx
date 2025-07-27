import React, { useState, useEffect } from 'react';
import { Restaurant, Dish } from '../types/Restaurant';
import { X, Plus, Trash2 } from 'lucide-react';
import StarRating from './StarRating';

interface RestaurantFormProps {
  restaurant?: Restaurant;
  onSave: (restaurant: Omit<Restaurant, 'id'>) => void;
  onCancel: () => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ 
  restaurant, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    chef: '',
    rating: 0,
    photos: [''],
    visitDate: '',
    notes: '',
  });
  
  const [dishes, setDishes] = useState<Omit<Dish, 'id'>[]>([
    { name: '', price: 0, description: '' }
  ]);

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        location: restaurant.location,
        chef: restaurant.chef,
        rating: restaurant.rating,
        photos: restaurant.photos.length > 0 ? restaurant.photos : [''],
        visitDate: restaurant.visitDate,
        notes: restaurant.notes || '',
      });
      setDishes(restaurant.dishes.length > 0 ? restaurant.dishes : [{ name: '', price: 0, description: '' }]);
    }
  }, [restaurant]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validDishes = dishes.filter(dish => dish.name.trim() && dish.price > 0);
    const validPhotos = formData.photos.filter(photo => photo.trim());
    const totalBill = validDishes.reduce((sum, dish) => sum + dish.price, 0);
    
    const restaurantData = {
      ...formData,
      photos: validPhotos,
      dishes: validDishes.map(dish => ({
        ...dish,
        id: Math.random().toString(36).substr(2, 9)
      })),
      totalBill,
    };
    
    onSave(restaurantData);
  };

  const addPhoto = () => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, '']
    }));
  };

  const updatePhoto = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.map((photo, i) => i === index ? value : photo)
    }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const addDish = () => {
    setDishes(prev => [...prev, { name: '', price: 0, description: '' }]);
  };

  const updateDish = (index: number, field: keyof Omit<Dish, 'id'>, value: string | number) => {
    setDishes(prev => prev.map((dish, i) => 
      i === index ? { ...dish, [field]: value } : dish
    ));
  };

  const removeDish = (index: number) => {
    setDishes(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {restaurant ? 'Modifier' : 'Ajouter'} un restaurant
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du restaurant *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lieu *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chef *
              </label>
              <input
                type="text"
                required
                value={formData.chef}
                onChange={(e) => setFormData(prev => ({ ...prev, chef: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de visite *
              </label>
              <input
                type="date"
                required
                value={formData.visitDate}
                onChange={(e) => setFormData(prev => ({ ...prev, visitDate: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note *
            </label>
            <StarRating
              rating={formData.rating}
              onChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
              size="lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos (URLs)
            </label>
            <div className="space-y-2">
              {formData.photos.map((photo, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="url"
                    value={photo}
                    onChange={(e) => updatePhoto(index, e.target.value)}
                    placeholder="https://exemple.com/photo.jpg"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {formData.photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addPhoto}
                className="flex items-center text-orange-600 hover:text-orange-700 text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter une photo
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plats commandés *
            </label>
            <div className="space-y-3">
              {dishes.map((dish, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        required
                        value={dish.name}
                        onChange={(e) => updateDish(index, 'name', e.target.value)}
                        placeholder="Nom du plat"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={dish.price}
                        onChange={(e) => updateDish(index, 'price', parseFloat(e.target.value) || 0)}
                        placeholder="Prix €"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      {dishes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDish(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <textarea
                    value={dish.description}
                    onChange={(e) => updateDish(index, 'description', e.target.value)}
                    placeholder="Description du plat (optionnel)"
                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    rows={2}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addDish}
                className="flex items-center text-orange-600 hover:text-orange-700 text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter un plat
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes personnelles
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Vos impressions sur ce restaurant..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              {restaurant ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantForm;