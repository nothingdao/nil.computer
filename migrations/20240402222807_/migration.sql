/*
  Warnings:

  - You are about to drop the `CustomAsset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FungibleToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NftV1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgrammableNft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomAsset" DROP CONSTRAINT "CustomAsset_id_fkey";

-- DropForeignKey
ALTER TABLE "FungibleToken" DROP CONSTRAINT "FungibleToken_id_fkey";

-- DropForeignKey
ALTER TABLE "NftV1" DROP CONSTRAINT "NftV1_id_fkey";

-- DropForeignKey
ALTER TABLE "ProgrammableNft" DROP CONSTRAINT "ProgrammableNft_id_fkey";

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "authorities" JSONB,
ADD COLUMN     "burnt" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "compression" JSONB,
ADD COLUMN     "content" JSONB,
ADD COLUMN     "creators" JSONB,
ADD COLUMN     "grouping" JSONB,
ADD COLUMN     "mutable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ownership" JSONB,
ADD COLUMN     "royalty" JSONB,
ADD COLUMN     "supply" JSONB,
ADD COLUMN     "token_info" JSONB;

-- DropTable
DROP TABLE "CustomAsset";

-- DropTable
DROP TABLE "FungibleToken";

-- DropTable
DROP TABLE "NftV1";

-- DropTable
DROP TABLE "ProgrammableNft";
