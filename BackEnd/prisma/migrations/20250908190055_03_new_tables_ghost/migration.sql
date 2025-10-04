/*
  Warnings:

  - You are about to drop the `MediaCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MediaType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MediaCategory" DROP CONSTRAINT "MediaCategory_media_type_id_fkey";

-- DropTable
DROP TABLE "public"."MediaCategory";

-- DropTable
DROP TABLE "public"."MediaType";

-- CreateTable
CREATE TABLE "public"."media_type" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "media_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."media_category" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "uniqueRewardXp" INTEGER NOT NULL,
    "uniqueRewardMoney" INTEGER NOT NULL,
    "duplicateRewardXp" INTEGER NOT NULL,
    "duplicateRewardMoney" INTEGER NOT NULL,
    "media_type_id" TEXT NOT NULL,

    CONSTRAINT "media_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."evidence" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ghost_evidence" (
    "id" TEXT NOT NULL,
    "ghost_id" TEXT NOT NULL,
    "evidence_id" TEXT NOT NULL,

    CONSTRAINT "ghost_evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ghost" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sanity" TEXT NOT NULL,
    "speed" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "custom" TEXT NOT NULL,

    CONSTRAINT "ghost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."media_category" ADD CONSTRAINT "media_category_media_type_id_fkey" FOREIGN KEY ("media_type_id") REFERENCES "public"."media_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ghost_evidence" ADD CONSTRAINT "ghost_evidence_ghost_id_fkey" FOREIGN KEY ("ghost_id") REFERENCES "public"."ghost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ghost_evidence" ADD CONSTRAINT "ghost_evidence_evidence_id_fkey" FOREIGN KEY ("evidence_id") REFERENCES "public"."evidence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
