import { Box } from "@mui/system";
import { request, gql } from "graphql-request";
import Image from "next/image";
import { Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { parsePokemon } from "@/lib";
import PokemonCard from "@/components/pokemon-card";
import Loader from "@/components/loader";

const endpoint = "https://beta.pokeapi.co/graphql/v1beta";

const query = gql`
  query getPokemonById($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const variables = { id };
  const data = await request(endpoint, query, variables);
  return { props: { pokemon: parsePokemon(data["pokemon_v2_pokemon_by_pk"]) } };
};

interface IPokemon {
  pokemon: Pokemon;
}
export default function Pokemon({ pokemon }: IPokemon) {
  if (!pokemon) {
    return <Loader />;
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <Typography sx={{ flexBasis: "100%", margin: "12px 0" }} variant="h3">
        {pokemon.name.toUpperCase()}
      </Typography>
      <PokemonCard pokemon={pokemon} />
      <Box sx={{ flexBasis: "100%" }} />
      {pokemon.sprites.map(({ label, url }) => (
        <Image key={url} src={url} alt={label} width={100} height={100} />
      ))}
    </Box>
  );
}
