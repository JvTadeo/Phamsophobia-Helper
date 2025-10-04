import { Request, Response } from "express";
import { EvidenceService } from "./evidence.service";
import { CustomError } from "@/utils/customError";
import { HttpStatusCode } from "axios";

export class EvidenceController {
    private evidenceService: EvidenceService;

    constructor() {
        this.evidenceService = new EvidenceService();

        // Bind
        this.getEvidences = this.getEvidences.bind(this);
    }

    // -----
    public async getEvidences(req: Request, res: Response) {
        const { language } = req.state;
        
        await this.evidenceService.getEvidences(language)
        .then((evidences) => {
            res.status(HttpStatusCode.Ok).json(evidences);
        })
        .catch((error) => {
            throw new CustomError("Failed to get evidences", HttpStatusCode.InternalServerError, error);
        })
    }
}