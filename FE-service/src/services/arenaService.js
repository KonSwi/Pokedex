import { baseUrl } from "./apiService";

export const getArena = async () => {
  const res = await fetch(`${baseUrl}/arena`);
  return await res.json();
};

export const addPokemonToArena = async (pokemon) => {
  const res = await fetch(`${baseUrl}/arena`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokemon),
  });
  return await res.json();
};

export const removePokemonFromArena = async (id) => {
  await fetch(`${baseUrl}/arena/${id}`, {
    method: "DELETE",
  });
};

import { updatePokemonStats } from "./pokemonService";

export const battleResult = async (winner, loser) => {
  try {
    const updatedWinner = {
      wins: (winner.wins || 0) + 1,
      losses: winner.losses || 0,
      base_experience: winner.base_experience + 10,
    };
    const updatedLoser = {
      wins: loser.wins || 0,
      losses: (loser.losses || 0) + 1,
    };

    await updatePokemonStats(winner.id, updatedWinner);
    await updatePokemonStats(loser.id, updatedLoser);
  } catch (error) {
    console.error("❌ Błąd podczas aktualizacji wyników walki:", error);
  }
};
