import { Prisma } from "@prisma/client";

type PrismaBaseTypes<Model extends keyof Prisma.TypeMap['model']> = {
    where: Prisma.TypeMap['model'][Model]['operations']['findMany']['args']['where'];
    whereUnique: Prisma.TypeMap['model'][Model]['operations']['findUnique']['args']['where'];
    include: Prisma.TypeMap['model'][Model]['operations']['findUnique']['args']['include'];
    select: Prisma.TypeMap['model'][Model]['operations']['findUnique']['args']['select'];
    result: Prisma.TypeMap['model'][Model]['operations']['findUnique']['result'];
}

export type MediaTranslationTypePrisma = PrismaBaseTypes<"MediaTypeTranslation">
export type GhostTypePrisma = PrismaBaseTypes<'Ghost'>
export type EvidenceTranslationTypePrisma = PrismaBaseTypes<"EvidenceTranslation">
export type LanguageTypePrisma = PrismaBaseTypes<"Language">