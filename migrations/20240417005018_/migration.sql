/*
  Warnings:

  - You are about to alter the column `assetId` on the `UserAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(44)`.

*/
-- DropForeignKey
ALTER TABLE "UserAsset" DROP CONSTRAINT "UserAsset_assetId_fkey";

-- AlterTable
ALTER TABLE "UserAsset" ALTER COLUMN "assetId" SET DATA TYPE VARCHAR(44);

-- AddForeignKey
ALTER TABLE "UserAsset" ADD CONSTRAINT "UserAsset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
