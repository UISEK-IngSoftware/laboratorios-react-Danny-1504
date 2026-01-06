import axios from "axios";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const VITE_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Obtener la lista de pokemones desde la API.
 * @returns data Pokemons
 */


export async function fetchPokemons() {
    console.log(`${VITE_API_BASE_URL}/pokemons/`);
    const response = await axios.get(`${VITE_API_BASE_URL}/pokemons/`)
    return response.data;
}


/**
 * Convertir un archivo a Base64
 * @param {} file 
 * @returns 
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // reader.result ya incluye el encabezado, lo usamos completo
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export async function createPokemon(pokemonData) {
    console.log("Creando pokemon");
    
    let pictureBase64 = '';
    if (pokemonData) {
        pictureBase64 = await fileToBase64(pokemonData.picture);
    }
    const payload = {
        ...pokemonData,
        picture: pictureBase64,
    }
    const response = await axios.post(
        `${VITE_API_BASE_URL}/pokemons/`,
        payload);
    return response.data;
}