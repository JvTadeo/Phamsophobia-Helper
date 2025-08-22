import type { AxiosInstance } from "axios";
import axios from "axios";

export const axiosCustom: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json'
    }
});