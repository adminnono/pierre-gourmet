import React, { createContext, useContext, useState, useEffect } from "react";

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  image: string;
  rating: number;
  category: string;
  location: string;
  chef: string;
  totalPerPerson: string;
  dishes: { name: string; price: number; images?: string[] }[];
}

interface FavoritesContextType {
  favorites: Restaurant[];
  toggleFavorite: (restaurant: Restaurant) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (restaurant: Restaurant) => {
    setFavorites((prev) => {
      const isFav = prev.some((r) => r.id === restaurant.id);
      if (isFav) {
        return prev.filter((r) => r.id !== restaurant.id);
      } else {
        return [...prev, restaurant];
      }
    });
  };

  const isFavorite = (id: string) => favorites.some((r) => r.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
