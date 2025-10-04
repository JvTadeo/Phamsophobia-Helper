import { IFindFirst } from "../index.interfaces";
import { LanguageTypePrisma } from "@/database/prisma.types";

export interface ILanguage {
    findFirst(params: LanguageType["findFirst"]["params"]): Promise<LanguageType["findFirst"]["result"]>
}

export type LanguageType = {
    findFirst: IFindFirst<LanguageTypePrisma, LanguageModel>
}
 
// ----- Model
interface LanguageModel {
    id: string
    name: string
}