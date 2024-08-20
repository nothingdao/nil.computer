-- CreateTable
CREATE TABLE "CustomAsset" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "authorities" JSONB,
    "compression" JSONB,
    "grouping" JSONB,
    "royalty" JSONB,
    "creators" JSONB,
    "ownership" JSONB,
    "supply" JSONB,
    "mutable" BOOLEAN,
    "burnt" BOOLEAN,
    "token_info" JSONB,

    CONSTRAINT "CustomAsset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomAsset" ADD CONSTRAINT "CustomAsset_id_fkey" FOREIGN KEY ("id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
