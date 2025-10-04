import { IFindMany, IFindOne } from "../index.interfaces";
import { GhostTypePrisma } from "@/database/prisma.types";

export interface IGhost {
    findOne(params: IGhostType["findOne"]["params"]): Promise<IGhostType["findOne"]["result"]>
    findMany(params: IGhostType["findMany"]["params"]): Promise<IGhostType["findMany"]["result"]>
}

export interface IGhostType {
    findMany: IFindMany<GhostTypePrisma>
    findOne: IFindOne<GhostTypePrisma>
}