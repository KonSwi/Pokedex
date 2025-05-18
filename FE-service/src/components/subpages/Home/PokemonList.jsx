import styles from "./HomePage.module.css";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className={styles.card}>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
<div className={styles.cardDetails}>
      <p>Waga: {pokemon.weight}</p>
      <p>Wzrost: {pokemon.height}</p>
      <p>Doświadczenie: {pokemon.base_experience}</p>
      <p>Umiejętność: {pokemon.abilities?.[0] || "Brak danych"}</p>
      </div>
    </div>
  );
};

const PokemonList = ({ pokemons }) => {
  return (
    <div className={styles.grid}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
