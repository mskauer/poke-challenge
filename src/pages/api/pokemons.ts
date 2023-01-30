import { parsePokemon, pokemonTypes } from "@/lib";
import request, { gql } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

const endpoint = "https://beta.pokeapi.co/graphql/v1beta";

const query = gql`
  query searchPokemon($name: String, $types: [Int!]) {
    pokemon_v2_pokemon(
      where: {
        pokemon_v2_pokemontypes: { type_id: { _in: $types } }
        name: { _similar: $name }
        is_default: { _eq: true }
      }
      limit: 1000
      order_by: { id: asc }
    ) {
      id
      name
      order
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

const pokemonIds = pokemonTypes.map(({ id }) => id);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, type } = req.body;
  const variables = { name: `%${name}%`, types: type ? [type] : pokemonIds };
  const data = await request(endpoint, query, variables);
  res.status(200).json(data["pokemon_v2_pokemon"].map(parsePokemon));
}
