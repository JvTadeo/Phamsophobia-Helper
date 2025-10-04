import { CustomError } from "@/utils/customError";
import { GhostService } from "./ghost.service";
import { Request, Response } from "express";
import { HttpStatusCode } from "axios";

export class GhostController {
    private ghostService: GhostService;

    constructor() {
        this.ghostService = new GhostService();

        // Bind
        this.getGhosts = this.getGhosts.bind(this);
        this.getGhostById = this.getGhostById.bind(this);
    }

    // 
    public async getGhosts(req: Request, res: Response) {
        const { language } = req.state

        await this.ghostService.getGhosts(language)
        .then((ghosts) => {
            res.status(HttpStatusCode.Ok).json(ghosts);
        })
        .catch((error) => {
            throw new CustomError("Failed to get ghosts", 500, error);
        })
    }

    public async getGhostById(req: Request, res: Response) {
        const { id } = req.params
        const { language } = req.state

        await this.ghostService.getGhostById(id, language)
        .then((ghost) => {
            res.status(HttpStatusCode.Ok).json(ghost);
        })
        .catch((error) => {
            throw new CustomError("Failed to get ghost", 500, error);
        })
    }
}