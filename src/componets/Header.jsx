import { AppBar, Toolbar } from "@mui/material";
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
            </AppBar>
        </div>    
    );
}