import { IFindMany } from "../index.interfaces"; 
import { MediaCategoryPrisma } from "@/database/prisma.types";

export interface IMediaCategory {
    findMany(params: IMediaCateoryTypes["findMany"]["params"]) : Promise<IMediaCateoryTypes["findMany"]["result"]>
}

export type IMediaCateoryTypes = {
    findMany: IFindMany<MediaCategoryPrisma, IMediaCategoryModel[]>
}

// ----- Model
interface IMediaCategoryModel {
  description: string,
  uniqueRewardXp: number,
  uniqueRewardMoney: number,
  duplicateRewardXp: number,
  duplicateRewardMoney: number,
  mediaTypeId: string
}