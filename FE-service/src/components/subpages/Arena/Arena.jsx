import { useContext, useState } from "react";
import ArenaCard from "./ArenaCard";
import { PokemonContext } from "../../../context/PokemonContext";
import {
  updatePokemonStats,
  doesPokemonExist,
} from "../../../services/pokemonService";
import styles from "./Arena.module.css";

const Arena = () => {
  const {
    arenaPokemons,
    setArenaPokemons,
    resetArena,
    removePokemonFromArena,
    setFightResult,
    fightResult,
  } = useContext(PokemonContext);

  const [winnerId, setWinnerId] = useState(null);

  const isReadyToFight = arenaPokemons.length === 2;

  const handleRemove = (id) => {
    removePokemonFromArena(id);
    setFightResult(null);
    setWinnerId(null);
  };

  const handleFight = async () => {
    const [first, second] = arenaPokemons;

    const firstScore = first.base_experience * first.weight;
    const secondScore = second.base_experience * second.weight;

    let winner = null;
    let loser = null;
    let message = "";

    if (firstScore > secondScore) {
      winner = first;
      loser = second;
      message = `Wygrał ${winner.name.toUpperCase()}!`;
    } else if (secondScore > firstScore) {
      winner = second;
      loser = first;
      message = `Wygrał ${winner.name.toUpperCase()}!`;
    } else {
      message = "🤝  Remis!  🤝";
    }

    if (!winner) {
      setFightResult({ message });
      return;
    }

    const updatedWinner = {
      ...winner,
      base_experience: winner.base_experience + 10,
      wins: (winner.wins || 0) + 1,
      losses: winner.losses || 0,
    };

    const updatedLoser = {
      ...loser,
      wins: loser.wins || 0,
      losses: (loser.losses || 0) + 1,
    };

    try {
      await doesPokemonExist(winner);
      await doesPokemonExist(loser);

      await updatePokemonStats(winner.id, updatedWinner);
      await updatePokemonStats(loser.id, updatedLoser);

      setArenaPokemons([updatedWinner, updatedLoser]);
      setWinnerId(updatedWinner.id);
      setFightResult({ message });
    } catch (error) {
      console.error("Błąd aktualizacji danych po walce:", error);
    }
  };

  return (
    <div className={styles.arenaContainer}>
      <h1>Arena</h1>

      <div className={styles.arenaCardsWrapper}>
        <ArenaCard
          pokemon={arenaPokemons[0]}
          onRemove={handleRemove}
          isLoser={fightResult && winnerId && arenaPokemons[0]?.id !== winnerId}
        />

        <button
          className={styles.fightButton}
          onClick={handleFight}
          disabled={!isReadyToFight || fightResult}
        >
          ⚔️ WALCZ ⚔️
        </button>

        <ArenaCard
          pokemon={arenaPokemons[1]}
          onRemove={handleRemove}
          isLoser={fightResult && winnerId && arenaPokemons[1]?.id !== winnerId}
        />
      </div>

      {fightResult && (
        <div className={styles.fightResult}>
          <p className={styles.fightResultMessage}>{fightResult.message}</p>
          <button onClick={resetArena} className={styles.resetArena}>
            Opuść arenę
          </button>
        </div>
      )}
    </div>
  );
};

export default Arena;
