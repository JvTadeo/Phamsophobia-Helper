/*
  Warnings:

  - Changed the type of `sanity` on the `ghost` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `speed` on the `ghost` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `details` on the `ghost` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `custom` on the `ghost` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."ghost" DROP COLUMN "sanity",
ADD COLUMN     "sanity" JSONB NOT NULL,
DROP COLUMN "speed",
ADD COLUMN     "speed" JSONB NOT NULL,
DROP COLUMN "details",
ADD COLUMN     "details" JSONB NOT NULL,
DROP COLUMN "custom",
ADD COLUMN     "custom" JSONB NOT NULL;
