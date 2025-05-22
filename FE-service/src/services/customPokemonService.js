import { baseUrl } from "./apiService";

export const getCustomPokemons = async () => {
  const res = await fetch(`${baseUrl}/customPokemons`);
  return await res.json();
};

export const createPokemon = async (pokemon) => {
  const res = await fetch(`${baseUrl}/customPokemons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokemon),
  });
  return await res.json();
};

export const editPokemon = async (id, updates) => {
  const res = await fetch(`${baseUrl}/customPokemons/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return await res.json();
};
