import type { AxiosInstance } from "axios";
import axios from "axios";

const baseURL: string = import.meta.env.VITE_API_URL;

export const axiosCustom: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }    
});
