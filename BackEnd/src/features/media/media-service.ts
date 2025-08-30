import prisma from "@/database/prisma";

export class MediaService {
    public async getMedias() {
        return await prisma.mediaType.findMany({
            include: {
                categories: {
                    select: {
                        description: true,
                        duplicateRewardMoney: true,
                        duplicateRewardXp: true,
                        uniqueRewardMoney: true,
                        uniqueRewardXp: true
                    }
                }
            }
        })
    }
}