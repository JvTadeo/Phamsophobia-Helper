import { IFindMany } from "../index.interfaces";
import { EvidenceTranslationTypePrisma } from "@/database/prisma.types";

export interface IEvidenceTranslation {
    findMany(params: IEvidenceTranslationType["findMany"]["params"]): Promise<IEvidenceTranslationType["findMany"]["result"]>
}

export interface IEvidenceTranslationType {
    findMany: IFindMany<EvidenceTranslationTypePrisma>
}