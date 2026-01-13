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

    let pictureBase64 = "";

    if (pokemonData.picture instanceof File) {
        pictureBase64 = await fileToBase64(pokemonData.picture);
    }

    const payload = {
        ...pokemonData,
        picture: pictureBase64,
    };

    const response = await axios.post(
        `${VITE_API_BASE_URL}/pokemons/`,
        payload
    );

    return response.data;
}


// Obtener un pokemon por id
export async function fetchPokemonById(id) {
    const response = await axios.get(`${VITE_API_BASE_URL}/pokemons/${id}/`);
    return response.data;
}

// Actualizar un pokemon
export async function updatePokemon(id, pokemonData) {

    const payload = { ...pokemonData };

    // Solo convertir imagen si enviaron una nueva
    if (pokemonData.picture instanceof File) {
        payload.picture = await fileToBase64(pokemonData.picture);
    } else {
        delete payload.picture; // ❌ no enviar vacía
    }

    const response = await axios.patch(
        `${VITE_API_BASE_URL}/pokemons/${id}/`,
        payload
    );

    return response.data;
}

// Eliminar un pokemon
export async function deletePokemon(id) {
    await axios.delete(`${VITE_API_BASE_URL}/pokemons/${id}/`);
}

