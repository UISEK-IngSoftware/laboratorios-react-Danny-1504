import { Grid } from "@mui/material";
import PokemonCard from "./PokemonCard";
import { useEffect,useState } from "react";
import { fetchPokemons } from "../services/PokemonService";

export default function Pokemonlist() {
    const [pokemons, setPokemons] = useState([]);

   useEffect(() => {
        fetchPokemons()
        .then (data => setPokemons(data))
        .catch ((error ) => {
            console.error("Error obtenindo los pokemons: `", error);
            alert("Error obteniendo los pokemons, intenta más tarde.");
        });
    }, []);

    return (
        <Grid container spacing={2}>
            {pokemons.map(
                (pokemon) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}
        </Grid>
    )
}