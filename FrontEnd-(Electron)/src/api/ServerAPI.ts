import { axiosCustom } from "./AxiosCustom"; 

export class ServerAPI {
    // ---- Steam Info
    static async getNews(limit: number = 20) {
        return await axiosCustom.get(`/steam/news?limit=${limit}`)
    }
    static async getPlayerCount()
    {
        return await axiosCustom.get('/steam/players')
    }
    // ---- Medias
    static async getMedias() {
        return await axiosCustom.get(`/medias`)
    }
    // ---- Ghosts
    static async getGhosts() {
        return await axiosCustom.get(`/ghosts`)
    }
    static async getGhostById(id: string) {
        return await axiosCustom.get(`/ghosts/${id}`)
    }
    // ---- Evidences
    static async getEvidences() {
        return await axiosCustom.get(`/evidence`)
    }
}