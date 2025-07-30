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
  menuUrl?: string;
}

const restaurantsData: Restaurant[] = [
  {
    id: 1,
    name: "Nonos",
    location: "Hôtel de Crillon, 75008 Paris",
    chef: "Paul Pairet",
    rating: 5,
    image: "./images/nonos.png",
    menuUrl:
      "https://www.rosewoodhotels.com/fr/hotel-de-crillon/dining/nonos-comestibles-paul-pairet",
    dishes: [
      {
        name: "Beurre Aromatisé",
        price: 5,
        images: ["", ""],
      },
      {
        name: "Soufflé au vrai gruyère",
        price: 22,
        images: [""],
      },
      {
        name: "Cœur D'Entrecôte Frites",
        price: 48,
        images: ["", "", ""],
      },
      {
        name: "Tarte à la Crème",
        price: 16,
        images: [""],
      },
    ],
  },
  {
    id: 2,
    name: "Le Coquillage",
    location: "Le Buot, 35350 Saint-Méloir-des-Ondes",
    chef: "Hugo Roellinger",
    rating: 5,
    image: "./images/coquillage.png",
    menuUrl: "https://www.maisons-de-bricourt.com/fr/page/le-coquillage",
    dishes: [
      {
        name: "Légumes du potager en mille-feuille",
        price: 85,
        images: ["", ""],
      },
      {
        name: "Betterave aux graines de pavot",
        price: 65,
        images: [""],
      },
      {
        name: "Oeuf à la coque truffé",
        price: 90,
        images: ["", ""],
      },
      {
        name: "Tarte aux figues et miel de châtaignier",
        price: 38,
        images: [""],
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
    menuUrl: "https://xavier-pincemin.com/",
    dishes: [
      {
        name: "Légumes du potager en mille-feuille",
        price: 85,
        images: ["", ""],
      },
      {
        name: "Betterave aux graines de pavot",
        price: 65,
        images: [""],
      },
      {
        name: "Oeuf à la coque truffé",
        price: 90,
        images: ["", ""],
      },
      {
        name: "Tarte aux figues et miel de châtaignier",
        price: 38,
        images: [""],
      },
    ],
  },
  {
    id: 3,
    name: "Bonhomie",
    location: "22 Rue d'Enghien, 75010 Paris",
    chef: "Quentin Mauro",
    rating: 5,
    image: "./images/bonhomie.png",
    menuUrl:
      "https://static1.squarespace.com/static/67226d9329a3160418259d88/t/687a9fbbfbac2f49ce242403/1752866747212/Bonhomie+Menu+semaine+30.pdf",
    dishes: [
      {
        name: "Soupe d'artichaut à la truffe noire",
        price: 75,
        images: ["", ""],
      },
      {
        name: "Saint-Jacques en nage glacée",
        price: 85,
        images: [""],
      },
      {
        name: "Canard Apicius aux épices",
        price: 95,
        images: ["", "", ""],
      },
      {
        name: "Mille-feuille à la vanille",
        price: 42,
        images: [""],
      },
    ],
  },
  {
    id: 3,
    name: "Ischia",
    location: "14 Rue Cauchy, 75015 Paris",
    chef: "Denny Imbroisi",
    rating: 5,
    image: "./images/ischia.png",
    menuUrl:
      "https://restaurant-ischia.com/wp-content/uploads/2025/07/A3-PRINT-20250723-Menu_Ischia-exterieur.pdf",
    dishes: [
      {
        name: "Soupe d'artichaut à la truffe noire",
        price: 75,
        images: ["", ""],
      },
      {
        name: "Saint-Jacques en nage glacée",
        price: 85,
        images: [""],
      },
      {
        name: "Canard Apicius aux épices",
        price: 95,
        images: ["", "", ""],
      },
      {
        name: "Mille-feuille à la vanille",
        price: 42,
        images: [""],
      },
    ],
  },
  {
    id: 3,
    name: "Vive",
    location: "62 Av. des Ternes, 75017 Paris",
    chef: "Stéphanie Le Quellec",
    rating: 5,
    image: "./images/vive.png",
    menuUrl:
      "https://www.vive-restaurant.com/wp-content/uploads/2025/07/NOUVELLE-CARTE-DEFINITIVE.pdf",
    dishes: [
      {
        name: "Soupe d'artichaut à la truffe noire",
        price: 75,
        images: ["", ""],
      },
      {
        name: "Saint-Jacques en nage glacée",
        price: 85,
        images: [""],
      },
      {
        name: "Canard Apicius aux épices",
        price: 95,
        images: ["", "", ""],
      },
      {
        name: "Mille-feuille à la vanille",
        price: 42,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Ora Farmhouse",
    location: "Parc des Buttes-Chaumont, 75019 Paris",
    chef: "Saayaan",
    rating: 4,
    image: "./images/ora.png",
    menuUrl: "https://orafarmhouse.com/menus/",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Monsieur Claude",
    location: "Pl. Line Renaud, 92500 Rueil-Malmaison",
    chef: "Danny Khezzar",
    rating: 4,
    image: "./images/claude.png",
    menuUrl: "https://www.monsieur-claude.fr/la-carte/",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Le Logis Sainte Catherine",
    location: "50170 Mont Saint-Michel",
    chef: "Jean Imbert",
    rating: 4,
    image: "./images/logis.png",
    menuUrl: "https://lelogissaintecatherine.com/menu",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Le Bistrot des Chefs",
    location: "29 Quai Gallieni, 92150 Suresnes",
    chef: "Candidat de Top Chef",
    rating: 4,
    image: "./images/bistrot.png",
    menuUrl: "https://www.lebistrot-des-chefs.fr/la-carte/",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Lava",
    location: "9 Rue de la Montagne, 75005 Paris",
    chef: "Wilfried Romain",
    rating: 4,
    image: "./images/lava.png",
    menuUrl: "https://www.lava-paris.com/#les-menus",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Quelque part...",
    location: "1 Rue Ambroise Thomas, 75009 Paris",
    chef: "Florian Barbarot",
    rating: 4,
    image: "./images/quelquepart.png",
    menuUrl: "https://lesabysses.quelquepart.net/le-menu/",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Louis Vuitton",
    location: "26 quai de la Mégisserie, 75001 Paris",
    chef: "Maxime Frédéric",
    rating: 4,
    image: "./images/lv.png",
    menuUrl:
      "https://fr.louisvuitton.com/fra-fr/magazine/articles/maxime-frederic-cafe",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Yaya",
    location: "33 avenue Secretan, 75019 Paris",
    chef: "Juan Arbelaez",
    rating: 4,
    image: "./images/yaya.png",
    menuUrl:
      "https://www.yayarestaurant.com/_files/ugd/c2e4f8_29a72d3da0b849019292b428c8047b4f.pdf",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Starving Club",
    location: "35 boulevard Haussmann, 75009 Paris",
    chef: "Thibaut Spiwack",
    rating: 4,
    image: "./images/starving.png",
    menuUrl:
      "https://starvingclub.fr/wp-content/uploads/2024/10/A4-plie-Pasteur-Octobre-2024-V2.pdf",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "MoSugo",
    location: "22 Rue Raymond Losserand, 75014 Paris",
    chef: "Mory Sakho",
    rating: 4,
    image: "./images/mosugo.png",
    menuUrl: "https://mosugo.com/menus/",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Liquide",
    location: "39 Rue de l'Arbre Sec, 75001 Paris",
    chef: "Matthias Marc",
    rating: 4,
    image: "./images/liquide.png",
    menuUrl: "https://www.liquide.paris/la-carte/",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Panade",
    location: "35 Rue Violet, 75015 Paris",
    chef: "Merouan Bounekraf",
    rating: 4,
    image: "./images/panade.png",
    menuUrl: "https://www.panade-paris.fr/#nos-produits",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Restaurant & Bar 19.20",
    location: "33 Av. George V, 75008 Paris",
    chef: "Norbert Tarayre",
    rating: 4,
    image: "./images/19.20.png",
    menuUrl: "https://www.19-20paris.fr/menus",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Pierre Sang",
    location: "55 Rue Oberkampf, 75011 Paris",
    chef: "Pierre Sang",
    rating: 4,
    image: "./images/pierre.png",
    menuUrl: "https://pierresang.com/in-oberkampf/",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Meida",
    location: "93400 Saint-Ouen-sur-Seine",
    chef: "Mohamed Cheikh",
    rating: 4,
    image: "./images/meida.png",
    menuUrl: "https://www.meida.fr/menus-carte/",
    dishes: [
      {
        name: "Macaroni aux truffes et foie gras",
        price: 98,
        images: ["", ""],
      },
      {
        name: "Bar de ligne en croûte d'herbes",
        price: 78,
        images: [""],
      },
      {
        name: "Pigeon aux épices douces",
        price: 88,
        images: ["", ""],
      },
      {
        name: "Soufflé au Grand Marnier",
        price: 35,
        images: [""],
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
            Plongez dans l'univers de la gastronomie à travers mes expériences à
            table dans la capitale comme partout ailleurs
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
