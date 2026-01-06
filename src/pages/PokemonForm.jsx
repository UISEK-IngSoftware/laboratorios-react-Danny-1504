import { Button, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPokemon } from "../services/PokemonService";

export default function PokemonForm() {
    const [pokemonData, setPokemoData] = useState({
        name: '',
        type: '',
        weigth: '',
        Heigth: '',
        picture: null,


    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'picture') {
            setPokemoData({
                ...pokemonData,
                picture: files[0]
            });
        } else {
            setPokemoData({
                ...pokemonData,
                [name]: value
            });
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPokemon(pokemonData);
            alert('Pokemon guardado exitosamente');
            navigate('/');
        } catch (error) {
            console.error('Error al crear el Pokemon', error);
            alert('Error al crear el Pokemon');
            return;
        }
    };


    return (
        <>
            <Typography variant="h4" gutterBottom>
                Formulario de Pokemon
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Nombre" name="name" variant="outlined" onChange={handleChange} />
                <TextField label="Tipo" name="type" variant="outlined" onChange={handleChange} />
                <TextField label="Peso" name="weigth" variant="outlined" type="number" onChange={handleChange} />
                <TextField label="Altura" name="Heigth" variant="outlined" type="number" onChange={handleChange} />
                <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    className="picture"
                    onChange={handleChange}
                    required
                />


                <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </>
    )

}