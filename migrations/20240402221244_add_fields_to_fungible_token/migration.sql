-- AlterTable
ALTER TABLE "FungibleToken" ADD COLUMN     "burnt" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mutable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supply" JSONB;
