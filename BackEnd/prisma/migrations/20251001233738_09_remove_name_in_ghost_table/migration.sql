/*
  Warnings:

  - You are about to drop the column `name` on the `ghost_translation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `media_type` table. All the data in the column will be lost.
  - Added the required column `name` to the `ghost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ghost" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."ghost_translation" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "public"."media_type" DROP COLUMN "name";
