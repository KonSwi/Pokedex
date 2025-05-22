import { useEffect, useState } from "react";
import { mergePokemons } from "../../../services/pokemonService";
import RankingList from "./RankingList";
import styles from "./Ranking.module.css";

const Ranking = () => {
  const [pokemons, setPokemons] = useState([]);
  const [sortKey, setSortKey] = useState("wins");

  useEffect(() => {
    const fetchData = async () => {
      const data = await mergePokemons();
      setPokemons(data);
    };
    fetchData();
  }, []);

  const sorted = [...pokemons].sort(
    (a, b) => (b[sortKey] || 0) - (a[sortKey] || 0)
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ranking Pokémonów</h2>
      <label className={styles.sortLabel}>
        Sortuj według:
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className={styles.select}
        >
          <option value="base_experience">Doświadczenie</option>
          <option value="weight">Waga</option>
          <option value="height">Wzrost</option>
          <option value="wins">Wygrane</option>
        </select>
      </label>

      <RankingList pokemons={sorted} />
    </div>
  );
};

export default Ranking;
