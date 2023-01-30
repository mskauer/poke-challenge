import Loader from "@/components/loader";
import PokemonCard from "@/components/pokemon-card";
import { pokemonTypes } from "@/lib";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

interface IPokemonList {
  pokemons: Pokemon[];
}
const PokemonsList = ({ pokemons }: IPokemonList) => {
  if (!pokemons.length) {
    return <div>No se encontraron resultados</div>;
  }

  return (
    <Box sx={{ marginBottom: "20px" }}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </Box>
  );
};
export default function Home() {
  const [search, setSearch] = useState({ name: "", type: "" });
  const [results, setResults] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState(false);
  const onSearch = async () => {
    setLoading(true);
    setResults([]);
    const request = await axios.post("/api/pokemons", search);
    setLoading(false);
    setResults(request.data);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <TextField
        id="search-input"
        variant="standard"
        label="Search pokémon by their name"
        value={search.name}
        onChange={(e) => setSearch({ ...search, name: e.target.value })}
        onKeyDown={(e) => {
          if (e.code === "Enter") onSearch();
        }}
        sx={{ minWidth: "280px" }}
      />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={search.type}
          onChange={(e) => setSearch({ ...search, type: e.target.value })}
          label="Type"
        >
          <MenuItem value="">-</MenuItem>
          {pokemonTypes.map(({ name, id }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={onSearch}>
        Search
      </Button>
      <Box sx={{ flexBasis: "100%" }} />
      {results && (loading ? <Loader /> : <PokemonsList pokemons={results} />)}
    </Box>
  );
}
