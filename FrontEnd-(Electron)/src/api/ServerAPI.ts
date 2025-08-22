import { axiosCustom } from "./AxiosCustom"; 

export class ServerAPI {
    static async getNews(limit: number = 20) {
        const response = await axiosCustom.get(`/news?limit=${limit}`);
        return response.data;
    }
}