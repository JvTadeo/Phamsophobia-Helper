import type { AxiosInstance } from "axios";
import axios from "axios";

export const axiosCustom: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});