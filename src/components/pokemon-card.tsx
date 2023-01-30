import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const IMG_SIZE = 100;

interface IPokemonCard {
  pokemon: Pokemon;
}
export default function PokemonCard({ pokemon }: IPokemonCard) {
  return (
    <Card key={pokemon.id}>
      <CardActionArea
        className={`card-${pokemon.name}`}
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: "496px",
          justifyContent: "space-between",
        }}
        component={Link}
        href={`/pokemon/${pokemon.id}`}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {pokemon.name}
            </Typography>
            <Box sx={{ marginTop: "12px" }}>
              {pokemon.types.map((type) => (
                <Chip key={type} label={type} sx={{ marginRight: "8px" }} />
              ))}
            </Box>
          </CardContent>
        </Box>
        <Image
          src={pokemon.sprites[0]?.url}
          alt={pokemon.sprites[0]?.label || `${pokemon.name} sprite`}
          width={IMG_SIZE}
          height={IMG_SIZE}
        />
      </CardActionArea>
    </Card>
  );
}
