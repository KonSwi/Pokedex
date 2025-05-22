const baseApi = "https://pokeapi.co/api/v2/pokemon";
const localApi = "http://localhost:3000/customPokemons";

const fetchPokemonDetails = async (input) => {
  try {
    const url = input.toString().includes("http")
      ? input
      : `${baseApi}/${input}`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();

    return {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      base_experience: data.base_experience,
      abilities: data.abilities.map((a) => a.ability.name),
      image:
        data.sprites?.other?.["official-artwork"]?.front_default ||
        data.sprites?.front_default,
      wins: 0,
      losses: 0,
    };
  } catch (error) {
    console.error("Błąd fetchPokemonDetails:", error);
    return null;
  }
};

export const getInitialPokemonList = async () => {
  try {
    const res = await fetch(`${baseApi}?limit=150`);
    const { results } = await res.json();
    return await Promise.all(results.map((p) => fetchPokemonDetails(p.url)));
  } catch (error) {
    console.error("Błąd pobierania Pokémonów:", error);
    return [];
  }
};

export const getPokemonById = async (id) => {
  try {
    const local = await getOneCustomPokemon(id);
    if (local) return local;

    return await fetchPokemonDetails(id);
  } catch (error) {
    console.error("Błąd pobierania szczegółów Pokémona:", error);
    return null;
  }
};

export const getAllCustomPokemons = async () => {
  try {
    const res = await fetch(localApi);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Błąd local fetch:", error);
    return [];
  }
};

export const getOneCustomPokemon = async (id) => {
  try {
    const res = await fetch(`${localApi}/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Błąd getOneCustomPokemon:", error);
    return null;
  }
};

export const createPokemon = async (pokemon) => {
  try {
    const res = await fetch(localApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Błąd tworzenia pokemona:", error);
    return null;
  }
};

export const updatePokemonStats = async (id, data) => {
  try {
    const res = await fetch(`${localApi}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Błąd aktualizacji pokemona:", error);
    return null;
  }
};

export const mergePokemons = async () => {
  const [apiPokemons, localPokemons] = await Promise.all([
    getInitialPokemonList(),
    getAllCustomPokemons(),
  ]);

  const localMap = new Map(localPokemons.map((p) => [p.id, p]));

  const merged = apiPokemons.map((p) =>
    localMap.has(p.id) ? { ...p, ...localMap.get(p.id) } : p
  );

  const onlyLocal = localPokemons.filter(
    (p) => !apiPokemons.some((api) => api.id === p.id)
  );

  return [...merged, ...onlyLocal];
};

export const doesPokemonExist = async (pokemon) => {
  try {
    const res = await fetch(`${localApi}/${pokemon.id}`);
    if (res.ok) return true;

    const newPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      weight: pokemon.weight,
      height: pokemon.height,
      base_experience: pokemon.base_experience,
      wins: 0,
      losses: 0,
    };

    const createRes = await fetch(localApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPokemon),
    });

    if (!createRes.ok) {
      const errorText = await createRes.text();
      console.error("Szczegóły błędu (POST):", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Błąd doesPokemonExist:", error);
    return false;
  }
};
