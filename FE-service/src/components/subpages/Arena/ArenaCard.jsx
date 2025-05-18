import styles from "./ArenaCard.module.css";
import { Link } from "react-router-dom";

const ArenaCard = ({ pokemon, onRemove, isLoser }) => {
  if (!pokemon) {
    return (
      <div className={styles.placeholder}>
        <Link to="/">
          <img
            src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
            alt="Pokedex Logo"
            className={styles.logoImg}
          />
        </Link>
      </div>
    );
  }
  const cardClass = `${styles.card} ${isLoser ? styles.loser : ""}`;
  return (
    <div className={cardClass}>
      <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
      <h3>{pokemon.name}</h3>
      <p>Waga: {pokemon.weight}</p>
      <p>Wzrost: {pokemon.height}</p>
      <p>Doświadczenie: {pokemon.base_experience}</p>
      {(pokemon.wins > 0 || pokemon.losses > 0) && (
        <p>🥳 {pokemon.wins} | {pokemon.losses} 🤕 </p>
      )}
      {onRemove && (
        <button onClick={() => onRemove(pokemon.id)} className={styles.removeBtn}>
          Usuń z areny
        </button>
      )}
    </div>
  );
};

export default ArenaCard;
