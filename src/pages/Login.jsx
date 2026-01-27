import { TextField, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import Spinner from "../componets/Spinner";

export default function Login() {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // 👈 activamos loading

        try {
            const response = await login(loginData.username, loginData.password);
            localStorage.setItem('access_token', response.access_token);
            alert('Inicio de sesión exitoso');
            navigate("/");
        } catch (error) {
            console.error('Error en el login', error);
            alert('Error al iniciar sesión, por favor verifica tus credenciales.');
        } finally {
            setLoading(false); // 👈 desactivamos loading
        }
    };

    // Si está cargando, mostramos spinner
    if (loading) {
        return <Spinner />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                mt: 4
            }}
        >
            <Typography variant="h5" gutterBottom>
                Inicio de Sesión
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: 400,
                    width: "100%"
                }}
            >
                <TextField
                    label="Usuario"
                    name="username"
                    value={loginData.username}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                </Button>
            </Box>
        </Box>
    );
}
