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
