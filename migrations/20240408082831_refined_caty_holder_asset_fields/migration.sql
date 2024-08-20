/*
  Warnings:

  - You are about to drop the column `authorities` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `burnt` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `compression_asset_hash` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `compression_compressed` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `compression_creator_hash` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `compression_data_hash` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `compression_eligible` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `compression_leaf_id` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `compression_seq` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `compression_tree` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `content_files` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `content_jsonUri` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `content_links_external_url` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `content_links_image` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `content_metadata_description` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `content_metadata_name` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `content_metadata_symbol` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `content_metadata_token_standard` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `content_schema` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `creators` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `grouping` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `interface` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `mint_extensions` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `mutable` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `ownership_delegate` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `ownership_delegated` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `ownership_frozen` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `ownership_owner` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `ownership_ownership_model` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `royalty_basis_points` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `royalty_locked` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `royalty_percent` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `royalty_primary_sale_happened` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `royalty_royalty_model` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `royalty_target` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `supply` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_associated_token_address` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_balance` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_decimals` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_price_info` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_supply` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_symbol` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - You are about to drop the column `token_info_token_program` on the `CatyHolderAsset` table. All the data in the column will be lost.
  - Added the required column `balance` to the `CatyHolderAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `CatyHolderAsset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CatyHolderAsset" DROP COLUMN "authorities",
DROP COLUMN "burnt",
DROP COLUMN "compression_asset_hash",
DROP COLUMN "compression_compressed",
DROP COLUMN "compression_creator_hash",
DROP COLUMN "compression_data_hash",
DROP COLUMN "compression_eligible",
DROP COLUMN "compression_leaf_id",
DROP COLUMN "compression_seq",
DROP COLUMN "compression_tree",
DROP COLUMN "content_files",
DROP COLUMN "content_jsonUri",
DROP COLUMN "content_links_external_url",
DROP COLUMN "content_links_image",
DROP COLUMN "content_metadata_description",
DROP COLUMN "content_metadata_name",
DROP COLUMN "content_metadata_symbol",
DROP COLUMN "content_metadata_token_standard",
DROP COLUMN "content_schema",
DROP COLUMN "creators",
DROP COLUMN "grouping",
DROP COLUMN "interface",
DROP COLUMN "mint_extensions",
DROP COLUMN "mutable",
DROP COLUMN "ownership_delegate",
DROP COLUMN "ownership_delegated",
DROP COLUMN "ownership_frozen",
DROP COLUMN "ownership_owner",
DROP COLUMN "ownership_ownership_model",
DROP COLUMN "royalty_basis_points",
DROP COLUMN "royalty_locked",
DROP COLUMN "royalty_percent",
DROP COLUMN "royalty_primary_sale_happened",
DROP COLUMN "royalty_royalty_model",
DROP COLUMN "royalty_target",
DROP COLUMN "supply",
DROP COLUMN "token_info_associated_token_address",
DROP COLUMN "token_info_balance",
DROP COLUMN "token_info_decimals",
DROP COLUMN "token_info_price_info",
DROP COLUMN "token_info_supply",
DROP COLUMN "token_info_symbol",
DROP COLUMN "token_info_token_program",
ADD COLUMN     "balance" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
