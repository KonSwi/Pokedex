import { useEffect, useState } from "react";
import { mergePokemons } from "../../../services/pokemonService";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./HomePage.module.css";

const pokemonsPerPage = 15;

const HomePage = () => {
  const { user } = useAuth();
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const data = await mergePokemons();
      setAllPokemons(data);
      setFilteredPokemons(data);
    })();
  }, []);

  useEffect(() => {
    const filtered = allPokemons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemons(filtered);
    setCurrentPage(1);
    ``;
  }, [search, allPokemons]);

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const start = (currentPage - 1) * pokemonsPerPage;
  const visible = filteredPokemons.slice(start, start + pokemonsPerPage);

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder="Wyszukaj pokémona..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.grid}>
        {visible.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.id}`}
            key={pokemon.id}
            className={styles.card}
          >
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <div className={styles.cardDetails}>
              <div>
                <p>
                  <b>Waga:</b> {pokemon.weight}
                </p>
                <p>
                  <b>Wzrost:</b> {pokemon.height}
                </p>
              </div>
              <div>
                <p>
                  <b>EXP:</b> {pokemon.base_experience}
                </p>
                <p>
                  <b>Talent:</b> {pokemon.abilities?.[0] || "brak"}
                </p>
              </div>
            </div>
            {user && (pokemon.wins > 0 || pokemon.losses > 0) && (
              <div className={styles.stats}>
                <p>🥳 {pokemon.wins}</p>
                <p>🤕 {pokemon.losses}</p>
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`${styles.pageBtn} ${
              i + 1 === currentPage ? styles.active : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
