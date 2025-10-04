import { IMediaTranslation, IMediaTranslationType } from "./media-translation.interface";
import { MediaTranslationPrisma } from "./media-translation.prisma";

export class MediaTranslationRepository implements IMediaTranslation {
    private mediaTranslationPrisma: MediaTranslationPrisma

    constructor() {
        this.mediaTranslationPrisma = new MediaTranslationPrisma();
    }

    // 
    findMany(params: IMediaTranslationType["findMany"]["params"]): Promise<IMediaTranslationType["findMany"]["result"]> {
        return this.mediaTranslationPrisma.findMany(params);
    }
}