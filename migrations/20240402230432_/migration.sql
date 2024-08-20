/*
  Warnings:

  - You are about to drop the column `compression` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `mint_extensions` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `ownership` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `royalty` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Asset` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_user_id_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "compression",
DROP COLUMN "content",
DROP COLUMN "mint_extensions",
DROP COLUMN "ownership",
DROP COLUMN "royalty",
DROP COLUMN "token_info",
DROP COLUMN "user_id",
ADD COLUMN     "compression_asset_hash" TEXT,
ADD COLUMN     "compression_compressed" BOOLEAN,
ADD COLUMN     "compression_creator_hash" TEXT,
ADD COLUMN     "compression_data_hash" TEXT,
ADD COLUMN     "compression_eligible" BOOLEAN,
ADD COLUMN     "compression_leaf_id" INTEGER,
ADD COLUMN     "compression_seq" INTEGER,
ADD COLUMN     "compression_tree" TEXT,
ADD COLUMN     "content_files" JSONB,
ADD COLUMN     "content_jsonUri" TEXT,
ADD COLUMN     "content_links_external_url" TEXT,
ADD COLUMN     "content_links_image" TEXT,
ADD COLUMN     "content_metadata_description" TEXT,
ADD COLUMN     "content_metadata_name" TEXT,
ADD COLUMN     "content_metadata_symbol" TEXT,
ADD COLUMN     "content_metadata_token_standard" TEXT,
ADD COLUMN     "content_schema" TEXT,
ADD COLUMN     "ownership_delegate" TEXT,
ADD COLUMN     "ownership_delegated" BOOLEAN,
ADD COLUMN     "ownership_frozen" BOOLEAN,
ADD COLUMN     "ownership_owner" TEXT,
ADD COLUMN     "ownership_ownership_model" TEXT,
ADD COLUMN     "royalty_basis_points" INTEGER,
ADD COLUMN     "royalty_locked" BOOLEAN,
ADD COLUMN     "royalty_percent" DOUBLE PRECISION,
ADD COLUMN     "royalty_primary_sale_happened" BOOLEAN,
ADD COLUMN     "royalty_royalty_model" TEXT,
ADD COLUMN     "royalty_target" TEXT,
ADD COLUMN     "token_info_associated_token_address" TEXT,
ADD COLUMN     "token_info_balance" BIGINT,
ADD COLUMN     "token_info_decimals" INTEGER,
ADD COLUMN     "token_info_price_info" JSONB,
ADD COLUMN     "token_info_supply" BIGINT,
ADD COLUMN     "token_info_symbol" TEXT,
ADD COLUMN     "token_info_token_program" TEXT,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "burnt" DROP NOT NULL,
ALTER COLUMN "burnt" DROP DEFAULT,
ALTER COLUMN "mutable" DROP NOT NULL,
ALTER COLUMN "mutable" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
