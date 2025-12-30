import axios from "axios";

const api = axios.create({
    baseURL: "https://tomato-backend-ux59.onrender.com/api",
});

export const url = 'https://tomato-backend-ux59.onrender.com';

export default api;
