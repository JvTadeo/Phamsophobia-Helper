/*
  Warnings:

  - Added the required column `media_type_id` to the `MediaCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."MediaCategory" DROP CONSTRAINT "MediaCategory_id_fkey";

-- AlterTable
ALTER TABLE "public"."MediaCategory" ADD COLUMN     "media_type_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."MediaCategory" ADD CONSTRAINT "MediaCategory_media_type_id_fkey" FOREIGN KEY ("media_type_id") REFERENCES "public"."MediaType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
