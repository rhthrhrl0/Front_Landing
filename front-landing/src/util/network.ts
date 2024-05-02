import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'https://deamhome.synology.me/land/',
    timeout: 5000,
});