/*
  Warnings:

  - You are about to drop the column `custom` on the `ghost` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `ghost` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ghost` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ghost_evidence" DROP CONSTRAINT "ghost_evidence_evidence_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ghost_evidence" DROP CONSTRAINT "ghost_evidence_ghost_id_fkey";

-- AlterTable
ALTER TABLE "public"."ghost" DROP COLUMN "custom",
DROP COLUMN "details",
DROP COLUMN "name";

-- CreateTable
CREATE TABLE "public"."language" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MediaTypeTranslation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "media_type_id" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,

    CONSTRAINT "MediaTypeTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MediaCategoryTranslation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "media_category_id" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,

    CONSTRAINT "MediaCategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."evidence_translation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "evidence_id" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,

    CONSTRAINT "evidence_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ghost_translation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "custom" JSONB NOT NULL,
    "ghost_id" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,

    CONSTRAINT "ghost_translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "language_code_key" ON "public"."language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ghost_translation_ghost_id_language_id_key" ON "public"."ghost_translation"("ghost_id", "language_id");

-- AddForeignKey
ALTER TABLE "public"."MediaTypeTranslation" ADD CONSTRAINT "MediaTypeTranslation_media_type_id_fkey" FOREIGN KEY ("media_type_id") REFERENCES "public"."media_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MediaTypeTranslation" ADD CONSTRAINT "MediaTypeTranslation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MediaCategoryTranslation" ADD CONSTRAINT "MediaCategoryTranslation_media_category_id_fkey" FOREIGN KEY ("media_category_id") REFERENCES "public"."media_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MediaCategoryTranslation" ADD CONSTRAINT "MediaCategoryTranslation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."evidence_translation" ADD CONSTRAINT "evidence_translation_evidence_id_fkey" FOREIGN KEY ("evidence_id") REFERENCES "public"."evidence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."evidence_translation" ADD CONSTRAINT "evidence_translation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ghost_evidence" ADD CONSTRAINT "ghost_evidence_ghost_id_fkey" FOREIGN KEY ("ghost_id") REFERENCES "public"."ghost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ghost_evidence" ADD CONSTRAINT "ghost_evidence_evidence_id_fkey" FOREIGN KEY ("evidence_id") REFERENCES "public"."evidence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ghost_translation" ADD CONSTRAINT "ghost_translation_ghost_id_fkey" FOREIGN KEY ("ghost_id") REFERENCES "public"."ghost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ghost_translation" ADD CONSTRAINT "ghost_translation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
