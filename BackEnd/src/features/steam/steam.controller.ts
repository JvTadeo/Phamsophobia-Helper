import { Request, Response } from "express"
import { SteamService } from "./steam.service";

export class SteamController {
    private steamService: SteamService;

    constructor() {
        this.steamService = new SteamService();

        // Bind methods to this instance
        this.getNewsPhasmophobia = this.getNewsPhasmophobia.bind(this);
        this.getPlayersCount = this.getPlayersCount.bind(this);
    }

    public async getNewsPhasmophobia(req: Request, res: Response) {
        const limit = Number(req.query.limit) || 25;

        const news = await this.steamService.getNewsPhasmophobia(limit)
        res.status(200).json(news);
    }
    public async getPlayersCount(req: Request, res: Response) {
        const players = await this.steamService.getPhasmophobiaPlayerCount()
        res.status(200).json(players);
    }
}