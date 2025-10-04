import prisma from "@/database/prisma";
import { IGhost, IGhostType } from "./ghost.interface";

export class GhostPrisma implements IGhost {
    findOne(params: IGhostType["findOne"]["params"]): Promise<IGhostType["findOne"]["result"]> {
        return prisma.ghost.findUnique(params);
    }
    findMany(params: IGhostType["findMany"]["params"]): Promise<IGhostType["findMany"]["result"]> {
        return prisma.ghost.findMany(params);
    }
}

// --- Model
interface GhostModel {
    id: string,
    name: string,
    sanity: {
        min: string,
        normal: string,
        max: string
    },
    speed: {
        min: string,
        normal: string,
        max: string
    },
    ghostEvidences: Array<{
        evidence: {
            evidenceTranslations: Array<{
                name: string
            }>
        }   
    }>
}