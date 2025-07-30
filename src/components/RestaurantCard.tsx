import React from "react";
import { MapPin, Star, ChefHat, Camera } from "lucide-react";
import ImageModal from "./ImageModal";
import { UtensilsCrossed } from "lucide-react";

interface Dish {
  name: string;
  price: number;
  images: string[];
}

interface Restaurant {
  id: number;
  name: string;
  location: string;
  chef: string;
  rating: number;
  image: string;
  dishes: Dish[];
  menuUrl?: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const [modalState, setModalState] = React.useState<{
    isOpen: boolean;
    dishIndex: number;
    imageIndex: number;
  }>({
    isOpen: false,
    dishIndex: 0,
    imageIndex: 0,
  });

  const total = restaurant.dishes.reduce((sum, dish) => sum + dish.price, 0);

  const openModal = (dishIndex: number, imageIndex: number = 0) => {
    setModalState({
      isOpen: true,
      dishIndex,
      imageIndex,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const nextImage = () => {
    const currentDish = restaurant.dishes[modalState.dishIndex];
    setModalState((prev) => ({
      ...prev,
      imageIndex: (prev.imageIndex + 1) % currentDish.images.length,
    }));
  };

  const prevImage = () => {
    const currentDish = restaurant.dishes[modalState.dishIndex];
    setModalState((prev) => ({
      ...prev,
      imageIndex:
        prev.imageIndex === 0
          ? currentDish.images.length - 1
          : prev.imageIndex - 1,
    }));
  };

  const goToImage = (index: number) => {
    setModalState((prev) => ({
      ...prev,
      imageIndex: index,
    }));
  };
  const currentDish = restaurant.dishes[modalState.dishIndex];

  return (
    <>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-80 md:h-full">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-slate-900 text-white px-3 py-1 rounded-full flex items-center space-x-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{restaurant.rating}/5</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                {restaurant.name}
              </h3>

              <div className="flex items-center text-slate-600 mb-2">
                <MapPin size={18} className="mr-2" />
                <span className="text-lg">{restaurant.location}</span>
              </div>

              <div className="flex items-center text-slate-600">
                <ChefHat size={18} className="mr-2" />
                <span className="text-lg">Chef {restaurant.chef}</span>
              </div>
            </div>

            {restaurant.menuUrl && (
              <div className="flex items-center text-slate-600">
                <UtensilsCrossed size={18} className="mr-2" />
                <a
                  href={restaurant.menuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:underline hover:text-slate-800 transition"
                >
                  Voir le menu
                </a>
              </div>
            )}

            {/* Menu Section */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">
                Menu dégustation
              </h4>
              <div className="space-y-3">
                {restaurant.dishes.map((dish, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0"
                  >
                    <div className="flex items-center flex-1">
                      <span className="text-slate-700 mr-3">{dish.name}</span>
                      {dish.images.length > 0 && (
                        <button
                          onClick={() => openModal(index)}
                          className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 transition-colors duration-200 hover:bg-slate-50 px-2 py-1 rounded"
                        >
                          <Camera size={16} />
                          <span className="text-sm">
                            ({dish.images.length})
                          </span>
                        </button>
                      )}
                    </div>
                    <span className="font-semibold text-slate-900 ml-4">
                      {dish.price}€
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t-2 border-slate-900">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-slate-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-slate-900">
                    {total}€
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {currentDish && (
        <ImageModal
          images={currentDish.images}
          currentIndex={modalState.imageIndex}
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          dishName={currentDish.name}
          onThumbnailClick={goToImage}
        />
      )}
    </>
  );
};

export default RestaurantCard;
