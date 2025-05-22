import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as z from "zod";
import {
  createPokemon,
  getAllCustomPokemons,
} from "../../../services/pokemonService";
import styles from "./Edition.module.css";

const schema = z.object({
  name: z.string().min(3, "Nazwa musi mieć co najmniej 3 znaki"),
  weight: z.coerce.number().positive("Liczba musi być większa od zera"),
  height: z.coerce.number().positive("Liczba musi być większa od zera"),
  base_experience: z.coerce
    .number()
    .positive("Liczba musi być większa od zera"),
});

const CreatePokemon = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [spriteIndex, setSpriteIndex] = useState(151);
  const [usedSprites, setUsedSprites] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchUsed = async () => {
      const pokemons = await getAllCustomPokemons();
      const used = pokemons.map((p) => p.image?.match(/\/([0-9]+)\.png/)[1]);
      setUsedSprites(used);
    };
    fetchUsed();
  }, []);

  const onSubmit = async (data) => {
    const newPokemon = {
      ...data,
      id: Date.now(),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${spriteIndex}.png`,
      wins: 0,
      losses: 0,
    };

    try {
      await createPokemon(newPokemon);
      enqueueSnackbar(`Nowy pokemon ${newPokemon.name} został dodany`, {
        variant: "success",
        autoHideDuration: 2000,
      });
      setTimeout(() => navigate("/"), 100);
    } catch (error) {
      enqueueSnackbar("Błąd podczas dodawania pokemona", {
        variant: "error",
      });
    }
  };

  const isUsed = usedSprites.includes(spriteIndex.toString());

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Stwórz nowego Pokémona</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Nazwa"
          {...register("name")}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <input
          type="number"
          placeholder="Waga"
          {...register("weight")}
          className={styles.input}
        />
        {errors.weight && (
          <p className={styles.error}>{errors.weight.message}</p>
        )}

        <input
          type="number"
          placeholder="Wzrost"
          {...register("height")}
          className={styles.input}
        />
        {errors.height && (
          <p className={styles.error}>{errors.height.message}</p>
        )}

        <input
          type="number"
          placeholder="Doświadczenie"
          {...register("base_experience")}
          className={styles.input}
        />
        {errors.base_experience && (
          <p className={styles.error}>{errors.base_experience.message}</p>
        )}

        <div className={styles.spriteNav}>
          <button
            type="button"
            onClick={() => setSpriteIndex((i) => i - 1)}
            disabled={spriteIndex <= 151}
          >
            ◀️
          </button>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${spriteIndex}.png`}
            alt="pokemon"
            style={{ opacity: isUsed ? 0.3 : 1 }}
          />
          <button type="button" onClick={() => setSpriteIndex((i) => i + 1)}>
            ▶️
          </button>
        </div>

        <button type="submit" disabled={isUsed} className={styles.submitButton}>
          Stwórz
        </button>
      </form>
    </div>
  );
};

export default CreatePokemon;
