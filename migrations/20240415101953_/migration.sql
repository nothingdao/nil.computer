/*
  Warnings:

  - You are about to drop the column `token_info_associated_token_address` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_balance` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_decimals` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_price_info` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_supply` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_symbol` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_token_program` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Asset` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_userId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "token_info_associated_token_address",
DROP COLUMN "token_info_balance",
DROP COLUMN "token_info_decimals",
DROP COLUMN "token_info_price_info",
DROP COLUMN "token_info_supply",
DROP COLUMN "token_info_symbol",
DROP COLUMN "token_info_token_program",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserAsset" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "assetId" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "pricePerToken" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "UserAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAsset_userId_assetId_key" ON "UserAsset"("userId", "assetId");

-- AddForeignKey
ALTER TABLE "UserAsset" ADD CONSTRAINT "UserAsset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAsset" ADD CONSTRAINT "UserAsset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
