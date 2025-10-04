import { SteamAPI } from "@/apis/steamAPI";
import { CustomError } from "@/utils/customError";
import type { ISteamAPI } from "@/apis/steamAPI.interfaces";

export class SteamService {
    private steamAPI: SteamAPI;

    constructor() {
        this.steamAPI = new SteamAPI();
    }

    public async getNewsPhasmophobia(limit: number): Promise<ISteamAPI["steamNews"]> {
        return await this.steamAPI.getPhasmophobiaNews(limit)
        .then(({data}) => {
            return data.appnews.newsitems.map((item: any) => {
                return {                
                    id: item.gid,
                    title: item.title,
                    author: item.author,
                    date: item.date,
                    url: item.url,
                    publishedAt: item.date
                }
            })
        })
        .catch((error) => {
            throw new CustomError("Failed to get news", 500, error);
        });
    }
    public async getPhasmophobiaPlayerCount(): Promise<ISteamAPI["steamPlayerCount"]> {
        return await this.steamAPI.getPhasmophobiaPlayerCount()
        .then(({data}) => data.response.player_count)
    }
}