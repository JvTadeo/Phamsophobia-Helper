import { IMediaType, IMediaTypeInterface } from "./media-type.interface";
import prisma from "@/database/prisma";

export class MediaTypePrisma implements IMediaTypeInterface {
    findMany(params: IMediaType["findMany"]["params"]): Promise<IMediaType["findMany"]["result"]> {
        return prisma.mediaType.findMany({
            where: params.where,
            include: params?.include
        });
    }
}