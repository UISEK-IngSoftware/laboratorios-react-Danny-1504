import { Card, CardContent, CardMedia, Typography, CardActions,Button } from "@mui/material";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function PokemonCard({ pokemon }) {
    const pokemonImageUrl = `${API_MEDIA_URL}/${pokemon.picture}`;

    return (
        <Card>
            <CardMedia
            component = "img"
                height = {200}
                image = {pokemonImageUrl}
                alt = {pokemon.name} 
            />
            <CardContent>
                <Typography variant ="h5" component="div" >
                    {pokemon.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tipo : {pokemon.type}                    
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Ver detalles</Button>                
            </CardActions>           
        </Card>
    );
} 