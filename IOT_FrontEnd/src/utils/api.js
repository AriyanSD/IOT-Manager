import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const API = axios.create({
    baseURL: apiUrl || 'http://localhost:5000/api',
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default API;
