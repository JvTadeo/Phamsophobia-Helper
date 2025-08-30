import { axiosCustom } from "./AxiosCustom"; 

export class ServerAPI {
    static async getNews(limit: number = 20) {
        return await axiosCustom.get(`/steam/news?limit=${limit}`)
    }
}