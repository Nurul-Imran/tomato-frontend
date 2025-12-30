import axios from "axios";

const api = axios.create({
    baseURL: "https://tomato-frontend-beta.vercel.app/api",
});

export const url = 'https://tomato-frontend-beta.vercel.app';

export default api;
