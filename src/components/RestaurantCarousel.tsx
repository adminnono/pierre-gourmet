import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RestaurantCard from './RestaurantCard';

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
}

const restaurantsData: Restaurant[] = [
  {
    id: 1,
    name: "L'Ambroisie",
    location: "Place des Vosges, Paris 4e",
    chef: "Bernard Pacaud",
    rating: 5,
    image: "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { 
        name: "Feuilleté de truffe noire aux foie gras", 
        price: 120,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Escalope de turbot au caviar", 
        price: 95,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Fricassée de homard aux châtaignes", 
        price: 110,
        images: [
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Tarte fine sablée au chocolat", 
        price: 45,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Arpège",
    location: "Rue de Varenne, Paris 7e",
    chef: "Alain Passard",
    rating: 5,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { 
        name: "Légumes du potager en mille-feuille", 
        price: 85,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Betterave aux graines de pavot", 
        price: 65,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Oeuf à la coque truffé", 
        price: 90,
        images: [
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Tarte aux figues et miel de châtaignier", 
        price: 38,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Guy Savoy",
    location: "Quai de Conti, Paris 6e",
    chef: "Guy Savoy",
    rating: 5,
    image: "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { 
        name: "Soupe d'artichaut à la truffe noire", 
        price: 75,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Saint-Jacques en nage glacée", 
        price: 85,
        images: [
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Canard Apicius aux épices", 
        price: 95,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Mille-feuille à la vanille", 
        price: 42,
        images: [
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Le Bristol",
    location: "Rue du Faubourg Saint-Honoré, Paris 8e",
    chef: "Eric Frechon",
    rating: 4,
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { 
        name: "Macaroni aux truffes et foie gras", 
        price: 98,
        images: [
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Bar de ligne en croûte d'herbes", 
        price: 78,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Pigeon aux épices douces", 
        price: 88,
        images: [
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      { 
        name: "Soufflé au Grand Marnier", 
        price: 35,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      }
    ]
  }
];

const RestaurantCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextRestaurant = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurantsData.length);
  };
  
  const prevRestaurant = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? restaurantsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Mes Découvertes Gastronomiques</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Plongez dans l'univers de la haute gastronomie parisienne à travers mes expériences 
            dans les plus grandes tables de la capitale.
          </p>
        </div>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevRestaurant}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextRestaurant}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Restaurant Card */}
          <div className="px-16">
            <RestaurantCard restaurant={restaurantsData[currentIndex]} />
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {restaurantsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-slate-900' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
          
          {/* Counter */}
          <div className="text-center mt-4">
            <span className="text-slate-600">
              {currentIndex + 1} / {restaurantsData.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCarousel;