import { useContext } from "react";
import { FavouritesContext } from "../../../context/FavouritesContext";
import styles from "./Favourites.module.css";
import { Link } from "react-router-dom";

const FavouritesCard = ({ pokemon, onRemove }) => {
  return (
    <div className={styles.card}>
      <Link to={`/pokemon/${pokemon.id}`} className={styles.link}>

      <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p>Waga: {pokemon.weight}</p>
      <p>Wzrost: {pokemon.height}</p>
      <p>Doświadczenie: {pokemon.base_experience}</p>


      {(pokemon.wins > 0 || pokemon.losses > 0) && (
        <p>🥳 {pokemon.wins} | {pokemon.losses} 🤕 </p>
      )}
      </Link>
      <button onClick={onRemove} className={styles.removeBtn}>
        ❌
      </button>
    </div>
  );
};

const Favourites = () => {
  const { favourites, removeFavourite } = useContext(FavouritesContext);

  return (
    <div className={styles.favouritesContainer}>
      <h1>Ulubione Pokémony</h1>
      <div className={styles.favouritesWrapper}>
        {favourites.length === 0 ? (
          <h3>Twoje ulubione Pokémony czekają na dodanie to tej listy!</h3>
        ) : (
          favourites.map((pokemon) => (
            <FavouritesCard
              key={pokemon.id}
              pokemon={pokemon}
              onRemove={() => removeFavourite(pokemon.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;
