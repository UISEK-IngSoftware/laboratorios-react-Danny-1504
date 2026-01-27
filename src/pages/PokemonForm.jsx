import { Button, TextField, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPokemon, fetchPokemonById, updatePokemon } from "../services/PokemonService";
import Spinner from "../componets/Spinner";   // 👈 importamos Spinner

export default function PokemonForm() {

    const { id } = useParams();               
    const navigate = useNavigate();

    const [pokemonData, setPokemonData] = useState({
        name: '',
        type: '',
        weigth: '',
        Heigth: '',
        picture: null,
    });

    const [loading, setLoading] = useState(false); // 👈 estado de carga

    // Cargar datos cuando estamos editando
    useEffect(() => {
        if (id) {
            setLoading(true); // 👈 empieza carga

            fetchPokemonById(id)
                .then(data => {
                    setPokemonData({
                        ...data,
                        picture: data.picture
                    });
                })
                .catch(error => {
                    console.error("Error cargando Pokémon", error);
                    alert("Error cargando datos del Pokémon");
                })
                .finally(() => {
                    setLoading(false); // 👈 termina carga
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
        setLoading(true); // 👈 empieza carga al guardar

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
        } finally {
            setLoading(false); // 👈 termina carga
        }
    };

    // Si está cargando, mostramos spinner
    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Typography variant="h4" gutterBottom>
                {id ? "Editar Pokémon" : "Crear Pokémon"}
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
            >
                <TextField
                    label="Nombre"
                    name="name"
                    value={pokemonData.name}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Tipo"
                    name="type"
                    value={pokemonData.type}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Peso"
                    name="weigth"
                    type="number"
                    value={pokemonData.weigth}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Altura"
                    name="Heigth"
                    type="number"
                    value={pokemonData.Heigth}
                    onChange={handleChange}
                    required
                />

                <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}   // 👈 bloqueamos botón
                >
                    {loading ? "Guardando..." : (id ? "Actualizar" : "Guardar")}
                </Button>
            </Box>
        </>
    );
}
