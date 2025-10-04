import { Express } from "express";

declare global {
    namespace Express {
        interface Request {
            state: {
                language: string
            }
        }
    }
}