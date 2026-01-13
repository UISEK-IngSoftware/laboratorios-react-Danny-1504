import { Button, TextField, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPokemon, fetchPokemonById, updatePokemon } from "../services/PokemonService";

export default function PokemonForm() {

    const { id } = useParams();               // ← si existe, estamos editando
    const navigate = useNavigate();

    const [pokemonData, setPokemonData] = useState({
        name: '',
        type: '',
        weigth: '',
        Heigth: '',
        picture: null,
    });

    // Cargar datos cuando estamos editando
    useEffect(() => {
        if (id) {
            fetchPokemonById(id).then(data => {
                setPokemonData({
                    ...data,
                    picture: data.picture   // base64 ya guardado
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "picture") {
            setPokemonData({
                ...pokemonData,
                picture: files[0]
            });
        } else {
            setPokemonData({
                ...pokemonData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                // EDITAR
                await updatePokemon(id, pokemonData);
                alert("Pokémon actualizado correctamente");
            } else {
                // CREAR
                await createPokemon(pokemonData);
                alert("Pokémon creado correctamente");
            }

            navigate("/");
        } catch (error) {
            console.error("Error guardando el Pokémon", error);
            alert("Ocurrió un error");
        }
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                {id ? "Editar Pokémon" : "Crear Pokémon"}
            </Typography>

            <Box component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    label="Nombre"
                    name="name"
                    value={pokemonData.name}
                    onChange={handleChange}
                />

                <TextField
                    label="Tipo"
                    name="type"
                    value={pokemonData.type}
                    onChange={handleChange}
                />

                <TextField
                    label="Peso"
                    name="weigth"
                    type="number"
                    value={pokemonData.weigth}
                    onChange={handleChange}
                />

                <TextField
                    label="Altura"
                    name="Heigth"
                    type="number"
                    value={pokemonData.Heigth}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={handleChange}
                />

                <Button type="submit" variant="contained">
                    {id ? "Actualizar" : "Guardar"}
                </Button>
            </Box>
        </>
    );
}

