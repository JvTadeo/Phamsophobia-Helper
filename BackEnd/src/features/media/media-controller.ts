import { MediaService } from "./media-service";
import { Request, Response } from "express";

export class MediaController {
    private mediaService : MediaService

    constructor() {
        this.mediaService = new MediaService();

        // Bind
        this.getMedia = this.getMedia.bind(this);
    }

    // 
    public async getMedia(req: Request, res: Response) {
        const medias = await this.mediaService.getMedias();
        res.status(200).json(medias);
    }
}