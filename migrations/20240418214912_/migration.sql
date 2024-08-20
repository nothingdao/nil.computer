/*
  Warnings:

  - You are about to drop the column `indexId` on the `Asset` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_indexId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "indexId";

-- CreateTable
CREATE TABLE "IndexAsset" (
    "indexId" INTEGER NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "IndexAsset_pkey" PRIMARY KEY ("indexId","assetId")
);

-- AddForeignKey
ALTER TABLE "IndexAsset" ADD CONSTRAINT "IndexAsset_indexId_fkey" FOREIGN KEY ("indexId") REFERENCES "Index"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndexAsset" ADD CONSTRAINT "IndexAsset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
