import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getPokemonById } from "../../../services/pokemonService";
import { FavouritesContext } from "../../../context/FavouritesContext";
import { PokemonContext } from "../../../context/PokemonContext";
import { useAuth } from "../../../context/AuthContext";
import styles from "./PokemonDetails.module.css";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  const { favourites, addFavourite, removeFavourite } =
    useContext(FavouritesContext);
  const { arenaPokemons, setArenaPokemons, fightResult } =
    useContext(PokemonContext);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonById(id);
      setPokemon(data);
    };
    fetchData();
  }, [id, fightResult]);

  if (!pokemon) return <p>Ładowanie...</p>;

  const isFavourite = favourites.some((fav) => fav.id === pokemon.id);
  const isInArena = arenaPokemons.some((p) => p.id === pokemon.id);

  const toggleFavourite = () => {
    isFavourite ? removeFavourite(pokemon.id) : addFavourite(pokemon);
  };

  const toggleArena = () => {
    if (isInArena) {
      setArenaPokemons(arenaPokemons.filter((p) => p.id !== pokemon.id));
    } else if (arenaPokemons.length < 2) {
      setArenaPokemons([...arenaPokemons, pokemon]);
    } else {
      alert("Arena może zawierać tylko 2 Pokémony!");
    }
  };

  return (
    <div className={styles.details}>
      <div className={styles.detailsTop}>
        <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
        <div>
          <h1>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
          <div>
            <div className={styles.detailsData}>
              <p>
                <b>Waga:</b> {pokemon.weight}
              </p>
              <p>
                <b>Wzrost:</b> {pokemon.height}
              </p>
            </div>
            <div className={styles.detailsData}>
              <p>
                <b>EXP:</b> {pokemon.base_experience}
              </p>
              <p>
                <b>Talent:</b> {pokemon.abilities?.[0] || "brak"}
              </p>
            </div>

            {user && (pokemon.wins > 0 || pokemon.losses > 0) && (
              <div className={styles.stats}>
                <p>🥳 {pokemon.wins}</p>
                <p>🤕 {pokemon.losses}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {user && (
        <div>
          <button onClick={toggleFavourite}>{isFavourite ? "❤️" : "🤍"}</button>
          <button onClick={toggleArena}>{isInArena ? "❌" : "⚔️"}</button>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
