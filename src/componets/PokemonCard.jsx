import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function PokemonCard({ pokemon, onDelete }) {

    const navigate = useNavigate();
    const imageUrl = `${API_MEDIA_URL}/${pokemon.picture}`;

    // 🔐 revisar si está logueado
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));

    return (
        <Card>

            <CardMedia
                component="img"
                height={200}
                image={imageUrl}
                alt={pokemon.name}
            />

            <CardContent>
                <Typography variant="h5">
                    {pokemon.name}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tipo: {pokemon.type}
                </Typography>
            </CardContent>

            <CardActions>

                {/* Siempre visible */}
                <Button onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
                    Ver detalles
                </Button>

                {/* ⭐ solo si está logueado */}
                {isLoggedIn && (
                    <>
                        <Button onClick={() => navigate(`/edit-pokemon/${pokemon.id}`)}>
                            Editar
                        </Button>

                        <Button color="error" onClick={() => onDelete(pokemon.id)}>
                            Eliminar
                        </Button>
                    </>
                )}

            </CardActions>

        </Card>
    );
}
