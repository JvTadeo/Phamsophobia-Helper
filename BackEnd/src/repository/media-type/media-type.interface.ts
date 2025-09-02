import { IFindMany } from "../index.interfaces";
import { MediaTypePrisma } from "@/database/prisma.types";

export interface IMediaTypeInterface {
    findMany(params: IMediaType["findMany"]["params"]): Promise<IMediaType["findMany"]["result"]>
}

export type IMediaType = {
    findMany: IFindMany<MediaTypePrisma, IMediaCategoryModel[]>
}

// ----- Model
interface IMediaCategoryModel {
  name: string,
}

