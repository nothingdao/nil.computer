-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "indexId" INTEGER;

-- CreateTable
CREATE TABLE "Index" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "Index_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Index_name_key" ON "Index"("name");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_indexId_fkey" FOREIGN KEY ("indexId") REFERENCES "Index"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Index" ADD CONSTRAINT "Index_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
