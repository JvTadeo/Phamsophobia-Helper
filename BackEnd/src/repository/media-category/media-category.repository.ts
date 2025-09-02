import { IMediaCategory, IMediaCateoryTypes } from "./media-category.interface";
import { MediaCategoryPrisma } from "./media-cateory.prisma";

export class MediaCateoryRepository implements IMediaCategory {

    private mediaCategoryPrisma: MediaCategoryPrisma;

    constructor() {
        this.mediaCategoryPrisma = new MediaCategoryPrisma();
    }

    findMany(params: IMediaCateoryTypes["findMany"]["params"]): Promise<IMediaCateoryTypes["findMany"]["result"]> {
        return this.mediaCategoryPrisma.findMany(params);
    }

}