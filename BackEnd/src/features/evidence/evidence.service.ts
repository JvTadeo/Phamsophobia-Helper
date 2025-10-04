import { EvidenceRepository } from "@/repository/evidences-translation/evidences-translation.repository";

export class EvidenceService {
    private evidenceRepository: EvidenceRepository

    constructor() {
        this.evidenceRepository = new EvidenceRepository();
    }

    // -----
    public async getEvidences(languageId: string) {
        return this.evidenceRepository.findMany({
            where: {
                languageId
            },
            select: {
                name: true,
                evidence: {
                    select: {
                        icon: true
                    }
                }
            }
        })
        .then((evidence) => {
            return evidence.map((evidence) => {
                return {
                    name: evidence?.name,
                    icon: evidence?.evidence?.icon
                }
            })
        });
    }
}