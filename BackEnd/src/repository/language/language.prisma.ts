import prisma from "@/database/prisma";
import { ILanguage, LanguageType } from "./language.interface";

export class LanguagePrisma implements ILanguage{ 
    findFirst(params: LanguageType["findFirst"]["params"]): Promise<LanguageType["findFirst"]["result"]> {
        return prisma.language.findFirst({
            where: params.where,
            select: params?.select
        });
    }
}