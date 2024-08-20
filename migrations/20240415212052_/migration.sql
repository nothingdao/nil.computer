/*
  Warnings:

  - You are about to drop the column `currency` on the `UserAsset` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerToken` on the `UserAsset` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `UserAsset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAsset" DROP COLUMN "currency",
DROP COLUMN "pricePerToken",
DROP COLUMN "totalPrice";
