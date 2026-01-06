import { AppBar, Button, Toolbar, Container } from "@mui/material";
import pokedexLogo from "../assets/pokédex_logo.png";

export default function Header() {
    return (
        <div className="pokedex-navbar">
            <AppBar position="static">
                <Toolbar>
                    <div className="image-container">
                        <img src = {pokedexLogo} alt = "Logo" height={100}/>
                    </div>
                </Toolbar>
                <Toolbar>
                    <Container>
                        <Button color="inherit" href="/">Inicio</Button>
                        <Button color="inherit" href="/add-pokemon">Agregar Pokemon</Button> 
                        <Button color="inherit" href="/login">Iniciar Sesión</Button> 
                    </Container>
                </Toolbar>
            </AppBar>
        </div>    
    );
}