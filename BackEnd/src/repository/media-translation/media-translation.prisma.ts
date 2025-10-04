import prisma from "@/database/prisma";
import { IMediaTranslation, IMediaTranslationType } from "./media-translation.interface";

export class MediaTranslationPrisma implements IMediaTranslation {
    findMany(params: IMediaTranslationType["findMany"]["params"]): Promise<IMediaTranslationType["findMany"]["result"]> {
        return prisma.mediaTypeTranslation.findMany(params);
    }
}