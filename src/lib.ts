export function parsePokemon(data: any): Pokemon {
  const spritesJSON = JSON.parse(data["pokemon_v2_pokemonsprites"][0].sprites);
  const sprites = Object.entries(spritesJSON)
    .map(([label, url]) => ({ label, url }))
    .filter(({ url }) => typeof url === "string");
  const pokemon = {
    id: data.id,
    name: data.name,
    sprites,
    types: data["pokemon_v2_pokemontypes"].map(
      (t: any) => t["pokemon_v2_type"].name
    ),
  } as Pokemon;
  return pokemon;
}

export const pokemonTypes = [
  { name: "normal", id: 1 },
  { name: "fighting", id: 2 },
  { name: "flying", id: 3 },
  { name: "poison", id: 4 },
  { name: "ground", id: 5 },
  { name: "rock", id: 6 },
  { name: "bug", id: 7 },
  { name: "ghost", id: 8 },
  { name: "steel", id: 9 },
  { name: "fire", id: 10 },
  { name: "water", id: 11 },
  { name: "grass", id: 12 },
  { name: "electric", id: 13 },
  { name: "psychic", id: 14 },
  { name: "ice", id: 15 },
  { name: "dragon", id: 16 },
  { name: "dark", id: 17 },
  { name: "fairy", id: 18 },
  { name: "unknown", id: 10001 },
  { name: "shadow", id: 10002 },
];
