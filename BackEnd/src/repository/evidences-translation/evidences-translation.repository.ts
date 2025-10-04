import { IEvidenceTranslation, IEvidenceTranslationType } from "./evidences-translation.interface";
import { EvidencePrisma } from "./evidences-translation.prisma";

export class EvidenceRepository implements IEvidenceTranslation {
    private evidencePrisma: EvidencePrisma

    constructor() {
        this.evidencePrisma = new EvidencePrisma();
    }

    findMany(params: IEvidenceTranslationType["findMany"]["params"]): Promise<IEvidenceTranslationType["findMany"]["result"]> {
        return this.evidencePrisma.findMany(params);
    }
}