type Sprite = {
  url: string;
  label: string;
};

type PokemonType = string;

type Pokemon = {
  id: string;
  name: string;
  sprites: Sprite[];
  types: [PokemonType];
};
