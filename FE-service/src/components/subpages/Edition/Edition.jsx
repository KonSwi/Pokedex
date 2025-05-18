import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mergePokemons } from "../../../services/pokemonService";

import styles from "./Edition.module.css";

const EditionList = ({ pokemons, onEdit }) => {
  if (!pokemons || pokemons.length === 0) {
    return <p>Brak Pokémonów do edycji.</p>;
  }

  return (
    <ul className={styles.list}>
      {pokemons.map((pokemon, index) => (
        <li key={pokemon.id} className={styles.listItem}>
          <span>
            <strong>{index + 1}.</strong>{" "}
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </span>
          <img src={pokemon.image} alt={pokemon.name} width="56" height="56" />
          <button
            onClick={() => onEdit(pokemon.id)}
            className={styles.editButton}
          >
            Edytuj
          </button>
        </li>
      ))}
    </ul>
  );
};
const Edition = () => {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await mergePokemons();
      setPokemons(data);
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edition/edit/${id}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Edycja Pokémonów</h2>
      <button
        onClick={() => navigate("/edition/create")}
        className={styles.createButton}
      >
        Stwórz Pokémona
      </button>
      <EditionList pokemons={pokemons} onEdit={handleEdit} />
    </div>
  );
};

export default Edition;
