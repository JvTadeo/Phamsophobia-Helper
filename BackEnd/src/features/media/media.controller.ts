import { Request, Response } from "express";
import { MediaService } from "./media.service";
import { CustomError } from "@/utils/customError";

export class MediaController {
    private mediaService: MediaService;

    constructor() {
        this.mediaService = new MediaService();

        // ---
        this.getMedia = this.getMedia.bind(this);
    }

    // 
    public async getMedia(req: Request, res: Response) {
        const { language } = req.state;
        
        await this.mediaService.getMedias(language)
        .then((medias) => {
            res.status(200).json(medias);
        })
        .catch((error) => {
            throw new CustomError("Failed to get medias", 500, error);
        })
    }
}