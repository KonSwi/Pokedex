import styles from "./Ranking.module.css";

const RankingList = ({ pokemons = [] }) => {
  if (pokemons.length === 0) {
    return <p>Brak danych do wyświetlenia.</p>;
  }

  return (
    <ul className={styles.list}>
      {pokemons.map((pokemon, index) => (
        <li key={pokemon.id} className={styles.item}>
          <span className={styles.index}>{index + 1}.</span>
          <img src={pokemon.image} alt={pokemon.name} width="64" height="64" />
          <div className={styles.details}>
            <strong>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </strong>
            <p>EXP: {pokemon.base_experience}</p>
            <p>Waga: {pokemon.weight}</p>
            <p>Wzrost: {pokemon.height}</p>
            <p>Wygrane: {pokemon.wins || 0}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RankingList;
