/*
  Warnings:

  - You are about to drop the `CatyHolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatyHolderAsset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CatyHolderAsset" DROP CONSTRAINT "CatyHolderAsset_holderId_fkey";

-- DropTable
DROP TABLE "CatyHolder";

-- DropTable
DROP TABLE "CatyHolderAsset";
