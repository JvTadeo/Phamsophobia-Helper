import type { IFindMany } from "../index.interfaces";
import type { MediaTranslationTypePrisma } from "@/database/prisma.types";

export interface IMediaTranslation {
    findMany(params: IMediaTranslationType["findMany"]["params"]): Promise<IMediaTranslationType["findMany"]["result"]>
}

export type IMediaTranslationType = {
    findMany: IFindMany<MediaTranslationTypePrisma, any[]>
}
