import axios from "axios";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const VITE_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

/**
 * Obtener la lista de pokemones desde la API.
 * @returns data Pokemons
 */


export async function fetchPokemons () {
    console.log(`${VITE_API_BASE_URL}/pokemons/`);
    const response = await axios.get(`${VITE_API_BASE_URL}/pokemons/`)
    return response.data;
}