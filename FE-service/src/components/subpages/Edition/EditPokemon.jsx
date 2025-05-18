import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSnackbar } from "notistack";
import {
  getOneCustomPokemon,
  getPokemonById,
  doesPokemonExist,
  updatePokemonStats,
} from "../../../services/pokemonService";
import styles from "./Edition.module.css";

const schema = z.object({
  weight: z.coerce.number().positive("Liczba musi być większa od zera"),
  height: z.coerce.number().positive("Liczba musi być większa od zera"),
  base_experience: z.coerce
    .number()
    .positive("Liczba musi być większa od zera"),
});

const EditPokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [pokemon, setPokemon] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      let data = await getOneCustomPokemon(id);

      if (!data) {
        const fromApi = await getPokemonById(id);
        if (!fromApi) {
          enqueueSnackbar("Nie znaleziono Pokémona", { variant: "error" });
          navigate("/");
          return;
        }

        await doesPokemonExist(fromApi);
        data = await getOneCustomPokemon(id);
        if (!data) {
          enqueueSnackbar("Nie znaleziono Pokémona", { variant: "error" });
          navigate("/");
          return;
        }
      }

      setPokemon(data);
      setValue("weight", data.weight);
      setValue("height", data.height);
      setValue("base_experience", data.base_experience);
    };

    fetchData();
  }, [id, navigate, enqueueSnackbar, setValue]);

  const onSubmit = async (data) => {
    const result = await updatePokemonStats(id, data);

    if (result) {
      enqueueSnackbar(`Zmieniono atrybuty ${pokemon.name}`, {
        variant: "success",
        autoHideDuration: 2000,
      });
      setTimeout(() => navigate("/"), 100);
    } else {
      enqueueSnackbar("Błąd podczas edycji pokemona", {
        variant: "error",
      });
    }
  };

  if (!pokemon) return <p>Ładowanie...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Edytuj Pokémona: {pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} width="128" height="128" />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        Waga:
        <input
          type="number"
          placeholder="Waga"
          {...register("weight")}
          className={styles.input}
        />
        {errors.weight && (
          <p className={styles.error}>{errors.weight.message}</p>
        )}
        Wzrost:
        <input
          type="number"
          placeholder="Wzrost"
          {...register("height")}
          className={styles.input}
        />
        {errors.height && (
          <p className={styles.error}>{errors.height.message}</p>
        )}
        Doświadczenie:
        <input
          type="number"
          placeholder="Doświadczenie"
          {...register("base_experience")}
          className={styles.input}
        />
        {errors.base_experience && (
          <p className={styles.error}>{errors.base_experience.message}</p>
        )}
        <button type="submit" className={styles.submitButton}>
          Zmień atrybuty
        </button>
      </form>
    </div>
  );
};

export default EditPokemon;
