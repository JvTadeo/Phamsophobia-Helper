import axios, { AxiosInstance } from "axios";

export class SteamAPI {
    private api : AxiosInstance;

    private readonly APP_ID = 739630;
    
    constructor() {
        this.api = axios.create({
            baseURL: 'https://api.steampowered.com/',        
        });
    }

    public async getPhasmophobiaNews(limit: number): Promise<any> {
        return await this.api.get(`/ISteamNews/GetNewsForApp/v2/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    appid: this.APP_ID,
                    count: limit,
                    maxlength: 200,
                    format: 'json'
                }                
            }
        )
    };
    public async getPhasmophobiaPlayerCount(): Promise<any> {
        return await this.api.get(`ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${this.APP_ID}`);
    }
}