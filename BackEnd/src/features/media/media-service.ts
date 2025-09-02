import { MediaTypeRepository } from "@/repository/media-type/media-type.repository";

export class MediaService {
    private mediaTypeRepository: MediaTypeRepository

    constructor() {
        this.mediaTypeRepository = new MediaTypeRepository();
    }

    public async getMedias() {
        return await this.mediaTypeRepository.findMany({
            include: {
                categories: {
                    select: {
                        description: true,
                        duplicateRewardMoney: true,
                        uniqueRewardMoney: true,
                        duplicateRewardXp: true,
                        uniqueRewardXp: true,                        
                    }
                }
            }
        });
        
    }
}