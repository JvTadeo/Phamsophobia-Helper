import { GhostRepository } from "@/repository/ghost/ghost.respository";

export class GhostService {
    private ghostRepository: GhostRepository;

    constructor() {
        this.ghostRepository = new GhostRepository();
    }

    public async getGhosts(language: string) {
        return this.ghostRepository.findMany({
            select: {
                id: true,
                name: true,
                sanity: true,
                speed: true,
                ghostEvidences: {
                    select: {
                        evidence: {                            
                            select: {
                                icon: true,
                                evidenceTranslations: {
                                    where: {
                                        languageId: language
                                    },
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        .then((ghosts) => {
            return ghosts.map((ghost) => {
                return {
                    id: ghost?.id,
                    name: ghost?.name,
                    sanity: ghost?.sanity,
                    speed: ghost?.speed,
                    evidences: ghost?.ghostEvidences?.map((evidence) => {
                        return {
                            name: evidence?.evidence?.evidenceTranslations?.[0]?.name,
                            icon: evidence?.evidence?.icon
                        }
                    })
                }
            })
        })
    }
    public async getGhostById(id: string, language: string) {
        return this.ghostRepository.findOne({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                sanity: true,
                speed: true,
                ghostEvidences: {
                    select: {
                        evidence: {                         
                            select: {
                                icon: true,
                                evidenceTranslations: {
                                    where: {
                                        languageId: language
                                    },
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                },
                ghostTranslations: {
                    where: {
                        languageId: language
                    },
                    select: {
                        custom: true,
                        details: true,
                    }
                }
            }
        })
        .then((ghost) => {
            return {
                id: ghost?.id,
                name: ghost?.name,
                sanity: ghost?.sanity,
                speed: ghost?.speed,
                evidences: ghost?.ghostEvidences?.map((evidence) => {
                    return {
                        name: evidence?.evidence?.evidenceTranslations?.[0]?.name,
                        icon: evidence?.evidence?.icon
                    }
                }),
                custom: ghost?.ghostTranslations?.[0]?.custom,
                details: ghost?.ghostTranslations?.[0]?.details
            }
        })
    }    
}