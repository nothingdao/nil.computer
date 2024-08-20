-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "owner_address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "interface" TEXT NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FungibleToken" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "authorities" JSONB,
    "compression" JSONB,
    "royalty" JSONB,
    "creators" JSONB,
    "ownership" JSONB,
    "token_info" JSONB,

    CONSTRAINT "FungibleToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NftV1" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "authorities" JSONB,
    "compression" JSONB,
    "grouping" JSONB,
    "royalty" JSONB,
    "creators" JSONB,
    "ownership" JSONB,
    "supply" JSONB,

    CONSTRAINT "NftV1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgrammableNft" (
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

    CONSTRAINT "ProgrammableNft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_owner_address_key" ON "User"("owner_address");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FungibleToken" ADD CONSTRAINT "FungibleToken_id_fkey" FOREIGN KEY ("id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftV1" ADD CONSTRAINT "NftV1_id_fkey" FOREIGN KEY ("id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammableNft" ADD CONSTRAINT "ProgrammableNft_id_fkey" FOREIGN KEY ("id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
