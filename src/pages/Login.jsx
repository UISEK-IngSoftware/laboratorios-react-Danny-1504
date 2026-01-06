import { Password } from "@mui/icons-material";
import { TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";

export default function Login() {
    const [loginData, setLoginData]=useState({username:'', password:''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await login(loginData.username, loginData.password)
            localStorage.setItem('access_token', response.access_token);
            alert('Inicio de sesión exitoso');
            navigate("/");
        } catch(error){
            console.error('Error en el login', error);
            alert ('Error al iniciar sesion, por favor verifica tus credenciales.');
            return;
        }
        
    }

    return (
        <>
            <Box component='form' onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Inicio de Sesión
                </Typography>
                <Box componet='form' sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }} >
                    <TextField
                        label='Usuario'
                        name='username'
                        value={loginData.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label='Contrsaeña'
                        name='password'
                        type="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type='submit' variant='contained'>Iniciar Sesión</button>
                </Box>
            </Box>    
        </>
            )
}