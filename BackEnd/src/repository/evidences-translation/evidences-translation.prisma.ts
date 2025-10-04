import prisma from "@/database/prisma";
import { IEvidenceTranslation, IEvidenceTranslationType } from "./evidences-translation.interface";

export class EvidencePrisma implements IEvidenceTranslation {
    findMany(params: IEvidenceTranslationType["findMany"]["params"]): Promise<IEvidenceTranslationType["findMany"]["result"]> {
        return prisma.evidenceTranslation.findMany(params);
    }
}