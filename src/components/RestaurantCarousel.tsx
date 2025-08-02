import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RestaurantCard from "./RestaurantCard";

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
  totalPerPerson?: string;
}

const restaurantsData: Restaurant[] = [
  {
    id: 1,
    name: "Nonos",
    location: "Hôtel de Crillon, 75008 Paris",
    chef: "Paul Pairet",
    rating: "8,5",
    image: "./images/nonos.png",
    totalPerPerson: "75€",

    menuUrl:
      "https://www.rosewoodhotels.com/fr/hotel-de-crillon/dining/nonos-comestibles-paul-pairet",
    dishes: [
      {
        name: "Les Entrées",
        price: "12 - 22",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "28 - 88",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "14 - 20",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 2,
    name: "Le Coquillage",
    location: "Le Buot, 35350 Saint-Méloir-des-Ondes",
    chef: "Hugo Roellinger",
    rating: "8,5",
    image: "./images/coquillage.png",
    totalPerPerson: "255€",
    menuUrl: "https://www.maisons-de-bricourt.com/fr/page/le-coquillage",
    dishes: [
      {
        name: "Menu Au Gré du Vent et de la Lune",
        price: "255",
        images: ["", ""],
      },
    ],
  },
  {
    id: 2,
    name: "Le Pincemin",
    location: "10 Bd du Roi, 78000 Versailles",
    chef: "Xavier Pincemin",
    rating: "8,5",
    image: "./images/pincemin.jpg",
    totalPerPerson: "115€",
    menuUrl: "https://xavier-pincemin.com/",
    dishes: [
      {
        name: "Menu Midi 4 Temps",
        price: "68",
        images: ["", ""],
      },
      {
        name: "Menu Degustation",
        price: "115",
        images: [""],
      },
      {
        name: "Menu D'exception",
        price: "200",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 3,
    name: "Bonhomie",
    location: "22 Rue d'Enghien, 75010 Paris",
    chef: "Quentin Mauro",
    rating: "8,5",
    image: "./images/bonhomie.png",
    totalPerPerson: "60€",
    menuUrl:
      "https://static1.squarespace.com/static/67226d9329a3160418259d88/t/687a9fbbfbac2f49ce242403/1752866747212/Bonhomie+Menu+semaine+30.pdf",
    dishes: [
      {
        name: "Les Entrées",
        price: "12 - 22",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "12 - 34",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "12 - 15",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 3,
    name: "Ischia",
    location: "14 Rue Cauchy, 75015 Paris",
    chef: "Denny Imbroisi",
    rating: "8,5",
    image: "./images/ischia.png",
    totalPerPerson: "65€",
    menuUrl:
      "https://restaurant-ischia.com/wp-content/uploads/2025/07/A3-PRINT-20250723-Menu_Ischia-exterieur.pdf",
    dishes: [
      {
        name: "Les Entrées",
        price: "13 - 29",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "23 - 38",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "11 - 15",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 3,
    name: "Vive",
    location: "62 Av. des Ternes, 75017 Paris",
    chef: "Stéphanie Le Quellec",
    rating: "8,5",
    image: "./images/vive.png",
    totalPerPerson: "80€",
    menuUrl:
      "https://www.vive-restaurant.com/wp-content/uploads/2025/07/NOUVELLE-CARTE-DEFINITIVE.pdf",
    dishes: [
      {
        name: "Les Entrées",
        price: "13 - 46",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "39 - 60",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "12 - 24",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Ora Farmhouse",
    location: "Parc des Buttes-Chaumont, 75019 Paris",
    chef: "Saayaan",
    rating: "8,5",
    image: "./images/ora.png",
    totalPerPerson: "40€",
    menuUrl: "https://orafarmhouse.com/menus/",
    dishes: [
      {
        name: "Les Entrées",
        price: "8 - 18",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "14 - 26",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "8 - 12",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Monsieur Claude",
    location: "Pl. Line Renaud, 92500 Rueil-Malmaison",
    chef: "Danny Khezzar",
    rating: "8,5",
    image: "./images/claude.png",
    totalPerPerson: "49€",
    menuUrl: "https://www.monsieur-claude.fr/la-carte/",
    dishes: [
      {
        name: "Menu Entréé Plat Dessert",
        price: "49",
        images: ["", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Le Logis Sainte Catherine",
    location: "50170 Mont Saint-Michel",
    chef: "Jean Imbert",
    rating: "8,5",
    image: "./images/logis.png",
    totalPerPerson: "70€",
    menuUrl: "https://lelogissaintecatherine.com/menu",
    dishes: [
      {
        name: "Les Entrées",
        price: "14 - 38",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "22 - 75",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "12 - 14",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Le Bistrot des Chefs",
    location: "29 Quai Gallieni, 92150 Suresnes",
    chef: "Candidat de Top Chef",
    rating: "8,5",
    image: "./images/bistrot.png",
    totalPerPerson: "40€",
    menuUrl: "https://www.lebistrot-des-chefs.fr/la-carte/",
    dishes: [
      {
        name: "Menu des chefs",
        price: "40",
        images: ["", ""],
      },
      {
        name: "Menu Midi",
        price: "25",
        images: [""],
      },
      {
        name: "Menu Enfant",
        price: "19",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Lava",
    location: "9 Rue de la Montagne, 75005 Paris",
    chef: "Wilfried Romain",
    rating: "8,5",
    image: "./images/lava.png",
    totalPerPerson: "30€ le midi",
    menuUrl: "https://www.lava-paris.com/#les-menus",
    dishes: [
      {
        name: "Menu Midi Entrée Plat et Dessert",
        price: "29",
        images: ["", ""],
      },
      {
        name: "Menu Midi Entrée/Plat ou Plat/Dessert",
        price: "24",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "14 - 20",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Quelque part...",
    location: "1 Rue Ambroise Thomas, 75009 Paris",
    chef: "Florian Barbarot",
    rating: "8,5",
    image: "./images/quelquepart.png",
    totalPerPerson: "37€",
    menuUrl: "https://lesabysses.quelquepart.net/le-menu/",
    dishes: [
      {
        name: "Brunch",
        price: "37 - 47",
        images: ["", ""],
      },
      {
        name: "Cakes",
        price: "25",
        images: [""],
      },
      {
        name: "Patisseries",
        price: "8 - 10",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Louis Vuitton",
    location: "2 Rue du Pont Neuf, Paris",
    chef: "Maxime Frédéric",
    rating: "8,5",
    image: "./images/lv.png",
    totalPerPerson: "145 €",
    menuUrl:
      "https://fr.louisvuitton.com/fra-fr/magazine/articles/maxime-frederic-cafe",
    dishes: [
      {
        name: "Les Entrées",
        price: "12 - 22",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "28 - 88",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "14 - 20",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Yaya",
    location: "33 avenue Secretan, 75019 Paris",
    chef: "Juan Arbelaez",
    rating: "8,5",
    image: "./images/yaya.png",
    totalPerPerson: "25€",
    menuUrl:
      "https://www.yayarestaurant.com/_files/ugd/c2e4f8_29a72d3da0b849019292b428c8047b4f.pdf",
    dishes: [
      {
        name: "Les Entrées",
        price: "8 - 13",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "12 - 15",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "7 - 8",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Starving Club",
    location: "35 boulevard Haussmann, 75009 Paris",
    chef: "Thibaut Spiwack",
    rating: "8,5",
    image: "./images/starving.png",
    totalPerPerson: "25€",
    menuUrl:
      "https://starvingclub.fr/wp-content/uploads/2024/10/A4-plie-Pasteur-Octobre-2024-V2.pdf",
    dishes: [
      {
        name: "Les Entrées",
        price: "8 - 13",
        images: ["", ""],
      },
      {
        name: "Les Hots-dogs/Burgers",
        price: "12 - 15",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "7 - 8",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "MoSugo",
    location: "22 Rue Raymond Losserand, 75014 Paris",
    chef: "Mory Sakho",
    rating: "8,5",
    image: "./images/mosugo.png",
    totalPerPerson: "25€",
    menuUrl: "https://mosugo.com/menus/",
    dishes: [
      {
        name: "Les Burgers",
        price: "13",
        images: ["", ""],
      },
      {
        name: "Les Sides",
        price: "6",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "4,5",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Barutzo",
    location: "5 Rue de l'Ancienne Comédie, 75006 Paris",
    chef: "Juan Arbelaez",
    rating: "8,5",
    image: "./images/barutzo.png",
    totalPerPerson: "25€",
    menuUrl:
      "https://www.bazurtorestaurant.com/_files/ugd/b84fb2_d761e24e399046d29a88db7e3e40caa3.pdf",
    dishes: [
      {
        name: "Tapas",
        price: "9 - 15",
        images: ["", ""],
      },
      {
        name: "Plats",
        price: "22 - 29",
        images: [""],
      },
      {
        name: "Desserts",
        price: "12 - 14",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Liquide",
    location: "39 Rue de l'Arbre Sec, 75001 Paris",
    chef: "Matthias Marc",
    rating: "8,5",
    image: "./images/liquide.png",
    totalPerPerson: "60€",
    menuUrl: "https://www.liquide.paris/la-carte/",
    dishes: [
      {
        name: "Les Entrées",
        price: "9 - 18",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "26 - 34",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "12 - 16",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Panade",
    location: "35 Rue Violet, 75015 Paris",
    chef: "Merouan Bounekraf",
    rating: "8,5",
    image: "./images/panade.png",
    totalPerPerson: "10€",
    menuUrl: "https://www.panade-paris.fr/#nos-produits",
    dishes: [
      {
        name: "Viennoiseries",
        price: "2 - 3",
        images: ["", ""],
      },
      {
        name: "Patisseries",
        price: "6 - 8",
        images: [""],
      },
    ],
  },
  {
    id: 4,
    name: "Restaurant & Bar 19.20",
    location: "33 Av. George V, 75008 Paris",
    chef: "Norbert Tarayre",
    rating: "8,5",
    image: "./images/19.20.png",
    totalPerPerson: "90€",
    menuUrl: "https://www.19-20paris.fr/menus",
    dishes: [
      {
        name: "Les Entrées",
        price: "18 - 23",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "40 - 60",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "16 - 19",
        images: ["", "", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Pierre Sang",
    location: "55 Rue Oberkampf, 75011 Paris",
    chef: "Pierre Sang",
    rating: "8,5",
    image: "./images/pierre.png",
    totalPerPerson: "48€",
    menuUrl: "https://pierresang.com/in-oberkampf/",
    dishes: [
      {
        name: "Menu en 6 temps : Entrées, Plat, Fromage, Dessert (hors boissons)",
        price: "48",
        images: ["", ""],
      },
    ],
  },
  {
    id: 4,
    name: "Meida",
    location: "93400 Saint-Ouen-sur-Seine",
    chef: "Mohamed Cheikh",
    rating: "8,5",
    image: "./images/meida.png",
    totalPerPerson: "50€",
    menuUrl: "https://www.meida.fr/menus-carte/",
    dishes: [
      {
        name: "Les Entrées",
        price: "7 - 15",
        images: ["", ""],
      },
      {
        name: "Les Plats",
        price: "19 - 25",
        images: [""],
      },
      {
        name: "Les Desserts",
        price: "8 - 12",
        images: ["", "", ""],
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
