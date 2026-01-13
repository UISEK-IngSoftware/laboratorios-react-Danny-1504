import { Grid } from "@mui/material";
import PokemonCard from "../componets/PokemonCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPokemons, deletePokemon } from "../services/PokemonService";

export default function Pokemonlist() {

    const [pokemons, setPokemons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPokemons()
            .then(data => setPokemons(data))
            .catch(() => {
                alert("Error obteniendo los pokemons, intenta más tarde.");
            });
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que deseas eliminarlo?")) return;

        await deletePokemon(id);

        const data = await fetchPokemons();
        setPokemons(data);
    };

    return (
        <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
                <Grid key={pokemon.id} item xs={12} sm={6} lg={4}>
                    
                    <PokemonCard
                        pokemon={pokemon}
                        onDelete={handleDelete}
                    />

                </Grid>
            ))}
        </Grid>
    );
}
