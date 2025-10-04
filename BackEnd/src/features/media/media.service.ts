import { MediaTranslationRepository } from "@/repository/media-translation/media-translation.repository";

export class MediaService {
    mediaTranslationRepository: MediaTranslationRepository;

    constructor() {
        this.mediaTranslationRepository = new MediaTranslationRepository();
    }

    // 
    public async getMedias(language: string) {
        return this.mediaTranslationRepository.findMany({
            where: {
                languageId: language
            },
            select: {
                id: true,
                name: true,
                mediaType: {
                    select: {
                        categories: {
                            select: {
                                duplicateRewardMoney: true,
                                duplicateRewardXp: true,
                                uniqueRewardMoney: true,
                                uniqueRewardXp: true,
                                mediaCategoryTranslations: {
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
        .then((medias) => {
            return medias.map((media) => {
                return {
                    id: media.id,
                    name: media.name,
                    categories: media.mediaType.categories.map((category: any) => ({
                        name: category.mediaCategoryTranslations[0].name,
                        duplicateRewardMoney: category.duplicateRewardMoney,
                        duplicateRewardXp: category.duplicateRewardXp,
                        uniqueRewardMoney: category.uniqueRewardMoney,
                        uniqueRewardXp: category.uniqueRewardXp
                    }))
                };
            });
        });
    }
}