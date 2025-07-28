import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RestaurantCard from "./RestaurantCard";

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
    name: "Nonos",
    location: "Hôtel de Crillon, 75008 Paris",
    chef: "Paul Pairet",
    rating: 5,
    image: "./images/nonos.jpg",
    dishes: [
      {
        name: "Beurre Aromatisé",
        price: 5,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Soufflé au vrai gruyère",
        price: 22,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Cœur D'Entrecôte Frites",
        price: 48,
        images: [
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Sauce béarnaise",
        price: 5,
        images: [
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Tarte à la Crème",
        price: 16,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Le Coquillage",
    location: "Rue de Varenne, Paris 7e",
    chef: "Hugo Roellinger",
    rating: 5,
    image: "./images/coquillage.jpg",
    dishes: [
      {
        name: "Légumes du potager en mille-feuille",
        price: 85,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Betterave aux graines de pavot",
        price: 65,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Oeuf à la coque truffé",
        price: 90,
        images: [
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Tarte aux figues et miel de châtaignier",
        price: 38,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Le Pincemin",
    location: "10 Bd du Roi, 78000 Versailles",
    chef: "Xavier Pincemin",
    rating: 5,
    image: "./images/pincemin.jpg",
    dishes: [
      {
        name: "Légumes du potager en mille-feuille",
        price: 85,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Betterave aux graines de pavot",
        price: 65,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Oeuf à la coque truffé",
        price: 90,
        images: [
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Tarte aux figues et miel de châtaignier",
        price: 38,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Bonhomie",
    location: "22 Rue d'Enghien, 75010 Paris",
    chef: "Quentin Mauro",
    rating: 5,
    image: "./images/bonnomie.jpg",
    dishes: [
      {
        name: "Soupe d'artichaut à la truffe noire",
        price: 75,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Saint-Jacques en nage glacée",
        price: 85,
        images: [
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Canard Apicius aux épices",
        price: 95,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Mille-feuille à la vanille",
        price: 42,
        images: [
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Ischia",
    location: "14 Rue Cauchy, 75015 Paris",
    chef: "Denny Imbroisi",
    rating: 5,
    image: "./images/ischia.jpg",
    dishes: [
      {
        name: "Soupe d'artichaut à la truffe noire",
        price: 75,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Saint-Jacques en nage glacée",
        price: 85,
        images: [
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Canard Apicius aux épices",
        price: 95,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Mille-feuille à la vanille",
        price: 42,
        images: [
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Ora Farmhouse",
    location: "Parc des Buttes-Chaumont, 75019 Paris",
    chef: "Eric Frechon",
    rating: 4,
    image: "./images/ora.webp",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: [
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [
          "https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: [
          "https://images.pexels.com/photos/3184194/pexels-photo-3184194.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
      },
    ],
  },
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
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Mes Découvertes Gastronomiques
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Plongez dans l'univers de la haute gastronomie parisienne à travers
            mes expériences dans les plus grandes tables de la capitale.
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

          <div>
            <RestaurantCard restaurant={restaurantsData[currentIndex]} />
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {restaurantsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-slate-900" : "bg-slate-300"
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
