-- CreateTable
CREATE TABLE "CatyHolder" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatyHolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatyHolderAsset" (
    "id" TEXT NOT NULL,
    "interface" TEXT NOT NULL,
    "content_schema" TEXT,
    "content_jsonUri" TEXT,
    "content_files" JSONB,
    "content_metadata_name" TEXT,
    "content_metadata_symbol" TEXT,
    "content_metadata_description" TEXT,
    "content_metadata_token_standard" TEXT,
    "content_links_image" TEXT,
    "content_links_external_url" TEXT,
    "authorities" JSONB,
    "compression_eligible" BOOLEAN,
    "compression_compressed" BOOLEAN,
    "compression_data_hash" TEXT,
    "compression_creator_hash" TEXT,
    "compression_asset_hash" TEXT,
    "compression_tree" TEXT,
    "compression_seq" INTEGER,
    "compression_leaf_id" INTEGER,
    "grouping" JSONB,
    "royalty_royalty_model" TEXT,
    "royalty_target" TEXT,
    "royalty_percent" DOUBLE PRECISION,
    "royalty_basis_points" INTEGER,
    "royalty_primary_sale_happened" BOOLEAN,
    "royalty_locked" BOOLEAN,
    "creators" JSONB,
    "ownership_frozen" BOOLEAN,
    "ownership_delegated" BOOLEAN,
    "ownership_delegate" TEXT,
    "ownership_ownership_model" TEXT,
    "ownership_owner" TEXT,
    "supply" JSONB,
    "mutable" BOOLEAN,
    "burnt" BOOLEAN,
    "mint_extensions" JSONB,
    "token_info_symbol" TEXT,
    "token_info_balance" TEXT,
    "token_info_supply" TEXT,
    "token_info_decimals" INTEGER,
    "token_info_token_program" TEXT,
    "token_info_associated_token_address" TEXT,
    "token_info_price_info" JSONB,
    "holderId" INTEGER NOT NULL,

    CONSTRAINT "CatyHolderAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CatyHolder_address_key" ON "CatyHolder"("address");

-- CreateIndex
CREATE UNIQUE INDEX "CatyHolderAsset_id_holderId_key" ON "CatyHolderAsset"("id", "holderId");

-- AddForeignKey
ALTER TABLE "CatyHolderAsset" ADD CONSTRAINT "CatyHolderAsset_holderId_fkey" FOREIGN KEY ("holderId") REFERENCES "CatyHolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
