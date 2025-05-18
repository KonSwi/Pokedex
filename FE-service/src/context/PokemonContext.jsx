import { createContext, useState } from "react";
import { battleResult } from "../services/arenaService";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [arenaPokemons, setArenaPokemons] = useState([]);
  const [fightResult, setFightResult] = useState(null);

  const removePokemonFromArena = (id) => {
    setArenaPokemons((prev) => prev.filter((pokemon) => pokemon.id !== id));
  };

  const resetArena = () => {
    setArenaPokemons([]);
    setFightResult(null);
  };

  const handleFight = async () => {
    if (arenaPokemons.length !== 2) return;

    const [p1, p2] = arenaPokemons;

    const power1 = p1.base_experience * p1.weight;
    const power2 = p2.base_experience * p2.weight;

    if (power1 === power2) {
      setFightResult({ message: "🤝 Remis!", winner: null });
      return;
    }

    const winner = power1 > power2 ? p1 : p2;
    const loser = power1 > power2 ? p2 : p1;

    await battleResult(winner, loser);

    setFightResult({
      message: `${winner.name.toUpperCase()} wygrywa! 🎉`,
      winner: winner.id,
    });
  };

  return (
    <PokemonContext.Provider
      value={{
        arenaPokemons,
        setArenaPokemons,
        removePokemonFromArena,
        resetArena,
        handleFight,
        fightResult,
        setFightResult,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
