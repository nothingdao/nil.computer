/*
  Warnings:

  - You are about to drop the column `supply` on the `Asset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "supply",
ADD COLUMN     "token_info_associated_token_address" TEXT,
ADD COLUMN     "token_info_supply" TEXT,
ADD COLUMN     "token_info_symbol" TEXT,
ADD COLUMN     "token_info_token_program" TEXT;
