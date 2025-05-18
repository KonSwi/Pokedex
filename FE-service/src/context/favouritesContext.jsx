import { createContext, useState, useEffect } from "react";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (pokemon) => {
    if (!favourites.find((fav) => fav.id === pokemon.id)) {
      setFavourites([...favourites, pokemon]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
