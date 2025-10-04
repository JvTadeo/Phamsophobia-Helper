/*
  Warnings:

  - You are about to drop the `MediaCategoryTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MediaTypeTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MediaCategoryTranslation" DROP CONSTRAINT "MediaCategoryTranslation_language_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."MediaCategoryTranslation" DROP CONSTRAINT "MediaCategoryTranslation_media_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."MediaTypeTranslation" DROP CONSTRAINT "MediaTypeTranslation_language_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."MediaTypeTranslation" DROP CONSTRAINT "MediaTypeTranslation_media_type_id_fkey";

-- DropTable
DROP TABLE "public"."MediaCategoryTranslation";

-- DropTable
DROP TABLE "public"."MediaTypeTranslation";

-- CreateTable
CREATE TABLE "public"."media_type_translation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "media_type_id" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,

    CONSTRAINT "media_type_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."media_category_translation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "media_category_id" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,

    CONSTRAINT "media_category_translation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."media_type_translation" ADD CONSTRAINT "media_type_translation_media_type_id_fkey" FOREIGN KEY ("media_type_id") REFERENCES "public"."media_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."media_type_translation" ADD CONSTRAINT "media_type_translation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."media_category_translation" ADD CONSTRAINT "media_category_translation_media_category_id_fkey" FOREIGN KEY ("media_category_id") REFERENCES "public"."media_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."media_category_translation" ADD CONSTRAINT "media_category_translation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
