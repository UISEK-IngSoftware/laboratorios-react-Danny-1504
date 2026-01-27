import { useState } from "react";
import { AppBar, Button, Toolbar, Container } from "@mui/material";
import pokedexLogo from "../assets/pokédex_logo.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/userService";
import Spinner from "./Spinner";

export default function Header() {
    const [loading, setLoading]=useState(false);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("access_token");

    const handleLogout = () => {
        setLoading(true);
        logout();
        setLoading(false);
        navigate("/");
    };

    if (loading) {
        return(
            <Spinner/>
        );
    }

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <img
                        src={pokedexLogo}
                        alt="Logo"
                        height={80}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    />
                </Toolbar>

                <Toolbar>
                    <Button color="inherit" onClick={() => navigate("/")}>
                        Inicio
                    </Button>

                    <Button color="inherit" onClick={() => navigate("/trainers")}>
                        Entrenadores
                    </Button>

                    {isLoggedIn ? (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/add-pokemon")}
                            >
                                Agregar Pokémon
                            </Button>

                            <Button color="inherit" onClick={handleLogout}>
                                Cerrar sesión
                            </Button>
                        </>
                    ) : (
                        <Button
                            color="inherit"
                            onClick={() => navigate("/login")}
                        >
                            Iniciar sesión
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Container>
    );
}
