import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonById } from "../services/PokemonService";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function PokemonDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetchPokemonById(id)
            .then(data => setPokemon(data))
            .catch(() => alert("Error obteniendo el Pokémon"));
    }, [id]);

    if (!pokemon) return <p>Cargando...</p>;

    return (
        <Card sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>

            <CardMedia
                component="img"
                height="300"
                image={`${API_MEDIA_URL}/${pokemon.picture}`}
                alt={pokemon.name}
            />

            <CardContent>
                <Typography variant="h4">{pokemon.name}</Typography>

                <Typography variant="h6">
                    Tipo: {pokemon.type}
                </Typography>

                <Typography>
                    Peso: {pokemon.weigth} kg
                </Typography>

                <Typography>
                    Altura: {pokemon.Heigth} m
                </Typography>
            </CardContent>

            <Button onClick={() => navigate(-1)}>
                Volver
            </Button>

        </Card>
    );
}
