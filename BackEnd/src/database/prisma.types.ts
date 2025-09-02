import { Prisma } from "@prisma/client";

export type MediaCategoryPrisma = {
    where: Prisma.MediaCategoryWhereInput
    whereUnique: Prisma.MediaCategoryWhereUniqueInput
    include: Prisma.MediaCategoryInclude
    select: Prisma.MediaCategorySelect
}

export type MediaTypePrisma = {
    where: Prisma.MediaTypeWhereInput
    whereUnique: Prisma.MediaTypeWhereUniqueInput
    include: Prisma.MediaTypeInclude
    select: Prisma.MediaTypeSelect
}