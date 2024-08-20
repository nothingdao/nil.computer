-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "edition_nonce" INTEGER,
ADD COLUMN     "print_current_supply" INTEGER,
ADD COLUMN     "print_max_supply" INTEGER;
