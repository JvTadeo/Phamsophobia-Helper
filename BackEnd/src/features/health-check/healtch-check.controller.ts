import { Request, Response } from "express";

export class HealthCheckController {
    public async healthCheck(req: Request, res: Response) {
        const check = {
            timestamp: new Date(),
            status: 'OK',            
        }

        res.status(200).json(check);
    }
}