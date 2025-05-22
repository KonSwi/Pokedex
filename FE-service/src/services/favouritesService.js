import { baseUrl } from "./apiService";

export const getFavourites = async () => {
  const res = await fetch(`${baseUrl}/favourites`);
  return await res.json();
};

export const addPokemonToFavourites = async (pokemon) => {
  const res = await fetch(`${baseUrl}/favourites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokemon),
  });
  return await res.json();
};

export const removePokemonFromFavourites = async (id) => {
  await fetch(`${baseUrl}/favourites/${id}`, {
    method: "DELETE",
  });
};
