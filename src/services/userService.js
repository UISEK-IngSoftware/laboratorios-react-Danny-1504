import axios from "axios";

const VITE_API_BASE_URL = import.meta.env.VITE_API_AUTH_URL;
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const VITE_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export async function login(username, password) {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", username);
    params.append("password", password);
    params.append("client_id", VITE_CLIENT_ID);
    params.append("client_secret", VITE_CLIENT_SECRET);


    const response = await axios.post(
        `${VITE_API_BASE_URL}/token/`,
        params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    return response.data;
}

export async function logout() {
    const token = localStorage.getItem("access_token");
    if(!token) return;
    const params = new URLSearchParams();
    params.append("client_id", VITE_CLIENT_ID);
    params.append("client_secret", VITE_CLIENT_SECRET);
    params.append("token", token);
    
    await axios.post(`${VITE_API_BASE_URL}/revoke_token/`, params, {
        headers: {
            "Content-Type":"application/x-www-form-urlencoded",            
        },
    }

    );
    localStorage.removeItem('access_token');
}



