import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom"; // ✅ Import du Link

import {
  Search,
  Filter,
  Star,
  MapPin,
  ChefHat,
  UtensilsCrossed,
  ArrowUpDown,
} from "lucide-react";
import RestaurantDetail from "./RestaurantDetail";

interface Dish {
  name: string;
  price: string;
  images: string[];
}

interface Restaurant {
  id: number;
  name: string;
  slug: string;
  location: string;
  chef: string;
  rating: string;
  image: string;
  dishes: Dish[];
  menuUrl?: string;
  siteWeb?: string;
  instaLink?: string;
  totalPerPerson?: string;
  category: string;
  phone?: string;
  hours?: string;
  map: string;
  mapUrl: string;
}

export const restaurantsData: Restaurant[] = [
  {
    id: 1,
    name: "Nonos",
    slug: "nonos",
    location: "Hôtel de Crillon, 75008 Paris",
    chef: "Paul Pairet",
    rating: "8",
    image: "/images/n.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.500344110035!2d2.3188125768672205!3d48.86773760004812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fbf498f1b3d%3A0x406079efd5edb708!2sNonos%20%26%20Comestibles%20par%20Paul%20Pairet!5e0!3m2!1sfr!2sfr!4v1754646548947!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Nonos+%26+Comestibles+par+Paul+Pairet/@48.8677376,2.3188126,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66fbf498f1b3d:0x406079efd5edb708!8m2!3d48.8677341!4d2.3213875!16s%2Fg%2F11sdzz128l?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "75€",
    category: "gastronomique",
    menuUrl:
      "https://www.rosewoodhotels.com/fr/hotel-de-crillon/dining/nonos-comestibles-paul-pairet",
    siteWeb:
      "https://www.rosewoodhotels.com/fr/hotel-de-crillon/dining/nonos-comestibles-paul-pairet",
    instaLink: "https://www.instagram.com/nonosetcomestibles.pp/",
    phone: "01 44 71 15 17",
    hours: "12h00 - 14h30, 19h00 - 22h30",
    dishes: [
      { name: "Les Entrées", price: "12 - 22", images: ["", ""] },
      { name: "Les Plats", price: "28 - 88", images: [""] },
      { name: "Les Desserts", price: "14 - 20", images: ["", "", ""] },
    ],
  },
  {
    id: 2,
    name: "Le Coquillage",
    slug: "le-coquillage",
    location: "Le Buot, 35350 Saint-Méloir-des-Ondes",
    chef: "Hugo Roellinger",
    rating: "9,5",
    image: "/images/coquillage.webp",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2636.2641245656673!2d-1.873742223142484!3d48.64306221583525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480e9dbb304006f9%3A0x3535363afa06f870!2sLe%20Coquillage!5e0!3m2!1sfr!2sfr!4v1754646594354!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Le+Coquillage/@48.6430622,-1.8737422,17z/data=!3m1!4b1!4m6!3m5!1s0x480e9dbb304006f9:0x3535363afa06f870!8m2!3d48.6430587!4d-1.8711673!16s%2Fg%2F1tfd6c8t?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "255€",
    category: "gastronomique",
    menuUrl: "https://www.maisons-de-bricourt.com/fr/page/le-coquillage",
    siteWeb: "https://www.maisons-de-bricourt.com/fr/page/le-coquillage",
    instaLink: "https://www.instagram.com/hugoroellinger/",
    phone: "02 99 89 64 76",
    hours: "12h00 - 13h00, 19h30 - 20h15",
    dishes: [
      {
        name: "Menu Au Gré du Vent et de la Lune",
        price: "255",
        images: ["", ""],
      },
    ],
  },
  {
    id: 3,
    name: "Le Pincemin",
    slug: "le-pincemin",
    location: "10 Bd du Roi, 78000 Versailles",
    chef: "Xavier Pincemin",
    rating: "8,5",
    image: "/images/p.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.5009917205493!2d2.12384427686475!3d48.81050180407482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67df2090ce2ad%3A0x387118c7ab0b8032!2sLe%20Pincemin!5e0!3m2!1sfr!2sfr!4v1754646639237!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Le+Pincemin/@48.8105018,2.1238443,17z/data=!3m1!4b1!4m6!3m5!1s0x47e67df2090ce2ad:0x387118c7ab0b8032!8m2!3d48.8104983!4d2.1264192!16s%2Fg%2F11hyt70fsl?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "115€",
    category: "gastronomique",
    menuUrl: "https://xavier-pincemin.com/",
    siteWeb: "https://xavier-pincemin.com/",
    instaLink: "https://www.instagram.com/lepincemin_restaurant/",
    phone: "09 83 50 29 64",
    hours: "12h00 - 14h30, 19h30 - 23h30",
    dishes: [
      { name: "Menu Midi 4 Temps", price: "68", images: ["", ""] },
      { name: "Menu Degustation", price: "115", images: [""] },
      { name: "Menu D'exception", price: "200", images: ["", "", ""] },
    ],
  },
  {
    id: 4,
    name: "Bonhomie",
    slug: "bonhomie",
    location: "22 Rue d'Enghien, 75010 Paris",
    chef: "Quentin Mauro",
    rating: "9",
    image: "/images/b.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2746003010056!2d2.34630329253868!3d48.87204152584027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1409308f43%3A0x1ae3ff3c2e1ba5bf!2sBonhomie%20-%20Bar%20%26%20Restaurant!5e0!3m2!1sfr!2sfr!4v1754646689264!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Bonhomie+-+Bar+%26+Restaurant/@48.8720416,2.3485993,16z/data=!3m1!4b1!4m6!3m5!1s0x47e66e1409308f43:0x1ae3ff3c2e1ba5bf!8m2!3d48.8720381!4d2.3511742!16s%2Fg%2F11cs01r1r8?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "60€",
    category: "créative",
    menuUrl:
      "https://static1.squarespace.com/static/67226d9329a3160418259d88/t/687a9fbbfbac2f49ce242403/1752866747212/Bonhomie+Menu+semaine+30.pdf",
    siteWeb: "https://www.bonhomieparis.com/",
    instaLink: "https://www.instagram.com/bonhomieparis/?hl=fr",
    phone: "09 82 23 17 40",
    hours: "Ouvert du mardi au samedi de 19h à 22h30",
    dishes: [
      { name: "Les Entrées", price: "12 - 22", images: ["", ""] },
      { name: "Les Plats", price: "12 - 34", images: [""] },
      { name: "Les Desserts", price: "12 - 15", images: ["", "", ""] },
    ],
  },
  {
    id: 5,
    name: "Ischia",
    slug: "ischia",
    location: "14 Rue Cauchy, 75015 Paris",
    chef: "Denny Imbroisi",
    rating: "7,5",
    image: "/images/i.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.801005193511!2d2.2732351768661454!3d48.84293430179351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67b13e51d3557%3A0x15475f36a755407!2sIschia%20par%20Denny%20imbroisi!5e0!3m2!1sfr!2sfr!4v1754645703721!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Ischia+par+Denny+imbroisi/@48.8429343,2.2732352,17z/data=!3m1!4b1!4m6!3m5!1s0x47e67b13e51d3557:0x15475f36a755407!8m2!3d48.8429308!4d2.2758101!16s%2Fg%2F11w_h64p8k?entry=ttu&g_ep=EgoyMDI1MDgwNS4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "65€",
    category: "cuisine du monde",
    menuUrl:
      "https://restaurant-ischia.com/wp-content/uploads/2025/07/A3-PRINT-20250723-Menu_Ischia-exterieur.pdf",
    siteWeb: "https://restaurant-ischia.com/",
    instaLink: "https://www.instagram.com/ischia_dennyimbroisi/",
    phone: "01 45 54 43 43",
    hours: "12h00 - 14h30, 19h00 - 22h30",
    dishes: [
      { name: "Les Entrées", price: "13 - 29", images: ["", ""] },
      { name: "Les Plats", price: "23 - 38", images: [""] },
      { name: "Les Desserts", price: "11 - 15", images: ["", "", ""] },
    ],
  },
  {
    id: 6,
    name: "Vive",
    slug: "vive",
    location: "62 Av. des Ternes, 75017 Paris",
    chef: "Stéphanie Le Quellec",
    rating: "7",
    image: "/images/v.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5247.771875229789!2d2.2869151925409357!3d48.879450925321606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fe1ae19bc0d%3A0x3557c3e3f2bc1c50!2sVive%20Restaurant!5e0!3m2!1sfr!2sfr!4v1754646439097!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Vive+Restaurant/@48.879451,2.2892112,16z/data=!3m1!4b1!4m6!3m5!1s0x47e66fe1ae19bc0d:0x3557c3e3f2bc1c50!8m2!3d48.8794475!4d2.2917861!16s%2Fg%2F11s2j080v7?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "80€",
    category: "gastronomique",
    menuUrl:
      "https://www.vive-restaurant.com/wp-content/uploads/2025/07/NOUVELLE-CARTE-DEFINITIVE.pdf",
    siteWeb: "https://www.vive-restaurant.com/",
    instaLink: "https://www.instagram.com/vive_restaurant/?hl=fr",
    phone: "01 42 94 07 90",
    hours: "12h00 - 13h30, 19h00 - 21h30",
    dishes: [
      { name: "Les Entrées", price: "13 - 46", images: ["", ""] },
      { name: "Les Plats", price: "39 - 60", images: [""] },
      { name: "Les Desserts", price: "12 - 24", images: ["", "", ""] },
    ],
  },
  {
    id: 7,
    name: "Ora Farmhouse",
    slug: "ora-farmhouse",
    location: "Parc des Buttes-Chaumont, 75019 Paris",
    chef: "Saayaan",
    rating: "3",
    image: "/images/o.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.817044791772!2d2.3783955768677685!3d48.8807641991311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d849a059edb%3A0x5eb79d2c1a4e97e3!2sOra%20Farmhouse%20-%20Pavillon%20du%20Lac!5e0!3m2!1sfr!2sfr!4v1754646723121!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Ora+Farmhouse+-+Pavillon+du+Lac/@48.8807642,2.3783956,17z/data=!3m2!4b1!5s0x47e66dc4ae4f6b4f:0x9970036fdc2f334a!4m6!3m5!1s0x47e66d849a059edb:0x5eb79d2c1a4e97e3!8m2!3d48.8807607!4d2.3809705!16s%2Fg%2F11y4tk75c0?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "40€",
    category: "créative",
    menuUrl: "https://orafarmhouse.com/menus/",
    siteWeb: "https://orafarmhouse.com/",
    instaLink: "https://www.instagram.com/orafarmhouse/?hl=fr",
    phone: "06 79 88 66 99",
    hours: "12h00 - 15h00, 19h00 - 02h00",
    dishes: [
      { name: "Les Entrées", price: "8 - 18", images: ["", ""] },
      { name: "Les Plats", price: "14 - 26", images: [""] },
      { name: "Les Desserts", price: "8 - 12", images: ["", "", ""] },
    ],
  },
  {
    id: 8,
    name: "Monsieur Claude",
    slug: "monsieur-claude",
    location: "Pl. Line Renaud, 92500 Rueil-Malmaison",
    chef: "Danny Khezzar",
    rating: "7,5",
    image: "/images/danny.webp",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.1996673686567!2d2.196646676867459!3d48.873470099644614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6650023910df9%3A0xd9fd07d0c693eeb7!2sMonsieur%20Claude!5e0!3m2!1sfr!2sfr!4v1754646840682!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Monsieur+Claude/@48.8734701,2.1966467,16z/data=!3m1!4b1!4m6!3m5!1s0x47e6650023910df9:0xd9fd07d0c693eeb7!8m2!3d48.8734666!4d2.1992216!16s%2Fg%2F11wbkgtptz?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "49€",
    category: "traditionnelle",
    menuUrl: "https://www.monsieur-claude.fr/la-carte/",
    siteWeb: "https://www.monsieur-claude.fr/",
    instaLink: "https://www.instagram.com/monsieurclaude_bistrot/",
    phone: "01 30 55 24 62",
    hours: "Ouvert du mardi au samedi de 19h00 à 00h00",
    dishes: [
      { name: "Menu Entréé Plat Dessert", price: "49", images: ["", ""] },
    ],
  },
  {
    id: 9,
    name: "Le Logis Sainte Catherine",
    slug: "le-logis-sainte-catherine",
    location: "50170 Mont Saint-Michel",
    chef: "Jean Imbert",
    rating: "7,5",
    image: "/images/logis.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2636.6533071810723!2d-1.5138664231428047!3d48.6356160163576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480ea8d6f4f4a1e5%3A0x37df908ab08696f0!2sLogis%20Sainte-Catherine%2C%2050170%20Le%20Mont-Saint-Michel!5e0!3m2!1sfr!2sfr!4v1754646873847!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Logis+Sainte-Catherine,+50170+Le+Mont-Saint-Michel/@48.635616,-1.5138664,17z/data=!3m1!4b1!4m6!3m5!1s0x480ea8d6f4f4a1e5:0x37df908ab08696f0!8m2!3d48.6356125!4d-1.5112915!16s%2Fg%2F1th0m8vt?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "70€",
    category: "traditionnelle",
    menuUrl: "https://lelogissaintecatherine.com/menu",
    siteWeb: "https://lelogissaintecatherine.com/",
    instaLink: "https://www.instagram.com/lelogissaintecatherine/?hl=fr",
    phone: "02 33 89 14 45",
    hours: "Ouvert du lundi au dimanche au diner",
    dishes: [
      { name: "Les Entrées", price: "14 - 38", images: ["", ""] },
      { name: "Les Plats", price: "22 - 75", images: [""] },
      { name: "Les Desserts", price: "12 - 14", images: ["", "", ""] },
    ],
  },
  {
    id: 10,
    name: "Le Bistrot des Chefs",
    slug: "le-bistrot-des-chefs",
    location: "29 Quai Gallieni, 92150 Suresnes",
    chef: "Candidat de Top Chef",
    rating: "7",
    image: "/images/bistrot.webp",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.263885629654!2d2.230649076867421!3d48.87224579973076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6656d3f33f58d%3A0x88e1548ce379bcaf!2sLe%20Bistrot%20Des%20Chefs!5e0!3m2!1sfr!2sfr!4v1754646923743!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Le+Bistrot+Des+Chefs/@48.8722458,2.2306491,17z/data=!3m2!4b1!5s0x47e664d899694a51:0x15f134e372bf23c5!4m6!3m5!1s0x47e6656d3f33f58d:0x88e1548ce379bcaf!8m2!3d48.8722423!4d2.233224!16s%2Fg%2F11t2z0jkgz?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "40€",
    category: "traditionnelle",
    menuUrl: "https://www.lebistrot-des-chefs.fr/la-carte/",
    siteWeb: "https://www.lebistrot-des-chefs.fr/",
    instaLink: "https://www.instagram.com/le_bistrot_des_chefs/",
    phone: "01 41 44 77 80",
    hours: "12h00 - 14h30, 19h00 - 22h30",
    dishes: [
      { name: "Menu des chefs", price: "40", images: ["", ""] },
      { name: "Menu Midi", price: "25", images: [""] },
      { name: "Menu Enfant", price: "19", images: ["", "", ""] },
    ],
  },
  {
    id: 11,
    name: "Lava",
    slug: "lava",
    location: "9 Rue de la Montagne, 75005 Paris",
    chef: "Wilfried Romain",
    rating: "7",
    image: "/images/lava.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.479169727975!2d2.3463020768663903!3d48.84907250136165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671e6857aa9b3%3A0xba2276aa85c8a78c!2sRestaurant%20LAVA!5e0!3m2!1sfr!2sfr!4v1754646980188!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Restaurant+LAVA/@48.8490725,2.3463021,16z/data=!3m1!4b1!4m6!3m5!1s0x47e671e6857aa9b3:0xba2276aa85c8a78c!8m2!3d48.849069!4d2.348877!16s%2Fg%2F1ttyw1f6?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "30€ le midi",
    category: "créative",
    menuUrl: "https://www.lava-paris.com/#les-menus",
    siteWeb: "https://www.lava-paris.com/",
    instaLink: "https://www.instagram.com/lava__paris/?hl=fr",
    phone: "01 43 29 12 12",
    hours: "12h00 - 14h30, 18h30 - 00h00",
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
      { name: "Les Desserts", price: "14 - 20", images: ["", "", ""] },
    ],
  },
  {
    id: 12,
    name: "Quelque part...",
    slug: "quelque-part",
    location: "1 Rue Ambroise Thomas, 75009 Paris",
    chef: "Florian Barbarot",
    rating: "6,5",
    image: "/images/qp.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.159445764766!2d2.344583776867479!3d48.874236899590635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc99fa0daa5%3A0xf982892def572a9b!2sRestaurant%20Quelque%20part...!5e0!3m2!1sfr!2sfr!4v1754647019887!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Restaurant+Quelque+part.../@48.8742369,2.3445838,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66fc99fa0daa5:0xf982892def572a9b!8m2!3d48.8742334!4d2.3471587!16s%2Fg%2F11q3llbcjk?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "37€",
    category: "patisserie",
    menuUrl: "https://lesabysses.quelquepart.net/le-menu/",
    siteWeb: "https://lesabysses.quelquepart.net/",
    instaLink: "https://www.instagram.com/restaurant_quelque_part/?hl=fr",
    phone: "01 83 97 22 65",
    hours: "Ouvert du mercredi au dimanche de 19h15 à 21h45",
    dishes: [
      { name: "Brunch", price: "37 - 47", images: ["", ""] },
      { name: "Cakes", price: "25", images: [""] },
      { name: "Patisseries", price: "8 - 10", images: ["", "", ""] },
    ],
  },
  {
    id: 13,
    name: "Café Louis Vuitton",
    slug: "cafe-louis-vuitton",
    location: "2 Rue du Pont Neuf, Paris",
    chef: "Maxime Frédéric",
    rating: "7",
    image: "/images/lv.webp",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5249.972781817498!2d2.34065587686679!3d48.85846990070033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fe1ae4cae33%3A0xfe7b74b11cc10c95!2sMaxime%20Fr%C3%A9d%C3%A9ric%20at%20Louis%20Vuitton!5e0!3m2!1sfr!2sfr!4v1754647073949!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Maxime+Fr%C3%A9d%C3%A9ric+at+Louis+Vuitton/@48.8584699,2.3406559,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66fe1ae4cae33:0xfe7b74b11cc10c95!8m2!3d48.8584664!4d2.3432308!16s%2Fg%2F11kbs7pxg7?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "145 €",
    category: "gastronomique",
    menuUrl:
      "https://fr.louisvuitton.com/fra-fr/magazine/articles/maxime-frederic-cafe",
    siteWeb:
      "https://fr.louisvuitton.com/fra-fr/magazine/articles/maxime-frederic-cafe",
    instaLink: "https://www.instagram.com/maxime.frederic/?hl=fr",
    phone: "09 77 40 40 77",
    hours: "Ouvert tous les jours de 11h à 19h",
    dishes: [
      { name: "Les Entrées", price: "12 - 22", images: ["", ""] },
      { name: "Les Plats", price: "28 - 88", images: [""] },
      { name: "Les Desserts", price: "14 - 20", images: ["", "", ""] },
    ],
  },
  {
    id: 14,
    name: "Yaya",
    slug: "yaya",
    location: "33 avenue Secretan, 75019 Paris",
    chef: "Juan Arbelaez",
    rating: "6",
    image: "/images/y.webp",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5247.592927106075!2d2.3689802925414325!3d48.881156525201995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dae05052ac9%3A0xc265757956ac0acc!2sYaya%20Secr%C3%A9tan%20-%20Restaurant%20m%C3%A9diterran%C3%A9en%20%26%20terrasse%20par%20Juan%20Arbelaez!5e0!3m2!1sfr!2sfr!4v1754647123729!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Yaya+Secr%C3%A9tan+-+Restaurant+m%C3%A9diterran%C3%A9en+%26+terrasse+par+Juan+Arbelaez/@48.8811566,2.3712763,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66dae05052ac9:0xc265757956ac0acc!8m2!3d48.8811531!4d2.3738512!16s%2Fg%2F11gy9_p5nh?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "25€",
    category: "cuisine du monde",
    menuUrl:
      "https://www.yayarestaurant.com/_files/ugd/c2e4f8_29a72d3da0b849019292b428c8047b4f.pdf",
    siteWeb: "https://www.yayarestaurant.com/",
    instaLink: "https://www.instagram.com/yayarestaurant/?hl=fr",
    phone: "01 42 41 12 86",
    hours:
      "Ouvert du mardi au mercredi de 12h à 14h et du jeudi au dimanche de 19h à 2h ",
    dishes: [
      { name: "Les Entrées", price: "8 - 13", images: ["", ""] },
      { name: "Les Plats", price: "12 - 15", images: [""] },
      { name: "Les Desserts", price: "7 - 8", images: ["", "", ""] },
    ],
  },
  {
    id: 15,
    name: "Starving Club",
    slug: "starving-club",
    location: "35 boulevard Haussmann, 75009 Paris",
    chef: "Thibaut Spiwack",
    rating: "5,5",
    image: "/images/sc.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41980.696373051396!2d2.3329307810335367!3d48.881212572742776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fa27a3dab09%3A0xa5233759595f32d3!2sStarving%20Club%20Galeries%20Lafayette%20Gourmet!5e0!3m2!1sfr!2sfr!4v1754647208610!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Starving+Club+Galeries+Lafayette+Gourmet/@48.8731129,2.3275942,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66fa27a3dab09:0xa5233759595f32d3!8m2!3d48.8731094!4d2.3301691!16s%2Fg%2F11jt84j8s5?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "25€",
    category: "créative",
    menuUrl:
      "https://starvingclub.fr/wp-content/uploads/2024/10/A4-plie-Pasteur-Octobre-2024-V2.pdf",
    siteWeb: "https://starvingclub.fr/",
    instaLink: "https://www.instagram.com/starving.club/?hl=fr",
    phone: "01 42 82 82 12",
    hours:
      "Ouvert du lundi au samedi de 9h30 à 23h00 et le dimanche de 11h00 à 20h00",
    dishes: [
      { name: "Les Entrées", price: "8 - 13", images: ["", ""] },
      { name: "Les Hots-dogs/Burgers", price: "12 - 15", images: [""] },
      { name: "Les Desserts", price: "7 - 8", images: ["", "", ""] },
    ],
  },
  {
    id: 16,
    name: "MoSugo",
    slug: "mosugo",
    location: "22 Rue Raymond Losserand, 75014 Paris",
    chef: "Mory Sakho",
    rating: "6",
    image: "/images/mosugo.webp",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42018.838979689994!2d2.245033348632803!3d48.835754100000024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6713d2deb84dd%3A0xaf26acc1d6ee3c4d!2sMOSUGO%20PARIS%2014%20PAR%20MORY%20SACKO!5e0!3m2!1sfr!2sfr!4v1754647254655!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Mosugo+Galeries+Lafayette+Par+Mory+Sacko/@48.8731572,2.3278303,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66fc4b5e541fb:0x1be16502c22abc02!8m2!3d48.8731537!4d2.3304052!16s%2Fg%2F11td01sfk9?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "25€",
    category: "créative",
    menuUrl: "https://mosugo.com/menus/",
    siteWeb: "https://mosugo.com/",
    instaLink: "https://www.instagram.com/mosugo/",
    phone: "09 82 55 83 72",
    hours: "Ouvert du mardi au dimanche de 12h à 14h30 et de 19h à 22h",
    dishes: [
      { name: "Les Burgers", price: "13", images: ["", ""] },
      { name: "Les Sides", price: "6", images: [""] },
      { name: "Les Desserts", price: "4,5", images: ["", "", ""] },
    ],
  },
  {
    id: 17,
    name: "Barutzo",
    slug: "barutzo",
    location: "5 Rue de l'Ancienne Comédie, 75006 Paris",
    chef: "Juan Arbelaez",
    rating: "8",
    image: "/images/b.webp",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.2546241694877!2d2.336114276866583!3d48.85335480106024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671c4d68a9bdf%3A0x262fd10028af03e8!2sBazurto%20par%20Juan%20Arbelaez%20-%20Bar%20%C3%A0%20tapas%20festif!5e0!3m2!1sfr!2sfr!4v1754647318943!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Bazurto+par+Juan+Arbelaez+-+Bar+%C3%A0+tapas+festif/@48.8533548,2.3361143,17z/data=!3m2!4b1!5s0x47e671e2330c7b47:0x68fdd38ea4540029!4m6!3m5!1s0x47e671c4d68a9bdf:0x262fd10028af03e8!8m2!3d48.8533513!4d2.3386892!16s%2Fg%2F11hrxdbnzq?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "25€",
    category: "cuisine du monde",
    menuUrl:
      "https://www.bazurtorestaurant.com/_files/ugd/b84fb2_d761e24e399046d29a88db7e3e40caa3.pdf",
    siteWeb: "https://www.bazurtorestaurant.com",
    instaLink: "https://www.instagram.com/bazurto.restaurant/?hl=fr",
    phone: "09 73 05 26 31",
    hours: "Ouvert du lundi au samedi de 18h à 2h",
    dishes: [
      { name: "Tapas", price: "9 - 15", images: ["", ""] },
      { name: "Plats", price: "22 - 29", images: [""] },
      { name: "Desserts", price: "12 - 14", images: ["", "", ""] },
    ],
  },
  {
    id: 18,
    name: "Liquide",
    slug: "liquide",
    location: "39 Rue de l'Arbre Sec, 75001 Paris",
    chef: "Matthias Marc",
    rating: "8,5",
    image: "/images/l.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.8546657259108!2d2.339760076866933!3d48.8609817005237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc2bef34321%3A0x1cc6e6b2f7288c39!2sLiquide!5e0!3m2!1sfr!2sfr!4v1754647359638!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Liquide/@48.8609817,2.3397601,16z/data=!3m1!4b1!4m6!3m5!1s0x47e66fc2bef34321:0x1cc6e6b2f7288c39!8m2!3d48.8609782!4d2.342335!16s%2Fg%2F11q1m7mvkz?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "60€",
    category: "créative",
    menuUrl: "https://www.liquide.paris/la-carte/",
    siteWeb: "https://www.liquide.paris",
    instaLink: "https://www.instagram.com/liquideparis/",
    phone: "01 42 36 50 05",
    hours: "Ouvert du mardi au samedi de 12h à 21h30",
    dishes: [
      { name: "Les Entrées", price: "9 - 18", images: ["", ""] },
      { name: "Les Plats", price: "26 - 34", images: [""] },
      { name: "Les Desserts", price: "12 - 16", images: ["", "", ""] },
    ],
  },
  {
    id: 19,
    name: "Panade",
    slug: "panade",
    location: "35 Rue Violet, 75015 Paris",
    chef: "Merouan Bounekraf",
    rating: "7",
    image: "/images/panade.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.542089982237!2d2.290894076866334!3d48.847872501446055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6713741ee0f91%3A0xc869e576efa0b293!2sPANADE!5e0!3m2!1sfr!2sfr!4v1754647396803!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/PANADE/@48.8478725,2.2908941,17z/data=!3m1!4b1!4m6!3m5!1s0x47e6713741ee0f91:0xc869e576efa0b293!8m2!3d48.847869!4d2.293469!16s%2Fg%2F11rck3x5ln?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "10€",
    category: "patisserie",
    menuUrl: "https://www.panade-paris.fr/#nos-produits",
    siteWeb: "https://www.panade-paris.fr",
    instaLink: "https://www.instagram.com/panade_paris/?hl=fr",
    phone: "01 42 65 73 02",
    hours: "Ouvert du mardi au dimanche de 8h à 19h30",
    dishes: [
      { name: "Viennoiseries", price: "2 - 3", images: ["", ""] },
      { name: "Patisseries", price: "6 - 8", images: [""] },
    ],
  },
  {
    id: 20,
    name: "Restaurant & Bar 19.20",
    slug: "restaurant-&-bar-19.20",
    location: "33 Av. George V, 75008 Paris",
    chef: "Norbert Tarayre",
    rating: "8",
    image: "/images/1920.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.426447990891!2d2.2980829768672395!3d48.86914649994886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f9899e8f021%3A0x62007711c0bd471a!2sRestaurant%20%26%20Bar%2019.20%20by%20Norbert%20Tarayre!5e0!3m2!1sfr!2sfr!4v1754696374167!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Restaurant+%26+Bar+19.20+by+Norbert+Tarayre/@48.8691465,2.298083,17z/data=!3m2!4b1!5s0x47e66fe82849f985:0x8cf35a0de129bf95!4m6!3m5!1s0x47e66f9899e8f021:0x62007711c0bd471a!8m2!3d48.869143!4d2.3006579!16s%2Fg%2F11kxkcgy0f?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "90€",
    category: "gastronomique",
    menuUrl: "https://www.19-20paris.fr/menus",
    siteWeb: "https://www.19-20paris.fr/",
    instaLink: "https://www.instagram.com/19.20.paris/",
    phone: "01 53 23 78 50",
    hours: "Ouvert tous les jours de 8h30 à 00h30",
    dishes: [
      { name: "Les Entrées", price: "18 - 23", images: ["", ""] },
      { name: "Les Plats", price: "40 - 60", images: [""] },
      { name: "Les Desserts", price: "16 - 19", images: ["", "", ""] },
    ],
  },
  {
    id: 21,
    name: "Pierre Sang",
    slug: "pierre-sang",
    location: "55 Rue Oberkampf, 75011 Paris",
    chef: "Pierre Sang",
    rating: "9",
    image: "/images/ps.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5249.3145670479!2d2.3697825768670784!3d48.86474530025865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dfcc1fdf165%3A0x259b2c0420efb705!2sPierre%20Sang!5e0!3m2!1sfr!2sfr!4v1754647488201!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Pierre+Sang/@48.8647453,2.3697826,16z/data=!3m1!4b1!4m6!3m5!1s0x47e66dfcc1fdf165:0x259b2c0420efb705!8m2!3d48.8647418!4d2.3723575!16s%2Fg%2F11ycqv0j5?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "48€",
    category: "cuisine du monde",
    menuUrl: "https://pierresang.com/in-oberkampf/",
    siteWeb: "https://pierresang.com/",
    instaLink:
      "https://www.instagram.com/explore/locations/934872996844251/pierre-sang-oberkampf/",
    phone: "09 67 31 96 80",
    hours:
      "Ouvert du lundi au dimanche, au déjeuner – de 12h à 14h15et du lundi au dimanche, au dîner – 2 services : 19h et 21h30",
    dishes: [
      {
        name: "Menu en 6 temps : Entrées, Plat, Fromage, Dessert (hors boissons)",
        price: "48",
        images: ["", ""],
      },
    ],
  },
  {
    id: 22,
    name: "Meida",
    slug: "meida",
    location: "93400 Saint-Ouen-sur-Seine",
    chef: "Mohamed Cheikh",
    rating: "7,5",
    image: "/images/m.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.1857337367746!2d2.330631676869127!3d48.91185349694217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f2faff41673%3A0xe14f00f25e26b60c!2zTWXDr2Rh!5e0!3m2!1sfr!2sfr!4v1754647537809!5m2!1sfr!2sfr",
    mapUrl:
      "https://www.google.com/maps/place/Me%C3%AFda/@48.9118535,2.3306317,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66f2faff41673:0xe14f00f25e26b60c!8m2!3d48.91185!4d2.3332066!16s%2Fg%2F11vzy3fw68?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    totalPerPerson: "50€",
    category: "cuisine du monde",
    menuUrl: "https://www.meida.fr/menus-carte/",
    siteWeb: "https://www.meida.fr/",
    instaLink: "https://www.instagram.com/meida.so/?hl=fr",
    phone: "01 77 37 85 33",
    hours: "Ouvert tous les jours de 12h à 00h00",
    dishes: [
      { name: "Les Entrées", price: "7 - 15", images: ["", ""] },
      { name: "Les Plats", price: "19 - 25", images: [""] },
      { name: "Les Desserts", price: "8 - 12", images: ["", "", ""] },
    ],
  },
];

const categories = [
  { id: "all", label: "Tous", color: "bg-gray-100 text-gray-800" },
  {
    id: "gastronomique",
    label: "Gastronomique",
    color: "bg-amber-100 text-amber-800",
  },
  { id: "créative", label: "Créative", color: "bg-purple-100 text-purple-800" },
  {
    id: "traditionnelle",
    label: "Traditionnelle",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "cuisine du monde",
    label: "Cuisine du Monde",
    color: "bg-green-100 text-green-800",
  },
  { id: "patisserie", label: "Pâtisserie", color: "bg-pink-100 text-pink-800" },
];

const RestaurantGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortByRating, setSortByRating] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurantsData.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.chef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || restaurant.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Tri par note si activé
    if (sortByRating) {
      filtered = filtered.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortByRating]);

  const handleBackToGrid = () => {
    setSelectedRestaurant(null);
  };

  // Si un restaurant est sélectionné, afficher sa page détaillée
  if (selectedRestaurant) {
    return (
      <RestaurantDetail
        restaurant={selectedRestaurant}
        onBack={handleBackToGrid}
      />
    );
  }

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Mes Découvertes Gastronomiques
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Plongez dans l'univers de la gastronomie à travers mes expériences à
            table dans la capitale comme partout ailleurs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un restaurant, chef, lieu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Catégories</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? category.color + " shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Sort Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setSortByRating(!sortByRating)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                sortByRating
                  ? "bg-amber-100 text-amber-800 shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>{sortByRating ? "Trié par note ↓" : "Trier par note"}</span>
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredRestaurants.length} restaurant
            {filteredRestaurants.length > 1 ? "s" : ""} trouvé
            {filteredRestaurants.length > 1 ? "s" : ""}
            {sortByRating && (
              <span className="text-amber-600 ml-2">(triés par note)</span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/carnet-de-tables/${restaurant.slug}`} // ✅ URL dynamique
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

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      categories.find((c) => c.id === restaurant.category)
                        ?.color || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {categories.find((c) => c.id === restaurant.category)
                      ?.label || restaurant.category}
                  </span>
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
                    {restaurant.totalPerPerson}
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

        {/* No Results */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun restaurant trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche ou de filtrage
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantGrid;
