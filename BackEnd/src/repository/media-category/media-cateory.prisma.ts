import prisma from "@/database/prisma";
import { IMediaCateoryTypes, IMediaCategory } from "./media-category.interface";

export class MediaCategoryPrisma implements  IMediaCategory{
    findMany(params: IMediaCateoryTypes["findMany"]["params"]): Promise<IMediaCateoryTypes["findMany"]["result"]> {
        return prisma.mediaCategory.findMany({
            select: params.select,
            where: params.where
        });
    }    
}