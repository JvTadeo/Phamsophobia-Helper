-- CreateTable
CREATE TABLE "public"."MediaType" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MediaType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MediaCategory" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "uniqueRewardXp" INTEGER NOT NULL,
    "uniqueRewardMoney" INTEGER NOT NULL,
    "duplicateRewardXp" INTEGER NOT NULL,
    "duplicateRewardMoney" INTEGER NOT NULL,

    CONSTRAINT "MediaCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MediaCategory" ADD CONSTRAINT "MediaCategory_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."MediaType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
